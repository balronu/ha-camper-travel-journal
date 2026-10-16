"""Home Assistant WebSocket API tests with an isolated in-memory runtime."""

from datetime import datetime, timedelta, timezone
import asyncio
import base64
import unittest

try:
    import pytest
except ImportError:  # pragma: no cover - local offline runner has no pytest
    raise unittest.SkipTest("pytest is installed in the GitHub CI environment")

from custom_components.camper_travel_journal import api


class FakeWorker:
    def __init__(self):
        self.calls = []

    async def async_call(self, method, *args, **kwargs):
        self.calls.append((method, args, kwargs))
        if method == "list_trips":
            return [{"id": "t1", "status": "planned"}]
        if method == "list_drives":
            return []
        if method == "list_stops":
            return []
        if method == "list_available_drives":
            return []
        if method == "list_expenses":
            return []
        if method == "expense_summary":
            return {"total_minor": 0}
        if method == "route_segments":
            return [{"drive_id": "d1", "started_at": "2026-10-01T08:00:00+00:00", "ended_at": "2026-10-01T09:00:00+00:00", "source": "gpx", "association_sources": ["gpx_exact"], "points": [{"recorded_at": "2026-10-01T08:00:00+00:00", "latitude": 49.0, "longitude": 7.0, "accuracy_m": 5, "association_source": "gpx_exact"}, {"recorded_at": "2026-10-01T08:05:00+00:00", "latitude": 49.01, "longitude": 7.0, "accuracy_m": 5, "association_source": "gpx_exact"}]}]
        if method == "create_trip":
            return "t-new"
        if method == "create_manual_drive":
            return "d-manual"
        if method == "gpx_conflicts":
            return {"duplicate_file": False, "duplicate_points": 0, "overlapping_drives": 0}
        if method == "import_gpx":
            return {"points_imported": 1, "drives_imported": 0}
        return None


class FakeConnection:
    def __init__(self):
        self.results = []
        self.errors = []

    def send_result(self, message_id, result):
        self.results.append((message_id, result))

    def send_error(self, message_id, code, message):
        self.errors.append((message_id, code, message))


class FakeHass:
    def __init__(self):
        worker = FakeWorker()
        self.worker = worker
        runtime = type("Runtime", (), {
            "worker": worker,
            "values": {"vehicle_name": "Wohnmobil"},
            "entry": type("Entry", (), {"title": "Camper Travel Journal"})(),
        })()
        async def async_diagnostics():
            return {"active": True, "tracker_entity": "device_tracker.synthetic", "stored_counts": {"gps_points": 1, "drives": 0}}
        runtime.async_diagnostics = async_diagnostics
        self.data = {"camper_travel_journal": {"v1": runtime}}

    def async_create_background_task(self, coroutine, *_args, **_kwargs):
        self.task = asyncio.create_task(coroutine)
        return self.task


def test_timestamp_and_amount_validation():
    parsed = api._timestamp("2026-10-01T12:00:00Z")
    assert parsed == datetime(2026, 10, 1, 12, tzinfo=timezone.utc)
    with pytest.raises(ValueError, match="timestamp_invalid"):
        api._timestamp("not-a-timestamp")
    with pytest.raises(ValueError, match="amount_invalid"):
        api.validate_amount(-1)
    assert api._timestamp(None, required=False) is None
    with pytest.raises(ValueError, match="timestamp_invalid"):
        api._timestamp(123)
    with pytest.raises(ValueError, match="timestamp_must_be_utc"):
        api._timestamp("2026-10-01T12:00:00")
    with pytest.raises(ValueError, match="vehicle_not_loaded"):
        api._runtime(type("Hass", (), {"data": {}})(), "missing")


@pytest.mark.asyncio
async def test_create_trip_command_validates_and_returns_id():
    hass = FakeHass()
    connection = FakeConnection()
    await api.ws_create_trip.__wrapped__(hass, connection, {"id": 1, "vehicle_id": "v1", "title": "Alpen", "description": "", "destination": "Berge", "started_at": "2026-10-01T12:00:00Z"})
    assert connection.results == [(1, {"trip_id": "t-new"})]
    assert connection.errors == []


@pytest.mark.asyncio
async def test_route_command_is_read_only_and_returns_bounds():
    hass = FakeHass()
    connection = FakeConnection()
    await api.ws_route.__wrapped__(hass, connection, {"id": 40, "vehicle_id": "v1", "max_points": 10, "simplify_tolerance_m": 0})
    assert connection.errors == []
    result = connection.results[0][1]
    assert result["total_points"] == 2
    assert result["returned_points"] == 2
    assert result["bounds"] == {"south": 49.0, "west": 7.0, "north": 49.01, "east": 7.0}
    assert result["segments"][0]["association_sources"] == ["gpx_exact"]
    assert [method for method, _, _ in hass.worker.calls if method == "route_segments"] == ["route_segments"]


def test_route_response_caps_large_synthetic_fixture_without_mutating_points():
    start = datetime(2026, 1, 1, tzinfo=timezone.utc)
    points = [{"recorded_at": (start + timedelta(seconds=index)).isoformat(), "latitude": 49.0 + index * 0.000001, "longitude": 7.0, "accuracy_m": 5, "association_source": "gpx_exact"} for index in range(100_000)]
    result = api._route_response([{"drive_id": "large", "started_at": points[0]["recorded_at"], "ended_at": points[-1]["recorded_at"], "source": "gpx", "association_sources": ["gpx_exact"], "points": points}], 5000, 0)
    assert result["total_points"] == 100_000
    assert result["returned_points"] == 5000
    assert result["truncated"] is True
    assert len(points) == 100_000


def test_route_response_simplifies_and_marks_gaps_without_truncation():
    start = datetime(2026, 1, 1, tzinfo=timezone.utc)
    points = []
    for index, offset in enumerate((0, 60, 120, 900)):
        points.append({"recorded_at": (start + timedelta(seconds=offset)).isoformat(), "latitude": 49.0 + (0.01 if index == 1 else 0), "longitude": 7.0 + index * 0.001, "accuracy_m": 5, "association_source": "interval_reconstructed"})
    result = api._route_response([{"drive_id": "d", "started_at": points[0]["recorded_at"], "ended_at": points[-1]["recorded_at"], "source": "gps", "association_sources": ["interval_reconstructed"], "points": points}], 100, 100)
    assert result["truncated"] is False
    assert result["segments"][0]["simplified"] is True
    assert result["segments"][0]["gaps"][0]["seconds"] == 780


@pytest.mark.asyncio
async def test_gpx_preview_is_read_only_and_import_requires_matching_hash():
    data = b'<gpx version="1.1" xmlns="http://www.topografix.com/GPX/1/1"><trk><trkseg><trkpt lat="49" lon="7"><time>2026-10-13T08:00:00Z</time></trkpt></trkseg></trk></gpx>'
    encoded = base64.b64encode(data).decode()
    hass = FakeHass()
    connection = FakeConnection()
    await api.ws_analyze_gpx.__wrapped__(hass, connection, {"id": 30, "vehicle_id": "v1", "content_base64": encoded})
    assert connection.results[-1][1]["points"][0]["recorded_at"].endswith("+00:00")
    preview = connection.results[-1][1]
    await api.ws_import_gpx.__wrapped__(hass, connection, {"id": 31, "vehicle_id": "v1", "content_base64": encoded, "file_hash": preview["file_hash"], "drive_keys": []})
    assert connection.results[-1] == (31, {"points_imported": 1, "drives_imported": 0})


@pytest.mark.asyncio
async def test_create_trip_accepts_optional_dates_and_manual_drive_command():
    hass = FakeHass()
    connection = FakeConnection()
    await api.ws_create_trip.__wrapped__(hass, connection, {"id": 15, "vehicle_id": "v1", "title": "Sommer", "start_date": "2026-07-01", "end_date": "2026-07-14"})
    assert connection.errors == []
    method, _args, kwargs = hass.worker.calls[-1]
    assert method == "create_trip"
    assert kwargs["start_date"] == "2026-07-01"
    await api.ws_create_manual_drive.__wrapped__(hass, connection, {"id": 16, "vehicle_id": "v1", "occurred_at": "2026-07-01T08:00:00Z", "start_location": "Bremen", "end_location": "Hamburg", "distance_km": 123.4, "duration_minutes": 90, "trip_id": "t1"})
    assert connection.results[-1] == (16, {"drive_id": "d-manual"})
    await api.ws_update_manual_drive.__wrapped__(hass, connection, {"id": 17, "vehicle_id": "v1", "drive_id": "d-manual", "occurred_at": "2026-07-01T09:00:00Z", "start_location": "Bremen Hbf", "end_location": "Hamburg Hbf", "distance_km": 125.0, "duration_minutes": 95})
    await api.ws_delete_manual_drive.__wrapped__(hass, connection, {"id": 18, "vehicle_id": "v1", "drive_id": "d-manual"})
    assert connection.results[-1] == (18, {"success": True})


@pytest.mark.asyncio
async def test_list_command_returns_separate_domains():
    hass = FakeHass()
    connection = FakeConnection()
    await api.ws_list.__wrapped__(hass, connection, {"id": 2, "vehicle_id": "v1", "trip_id": "t1"})
    assert connection.results[0][1]["trips"][0]["id"] == "t1"
    assert "expenses" in connection.results[0][1]


@pytest.mark.asyncio
async def test_diagnostics_command_is_read_only_and_returns_health_payload():
    hass = FakeHass()
    connection = FakeConnection()
    await api.ws_diagnostics.__wrapped__(hass, connection, {"id": 21, "vehicle_id": "v1"})
    assert connection.errors == []
    assert connection.results == [(21, {"active": True, "tracker_entity": "device_tracker.synthetic", "stored_counts": {"gps_points": 1, "drives": 0}})]


@pytest.mark.asyncio
async def test_list_vehicles_exposes_only_editor_safe_hub_metadata():
    hass = FakeHass()
    connection = FakeConnection()
    await api.ws_list_vehicles.__wrapped__(hass, connection, {"id": 20, "type": "camper_travel_journal/list_vehicles"})
    assert connection.results == [(20, {"vehicles": [{"vehicle_id": "v1", "name": "Wohnmobil", "title": "Camper Travel Journal"}]})]


@pytest.mark.asyncio
async def test_transition_and_write_commands_complete():
    hass = FakeHass()
    connection = FakeConnection()
    await api.ws_transition_trip.__wrapped__(hass, connection, {"id": 3, "vehicle_id": "v1", "trip_id": "t1", "status": "active"})
    await api.ws_link_drives.__wrapped__(hass, connection, {"id": 4, "vehicle_id": "v1", "trip_id": "t1", "drive_ids": []})
    await api.ws_create_stop.__wrapped__(hass, connection, {"id": 5, "vehicle_id": "v1", "trip_id": "t1", "occurred_at": "2026-10-01T12:00:00Z", "name": "Stopp", "category": "parking"})
    await api.ws_create_expense.__wrapped__(hass, connection, {"id": 6, "vehicle_id": "v1", "trip_id": "t1", "occurred_at": "2026-10-01T12:00:00Z", "category": "fuel", "amount_minor": 100, "currency": "EUR"})
    assert len(connection.results) == 4, connection.errors


@pytest.mark.asyncio
async def test_create_expense_preserves_canonical_camping_id_over_websocket():
    hass = FakeHass()
    connection = FakeConnection()
    await api.ws_create_expense.__wrapped__(hass, connection, {"id": 14, "vehicle_id": "v1", "trip_id": "t1", "occurred_at": "2026-10-01T12:00:00Z", "category": "camping", "amount_minor": 2300, "currency": "EUR"})
    assert connection.errors == []
    method, args, _kwargs = hass.worker.calls[-1]
    assert method == "create_expense"
    assert args[0].category == "camping"
    assert args[0].amount_minor == 2300


@pytest.mark.asyncio
async def test_phase3_crud_and_assignment_commands_complete():
    hass = FakeHass()
    connection = FakeConnection()
    await api.ws_update_trip.__wrapped__(hass, connection, {"id": 7, "vehicle_id": "v1", "trip_id": "t1", "title": "Neu", "description": "Text", "destination": "Tal", "started_at": "2026-10-01T12:00:00Z"})
    await api.ws_delete_trip.__wrapped__(hass, connection, {"id": 8, "vehicle_id": "v1", "trip_id": "t1"})
    await api.ws_unlink_drive.__wrapped__(hass, connection, {"id": 9, "vehicle_id": "v1", "trip_id": "t1", "drive_id": "d1"})
    await api.ws_update_stop.__wrapped__(hass, connection, {"id": 10, "vehicle_id": "v1", "stop_id": "s1", "name": "Neu", "category": "camping", "description": "Text", "occurred_at": "2026-10-01T12:00:00Z"})
    await api.ws_delete_stop.__wrapped__(hass, connection, {"id": 11, "vehicle_id": "v1", "stop_id": "s1"})
    await api.ws_update_expense.__wrapped__(hass, connection, {"id": 12, "vehicle_id": "v1", "expense_id": "e1", "category": "fuel", "amount_minor": 200, "currency": "eur", "occurred_at": "2026-10-01T12:00:00Z", "note": "Tank"})
    await api.ws_delete_expense.__wrapped__(hass, connection, {"id": 13, "vehicle_id": "v1", "expense_id": "e1"})
    assert len(connection.results) == 7, connection.errors
