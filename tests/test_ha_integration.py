"""Home Assistant integration tests, executed in the pinned CI environment."""

from __future__ import annotations

try:
    import pytest
    from homeassistant.core import HomeAssistant
    from pytest_homeassistant_custom_component.common import MockConfigEntry
except ImportError:  # pragma: no cover - expected on the local offline runner
    pytest = None
else:
    from custom_components.camper_travel_journal.const import (
        CONF_MAX_GAP, CONF_MAX_SPEED, CONF_MIN_INTERVAL, CONF_MIN_MOVEMENT,
        CONF_RECORDING_ENABLED, CONF_RETENTION_DAYS, CONF_STOP_AFTER,
        CONF_TRACKER_ENTITY, CONF_VEHICLE_NAME, DOMAIN,
    )

    def _data(entity: str = "device_tracker.synthetic") -> dict:
        return {
            CONF_VEHICLE_NAME: "Synthetic Camper",
            CONF_TRACKER_ENTITY: entity,
            CONF_RECORDING_ENABLED: False,
            CONF_MIN_INTERVAL: 30,
            CONF_MIN_MOVEMENT: 25.0,
            CONF_RETENTION_DAYS: 90,
            CONF_STOP_AFTER: 10,
            CONF_MAX_GAP: 10,
            CONF_MAX_SPEED: 200.0,
        }

    async def test_config_flow_rejects_missing_tracker(hass: HomeAssistant, enable_custom_integrations):
        result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": "user"})
        result = await hass.config_entries.flow.async_configure(result["flow_id"], {**_data(), CONF_TRACKER_ENTITY: "device_tracker.missing"})
        assert result["type"] == "form"
        assert result["errors"][CONF_TRACKER_ENTITY] == "tracker_not_found"

    async def test_config_flow_creates_entry_and_options_update(hass: HomeAssistant, enable_custom_integrations):
        hass.states.async_set("device_tracker.synthetic", "home", {"latitude": 49.0, "longitude": 7.0, "gps_accuracy": 5})
        result = await hass.config_entries.flow.async_init(DOMAIN, context={"source": "user"})
        result = await hass.config_entries.flow.async_configure(result["flow_id"], _data())
        assert result["type"] == "create_entry"
        entry = result["result"]
        assert entry.data[CONF_VEHICLE_NAME] == "Synthetic Camper"
        options = await hass.config_entries.options.async_init(entry.entry_id)
        updated = {**_data(), CONF_MIN_INTERVAL: 60, CONF_MIN_MOVEMENT: 50.0, CONF_RETENTION_DAYS: 180}
        result = await hass.config_entries.options.async_configure(options["flow_id"], updated)
        assert result["type"] == "create_entry"
        assert result["data"][CONF_MIN_INTERVAL] == 60
        assert result["data"][CONF_RETENTION_DAYS] == 180
        assert await hass.config_entries.async_unload(entry.entry_id)

    async def test_setup_unload_listener_lifecycle(hass: HomeAssistant, enable_custom_integrations):
        tracker = "device_tracker.lifecycle"
        hass.states.async_set(tracker, "home", {"latitude": 49.0, "longitude": 7.0, "gps_accuracy": 5})
        entry = MockConfigEntry(domain=DOMAIN, data={**_data(tracker), CONF_RECORDING_ENABLED: True})
        entry.add_to_hass(hass)
        assert await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        assert entry.entry_id in hass.data[DOMAIN]
        hass.states.async_set(tracker, "home", {"latitude": 49.001, "longitude": 7.0, "gps_accuracy": 5})
        await hass.async_block_till_done()
        assert await hass.config_entries.async_unload(entry.entry_id)
        assert entry.entry_id not in hass.data[DOMAIN]

    async def test_setup_replaces_stale_frontend_bundle_urls(hass: HomeAssistant, enable_custom_integrations):
        """Only the current versioned card bundle remains registered after setup."""
        from unittest.mock import AsyncMock, Mock

        from homeassistant.components.frontend import DATA_EXTRA_MODULE_URL, add_extra_js_url
        from homeassistant.components.frontend import UrlManager
        from custom_components import camper_travel_journal
        from custom_components.camper_travel_journal.const import FRONTEND_URL

        hass.data[DATA_EXTRA_MODULE_URL] = UrlManager(lambda *_args: None, [])
        hass.http = Mock(async_register_static_paths=AsyncMock())
        stale = "/camper_travel_journal/camper-travel-journal.js?v=0.1.0-beta.12"
        add_extra_js_url(hass, stale)
        assert await camper_travel_journal.async_setup(hass, {})
        tracker = "device_tracker.frontend_bundle"
        hass.states.async_set(tracker, "home", {"latitude": 49.0, "longitude": 7.0, "gps_accuracy": 5})
        entry = MockConfigEntry(domain=DOMAIN, data=_data(tracker))
        entry.add_to_hass(hass)

        assert await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        urls = hass.data[DATA_EXTRA_MODULE_URL].urls
        assert FRONTEND_URL in urls
        assert stale not in urls
        assert not any(url.startswith("/camper_travel_journal/camper-travel-journal.js?v=") and url != FRONTEND_URL for url in urls)
        assert await hass.config_entries.async_unload(entry.entry_id)

    async def test_websocket_commands_are_registered_after_entry_setup(
        hass: HomeAssistant, hass_ws_client, enable_custom_integrations
    ):
        """A loaded config entry must expose the read/write command registry."""
        tracker = "device_tracker.websocket_registry"
        hass.states.async_set(tracker, "home", {"latitude": 49.0, "longitude": 7.0, "gps_accuracy": 5})
        entry = MockConfigEntry(domain=DOMAIN, data=_data(tracker))
        entry.add_to_hass(hass)

        assert await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()

        client = await hass_ws_client(hass)
        await client.send_json({"id": 1, "type": "camper_travel_journal/list_vehicles"})
        vehicles = await client.receive_json()
        assert vehicles["success"] is True
        assert vehicles["result"]["vehicles"][0]["vehicle_id"] == entry.entry_id

        await client.send_json({"id": 2, "type": "camper_travel_journal/list", "vehicle_id": entry.entry_id})
        listed = await client.receive_json()
        assert listed["success"] is True
        assert set(listed["result"]) == {"trips", "drives", "stops"}

        # All write handlers are checked through the same registration list;
        # this test deliberately does not invoke a mutating command.
        from custom_components.camper_travel_journal import api

        assert [command._ws_command for command in api.COMMANDS] == [
            "camper_travel_journal/list_vehicles",
            "camper_travel_journal/list",
            "camper_travel_journal/create_trip",
            "camper_travel_journal/update_trip",
            "camper_travel_journal/delete_trip",
            "camper_travel_journal/transition_trip",
            "camper_travel_journal/link_drives",
            "camper_travel_journal/unlink_drive",
            "camper_travel_journal/create_manual_drive",
            "camper_travel_journal/update_manual_drive",
            "camper_travel_journal/delete_manual_drive",
            "camper_travel_journal/create_stop",
            "camper_travel_journal/update_stop",
            "camper_travel_journal/delete_stop",
            "camper_travel_journal/create_expense",
            "camper_travel_journal/update_expense",
            "camper_travel_journal/delete_expense",
        ]
        assert await hass.config_entries.async_unload(entry.entry_id)
