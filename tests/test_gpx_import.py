import unittest
from datetime import timezone
from tempfile import TemporaryDirectory

from custom_components.camper_travel_journal.gpx_import import analyze_gpx
from custom_components.camper_travel_journal.storage import SQLiteStore


GPX = b'''<?xml version="1.0"?><gpx version="1.1" creator="test" xmlns="http://www.topografix.com/GPX/1/1"><trk><trkseg>
<trkpt lat="49.0000" lon="7.0000"><time>2026-10-13T08:00:00+02:00</time></trkpt>
<trkpt lat="49.0100" lon="7.0000"><time>2026-10-13T08:05:00+02:00</time></trkpt>
<trkpt lat="49.0200" lon="7.0000"><time>2026-10-13T08:10:00+02:00</time></trkpt>
</trkseg></trk><trk><trkseg><trkpt lat="49.0200" lon="7.0000"><time>2026-10-13T08:10:00+02:00</time></trkpt></trkseg></trk></gpx>'''


class GPXImportTests(unittest.TestCase):
    def test_parse_tracks_segments_and_normalize_utc_without_writing(self):
        preview = analyze_gpx(GPX, "vehicle-1")
        self.assertEqual(len(preview.points), 3)
        self.assertEqual(preview.points[0].point.recorded_at.tzinfo, timezone.utc)
        self.assertIn("gpx_duplicate_point", preview.warnings)
        self.assertTrue(preview.drives)

    def test_valid_cdata_description_is_accepted(self):
        data = b'''<gpx version="1.1" xmlns="http://www.topografix.com/GPX/1/1"><trk><trkseg><trkpt lat="49" lon="7"><time>2026-10-13T08:00:00Z</time><desc><![CDATA[PAJ description with <b>markup</b>]]></desc></trkpt></trkseg></trk></gpx>'''
        self.assertEqual(len(analyze_gpx(data, "v").points), 1)

    def test_rejects_dtd_and_bad_coordinates(self):
        with self.assertRaisesRegex(ValueError, "gpx_dtd_forbidden"):
            analyze_gpx(b'<!DOCTYPE gpx [<!ENTITY x "x">]><gpx version="1.1"/>', "v")
        bad = GPX.replace(b'lat="49.0000"', b'lat="190"')
        preview = analyze_gpx(bad, "v")
        self.assertTrue(any("gpx_coordinate_invalid" in item for item in preview.warnings))
        with self.assertRaisesRegex(ValueError, "gpx_file_too_large"):
            analyze_gpx(b"x" * (10 * 1024 * 1024 + 1), "v")
        with self.assertRaisesRegex(ValueError, "gpx_version_unsupported"):
            analyze_gpx(b'<gpx version="1.0"/>', "v")
        with self.assertRaisesRegex(ValueError, "gpx_track_missing"):
            analyze_gpx(b'<gpx version="1.1"/>', "v")

    def test_import_is_idempotent_and_transactional(self):
        preview = analyze_gpx(GPX, "v")
        with TemporaryDirectory() as directory:
            store = SQLiteStore(f"{directory}/journal.db")
            store.open()
            from datetime import datetime
            now = datetime(2026, 10, 15, tzinfo=timezone.utc)
            store.insert_vehicle("v", "Camper", "device_tracker.v", now)
            first = store.import_gpx("v", preview, None, now)
            self.assertEqual(first["points_imported"], 3)
            self.assertIsNone(first["trip_id"])
            self.assertEqual(store.list_drives("v")[0]["assignment_status"], "unassigned")
            with self.assertRaisesRegex(ValueError, "gpx_already_imported"):
                store.import_gpx("v", preview, None, now)
            self.assertEqual(store.diagnostic_counts("v")["gps_points"], 3)
            store.close()

    def test_import_explicitly_assigns_selected_trip(self):
        preview = analyze_gpx(GPX, "v")
        with TemporaryDirectory() as directory:
            store = SQLiteStore(f"{directory}/journal.db")
            store.open()
            from datetime import datetime
            now = datetime(2026, 10, 15, tzinfo=timezone.utc)
            store.insert_vehicle("v", "Camper", "device_tracker.v", now)
            trip = store.create_trip("v", "Länderspiel", now, now, status="active", start_date="2026-10-13", end_date="2026-10-14")
            result = store.import_gpx("v", preview, trip, now)
            self.assertEqual(result["trip_id"], trip)
            self.assertEqual(store.connection.execute("SELECT count(*) FROM trip_drives WHERE trip_id=?", (trip,)).fetchone()[0], 1)
            self.assertEqual(store.connection.execute("SELECT count(*) FROM gps_points WHERE vehicle_id=?", ("v",)).fetchone()[0], 3)
            store.close()

    def test_import_rejects_trip_from_another_vehicle_without_writes(self):
        preview = analyze_gpx(GPX, "v")
        with TemporaryDirectory() as directory:
            store = SQLiteStore(f"{directory}/journal.db")
            store.open()
            from datetime import datetime
            now = datetime(2026, 10, 15, tzinfo=timezone.utc)
            store.insert_vehicle("v", "Camper", "device_tracker.v", now)
            store.insert_vehicle("other", "Other", "device_tracker.other", now)
            trip = store.create_trip("other", "Andere Reise", now, now)
            with self.assertRaisesRegex(ValueError, "vehicle_mismatch"):
                store.import_gpx("v", preview, trip, now)
            self.assertIsNone(store.connection.execute("SELECT 1 FROM gpx_imports").fetchone())
            self.assertEqual(store.connection.execute("SELECT count(*) FROM gps_points").fetchone()[0], 0)
            store.close()

    def test_conflicts_report_duplicate_points_and_overlapping_drives(self):
        preview = analyze_gpx(GPX, "v")
        with TemporaryDirectory() as directory:
            store = SQLiteStore(f"{directory}/journal.db")
            store.open()
            from datetime import datetime
            now = datetime(2026, 10, 15, tzinfo=timezone.utc)
            store.insert_vehicle("v", "Camper", "device_tracker.v", now)
            result = store.gpx_conflicts("v", preview)
            self.assertFalse(result["duplicate_file"])
            self.assertEqual(result["duplicate_points"], 0)
            self.assertEqual(result["overlapping_drives"], 0)
            store.close()

    def test_failed_target_assignment_rolls_back_import_metadata_and_points(self):
        preview = analyze_gpx(GPX, "v")
        with TemporaryDirectory() as directory:
            store = SQLiteStore(f"{directory}/journal.db")
            store.open()
            from datetime import datetime
            now = datetime(2026, 10, 15, tzinfo=timezone.utc)
            store.insert_vehicle("v", "Camper", "device_tracker.v", now)
            with self.assertRaisesRegex(ValueError, "trip_not_found"):
                store.import_gpx("v", preview, "missing-trip", now)
            self.assertEqual(store.diagnostic_counts("v")["gps_points"], 0)
            self.assertIsNone(store.connection.execute("SELECT 1 FROM gpx_imports").fetchone())
            store.close()

    def test_overlapping_drive_is_rejected_without_overwriting_existing_data(self):
        preview = analyze_gpx(GPX, "v")
        with TemporaryDirectory() as directory:
            store = SQLiteStore(f"{directory}/journal.db")
            store.open()
            from datetime import datetime
            now = datetime(2026, 10, 15, tzinfo=timezone.utc)
            store.insert_vehicle("v", "Camper", "device_tracker.v", now)
            store.connection.execute("INSERT INTO drives(id,vehicle_id,started_at,ended_at,distance_m,end_reason,created_at) VALUES(?,?,?,?,?,?,?)", ("existing", "v", "2026-10-13T05:00:00+00:00", "2026-10-13T07:00:00+00:00", 1, "manual", now.isoformat()))
            store.connection.commit()
            with self.assertRaisesRegex(ValueError, "gpx_overlap_conflict"):
                store.import_gpx("v", preview, None, now)
            self.assertEqual(store.connection.execute("SELECT count(*) FROM gpx_imports").fetchone()[0], 0)
            self.assertEqual(store.connection.execute("SELECT count(*) FROM drives").fetchone()[0], 1)
            store.close()
