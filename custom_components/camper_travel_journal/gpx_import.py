"""Bounded, privacy-conscious GPX 1.1 analysis for historical imports.

The module is deliberately independent of Home Assistant and SQLite.  It only
returns normalized points and a conservative drive preview; persistence is a
separate, explicit operation in ``storage.py``.
"""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from hashlib import sha256
from math import isfinite
from xml.etree import ElementTree as ET

from .const import DEFAULT_MAX_GPS_GAP, DEFAULT_MAX_PLAUSIBLE_SPEED_KMH
from .detector import DetectorConfig, DriveDetector
from .models import GPSPoint
from .validation import ensure_aware_utc, validate_point

MAX_FILE_BYTES = 10 * 1024 * 1024
MAX_POINTS = 100_000
NS = "{http://www.topografix.com/GPX/1/1}"


@dataclass(frozen=True, slots=True)
class ImportedPoint:
    key: str
    point: GPSPoint
    track_index: int
    segment_index: int


@dataclass(frozen=True, slots=True)
class PreviewDrive:
    key: str
    started_at: datetime
    ended_at: datetime
    distance_m: float
    duration_seconds: int
    point_keys: tuple[str, ...]
    reason: str


@dataclass(frozen=True, slots=True)
class GPXPreview:
    file_hash: str
    points: tuple[ImportedPoint, ...]
    drives: tuple[PreviewDrive, ...]
    warnings: tuple[str, ...]
    duplicate_point_keys: tuple[str, ...]


def _timestamp(raw: str | None) -> datetime:
    if not raw:
        raise ValueError("gpx_timestamp_missing")
    value = raw.strip().replace("Z", "+00:00")
    parsed = datetime.fromisoformat(value)
    if parsed.tzinfo is None or parsed.utcoffset() is None:
        raise ValueError("gpx_timestamp_timezone_missing")
    return parsed.astimezone(timezone.utc)


def _coord(value: str | None, *, latitude: bool) -> float:
    try:
        result = float(value) if value is not None else float("nan")
    except (TypeError, ValueError):
        result = float("nan")
    limit = 90 if latitude else 180
    if not isfinite(result) or not -limit <= result <= limit:
        raise ValueError("gpx_coordinate_invalid")
    return result


def _local_name(tag: str) -> str:
    return tag.rsplit("}", 1)[-1]


def _safe_root(data: bytes) -> ET.Element:
    if len(data) > MAX_FILE_BYTES:
        raise ValueError("gpx_file_too_large")
    # ElementTree does not resolve external entities, but rejecting declarations
    # also prevents ambiguous/hostile input from entering future parser changes.
    upper = data[:4096].upper()
    # CDATA is valid in GPX descriptions and is harmless to ElementTree. Only
    # reject declarations that can alter entity resolution or document type.
    if b"<!DOCTYPE" in upper or b"<!ENTITY" in upper:
        raise ValueError("gpx_dtd_forbidden")
    try:
        root = ET.fromstring(data)
    except ET.ParseError as err:
        raise ValueError("gpx_xml_invalid") from err
    if _local_name(root.tag) != "gpx" or root.attrib.get("version") not in (None, "1.1"):
        raise ValueError("gpx_version_unsupported")
    return root


def analyze_gpx(data: bytes, vehicle_id: str, *, max_points: int = MAX_POINTS) -> GPXPreview:
    """Parse and conservatively analyze a GPX file without writing anything."""
    if max_points < 1 or max_points > MAX_POINTS:
        raise ValueError("gpx_point_limit_invalid")
    digest = sha256(data).hexdigest()
    root = _safe_root(data)
    points: list[ImportedPoint] = []
    warnings: list[str] = []
    seen: set[str] = set()
    duplicate_keys: set[str] = set()
    tracks = [node for node in root.iter() if _local_name(node.tag) == "trk"]
    if not tracks:
        raise ValueError("gpx_track_missing")
    for track_index, track in enumerate(tracks):
        segments = [node for node in track if _local_name(node.tag) == "trkseg"]
        for segment_index, segment in enumerate(segments):
            for node in segment:
                if _local_name(node.tag) != "trkpt":
                    continue
                if len(points) >= max_points:
                    raise ValueError("gpx_point_limit_exceeded")
                try:
                    lat = _coord(node.attrib.get("lat"), latitude=True)
                    lon = _coord(node.attrib.get("lon"), latitude=False)
                    time_node = next((child for child in node if _local_name(child.tag) == "time"), None)
                    at = _timestamp(time_node.text if time_node is not None else None)
                except ValueError as err:
                    warnings.append(str(err))
                    continue
                point_key = sha256(f"{vehicle_id}|{at.isoformat()}|{lat:.7f}|{lon:.7f}".encode()).hexdigest()
                if point_key in seen:
                    warnings.append("gpx_duplicate_point")
                    duplicate_keys.add(point_key)
                    continue
                seen.add(point_key)
                points.append(ImportedPoint(point_key, GPSPoint(vehicle_id, at, lat, lon, source_type="gpx"), track_index, segment_index))
    points.sort(key=lambda item: item.point.recorded_at)
    if not points:
        raise ValueError("gpx_no_valid_points")
    drives: list[PreviewDrive] = []
    detector = DriveDetector(vehicle_id, DetectorConfig(max_gap=DEFAULT_MAX_GPS_GAP, max_speed_kmh=DEFAULT_MAX_PLAUSIBLE_SPEED_KMH))
    active_keys: list[str] = []
    for item in points:
        previous = detector.previous
        result = detector.ingest(item.point)
        if previous is not None and not validate_point(item.point, previous, DEFAULT_MAX_PLAUSIBLE_SPEED_KMH).accepted:
            warnings.append("gpx_implausible_jump")
            continue
        active_keys.append(item.key)
        for event in result:
            if event.kind == "gps_gap":
                warnings.append("gpx_gap_possible_drive_boundary")
            if event.kind == "drive_finished" and event.drive:
                drive = event.drive
                duration = max(0, int((ensure_aware_utc(drive.ended_at) - ensure_aware_utc(drive.started_at)).total_seconds()))
                key = sha256(f"{digest}|{drive.started_at.isoformat()}|{drive.ended_at.isoformat()}".encode()).hexdigest()
                drives.append(PreviewDrive(key, drive.started_at, drive.ended_at, drive.distance_m, duration, tuple(active_keys), drive.end_reason))
                active_keys = []
    for event in detector.finish_at_end():
        if event.drive:
            drive = event.drive
            key = sha256(f"{digest}|{drive.started_at.isoformat()}|{drive.ended_at.isoformat()}".encode()).hexdigest()
            drives.append(PreviewDrive(key, drive.started_at, drive.ended_at, drive.distance_m, max(0, int((drive.ended_at - drive.started_at).total_seconds())), tuple(active_keys), drive.end_reason))
    return GPXPreview(digest, tuple(points), tuple(drives), tuple(sorted(set(warnings))), tuple(sorted(duplicate_keys)))
