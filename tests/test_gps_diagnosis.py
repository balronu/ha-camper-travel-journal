"""Isolated GPS duplicate and stop-detection diagnosis tests."""

from __future__ import annotations

import asyncio
import tempfile
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path

from custom_components.camper_travel_journal.collector import GPSCollector
from custom_components.camper_travel_journal.detector import DetectorConfig, DriveDetector
from custom_components.camper_travel_journal.models import Drive, GPSPoint
from custom_components.camper_travel_journal.runtime import Runtime
from custom_components.camper_travel_journal.storage import AsyncSQLiteWorker, SQLiteStore

UTC = timezone.utc


def gps(at: datetime, longitude: float = 7.0) -> GPSPoint:
    return GPSPoint("v1", at, 49.0, longitude, accuracy_m=5, source_state="home", source_type="gps")


def tracker_event(at: datetime, longitude: float = 7.0) -> dict:
    return {"latitude": 49.0, "longitude": longitude, "gps_accuracy": 5, "timestamp": at}


class GPSDiagnosisTests(unittest.TestCase):
    def test_stationary_timeout_creates_one_pending_suggestion_from_filtered_reports(self):
        async def run():
            with tempfile.TemporaryDirectory() as directory:
                worker = AsyncSQLiteWorker(Path(directory) / "journal.db")
                await worker.async_open()
                start = datetime(2026, 10, 23, 14, tzinfo=UTC)
                await worker.async_insert_vehicle("v1", "Camper", "device_tracker.camper", start)
                collector = GPSCollector(worker, {"v1": {"max_gap": 10, "stop_after": 10, "min_interval": 30, "min_movement": 25}})
                moving = [(0, 7.0), (30, 7.001), (60, 7.002)]
                stationary = [(90 + offset, 7.002) for offset in range(0, 601, 30)]
                for seconds, longitude in moving + stationary:
                    await collector.async_process_event("v1", "home", tracker_event(start + timedelta(seconds=seconds), longitude))
                suggestions = await worker.async_call("list_stop_suggestions", "v1")
                self.assertEqual(len(suggestions), 1)
                self.assertEqual(suggestions[0]["status"], "pending")
                self.assertEqual(suggestions[0]["source"], "stationary_timeout")
                self.assertEqual(suggestions[0]["arrived_at"], (start + timedelta(seconds=60)).isoformat())
                self.assertEqual(collector.stats.stop_suggestions_generated, 1)
                counts = await worker.async_call("diagnostic_counts", "v1")
                self.assertEqual(counts["stop_suggestions_open"], 1)
                await worker.async_close()
        asyncio.run(run())

    def test_stationary_timeout_suggestion_inherits_active_trip_and_is_idempotent(self):
        async def run():
            with tempfile.TemporaryDirectory() as directory:
                worker = AsyncSQLiteWorker(Path(directory) / "journal.db")
                await worker.async_open()
                start = datetime(2026, 10, 23, 14, tzinfo=UTC)
                await worker.async_insert_vehicle("v1", "Camper", "device_tracker.camper", start)
                trip_id = await worker.async_call("create_trip", "v1", "Active", start, start, status="active")
                drive_id = await worker.async_insert_drive(Drive("d1", "v1", start, start + timedelta(minutes=10), 100, "stationary_timeout"))
                self.assertEqual(await worker.async_call("auto_assign_drive", "v1", drive_id, start), trip_id)
                first = await worker.async_call("create_stationary_stop_suggestion", "v1", drive_id, start, start + timedelta(minutes=10), 49.0, 7.0, start)
                second = await worker.async_call("create_stationary_stop_suggestion", "v1", drive_id, start, start + timedelta(minutes=10), 49.0, 7.0, start)
                self.assertIsNotNone(first)
                self.assertIsNone(second)
                self.assertEqual(first["trip_id"], trip_id)
                await worker.async_close()
        asyncio.run(run())

    def test_stationary_timeout_keeps_departure_unknown_until_movement(self):
        async def run():
            with tempfile.TemporaryDirectory() as directory:
                worker = AsyncSQLiteWorker(Path(directory) / "journal.db")
                await worker.async_open()
                start = datetime(2026, 10, 23, 14, tzinfo=UTC)
                await worker.async_insert_vehicle("v1", "Camper", "device_tracker.camper", start)
                drive_id = await worker.async_insert_drive(Drive("d1", "v1", start, start + timedelta(minutes=10), 100, "stationary_timeout"))
                suggestion = await worker.async_call(
                    "create_stationary_stop_suggestion", "v1", drive_id, start, None, 49.0, 7.0, start
                )
                self.assertIsNone(suggestion["departed_at"])
                await worker.async_close_open_stops("v1", start + timedelta(hours=1), start + timedelta(hours=1))
                self.assertEqual(await worker.async_call("list_stops", "v1"), [])
                stop_id = await worker.async_call("accept_stop_suggestion", suggestion["id"], start, name="Ziel")
                stop = (await worker.async_call("list_stops", "v1"))[0]
                self.assertEqual(stop["id"], stop_id)
                self.assertIsNone(stop["departed_at"])
                await worker.async_close_open_stops("v1", start + timedelta(hours=1), start + timedelta(hours=1))
                stop = (await worker.async_call("list_stops", "v1"))[0]
                self.assertEqual(stop["departed_at"], (start + timedelta(hours=1)).isoformat())
                await worker.async_close()

        asyncio.run(run())

    def test_normal_drive_finishes_after_stationary_update(self):
        detector = DriveDetector("v1", DetectorConfig(stop_after=timedelta(minutes=5)))
        start = datetime(2026, 10, 23, 14, tzinfo=UTC)
        detector.ingest(gps(start))
        detector.ingest(gps(start + timedelta(seconds=30), 7.001))
        self.assertTrue(any(event.kind == "drive_started" for event in detector.ingest(gps(start + timedelta(seconds=60), 7.002))))
        finished = detector.ingest(gps(start + timedelta(minutes=6), 7.002))
        self.assertEqual([event.kind for event in finished], ["drive_finished"])
        self.assertEqual(finished[0].drive.end_reason, "stationary_timeout")

    def test_no_followup_gps_message_cannot_prove_stationary_stop(self):
        detector = DriveDetector("v1", DetectorConfig(stop_after=timedelta(minutes=5)))
        start = datetime(2026, 10, 23, 14, tzinfo=UTC)
        detector.ingest(gps(start))
        detector.ingest(gps(start + timedelta(seconds=30), 7.001))
        detector.ingest(gps(start + timedelta(seconds=60), 7.002))
        self.assertEqual(detector.state.value, "driving")
        # The live runtime has no end-of-stream callback; without another
        # tracker point, ``ingest`` has not reached the stationary timeout.
        self.assertEqual(detector.state.value, "driving")

    def test_identical_state_changed_and_state_reported_events_store_one_point(self):
        async def run():
            collector = GPSCollector(None, {"v1": {"min_interval": 30, "min_movement": 25}}, dry_run=True)
            runtime = Runtime.__new__(Runtime)
            runtime.collector = collector
            runtime.vehicle_id = "v1"
            at = datetime(2026, 10, 23, 14, tzinfo=UTC)
            event = type("Event", (), {"data": {"new_state": type("State", (), {"state": "home", "attributes": tracker_event(at)})(), "last_reported": at}})()
            await runtime._async_state_event(event)
            await runtime._async_state_reported_event(event)
            self.assertEqual(collector.stats.accepted, 1)
            self.assertEqual(collector.stats.invalid, 1)
            self.assertEqual(collector.stats.reasons["timestamp_not_increasing"], 1)

        asyncio.run(run())

    def test_reload_like_second_detector_reuses_existing_live_drive(self):
        async def run():
            with tempfile.TemporaryDirectory() as directory:
                worker = AsyncSQLiteWorker(Path(directory) / "journal.db")
                await worker.async_open()
                start = datetime(2026, 10, 23, 14, tzinfo=UTC)
                await worker.async_insert_vehicle("v1", "Camper", "device_tracker.camper", start)
                points = [
                    (start, 7.0),
                    (start + timedelta(seconds=30), 7.001),
                    (start + timedelta(seconds=60), 7.002),
                    (start + timedelta(minutes=6), 7.002),
                ]
                for _ in range(2):
                    collector = GPSCollector(worker, {"v1": {"max_gap": 10, "stop_after": 5}}, dry_run=False)
                    for at, longitude in points:
                        await collector.async_process_event("v1", "home", tracker_event(at, longitude))
                rows = worker.store.connection.execute("SELECT id,started_at,ended_at FROM drives WHERE vehicle_id='v1'").fetchall()
                self.assertEqual(len(rows), 1)
                self.assertEqual(rows[0][1:], ((start + timedelta(seconds=30)).isoformat(), (start + timedelta(minutes=6)).isoformat()))
                await worker.async_close()

        asyncio.run(run())

    def test_same_interval_different_ids_is_not_a_database_unique_constraint(self):
        with tempfile.TemporaryDirectory() as directory:
            store = SQLiteStore(Path(directory) / "journal.db")
            store.open()
            now = datetime(2026, 10, 23, 14, tzinfo=UTC)
            store.insert_vehicle("v1", "Camper", "device_tracker.camper", now)
            first = Drive("d1", "v1", now, now + timedelta(hours=2), 162200, "stationary_timeout")
            second = Drive("d2", "v1", now, now + timedelta(hours=2), 162000, "stationary_timeout")
            self.assertEqual(store.insert_drive(first), "d1")
            self.assertEqual(store.insert_drive(second), "d1")
            self.assertEqual(store.connection.execute("SELECT count(*) FROM drives").fetchone()[0], 1)
            store.close()

    def test_manual_gps_drive_delete_keeps_points_and_blocks_replay(self):
        with tempfile.TemporaryDirectory() as directory:
            store = SQLiteStore(Path(directory) / "journal.db")
            store.open()
            start = datetime(2026, 10, 23, 14, tzinfo=UTC)
            store.insert_vehicle("v1", "Camper", "device_tracker.camper", start)
            for offset, longitude in ((0, 7.0), (60, 7.001), (120, 7.002)):
                store.insert_point(gps(start + timedelta(seconds=offset), longitude))
            first = Drive("deleted", "v1", start, start + timedelta(minutes=2), 162200, "stationary_timeout")
            second = Drive("kept", "v1", start + timedelta(hours=1), start + timedelta(hours=2), 1000, "stationary_timeout")
            store.insert_drive(first)
            store.insert_drive(second)
            store.associate_drive_points("deleted", "v1", start, start + timedelta(minutes=2), "live_detector")
            store.delete_drive("deleted", "v1", start + timedelta(hours=3))
            self.assertEqual(store.connection.execute("SELECT count(*) FROM gps_points").fetchone()[0], 3)
            self.assertEqual(store.connection.execute("SELECT count(*) FROM drives").fetchone()[0], 1)
            self.assertIsNone(store.insert_drive(Drive("replay", "v1", start, start + timedelta(minutes=2), 162200, "stationary_timeout")))
            self.assertIsNone(store.insert_drive(Drive("replay-shortened", "v1", start, start + timedelta(seconds=120), 162200, "stationary_timeout")))
            self.assertEqual(store.connection.execute("SELECT count(*) FROM drives").fetchone()[0], 1)
            with self.assertRaisesRegex(ValueError, "drive_not_found"):
                store.delete_drive("deleted", "v1", start)
            with self.assertRaisesRegex(ValueError, "drive_not_found"):
                store.delete_drive("missing", "v1", start)
            store.close()

    def test_new_drive_with_new_point_is_not_blocked_by_deleted_fingerprint(self):
        with tempfile.TemporaryDirectory() as directory:
            store = SQLiteStore(Path(directory) / "journal.db")
            store.open()
            start = datetime(2026, 10, 23, 14, tzinfo=UTC)
            store.insert_vehicle("v1", "Camper", "device_tracker.camper", start)
            for offset, longitude in ((0, 7.0), (60, 7.001)):
                store.insert_point(gps(start + timedelta(seconds=offset), longitude))
            store.insert_drive(Drive("old", "v1", start, start + timedelta(minutes=1), 1000, "stationary_timeout"))
            store.delete_drive("old", "v1", start + timedelta(hours=1))
            store.insert_point(gps(start + timedelta(minutes=2), 7.002))
            self.assertEqual(store.insert_drive(Drive("new", "v1", start, start + timedelta(minutes=2), 2000, "stationary_timeout")), "new")
            store.close()

    def test_zero_duration_retrospective_suggestion_is_ignored(self):
        with tempfile.TemporaryDirectory() as directory:
            store = SQLiteStore(Path(directory) / "journal.db")
            store.open()
            now = datetime(2026, 10, 23, 14, tzinfo=UTC)
            store.insert_vehicle("v1", "Camper", "device_tracker.camper", now)
            for longitude in (7.0, 7.0001):
                store.connection.execute("INSERT INTO gps_points(vehicle_id,recorded_at,latitude,longitude) VALUES(?,?,?,?)", ("v1", now.isoformat(), 49.0, longitude))
            store.connection.commit()
            self.assertEqual(store.generate_stop_suggestions("v1", now), [])
            store.close()

    def test_schema_identity_migration_preserves_legacy_duplicates_and_selects_canonical(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "journal.db"
            store = SQLiteStore(path)
            store.open()
            now = datetime(2026, 10, 23, 14, tzinfo=UTC)
            store.insert_vehicle("v1", "Camper", "device_tracker.camper", now)
            store.connection.execute(
                "INSERT INTO drives(id,vehicle_id,started_at,ended_at,distance_m, end_reason, source, created_at) VALUES(?,?,?,?,?,?,?,?)",
                ("legacy-b", "v1", now.isoformat(), (now + timedelta(hours=2)).isoformat(), 1, "stationary_timeout", "gps", "2026-10-23T14:01:00+00:00"),
            )
            store.connection.execute(
                "INSERT INTO drives(id,vehicle_id,started_at,ended_at,distance_m, end_reason, source, created_at) VALUES(?,?,?,?,?,?,?,?)",
                ("legacy-a", "v1", now.isoformat(), (now + timedelta(hours=2)).isoformat(), 1, "stationary_timeout", "gps", "2026-10-23T14:01:00+00:00"),
            )
            store.connection.execute("UPDATE schema_meta SET value='12' WHERE key='version'")
            store.connection.commit()
            store.close()
            reopened = SQLiteStore(path)
            reopened.open()
            self.assertEqual(reopened.connection.execute("SELECT count(*) FROM drives").fetchone()[0], 2)
            self.assertEqual(reopened.connection.execute("SELECT drive_id FROM drive_identities").fetchone()[0], "legacy-a")
            self.assertEqual(
                reopened.insert_drive(Drive("new", "v1", now, now + timedelta(hours=2), 2, "stationary_timeout")),
                "legacy-a",
            )
            reopened.close()

    def test_minimal_start_or_end_difference_remains_a_separate_gps_drive(self):
        with tempfile.TemporaryDirectory() as directory:
            store = SQLiteStore(Path(directory) / "journal.db")
            store.open()
            now = datetime(2026, 10, 23, 14, tzinfo=UTC)
            store.insert_vehicle("v1", "Camper", "device_tracker.camper", now)
            first = Drive("d1", "v1", now, now + timedelta(hours=2), 162200, "stationary_timeout")
            shifted = Drive("d2", "v1", now + timedelta(seconds=1), now + timedelta(hours=2), 162200, "stationary_timeout")
            shortened = Drive("d3", "v1", now, now + timedelta(hours=2, seconds=-1), 162200, "stationary_timeout")
            self.assertEqual(store.insert_drive(first), "d1")
            self.assertEqual(store.insert_drive(shifted), "d2")
            self.assertEqual(store.insert_drive(shortened), "d3")
            self.assertEqual(store.connection.execute("SELECT count(*) FROM drives WHERE source='gps'").fetchone()[0], 3)
            store.close()

    def test_overlapping_gps_intervals_are_not_merged(self):
        with tempfile.TemporaryDirectory() as directory:
            store = SQLiteStore(Path(directory) / "journal.db")
            store.open()
            now = datetime(2026, 10, 23, 14, tzinfo=UTC)
            store.insert_vehicle("v1", "Camper", "device_tracker.camper", now)
            first = Drive("d1", "v1", now, now + timedelta(hours=2), 162200, "stationary_timeout")
            overlap = Drive("d2", "v1", now + timedelta(minutes=1), now + timedelta(hours=2, minutes=1), 162000, "stationary_timeout")
            self.assertEqual(store.insert_drive(first), "d1")
            self.assertEqual(store.insert_drive(overlap), "d2")
            self.assertEqual(store.connection.execute("SELECT count(*) FROM drives WHERE source='gps'").fetchone()[0], 2)
            store.close()

    def test_different_vehicles_have_independent_idempotency_keys(self):
        with tempfile.TemporaryDirectory() as directory:
            store = SQLiteStore(Path(directory) / "journal.db")
            store.open()
            now = datetime(2026, 10, 23, 14, tzinfo=UTC)
            store.insert_vehicle("v1", "Camper 1", "device_tracker.camper_1", now)
            store.insert_vehicle("v2", "Camper 2", "device_tracker.camper_2", now)
            first = Drive("d1", "v1", now, now + timedelta(hours=2), 162200, "stationary_timeout")
            other = Drive("d2", "v2", now, now + timedelta(hours=2), 162200, "stationary_timeout")
            self.assertEqual(store.insert_drive(first), "d1")
            self.assertEqual(store.insert_drive(other), "d2")
            self.assertEqual(store.connection.execute("SELECT count(*) FROM drives WHERE source='gps'").fetchone()[0], 2)
            store.close()

    def test_manual_and_gpx_drives_are_not_deduplicated_by_gps_key(self):
        with tempfile.TemporaryDirectory() as directory:
            store = SQLiteStore(Path(directory) / "journal.db")
            store.open()
            now = datetime(2026, 10, 23, 14, tzinfo=UTC)
            store.insert_vehicle("v1", "Camper", "device_tracker.camper", now)
            manual = Drive("manual", "v1", now, now + timedelta(hours=2), 162200, "manual", source="manual")
            gpx = Drive("gpx", "v1", now, now + timedelta(hours=2), 162200, "track_end", source="gpx")
            self.assertEqual(store.insert_drive(manual), "manual")
            self.assertEqual(store.insert_drive(gpx), "gpx")
            self.assertEqual(store.connection.execute("SELECT count(*) FROM drives").fetchone()[0], 2)
            store.close()

    def test_diagnostics_exposes_safe_lifecycle_fields_without_coordinates(self):
        collector = GPSCollector(None, {"v1": {"stop_after": 5, "max_gap": 7}}, dry_run=True)
        at = datetime(2026, 10, 23, 14, tzinfo=UTC)
        asyncio.run(collector.async_process_event("v1", "home", tracker_event(at)))
        report = collector.diagnostics("v1", at + timedelta(minutes=2))
        self.assertEqual(report["last_valid_tracker_event_at"], at.isoformat())
        self.assertEqual(report["last_valid_gps_report_at"], at.isoformat())
        self.assertEqual(report["seconds_since_last_valid_tracker_event"], 120.0)
        self.assertEqual(report["configured_stop_after_seconds"], 300.0)
        self.assertEqual(report["configured_max_gap_seconds"], 420.0)
        self.assertIn("discard_reasons", report)
        self.assertIn("discarded_gps_messages_by_cause", report)
        self.assertNotIn("latitude", report)
        self.assertNotIn("longitude", report)

    def test_repeated_drive_list_queries_are_read_only_and_stable(self):
        with tempfile.TemporaryDirectory() as directory:
            store = SQLiteStore(Path(directory) / "journal.db")
            store.open()
            now = datetime(2026, 10, 23, 14, tzinfo=UTC)
            store.insert_vehicle("v1", "Camper", "device_tracker.camper", now)
            store.insert_drive(Drive("d1", "v1", now, now + timedelta(hours=2), 162200, "stationary_timeout"))
            self.assertEqual([row["id"] for row in store.list_drives("v1")], ["d1"])
            self.assertEqual([row["id"] for row in store.list_drives("v1")], ["d1"])
            store.close()

    def test_stop_suggestions_need_contiguous_stationary_samples_and_are_pending(self):
        with tempfile.TemporaryDirectory() as directory:
            store = SQLiteStore(Path(directory) / "journal.db")
            store.open()
            start = datetime(2026, 10, 23, 14, tzinfo=UTC)
            store.insert_vehicle("v1", "Camper", "device_tracker.camper", start)
            drive_id = store.insert_drive(Drive("d1", "v1", start, start + timedelta(minutes=10), 100, "stationary_timeout"))
            for minutes in (0, 5, 10):
                store.insert_point(gps(start + timedelta(minutes=minutes)))
            store.associate_drive_points(drive_id, "v1", start, start + timedelta(minutes=10), "interval_reconstructed")
            suggestions = store.generate_stop_suggestions("v1", start)
            self.assertEqual(len(suggestions), 1)
            self.assertEqual(suggestions[0]["status"], "pending")
            self.assertEqual(store.list_stops("v1"), [])
            store.close()

    def test_gap_does_not_create_stationary_stop_suggestion(self):
        with tempfile.TemporaryDirectory() as directory:
            store = SQLiteStore(Path(directory) / "journal.db")
            store.open()
            start = datetime(2026, 10, 23, 14, tzinfo=UTC)
            store.insert_vehicle("v1", "Camper", "device_tracker.camper", start)
            for at, longitude in ((start, 7.0), (start + timedelta(minutes=20), 7.0)):
                store.connection.execute(
                    "INSERT INTO gps_points(vehicle_id,recorded_at,latitude,longitude) VALUES(?,?,?,?)",
                    ("v1", at.isoformat(), 49.0, longitude),
                )
            store.connection.commit()
            self.assertEqual(store.generate_stop_suggestions("v1", start), [])
            store.close()

    def test_trip_scoped_suggestion_does_not_require_active_trip(self):
        with tempfile.TemporaryDirectory() as directory:
            store = SQLiteStore(Path(directory) / "journal.db")
            store.open()
            start = datetime(2026, 10, 23, 14, tzinfo=UTC)
            store.insert_vehicle("v1", "Camper", "device_tracker.camper", start)
            trip_id = store.create_trip("v1", "Pausierte Reise", start, start, status="paused")
            drive_id = store.insert_drive(Drive("d1", "v1", start, start + timedelta(minutes=10), 100, "stationary_timeout"))
            for minutes in (0, 5, 10):
                store.insert_point(gps(start + timedelta(minutes=minutes)))
            store.associate_drive_points(drive_id, "v1", start, start + timedelta(minutes=10), "live_detector")
            store.link_drives(trip_id, [drive_id], start)
            suggestions = store.generate_stop_suggestions("v1", start, trip_id=trip_id)
            self.assertEqual(len(suggestions), 1)
            self.assertEqual(suggestions[0]["trip_id"], trip_id)
            store.close()

    def test_historical_recalculation_requires_stationary_timeout_and_is_idempotent_after_dismissal(self):
        with tempfile.TemporaryDirectory() as directory:
            store = SQLiteStore(Path(directory) / "journal.db")
            store.open()
            start = datetime(2026, 10, 23, 14, tzinfo=UTC)
            store.insert_vehicle("v1", "Camper", "device_tracker.camper", start)
            trip_id = store.create_trip("v1", "Historisch", start, start, status="paused")
            drive_id = store.insert_drive(Drive("d1", "v1", start, start + timedelta(minutes=10), 100, "stationary_timeout"))
            for minutes in (0, 5, 10):
                store.insert_point(gps(start + timedelta(minutes=minutes)))
            store.associate_drive_points(drive_id, "v1", start, start + timedelta(minutes=10), "interval_reconstructed")
            store.link_drives(trip_id, [drive_id], start)
            first = store.generate_stop_suggestions("v1", start, trip_id=trip_id, historical_only=True)
            self.assertEqual(len(first), 1)
            store.dismiss_stop_suggestion(first[0]["id"], start)
            self.assertEqual(store.generate_stop_suggestions("v1", start, trip_id=trip_id, historical_only=True), [])
            self.assertEqual(store.connection.execute("SELECT count(*) FROM gps_points").fetchone()[0], 3)
            store.close()


if __name__ == "__main__":
    unittest.main()
