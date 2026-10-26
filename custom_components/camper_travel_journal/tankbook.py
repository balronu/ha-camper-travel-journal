"""Fuel-log validation and transparent consumption calculations."""

from __future__ import annotations

from dataclasses import dataclass
from decimal import Decimal, InvalidOperation, ROUND_HALF_UP
from datetime import datetime, timedelta
from math import asin, cos, isfinite, radians, sin, sqrt
from typing import Any


FUEL_TYPES = frozenset({"diesel", "adblue", "other"})
FILL_LEVELS = frozenset({"full", "partial", "unknown"})
QUALITY_MEASURED = "measured"
QUALITY_ESTIMATED = "estimated"
QUALITY_INCOMPLETE = "incomplete"
QUALITY_NOT_CALCULABLE = "not_calculable"


def _decimal(value: Any, field: str, *, allow_zero: bool = True) -> Decimal | None:
    if value is None or value == "":
        return None
    try:
        result = Decimal(str(value).strip().replace(",", "."))
    except (AttributeError, InvalidOperation):
        raise ValueError(f"tankbook_{field}_invalid") from None
    if not result.is_finite() or result < 0 or (not allow_zero and result == 0):
        raise ValueError(f"tankbook_{field}_invalid")
    return result


def normalize_tank_values(liters: Any, price_per_liter: Any = None, amount_minor: Any = None) -> tuple[float, float | None, int | None]:
    """Validate a tank event and derive missing monetary fields safely."""
    liters_d = _decimal(liters, "liters", allow_zero=False)
    price_d = _decimal(price_per_liter, "price_per_liter")
    # Stored expense/tank amounts use integer minor units (e.g. 13125 = EUR
    # 131.25).  Liter prices remain decimal major units.
    amount_d = _decimal(amount_minor, "amount_minor")
    amount_major = None if amount_d is None else amount_d / Decimal("100")
    if liters_d is None:
        raise ValueError("tankbook_liters_required")
    if amount_major is None and price_d is not None:
        amount_major = (liters_d * price_d).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
    if price_d is None and amount_major is not None:
        price_d = amount_major / liters_d
    if amount_major is not None and price_d is not None:
        if abs(liters_d * price_d - amount_major) > Decimal("0.005"):
            raise ValueError("tankbook_values_inconsistent")
    return (
        float(liters_d),
        None if price_d is None else float(price_d),
        None if amount_major is None else int((amount_major * 100).quantize(Decimal("1"), rounding=ROUND_HALF_UP)),
    )


def _haversine_m(first: dict, second: dict) -> float:
    earth = 6_371_000.0
    lat1, lat2 = radians(float(first["latitude"])), radians(float(second["latitude"]))
    dlat = lat2 - lat1
    dlon = radians(float(second["longitude"]) - float(first["longitude"]))
    value = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    return 2 * earth * asin(min(1.0, sqrt(value)))


def _point_distance(points: list[dict], start: datetime, end: datetime) -> tuple[float, bool]:
    """Measure only the timestamped point segments inside the interval."""
    ordered = sorted((point for point in points if point.get("recorded_at")), key=lambda item: item["recorded_at"])
    if len(ordered) < 2:
        return 0.0, False
    distance = 0.0
    covered = False
    for first, second in zip(ordered, ordered[1:]):
        first_at = datetime.fromisoformat(first["recorded_at"])
        second_at = datetime.fromisoformat(second["recorded_at"])
        overlap_start, overlap_end = max(first_at, start), min(second_at, end)
        if overlap_end <= overlap_start or second_at <= first_at:
            continue
        fraction = (overlap_end - overlap_start).total_seconds() / (second_at - first_at).total_seconds()
        distance += _haversine_m(first, second) * fraction
        covered = True
    return distance, covered


def _distance_from_drives(
    drives: list[dict], start: datetime, end: datetime, *, gps_points: list[dict] | None = None
) -> tuple[float, bool, bool, dict]:
    """Return GPS distance and transparent evidence without treating stays as drives."""
    selected = []
    excluded: list[dict] = []
    seen_ids: set[str] = set()
    for drive in drives:
        drive_id = str(drive.get("id", ""))
        if drive_id in seen_ids:
            excluded.append({"drive_id": drive.get("id"), "reason": "duplicate_drive"})
            continue
        seen_ids.add(drive_id)
        if drive.get("source") not in (None, "gps", "gpx"):
            excluded.append({"drive_id": drive.get("id"), "reason": "not_recorded_gps_drive"})
            continue
        started = datetime.fromisoformat(drive["started_at"])
        ended = datetime.fromisoformat(drive["ended_at"])
        if ended > start and started < end:
            selected.append((drive, started, ended))
    selected.sort(key=lambda item: (item[1], item[2], str(item[0].get("id", ""))))
    if not selected:
        return 0.0, False, False, {"found_drives": 0, "considered_drives": 0, "excluded_drives": [], "gaps": ["no_drives"]}
    distance = 0.0
    considered = 0
    boundary_missing = []
    for drive, started, ended in selected:
        overlap_start, overlap_end = max(started, start), min(ended, end)
        if started >= start and ended <= end:
            distance += float(drive.get("distance_m") or 0)
            considered += 1
            continue
        points = drive.get("gps_points") or []
        clipped, usable = _point_distance(points, start, end)
        if usable:
            distance += clipped
            considered += 1
        else:
            excluded.append({"drive_id": drive.get("id"), "reason": "boundary_drive_without_timestamped_points"})
            boundary_missing.append("drive_boundary")
    nearby = gps_points or []
    boundary_window = timedelta(minutes=15)
    for boundary, label in ((start, "start_boundary"), (end, "end_boundary")):
        drive_covers_boundary = any(item[1] <= boundary <= item[2] for item in selected)
        if not drive_covers_boundary and not any(abs((datetime.fromisoformat(point["recorded_at"]) - boundary).total_seconds()) <= boundary_window.total_seconds() for point in nearby if point.get("recorded_at")):
            boundary_missing.append(label)
    gaps = sorted(set(boundary_missing))
    complete = bool(considered and not gaps and not excluded)
    evidence = {
        "found_drives": len(selected),
        "considered_drives": considered,
        "excluded_drives": excluded,
        "gaps": gaps,
        "stationary_or_unobserved_periods": max(0, len(selected) - 1),
    }
    return distance, complete, True, evidence


@dataclass(frozen=True)
class ConsumptionInterval:
    fuel_type: str
    started_at: str
    ended_at: str
    liters: float
    fuel_cost_minor: int | None
    distance_km: float | None
    distance_source: str
    quality: str
    combined_l_per_100km: float | None
    heater_liters: float | None
    driving_liters: float | None
    estimated_driving_cost_minor: int | None
    heater_quality: str
    note: str
    gps_diagnosis: dict


def _interval_for(events: list[dict], start: dict, end: dict, drives: list[dict], heater: dict | None, gps_points: list[dict] | None = None) -> ConsumptionInterval:
    included = [event for event in events if start["occurred_at"] < event["occurred_at"] <= end["occurred_at"]]
    liters = sum(float(event["liters"]) for event in included)
    costs = [event["amount_minor"] for event in included if event.get("amount_minor") is not None]
    fuel_cost = sum(int(value) for value in costs) if costs else None
    start_odo = start.get("odometer_km")
    end_odo = end.get("odometer_km")
    distance_km: float | None = None
    source = "none"
    quality = QUALITY_NOT_CALCULABLE
    note = ""
    gps_diagnosis = {"found_drives": 0, "considered_drives": 0, "excluded_drives": [], "gaps": []}
    if start_odo is not None and end_odo is not None:
        delta = float(end_odo) - float(start_odo)
        if isfinite(delta) and delta > 0:
            distance_km = delta
            source = "odometer"
            quality = QUALITY_MEASURED
        else:
            note = "odometer_invalid"
    if distance_km is None:
        distance_m, complete, has_drives, gps_diagnosis = _distance_from_drives(
            drives, datetime.fromisoformat(start["occurred_at"]), datetime.fromisoformat(end["occurred_at"]), gps_points=gps_points
        )
        if has_drives and distance_m > 0 and complete:
            distance_km = distance_m / 1000
            source = "gps_drives"
            quality = QUALITY_ESTIMATED
            note = "gps_distance_is_estimated"
        elif has_drives:
            source = "gps_drives_incomplete"
            quality = QUALITY_INCOMPLETE
            note = "gps_coverage_incomplete:" + ",".join(gps_diagnosis["gaps"] or ["unknown"])
        else:
            note = "distance_missing"
    heater_liters = None
    heater_quality = "unknown"
    if heater:
        if heater.get("manual_liters") is not None:
            heater_liters = float(heater["manual_liters"])
            heater_quality = QUALITY_ESTIMATED
        elif heater.get("hours") is not None and heater.get("liters_per_hour") is not None:
            heater_liters = float(heater["hours"]) * float(heater["liters_per_hour"])
            heater_quality = QUALITY_ESTIMATED
    driving_liters = None if heater_liters is None else max(0.0, liters - heater_liters)
    estimated_driving_cost = None
    if driving_liters is not None and fuel_cost is not None and liters > 0:
        estimated_driving_cost = int(round(fuel_cost * driving_liters / liters))
    combined = None
    if distance_km and quality in {QUALITY_MEASURED, QUALITY_ESTIMATED}:
        combined = round(liters / distance_km * 100, 3)
    return ConsumptionInterval(
        fuel_type=start["fuel_type"], started_at=start["occurred_at"], ended_at=end["occurred_at"],
        liters=round(liters, 3), fuel_cost_minor=fuel_cost, distance_km=None if distance_km is None else round(distance_km, 3),
        distance_source=source, quality=quality, combined_l_per_100km=combined, heater_liters=heater_liters,
        driving_liters=driving_liters, estimated_driving_cost_minor=estimated_driving_cost,
        heater_quality=heater_quality, note=note,
        gps_diagnosis=gps_diagnosis,
    )


def calculate_consumption(events: list[dict], drives: list[dict], *, heater: dict | None = None, gps_points: list[dict] | None = None) -> dict:
    """Calculate intervals without creating or changing expense records.

    Full-to-full intervals include every partial filling after the starting
    full filling and include the ending full filling. GPS distance is never
    labelled measured and incomplete coverage never yields a precise value.
    """
    result: dict[str, list[dict]] = {fuel_type: [] for fuel_type in sorted(FUEL_TYPES)}
    for fuel_type in sorted(FUEL_TYPES):
        typed = sorted((event for event in events if event["fuel_type"] == fuel_type), key=lambda item: item["occurred_at"])
        full = [event for event in typed if event["fill_level"] == "full"]
        for start, end in zip(full, full[1:]):
            interval = _interval_for(typed, start, end, drives, heater if fuel_type == "diesel" else None, gps_points)
            result[fuel_type].append(interval.__dict__)
    return {"intervals": result, "heating_disclaimer": "Diesel includes driving and heating unless heating data is supplied."}
