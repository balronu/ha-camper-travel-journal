"""Camper Travel Journal Home Assistant integration boundary."""

from __future__ import annotations

from pathlib import Path

try:
    from homeassistant.helpers import config_validation as cv
except ImportError:  # pragma: no cover - permits the offline domain test suite
    cv = None

from .const import DOMAIN, FRONTEND_URL
from .runtime import Runtime
from .storage import AsyncSQLiteWorker
from .api import async_register as async_register_api

VERSION = "0.1.0-beta.7"

PLATFORMS: list[str] = []
CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN) if cv else None


async def async_setup(hass, config):
    """Support YAML-less setup; config entries own runtime activation."""
    hass.data.setdefault(DOMAIN, {})
    async_register_api(hass)
    if not hass.data[DOMAIN].get("frontend_registered"):
        try:
            from homeassistant.components.frontend import add_extra_js_url
            from homeassistant.components.http import StaticPathConfig
            frontend_dir = Path(__file__).parent / "frontend"
            await hass.http.async_register_static_paths([StaticPathConfig(f"/{DOMAIN}", str(frontend_dir), False)])
            add_extra_js_url(hass, FRONTEND_URL)
            hass.data[DOMAIN]["frontend_registered"] = True
        except (ImportError, AttributeError):  # pragma: no cover - offline tests
            pass
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
VERSION = "0.1.0-beta.7"
