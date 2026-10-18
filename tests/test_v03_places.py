"""v0.3.0 place foundation and additive schema coverage."""

import tempfile
import unittest
from datetime import datetime, timezone
from pathlib import Path

from custom_components.camper_travel_journal.models import Expense, Stop
from custom_components.camper_travel_journal.storage import SQLiteStore
from custom_components.camper_travel_journal.export_contract import build_public_trip_export

UTC = timezone.utc


class V03PlaceTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.store = SQLiteStore(Path(self.directory.name) / "journal.db")
        self.store.open()
        self.now = datetime(2026, 10, 18, 12, tzinfo=UTC)
        self.store.insert_vehicle("v1", "Camper", "device_tracker.camper", self.now)
        self.trip = self.store.create_trip("v1", "Herbstreise", self.now, self.now)

    def tearDown(self):
        self.store.close()
        self.directory.cleanup()

    def test_v8_is_additive_and_preserves_legacy_expense_link(self):
        stop = self.store.create_stop(Stop("", "v1", "Stellplatz", self.now, trip_id=self.trip, automatic=False), self.now)
        expense = self.store.create_expense(Expense("", self.trip, self.now, "camping", 2400, "EUR", stay_id=stop), self.now)
        tables = self.store.table_names()
        self.assertEqual(self.store.connection.execute("SELECT value FROM schema_meta WHERE key='version'").fetchone()[0], "9")
        self.assertTrue({"overnight_details", "place_ratings", "stop_suggestions", "interruption_links"}.issubset(tables))
        row = self.store.list_expenses(self.trip)[0]
        self.assertEqual((row["stay_id"], row["place_id"]), (stop, stop))
        self.assertEqual(expense, row["id"])

    def test_overnight_details_and_independent_rating_are_normalized(self):
        stop = self.store.create_stop(Stop("", "v1", "Campingplatz", self.now, trip_id=self.trip, automatic=False, place_type="camping"), self.now)
        self.store.upsert_overnight_details(stop, self.now, place_kind="campsite", website_url=" https://example.invalid ", large_rv_suitable=True)
        self.store.upsert_place_rating(stop, self.now, overall=5, large_rv_access=4, review_text="Gut für große Fahrzeuge")
        row = self.store.list_stops("v1", self.trip)[0]
        self.assertEqual((row["place_type"], row["place_kind"], row["rating_overall"]), ("camping", "campsite", 5))
        self.assertEqual(row["website_url"], "https://example.invalid")
        self.store.delete_place_rating(stop)
        self.assertIsNone(self.store.list_stops("v1", self.trip)[0]["rating_overall"])

    def test_invalid_rating_does_not_create_partial_record(self):
        stop = self.store.create_stop(Stop("", "v1", "Ort", self.now, trip_id=self.trip, automatic=False), self.now)
        with self.assertRaisesRegex(ValueError, "rating_overall_invalid"):
            self.store.upsert_place_rating(stop, self.now, overall=6)
        self.assertIsNone(self.store.list_stops("v1", self.trip)[0]["rating_overall"])

    def test_gap_aware_suggestions_are_pending_deduplicated_and_confirmable(self):
        for minute in (0, 5, 10, 15):
            self.store.connection.execute("INSERT INTO gps_points(vehicle_id,recorded_at,latitude,longitude) VALUES(?,?,?,?)", ("v1", f"2026-10-18T12:{minute:02d}:00+00:00", 50.0 + minute * 0.00001, 8.0))
        self.store.connection.commit()
        suggestions = self.store.generate_stop_suggestions("v1", self.now)
        self.assertEqual(len(suggestions), 1)
        self.assertEqual(suggestions[0]["status"], "pending")
        self.assertEqual(self.store.generate_stop_suggestions("v1", self.now), [])
        stop_id = self.store.accept_stop_suggestion(suggestions[0]["id"], self.now, trip_id=self.trip)
        self.assertEqual(self.store.list_stops("v1", self.trip)[0]["id"], stop_id)
        self.assertEqual(self.store.list_stop_suggestions("v1", status="all")[0]["status"], "accepted")

    def test_trip_scoped_suggestions_use_assigned_gps_points_only(self):
        drive_id = "drive-retroactive"
        self.store.connection.execute(
            "INSERT INTO drives(id,vehicle_id,started_at,ended_at,distance_m,end_reason,source,created_at) VALUES(?,?,?,?,?,?,?,?)",
            (drive_id, "v1", "2026-10-18T12:00:00+00:00", "2026-10-18T12:20:00+00:00", 0, "test", "gpx", self.now.isoformat()),
        )
        self.store.connection.execute(
            "INSERT INTO trip_drives(trip_id,drive_id,linked_at) VALUES(?,?,?)",
            (self.trip, drive_id, self.now.isoformat()),
        )
        for ordinal, minute in enumerate((0, 5, 10, 15)):
            cursor = self.store.connection.execute(
                "INSERT INTO gps_points(vehicle_id,recorded_at,latitude,longitude) VALUES(?,?,?,?)",
                ("v1", f"2026-10-18T12:{minute:02d}:00+00:00", 50.0, 8.0),
            )
            self.store.connection.execute(
                "INSERT INTO drive_gps_points(drive_id,gps_point_id,ordinal,association_source) VALUES(?,?,?,?)",
                (drive_id, cursor.lastrowid, ordinal, "test"),
            )
        # This stationary window belongs to the same vehicle but not to the trip.
        for minute in (30, 35, 40):
            self.store.connection.execute(
                "INSERT INTO gps_points(vehicle_id,recorded_at,latitude,longitude) VALUES(?,?,?,?)",
                ("v1", f"2026-10-18T12:{minute:02d}:00+00:00", 51.0, 9.0),
            )
        self.store.connection.commit()

        suggestions = self.store.generate_stop_suggestions("v1", self.now, trip_id=self.trip)
        self.assertEqual(len(suggestions), 1)
        self.assertEqual(suggestions[0]["trip_id"], self.trip)
        self.assertEqual(suggestions[0]["drive_id"], drive_id)
        self.assertEqual(self.store.generate_stop_suggestions("v1", self.now, trip_id=self.trip), [])

    def test_trip_scoped_suggestions_reject_unknown_or_foreign_trip(self):
        self.store.insert_vehicle("v2", "Other", "device_tracker.other", self.now)
        other_trip = self.store.create_trip("v2", "Other", self.now, self.now)
        with self.assertRaisesRegex(ValueError, "trip_not_found"):
            self.store.generate_stop_suggestions("v1", self.now, trip_id="missing")
        with self.assertRaisesRegex(ValueError, "trip_vehicle_mismatch"):
            self.store.generate_stop_suggestions("v1", self.now, trip_id=other_trip)

    def test_derived_trip_interruptions_use_drive_endpoints_without_persisting(self):
        drives = [
            ("b1", "2026-10-13T04:06:00+00:00", "2026-10-13T11:46:00+00:00"),
            ("b2", "2026-10-14T06:43:00+00:00", "2026-10-14T11:00:00+00:00"),
            ("b3", "2026-10-14T11:11:00+00:00", "2026-10-14T14:19:00+00:00"),
        ]
        for drive_id, started, ended in drives:
            self.store.connection.execute(
                "INSERT INTO drives(id,vehicle_id,started_at,ended_at,distance_m,end_reason,source,created_at) VALUES(?,?,?,?,?,?,?,?)",
                (drive_id, "v1", started, ended, 1000, "test", "gps", self.now.isoformat()),
            )
            self.store.connection.execute(
                "INSERT INTO trip_drives(trip_id,drive_id,linked_at) VALUES(?,?,?)",
                (self.trip, drive_id, self.now.isoformat()),
            )
        for drive_id, recorded, latitude in (
            ("b1", "2026-10-13T11:45:00+00:00", 53.08),
            ("b2", "2026-10-14T06:44:00+00:00", 53.09),
            ("b2", "2026-10-14T10:59:00+00:00", 53.10),
            ("b3", "2026-10-14T11:12:00+00:00", 53.11),
        ):
            point = self.store.connection.execute(
                "INSERT INTO gps_points(vehicle_id,recorded_at,latitude,longitude) VALUES(?,?,?,?)",
                ("v1", recorded, latitude, 8.8),
            )
            ordinal = self.store.connection.execute(
                "SELECT count(*) FROM drive_gps_points WHERE drive_id=?", (drive_id,)
            ).fetchone()[0]
            self.store.connection.execute(
                "INSERT INTO drive_gps_points(drive_id,gps_point_id,ordinal,association_source) VALUES(?,?,?,?)",
                (drive_id, point.lastrowid, ordinal, "test"),
            )
        self.store.connection.commit()

        gaps = self.store.list_trip_interruptions("v1", self.trip)
        self.assertEqual([gap["duration_seconds"] for gap in gaps], [18 * 3600 + 57 * 60, 11 * 60])
        self.assertEqual(gaps[0]["status"], "unassigned")
        self.assertEqual(gaps[0]["previous_end_point"]["latitude"], 53.08)
        self.assertEqual(gaps[1]["next_start_point"]["latitude"], 53.11)
        self.assertEqual(self.store.list_stops("v1", self.trip), [])

    def test_derived_interruptions_report_existing_confirmed_place(self):
        first = self.store.create_manual_drive("v1", datetime(2026, 10, 13, 10, tzinfo=UTC), "A", "B", 1, 60, self.now, self.trip)
        second = self.store.create_manual_drive("v1", datetime(2026, 10, 13, 13, tzinfo=UTC), "C", "D", 1, 60, self.now, self.trip)
        stop = self.store.create_stop(Stop("", "v1", "Bereits erfasst", datetime(2026, 10, 13, 11, tzinfo=UTC), arrived_at=datetime(2026, 10, 13, 11, tzinfo=UTC), departed_at=datetime(2026, 10, 13, 12, tzinfo=UTC), trip_id=self.trip, automatic=False), self.now)
        gap = self.store.list_trip_interruptions("v1", self.trip)[0]
        self.assertEqual((gap["previous_drive_id"], gap["next_drive_id"], gap["existing_place_id"]), (first, second, stop))
        self.assertEqual(gap["status"], "stop")

    def test_interruption_assignment_is_persistent_reversible_and_does_not_duplicate_place(self):
        first = self.store.create_manual_drive("v1", datetime(2026, 10, 13, 10, tzinfo=UTC), "A", "B", 1, 60, self.now, self.trip)
        second = self.store.create_manual_drive("v1", datetime(2026, 10, 13, 13, tzinfo=UTC), "C", "D", 1, 60, self.now, self.trip)
        stop = self.store.create_stop(Stop("", "v1", "Kuhhirten", datetime(2026, 10, 13, 11, tzinfo=UTC), arrived_at=datetime(2026, 10, 13, 11, tzinfo=UTC), departed_at=datetime(2026, 10, 13, 12, tzinfo=UTC), trip_id=self.trip, automatic=False), self.now)
        gap_id = f"{first}:{second}"
        self.store.assign_interruption(self.trip, gap_id, self.now, status="overnight", stop_id=stop)
        self.assertEqual(self.store.list_trip_interruptions("v1", self.trip)[0]["status"], "overnight")
        self.assertEqual(self.store.list_trip_interruptions("v1", self.trip)[0]["existing_place_id"], stop)
        self.store.close()
        self.store.open()
        self.assertEqual(self.store.list_trip_interruptions("v1", self.trip)[0]["status"], "overnight")
        self.store.assign_interruption(self.trip, gap_id, self.now, status="pause")
        gap = self.store.list_trip_interruptions("v1", self.trip)[0]
        self.assertEqual((gap["status"], gap["existing_place_id"]), ("pause", None))
        self.assertEqual(len(self.store.list_stops("v1", self.trip)), 1)

    def test_create_place_from_interruption_uses_real_gap_times_and_available_point(self):
        first = self.store.create_manual_drive("v1", datetime(2026, 10, 13, 10, tzinfo=UTC), "A", "B", 1, 60, self.now, self.trip)
        second = self.store.create_manual_drive("v1", datetime(2026, 10, 13, 13, tzinfo=UTC), "C", "D", 1, 60, self.now, self.trip)
        with self.store.transaction() as connection:
            point = connection.execute("INSERT INTO gps_points(vehicle_id,recorded_at,latitude,longitude) VALUES(?,?,?,?)", ("v1", "2026-10-13T11:59:00+00:00", 53.08, 8.8))
            connection.execute("INSERT INTO drive_gps_points(drive_id,gps_point_id,ordinal,association_source) VALUES(?,?,?,?)", (first, point.lastrowid, 0, "test"))
        stop = self.store.create_stop_from_interruption(self.trip, f"{first}:{second}", self.now, name="Kuhhirten", place_type="rv_site", overnight=True)
        saved = self.store.list_stops("v1", self.trip)[0]
        self.assertEqual((saved["id"], saved["arrived_at"], saved["departed_at"], saved["latitude"], saved["place_kind"]), (stop, "2026-10-13T11:00:00+00:00", "2026-10-13T13:00:00+00:00", 53.08, "rv_site"))
        self.assertEqual(self.store.list_trip_interruptions("v1", self.trip)[0]["status"], "overnight")

    def test_interruption_assignment_rejects_invalid_or_cross_trip_place(self):
        first = self.store.create_manual_drive("v1", datetime(2026, 10, 13, 10, tzinfo=UTC), "A", "B", 1, 60, self.now, self.trip)
        second = self.store.create_manual_drive("v1", datetime(2026, 10, 13, 13, tzinfo=UTC), "C", "D", 1, 60, self.now, self.trip)
        with self.assertRaisesRegex(ValueError, "interruption_status_invalid"):
            self.store.assign_interruption(self.trip, f"{first}:{second}", self.now, status="unknown")
        with self.assertRaisesRegex(ValueError, "interruption_place_required"):
            self.store.assign_interruption(self.trip, f"{first}:{second}", self.now, status="stop")
        self.store.assign_interruption(self.trip, f"{first}:{second}", self.now, status="ignored")
        self.assertEqual(self.store.list_trip_interruptions("v1", self.trip)[0]["status"], "ignored")

    def test_public_export_defaults_to_private_fields(self):
        stop = {"id": "p1", "name": "Geheimer Ort", "place_type": "restaurant", "latitude": 50.0, "longitude": 8.0, "description": "privat", "review_text": "privat", "rating_overall": 4}
        payload = build_public_trip_export({"id": self.trip, "title": "Reise", "destination": "Ziel"}, [stop])
        self.assertNotIn("location", payload["places"][0])
        self.assertNotIn("description", payload["places"][0])
        self.assertNotIn("review_text", payload["places"][0])

    def test_place_and_trip_validation_prevents_cross_vehicle_links(self):
        self.store.insert_vehicle("v2", "Other", "device_tracker.other", self.now)
        other_trip = self.store.create_trip("v2", "Other trip", self.now, self.now)
        stop = self.store.create_stop(Stop("", "v1", "Ort", self.now, trip_id=self.trip, automatic=False), self.now)
        with self.assertRaisesRegex(ValueError, "vehicle_mismatch"):
            self.store.update_stop(stop, self.now, trip_id=other_trip)
        with self.assertRaisesRegex(ValueError, "vehicle_mismatch"):
            self.store.create_expense(Expense("", other_trip, self.now, "camping", 100, "EUR", place_id=stop), self.now)


if __name__ == "__main__":
    unittest.main()
