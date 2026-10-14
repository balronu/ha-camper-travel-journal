"""Home Assistant event adapter for the HA-free GPS collector."""

from __future__ import annotations

from datetime import datetime, timezone
from typing import Any

from .collector import GPSCollector
from .const import CONF_RECORDING_ENABLED, CONF_TRACKER_ENTITY

try:
    from homeassistant.core import callback
    from homeassistant.helpers.event import async_track_state_change_event
except ImportError:  # pragma: no cover
    callback = lambda func: func
    async_track_state_change_event = None


class Runtime:
    """Own the listener, collector, worker lifecycle and recovery boundary."""

    def __init__(self, hass, entry, worker) -> None:
        self.hass = hass
        self.entry = entry
        self.worker = worker
        self.remove_listener = None
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

    async def _async_state_event(self, event) -> None:
        new_state = event.data.get("new_state")
        if new_state is None:
            return
        attributes: dict[str, Any] = dict(new_state.attributes)
        await self.collector.async_process_event(self.vehicle_id, new_state.state, attributes, getattr(new_state, "last_updated", None))

    async def async_stop(self) -> None:
        if self.remove_listener is not None:
            self.remove_listener()
            self.remove_listener = None
        await self.worker.async_close()
