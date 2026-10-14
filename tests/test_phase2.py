"""Offline Phase 2 tests for travel data integrity and state transitions."""

import tempfile
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path

from custom_components.camper_travel_journal.models import Drive, Expense, Stop
from custom_components.camper_travel_journal.storage import SQLiteStore
from custom_components.camper_travel_journal.travel import validate_transition

UTC = timezone.utc


class Phase2Tests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.store = SQLiteStore(Path(self.directory.name) / "journal.db")
        self.store.open()
        self.now = datetime(2026, 10, 1, 12, tzinfo=UTC)
        self.store.insert_vehicle("v1", "Camper", "device_tracker.camper", self.now)

    def tearDown(self):
        self.store.close()
        self.directory.cleanup()

    def test_trip_lifecycle_and_invalid_transition(self):
        trip_id = self.store.create_trip("v1", "Alpen", self.now, self.now, destination="Berge")
        self.assertEqual(self.store.list_trips("v1")[0]["status"], "planned")
        validate_transition("planned", "active")
        self.store.update_trip(trip_id, self.now, status="active")
        self.store.update_trip(trip_id, self.now, status="paused")
        self.store.update_trip(trip_id, self.now, status="active")
        self.store.update_trip(trip_id, self.now, status="completed", ended_at=self.now + timedelta(hours=2))
        with self.assertRaises(ValueError):
            validate_transition("planned", "completed")
        with self.assertRaisesRegex(ValueError, "invalid_trip_status"):
            validate_transition("unknown", "active")

    def test_drive_assignment_is_unique_and_vehicle_bound(self):
        trip_id = self.store.create_trip("v1", "Alpen", self.now, self.now)
        with self.store.transaction() as connection:
            connection.execute("INSERT INTO drives(id,vehicle_id,started_at,ended_at,distance_m,end_reason,created_at) VALUES(?,?,?,?,?,?,?)", ("d1", "v1", self.now.isoformat(), self.now.isoformat(), 1250, "stop", self.now.isoformat()))
        self.store.link_drives(trip_id, ["d1"], self.now)
        with self.assertRaisesRegex(ValueError, "drive_already_assigned"):
            self.store.link_drives(trip_id, ["d1"], self.now)

    def test_stop_and_expense_summary_rejects_mixed_currency(self):
        trip_id = self.store.create_trip("v1", "Alpen", self.now, self.now)
        stop_id = self.store.create_stop(Stop("", "v1", "Camping", self.now, latitude=49.0, longitude=7.0, automatic=False, trip_id=trip_id), self.now)
        self.assertEqual(self.store.list_stops("v1", trip_id)[0]["id"], stop_id)
        self.store.create_expense(Expense("", trip_id, self.now, "fuel", 5000, "EUR", stay_id=stop_id), self.now)
        self.store.create_expense(Expense("", trip_id, self.now, "food", 1200, "EUR"), self.now)
        summary = self.store.expense_summary(trip_id)
        self.assertEqual(summary["total_minor"], 6200)
        self.assertEqual(summary["by_category"]["fuel"], 5000)
        self.store.create_expense(Expense("", trip_id, self.now, "other", 100, "CHF"), self.now)
        self.assertTrue(self.store.expense_summary(trip_id)["mixed_currency"])

    def test_transaction_rolls_back_failed_assignment(self):
        trip_id = self.store.create_trip("v1", "Alpen", self.now, self.now)
        with self.assertRaisesRegex(ValueError, "drive_not_found"):
            self.store.link_drives(trip_id, ["missing"], self.now)
        self.assertEqual(self.store.list_drives("v1"), [])

    def test_schema_version_and_phase2_tables(self):
        version = self.store.connection.execute("SELECT value FROM schema_meta WHERE key='version'").fetchone()[0]
        self.assertEqual(version, "4")
        tables = self.store.table_names()
        self.assertIn("stops", tables)
        self.assertIn("expenses", tables)
        self.assertIn("trip_drives", tables)

    def test_reversible_trip_stop_and_expense_operations(self):
        trip_id = self.store.create_trip("v1", "Alpen", self.now, self.now)
        self.store.update_trip(trip_id, self.now, title="Alpen neu", description="Test", destination="Tal")
        self.assertEqual(self.store.list_trips("v1")[0]["title"], "Alpen neu")
        stop_id = self.store.create_stop(Stop("", "v1", "Parkplatz", self.now, trip_id=trip_id, automatic=False), self.now)
        self.store.delete_stop(stop_id)
        expense_id = self.store.create_expense(Expense("", trip_id, self.now, "other", 100, "EUR"), self.now)
        self.assertEqual(len(self.store.list_expenses(trip_id)), 1)
        self.store.delete_expense(expense_id)
        self.assertEqual(self.store.list_expenses(trip_id), [])
        self.store.delete_trip(trip_id)
        self.assertEqual(self.store.list_trips("v1"), [])


if __name__ == "__main__":
    unittest.main()
