"""Phase 3 CRUD, migration and automatic assignment coverage."""

import tempfile
import unittest
from datetime import datetime, timezone
from pathlib import Path

from custom_components.camper_travel_journal.models import Expense, Stop
from custom_components.camper_travel_journal.storage import SQLiteStore

UTC = timezone.utc


class Phase3Tests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.store = SQLiteStore(Path(self.directory.name) / "journal.db")
        self.store.open()
        self.now = datetime(2026, 10, 1, 12, tzinfo=UTC)
        self.store.insert_vehicle("v1", "Camper", "device_tracker.camper", self.now)

    def tearDown(self):
        self.store.close()
        self.directory.cleanup()

    def test_schema_four_edit_timestamps_and_crud(self):
        trip = self.store.create_trip("v1", "Alpen", self.now, self.now)
        stop = self.store.create_stop(Stop("", "v1", "Parkplatz", self.now, trip_id=trip, automatic=False), self.now)
        expense = self.store.create_expense(Expense("", trip, self.now, "fuel", 1234, "eur", note="alt", stay_id=stop), self.now)
        later = self.now.replace(hour=13)
        self.store.update_stop(stop, later, name="Camping", description="Nacht")
        self.store.update_expense(expense, later, amount_minor=2345, category="camping", note="neu")
        row = self.store.list_stops("v1", trip)[0]
        self.assertEqual(row["name"], "Camping")
        self.assertEqual(row["description"], "Nacht")
        self.assertEqual(self.store.list_expenses(trip)[0]["amount_minor"], 2345)
        self.assertEqual(self.store.connection.execute("SELECT value FROM schema_meta WHERE key='version'").fetchone()[0], "4")

    def test_deleting_trip_preserves_drive_and_unassigns_it(self):
        trip = self.store.create_trip("v1", "Alpen", self.now, self.now)
        with self.store.transaction() as connection:
            connection.execute("INSERT INTO drives(id,vehicle_id,started_at,ended_at,distance_m,end_reason,created_at) VALUES(?,?,?,?,?,?,?)", ("d1", "v1", self.now.isoformat(), self.now.isoformat(), 10, "stop", self.now.isoformat()))
        self.store.link_drives(trip, ["d1"], self.now)
        self.store.delete_trip(trip)
        self.assertEqual(len(self.store.list_drives("v1")), 1)
        self.assertIsNone(self.store.list_drives("v1")[0]["trip_id"])

    def test_auto_assignment_is_idempotent_and_ambiguous_is_noop(self):
        trip = self.store.create_trip("v1", "Alpen", self.now, self.now, status="active")
        with self.store.transaction() as connection:
            connection.execute("INSERT INTO drives(id,vehicle_id,started_at,ended_at,distance_m,end_reason,created_at) VALUES(?,?,?,?,?,?,?)", ("d1", "v1", self.now.isoformat(), self.now.isoformat(), 10, "stop", self.now.isoformat()))
        self.assertEqual(self.store.auto_assign_drive("v1", "d1", self.now), trip)
        self.assertEqual(self.store.auto_assign_drive("v1", "d1", self.now), trip)
        second = self.store.create_trip("v1", "Meer", self.now, self.now, status="active")
        with self.store.transaction() as connection:
            connection.execute("INSERT INTO drives(id,vehicle_id,started_at,ended_at,distance_m,end_reason,created_at) VALUES(?,?,?,?,?,?,?)", ("d2", "v1", self.now.isoformat(), self.now.isoformat(), 10, "stop", self.now.isoformat()))
        self.assertIsNone(self.store.auto_assign_drive("v1", "d2", self.now))
        d2 = next(row for row in self.store.list_drives("v1") if row["id"] == "d2")
        self.assertIsNone(d2["trip_id"])
        self.assertNotEqual(trip, second)


if __name__ == "__main__":
    unittest.main()
