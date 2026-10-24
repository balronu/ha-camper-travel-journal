"""Home Assistant event adapter for the HA-free GPS collector."""

from __future__ import annotations

from datetime import datetime, timezone
from functools import partial
from typing import Any

from .collector import GPSCollector
from .const import CONF_RECORDING_ENABLED, CONF_TRACKER_ENTITY

try:
    from homeassistant.core import EVENT_STATE_REPORTED, callback
except ImportError:  # pragma: no cover
    EVENT_STATE_REPORTED = "state_reported"
    callback = lambda func: func

try:
    from homeassistant.helpers.event import async_track_state_change_event
except ImportError:  # pragma: no cover
    async_track_state_change_event = None


@callback
def _is_reported_tracker_event(event_data, tracker_entity: str) -> bool:
    """Keep the high-volume state_reported subscription entity-scoped."""
    return event_data.get("entity_id") == tracker_entity


class Runtime:
    """Own the listener, collector, worker lifecycle and recovery boundary."""

    def __init__(self, hass, entry, worker) -> None:
        self.hass = hass
        self.entry = entry
        self.worker = worker
        self.remove_listener = None
        self.remove_reported_listener = None
        values = {**entry.data, **entry.options}
        self.vehicle_id = entry.entry_id
        self.values = values
        self.collector = GPSCollector(worker, {self.vehicle_id: values})

    async def async_start(self) -> None:
        from .models import GPSPoint
        from datetime import datetime
        now = datetime.now(timezone.utc)
        await self.worker.async_insert_vehicle(self.vehicle_id, self.values.get("vehicle_name", "Wohnmobil"), self.values[CONF_TRACKER_ENTITY], now)
        rows = await self.worker.async_load_recent_points(self.vehicle_id)
        self.collector.restore_points(self.vehicle_id, rows)
        if self.values.get(CONF_RECORDING_ENABLED, False) and async_track_state_change_event is not None:
            self.remove_listener = async_track_state_change_event(self.hass, [self.values[CONF_TRACKER_ENTITY]], self._async_state_event)
            # HA emits state_reported when a source reports again without a
            # state/attribute change. Filter to this entity; never subscribe to
            # the high-volume event globally.
            self.remove_reported_listener = self.hass.bus.async_listen(
                EVENT_STATE_REPORTED,
                self._async_state_reported_event,
                event_filter=partial(_is_reported_tracker_event, tracker_entity=self.values[CONF_TRACKER_ENTITY]),
            )
            current = self.hass.states.get(self.values[CONF_TRACKER_ENTITY])
            if current is not None:
                await self.collector.async_process_event(self.vehicle_id, current.state, dict(current.attributes), getattr(current, "last_updated", None))

    async def _async_state_event(self, event) -> None:
        new_state = event.data.get("new_state")
        if new_state is None:
            return
        attributes: dict[str, Any] = dict(new_state.attributes)
        await self.collector.async_process_event(self.vehicle_id, new_state.state, attributes, getattr(new_state, "last_updated", None))

    async def _async_state_reported_event(self, event) -> None:
        new_state = event.data.get("new_state")
        if new_state is None:
            return
        await self.collector.async_process_event(self.vehicle_id, new_state.state, dict(new_state.attributes), event.data.get("last_reported"))

    async def async_diagnostics(self) -> dict[str, Any]:
        result = self.collector.diagnostics(self.vehicle_id)
        result.update({
            "active": self.remove_listener is not None,
            "recording_enabled": bool(self.values.get(CONF_RECORDING_ENABLED, False)),
            "tracker_entity": self.values[CONF_TRACKER_ENTITY],
            "stored_counts": await self.worker.async_call("diagnostic_counts", self.vehicle_id),
        })
        result["stop_suggestions_generated"] = result["stored_counts"].get("stop_suggestions_generated", 0)
        result["stop_suggestions_open"] = result["stored_counts"].get("stop_suggestions_open", 0)
        return result

    async def async_stop(self) -> None:
        if self.remove_listener is not None:
            self.remove_listener()
            self.remove_listener = None
        if self.remove_reported_listener is not None:
            self.remove_reported_listener()
            self.remove_reported_listener = None
        await self.worker.async_close()
