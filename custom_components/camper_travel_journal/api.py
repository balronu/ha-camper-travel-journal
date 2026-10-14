"""Authenticated Home Assistant WebSocket API for the travel cards."""

from __future__ import annotations

from datetime import datetime, timezone
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
from .travel import validate_amount, validate_transition


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


def _runtime(hass: HomeAssistant, vehicle_id: str):
    runtime = hass.data.get("camper_travel_journal", {}).get(vehicle_id)
    if runtime is None:
        raise ValueError("vehicle_not_loaded")
    return runtime


async def _call(hass: HomeAssistant, msg: dict, method: str, *args):
    runtime = _runtime(hass, msg["vehicle_id"])
    return await runtime.worker.async_call(method, *args)


def _send_error(connection, msg: dict, error: Exception) -> None:
    connection.send_error(msg["id"], getattr(error, "args", ["request_failed"])[0], str(error))


if websocket_api is not None:
    _base = {vol.Required("type"): str, vol.Required("vehicle_id"): str}

    @websocket_api.websocket_command({**_base, vol.Optional("trip_id"): str})
    @websocket_api.async_response
    async def ws_list(hass: HomeAssistant, connection, msg: dict) -> None:
        try:
            trip_id = msg.get("trip_id")
            result = {
                "trips": await _call(hass, msg, "list_trips", msg["vehicle_id"]),
                "drives": await _call(hass, msg, "list_drives", msg["vehicle_id"], trip_id=trip_id) if trip_id else await _call(hass, msg, "list_drives", msg["vehicle_id"]),
                "stops": await _call(hass, msg, "list_stops", msg["vehicle_id"], trip_id=trip_id),
            }
            if trip_id:
                result["expenses"] = await _call(hass, msg, "list_expenses", trip_id)
                result["expense_summary"] = await _call(hass, msg, "expense_summary", trip_id)
            connection.send_result(msg["id"], result)
        except Exception as err:  # API boundary must not expose tracebacks
            _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base, vol.Required("title"): str, vol.Optional("description", default=""): str, vol.Optional("destination", default=""): str, vol.Required("started_at"): str})
    @websocket_api.async_response
    async def ws_create_trip(hass, connection, msg):
        try:
            started = _timestamp(msg["started_at"])
            if not msg["title"].strip(): raise ValueError("title_required")
            result = await _call(hass, msg, "create_trip", msg["vehicle_id"], msg["title"], started, _now(), description=msg["description"], destination=msg["destination"])
            connection.send_result(msg["id"], {"trip_id": result})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base, vol.Required("trip_id"): str, vol.Required("status"): str})
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

    @websocket_api.websocket_command({**_base, vol.Required("trip_id"): str, vol.Required("drive_ids"): [str]})
    @websocket_api.async_response
    async def ws_link_drives(hass, connection, msg):
        try:
            await _call(hass, msg, "link_drives", msg["trip_id"], msg["drive_ids"], _now())
            connection.send_result(msg["id"], {"success": True})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base, vol.Required("trip_id"): str, vol.Required("occurred_at"): str, vol.Optional("name", default=""): str, vol.Optional("category", default="other"): str, vol.Optional("latitude"): vol.Coerce(float), vol.Optional("longitude"): vol.Coerce(float)})
    @websocket_api.async_response
    async def ws_create_stop(hass, connection, msg):
        try:
            stop = Stop(id="", vehicle_id=msg["vehicle_id"], trip_id=msg["trip_id"], name=msg["name"] or "Zwischenstopp", occurred_at=_timestamp(msg["occurred_at"]), latitude=msg.get("latitude"), longitude=msg.get("longitude"), stop_type=msg["category"], automatic=False)
            result = await _call(hass, msg, "create_stop", stop, _now())
            connection.send_result(msg["id"], {"stop_id": result})
        except Exception as err: _send_error(connection, msg, err)

    @websocket_api.websocket_command({**_base, vol.Required("trip_id"): str, vol.Required("occurred_at"): str, vol.Required("category"): str, vol.Required("amount_minor"): vol.Coerce(int), vol.Optional("currency", default="EUR"): str, vol.Optional("note"): str, vol.Optional("odometer_km"): vol.Coerce(float)})
    @websocket_api.async_response
    async def ws_create_expense(hass, connection, msg):
        try:
            expense = Expense(id="", trip_id=msg["trip_id"], occurred_at=_timestamp(msg["occurred_at"]), category=msg["category"], amount_minor=validate_amount(msg["amount_minor"]), currency=msg["currency"], note=msg.get("note"), odometer_km=msg.get("odometer_km"))
            result = await _call(hass, msg, "create_expense", expense, _now())
            connection.send_result(msg["id"], {"expense_id": result})
        except Exception as err: _send_error(connection, msg, err)

    COMMANDS = (ws_list, ws_create_trip, ws_transition_trip, ws_link_drives, ws_create_stop, ws_create_expense)
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
