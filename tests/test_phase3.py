"""Phase 3 CRUD, migration and automatic assignment coverage."""

import tempfile
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path

from custom_components.camper_travel_journal.models import Expense, Stop
from custom_components.camper_travel_journal.storage import SCHEMA_VERSION, SQLiteStore

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
        self.assertEqual(self.store.connection.execute("SELECT value FROM schema_meta WHERE key='version'").fetchone()[0], str(SCHEMA_VERSION))

    def test_actual_expense_date_time_and_capture_timestamp_are_distinct(self):
        trip = self.store.create_trip("v1", "Datum", self.now, self.now)
        self.store.create_expense(Expense("", trip, self.now, "fuel", 100, "EUR", occurred_on="2026-01-02", occurred_time="07:15"), self.now)
        row = self.store.list_expenses(trip)[0]
        self.assertEqual(row["occurred_on"], "2026-01-02")
        self.assertEqual(row["occurred_time"], "07:15")
        self.assertEqual(row["created_at"], self.now.isoformat())

    def test_expense_time_update_distinguishes_omit_from_explicit_null(self):
        trip = self.store.create_trip("v1", "Uhrzeit", self.now, self.now)
        expense = self.store.create_expense(
            Expense("", trip, self.now, "fuel", 100, "EUR", occurred_time="12:00"), self.now
        )
        self.store.update_expense(expense, self.now, note="beibehalten")
        self.assertEqual(self.store.list_expenses(trip)[0]["occurred_time"], "12:00")
        self.store.update_expense(expense, self.now, occurred_time="13:15")
        self.assertEqual(self.store.list_expenses(trip)[0]["occurred_time"], "13:15")
        self.store.update_expense(expense, self.now, occurred_time=None)
        self.assertIsNone(self.store.list_expenses(trip)[0]["occurred_time"])
        self.store.update_expense(expense, self.now, occurred_time=None)
        self.assertIsNone(self.store.list_expenses(trip)[0]["occurred_time"])

    def test_existing_v10_database_backfills_raw_points_once(self):
        trip = self.store.create_trip("v1", "Backfill", self.now, self.now)
        with self.store.transaction() as connection:
            for index in range(3):
                connection.execute(
                    "INSERT INTO gps_points(vehicle_id,recorded_at,latitude,longitude) VALUES(?,?,?,?)",
                    ("v1", (self.now + timedelta(minutes=index)).isoformat(), 53.0 + index, 8.0 + index),
                )
            connection.execute(
                "INSERT INTO drives(id,vehicle_id,started_at,ended_at,distance_m,end_reason,source,created_at) VALUES(?,?,?,?,?,?,?,?)",
                ("raw-drive", "v1", self.now.isoformat(), (self.now + timedelta(minutes=2)).isoformat(), 1234, "stop", "gpx", self.now.isoformat()),
            )
            connection.execute("UPDATE schema_meta SET value='10' WHERE key='version'")
            connection.execute("DELETE FROM schema_meta WHERE key='v10_gpx_backfill'")
        self.store.close()
        self.store.open()
        drive = self.store.list_drives("v1")[0]
        self.assertEqual((drive["start_latitude"], drive["end_longitude"]), (53.0, 10.0))
        self.assertEqual(self.store.connection.execute("SELECT count(*) FROM drive_gps_points WHERE drive_id='raw-drive'").fetchone()[0], 3)
        self.assertEqual(self.store.connection.execute("SELECT count(*) FROM schema_meta WHERE key='v10_gpx_backfill'").fetchone()[0], 1)
        self.store.close()
        self.store.open()
        self.assertEqual(self.store.connection.execute("SELECT count(*) FROM drive_gps_points WHERE drive_id='raw-drive'").fetchone()[0], 3)
        self.assertEqual(self.store.list_drives("v1")[0]["distance_m"], 1234)

    def test_v10_backfill_preserves_explicit_membership_and_skips_overlaps(self):
        with self.store.transaction() as connection:
            for drive_id, start, end in (("explicit", self.now, self.now + timedelta(minutes=2)), ("overlap", self.now + timedelta(minutes=1), self.now + timedelta(minutes=3))):
                connection.execute(
                    "INSERT INTO drives(id,vehicle_id,started_at,ended_at,distance_m,end_reason,source,created_at) VALUES(?,?,?,?,?,?,?,?)",
                    (drive_id, "v1", start.isoformat(), end.isoformat(), 50, "stop", "gpx", self.now.isoformat()),
                )
            point = connection.execute(
                "INSERT INTO gps_points(vehicle_id,recorded_at,latitude,longitude) VALUES(?,?,?,?)",
                ("v1", self.now.isoformat(), 53.0, 8.0),
            )
            connection.execute(
                "INSERT INTO drive_gps_points(drive_id,gps_point_id,ordinal,association_source) VALUES(?,?,?,?)",
                ("explicit", point.lastrowid, 0, "gpx_exact"),
            )
            connection.execute("DELETE FROM schema_meta WHERE key='v10_gpx_backfill'")
        self.store.close()
        self.store.open()
        self.assertEqual(self.store.connection.execute("SELECT count(*) FROM drive_gps_points WHERE drive_id='explicit'").fetchone()[0], 1)
        self.assertEqual(self.store.connection.execute("SELECT count(*) FROM drive_gps_points WHERE drive_id='overlap'").fetchone()[0], 0)

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

    def test_optional_trip_dates_and_manual_drive_round_trip(self):
        trip = self.store.create_trip("v1", "Mit Datum", self.now, self.now, start_date="2026-10-01", end_date="2026-10-08")
        row = self.store.list_trips("v1")[0]
        self.assertEqual((row["start_date"], row["end_date"]), ("2026-10-01", "2026-10-08"))
        self.store.update_trip(trip, self.now, start_date=None, end_date=None)
        self.assertIsNone(self.store.list_trips("v1")[0]["start_date"])
        manual = self.store.create_manual_drive("v1", self.now, "Bremen", "Hamburg", 123.4, 90, self.now, trip)
        drive = self.store.list_drives("v1", trip_id=trip)[0]
        self.assertEqual(drive["id"], manual)
        self.assertEqual((drive["source"], drive["start_label"], drive["end_label"]), ("manual", "Bremen", "Hamburg"))
        self.assertEqual(drive["duration_seconds"], 5400)
        self.assertEqual(drive["assignment_status"], "assigned")
        self.store.update_manual_drive(manual, "v1", self.now + timedelta(hours=1), "Bremen Hbf", "Hamburg Hbf", 125.6, 95, self.now)
        updated = self.store.list_drives("v1", trip_id=trip)[0]
        self.assertEqual((updated["start_label"], updated["end_label"], updated["manual_distance_km"]), ("Bremen Hbf", "Hamburg Hbf", 125.6))
        self.store.delete_manual_drive(manual, "v1")
        self.assertEqual(self.store.list_drives("v1", trip_id=trip), [])

    def test_gps_drive_cannot_be_manually_edited_or_deleted(self):
        with self.store.transaction() as connection:
            connection.execute("INSERT INTO drives(id,vehicle_id,started_at,ended_at,distance_m,end_reason,created_at) VALUES(?,?,?,?,?,?,?)", ("gps1", "v1", self.now.isoformat(), self.now.isoformat(), 1000, "stop", self.now.isoformat()))
        with self.assertRaisesRegex(ValueError, "drive_not_manual"):
            self.store.update_manual_drive("gps1", "v1", self.now, "A", "B", 1, None, self.now)
        with self.assertRaisesRegex(ValueError, "drive_not_manual"):
            self.store.delete_manual_drive("gps1", "v1")
        self.assertEqual(self.store.list_drives("v1")[0]["id"], "gps1")

    def test_manual_drive_validation_and_restart_persistence(self):
        trip = self.store.create_trip("v1", "Persistenz", self.now, self.now)
        with self.assertRaisesRegex(ValueError, "drive_distance_invalid"):
            self.store.create_manual_drive("v1", self.now, "A", "B", -1, None, self.now)
        with self.assertRaisesRegex(ValueError, "drive_duration_invalid"):
            self.store.create_manual_drive("v1", self.now, "A", "B", 1, -1, self.now)
        manual = self.store.create_manual_drive("v1", self.now, "A", "B", 1, 10, self.now, trip)
        self.store.close()
        self.store.open()
        self.assertEqual(self.store.list_drives("v1", trip_id=trip)[0]["id"], manual)

    def test_manual_drive_rejects_other_vehicle_trip(self):
        self.store.insert_vehicle("v2", "Other", "device_tracker.other", self.now)
        trip = self.store.create_trip("v2", "Andere Reise", self.now, self.now)
        with self.assertRaisesRegex(ValueError, "vehicle_mismatch"):
            self.store.create_manual_drive("v1", self.now, "A", "B", 1, None, self.now, trip)

    def test_schema_four_database_migrates_without_losing_existing_rows(self):
        trip = self.store.create_trip("v1", "Altbestand", self.now, self.now)
        with self.store.transaction() as connection:
            connection.execute("INSERT INTO drives(id,vehicle_id,started_at,ended_at,distance_m,end_reason,created_at) VALUES(?,?,?,?,?,?,?)", ("legacy", "v1", self.now.isoformat(), self.now.isoformat(), 1000, "stop", self.now.isoformat()))
            connection.execute("UPDATE schema_meta SET value='4' WHERE key='version'")
            connection.execute("ALTER TABLE trips DROP COLUMN start_date")
            connection.execute("ALTER TABLE trips DROP COLUMN end_date")
            connection.execute("ALTER TABLE drives DROP COLUMN source")
            connection.execute("ALTER TABLE drives DROP COLUMN start_label")
            connection.execute("ALTER TABLE drives DROP COLUMN end_label")
        self.store.close()
        self.store.open()
        self.assertEqual(self.store.connection.execute("SELECT value FROM schema_meta WHERE key='version'").fetchone()[0], str(SCHEMA_VERSION))
        self.assertEqual(self.store.list_trips("v1")[0]["id"], trip)
        legacy = self.store.list_drives("v1")[0]
        self.assertEqual((legacy["id"], legacy["source"]), ("legacy", "gps"))

    def test_schema_five_migration_rolls_back_interruption_and_resumes(self):
        with self.store.transaction() as connection:
            connection.execute("UPDATE schema_meta SET value='4' WHERE key='version'")
            connection.execute("ALTER TABLE trips DROP COLUMN start_date")
            connection.execute("ALTER TABLE trips DROP COLUMN end_date")
            connection.execute("ALTER TABLE drives DROP COLUMN source")
            connection.execute("ALTER TABLE drives DROP COLUMN start_label")
            connection.execute("ALTER TABLE drives DROP COLUMN end_label")
        original = SQLiteStore._migrate_v5

        def interrupted(store):
            store.connection.execute("ALTER TABLE trips ADD COLUMN interrupted TEXT")
            raise RuntimeError("synthetic_migration_interrupt")

        SQLiteStore._migrate_v5 = interrupted
        self.store.close()
        with self.assertRaisesRegex(RuntimeError, "synthetic_migration_interrupt"):
            self.store.open()
        SQLiteStore._migrate_v5 = original
        self.store.open()
        columns = {row[1] for row in self.store.connection.execute("PRAGMA table_info(trips)")}
        self.assertNotIn("interrupted", columns)
        self.assertEqual(self.store.connection.execute("SELECT value FROM schema_meta WHERE key='version'").fetchone()[0], str(SCHEMA_VERSION))


if __name__ == "__main__":
    unittest.main()
