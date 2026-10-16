"""Authenticated Home Assistant WebSocket API for the travel cards."""

from __future__ import annotations

from datetime import date, datetime, timezone
import base64
from math import cos, hypot, radians
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
from .travel import validate_amount, validate_expense_category, validate_expense_currency, validate_transition
from .const import (
    CARTO_TILE_ATTRIBUTION, CARTO_TILE_URL, CONF_CARTO_API_KEY,
    CONF_MAP_PROVIDER, DEFAULT_MAX_GPS_GAP, MAP_PROVIDER_CARTO,
)


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
    connection.send_error(msg["id"], getattr(error, "args", ["request_failed"])[0], str(error))


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

    @websocket_api.websocket_command({**_base("camper_travel_journal/list"), vol.Optional("trip_id"): str})
    @websocket_api.async_response
    async def ws_list(hass: HomeAssistant, connection, msg: dict) -> None:
        try:
            trip_id = msg.get("trip_id")
            result = {
                "trips": await _call(hass, msg, "list_trips", msg["vehicle_id"]),
                "drives": await _call(hass, msg, "list_drives", msg["vehicle_id"], trip_id=trip_id) if trip_id else await _call(hass, msg, "list_drives", msg["vehicle_id"]),
                "stops": await _call(hass, msg, "list_stops", msg["vehicle_id"], trip_id=trip_id),
            }
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

    @websocket_api.websocket_command({**_base("camper_travel_journal/create_stop"), vol.Required("trip_id"): str, vol.Required("occurred_at"): str, vol.Optional("name", default=""): str, vol.Optional("category", default="other"): str, vol.Optional("latitude"): vol.Coerce(float), vol.Optional("longitude"): vol.Coerce(float)})
    @websocket_api.async_response
    async def ws_create_stop(hass, connection, msg):
        try:
            stop = Stop(id="", vehicle_id=msg["vehicle_id"], trip_id=msg["trip_id"], name=msg["name"] or "Zwischenstopp", occurred_at=_timestamp(msg["occurred_at"]), latitude=msg.get("latitude"), longitude=msg.get("longitude"), stop_type=msg["category"], automatic=False)
            result = await _call(hass, msg, "create_stop", stop, _now())
            connection.send_result(msg["id"], {"stop_id": result})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/update_stop"), vol.Required("stop_id"): str, vol.Optional("name"): str, vol.Optional("occurred_at"): str, vol.Optional("category"): str, vol.Optional("description"): str, vol.Optional("latitude"): vol.Coerce(float), vol.Optional("longitude"): vol.Coerce(float)})
    @websocket_api.async_response
    async def ws_update_stop(hass, connection, msg):
        try:
            fields = {key: msg[key] for key in ("name", "category", "description", "latitude", "longitude") if key in msg}
            if "occurred_at" in msg: fields["occurred_at"] = _timestamp(msg["occurred_at"])
            if "category" in fields: fields["stop_type"] = fields.pop("category")
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

    @websocket_api.websocket_command({**_base("camper_travel_journal/create_expense"), vol.Required("trip_id"): str, vol.Required("occurred_at"): str, vol.Required("category"): str, vol.Required("amount_minor"): vol.Coerce(int), vol.Optional("currency", default="EUR"): str, vol.Optional("note"): str, vol.Optional("odometer_km"): vol.Coerce(float)})
    @websocket_api.async_response
    async def ws_create_expense(hass, connection, msg):
        try:
            expense = Expense(id="", trip_id=msg["trip_id"], occurred_at=_timestamp(msg["occurred_at"]), category=validate_expense_category(msg["category"]), amount_minor=validate_amount(msg["amount_minor"]), currency=validate_expense_currency(msg["currency"]), note=msg.get("note"), odometer_km=msg.get("odometer_km"))
            result = await _call(hass, msg, "create_expense", expense, _now())
            connection.send_result(msg["id"], {"expense_id": result})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base("camper_travel_journal/update_expense"), vol.Required("expense_id"): str, vol.Optional("occurred_at"): str, vol.Optional("category"): str, vol.Optional("amount_minor"): vol.Coerce(int), vol.Optional("currency"): str, vol.Optional("note"): str, vol.Optional("odometer_km"): vol.Coerce(float)})
    @websocket_api.async_response
    async def ws_update_expense(hass, connection, msg):
        try:
            fields = {key: msg[key] for key in ("currency", "note", "odometer_km", "amount_minor") if key in msg}
            if "category" in msg: fields["category"] = validate_expense_category(msg["category"])
            if "occurred_at" in msg: fields["occurred_at"] = _timestamp(msg["occurred_at"])
            if "amount_minor" in fields: fields["amount_minor"] = validate_amount(fields["amount_minor"])
            if "currency" in fields: fields["currency"] = validate_expense_currency(fields["currency"])
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

    COMMANDS = (ws_list_vehicles, ws_list, ws_route, ws_diagnostics, ws_create_trip, ws_update_trip, ws_delete_trip, ws_transition_trip, ws_link_drives, ws_unlink_drive, ws_create_manual_drive, ws_update_manual_drive, ws_delete_manual_drive, ws_create_stop, ws_update_stop, ws_delete_stop, ws_create_expense, ws_update_expense, ws_delete_expense, ws_analyze_gpx, ws_import_gpx)
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
