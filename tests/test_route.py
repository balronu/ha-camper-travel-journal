import unittest
from datetime import datetime, timedelta, timezone
from tempfile import TemporaryDirectory

from custom_components.camper_travel_journal.gpx_import import analyze_gpx
from custom_components.camper_travel_journal.storage import SQLiteStore


class RoutePersistenceTests(unittest.TestCase):
    def test_gpx_import_persists_exact_point_membership(self):
        data = b'''<gpx version="1.1" xmlns="http://www.topografix.com/GPX/1/1"><trk><trkseg>
        <trkpt lat="49.0" lon="7.0"><time>2026-10-13T08:00:00Z</time></trkpt>
        <trkpt lat="49.01" lon="7.0"><time>2026-10-13T08:05:00Z</time></trkpt>
        <trkpt lat="49.02" lon="7.0"><time>2026-10-13T08:10:00Z</time></trkpt>
        </trkseg></trk></gpx>'''
        preview = analyze_gpx(data, "v1")
        with TemporaryDirectory() as directory:
            store = SQLiteStore(f"{directory}/journal.db")
            store.open()
            now = datetime(2026, 10, 15, tzinfo=timezone.utc)
            store.insert_vehicle("v1", "Camper", "device_tracker.v1", now)
            store.import_gpx("v1", preview, None, now)
            segments = store.route_segments("v1")
            self.assertEqual(len(segments), 1)
            self.assertEqual(len(segments[0]["points"]), len(preview.points))
            self.assertEqual(segments[0]["association_sources"], ["gpx_exact"])
            store.close()

    def test_reconstruction_marks_overlapping_intervals_ambiguous(self):
        with TemporaryDirectory() as directory:
            store = SQLiteStore(f"{directory}/journal.db")
            store.open()
            now = datetime(2026, 1, 1, tzinfo=timezone.utc)
            store.insert_vehicle("v1", "Camper", "device_tracker.v1", now)
            for offset in (0, 30, 60):
                store.connection.execute(
                    "INSERT INTO gps_points(vehicle_id,recorded_at,latitude,longitude) VALUES(?,?,?,?)",
                    ("v1", (now + timedelta(seconds=offset)).isoformat(), 49.0, 7.0 + offset / 10000),
                )
            store.connection.execute(
                "INSERT INTO drives(id,vehicle_id,started_at,ended_at,distance_m,end_reason,created_at) VALUES(?,?,?,?,?,?,?)",
                ("d1", "v1", now.isoformat(), (now + timedelta(seconds=60)).isoformat(), 100, "test", now.isoformat()),
            )
            store.connection.execute(
                "INSERT INTO drives(id,vehicle_id,started_at,ended_at,distance_m,end_reason,created_at) VALUES(?,?,?,?,?,?,?)",
                ("d2", "v1", (now + timedelta(seconds=30)).isoformat(), (now + timedelta(seconds=90)).isoformat(), 100, "test", now.isoformat()),
            )
            store.connection.commit()
            result = store.reconstruct_drive_point_membership("v1")
            self.assertEqual(result["ambiguous_drives"], 2)
            self.assertEqual(store.connection.execute("SELECT count(*) FROM drive_gps_points").fetchone()[0], 0)
            store.close()
