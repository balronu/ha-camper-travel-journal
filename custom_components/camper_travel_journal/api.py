"""Authenticated Home Assistant WebSocket API for the travel cards."""

from __future__ import annotations

from datetime import date, datetime, timezone
import base64
import asyncio
from math import cos, hypot, radians
import time
from typing import Any

try:
    import voluptuous as vol
    from homeassistant.components import websocket_api
    from homeassistant.core import HomeAssistant, callback
except ImportError:  # pragma: no cover - offline domain tests
    vol = None
    websocket_api = None
    HomeAssistant = Any
    callback = lambda func: func

from .models import Expense, Stop
from .gpx_import import MAX_FILE_BYTES, analyze_gpx
from .travel import validate_amount, validate_expense_category, validate_expense_currency, validate_expense_note, validate_expense_services, validate_transition
from .fuel import resolve_fuel_values
from .validation import is_coordinate_label
from .const import (
    CARTO_TILE_ATTRIBUTION, CARTO_TILE_URL, CONF_CARTO_API_KEY,
    CONF_HOME_RADIUS, CONF_MAP_PROVIDER, CONF_REVERSE_GEOCODING_ENABLED,
    DEFAULT_HOME_RADIUS_M, DEFAULT_MAX_GPS_GAP, MAP_PROVIDER_CARTO,
)

_NOMINATIM_URL = "https://nominatim.openstreetmap.org/reverse"


def _valid_coordinate(value: object, minimum: float, maximum: float) -> bool:
    return isinstance(value, (int, float)) and not isinstance(value, bool) and value == value and abs(value) != float("inf") and minimum <= value <= maximum


def _valid_coordinate_pair(latitude: object, longitude: object) -> bool:
    return _valid_coordinate(latitude, -90, 90) and _valid_coordinate(longitude, -180, 180)


def _distance_m(latitude: float, longitude: float, other_latitude: float, other_longitude: float) -> float:
    lat_scale = 111_320.0
    lon_scale = lat_scale * max(0.1, abs(cos(radians(latitude))))
    return hypot((longitude - other_longitude) * lon_scale, (latitude - other_latitude) * lat_scale)


def _language(hass: HomeAssistant) -> str:
    return "de" if str(getattr(getattr(hass, "config", None), "language", "de") or "de").lower().startswith("de") else "en"


def _coordinate_label(value: object) -> bool:
    return is_coordinate_label(value)


def _address_label(address: object, language: str) -> str | None:
    if not isinstance(address, dict):
        return None
    for key in (("city", "town", "village", "municipality", "county") if language == "de" else ("city", "town", "village", "municipality", "county")):
        value = address.get(key)
        if isinstance(value, str) and value.strip():
            return value.strip()
    return None


async def _reverse_geocode(hass: HomeAssistant, runtime, latitude: float, longitude: float) -> str | None:
    """Optionally resolve one rounded endpoint; disabled by default and never required."""
    if not runtime.values.get(CONF_REVERSE_GEOCODING_ENABLED, False):
        return None
    language = _language(hass)
    key = (language, round(latitude, 3), round(longitude, 3))
    cache = getattr(runtime, "location_cache", None)
    if cache is None:
        cache = runtime.location_cache = {}
    if key in cache:
        return cache[key]
    last_request = getattr(runtime, "location_last_request", 0.0)
    wait = 1.0 - (time.monotonic() - last_request)
    if wait > 0:
        await asyncio.sleep(wait)
    runtime.location_last_request = time.monotonic()
    try:
        from homeassistant.helpers.aiohttp_client import async_get_clientsession
        session = async_get_clientsession(hass)
        async with session.get(
            _NOMINATIM_URL,
            params={"lat": f"{round(latitude, 3):.3f}", "lon": f"{round(longitude, 3):.3f}", "format": "jsonv2", "zoom": "10", "addressdetails": "1"},
            headers={"User-Agent": "Camper Travel Journal/0.3.7"},
            timeout=5,
        ) as response:
            if response.status != 200:
                cache[key] = None
                return None
            label = _address_label(await response.json(), language)
    except Exception:
        label = None
    cache[key] = label
    return label


async def _resolve_drive_labels(hass: HomeAssistant, msg: dict, drives: list[dict]) -> list[dict]:
    """Resolve display-only labels without overwriting manual or saved names."""
    runtime = _runtime(hass, msg["vehicle_id"])
    zone = hass.states.get("zone.home") if getattr(hass, "states", None) else None
    zone_latitude = zone_longitude = None
    if zone is not None:
        zone_latitude, zone_longitude = zone.attributes.get("latitude"), zone.attributes.get("longitude")
        if not _valid_coordinate_pair(zone_latitude, zone_longitude):
            zone_latitude = zone_longitude = None
    radius = float(runtime.values.get(CONF_HOME_RADIUS, DEFAULT_HOME_RADIUS_M) or DEFAULT_HOME_RADIUS_M)
    home_label = "Zuhause" if _language(hass) == "de" else "Home"
    for drive in drives:
        for prefix in ("start", "end"):
            label_key = f"{prefix}_label"
            label = drive.get(label_key)
            if label and not _coordinate_label(label):
                continue
            latitude, longitude = drive.get(f"{prefix}_latitude"), drive.get(f"{prefix}_longitude")
            if not _valid_coordinate_pair(latitude, longitude):
                continue
            if zone_latitude is not None and _distance_m(latitude, longitude, zone_latitude, zone_longitude) <= radius:
                drive[label_key] = home_label
                continue
            resolved = await _reverse_geocode(hass, runtime, latitude, longitude)
            if resolved:
                drive[label_key] = resolved
    return drives


def _map_config(values: dict[str, Any]) -> dict[str, Any]:
    """Build browser configuration without ever logging or diagnosing the key."""
    provider = values.get(CONF_MAP_PROVIDER)
    key = str(values.get(CONF_CARTO_API_KEY, "") or "")
    if provider == MAP_PROVIDER_CARTO and key:
        from urllib.parse import quote
        return {
            "provider": MAP_PROVIDER_CARTO,
            "tile_url": CARTO_TILE_URL.replace("{key}", quote(key, safe="")),
            "tile_attribution": CARTO_TILE_ATTRIBUTION,
        }
    return {"provider": provider or "none", "tile_url": None, "tile_attribution": None}


def _now() -> datetime:
    return datetime.now(timezone.utc)


def _timestamp(value: str | None, *, required: bool = True) -> datetime | None:
    if value is None and not required:
        return None
    if not isinstance(value, str):
        raise ValueError("timestamp_invalid")
    try:
        parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError as err:
        raise ValueError("timestamp_invalid") from err
    if parsed.tzinfo is None:
        raise ValueError("timestamp_must_be_utc")
    return parsed.astimezone(timezone.utc)


def _date(value: str | None, *, required: bool = False) -> str | None:
    if value in (None, "") and not required:
        return None
    if not isinstance(value, str):
        raise ValueError("date_invalid")
    try:
        return date.fromisoformat(value).isoformat()
    except ValueError as err:
        raise ValueError("date_invalid") from err


def _date_range(start: str | None, end: str | None) -> None:
    if start and end and end < start:
        raise ValueError("trip_date_range_invalid")


def _runtime(hass: HomeAssistant, vehicle_id: str):
    runtime = hass.data.get("camper_travel_journal", {}).get(vehicle_id)
    if runtime is None:
        raise ValueError("vehicle_not_loaded")
    return runtime


async def _call(hass: HomeAssistant, msg: dict, method: str, *args, **kwargs):
    runtime = _runtime(hass, msg["vehicle_id"])
    return await runtime.worker.async_call(method, *args, **kwargs)


def _send_error(connection, msg: dict, error: Exception) -> None:
    """Return a stable, non-sensitive public error contract at the API edge."""
    raw_code = getattr(error, "args", ("request_failed",))[0] if getattr(error, "args", None) else "request_failed"
    code = raw_code if isinstance(raw_code, str) and raw_code.isidentifier() and len(raw_code) <= 64 else "request_failed"
    # The frontend translates stable codes; never expose exception text, SQL,
    # paths or trip data through the websocket boundary.
    connection.send_error(msg["id"], code, code)


def _simplify_points(points: list[dict], tolerance_m: float) -> list[dict]:
    """Simplify only the response copy; persisted GPS points are untouched."""
    if tolerance_m <= 0 or len(points) < 3:
        return points
    lat_scale = 111_320.0
    lon_scale = 111_320.0 * max(0.1, abs(cos(radians(points[0]["latitude"]))))
    xy = [(point["longitude"] * lon_scale, point["latitude"] * lat_scale) for point in points]

    def distance(index: int, start: int, end: int) -> float:
        x, y = xy[index]
        x1, y1 = xy[start]
        x2, y2 = xy[end]
        if x1 == x2 and y1 == y2:
            return hypot(x - x1, y - y1)
        return abs((y2 - y1) * x - (x2 - x1) * y + x2 * y1 - y2 * x1) / hypot(y2 - y1, x2 - x1)

    keep = {0, len(points) - 1}

    def recurse(start: int, end: int) -> None:
        if end <= start + 1:
            return
        farthest = max(range(start + 1, end), key=lambda index: distance(index, start, end))
        if distance(farthest, start, end) > tolerance_m:
            keep.add(farthest)
            recurse(start, farthest)
            recurse(farthest, end)

    recurse(0, len(points) - 1)
    return [point for index, point in enumerate(points) if index in keep]


def _route_response(segments: list[dict], max_points: int, tolerance_m: float) -> dict:
    total_points = sum(len(segment["points"]) for segment in segments)
    returned = 0
    remaining = max_points
    bounds: list[float] = []
    output = []
    for segment in segments:
        points = [dict(point) for point in segment["points"]]
        simplified = _simplify_points(points, tolerance_m)
        simplified_by_tolerance = len(simplified) < len(points)
        truncated = False
        if len(simplified) > remaining:
            simplified = simplified[:remaining]
            truncated = True
        remaining = max(0, remaining - len(simplified))
        returned += len(simplified)
        for point in simplified:
            bounds.extend((point["latitude"], point["longitude"]))
        gaps = []
        for left, right in zip(points, points[1:]):
            elapsed = datetime.fromisoformat(right["recorded_at"]) - datetime.fromisoformat(left["recorded_at"])
            if elapsed > DEFAULT_MAX_GPS_GAP:
                gaps.append({"from": left["recorded_at"], "to": right["recorded_at"], "seconds": int(elapsed.total_seconds())})
        output.append({**segment, "points": simplified, "original_point_count": len(points), "gaps": gaps, "simplified": simplified_by_tolerance, "truncated": truncated})
    return {
        "segments": output,
        "total_points": total_points,
        "returned_points": returned,
        "truncated": any(segment["truncated"] for segment in output),
        "bounds": {"south": min(bounds[::2]), "west": min(bounds[1::2]), "north": max(bounds[::2]), "east": max(bounds[1::2])} if bounds else None,
        "simplify_tolerance_m": tolerance_m,
    }


if websocket_api is not None:
    def _base(command: str) -> dict:
        """Build a command schema with an exact websocket command name."""
        return {vol.Required("type"): command, vol.Required("vehicle_id"): str}

    @websocket_api.websocket_command({vol.Required("type"): "camper_travel_journal/list_vehicles"})
    @websocket_api.async_response
    async def ws_list_vehicles(hass: HomeAssistant, connection, msg: dict) -> None:
        """Return configured journal hubs for the visual Lovelace editor."""
        vehicles = []
        for vehicle_id, runtime in hass.data.get("camper_travel_journal", {}).items():
            if not isinstance(vehicle_id, str) or not hasattr(runtime, "values"):
                continue
            vehicles.append({
                "vehicle_id": vehicle_id,
                "name": runtime.values.get("vehicle_name", "Wohnmobil"),
                "title": getattr(runtime.entry, "title", "Camper Travel Journal"),
            })
        connection.send_result(msg["id"], {"vehicles": sorted(vehicles, key=lambda item: item["name"].lower())})

    @websocket_api.websocket_command({**_base("camper_travel_journal/export_pdf"), vol.Required("trip_id"): str})
    @websocket_api.async_response
    async def ws_export_pdf(hass: HomeAssistant, connection, msg: dict) -> None:
        """Create one authenticated, in-memory PDF report for a trip."""
        try:
            vehicle_id = msg["vehicle_id"]
            trip_id = msg["trip_id"]
            trips = await _call(hass, msg, "list_trips", vehicle_id)
            trip = next((item for item in trips if item.get("id") == trip_id), None)
            if trip is None:
                raise ValueError("trip_not_found")
            vehicle_name = _runtime(hass, vehicle_id).values.get("vehicle_name", "Wohnmobil")
            drives = await _call(hass, msg, "list_drives", vehicle_id, trip_id=trip_id)
            report = {
                "vehicle_name": vehicle_name,
                "trip": trip,
                "drives": await _resolve_drive_labels(hass, msg, drives),
                "route_segments": await _call(hass, msg, "route_segments", vehicle_id, trip_id),
                "interruptions": await _call(hass, msg, "list_trip_interruptions", vehicle_id, trip_id),
                "stops": await _call(hass, msg, "list_stops", vehicle_id, trip_id=trip_id),
                "expenses": await _call(hass, msg, "list_expenses", trip_id),
                "expense_summary": await _call(hass, msg, "expense_summary", trip_id),
            }
            from .pdf_report import render_trip_report
            language = getattr(getattr(hass, "config", None), "language", "de")
            time_zone = getattr(getattr(hass, "config", None), "time_zone", "UTC")
            pdf, filename = render_trip_report(report, language=language, time_zone=time_zone)
            connection.send_result(msg["id"], {
                "content_type": "application/pdf",
                "filename": filename,
                "pdf_base64": base64.b64encode(pdf).decode("ascii"),
            })
        except Exception as err:
            _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/list"), vol.Optional("trip_id"): str})
    @websocket_api.async_response
    async def ws_list(hass: HomeAssistant, connection, msg: dict) -> None:
        try:
            trip_id = msg.get("trip_id")
            drives = await _call(hass, msg, "list_drives", msg["vehicle_id"], trip_id=trip_id) if trip_id else await _call(hass, msg, "list_drives", msg["vehicle_id"])
            result = {
                "trips": await _call(hass, msg, "list_trips", msg["vehicle_id"]),
                "drives": await _resolve_drive_labels(hass, msg, drives),
                "stops": await _call(hass, msg, "list_stops", msg["vehicle_id"], trip_id=trip_id),
                "stop_suggestions": await _call(hass, msg, "list_stop_suggestions", msg["vehicle_id"], trip_id=trip_id) if trip_id else await _call(hass, msg, "list_stop_suggestions", msg["vehicle_id"]),
            }
            if trip_id:
                result["interruptions"] = await _call(hass, msg, "list_trip_interruptions", msg["vehicle_id"], trip_id)
            result["map_config"] = _map_config(_runtime(hass, msg["vehicle_id"]).values)
            if trip_id:
                result["available_drives"] = await _call(hass, msg, "list_available_drives", msg["vehicle_id"])
                result["expenses"] = await _call(hass, msg, "list_expenses", trip_id)
                result["expense_summary"] = await _call(hass, msg, "expense_summary", trip_id)
            connection.send_result(msg["id"], result)
        except Exception as err:  # API boundary must not expose tracebacks
            _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/route"), vol.Optional("trip_id"): str, vol.Optional("drive_ids"): [str], vol.Optional("max_points", default=5000): vol.Coerce(int), vol.Optional("simplify_tolerance_m", default=0.0): vol.Coerce(float)})
    @websocket_api.async_response
    async def ws_route(hass: HomeAssistant, connection, msg: dict) -> None:
        """Return authenticated, read-only route geometry for one vehicle."""
        try:
            max_points = msg.get("max_points", 5000)
            tolerance_m = msg.get("simplify_tolerance_m", 0.0)
            if not 1 <= max_points <= 100_000:
                raise ValueError("route_max_points_invalid")
            if not 0 <= tolerance_m <= 10_000:
                raise ValueError("route_simplify_tolerance_invalid")
            segments = await _call(hass, msg, "route_segments", msg["vehicle_id"], msg.get("trip_id"), msg.get("drive_ids"))
            result = _route_response(segments, max_points, tolerance_m)
            result.update({"vehicle_id": msg["vehicle_id"], "trip_id": msg.get("trip_id"), "association_semantics": "explicit_only"})
            connection.send_result(msg["id"], result)
        except Exception as err:
            _send_error(connection, msg, err)

    @websocket_api.websocket_command(_base("camper_travel_journal/diagnostics"))
    @websocket_api.async_response
    async def ws_diagnostics(hass: HomeAssistant, connection, msg: dict) -> None:
        """Return read-only collector health without GPS coordinates."""
        try:
            connection.send_result(msg["id"], await _runtime(hass, msg["vehicle_id"]).async_diagnostics())
        except Exception as err:
            _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/create_trip"), vol.Required("title"): str, vol.Optional("description", default=""): str, vol.Optional("destination", default=""): str, vol.Optional("started_at"): str, vol.Optional("start_date"): str, vol.Optional("end_date"): str})
    @websocket_api.async_response
    async def ws_create_trip(hass, connection, msg):
        try:
            started = _timestamp(msg.get("started_at"), required=False) or _now()
            start_date = _date(msg.get("start_date"))
            end_date = _date(msg.get("end_date"))
            _date_range(start_date, end_date)
            if not msg["title"].strip(): raise ValueError("title_required")
            result = await _call(hass, msg, "create_trip", msg["vehicle_id"], msg["title"], started, _now(), description=msg.get("description", ""), destination=msg.get("destination", ""), start_date=start_date, end_date=end_date)
            connection.send_result(msg["id"], {"trip_id": result})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/update_trip"), vol.Required("trip_id"): str, vol.Optional("title"): str, vol.Optional("description"): str, vol.Optional("destination"): str, vol.Optional("started_at"): str, vol.Optional("start_date"): str, vol.Optional("end_date"): str})
    @websocket_api.async_response
    async def ws_update_trip(hass, connection, msg):
        try:
            fields = {key: msg[key] for key in ("title", "description", "destination") if key in msg}
            if "title" in fields and not fields["title"].strip(): raise ValueError("title_required")
            if "started_at" in msg: fields["started_at"] = _timestamp(msg["started_at"])
            if "start_date" in msg: fields["start_date"] = _date(msg["start_date"])
            if "end_date" in msg: fields["end_date"] = _date(msg["end_date"])
            if "start_date" in fields or "end_date" in fields:
                trips = await _call(hass, msg, "list_trips", msg["vehicle_id"])
                current = next((trip for trip in trips if trip["id"] == msg["trip_id"]), None)
                if current is None: raise ValueError("trip_not_found")
                _date_range(fields.get("start_date", current.get("start_date")), fields.get("end_date", current.get("end_date")))
            await _call(hass, msg, "update_trip", msg["trip_id"], _now(), **fields)
            connection.send_result(msg["id"], {"success": True})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/delete_trip"), vol.Required("trip_id"): str})
    @websocket_api.async_response
    async def ws_delete_trip(hass, connection, msg):
        try:
            await _call(hass, msg, "delete_trip", msg["trip_id"])
            connection.send_result(msg["id"], {"success": True})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/transition_trip"), vol.Required("trip_id"): str, vol.Required("status"): str})
    @websocket_api.async_response
    async def ws_transition_trip(hass, connection, msg):
        try:
            trips = await _call(hass, msg, "list_trips", msg["vehicle_id"])
            trip = next((item for item in trips if item["id"] == msg["trip_id"]), None)
            if trip is None: raise ValueError("trip_not_found")
            validate_transition(trip["status"], msg["status"])
            ended = _now() if msg["status"] == "completed" else None
            await _call(hass, msg, "update_trip", msg["trip_id"], _now(), status=msg["status"], ended_at=ended)
            connection.send_result(msg["id"], {"success": True})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/link_drives"), vol.Required("trip_id"): str, vol.Required("drive_ids"): [str]})
    @websocket_api.async_response
    async def ws_link_drives(hass, connection, msg):
        try:
            await _call(hass, msg, "link_drives", msg["trip_id"], msg["drive_ids"], _now())
            connection.send_result(msg["id"], {"success": True})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/unlink_drive"), vol.Required("trip_id"): str, vol.Required("drive_id"): str})
    @websocket_api.async_response
    async def ws_unlink_drive(hass, connection, msg):
        try:
            await _call(hass, msg, "unlink_drive", msg["trip_id"], msg["drive_id"])
            connection.send_result(msg["id"], {"success": True})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/create_manual_drive"), vol.Required("occurred_at"): str, vol.Required("start_location"): str, vol.Required("end_location"): str, vol.Required("distance_km"): vol.Coerce(float), vol.Optional("duration_minutes"): vol.Coerce(int), vol.Optional("trip_id"): str})
    @websocket_api.async_response
    async def ws_create_manual_drive(hass, connection, msg):
        try:
            started = _timestamp(msg["occurred_at"])
            result = await _call(hass, msg, "create_manual_drive", msg["vehicle_id"], started, msg["start_location"], msg["end_location"], msg["distance_km"], msg.get("duration_minutes"), _now(), msg.get("trip_id"))
            connection.send_result(msg["id"], {"drive_id": result})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/update_manual_drive"), vol.Required("drive_id"): str, vol.Required("occurred_at"): str, vol.Required("start_location"): str, vol.Required("end_location"): str, vol.Required("distance_km"): vol.Coerce(float), vol.Optional("duration_minutes"): vol.Coerce(int)})
    @websocket_api.async_response
    async def ws_update_manual_drive(hass, connection, msg):
        try:
            await _call(hass, msg, "update_manual_drive", msg["drive_id"], msg["vehicle_id"], _timestamp(msg["occurred_at"]), msg["start_location"], msg["end_location"], msg["distance_km"], msg.get("duration_minutes"), _now())
            connection.send_result(msg["id"], {"success": True})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/delete_manual_drive"), vol.Required("drive_id"): str})
    @websocket_api.async_response
    async def ws_delete_manual_drive(hass, connection, msg):
        try:
            await _call(hass, msg, "delete_manual_drive", msg["drive_id"], msg["vehicle_id"])
            connection.send_result(msg["id"], {"success": True})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/create_stop"), vol.Optional("trip_id"): str, vol.Optional("drive_id"): str, vol.Required("occurred_at"): str, vol.Optional("arrived_at"): str, vol.Optional("departed_at"): str, vol.Optional("name", default=""): str, vol.Optional("category", default="other"): str, vol.Optional("place_type"): str, vol.Optional("address", default=""): str, vol.Optional("description", default=""): str, vol.Optional("latitude"): vol.Coerce(float), vol.Optional("longitude"): vol.Coerce(float)})
    @websocket_api.async_response
    async def ws_create_stop(hass, connection, msg):
        try:
            occurred = _timestamp(msg["occurred_at"])
            arrived = _timestamp(msg.get("arrived_at"), required=False) or occurred
            departed = _timestamp(msg.get("departed_at"), required=False)
            category = msg.get("place_type") or msg["category"]
            stop = Stop(id="", vehicle_id=msg["vehicle_id"], trip_id=msg.get("trip_id"), drive_id=msg.get("drive_id"), name=msg["name"] or "Zwischenstopp", occurred_at=occurred, arrived_at=arrived, departed_at=departed, latitude=msg.get("latitude"), longitude=msg.get("longitude"), description=msg.get("description", ""), stop_type=category, place_type=category, address=msg.get("address", ""), automatic=False, source="manual", confirmed=True)
            result = await _call(hass, msg, "create_stop", stop, _now())
            connection.send_result(msg["id"], {"stop_id": result})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/update_stop"), vol.Required("stop_id"): str, vol.Optional("trip_id"): str, vol.Optional("drive_id"): str, vol.Optional("name"): str, vol.Optional("occurred_at"): str, vol.Optional("arrived_at"): str, vol.Optional("departed_at"): str, vol.Optional("category"): str, vol.Optional("place_type"): str, vol.Optional("address"): str, vol.Optional("description"): str, vol.Optional("latitude"): vol.Coerce(float), vol.Optional("longitude"): vol.Coerce(float)})
    @websocket_api.async_response
    async def ws_update_stop(hass, connection, msg):
        try:
            fields = {key: msg[key] for key in ("name", "category", "place_type", "address", "description", "latitude", "longitude", "trip_id", "drive_id") if key in msg}
            if "occurred_at" in msg: fields["occurred_at"] = _timestamp(msg["occurred_at"])
            if "arrived_at" in msg: fields["arrived_at"] = _timestamp(msg["arrived_at"], required=False)
            if "departed_at" in msg: fields["departed_at"] = _timestamp(msg["departed_at"], required=False)
            if "category" in fields: fields["stop_type"] = fields.pop("category")
            if "place_type" in fields: fields["stop_type"] = fields["place_type"]
            await _call(hass, msg, "update_stop", msg["stop_id"], _now(), **fields)
            connection.send_result(msg["id"], {"success": True})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/delete_stop"), vol.Required("stop_id"): str})
    @websocket_api.async_response
    async def ws_delete_stop(hass, connection, msg):
        try:
            await _call(hass, msg, "delete_stop", msg["stop_id"])
            connection.send_result(msg["id"], {"success": True})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/assign_interruption"), vol.Required("trip_id"): str, vol.Required("interruption_id"): str, vol.Required("status"): str, vol.Optional("stop_id"): str})
    @websocket_api.async_response
    async def ws_assign_interruption(hass, connection, msg):
        try:
            await _call(hass, msg, "assign_interruption", msg["trip_id"], msg["interruption_id"], _now(), status=msg["status"], stop_id=msg.get("stop_id"))
            connection.send_result(msg["id"], {"success": True})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/create_stop_from_interruption"), vol.Required("trip_id"): str, vol.Required("interruption_id"): str, vol.Required("name"): str, vol.Optional("place_type", default="other"): str, vol.Optional("overnight", default=False): bool, vol.Optional("address", default=""): str, vol.Optional("description", default=""): str, vol.Optional("website_url"): str})
    @websocket_api.async_response
    async def ws_create_stop_from_interruption(hass, connection, msg):
        try:
            if not msg["name"].strip():
                raise ValueError("place_name_required")
            stop_id = await _call(hass, msg, "create_stop_from_interruption", msg["trip_id"], msg["interruption_id"], _now(), name=msg["name"], place_type=msg.get("place_type", "other"), overnight=msg.get("overnight", False), address=msg.get("address", ""), description=msg.get("description", ""), website_url=msg.get("website_url"))
            connection.send_result(msg["id"], {"stop_id": stop_id})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/create_expense"), vol.Required("trip_id"): str, vol.Optional("occurred_at"): str, vol.Optional("occurred_on"): str, vol.Optional("occurred_time"): str, vol.Required("category"): str, vol.Optional("amount_minor"): vol.Coerce(int), vol.Optional("currency", default="EUR"): str, vol.Optional("note"): vol.Any(str, None), vol.Optional("odometer_km"): vol.Coerce(float), vol.Optional("place_id"): str, vol.Optional("stay_id"): str, vol.Optional("fuel_liters"): vol.Any(vol.Coerce(float), None), vol.Optional("fuel_price_per_liter"): vol.Any(vol.Coerce(float), None), vol.Optional("services", default=[]): [str]})
    @websocket_api.async_response
    async def ws_create_expense(hass, connection, msg):
        try:
            actual_on = _date(msg.get("occurred_on"), required=True) if msg.get("occurred_on") else None
            legacy_at = _timestamp(msg.get("occurred_at"), required=False) if msg.get("occurred_at") else _now()
            if actual_on is None:
                actual_on = legacy_at.date().isoformat()
            category = validate_expense_category(msg["category"])
            services = validate_expense_services(msg.get("services", []))
            amount = msg.get("amount_minor")
            if category != "fuel" and amount is None:
                raise ValueError("amount_required")
            amount, liters, price = resolve_fuel_values(amount, msg.get("fuel_liters"), msg.get("fuel_price_per_liter")) if category == "fuel" else (validate_amount(amount), None, None)
            expense = Expense(id="", trip_id=msg["trip_id"], occurred_at=legacy_at, category=category, amount_minor=amount or 0, currency=validate_expense_currency(msg["currency"]), note=validate_expense_note(msg.get("note")), odometer_km=msg.get("odometer_km"), place_id=msg.get("place_id"), stay_id=msg.get("stay_id"), occurred_on=actual_on, occurred_time=msg.get("occurred_time"), fuel_liters=liters, fuel_price_per_liter=price, services=services)
            result = await _call(hass, msg, "create_expense", expense, _now())
            connection.send_result(msg["id"], {"expense_id": result})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/update_expense"), vol.Required("expense_id"): str, vol.Optional("occurred_at"): str, vol.Optional("occurred_on"): vol.Any(str, None), vol.Optional("occurred_time"): vol.Any(str, None), vol.Optional("category"): str, vol.Optional("amount_minor"): vol.Coerce(int), vol.Optional("currency"): str, vol.Optional("note"): vol.Any(str, None), vol.Optional("odometer_km"): vol.Coerce(float), vol.Optional("place_id"): str, vol.Optional("stay_id"): str, vol.Optional("fuel_liters"): vol.Any(vol.Coerce(float), None), vol.Optional("fuel_price_per_liter"): vol.Any(vol.Coerce(float), None), vol.Optional("services"): [str]})
    @websocket_api.async_response
    async def ws_update_expense(hass, connection, msg):
        try:
            fields = {key: msg[key] for key in ("currency", "note", "odometer_km", "amount_minor", "place_id", "stay_id", "occurred_on", "occurred_time", "fuel_liters", "fuel_price_per_liter") if key in msg}
            if "category" in msg: fields["category"] = validate_expense_category(msg["category"])
            if "occurred_at" in msg: fields["occurred_at"] = _timestamp(msg["occurred_at"])
            if "occurred_on" in msg: fields["occurred_on"] = _date(msg["occurred_on"], required=True)
            if "amount_minor" in fields: fields["amount_minor"] = validate_amount(fields["amount_minor"])
            if "currency" in fields: fields["currency"] = validate_expense_currency(fields["currency"])
            if "note" in fields: fields["note"] = validate_expense_note(fields["note"])
            if "services" in fields: fields["services"] = validate_expense_services(fields["services"])
            await _call(hass, msg, "update_expense", msg["expense_id"], _now(), **fields)
            connection.send_result(msg["id"], {"success": True})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/delete_expense"), vol.Required("expense_id"): str})
    @websocket_api.async_response
    async def ws_delete_expense(hass, connection, msg):
        try:
            await _call(hass, msg, "delete_expense", msg["expense_id"])
            connection.send_result(msg["id"], {"success": True})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/update_overnight"), vol.Required("place_id"): str, vol.Optional("place_kind"): str, vol.Optional("website_url"): str, vol.Optional("booking_note"): str, vol.Optional("large_rv_suitable"): bool})
    @websocket_api.async_response
    async def ws_update_overnight(hass, connection, msg):
        try:
            fields = {key: msg[key] for key in ("place_kind", "website_url", "booking_note", "large_rv_suitable") if key in msg}
            await _call(hass, msg, "upsert_overnight_details", msg["place_id"], _now(), **fields)
            connection.send_result(msg["id"], {"success": True})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/update_rating"), vol.Required("place_id"): str, vol.Required("overall"): vol.Coerce(int), vol.Optional("large_rv_access"): vol.Coerce(int), vol.Optional("space_maneuvering"): vol.Coerce(int), vol.Optional("facilities"): vol.Coerce(int), vol.Optional("surroundings"): vol.Coerce(int), vol.Optional("review_text", default=""): str, vol.Optional("rated_at"): str})
    @websocket_api.async_response
    async def ws_update_rating(hass, connection, msg):
        try:
            fields = {key: msg[key] for key in ("overall", "large_rv_access", "space_maneuvering", "facilities", "surroundings", "review_text", "rated_at") if key in msg}
            await _call(hass, msg, "upsert_place_rating", msg["place_id"], _now(), **fields)
            connection.send_result(msg["id"], {"success": True})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/delete_rating"), vol.Required("place_id"): str})
    @websocket_api.async_response
    async def ws_delete_rating(hass, connection, msg):
        try:
            await _call(hass, msg, "delete_place_rating", msg["place_id"])
            connection.send_result(msg["id"], {"success": True})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/list_stop_suggestions"), vol.Optional("trip_id"): str, vol.Optional("status", default="pending"): str})
    @websocket_api.async_response
    async def ws_list_stop_suggestions(hass, connection, msg):
        try:
            connection.send_result(msg["id"], {"suggestions": await _call(hass, msg, "list_stop_suggestions", msg["vehicle_id"], trip_id=msg.get("trip_id"), status=msg.get("status", "pending"))})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/generate_stop_suggestions"), vol.Optional("trip_id"): str, vol.Optional("minimum_minutes", default=10): vol.Coerce(int), vol.Optional("radius_m", default=150): vol.Coerce(float), vol.Optional("historical_only", default=False): bool})
    @websocket_api.async_response
    async def ws_generate_stop_suggestions(hass, connection, msg):
        try:
            result = await _call(hass, msg, "generate_stop_suggestions", msg["vehicle_id"], _now(), minimum_minutes=msg.get("minimum_minutes", 10), radius_m=msg.get("radius_m", 150), trip_id=msg.get("trip_id"), historical_only=msg.get("historical_only", False))
            connection.send_result(msg["id"], {"suggestions": result})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/accept_stop_suggestion"), vol.Required("suggestion_id"): str, vol.Optional("trip_id"): str, vol.Optional("name", default="GPS-Stopp"): str, vol.Optional("place_type", default="other"): str})
    @websocket_api.async_response
    async def ws_accept_stop_suggestion(hass, connection, msg):
        try:
            stop_id = await _call(hass, msg, "accept_stop_suggestion", msg["suggestion_id"], _now(), name=msg.get("name", "GPS-Stopp"), place_type=msg.get("place_type", "other"), trip_id=msg.get("trip_id"))
            connection.send_result(msg["id"], {"stop_id": stop_id})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/dismiss_stop_suggestion"), vol.Required("suggestion_id"): str})
    @websocket_api.async_response
    async def ws_dismiss_stop_suggestion(hass, connection, msg):
        try:
            await _call(hass, msg, "dismiss_stop_suggestion", msg["suggestion_id"], _now())
            connection.send_result(msg["id"], {"success": True})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/analyze_gpx"), vol.Required("content_base64"): str})
    @websocket_api.async_response
    async def ws_analyze_gpx(hass, connection, msg):
        """Analyze an authenticated file in memory; this command is read-only."""
        try:
            encoded = msg["content_base64"]
            if len(encoded) > MAX_FILE_BYTES * 2:
                raise ValueError("gpx_file_too_large")
            data = base64.b64decode(encoded, validate=True)
            preview = analyze_gpx(data, msg["vehicle_id"])
            conflicts = await _call(hass, msg, "gpx_conflicts", msg["vehicle_id"], preview)
            connection.send_result(msg["id"], {"file_hash": preview.file_hash, "warnings": list(preview.warnings), "duplicate_point_keys": list(preview.duplicate_point_keys), "conflicts": conflicts, "points": [{"key": item.key, "recorded_at": item.point.recorded_at.isoformat(), "latitude": item.point.latitude, "longitude": item.point.longitude} for item in preview.points], "drives": [{"key": item.key, "started_at": item.started_at.isoformat(), "ended_at": item.ended_at.isoformat(), "distance_m": item.distance_m, "duration_seconds": item.duration_seconds, "reason": item.reason} for item in preview.drives]})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/import_gpx"), vol.Required("content_base64"): str, vol.Required("file_hash"): str, vol.Optional("trip_id"): str, vol.Optional("drive_keys", default=[]): [str]})
    @websocket_api.async_response
    async def ws_import_gpx(hass, connection, msg):
        """Re-analyze and atomically import only after explicit confirmation."""
        try:
            encoded = msg["content_base64"]
            if len(encoded) > MAX_FILE_BYTES * 2:
                raise ValueError("gpx_file_too_large")
            preview = analyze_gpx(base64.b64decode(encoded, validate=True), msg["vehicle_id"])
            if preview.file_hash != msg["file_hash"]:
                raise ValueError("gpx_preview_mismatch")
            result = await _call(hass, msg, "import_gpx", msg["vehicle_id"], preview, msg.get("trip_id"), _now(), msg.get("drive_keys"))
            connection.send_result(msg["id"], result)
        except Exception as err: _send_error(connection, msg, err)

    COMMANDS = (ws_list_vehicles, ws_export_pdf, ws_list, ws_route, ws_diagnostics, ws_create_trip, ws_update_trip, ws_delete_trip, ws_transition_trip, ws_link_drives, ws_unlink_drive, ws_create_manual_drive, ws_update_manual_drive, ws_delete_manual_drive, ws_create_stop, ws_update_stop, ws_delete_stop, ws_assign_interruption, ws_create_stop_from_interruption, ws_create_expense, ws_update_expense, ws_delete_expense, ws_update_overnight, ws_update_rating, ws_delete_rating, ws_list_stop_suggestions, ws_generate_stop_suggestions, ws_accept_stop_suggestion, ws_dismiss_stop_suggestion, ws_analyze_gpx, ws_import_gpx)
else:
    COMMANDS = ()


def async_register(hass: HomeAssistant) -> None:
    """Register the public, authenticated HA WebSocket commands once."""
    if websocket_api is None:
        return
    marker = hass.data.setdefault("camper_travel_journal", {}).setdefault("_api_registered", False)
    if marker:
        return
    for command in COMMANDS:
        websocket_api.async_register_command(hass, command)
    hass.data["camper_travel_journal"]["_api_registered"] = True
