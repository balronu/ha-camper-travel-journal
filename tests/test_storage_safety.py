import sqlite3
import tempfile
import unittest
from datetime import datetime, timezone
from pathlib import Path
from unittest.mock import patch

from custom_components.camper_travel_journal.backup import (
    backup_database,
    restore_database,
    validate_database,
)
from custom_components.camper_travel_journal.storage import SCHEMA_VERSION, SQLiteStore


UTC = timezone.utc


class StorageSafetyTests(unittest.TestCase):
    def setUp(self):
        self.directory = tempfile.TemporaryDirectory()
        self.path = Path(self.directory.name) / "journal.db"
        self.store = SQLiteStore(self.path)
        self.store.open()
        now = datetime(2026, 10, 26, 9, tzinfo=UTC)
        self.store.insert_vehicle("v1", "Camper", "device_tracker.camper", now)
        self.store.create_trip("v1", "Sicherheitstest", now, now)
        with self.store.transaction() as connection:
            connection.execute(
                "INSERT INTO gps_points(vehicle_id,recorded_at,latitude,longitude,source_type) "
                "VALUES(?,?,?,?,?)",
                ("v1", now.isoformat(), 51.0, 7.0, "test"),
            )

    def tearDown(self):
        self.store.close()
        self.directory.cleanup()

    def _snapshot(self):
        connection = self.store.connection
        schema = tuple(
            connection.execute(
                "SELECT type,name,sql FROM sqlite_master "
                "WHERE name NOT LIKE 'sqlite_%' ORDER BY type,name"
            ).fetchall()
        )
        rows = tuple(
            (table, tuple(connection.execute(f"SELECT * FROM \"{table}\" ORDER BY rowid").fetchall()))
            for table in sorted(self.store.table_names())
            if table != "schema_meta"
        )
        version = connection.execute("SELECT value FROM schema_meta WHERE key='version'").fetchone()[0]
        return schema, rows, version

    def test_interrupted_script_migration_is_atomic_and_can_resume(self):
        with self.store.transaction() as connection:
            connection.execute("UPDATE schema_meta SET value='5' WHERE key='version'")
            connection.execute("DROP TABLE gpx_import_drives")
            connection.execute("DROP TABLE gpx_import_points")
            connection.execute("DROP TABLE gpx_imports")
        self.store.close()

        original = SQLiteStore._execute_migration_script

        def interrupted(store, script):
            first = next(statement for statement in script.split(";") if statement.strip()) + ";"
            store.connection.execute(first)
            raise RuntimeError("synthetic_migration_interrupt")

        with patch.object(SQLiteStore, "_execute_migration_script", interrupted):
            with self.assertRaisesRegex(RuntimeError, "synthetic_migration_interrupt"):
                self.store.open()

        self.store.open()
        self.assertEqual(
            self.store.connection.execute("SELECT value FROM schema_meta WHERE key='version'").fetchone()[0],
            str(SCHEMA_VERSION),
        )
        self.assertIn("gpx_imports", self.store.table_names())
        self.assertIn("gpx_import_points", self.store.table_names())
        self.assertIn("gpx_import_drives", self.store.table_names())
        self.assertEqual(self.store.connection.execute("PRAGMA integrity_check").fetchone()[0], "ok")
        self.assertEqual(self.store.connection.execute("PRAGMA foreign_key_check").fetchall(), [])
        self.assertEqual(self.store.connection.execute("SELECT count(*) FROM gps_points").fetchone()[0], 1)

    def test_all_migrations_rollback_when_transaction_fails(self):
        before = self._snapshot()
        migration_names = [f"_migrate_v{version}" for version in range(3, 15)]
        for name in migration_names:
            with self.assertRaisesRegex(RuntimeError, name):
                with self.store.transaction():
                    getattr(self.store, name)()
                    raise RuntimeError(name)
            self.assertEqual(self._snapshot(), before, name)

    def test_schema_14_open_is_non_mutating(self):
        self.store.close()
        before = validate_database(self.path)
        self.store.open()
        after = validate_database(self.path)
        self.assertEqual(after.sha256, before.sha256)
        self.assertEqual(after.integrity_check, "ok")
        self.assertEqual(after.foreign_key_errors, ())

    def test_online_backup_and_restore_hash_the_actual_standalone_files(self):
        backup_path = Path(self.directory.name) / "backup.sqlite3"
        restored_path = Path(self.directory.name) / "restored.sqlite3"
        backup = backup_database(self.path, backup_path)
        restored = restore_database(backup_path, restored_path)
        self.assertEqual(backup.sha256, _sha256(backup_path))
        self.assertEqual(restored.sha256, _sha256(restored_path))
        self.assertEqual(restored.sha256, backup.sha256)
        self.assertEqual(restored.integrity_check, "ok")
        self.assertEqual(restored.foreign_key_errors, ())
        with sqlite3.connect(restored_path) as connection:
            self.assertEqual(connection.execute("SELECT count(*) FROM gps_points").fetchone()[0], 1)

    def test_backup_and_restore_refuse_overwrite(self):
        backup_path = Path(self.directory.name) / "backup.sqlite3"
        backup_database(self.path, backup_path)
        with self.assertRaises(FileExistsError):
            backup_database(self.path, backup_path)
        with self.assertRaises(FileExistsError):
            restore_database(backup_path, self.path)

    def test_corrupted_backup_is_rejected(self):
        corrupted = Path(self.directory.name) / "corrupted.sqlite3"
        corrupted.write_bytes(b"not a sqlite database")
        with self.assertRaises((sqlite3.DatabaseError, ValueError)):
            validate_database(corrupted)

    def test_historical_schema_10_migrates_without_rewriting_fuel_expense(self):
        historical = Path(self.directory.name) / "schema-10.sqlite3"
        connection = sqlite3.connect(historical)
        connection.executescript(
            """
            CREATE TABLE schema_meta(key TEXT PRIMARY KEY, value TEXT NOT NULL);
            INSERT INTO schema_meta VALUES('version', '10');
            CREATE TABLE vehicles(id TEXT PRIMARY KEY, name TEXT NOT NULL, tracker_entity_id TEXT,
              odometer_km REAL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL);
            CREATE TABLE expenses(id TEXT PRIMARY KEY, trip_id TEXT, occurred_at TEXT NOT NULL,
              category TEXT NOT NULL, amount_minor INTEGER NOT NULL, currency TEXT NOT NULL,
              note TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, odometer_km REAL,
              stay_id TEXT, occurred_on TEXT, occurred_time TEXT);
            INSERT INTO expenses VALUES('fuel-old', NULL, '2026-10-23T08:00:00+00:00',
              'fuel', 13125, 'EUR', 'Bestand', '2026-10-23T08:00:00+00:00',
              '2026-10-23T08:00:00+00:00', NULL, NULL, '2026-10-23', '08:00');
            """
        )
        connection.close()
        historical_store = SQLiteStore(historical)
        historical_store.open()
        try:
            row = historical_store.connection.execute(
                "SELECT amount_minor, fuel_liters, fuel_price_per_liter FROM expenses WHERE id='fuel-old'"
            ).fetchone()
            self.assertEqual(tuple(row), (13125, None, None))
            self.assertEqual(
                historical_store.connection.execute("SELECT value FROM schema_meta WHERE key='version'").fetchone()[0],
                str(SCHEMA_VERSION),
            )
            self.assertEqual(historical_store.connection.execute("PRAGMA integrity_check").fetchone()[0], "ok")
        finally:
            historical_store.close()


def _sha256(path: Path) -> str:
    import hashlib

    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


if __name__ == "__main__":
    unittest.main()
