"""Synchronous SQLite schema and repository boundary.

All methods are deliberately synchronous so the future Home Assistant adapter
can call the entire transaction through ``hass.async_add_executor_job``. No
SQLite connection may be used directly from an event-loop callback.
"""

import asyncio
import sqlite3
from collections.abc import Iterator
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path

SCHEMA_VERSION = 2
SCHEMA_SQL = """
PRAGMA foreign_keys = ON;
CREATE TABLE IF NOT EXISTS schema_meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS vehicles (
  id TEXT PRIMARY KEY, name TEXT NOT NULL, tracker_entity_id TEXT UNIQUE,
  odometer_km REAL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS gps_points (
  id INTEGER PRIMARY KEY AUTOINCREMENT, vehicle_id TEXT NOT NULL REFERENCES vehicles(id),
  recorded_at TEXT NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL,
  accuracy_m REAL, source_state TEXT, source_type TEXT, sample_kind TEXT NOT NULL DEFAULT 'movement',
  UNIQUE(vehicle_id, recorded_at, latitude, longitude)
);
CREATE INDEX IF NOT EXISTS idx_gps_vehicle_time ON gps_points(vehicle_id, recorded_at);
CREATE TABLE IF NOT EXISTS drives (
  id TEXT PRIMARY KEY, vehicle_id TEXT NOT NULL REFERENCES vehicles(id), started_at TEXT NOT NULL,
  ended_at TEXT NOT NULL, distance_m REAL NOT NULL, end_reason TEXT NOT NULL,
  manual_distance_km REAL, created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_drives_vehicle_time ON drives(vehicle_id, started_at, ended_at);
CREATE TABLE IF NOT EXISTS stays (
  id TEXT PRIMARY KEY, vehicle_id TEXT NOT NULL REFERENCES vehicles(id), started_at TEXT NOT NULL,
  ended_at TEXT, latitude REAL, longitude REAL, created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS trips (
  id TEXT PRIMARY KEY, vehicle_id TEXT NOT NULL REFERENCES vehicles(id), title TEXT NOT NULL,
  started_at TEXT NOT NULL, ended_at TEXT, status TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS trip_drives (
  trip_id TEXT NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  drive_id TEXT NOT NULL REFERENCES drives(id) ON DELETE RESTRICT,
  linked_at TEXT NOT NULL, PRIMARY KEY(trip_id, drive_id), UNIQUE(drive_id)
);
CREATE TABLE IF NOT EXISTS expenses (
  id TEXT PRIMARY KEY, trip_id TEXT REFERENCES trips(id) ON DELETE SET NULL, occurred_at TEXT NOT NULL,
  category TEXT NOT NULL, amount_minor INTEGER NOT NULL, currency TEXT NOT NULL,
  note TEXT, created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_expenses_trip_time ON expenses(trip_id, occurred_at);
CREATE TABLE IF NOT EXISTS runtime_state (
  vehicle_id TEXT PRIMARY KEY REFERENCES vehicles(id) ON DELETE CASCADE,
  state_json TEXT NOT NULL, updated_at TEXT NOT NULL
);
"""


def utc_iso(value: datetime) -> str:
    if value.tzinfo is None or value.utcoffset() is None:
        raise ValueError("timestamps must be timezone-aware")
    return value.astimezone(timezone.utc).isoformat()


class SQLiteStore:
    """Small transaction-oriented store for Phase 1A tests and later adapter use."""

    def __init__(self, path: str | Path) -> None:
        self.path = Path(path)
        self.connection: sqlite3.Connection | None = None

    def open(self) -> None:
        # AsyncSQLiteWorker serializes all calls with its lock; allowing the
        # executor to use different worker threads is therefore safe here.
        self.connection = sqlite3.connect(self.path, check_same_thread=False)
        self.connection.row_factory = sqlite3.Row
        self.connection.execute("PRAGMA foreign_keys = ON")
        self.connection.executescript(SCHEMA_SQL)
        current = self.connection.execute("SELECT value FROM schema_meta WHERE key='version'").fetchone()
        if current is not None and int(current[0]) > SCHEMA_VERSION:
            raise RuntimeError(f"database schema {current[0]} is newer than supported {SCHEMA_VERSION}")
        self.connection.execute("INSERT OR REPLACE INTO schema_meta(key, value) VALUES('version', ?)", (str(SCHEMA_VERSION),))
        self.connection.commit()

    def close(self) -> None:
        if self.connection is not None:
            self.connection.close()
            self.connection = None

    @contextmanager
    def transaction(self) -> Iterator[sqlite3.Connection]:
        if self.connection is None:
            raise RuntimeError("store is not open")
        try:
            yield self.connection
            self.connection.commit()
        except Exception:
            self.connection.rollback()
            raise

    def table_names(self) -> set[str]:
        if self.connection is None:
            raise RuntimeError("store is not open")
        rows = self.connection.execute("SELECT name FROM sqlite_master WHERE type='table'").fetchall()
        return {row[0] for row in rows}

    def load_recent_points(self, vehicle_id: str, limit: int = 256) -> list[tuple]:
        """Load a bounded tail for restart reconstruction, oldest first."""
        if self.connection is None:
            raise RuntimeError("store is not open")
        rows = self.connection.execute(
            "SELECT vehicle_id, recorded_at, latitude, longitude, accuracy_m, source_state, source_type "
            "FROM gps_points WHERE vehicle_id=? ORDER BY recorded_at DESC LIMIT ?",
            (vehicle_id, limit),
        ).fetchall()
        return list(reversed(rows))

    def insert_vehicle(self, vehicle_id: str, name: str, tracker_entity_id: str, now: datetime) -> None:
        with self.transaction() as connection:
            stamp = utc_iso(now)
            connection.execute("INSERT INTO vehicles(id,name,tracker_entity_id,created_at,updated_at) VALUES(?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET name=excluded.name,tracker_entity_id=excluded.tracker_entity_id,updated_at=excluded.updated_at", (vehicle_id, name, tracker_entity_id, stamp, stamp))

    def insert_point(self, point) -> bool:
        with self.transaction() as connection:
            cursor = connection.execute("INSERT OR IGNORE INTO gps_points(vehicle_id,recorded_at,latitude,longitude,accuracy_m,source_state,source_type) VALUES(?,?,?,?,?,?,?)", (point.vehicle_id, utc_iso(point.recorded_at), point.latitude, point.longitude, point.accuracy_m, point.source_state, point.source_type))
            return cursor.rowcount == 1

    def insert_drive(self, drive) -> None:
        with self.transaction() as connection:
            stamp = utc_iso(drive.ended_at)
            connection.execute("INSERT OR IGNORE INTO drives(id,vehicle_id,started_at,ended_at,distance_m,end_reason,manual_distance_km,created_at) VALUES(?,?,?,?,?,?,?,?)", (drive.id, drive.vehicle_id, utc_iso(drive.started_at), stamp, drive.distance_m, drive.end_reason, drive.manual_distance_km, stamp))

    def save_runtime_state(self, vehicle_id: str, state_json: str, now: datetime) -> None:
        with self.transaction() as connection:
            connection.execute("INSERT INTO runtime_state(vehicle_id,state_json,updated_at) VALUES(?,?,?) ON CONFLICT(vehicle_id) DO UPDATE SET state_json=excluded.state_json,updated_at=excluded.updated_at", (vehicle_id, state_json, utc_iso(now)))

    def load_runtime_state(self, vehicle_id: str) -> str | None:
        if self.connection is None: raise RuntimeError("store is not open")
        row = self.connection.execute("SELECT state_json FROM runtime_state WHERE vehicle_id=?", (vehicle_id,)).fetchone()
        return None if row is None else row[0]

    def retention_candidates(self, cutoff: datetime, limit: int = 100) -> list[int]:
        if self.connection is None: raise RuntimeError("store is not open")
        rows = self.connection.execute("SELECT id FROM gps_points WHERE recorded_at < ? AND NOT EXISTS (SELECT 1 FROM drives d JOIN trip_drives td ON td.drive_id=d.id WHERE d.vehicle_id=gps_points.vehicle_id AND d.started_at <= gps_points.recorded_at AND d.ended_at >= gps_points.recorded_at) ORDER BY id LIMIT ?", (utc_iso(cutoff), limit)).fetchall()
        return [row[0] for row in rows]


class AsyncSQLiteWorker:
    """Executor-backed SQLite boundary with serialized calls and ordered close."""

    def __init__(self, path: str | Path) -> None:
        self.store = SQLiteStore(path)
        self._lock = asyncio.Lock()
        self._closed = False

    async def async_open(self) -> None:
        async with self._lock:
            await asyncio.to_thread(self.store.open)

    async def async_close(self) -> None:
        async with self._lock:
            if not self._closed:
                await asyncio.to_thread(self.store.close)
                self._closed = True

    async def _call(self, method: str, *args):
        if self._closed: raise RuntimeError("database worker is closed")
        async with self._lock:
            return await asyncio.to_thread(getattr(self.store, method), *args)

    async def async_insert_point(self, point): return await self._call("insert_point", point)
    async def async_insert_drive(self, drive): return await self._call("insert_drive", drive)
    async def async_insert_vehicle(self, *args): return await self._call("insert_vehicle", *args)
    async def async_load_recent_points(self, *args): return await self._call("load_recent_points", *args)
