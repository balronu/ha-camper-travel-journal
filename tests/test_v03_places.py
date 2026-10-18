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
        self.assertEqual(self.store.connection.execute("SELECT value FROM schema_meta WHERE key='version'").fetchone()[0], "8")
        self.assertTrue({"overnight_details", "place_ratings", "stop_suggestions"}.issubset(tables))
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
