"""Pure domain models; no Home Assistant imports are required."""

from dataclasses import dataclass
from datetime import datetime
from enum import StrEnum


class DriveState(StrEnum):
    STOPPED = "stopped"
    START_CANDIDATE = "start_candidate"
    DRIVING = "driving"
    GPS_GAP = "gps_gap"


@dataclass(frozen=True, slots=True)
class GPSPoint:
    vehicle_id: str
    recorded_at: datetime
    latitude: float
    longitude: float
    accuracy_m: float | None = None
    source_state: str | None = None
    source_type: str | None = None
    raw_state: str | None = None


@dataclass(frozen=True, slots=True)
class Vehicle:
    id: str
    name: str
    tracker_entity_id: str | None = None
    odometer_km: float | None = None


@dataclass(frozen=True, slots=True)
class Drive:
    id: str
    vehicle_id: str
    started_at: datetime
    ended_at: datetime
    distance_m: float
    end_reason: str
    manual_distance_km: float | None = None
    source: str = "gps"
    start_label: str | None = None
    end_label: str | None = None


@dataclass(frozen=True, slots=True)
class Stay:
    id: str
    vehicle_id: str
    started_at: datetime
    ended_at: datetime | None
    latitude: float | None
    longitude: float | None


@dataclass(frozen=True, slots=True)
class Trip:
    id: str
    vehicle_id: str
    title: str
    started_at: datetime
    ended_at: datetime | None
    status: str
    description: str = ""
    destination: str = ""
    created_at: datetime | None = None
    updated_at: datetime | None = None
    start_date: str | None = None
    end_date: str | None = None


@dataclass(frozen=True, slots=True)
class Expense:
    id: str
    trip_id: str | None
    occurred_at: datetime
    category: str
    amount_minor: int
    currency: str
    note: str | None = None
    odometer_km: float | None = None
    stay_id: str | None = None


@dataclass(frozen=True, slots=True)
class Stop:
    id: str
    vehicle_id: str
    name: str
    occurred_at: datetime
    arrived_at: datetime | None = None
    departed_at: datetime | None = None
    latitude: float | None = None
    longitude: float | None = None
    description: str = ""
    stop_type: str = "other"
    automatic: bool = True
    trip_id: str | None = None


@dataclass(frozen=True, slots=True)
class TripDriveLink:
    trip_id: str
    drive_id: str
    linked_at: datetime
