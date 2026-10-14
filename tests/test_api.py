"""Home Assistant WebSocket API tests with an isolated in-memory runtime."""

from datetime import datetime, timezone
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
        if method == "list_expenses":
            return []
        if method == "expense_summary":
            return {"total_minor": 0}
        if method == "create_trip":
            return "t-new"
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
        self.data = {"camper_travel_journal": {"v1": type("Runtime", (), {"worker": worker})()}}


def test_timestamp_and_amount_validation():
    parsed = api._timestamp("2026-10-01T12:00:00Z")
    assert parsed == datetime(2026, 10, 1, 12, tzinfo=timezone.utc)
    with pytest.raises(ValueError, match="timestamp_invalid"):
        api._timestamp("not-a-timestamp")
    with pytest.raises(ValueError, match="amount_invalid"):
        api.validate_amount(-1)


@pytest.mark.asyncio
async def test_create_trip_command_validates_and_returns_id():
    hass = FakeHass()
    connection = FakeConnection()
    await api.ws_create_trip(hass, connection, {"id": 1, "vehicle_id": "v1", "title": "Alpen", "description": "", "destination": "Berge", "started_at": "2026-10-01T12:00:00Z"})
    assert connection.results == [(1, {"trip_id": "t-new"})]
    assert connection.errors == []


@pytest.mark.asyncio
async def test_list_command_returns_separate_domains():
    hass = FakeHass()
    connection = FakeConnection()
    await api.ws_list(hass, connection, {"id": 2, "vehicle_id": "v1", "trip_id": "t1"})
    assert connection.results[0][1]["trips"][0]["id"] == "t1"
    assert "expenses" in connection.results[0][1]
