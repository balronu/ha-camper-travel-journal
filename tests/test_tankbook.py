import unittest
from datetime import datetime, timedelta, timezone
import tempfile
from pathlib import Path

from custom_components.camper_travel_journal.storage import SCHEMA_VERSION, SQLiteStore
from custom_components.camper_travel_journal.tankbook import calculate_consumption, normalize_tank_values


UTC = timezone.utc


class TankbookTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.store = SQLiteStore(Path(self.directory.name) / "journal.db")
        self.store.open()
        self.now = datetime(2026, 10, 23, 8, tzinfo=UTC)
        self.store.insert_vehicle("v1", "Camper", "device_tracker.camper", self.now)

    def tearDown(self):
        self.store.close()
        self.directory.cleanup()

    def event(self, stamp, *, liters, fill_level, odometer=None, fuel_type="diesel", amount=None, price=None):
        return self.store.create_tank_event(
            "v1", self.now, occurred_at=stamp, liters=liters, fill_level=fill_level,
            odometer_km=odometer, fuel_type=fuel_type, amount_minor=amount, price_per_liter=price,
        )

    def test_schema_15_is_additive_and_existing_expense_is_not_created(self):
        self.assertEqual(self.store.connection.execute("SELECT value FROM schema_meta WHERE key='version'").fetchone()[0], str(SCHEMA_VERSION))
        self.assertIn("tank_events", self.store.table_names())
        self.assertEqual(self.store.connection.execute("SELECT count(*) FROM expenses").fetchone()[0], 0)

    def test_full_to_full_includes_partial_and_final_full(self):
        self.event(self.now, liters=60.792, fill_level="full", odometer=10000, amount=13125)
        self.event(self.now + timedelta(days=1), liters=20, fill_level="partial", odometer=10100, price=1.50)
        self.event(self.now + timedelta(days=3), liters=42.420, fill_level="full", odometer=10420, amount=9201)
        snapshot = self.store.tankbook_snapshot("v1")
        interval = snapshot["consumption"]["intervals"]["diesel"][0]
        self.assertEqual(interval["liters"], 62.42)
        self.assertEqual(interval["fuel_cost_minor"], 12201)
        self.assertEqual(interval["distance_km"], 420.0)
        self.assertEqual(interval["quality"], "measured")
        self.assertAlmostEqual(interval["combined_l_per_100km"], 14.862, places=3)
        self.assertIsNone(interval["estimated_driving_cost_minor"])

    def test_gps_distance_is_estimated_and_independent_of_trip_assignment(self):
        self.event(self.now, liters=50, fill_level="full")
        self.event(self.now + timedelta(days=1), liters=40, fill_level="full")
        with self.store.transaction() as connection:
            connection.execute(
                "INSERT INTO drives(id,vehicle_id,started_at,ended_at,distance_m,end_reason,created_at) VALUES(?,?,?,?,?,?,?)",
                ("d1", "v1", self.now.isoformat(), (self.now + timedelta(days=1)).isoformat(), 90000, "stop", self.now.isoformat()),
            )
        interval = self.store.tankbook_snapshot("v1")["consumption"]["intervals"]["diesel"][0]
        self.assertEqual(interval["distance_source"], "gps_drives")
        self.assertEqual(interval["quality"], "estimated")
        self.assertAlmostEqual(interval["distance_km"], 90.0)

    def test_gps_gap_does_not_produce_a_precise_value(self):
        self.event(self.now, liters=50, fill_level="full")
        self.event(self.now + timedelta(days=1), liters=40, fill_level="full")
        with self.store.transaction() as connection:
            connection.execute(
                "INSERT INTO drives(id,vehicle_id,started_at,ended_at,distance_m,end_reason,created_at) VALUES(?,?,?,?,?,?,?)",
                ("d1", "v1", (self.now + timedelta(hours=6)).isoformat(), (self.now + timedelta(hours=8)).isoformat(), 90000, "stop", self.now.isoformat()),
            )
        interval = self.store.tankbook_snapshot("v1")["consumption"]["intervals"]["diesel"][0]
        self.assertEqual(interval["quality"], "incomplete")
        self.assertIsNone(interval["combined_l_per_100km"])

    def test_stationary_periods_between_recorded_drives_are_not_called_gps_gaps(self):
        events = [
            {"occurred_at": self.now.isoformat(), "fuel_type": "diesel", "fill_level": "full", "liters": 50},
            {"occurred_at": (self.now + timedelta(days=1)).isoformat(), "fuel_type": "diesel", "fill_level": "full", "liters": 40},
        ]
        drives = [
            {"id": "d1", "started_at": (self.now + timedelta(hours=2)).isoformat(), "ended_at": (self.now + timedelta(hours=3)).isoformat(), "distance_m": 50000},
            {"id": "d2", "started_at": (self.now + timedelta(hours=8)).isoformat(), "ended_at": (self.now + timedelta(hours=9)).isoformat(), "distance_m": 30000},
        ]
        points = [
            {"recorded_at": self.now.isoformat(), "latitude": 49, "longitude": 7},
            {"recorded_at": (self.now + timedelta(days=1)).isoformat(), "latitude": 49, "longitude": 7},
        ]
        interval = calculate_consumption(events, drives, gps_points=points)["intervals"]["diesel"][0]
        self.assertEqual(interval["quality"], "estimated")
        self.assertEqual(interval["distance_source"], "gps_drives")
        self.assertEqual(interval["gps_diagnosis"]["stationary_or_unobserved_periods"], 1)

    def test_boundary_drive_uses_only_timestamped_overlap(self):
        start, end = self.now, self.now + timedelta(hours=2)
        events = [
            {"occurred_at": start.isoformat(), "fuel_type": "diesel", "fill_level": "full", "liters": 10},
            {"occurred_at": end.isoformat(), "fuel_type": "diesel", "fill_level": "full", "liters": 8},
        ]
        drive = {"id": "boundary", "started_at": (start - timedelta(hours=1)).isoformat(), "ended_at": (end + timedelta(hours=1)).isoformat(), "distance_m": 999999,
                 "gps_points": [
                     {"recorded_at": (start - timedelta(minutes=30)).isoformat(), "latitude": 49, "longitude": 7},
                     {"recorded_at": (start + timedelta(minutes=30)).isoformat(), "latitude": 49, "longitude": 7.01},
                     {"recorded_at": (end + timedelta(minutes=30)).isoformat(), "latitude": 49, "longitude": 7.02},
                 ]}
        interval = calculate_consumption(events, [drive], gps_points=[{"recorded_at": start.isoformat()} , {"recorded_at": end.isoformat()}])["intervals"]["diesel"][0]
        self.assertEqual(interval["quality"], "estimated")
        self.assertLess(interval["distance_km"], 999.0)
        self.assertGreater(interval["distance_km"], 0)

    def test_no_gps_distance_is_not_presented_as_zero_consumption(self):
        events = [
            {"occurred_at": self.now.isoformat(), "fuel_type": "diesel", "fill_level": "full", "liters": 50},
            {"occurred_at": (self.now + timedelta(days=1)).isoformat(), "fuel_type": "diesel", "fill_level": "full", "liters": 40},
        ]
        interval = calculate_consumption(events, [])['intervals']['diesel'][0]
        self.assertEqual(interval['quality'], 'not_calculable')
        self.assertIsNone(interval['combined_l_per_100km'])
        self.assertIn("no_drives", interval["gps_diagnosis"]["gaps"])

    def test_adblue_is_separate_and_heating_is_not_called_engine_consumption(self):
        self.event(self.now, liters=10, fill_level="full", fuel_type="adblue", odometer=10000)
        self.event(self.now + timedelta(days=1), liters=8, fill_level="full", fuel_type="adblue", odometer=10200)
        self.event(self.now, liters=50, fill_level="full", odometer=10000)
        self.event(self.now + timedelta(days=1), liters=40, fill_level="full", odometer=10200)
        interval = self.store.tankbook_snapshot("v1")["consumption"]["intervals"]["diesel"][0]
        self.assertEqual(interval["heater_quality"], "unknown")
        self.assertIsNone(interval["heater_liters"])
        self.assertEqual(self.store.tankbook_snapshot("v1")["consumption"]["intervals"]["adblue"][0]["liters"], 8.0)

    def test_heater_estimate_is_separate_from_combined_consumption(self):
        events = [
            {"occurred_at": self.now.isoformat(), "fuel_type": "diesel", "fill_level": "full", "liters": 50, "amount_minor": 10000, "odometer_km": 1000},
            {"occurred_at": (self.now + timedelta(days=1)).isoformat(), "fuel_type": "diesel", "fill_level": "full", "liters": 40, "amount_minor": 8000, "odometer_km": 1200},
        ]
        interval = calculate_consumption(events, [], heater={"hours": 10, "liters_per_hour": 0.4})["intervals"]["diesel"][0]
        self.assertEqual(interval["quality"], "measured")
        self.assertEqual(interval["heater_quality"], "estimated")
        self.assertEqual(interval["heater_liters"], 4.0)
        self.assertEqual(interval["driving_liters"], 36.0)
        self.assertEqual(interval["estimated_driving_cost_minor"], 7200)

    def test_manual_heater_liters_are_marked_estimated(self):
        events = [
            {"occurred_at": self.now.isoformat(), "fuel_type": "diesel", "fill_level": "full", "liters": 50},
            {"occurred_at": (self.now + timedelta(days=1)).isoformat(), "fuel_type": "diesel", "fill_level": "full", "liters": 40},
        ]
        interval = calculate_consumption(events, [], heater={"manual_liters": 3})['intervals']['diesel'][0]
        self.assertEqual(interval['heater_quality'], 'estimated')
        self.assertEqual(interval['heater_liters'], 3.0)

    def test_existing_fuel_expense_can_be_linked_without_duplicate_expense(self):
        from custom_components.camper_travel_journal.models import Expense
        trip = self.store.create_trip("v1", "Reise", self.now, self.now)
        expense = self.store.create_expense(Expense("", trip, self.now, "fuel", 13125, "EUR", fuel_liters=60.792, fuel_price_per_liter=2.159), self.now)
        event = self.store.create_tank_event("v1", self.now, occurred_at=self.now, liters=60.792, fill_level="full", amount_minor=13125, expense_id=expense)
        self.assertEqual(self.store.connection.execute("SELECT count(*) FROM expenses").fetchone()[0], 1)
        self.assertEqual(self.store.list_tank_events("v1")[0]["expense_id"], expense)
        self.store.delete_tank_event(event)
        self.assertEqual(self.store.connection.execute("SELECT count(*) FROM expenses").fetchone()[0], 1)

    def test_fuel_expenses_are_importable_once_and_link_is_explicitly_removable(self):
        from custom_components.camper_travel_journal.models import Expense
        trip = self.store.create_trip("v1", "Reise", self.now, self.now)
        older = self.store.create_expense(Expense("", trip, self.now, "fuel", 13125, "EUR", note="Vollgetankt vor der Fahrt", occurred_on="2026-10-23", fuel_liters=60.792, fuel_price_per_liter=2.159), self.now)
        newer = self.store.create_expense(Expense("", trip, self.now, "fuel", 9201, "EUR", note="Vollgetankt nach der Fahrt", occurred_on="2026-10-26", occurred_time="11:04", fuel_liters=42.420, fuel_price_per_liter=2.169), self.now)
        available = self.store.list_fuel_expenses("v1")
        self.assertEqual([row["id"] for row in available], [newer, older])
        self.assertTrue(all(row["tank_event_id"] is None for row in available))
        event = self.store.create_tank_event("v1", self.now, occurred_at=self.now, liters=60.792, fill_level="full", amount_minor=13125, price_per_liter=2.159, expense_id=older)
        self.assertEqual(self.store.list_fuel_expenses("v1")[1]["tank_event_id"], event)
        with self.assertRaisesRegex(ValueError, "tankbook_expense_already_linked"):
            self.store.create_tank_event("v1", self.now + timedelta(days=1), occurred_at=self.now + timedelta(days=1), liters=60.792, fill_level="full", amount_minor=13125, expense_id=older)
        with self.assertRaisesRegex(ValueError, "tankbook_expense_linked"):
            self.store.delete_expense(older)
        with self.assertRaisesRegex(ValueError, "tankbook_unlink_confirmation_required"):
            self.store.unlink_tank_event(event)
        self.store.unlink_tank_event(event, confirmed=True)
        self.assertIsNone(self.store.list_fuel_expenses("v1")[1]["tank_event_id"])

    def test_linked_expense_delete_does_not_delete_tank_event_after_explicit_unlink(self):
        from custom_components.camper_travel_journal.models import Expense
        trip = self.store.create_trip("v1", "Reise", self.now, self.now)
        expense = self.store.create_expense(Expense("", trip, self.now, "fuel", 1000, "EUR", fuel_liters=10, fuel_price_per_liter=1), self.now)
        event = self.store.create_tank_event("v1", self.now, occurred_at=self.now, liters=10, fill_level="partial", expense_id=expense)
        self.store.unlink_tank_event(event, confirmed=True)
        self.store.delete_expense(expense)
        self.assertEqual(self.store.list_tank_events("v1")[0]["id"], event)
        self.assertIsNone(self.store.list_tank_events("v1")[0]["expense_id"])

    def test_values_can_be_missing_but_inconsistent_values_are_rejected(self):
        self.assertEqual(normalize_tank_values("60,792", "2,159", None)[2], 13125)
        with self.assertRaisesRegex(ValueError, "tankbook_values_inconsistent"):
            normalize_tank_values(60, 2, 100)


if __name__ == "__main__":
    unittest.main()
