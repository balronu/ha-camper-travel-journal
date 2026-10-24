"""Event-driven GPS collector with per-vehicle state and dry-run telemetry."""

from __future__ import annotations

from collections import Counter
from dataclasses import dataclass, field
from datetime import datetime, timezone, timedelta
import sqlite3
from typing import Any

from .const import DEFAULT_MAX_GAP_MINUTES, DEFAULT_MAX_SPEED_KMH, DEFAULT_STOP_AFTER_MINUTES
from .detector import DetectorConfig, DriveDetector
from .models import GPSPoint
from .validation import ensure_aware_utc, point_filter_reason, validate_point


@dataclass
class CollectorStats:
    received: int = 0
    accepted: int = 0
    duplicate: int = 0
    rejected_jump: int = 0
    invalid: int = 0
    gps_gaps: int = 0
    drives: int = 0
    stops: int = 0
    distance_m: float = 0.0
    errors: int = 0
    reasons: Counter[str] = field(default_factory=Counter)
    last_event_at: datetime | None = None
    last_valid_event_at: datetime | None = None
    last_accepted_at: datetime | None = None
    last_drive_end_at: datetime | None = None
    last_drive_end_reason: str | None = None
    stop_suggestions_generated: int = 0


class GPSCollector:
    """Process state events; storage is injected and awaited, never blocking HA."""

    def __init__(self, storage, vehicles: dict[str, dict[str, Any]], dry_run: bool = False) -> None:
        self.storage = storage
        self.vehicles = vehicles
        self.dry_run = dry_run
        self.stats = CollectorStats()
        self._last_stored: dict[str, GPSPoint] = {}
        self._detectors = {
            vehicle_id: DriveDetector(vehicle_id, DetectorConfig(
                min_movement_m=float(config.get("min_movement", 25)),
                stop_after=timedelta(minutes=int(config.get("stop_after", DEFAULT_STOP_AFTER_MINUTES))),
                max_gap=timedelta(minutes=int(config.get("max_gap", DEFAULT_MAX_GAP_MINUTES))),
                max_speed_kmh=float(config.get("max_speed", DEFAULT_MAX_SPEED_KMH)),
            )) for vehicle_id, config in vehicles.items()
        }
        self.started_at = datetime.now(timezone.utc)

    def restore_points(self, vehicle_id: str, rows: list[tuple]) -> None:
        """Replay a bounded persisted tail without emitting new writes."""
        for row in rows:
            recorded_at = row[1]
            if isinstance(recorded_at, str):
                recorded_at = datetime.fromisoformat(recorded_at)
            self._detectors[vehicle_id].ingest(GPSPoint(vehicle_id, ensure_aware_utc(recorded_at), float(row[2]), float(row[3]), row[4], row[5], row[6]))
        if rows:
            row = rows[-1]
            recorded_at = row[1] if isinstance(row[1], datetime) else datetime.fromisoformat(row[1])
            self._last_stored[vehicle_id] = GPSPoint(vehicle_id, ensure_aware_utc(recorded_at), float(row[2]), float(row[3]), row[4], row[5], row[6])

    async def async_process_event(self, vehicle_id: str, state: str, attributes: dict[str, Any], event_time: datetime | None = None) -> None:
        self.stats.received += 1
        received_at = self._event_time(event_time)
        self.stats.last_event_at = received_at
        if state in {"unknown", "unavailable"}:
            self.stats.reasons[f"state_{state}"] += 1
            return
        try:
            point = GPSPoint(vehicle_id, self._timestamp(attributes, event_time), float(attributes["latitude"]), float(attributes["longitude"]), self._float(attributes.get("gps_accuracy")), source_state=state, source_type=attributes.get("source_type"), raw_state=state)
            validation = validate_point(point, self._detectors[vehicle_id].previous, self._detectors[vehicle_id].config.max_speed_kmh)
            if not validation.accepted:
                self.stats.rejected_jump += validation.reason == "implausible_jump"
                self.stats.invalid += validation.reason != "implausible_jump"
                self.stats.reasons[validation.reason or "invalid"] += 1
                return
            self.stats.last_valid_event_at = point.recorded_at
            previous = self._last_stored.get(vehicle_id)
            filter_reason = point_filter_reason(previous, point, int(self.vehicles[vehicle_id].get("min_interval", 30)), float(self.vehicles[vehicle_id].get("min_movement", 25)))
            if filter_reason is not None:
                self.stats.duplicate += 1
                self.stats.reasons[filter_reason] += 1
            else:
                self.stats.accepted += 1
                self.stats.last_accepted_at = point.recorded_at
                if not self.dry_run:
                    await self.storage.async_insert_point(point)
                self._last_stored[vehicle_id] = point
            for event in self._detectors[vehicle_id].ingest(point):
                if event.kind == "gps_gap": self.stats.gps_gaps += 1
                elif event.kind == "drive_started": self.stats.drives += 1
                elif event.kind == "drive_finished":
                    self.stats.stops += 1
                    self.stats.last_drive_end_at = event.at
                    self.stats.last_drive_end_reason = event.drive.end_reason if event.drive else event.reason
                    if event.drive:
                        self.stats.distance_m += event.drive.distance_m
                        if not self.dry_run:
                            stored_drive_id = await self.storage.async_insert_drive(event.drive)
                            drive_id = stored_drive_id or event.drive.id
                            await self.storage.async_call(
                                "associate_drive_points",
                                drive_id,
                                vehicle_id,
                                event.drive.started_at,
                                event.drive.ended_at,
                                "live_detector",
                            )
                            await self.storage.async_call("auto_assign_drive", vehicle_id, drive_id, event.drive.ended_at)
                            if event.drive.end_reason == "stationary_timeout" and event.stationary_since and event.stationary_until:
                                suggestion = await self.storage.async_call(
                                    "create_stationary_stop_suggestion",
                                    vehicle_id,
                                    drive_id,
                                    event.stationary_since.recorded_at,
                                    event.stationary_until.recorded_at,
                                    event.stationary_until.latitude,
                                    event.stationary_until.longitude,
                                    event.drive.ended_at,
                                )
                                if suggestion is not None:
                                    self.stats.stop_suggestions_generated += 1
        except (KeyError, TypeError, ValueError, OverflowError, sqlite3.Error, OSError, RuntimeError):
            self.stats.errors += 1
            self.stats.reasons["processing_error"] += 1

    def diagnostics(self, vehicle_id: str, now: datetime | None = None) -> dict[str, Any]:
        """Return counters and state without coordinates or private GPS data."""
        detector = self._detectors[vehicle_id]
        now = ensure_aware_utc(now or datetime.now(timezone.utc))
        last_event_age = None
        if self.stats.last_valid_event_at is not None:
            last_event_age = max(0.0, (now - ensure_aware_utc(self.stats.last_valid_event_at)).total_seconds())
        return {
            "started_at": self.started_at.isoformat(),
            "received_events": self.stats.received,
            "accepted_points": self.stats.accepted,
            "discarded_events": sum(self.stats.reasons.values()),
            "discard_reasons": dict(sorted(self.stats.reasons.items())),
            "discarded_gps_messages_by_cause": dict(sorted(self.stats.reasons.items())),
            "last_tracker_event_at": self._iso(self.stats.last_event_at),
            "last_valid_tracker_event_at": self._iso(self.stats.last_valid_event_at),
            "last_valid_gps_report_at": self._iso(self.stats.last_valid_event_at),
            "last_accepted_point_at": self._iso(self.stats.last_accepted_at),
            "seconds_since_last_valid_tracker_event": last_event_age,
            "drive_state": detector.state.value,
            "start_candidate_samples": detector.start_count,
            "open_drive": detector.drive_started is not None,
            "gps_gap": detector.state.value == "gps_gap",
            "last_drive_end_at": self._iso(self.stats.last_drive_end_at),
            "last_drive_end_reason": self.stats.last_drive_end_reason,
            "stop_suggestions_generated": self.stats.stop_suggestions_generated,
            "configured_stop_after_seconds": detector.config.stop_after.total_seconds(),
            "configured_max_gap_seconds": detector.config.max_gap.total_seconds(),
        }

    @staticmethod
    def _float(value):
        return None if value is None else float(value)

    @staticmethod
    def _event_time(value: datetime | None) -> datetime:
        return ensure_aware_utc(value) if value is not None else datetime.now(timezone.utc)

    @staticmethod
    def _iso(value: datetime | None) -> str | None:
        return None if value is None else ensure_aware_utc(value).isoformat()

    @staticmethod
    def _timestamp(attributes, event_time):
        value = attributes.get("timestamp") or event_time
        if value is None: return datetime.now(timezone.utc)
        if isinstance(value, str): value = datetime.fromisoformat(value.replace("Z", "+00:00"))
        return ensure_aware_utc(value)
