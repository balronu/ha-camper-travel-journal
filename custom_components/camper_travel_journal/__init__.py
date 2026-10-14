"""Camper Travel Journal Home Assistant integration boundary."""

from __future__ import annotations

from pathlib import Path

try:
    from homeassistant.helpers import config_validation as cv
except ImportError:  # pragma: no cover - permits the offline domain test suite
    cv = None

from .const import DOMAIN
from .runtime import Runtime
from .storage import AsyncSQLiteWorker

VERSION = "0.1.0"

PLATFORMS: list[str] = []
CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN) if cv else None


async def async_setup(hass, config):
    """Support YAML-less setup; config entries own runtime activation."""
    hass.data.setdefault(DOMAIN, {})
    return True


async def async_setup_entry(hass, entry):
    """Prepare an entry; recording remains opt-in through the entry option."""
    path = Path(hass.config.path("camper_travel_journal.db"))
    worker = AsyncSQLiteWorker(path)
    await worker.async_open()
    runtime = Runtime(hass, entry, worker)
    await runtime.async_start()
    hass.data.setdefault(DOMAIN, {})[entry.entry_id] = runtime
    return True


async def async_unload_entry(hass, entry):
    runtime = hass.data.get(DOMAIN, {}).pop(entry.entry_id, None)
    if runtime:
        await runtime.async_stop()
    return True

DOMAIN = "camper_travel_journal"
VERSION = "0.1.0"
