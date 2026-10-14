import sqlite3
import tempfile
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path

from custom_components.camper_travel_journal.detector import DetectorConfig, DriveDetector
from custom_components.camper_travel_journal.models import GPSPoint
from custom_components.camper_travel_journal.retention import is_expired
from custom_components.camper_travel_journal.storage import SQLiteStore
from custom_components.camper_travel_journal.validation import haversine_m, should_store_point, validate_point

UTC = timezone.utc


def point(at: datetime, lat: float = 49.0, lon: float = 7.0) -> GPSPoint:
    return GPSPoint("vehicle-1", at, lat, lon, accuracy_m=5, source_type="gps")


class DomainTests(unittest.TestCase):
    def test_coordinate_validation_and_distance(self) -> None:
        now = datetime(2026, 1, 1, tzinfo=UTC)
        self.assertTrue(validate_point(point(now)).accepted)
        self.assertFalse(validate_point(point(now, lat=95)).accepted)
        self.assertGreater(haversine_m(49.0, 7.0, 49.001, 7.0), 100)

    def test_filter_requires_time_and_movement(self) -> None:
        first = point(datetime(2026, 1, 1, tzinfo=UTC))
        short = point(first.recorded_at + timedelta(seconds=20), lon=7.001)
        moved = point(first.recorded_at + timedelta(seconds=30), lon=7.001)
        self.assertFalse(should_store_point(first, short))
        self.assertTrue(should_store_point(first, moved))

    def test_gap_never_adds_airline_distance(self) -> None:
        detector = DriveDetector("vehicle-1", DetectorConfig(stop_after=timedelta(minutes=5)))
        start = datetime(2026, 1, 1, tzinfo=UTC)
        detector.ingest(point(start))
        detector.ingest(point(start + timedelta(seconds=30), lon=7.01))
        detector.ingest(point(start + timedelta(seconds=60), lon=7.02))
        distance_before_gap = detector.distance_m
        events = detector.ingest(point(start + timedelta(minutes=30), lon=8.0))
        self.assertTrue(any(event.kind == "gps_gap" for event in events))
        self.assertEqual(detector.distance_m, distance_before_gap)

    def test_drive_start_and_stationary_finish(self) -> None:
        detector = DriveDetector("vehicle-1", DetectorConfig(stop_after=timedelta(minutes=5)))
        start = datetime(2026, 1, 1, tzinfo=UTC)
        self.assertEqual(detector.ingest(point(start)), [])
        self.assertEqual(detector.ingest(point(start + timedelta(seconds=30), lon=7.001)), [])
        started = detector.ingest(point(start + timedelta(seconds=60), lon=7.002))
        self.assertTrue(any(event.kind == "drive_started" for event in started))
        finished = detector.ingest(point(start + timedelta(minutes=6), lon=7.002))
        self.assertEqual(len(finished), 1)
        self.assertEqual(finished[0].kind, "drive_finished")
        self.assertIsNotNone(finished[0].drive)

    def test_retention_keeps_assigned_data(self) -> None:
        now = datetime(2026, 4, 1, tzinfo=UTC)
        old = now - timedelta(days=91)
        self.assertTrue(is_expired(old, now, assigned=False))
        self.assertFalse(is_expired(old, now, assigned=True))

    def test_sqlite_schema_enables_foreign_keys(self) -> None:
        with tempfile.TemporaryDirectory() as directory:
            store = SQLiteStore(Path(directory) / "journal.db")
            store.open()
            self.assertIn("gps_points", store.table_names())
            foreign_keys = store.connection.execute("PRAGMA foreign_keys").fetchone()[0]
            self.assertEqual(foreign_keys, 1)
            with self.assertRaises(sqlite3.IntegrityError):
                with store.transaction() as connection:
                    connection.execute("INSERT INTO gps_points(vehicle_id, recorded_at, latitude, longitude) VALUES('missing', '2026-01-01T00:00:00+00:00', 49, 7)")
            store.close()


if __name__ == "__main__":
    unittest.main()
