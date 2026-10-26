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
            "map_provider": "none",
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
        await hass.async_block_till_done()
        assert await hass.config_entries.async_unload(entry.entry_id)

    async def test_setup_unload_listener_lifecycle(hass: HomeAssistant, enable_custom_integrations):
        tracker = "device_tracker.lifecycle"
        hass.states.async_set(tracker, "home", {"latitude": 49.0, "longitude": 7.0, "gps_accuracy": 5})
        entry = MockConfigEntry(domain=DOMAIN, data={**_data(tracker), CONF_RECORDING_ENABLED: True})
        entry.add_to_hass(hass)
        assert await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        assert entry.entry_id in hass.data[DOMAIN]
        runtime = hass.data[DOMAIN][entry.entry_id]
        assert runtime.collector.stats.received >= 1  # startup sample
        hass.states.async_set(tracker, "home", {"latitude": 49.001, "longitude": 7.0, "gps_accuracy": 5})
        await hass.async_block_till_done()
        assert hass.states.get(tracker).state == "home"
        assert runtime.collector.stats.received >= 2  # state unchanged, GPS attributes changed
        assert await hass.config_entries.async_unload(entry.entry_id)
        assert entry.entry_id not in hass.data[DOMAIN]

    async def test_options_update_reloads_runtime_without_duplicate_listener(
        hass: HomeAssistant, enable_custom_integrations
    ):
        tracker = "device_tracker.options_reload"
        hass.states.async_set(tracker, "home", {"latitude": 49.0, "longitude": 7.0, "gps_accuracy": 5})
        entry = MockConfigEntry(domain=DOMAIN, data=_data(tracker))
        entry.add_to_hass(hass)
        assert await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        first_runtime = hass.data[DOMAIN][entry.entry_id]

        configured_key = "fixture-key"
        updated_options = {**entry.options, "map_provider": "carto", "carto_api_key": configured_key}
        hass.config_entries.async_update_entry(entry, options=updated_options)
        await hass.async_block_till_done()
        second_runtime = hass.data[DOMAIN][entry.entry_id]
        assert second_runtime is not first_runtime
        assert second_runtime.values["map_provider"] == "carto"
        assert second_runtime.values["carto_api_key"] == configured_key

        hass.config_entries.async_update_entry(entry, options={**entry.options, "map_provider": "none"})
        await hass.async_block_till_done()
        third_runtime = hass.data[DOMAIN][entry.entry_id]
        assert third_runtime is not second_runtime
        assert "carto_api_key" in third_runtime.values
        assert await hass.config_entries.async_unload(entry.entry_id)

    async def test_setup_replaces_stale_frontend_bundle_urls(hass: HomeAssistant, enable_custom_integrations):
        """Only the current versioned card bundle remains registered after setup."""
        from unittest.mock import AsyncMock, Mock

        from homeassistant.components.frontend import DATA_EXTRA_MODULE_URL, add_extra_js_url
        from homeassistant.components.frontend import UrlManager
        from custom_components import camper_travel_journal
        from custom_components.camper_travel_journal.const import FRONTEND_URL

        hass.data[DATA_EXTRA_MODULE_URL] = UrlManager(lambda *_args: None, [])
        hass.http = Mock(async_register_static_paths=AsyncMock())
        stale_urls = {
            f"/camper_travel_journal/camper-travel-journal.js?v=0.1.0-beta.{version}"
            for version in range(2, 15)
        }
        for stale in stale_urls:
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
        assert stale_urls.isdisjoint(urls)
        assert not any(url.startswith("/camper_travel_journal/camper-travel-journal.js?v=") and url != FRONTEND_URL for url in urls)

        # A second setup must perform the same cleanup, not merely short-circuit
        # because the static path was already registered.
        for stale in stale_urls:
            add_extra_js_url(hass, stale)
        assert await camper_travel_journal.async_setup(hass, {})
        assert stale_urls.isdisjoint(hass.data[DATA_EXTRA_MODULE_URL].urls)
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
        assert set(listed["result"]) == {"trips", "drives", "stops", "stop_suggestions", "map_config"}
        assert listed["result"]["map_config"] == {"provider": "none", "tile_url": None, "tile_attribution": None}

        await client.send_json({"id": 3, "type": "camper_travel_journal/diagnostics", "vehicle_id": entry.entry_id})
        diagnostics = await client.receive_json()
        assert diagnostics["success"] is True
        assert diagnostics["result"]["tracker_entity"] == tracker
        assert "latitude" not in str(diagnostics["result"])

        from custom_components.camper_travel_journal import api

        assert [command._ws_command for command in api.COMMANDS] == [
            "camper_travel_journal/list_vehicles",
            "camper_travel_journal/export_pdf",
            "camper_travel_journal/list",
            "camper_travel_journal/route",
            "camper_travel_journal/diagnostics",
            "camper_travel_journal/create_trip",
            "camper_travel_journal/update_trip",
            "camper_travel_journal/delete_trip",
            "camper_travel_journal/transition_trip",
            "camper_travel_journal/link_drives",
            "camper_travel_journal/unlink_drive",
            "camper_travel_journal/create_manual_drive",
            "camper_travel_journal/update_manual_drive",
            "camper_travel_journal/delete_manual_drive",
            "camper_travel_journal/delete_drive",
            "camper_travel_journal/create_stop",
            "camper_travel_journal/update_stop",
            "camper_travel_journal/delete_stop",
            "camper_travel_journal/assign_interruption",
            "camper_travel_journal/create_stop_from_interruption",
            "camper_travel_journal/list_tankbook",
            "camper_travel_journal/create_tank_event",
            "camper_travel_journal/update_tank_event",
            "camper_travel_journal/delete_tank_event",
            "camper_travel_journal/create_expense",
            "camper_travel_journal/update_expense",
            "camper_travel_journal/delete_expense",
            "camper_travel_journal/update_overnight",
            "camper_travel_journal/update_rating",
            "camper_travel_journal/delete_rating",
            "camper_travel_journal/list_stop_suggestions",
            "camper_travel_journal/generate_stop_suggestions",
            "camper_travel_journal/accept_stop_suggestion",
            "camper_travel_journal/dismiss_stop_suggestion",
            "camper_travel_journal/analyze_gpx",
            "camper_travel_journal/import_gpx",
        ]
        assert await hass.config_entries.async_unload(entry.entry_id)

    async def test_interruption_commands_run_through_registered_ha_websocket(
        hass: HomeAssistant, hass_ws_client, enable_custom_integrations
    ):
        """Exercise both registered commands against an isolated HA runtime."""
        import sqlite3

        tracker = "device_tracker.websocket_interruption"
        hass.states.async_set(tracker, "home", {"latitude": 49.0, "longitude": 7.0, "gps_accuracy": 5})
        entry = MockConfigEntry(domain=DOMAIN, data=_data(tracker))
        entry.add_to_hass(hass)
        assert await hass.config_entries.async_setup(entry.entry_id)
        await hass.async_block_till_done()
        client = await hass_ws_client(hass)

        async def command(message: dict) -> dict:
            await client.send_json(message)
            return await client.receive_json()

        trip_response = await command({
            "id": 10,
            "type": "camper_travel_journal/create_trip",
            "vehicle_id": entry.entry_id,
            "title": "WebSocket interruption test",
            "start_date": "2026-10-18",
            "end_date": "2026-10-19",
        })
        assert trip_response["success"] is True
        trip_id = trip_response["result"]["trip_id"]

        def drive_message(message_id: int, occurred_at: str) -> dict:
            return {
                "id": message_id,
                "type": "camper_travel_journal/create_manual_drive",
                "vehicle_id": entry.entry_id,
                "trip_id": trip_id,
                "occurred_at": occurred_at,
                "start_location": "A",
                "end_location": "B",
                "distance_km": 10,
                "duration_minutes": 60,
            }

        first = await command(drive_message(11, "2026-10-18T08:00:00Z"))
        second = await command(drive_message(12, "2026-10-18T12:00:00Z"))
        assert first["success"] is True and second["success"] is True
        first_drive = first["result"]["drive_id"]
        second_drive = second["result"]["drive_id"]
        interruption_id = f"{first_drive}:{second_drive}"

        existing_stop = await command({
            "id": 13,
            "type": "camper_travel_journal/create_stop",
            "vehicle_id": entry.entry_id,
            "trip_id": trip_id,
            "occurred_at": "2026-10-18T09:00:00Z",
            "arrived_at": "2026-10-18T09:00:00Z",
            "departed_at": "2026-10-18T11:00:00Z",
            "name": "Kuhhirten",
            "category": "rv_site",
            "address": "Bremen, Kuhhirten",
            "description": "Bestehende Stellplatznotiz",
        })
        assert existing_stop["success"] is True
        existing_stop_id = existing_stop["result"]["stop_id"]

        overnight = await command({
            "id": 14,
            "type": "camper_travel_journal/update_overnight",
            "vehicle_id": entry.entry_id,
            "place_id": existing_stop_id,
            "place_kind": "rv_site",
            "website_url": "https://stellplatz-bremen.de/",
            "booking_note": "Vorhandene Buchungsnotiz",
            "large_rv_suitable": True,
        })
        rating = await command({
            "id": 15,
            "type": "camper_travel_journal/update_rating",
            "vehicle_id": entry.entry_id,
            "place_id": existing_stop_id,
            "overall": 5,
            "large_rv_access": 4,
            "space_maneuvering": 4,
            "facilities": 3,
            "surroundings": 5,
            "review_text": "Unveränderte Bremen-Bewertung",
            "rated_at": "2026-10-18T11:00:00Z",
        })
        assert overnight["success"] is True and rating["success"] is True

        async def read_database(query: str, parameters: tuple = ()) -> list[tuple]:
            database = hass.config.path("camper_travel_journal.db")

            def read() -> list[tuple]:
                connection = sqlite3.connect(f"file:{database}?mode=ro", uri=True)
                try:
                    return connection.execute(query, parameters).fetchall()
                finally:
                    connection.close()

            return await hass.async_add_executor_job(read)

        snapshot_query = (
            "SELECT s.id,s.vehicle_id,s.trip_id,s.drive_id,s.name,s.occurred_at,s.arrived_at,s.departed_at,"
            "s.latitude,s.longitude,s.description,s.stop_type,s.place_type,s.address,s.source,s.automatic,s.confirmed,"
            "od.place_kind,od.website_url,od.booking_note,od.large_rv_suitable,"
            "pr.overall,pr.large_rv_access,pr.space_maneuvering,pr.facilities,pr.surroundings,pr.review_text,pr.rated_at "
            "FROM stops s LEFT JOIN overnight_details od ON od.place_id=s.id "
            "LEFT JOIN place_ratings pr ON pr.place_id=s.id WHERE s.id=?"
        )
        before_snapshot = (await read_database(snapshot_query, (existing_stop_id,)))[0]
        assert len(await read_database("SELECT id FROM stops WHERE vehicle_id=? AND trip_id=?", (entry.entry_id, trip_id))) == 1
        assert await read_database("SELECT trip_id,interruption_id,stop_id FROM interruption_links") == []

        assigned = await command({
            "id": 16,
            "type": "camper_travel_journal/assign_interruption",
            "vehicle_id": entry.entry_id,
            "trip_id": trip_id,
            "interruption_id": interruption_id,
            "status": "stop",
            "stop_id": existing_stop_id,
        })
        assert assigned == {"id": 16, "type": "result", "success": True, "result": {"success": True}}

        links = await read_database(
            "SELECT trip_id,interruption_id,status,stop_id FROM interruption_links"
        )
        assert links == [(trip_id, interruption_id, "stop", existing_stop_id)]
        assert len(await read_database("SELECT id FROM stops WHERE vehicle_id=? AND trip_id=?", (entry.entry_id, trip_id))) == 1
        assert (await read_database(snapshot_query, (existing_stop_id,)))[0] == before_snapshot

        listed = await command({"id": 17, "type": "camper_travel_journal/list", "vehicle_id": entry.entry_id, "trip_id": trip_id})
        interruption = next(item for item in listed["result"]["interruptions"] if item["id"] == interruption_id)
        assert (interruption["status"], interruption["existing_place_id"]) == ("stop", existing_stop_id)

        repeated_assignment = await command({
            "id": 18,
            "type": "camper_travel_journal/assign_interruption",
            "vehicle_id": entry.entry_id,
            "trip_id": trip_id,
            "interruption_id": interruption_id,
            "status": "stop",
            "stop_id": existing_stop_id,
        })
        assert repeated_assignment == {"id": 18, "type": "result", "success": True, "result": {"success": True}}
        assert len(await read_database("SELECT trip_id,interruption_id,stop_id FROM interruption_links")) == 1
        assert len(await read_database("SELECT id FROM stops WHERE vehicle_id=? AND trip_id=?", (entry.entry_id, trip_id))) == 1
        assert (await read_database(snapshot_query, (existing_stop_id,)))[0] == before_snapshot

        third = await command(drive_message(19, "2026-10-18T16:00:00Z"))
        fourth = await command(drive_message(20, "2026-10-18T20:00:00Z"))
        second_interruption = f"{third['result']['drive_id']}:{fourth['result']['drive_id']}"
        created = await command({
            "id": 21,
            "type": "camper_travel_journal/create_stop_from_interruption",
            "vehicle_id": entry.entry_id,
            "trip_id": trip_id,
            "interruption_id": second_interruption,
            "name": "Neuer Ort",
            "place_type": "rv_site",
            "overnight": True,
        })
        repeated = await command({
            "id": 22,
            "type": "camper_travel_journal/create_stop_from_interruption",
            "vehicle_id": entry.entry_id,
            "trip_id": trip_id,
            "interruption_id": second_interruption,
            "name": "Duplikat darf nicht entstehen",
            "place_type": "rv_site",
            "overnight": True,
        })
        assert created["success"] is True
        assert repeated["success"] is True
        assert repeated["result"] == created["result"]

        invalid = await command({
            "id": 23,
            "type": "camper_travel_journal/create_stop_from_interruption",
            "vehicle_id": entry.entry_id,
            "trip_id": trip_id,
            "interruption_id": second_interruption,
            "name": "   ",
        })
        assert invalid["success"] is False
        assert invalid["error"]["code"] == "place_name_required"

        other_trip = await command({
            "id": 24,
            "type": "camper_travel_journal/create_trip",
            "vehicle_id": entry.entry_id,
            "title": "Other trip",
        })
        cross_trip = await command({
            "id": 25,
            "type": "camper_travel_journal/assign_interruption",
            "vehicle_id": entry.entry_id,
            "trip_id": other_trip["result"]["trip_id"],
            "interruption_id": interruption_id,
            "status": "pause",
        })
        assert cross_trip["success"] is False
        assert cross_trip["error"]["code"] == "interruption_not_found"

        cross_vehicle = await command({
            "id": 26,
            "type": "camper_travel_journal/assign_interruption",
            "vehicle_id": "not-loaded",
            "trip_id": trip_id,
            "interruption_id": interruption_id,
            "status": "pause",
        })
        assert cross_vehicle["success"] is False
        assert cross_vehicle["error"]["code"] == "vehicle_not_loaded"
        assert await hass.config_entries.async_unload(entry.entry_id)
