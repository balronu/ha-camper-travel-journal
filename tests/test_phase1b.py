import asyncio
import json
import sqlite3
import tempfile
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path

from custom_components.camper_travel_journal.collector import GPSCollector
from custom_components.camper_travel_journal.config_flow import defaults, normalize_options, validate_submission
from custom_components.camper_travel_journal.retention import dry_run_report
from custom_components.camper_travel_journal.storage import AsyncSQLiteWorker, SCHEMA_VERSION, SQLiteStore
from custom_components.camper_travel_journal.validation import validate_point

UTC = timezone.utc


def point(at, lon=7.0, vehicle="v1"):
    from custom_components.camper_travel_journal.models import GPSPoint
    return GPSPoint(vehicle, at, 49.0, lon, 5, "home", "gps")


class FakeState:
    domain = "device_tracker"
    attributes = {"latitude": 49.0, "longitude": 7.0}


class FakeStates:
    def get(self, entity_id):
        return FakeState() if entity_id == "device_tracker.camper" else None


class FakeHass:
    states = FakeStates()


class Phase1BTests(unittest.TestCase):
    def test_config_defaults_and_tracker_validation(self):
        values = defaults()
        self.assertFalse(values["recording_enabled"])
        self.assertEqual(values["min_interval"], 30)
        self.assertEqual(values["stop_after"], 10)
        self.assertEqual(validate_submission(FakeHass(), {"tracker_entity": "missing"})["tracker_entity"], "tracker_not_found")
        self.assertEqual(validate_submission(FakeHass(), {"tracker_entity": "device_tracker.camper"}), {})

    def test_carto_secret_is_not_prefilled_and_can_be_changed_or_removed(self):
        current = {"tracker_entity": "device_tracker.camper", "carto_api_key": "old-secret", "map_provider": "carto"}
        kept = normalize_options(current, {"tracker_entity": "device_tracker.camper", "map_provider": "carto", "carto_api_key": ""})
        self.assertEqual(kept["carto_api_key"], "old-secret")
        changed = normalize_options(current, {"tracker_entity": "device_tracker.camper", "map_provider": "carto", "carto_api_key": "new-secret"})
        self.assertEqual(changed["carto_api_key"], "new-secret")
        removed = normalize_options(current, {"tracker_entity": "device_tracker.camper", "map_provider": "none", "carto_api_key": "", "remove_carto_api_key": True})
        self.assertNotIn("carto_api_key", removed)

    def test_translations_are_json_and_aligned(self):
        root = Path(__file__).parents[1]
        translation_dir = root / "custom_components" / "camper_travel_journal" / "translations"
        de = json.loads((translation_dir / "de.json").read_text())
        en = json.loads((translation_dir / "en.json").read_text())
        fields = set(de["config"]["step"]["user"]["data"])
        self.assertEqual(fields, set(de["config"]["step"]["user"]["data"]))
        self.assertEqual(fields, set(en["config"]["step"]["user"]["data"]))
        self.assertEqual(fields, set(de["config"]["step"]["user"]["data_description"]))
        self.assertEqual(fields, set(en["config"]["step"]["user"]["data_description"]))
        self.assertEqual(fields, set(de["options"]["step"]["init"]["data"]))
        self.assertEqual(fields, set(de["options"]["step"]["init"]["data_description"]))
        self.assertEqual(fields, set(en["options"]["step"]["init"]["data"]))
        self.assertEqual(fields, set(en["options"]["step"]["init"]["data_description"]))

    def test_sqlite_write_transaction_and_migration(self):
        with tempfile.TemporaryDirectory() as directory:
            store = SQLiteStore(Path(directory) / "journal.db")
            store.open()
            now = datetime(2026, 1, 1, tzinfo=UTC)
            store.insert_vehicle("v1", "Camper", "device_tracker.camper", now)
            self.assertTrue(store.insert_point(point(now)))
            self.assertFalse(store.insert_point(point(now)))
            with self.assertRaises(sqlite3.IntegrityError):
                with store.transaction() as connection:
                    connection.execute("INSERT INTO gps_points(vehicle_id,recorded_at,latitude,longitude) VALUES('missing','x',1,1)")
            self.assertEqual(store.connection.execute("SELECT value FROM schema_meta WHERE key='version'").fetchone()[0], str(SCHEMA_VERSION))
            self.assertIn("runtime_state", store.table_names())
            store.close()

    def test_async_worker_serializes_and_closes(self):
        async def run():
            with tempfile.TemporaryDirectory() as directory:
                worker = AsyncSQLiteWorker(Path(directory) / "journal.db")
                await worker.async_open()
                now = datetime(2026, 1, 1, tzinfo=UTC)
                await worker.async_insert_vehicle("v1", "Camper", "device_tracker.camper", now)
                await worker.async_insert_point(point(now))
                await worker.async_close()
                with self.assertRaises(RuntimeError):
                    await worker.async_insert_point(point(now + timedelta(seconds=30)))
        asyncio.run(run())

    def test_collector_dry_run_stats_duplicate_jump_gap_and_unknown(self):
        async def run():
            collector = GPSCollector(None, {"v1": {"min_interval": 30, "min_movement": 25, "max_gap": 10}}, dry_run=True)
            start = datetime(2026, 1, 1, tzinfo=UTC)
            await collector.async_process_event("v1", "unknown", {})
            await collector.async_process_event("v1", "home", {"latitude": 49, "longitude": 7, "gps_accuracy": 5, "timestamp": start})
            await collector.async_process_event("v1", "home", {"latitude": 49, "longitude": 7, "gps_accuracy": 5, "timestamp": start + timedelta(seconds=10)})
            await collector.async_process_event("v1", "home", {"latitude": 49, "longitude": 7.002, "gps_accuracy": 5, "timestamp": start + timedelta(seconds=30)})
            await collector.async_process_event("v1", "home", {"latitude": 49, "longitude": 7.004, "gps_accuracy": 5, "timestamp": start + timedelta(seconds=60)})
            await collector.async_process_event("v1", "home", {"latitude": 49, "longitude": 7.003, "gps_accuracy": 5, "timestamp": start + timedelta(minutes=30)})
            await collector.async_process_event("v1", "home", {"latitude": 49, "longitude": 8.5, "gps_accuracy": 5, "timestamp": start + timedelta(minutes=30, seconds=1)})
            self.assertGreaterEqual(collector.stats.received, 6)
            self.assertGreaterEqual(collector.stats.duplicate, 1)
            self.assertGreaterEqual(collector.stats.gps_gaps, 1)
            self.assertGreaterEqual(collector.stats.rejected_jump, 1)
        asyncio.run(run())

    def test_accuracy_zero_is_valid_and_diagnostics_explain_filters(self):
        async def run():
            collector = GPSCollector(None, {"v1": {"min_interval": 30, "min_movement": 25}}, dry_run=True)
            start = datetime(2026, 1, 1, tzinfo=UTC)
            await collector.async_process_event("v1", "home", {"latitude": 49, "longitude": 7, "gps_accuracy": 0, "timestamp": start})
            await collector.async_process_event("v1", "home", {"latitude": 49, "longitude": 7, "gps_accuracy": 0, "timestamp": start + timedelta(seconds=10)})
            report = collector.diagnostics("v1")
            self.assertEqual(report["accepted_points"], 1)
            self.assertEqual(report["discard_reasons"]["time_filter"], 1)
            self.assertEqual(report["last_accepted_point_at"], start.isoformat())
        asyncio.run(run())

    def test_gap_finishes_open_drive_without_airline_distance(self):
        async def run():
            collector = GPSCollector(None, {"v1": {"max_gap": 10}}, dry_run=True)
            start = datetime(2026, 1, 1, tzinfo=UTC)
            for offset, longitude in ((0, 7.0), (30, 7.001), (60, 7.002)):
                await collector.async_process_event("v1", "home", {"latitude": 49, "longitude": longitude, "timestamp": start + timedelta(seconds=offset)})
            await collector.async_process_event("v1", "home", {"latitude": 49, "longitude": 7.003, "timestamp": start + timedelta(minutes=30)})
            report = collector.diagnostics("v1")
            self.assertGreaterEqual(collector.stats.gps_gaps, 1)
            self.assertEqual(collector.stats.stops, 1)
            self.assertLess(collector.stats.distance_m, 200)
            self.assertEqual(report["drive_state"], "gps_gap")
        asyncio.run(run())

    def test_retention_dry_run_does_not_delete(self):
        with tempfile.TemporaryDirectory() as directory:
            store = SQLiteStore(Path(directory) / "journal.db")
            store.open()
            now = datetime(2026, 4, 1, tzinfo=UTC)
            store.insert_vehicle("v1", "Camper", "device_tracker.camper", now)
            store.insert_point(point(now - timedelta(days=91)))
            before = store.connection.execute("SELECT count(*) FROM gps_points").fetchone()[0]
            result = dry_run_report(store, now)
            after = store.connection.execute("SELECT count(*) FROM gps_points").fetchone()[0]
            self.assertTrue(result["dry_run"])
            self.assertEqual(before, after)
            store.close()

    def test_retention_candidates_exclude_assigned_drive_points(self):
        with tempfile.TemporaryDirectory() as directory:
            store = SQLiteStore(Path(directory) / "journal.db")
            store.open()
            now = datetime(2026, 4, 1, tzinfo=UTC)
            old = now - timedelta(days=91)
            store.insert_vehicle("v1", "Camper", "device_tracker.camper", now)
            store.insert_point(point(old))
            store.insert_point(point(old + timedelta(seconds=30), lon=7.001))
            with store.transaction() as connection:
                connection.execute("INSERT INTO trips(id,vehicle_id,title,started_at,status,created_at,updated_at) VALUES('t1','v1','Trip',?,?,?,?)", (old.isoformat(), "active", now.isoformat(), now.isoformat()))
                connection.execute("INSERT INTO drives(id,vehicle_id,started_at,ended_at,distance_m,end_reason,created_at) VALUES('d1','v1',?,?,100,'stop',?)", (old.isoformat(), (old + timedelta(minutes=1)).isoformat(), now.isoformat()))
                connection.execute("INSERT INTO trip_drives(trip_id,drive_id,linked_at) VALUES('t1','d1',?)", (now.isoformat(),))
            self.assertEqual(store.retention_candidates(now), [])
            store.close()

    def test_restart_recovery_replays_tail_and_deduplicates(self):
        async def run():
            with tempfile.TemporaryDirectory() as directory:
                path = Path(directory) / "journal.db"
                worker = AsyncSQLiteWorker(path)
                await worker.async_open()
                start = datetime(2026, 1, 1, tzinfo=UTC)
                await worker.async_insert_vehicle("v1", "Camper", "device_tracker.camper", start)
                first = point(start)
                second = point(start + timedelta(seconds=30), lon=7.002)
                await worker.async_insert_point(first)
                await worker.async_insert_point(second)
                await worker.async_close()
                recovered = AsyncSQLiteWorker(path)
                await recovered.async_open()
                collector = GPSCollector(recovered, {"v1": {}}, dry_run=False)
                rows = await recovered.async_load_recent_points("v1")
                collector.restore_points("v1", rows)
                await collector.async_process_event("v1", "home", {"latitude": 49, "longitude": 7.002, "timestamp": second.recorded_at})
                self.assertEqual(collector.stats.accepted, 0)
                self.assertEqual(collector.stats.invalid, 1)
                self.assertEqual(recovered.store.connection.execute("SELECT count(*) FROM gps_points").fetchone()[0], 2)
                await recovered.async_close()
        asyncio.run(run())

    def test_multiple_vehicles_have_independent_rows(self):
        with tempfile.TemporaryDirectory() as directory:
            store = SQLiteStore(Path(directory) / "journal.db")
            store.open()
            now = datetime(2026, 1, 1, tzinfo=UTC)
            store.insert_vehicle("v1", "One", "device_tracker.one", now)
            store.insert_vehicle("v2", "Two", "device_tracker.two", now)
            store.insert_point(point(now, vehicle="v1"))
            store.insert_point(point(now, vehicle="v2"))
            self.assertEqual(store.connection.execute("SELECT count(DISTINCT vehicle_id) FROM gps_points").fetchone()[0], 2)
            store.close()

    def test_invalid_timestamp_is_counted_without_write(self):
        async def run():
            collector = GPSCollector(None, {"v1": {}}, dry_run=True)
            await collector.async_process_event("v1", "home", {"latitude": 49, "longitude": 7, "timestamp": "not-a-timestamp"})
            self.assertEqual(collector.stats.errors, 1)
            self.assertEqual(collector.stats.accepted, 0)
        asyncio.run(run())

    def test_bad_accuracy_is_rejected(self):
        from custom_components.camper_travel_journal.models import GPSPoint
        self.assertFalse(validate_point(GPSPoint("v1", datetime(2026, 1, 1, tzinfo=UTC), 49, 7, 1001)).accepted)

    def test_corrupt_database_fails_closed_and_retention_values_are_independent(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "broken.db"
            path.write_bytes(b"not a sqlite database")
            with self.assertRaises(sqlite3.DatabaseError):
                SQLiteStore(path).open()
            from custom_components.camper_travel_journal.retention import retention_cutoff
            now = datetime(2026, 4, 1, tzinfo=UTC)
            for days in (30, 90, 180, 365):
                self.assertEqual((now - retention_cutoff(now, False, timedelta(days=days))).days, days)
            self.assertIsNone(retention_cutoff(now, True, timedelta(days=90)))


if __name__ == "__main__":
    unittest.main()
