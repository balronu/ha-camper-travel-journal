"""Camper Travel Journal Home Assistant integration boundary."""

from __future__ import annotations

from pathlib import Path

try:
    from homeassistant.helpers import config_validation as cv
except ImportError:  # pragma: no cover - permits the offline domain test suite
    cv = None

from .const import DOMAIN, FRONTEND_URL, LEGACY_FRONTEND_VERSIONS
from .runtime import Runtime
from .storage import AsyncSQLiteWorker
from .api import async_register as async_register_api

VERSION = "0.1.0-beta.15"

PLATFORMS: list[str] = []
CONFIG_SCHEMA = cv.config_entry_only_config_schema(DOMAIN) if cv else None


async def _async_register_frontend(hass) -> None:
    """Serve and register exactly the current frontend bundle."""
    try:
        from homeassistant.components.frontend import add_extra_js_url, remove_extra_js_url
        from homeassistant.components.http import StaticPathConfig
    except (ImportError, AttributeError):  # pragma: no cover - offline tests
        return

    domain_data = hass.data.setdefault(DOMAIN, {})
    if not domain_data.get("frontend_static_path_registered"):
        frontend_dir = Path(__file__).parent / "frontend"
        await hass.http.async_register_static_paths(
            [StaticPathConfig(f"/{DOMAIN}", str(frontend_dir), False)]
        )
        domain_data["frontend_static_path_registered"] = True

    for version in LEGACY_FRONTEND_VERSIONS:
        remove_extra_js_url(hass, f"/{DOMAIN}/camper-travel-journal.js?v={version}")
    add_extra_js_url(hass, FRONTEND_URL)
    domain_data["frontend_registered"] = True


async def async_setup(hass, config):
    """Support YAML-less setup; config entries own runtime activation."""
    hass.data.setdefault(DOMAIN, {})
    async_register_api(hass)
    await _async_register_frontend(hass)
    return True


async def async_setup_entry(hass, entry):
    """Prepare an entry; recording remains opt-in through the entry option."""
    await _async_register_frontend(hass)
    # Config-entry setup must be self-sufficient.  In particular, HA can set up
    # an entry after a reload without re-running the domain setup hook.  Keep
    # this idempotent call here so the authenticated websocket commands are
    # present whenever the integration has a loaded entry.
    async_register_api(hass)
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
VERSION = "0.1.0-beta.15"
