"""Event-driven GPS collector with per-vehicle state and dry-run telemetry."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone, timedelta
import sqlite3
from typing import Any

from .const import DEFAULT_MAX_GAP_MINUTES, DEFAULT_MAX_SPEED_KMH, DEFAULT_STOP_AFTER_MINUTES
from .detector import DetectorConfig, DriveDetector
from .models import GPSPoint
from .validation import ensure_aware_utc, should_store_point, validate_point


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
        if state in {"unknown", "unavailable"}:
            return
        try:
            point = GPSPoint(vehicle_id, self._timestamp(attributes, event_time), float(attributes["latitude"]), float(attributes["longitude"]), self._float(attributes.get("gps_accuracy")), source_state=state, source_type=attributes.get("source_type"), raw_state=state)
            validation = validate_point(point, self._detectors[vehicle_id].previous, self._detectors[vehicle_id].config.max_speed_kmh)
            if not validation.accepted:
                self.stats.rejected_jump += validation.reason == "implausible_jump"
                self.stats.invalid += validation.reason != "implausible_jump"
                return
            previous = self._last_stored.get(vehicle_id)
            if previous is not None and not should_store_point(previous, point, int(self.vehicles[vehicle_id].get("min_interval", 30)), float(self.vehicles[vehicle_id].get("min_movement", 25))):
                self.stats.duplicate += 1
            else:
                self.stats.accepted += 1
                if not self.dry_run:
                    await self.storage.async_insert_point(point)
                self._last_stored[vehicle_id] = point
            for event in self._detectors[vehicle_id].ingest(point):
                if event.kind == "gps_gap": self.stats.gps_gaps += 1
                elif event.kind == "drive_started": self.stats.drives += 1
                elif event.kind == "drive_finished":
                    self.stats.stops += 1
                    if event.drive:
                        self.stats.distance_m += event.drive.distance_m
                        if not self.dry_run:
                            await self.storage.async_insert_drive(event.drive)
                            await self.storage.async_call("auto_assign_drive", vehicle_id, event.drive.id, event.drive.ended_at)
        except (KeyError, TypeError, ValueError, OverflowError, sqlite3.Error, OSError, RuntimeError):
            self.stats.errors += 1

    @staticmethod
    def _float(value):
        return None if value is None else float(value)

    @staticmethod
    def _timestamp(attributes, event_time):
        value = attributes.get("timestamp") or event_time
        if value is None: return datetime.now(timezone.utc)
        if isinstance(value, str): value = datetime.fromisoformat(value.replace("Z", "+00:00"))
        return ensure_aware_utc(value)
