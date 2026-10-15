"""Conservative, gap-aware drive detection state machine."""

from dataclasses import dataclass
from datetime import datetime, timedelta
from uuid import uuid4

from .const import DEFAULT_MAX_GPS_GAP, DEFAULT_MAX_PLAUSIBLE_SPEED_KMH, DEFAULT_STOP_AFTER
from .models import Drive, DriveState, GPSPoint
from .validation import ensure_aware_utc, validate_point


@dataclass(frozen=True, slots=True)
class DetectorConfig:
    min_movement_m: float = 25.0
    start_samples: int = 2
    stop_after: timedelta = DEFAULT_STOP_AFTER
    max_gap: timedelta = DEFAULT_MAX_GPS_GAP
    max_speed_kmh: float = DEFAULT_MAX_PLAUSIBLE_SPEED_KMH


@dataclass(frozen=True, slots=True)
class DetectionEvent:
    kind: str
    at: datetime
    drive: Drive | None = None
    reason: str | None = None


class DriveDetector:
    """Detect drives without bridging a GPS outage by an air-line segment."""

    def __init__(self, vehicle_id: str, config: DetectorConfig | None = None) -> None:
        self.vehicle_id = vehicle_id
        self.config = config or DetectorConfig()
        self.state = DriveState.STOPPED
        self.previous: GPSPoint | None = None
        self.drive_started: GPSPoint | None = None
        self.last_moving: GPSPoint | None = None
        self.distance_m = 0.0
        self.start_count = 0

    def ingest(self, point: GPSPoint) -> list[DetectionEvent]:
        """Consume one point and emit lifecycle events."""
        events: list[DetectionEvent] = []
        if self.previous is not None:
            elapsed = ensure_aware_utc(point.recorded_at) - ensure_aware_utc(self.previous.recorded_at)
            if elapsed > self.config.max_gap:
                if self.state == DriveState.DRIVING:
                    events.append(DetectionEvent("gps_gap", point.recorded_at, reason="gap_not_counted_as_distance"))
                    if self.previous is not None:
                        events.append(self._finish(self.previous, "gps_gap"))
                        self.state = DriveState.GPS_GAP
                else:
                    self.state = DriveState.GPS_GAP
                self.start_count = 0
                self.previous = point
                return events
            result = validate_point(point, self.previous, self.config.max_speed_kmh)
            if not result.accepted:
                events.append(DetectionEvent("rejected", point.recorded_at, reason=result.reason))
                self.previous = point
                return events
            moved = (result.distance_m or 0.0) >= self.config.min_movement_m
            if moved:
                if self.state in (DriveState.STOPPED, DriveState.GPS_GAP):
                    self.start_count += 1
                    self.state = DriveState.START_CANDIDATE
                    if self.start_count >= self.config.start_samples:
                        self.state = DriveState.DRIVING
                        self.drive_started = self.previous
                        self.last_moving = point
                        self.distance_m = result.distance_m or 0.0
                        events.append(DetectionEvent("drive_started", point.recorded_at))
                elif self.state == DriveState.START_CANDIDATE:
                    self.start_count += 1
                    if self.start_count >= self.config.start_samples:
                        self.state = DriveState.DRIVING
                        self.drive_started = self.previous or point
                        self.last_moving = point
                        self.distance_m += result.distance_m or 0.0
                        events.append(DetectionEvent("drive_started", point.recorded_at))
                elif self.state == DriveState.DRIVING:
                    self.distance_m += result.distance_m or 0.0
                    self.last_moving = point
            elif self.state == DriveState.DRIVING and self.last_moving is not None:
                if ensure_aware_utc(point.recorded_at) - ensure_aware_utc(self.last_moving.recorded_at) >= self.config.stop_after:
                    events.append(self._finish(point, "stationary_timeout"))
            elif self.state == DriveState.START_CANDIDATE:
                self.start_count = 0
                self.state = DriveState.STOPPED
        self.previous = point
        return events

    def _finish(self, point: GPSPoint, reason: str) -> DetectionEvent:
        started = self.drive_started or point
        drive = Drive(str(uuid4()), self.vehicle_id, started.recorded_at, point.recorded_at, self.distance_m, reason)
        self.state = DriveState.STOPPED
        self.drive_started = None
        self.last_moving = None
        self.distance_m = 0.0
        self.start_count = 0
        return DetectionEvent("drive_finished", point.recorded_at, drive=drive)
