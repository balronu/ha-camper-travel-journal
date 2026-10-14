"""GPS validation and distance calculations."""

from dataclasses import dataclass
from datetime import datetime, timezone
from math import asin, cos, radians, sin, sqrt

from .models import GPSPoint

EARTH_RADIUS_M = 6_371_008.8
DEFAULT_MAX_ACCURACY_M = 1_000.0


@dataclass(frozen=True, slots=True)
class ValidationResult:
    accepted: bool
    reason: str | None = None
    distance_m: float | None = None
    implied_speed_kmh: float | None = None


def ensure_aware_utc(value: datetime) -> datetime:
    """Return an aware UTC timestamp; reject naive timestamps."""
    if value.tzinfo is None or value.utcoffset() is None:
        raise ValueError("GPS timestamps must be timezone-aware")
    return value.astimezone(timezone.utc)


def haversine_m(latitude_a: float, longitude_a: float, latitude_b: float, longitude_b: float) -> float:
    """Calculate great-circle distance in metres."""
    lat1, lat2 = radians(latitude_a), radians(latitude_b)
    d_lat = radians(latitude_b - latitude_a)
    d_lon = radians(longitude_b - longitude_a)
    value = sin(d_lat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(d_lon / 2) ** 2
    return 2 * EARTH_RADIUS_M * asin(sqrt(min(1.0, value)))


def validate_point(point: GPSPoint, previous: GPSPoint | None = None, max_speed_kmh: float = 200.0, max_accuracy_m: float = DEFAULT_MAX_ACCURACY_M) -> ValidationResult:
    """Validate coordinates, time and an optional segment against a speed limit."""
    if not (-90.0 <= point.latitude <= 90.0):
        return ValidationResult(False, "latitude_out_of_range")
    if not (-180.0 <= point.longitude <= 180.0):
        return ValidationResult(False, "longitude_out_of_range")
    if point.accuracy_m is not None and (point.accuracy_m < 0 or point.accuracy_m > max_accuracy_m):
        return ValidationResult(False, "accuracy_invalid")
    try:
        point_time = ensure_aware_utc(point.recorded_at)
    except ValueError:
        return ValidationResult(False, "timestamp_naive")
    if previous is None:
        return ValidationResult(True)
    try:
        previous_time = ensure_aware_utc(previous.recorded_at)
    except ValueError:
        return ValidationResult(False, "previous_timestamp_naive")
    elapsed_s = (point_time - previous_time).total_seconds()
    if elapsed_s <= 0:
        return ValidationResult(False, "timestamp_not_increasing")
    distance_m = haversine_m(previous.latitude, previous.longitude, point.latitude, point.longitude)
    speed_kmh = distance_m / elapsed_s * 3.6
    if speed_kmh > max_speed_kmh:
        return ValidationResult(False, "implausible_jump", distance_m, speed_kmh)
    return ValidationResult(True, distance_m=distance_m, implied_speed_kmh=speed_kmh)


def should_store_point(previous: GPSPoint | None, current: GPSPoint, min_interval_s: int = 30, min_movement_m: float = 25.0) -> bool:
    """Apply filtering with an adaptive significant-movement path."""
    if previous is None:
        return True
    elapsed = (ensure_aware_utc(current.recorded_at) - ensure_aware_utc(previous.recorded_at)).total_seconds()
    if elapsed < min_interval_s:
        return False
    distance = haversine_m(previous.latitude, previous.longitude, current.latitude, current.longitude)
    return (elapsed >= min_interval_s and distance >= min_movement_m) or distance >= max(4 * min_movement_m, 100.0)
