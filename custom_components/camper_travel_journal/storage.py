"""Synchronous SQLite schema and repository boundary.

All methods are deliberately synchronous so the future Home Assistant adapter
can call the entire transaction through ``hass.async_add_executor_job``. No
SQLite connection may be used directly from an event-loop callback.
"""

import asyncio
import re
import sqlite3
import uuid
from urllib.parse import urlsplit, urlunsplit
from math import asin, cos, isfinite, radians, sin, sqrt
from collections.abc import Iterator
from contextlib import contextmanager
from datetime import datetime, timedelta, timezone
from pathlib import Path

from .fuel import resolve_fuel_values
from .travel import validate_amount, validate_expense_category, validate_expense_currency
from .validation import is_coordinate_label

SCHEMA_VERSION = 11
V10_GPX_BACKFILL_MARKER = "v10_gpx_backfill"


def _valid_coordinates(latitude, longitude) -> bool:
    try:
        latitude, longitude = float(latitude), float(longitude)
    except (TypeError, ValueError):
        return False
    return isfinite(latitude) and isfinite(longitude) and -90 <= latitude <= 90 and -180 <= longitude <= 180


def _is_coordinate_label(value: str | None) -> bool:
    return is_coordinate_label(value)
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
  manual_distance_km REAL, source TEXT NOT NULL DEFAULT 'gps', start_label TEXT, end_label TEXT,
  start_latitude REAL, start_longitude REAL, end_latitude REAL, end_longitude REAL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_drives_vehicle_time ON drives(vehicle_id, started_at, ended_at);
CREATE TABLE IF NOT EXISTS stays (
  id TEXT PRIMARY KEY, vehicle_id TEXT NOT NULL REFERENCES vehicles(id), started_at TEXT NOT NULL,
  ended_at TEXT, latitude REAL, longitude REAL, created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS trips (
  id TEXT PRIMARY KEY, vehicle_id TEXT NOT NULL REFERENCES vehicles(id), title TEXT NOT NULL,
  started_at TEXT NOT NULL, ended_at TEXT, status TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '', destination TEXT NOT NULL DEFAULT '',
  start_date TEXT, end_date TEXT
);
CREATE TABLE IF NOT EXISTS trip_drives (
  trip_id TEXT NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
  drive_id TEXT NOT NULL REFERENCES drives(id) ON DELETE RESTRICT,
  linked_at TEXT NOT NULL, PRIMARY KEY(trip_id, drive_id), UNIQUE(drive_id)
);
CREATE TABLE IF NOT EXISTS expenses (
  id TEXT PRIMARY KEY, trip_id TEXT REFERENCES trips(id) ON DELETE SET NULL, occurred_at TEXT NOT NULL,
  category TEXT NOT NULL, amount_minor INTEGER NOT NULL, currency TEXT NOT NULL,
  note TEXT, created_at TEXT NOT NULL, updated_at TEXT NOT NULL, odometer_km REAL, stay_id TEXT REFERENCES stops(id) ON DELETE SET NULL,
  occurred_on TEXT, occurred_time TEXT, fuel_liters REAL, fuel_price_per_liter REAL
);
CREATE INDEX IF NOT EXISTS idx_expenses_trip_time ON expenses(trip_id, occurred_at);
CREATE TABLE IF NOT EXISTS stops (
  id TEXT PRIMARY KEY, vehicle_id TEXT NOT NULL REFERENCES vehicles(id), trip_id TEXT REFERENCES trips(id) ON DELETE SET NULL,
  name TEXT NOT NULL, occurred_at TEXT NOT NULL, arrived_at TEXT, departed_at TEXT,
  latitude REAL, longitude REAL, description TEXT NOT NULL DEFAULT '', stop_type TEXT NOT NULL,
  automatic INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_stops_vehicle_time ON stops(vehicle_id, occurred_at);
CREATE INDEX IF NOT EXISTS idx_stops_trip_time ON stops(trip_id, occurred_at);
CREATE TABLE IF NOT EXISTS runtime_state (
  vehicle_id TEXT PRIMARY KEY REFERENCES vehicles(id) ON DELETE CASCADE,
  state_json TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS gpx_imports (
  file_hash TEXT PRIMARY KEY, vehicle_id TEXT NOT NULL REFERENCES vehicles(id),
  imported_at TEXT NOT NULL, point_count INTEGER NOT NULL, drive_count INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS gpx_import_points (
  point_key TEXT PRIMARY KEY, file_hash TEXT NOT NULL REFERENCES gpx_imports(file_hash) ON DELETE CASCADE,
  gps_point_id INTEGER REFERENCES gps_points(id) ON DELETE SET NULL
);
CREATE TABLE IF NOT EXISTS gpx_import_drives (
  drive_key TEXT PRIMARY KEY, file_hash TEXT NOT NULL REFERENCES gpx_imports(file_hash) ON DELETE CASCADE,
  drive_id TEXT NOT NULL REFERENCES drives(id) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_gpx_imports_vehicle ON gpx_imports(vehicle_id, imported_at);
CREATE TABLE IF NOT EXISTS drive_gps_points (
  drive_id TEXT NOT NULL REFERENCES drives(id) ON DELETE CASCADE,
  gps_point_id INTEGER NOT NULL REFERENCES gps_points(id) ON DELETE CASCADE,
  ordinal INTEGER NOT NULL,
  association_source TEXT NOT NULL,
  PRIMARY KEY(drive_id, gps_point_id),
  UNIQUE(drive_id, ordinal)
);
CREATE INDEX IF NOT EXISTS idx_drive_gps_points_drive ON drive_gps_points(drive_id, ordinal);
CREATE INDEX IF NOT EXISTS idx_drive_gps_points_point ON drive_gps_points(gps_point_id);
"""


def utc_iso(value: datetime) -> str:
    if value.tzinfo is None or value.utcoffset() is None:
        raise ValueError("timestamps must be timezone-aware")
    return value.astimezone(timezone.utc).isoformat()


def normalize_website_url(value: str | None) -> str | None:
    """Normalize an optional place website and reject unsafe schemes."""
    if value is None:
        return None
    text = str(value).strip()
    if not text:
        return None
    if re.match(r"^[A-Za-z][A-Za-z0-9+.-]*:", text) and not re.match(r"^https?://", text, re.IGNORECASE):
        raise ValueError("website_url_invalid")
    candidate = text if "://" in text else f"https://{text}"
    parsed = urlsplit(candidate)
    try:
        parsed.port
    except ValueError:
        raise ValueError("website_url_invalid") from None
    if parsed.scheme.lower() not in {"http", "https"} or not parsed.hostname or any(char.isspace() for char in text):
        raise ValueError("website_url_invalid")
    return urlunsplit((parsed.scheme, parsed.netloc, parsed.path, parsed.query, parsed.fragment))


class SQLiteStore:
    """Small transaction-oriented store for Phase 1A tests and later adapter use."""

    def __init__(self, path: str | Path) -> None:
        self.path = Path(path)
        self.connection: sqlite3.Connection | None = None

    def open(self) -> None:
        # AsyncSQLiteWorker serializes all calls with its lock; allowing the
        # executor to use different worker threads is therefore safe here.
        self.connection = sqlite3.connect(self.path, check_same_thread=False, timeout=30.0)
        try:
            self.connection.row_factory = sqlite3.Row
            self.connection.execute("PRAGMA foreign_keys = ON")
            self.connection.execute("PRAGMA journal_mode = WAL")
            self.connection.execute("PRAGMA synchronous = NORMAL")
            self.connection.execute("PRAGMA busy_timeout = 30000")
            self.connection.executescript(SCHEMA_SQL)
            current = self.connection.execute("SELECT value FROM schema_meta WHERE key='version'").fetchone()
            if current is not None and int(current[0]) > SCHEMA_VERSION:
                raise RuntimeError(f"database schema {current[0]} is newer than supported {SCHEMA_VERSION}")
            previous = int(current[0]) if current is not None else 0
            with self.transaction() as connection:
                if previous < 3:
                    self._migrate_v3()
                if previous < 4:
                    self._migrate_v4()
                if previous < 5:
                    self._migrate_v5()
                if previous < 6:
                    self._migrate_v6()
                if previous < 7:
                    self._migrate_v7()
                if previous < 8:
                    self._migrate_v8()
                if previous < 9:
                    self._migrate_v9()
                if previous < 10:
                    self._migrate_v10()
                if previous < 11:
                    self._migrate_v11()
                if self.connection.execute(
                    "SELECT 1 FROM schema_meta WHERE key=?", (V10_GPX_BACKFILL_MARKER,)
                ).fetchone() is None:
                    self._backfill_v10_gpx_endpoints()
                connection.execute("INSERT OR REPLACE INTO schema_meta(key, value) VALUES('version', ?)", (str(SCHEMA_VERSION),))
                connection.execute(
                    "INSERT OR REPLACE INTO schema_meta(key, value) VALUES(?, '1')",
                    (V10_GPX_BACKFILL_MARKER,),
                )
        except Exception:
            self.close()
            raise

    def _migrate_v3(self) -> None:
        """Add Phase 2 fields without touching recorder or existing GPS rows."""
        if self.connection is None:
            raise RuntimeError("store is not open")
        columns = {row[1] for row in self.connection.execute("PRAGMA table_info(trips)")}
        if "description" not in columns:
            self.connection.execute("ALTER TABLE trips ADD COLUMN description TEXT NOT NULL DEFAULT ''")
        if "destination" not in columns:
            self.connection.execute("ALTER TABLE trips ADD COLUMN destination TEXT NOT NULL DEFAULT ''")
        columns = {row[1] for row in self.connection.execute("PRAGMA table_info(expenses)")}
        if "odometer_km" not in columns:
            self.connection.execute("ALTER TABLE expenses ADD COLUMN odometer_km REAL")
        if "stay_id" not in columns:
            self.connection.execute("ALTER TABLE expenses ADD COLUMN stay_id TEXT REFERENCES stops(id) ON DELETE SET NULL")
        self.connection.executescript("""
        CREATE TABLE IF NOT EXISTS stops (
          id TEXT PRIMARY KEY, vehicle_id TEXT NOT NULL REFERENCES vehicles(id), trip_id TEXT REFERENCES trips(id) ON DELETE SET NULL,
          name TEXT NOT NULL, occurred_at TEXT NOT NULL, arrived_at TEXT, departed_at TEXT,
          latitude REAL, longitude REAL, description TEXT NOT NULL DEFAULT '', stop_type TEXT NOT NULL,
          automatic INTEGER NOT NULL DEFAULT 1, created_at TEXT NOT NULL
        );
        CREATE INDEX IF NOT EXISTS idx_stops_vehicle_time ON stops(vehicle_id, occurred_at);
        CREATE INDEX IF NOT EXISTS idx_stops_trip_time ON stops(trip_id, occurred_at);
        """)

    def _migrate_v4(self) -> None:
        """Add update timestamps needed for safe, observable CRUD edits."""
        if self.connection is None:
            raise RuntimeError("store is not open")
        for table in ("stops", "expenses"):
            columns = {row[1] for row in self.connection.execute(f"PRAGMA table_info({table})")}
            if "updated_at" not in columns:
                self.connection.execute(f"ALTER TABLE {table} ADD COLUMN updated_at TEXT")
                self.connection.execute(f"UPDATE {table} SET updated_at=created_at WHERE updated_at IS NULL")

    def _migrate_v5(self) -> None:
        """Add optional trip dates and explicit manual-drive metadata."""
        if self.connection is None:
            raise RuntimeError("store is not open")
        trip_columns = {row[1] for row in self.connection.execute("PRAGMA table_info(trips)")}
        if "start_date" not in trip_columns:
            self.connection.execute("ALTER TABLE trips ADD COLUMN start_date TEXT")
        if "end_date" not in trip_columns:
            self.connection.execute("ALTER TABLE trips ADD COLUMN end_date TEXT")
        drive_columns = {row[1] for row in self.connection.execute("PRAGMA table_info(drives)")}
        if "source" not in drive_columns:
            self.connection.execute("ALTER TABLE drives ADD COLUMN source TEXT NOT NULL DEFAULT 'gps'")
        if "start_label" not in drive_columns:
            self.connection.execute("ALTER TABLE drives ADD COLUMN start_label TEXT")
        if "end_label" not in drive_columns:
            self.connection.execute("ALTER TABLE drives ADD COLUMN end_label TEXT")

    def _migrate_v6(self) -> None:
        """Add GPX provenance and idempotency tables only."""
        if self.connection is None:
            raise RuntimeError("store is not open")
        self.connection.executescript("""
        CREATE TABLE IF NOT EXISTS gpx_imports (
          file_hash TEXT PRIMARY KEY, vehicle_id TEXT NOT NULL REFERENCES vehicles(id), imported_at TEXT NOT NULL,
          point_count INTEGER NOT NULL, drive_count INTEGER NOT NULL
        );
        CREATE TABLE IF NOT EXISTS gpx_import_points (
          point_key TEXT PRIMARY KEY, file_hash TEXT NOT NULL REFERENCES gpx_imports(file_hash) ON DELETE CASCADE,
          gps_point_id INTEGER REFERENCES gps_points(id) ON DELETE SET NULL
        );
        CREATE TABLE IF NOT EXISTS gpx_import_drives (
          drive_key TEXT PRIMARY KEY, file_hash TEXT NOT NULL REFERENCES gpx_imports(file_hash) ON DELETE CASCADE,
          drive_id TEXT NOT NULL REFERENCES drives(id) ON DELETE CASCADE
        );
        CREATE INDEX IF NOT EXISTS idx_gpx_imports_vehicle ON gpx_imports(vehicle_id, imported_at);
        """)

    def _migrate_v7(self) -> None:
        """Add explicit, non-destructive GPS-point-to-drive membership."""
        if self.connection is None:
            raise RuntimeError("store is not open")
        self.connection.executescript("""
        CREATE TABLE IF NOT EXISTS drive_gps_points (
          drive_id TEXT NOT NULL REFERENCES drives(id) ON DELETE CASCADE,
          gps_point_id INTEGER NOT NULL REFERENCES gps_points(id) ON DELETE CASCADE,
          ordinal INTEGER NOT NULL,
          association_source TEXT NOT NULL,
          PRIMARY KEY(drive_id, gps_point_id),
          UNIQUE(drive_id, ordinal)
        );
        CREATE INDEX IF NOT EXISTS idx_drive_gps_points_drive ON drive_gps_points(drive_id, ordinal);
        CREATE INDEX IF NOT EXISTS idx_drive_gps_points_point ON drive_gps_points(gps_point_id);
        """)
        # Preserve historical data while refusing to claim exactness for
        # overlapping drive intervals. This is additive and idempotent.
        drives = self.connection.execute("SELECT id, vehicle_id, started_at, ended_at FROM drives ORDER BY started_at, id").fetchall()
        for drive_id, vehicle_id, started_at, ended_at in drives:
            overlap = self.connection.execute(
                "SELECT 1 FROM drives WHERE vehicle_id=? AND id<>? AND started_at < ? AND ended_at > ? LIMIT 1",
                (vehicle_id, drive_id, ended_at, started_at),
            ).fetchone()
            if overlap:
                continue
            points = self.connection.execute(
                "SELECT id FROM gps_points WHERE vehicle_id=? AND recorded_at>=? AND recorded_at<=? ORDER BY recorded_at, id",
                (vehicle_id, started_at, ended_at),
            ).fetchall()
            for ordinal, point in enumerate(points):
                self.connection.execute(
                    "INSERT OR IGNORE INTO drive_gps_points(drive_id,gps_point_id,ordinal,association_source) VALUES(?,?,?,?)",
                    (drive_id, point[0], ordinal, "interval_reconstructed"),
                )

    def _migrate_v8(self) -> None:
        """Add the v0.3.0 place foundation without rewriting v7 data."""
        if self.connection is None:
            raise RuntimeError("store is not open")
        stop_columns = {row[1] for row in self.connection.execute("PRAGMA table_info(stops)")}
        additions = {
            "drive_id": "TEXT REFERENCES drives(id) ON DELETE SET NULL",
            "place_type": "TEXT NOT NULL DEFAULT 'other'",
            "address": "TEXT NOT NULL DEFAULT ''",
            "source": "TEXT NOT NULL DEFAULT 'legacy'",
            "confirmed": "INTEGER NOT NULL DEFAULT 1",
        }
        for name, definition in additions.items():
            if name not in stop_columns:
                self.connection.execute(f"ALTER TABLE stops ADD COLUMN {name} {definition}")
        self.connection.execute("UPDATE stops SET place_type=stop_type WHERE place_type='other' AND stop_type <> 'other'")
        self.connection.execute("UPDATE stops SET source=CASE WHEN automatic=1 THEN 'legacy' ELSE 'manual' END WHERE source='legacy'")
        self.connection.executescript("""
        CREATE INDEX IF NOT EXISTS idx_stops_drive ON stops(drive_id);
        CREATE INDEX IF NOT EXISTS idx_stops_type ON stops(vehicle_id, place_type, occurred_at);
        CREATE TABLE IF NOT EXISTS overnight_details (
          place_id TEXT PRIMARY KEY REFERENCES stops(id) ON DELETE CASCADE,
          place_kind TEXT NOT NULL DEFAULT 'other',
          website_url TEXT,
          booking_note TEXT,
          large_rv_suitable INTEGER,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS place_ratings (
          place_id TEXT PRIMARY KEY REFERENCES stops(id) ON DELETE CASCADE,
          overall INTEGER NOT NULL CHECK(overall BETWEEN 1 AND 5),
          large_rv_access INTEGER CHECK(large_rv_access BETWEEN 1 AND 5),
          space_maneuvering INTEGER CHECK(space_maneuvering BETWEEN 1 AND 5),
          facilities INTEGER CHECK(facilities BETWEEN 1 AND 5),
          surroundings INTEGER CHECK(surroundings BETWEEN 1 AND 5),
          review_text TEXT NOT NULL DEFAULT '',
          rated_at TEXT,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        );
        CREATE TABLE IF NOT EXISTS stop_suggestions (
          id TEXT PRIMARY KEY,
          vehicle_id TEXT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
          trip_id TEXT REFERENCES trips(id) ON DELETE SET NULL,
          drive_id TEXT REFERENCES drives(id) ON DELETE SET NULL,
          arrived_at TEXT NOT NULL,
          departed_at TEXT,
          latitude REAL NOT NULL,
          longitude REAL NOT NULL,
          source TEXT NOT NULL DEFAULT 'gps_suggestion',
          status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','accepted','dismissed')),
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          UNIQUE(vehicle_id, arrived_at, latitude, longitude)
        );
        CREATE INDEX IF NOT EXISTS idx_overnight_places_kind ON overnight_details(place_kind);
        CREATE INDEX IF NOT EXISTS idx_suggestions_vehicle_status ON stop_suggestions(vehicle_id, status, arrived_at);
        """)
        expense_columns = {row[1] for row in self.connection.execute("PRAGMA table_info(expenses)")}
        if "place_id" not in expense_columns:
            self.connection.execute("ALTER TABLE expenses ADD COLUMN place_id TEXT REFERENCES stops(id) ON DELETE SET NULL")
        self.connection.execute("UPDATE expenses SET place_id=stay_id WHERE place_id IS NULL AND stay_id IS NOT NULL")
        self.connection.execute("CREATE INDEX IF NOT EXISTS idx_expenses_place ON expenses(place_id)")

    def _migrate_v9(self) -> None:
        """Persist user decisions for derived drive interruptions only."""
        if self.connection is None:
            raise RuntimeError("store is not open")
        self.connection.executescript("""
        CREATE TABLE IF NOT EXISTS interruption_links (
          trip_id TEXT NOT NULL REFERENCES trips(id) ON DELETE CASCADE,
          interruption_id TEXT NOT NULL,
          previous_drive_id TEXT NOT NULL REFERENCES drives(id) ON DELETE CASCADE,
          next_drive_id TEXT NOT NULL REFERENCES drives(id) ON DELETE CASCADE,
          status TEXT NOT NULL CHECK(status IN ('unassigned','stop','overnight','pause','ignored')),
          stop_id TEXT REFERENCES stops(id) ON DELETE SET NULL,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL,
          PRIMARY KEY(trip_id, interruption_id),
          UNIQUE(trip_id, previous_drive_id, next_drive_id)
        );
        CREATE INDEX IF NOT EXISTS idx_interruption_links_stop ON interruption_links(stop_id);
        """)

    def _migrate_v10(self) -> None:
        """Add actual expense date/time and persisted drive endpoints additively.

        Existing expense rows deliberately remain unknown: ``created_at`` is
        the capture timestamp, not proof of when the expense occurred.
        """
        if self.connection is None:
            raise RuntimeError("store is not open")
        expense_columns = {row[1] for row in self.connection.execute("PRAGMA table_info(expenses)")}
        for name, definition in (("occurred_on", "TEXT"), ("occurred_time", "TEXT")):
            if name not in expense_columns:
                self.connection.execute(f"ALTER TABLE expenses ADD COLUMN {name} {definition}")
        drive_columns = {row[1] for row in self.connection.execute("PRAGMA table_info(drives)")}
        for name in ("start_latitude", "start_longitude", "end_latitude", "end_longitude"):
            if name not in drive_columns:
                self.connection.execute(f"ALTER TABLE drives ADD COLUMN {name} REAL")

    def _migrate_v11(self) -> None:
        """Add optional fuel details without rewriting existing expenses."""
        if self.connection is None:
            raise RuntimeError("store is not open")
        columns = {row[1] for row in self.connection.execute("PRAGMA table_info(expenses)")}
        for name in ("fuel_liters", "fuel_price_per_liter"):
            if name not in columns:
                self.connection.execute(f"ALTER TABLE expenses ADD COLUMN {name} REAL")

    def _backfill_v10_gpx_endpoints(self) -> None:
        """Reconstruct safe legacy memberships once, then persist endpoints.

        The marker makes this safe for already-opened v10 databases without
        repeating a potentially expensive full interval scan on every startup.
        """
        if self.connection is None:
            raise RuntimeError("store is not open")
        self._reconstruct_drive_point_membership(self.connection)
        drives = self.connection.execute("SELECT id FROM drives").fetchall()
        for (drive_id,) in drives:
            points = self.connection.execute(
                "SELECT p.latitude,p.longitude FROM drive_gps_points dgp "
                "JOIN gps_points p ON p.id=dgp.gps_point_id "
                "WHERE dgp.drive_id=? ORDER BY dgp.ordinal",
                (drive_id,),
            ).fetchall()
            if points:
                self.connection.execute(
                    "UPDATE drives SET start_latitude=?,start_longitude=?,"
                    "end_latitude=?,end_longitude=? "
                    "WHERE id=? AND start_latitude IS NULL",
                    (points[0][0], points[0][1], points[-1][0], points[-1][1], drive_id),
                )

    def close(self) -> None:
        if self.connection is not None:
            self.connection.close()
            self.connection = None

    @contextmanager
    def transaction(self) -> Iterator[sqlite3.Connection]:
        if self.connection is None:
            raise RuntimeError("store is not open")
        try:
            self.connection.execute("BEGIN IMMEDIATE")
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

    def diagnostic_counts(self, vehicle_id: str) -> dict[str, int]:
        """Return aggregate counts only; never expose stored coordinates."""
        if self.connection is None:
            raise RuntimeError("store is not open")
        return {
            "gps_points": self.connection.execute("SELECT count(*) FROM gps_points WHERE vehicle_id=?", (vehicle_id,)).fetchone()[0],
            "drives": self.connection.execute("SELECT count(*) FROM drives WHERE vehicle_id=?", (vehicle_id,)).fetchone()[0],
            "trips": self.connection.execute("SELECT count(*) FROM trips WHERE vehicle_id=?", (vehicle_id,)).fetchone()[0],
        }

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
            connection.execute("INSERT OR IGNORE INTO drives(id,vehicle_id,started_at,ended_at,distance_m,end_reason,manual_distance_km,source,start_label,end_label,start_latitude,start_longitude,end_latitude,end_longitude,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", (drive.id, drive.vehicle_id, utc_iso(drive.started_at), utc_iso(drive.ended_at), drive.distance_m, drive.end_reason, drive.manual_distance_km, drive.source, drive.start_label, drive.end_label, drive.start_latitude, drive.start_longitude, drive.end_latitude, drive.end_longitude, stamp))

    def associate_drive_points(self, drive_id: str, vehicle_id: str, started_at: datetime, ended_at: datetime, association_source: str) -> int:
        """Associate existing points in a drive interval, without rewriting points."""
        if self.connection is None:
            raise RuntimeError("store is not open")
        if association_source not in {"live_detector", "interval_reconstructed"}:
            raise ValueError("association_source_invalid")
        with self.transaction() as connection:
            rows = connection.execute(
                "SELECT id FROM gps_points WHERE vehicle_id=? AND recorded_at>=? AND recorded_at<=? ORDER BY recorded_at, id",
                (vehicle_id, utc_iso(started_at), utc_iso(ended_at)),
            ).fetchall()
            for ordinal, row in enumerate(rows):
                connection.execute(
                    "INSERT OR IGNORE INTO drive_gps_points(drive_id,gps_point_id,ordinal,association_source) VALUES(?,?,?,?)",
                    (drive_id, row[0], ordinal, association_source),
                )
            return len(rows)

    def reconstruct_drive_point_membership(self, vehicle_id: str) -> dict[str, int]:
        """Backfill only unambiguous historical interval memberships."""
        if self.connection is None:
            raise RuntimeError("store is not open")
        with self.transaction() as connection:
            return self._reconstruct_drive_point_membership(connection, vehicle_id)

    @staticmethod
    def _reconstruct_drive_point_membership(connection, vehicle_id: str | None = None) -> dict[str, int]:
        query = "SELECT id, vehicle_id, started_at, ended_at FROM drives"
        args: tuple = ()
        if vehicle_id is not None:
            query += " WHERE vehicle_id=?"
            args = (vehicle_id,)
        query += " ORDER BY started_at, id"
        drives = connection.execute(query, args).fetchall()
        assigned = 0
        ambiguous = 0
        skipped_existing = 0
        for drive_id, drive_vehicle_id, started_at, ended_at in drives:
            if connection.execute(
                "SELECT 1 FROM drive_gps_points WHERE drive_id=? LIMIT 1", (drive_id,)
            ).fetchone():
                skipped_existing += 1
                continue
            overlaps = connection.execute(
                "SELECT count(*) FROM drives WHERE vehicle_id=? AND id<>? "
                "AND started_at < ? AND ended_at > ?",
                (drive_vehicle_id, drive_id, ended_at, started_at),
            ).fetchone()[0]
            if overlaps:
                ambiguous += 1
                continue
            rows = connection.execute(
                "SELECT id FROM gps_points WHERE vehicle_id=? AND recorded_at>=? "
                "AND recorded_at<=? ORDER BY recorded_at, id",
                (drive_vehicle_id, started_at, ended_at),
            ).fetchall()
            for ordinal, row in enumerate(rows):
                connection.execute(
                    "INSERT OR IGNORE INTO drive_gps_points "
                    "(drive_id,gps_point_id,ordinal,association_source) "
                    "VALUES(?,?,?,?)",
                    (drive_id, row[0], ordinal, "interval_reconstructed"),
                )
            assigned += len(rows)
        return {"assigned": assigned, "ambiguous_drives": ambiguous, "skipped_existing": skipped_existing}

    def route_segments(self, vehicle_id: str, trip_id: str | None = None, drive_ids: list[str] | None = None) -> list[dict]:
        """Return persisted route segments; never infer a route silently."""
        if self.connection is None:
            raise RuntimeError("store is not open")
        if drive_ids == []:
            return []
        args: list = [vehicle_id]
        query = "SELECT d.id, d.started_at, d.ended_at, d.source FROM drives d"
        if trip_id:
            query += " JOIN trip_drives td ON td.drive_id=d.id AND td.trip_id=?"
            args.insert(0, trip_id)
        query += " WHERE d.vehicle_id=?"
        if drive_ids is not None:
            query += " AND d.id IN (" + ",".join("?" for _ in drive_ids) + ")"
            args.extend(drive_ids)
        rows = self.connection.execute(query + " ORDER BY d.started_at, d.id", args).fetchall()
        result = []
        for drive in rows:
            points = connection_rows = self.connection.execute(
                "SELECT p.recorded_at,p.latitude,p.longitude,p.accuracy_m,dgp.association_source "
                "FROM drive_gps_points dgp JOIN gps_points p ON p.id=dgp.gps_point_id "
                "WHERE dgp.drive_id=? ORDER BY dgp.ordinal",
                (drive[0],),
            ).fetchall()
            result.append({
                "drive_id": drive[0], "started_at": drive[1], "ended_at": drive[2], "source": drive[3],
                "points": [dict(row) for row in points],
                "association_sources": sorted({row[4] for row in points}),
            })
        return result

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

    def create_trip(self, vehicle_id: str, title: str, started_at: datetime | None, now: datetime, *, description: str = "", destination: str = "", status: str = "planned", start_date: str | None = None, end_date: str | None = None) -> str:
        trip_id = str(uuid.uuid4())
        with self.transaction() as connection:
            stamp = utc_iso(now)
            connection.execute("INSERT INTO trips(id,vehicle_id,title,started_at,status,created_at,updated_at,description,destination,start_date,end_date) VALUES(?,?,?,?,?,?,?,?,?,?,?)", (trip_id, vehicle_id, title.strip(), utc_iso(started_at or now), status, stamp, stamp, description.strip(), destination.strip(), start_date, end_date))
        return trip_id

    def list_trips(self, vehicle_id: str | None = None) -> list[dict]:
        if self.connection is None: raise RuntimeError("store is not open")
        query = "SELECT * FROM trips"
        args: tuple = ()
        if vehicle_id:
            query += " WHERE vehicle_id=?"; args = (vehicle_id,)
        rows = self.connection.execute(query + " ORDER BY started_at DESC", args).fetchall()
        return [dict(row) for row in rows]

    def update_trip(self, trip_id: str, now: datetime, **fields) -> None:
        allowed = {"title", "description", "destination", "started_at", "ended_at", "status", "start_date", "end_date"}
        changes = {key: value for key, value in fields.items() if key in allowed}
        if not changes: return
        if "started_at" in changes and isinstance(changes["started_at"], datetime): changes["started_at"] = utc_iso(changes["started_at"])
        if "ended_at" in changes and isinstance(changes["ended_at"], datetime): changes["ended_at"] = utc_iso(changes["ended_at"])
        changes["updated_at"] = utc_iso(now)
        with self.transaction() as connection:
            current = connection.execute("SELECT start_date, end_date FROM trips WHERE id=?", (trip_id,)).fetchone()
            if current is None:
                raise ValueError("trip_not_found")
            proposed_start = changes.get("start_date", current[0])
            proposed_end = changes.get("end_date", current[1])
            if proposed_start and proposed_end and proposed_end < proposed_start:
                raise ValueError("trip_date_range_invalid")
            assignments = ",".join(f"{key}=?" for key in changes)
            cursor = connection.execute(f"UPDATE trips SET {assignments} WHERE id=?", (*changes.values(), trip_id))
            if cursor.rowcount != 1: raise ValueError("trip_not_found")

    def delete_trip(self, trip_id: str) -> None:
        with self.transaction() as connection:
            connection.execute("DELETE FROM trips WHERE id=?", (trip_id,))

    def link_drives(self, trip_id: str, drive_ids: list[str], now: datetime) -> None:
        with self.transaction() as connection:
            trip = connection.execute("SELECT vehicle_id FROM trips WHERE id=?", (trip_id,)).fetchone()
            if trip is None: raise ValueError("trip_not_found")
            for drive_id in drive_ids:
                drive = connection.execute("SELECT vehicle_id FROM drives WHERE id=?", (drive_id,)).fetchone()
                if drive is None: raise ValueError("drive_not_found")
                if drive[0] != trip[0]: raise ValueError("vehicle_mismatch")
                try:
                    connection.execute("INSERT INTO trip_drives(trip_id,drive_id,linked_at) VALUES(?,?,?)", (trip_id, drive_id, utc_iso(now)))
                except sqlite3.IntegrityError as err:
                    raise ValueError("drive_already_assigned") from err

    def unlink_drive(self, trip_id: str, drive_id: str) -> None:
        with self.transaction() as connection:
            connection.execute("DELETE FROM trip_drives WHERE trip_id=? AND drive_id=?", (trip_id, drive_id))

    def list_drives(self, vehicle_id: str, *, trip_id: str | None = None) -> list[dict]:
        if self.connection is None: raise RuntimeError("store is not open")
        query = "SELECT d.*, td.trip_id FROM drives d LEFT JOIN trip_drives td ON td.drive_id=d.id WHERE d.vehicle_id=?"
        args: list = [vehicle_id]
        if trip_id: query += " AND td.trip_id=?"; args.append(trip_id)
        return self._with_saved_place_labels(vehicle_id, trip_id, [self._drive_dict(row) for row in self.connection.execute(query + " ORDER BY d.started_at DESC", args).fetchall()])

    def list_trip_interruptions(self, vehicle_id: str, trip_id: str) -> list[dict]:
        """Derive gaps between consecutive assigned drives without persisting them.

        A gap only proves that no assigned drive is stored for that interval.  It
        is intentionally not a GPS stay and never creates a stop by itself.
        Endpoint coordinates are returned only when an actual associated GPS
        point exists for the adjacent drive.
        """
        if self.connection is None:
            raise RuntimeError("store is not open")
        trip = self.connection.execute(
            "SELECT vehicle_id FROM trips WHERE id=?", (trip_id,)
        ).fetchone()
        if trip is None:
            raise ValueError("trip_not_found")
        if trip[0] != vehicle_id:
            raise ValueError("vehicle_mismatch")
        drives = self.connection.execute(
            "SELECT d.id,d.started_at,d.ended_at FROM drives d "
            "JOIN trip_drives td ON td.drive_id=d.id "
            "WHERE td.trip_id=? AND d.vehicle_id=? "
            "ORDER BY d.started_at,d.id",
            (trip_id, vehicle_id),
        ).fetchall()
        result: list[dict] = []
        for previous, following in zip(drives, drives[1:]):
            previous_end = datetime.fromisoformat(previous[2])
            following_start = datetime.fromisoformat(following[1])
            seconds = int((following_start - previous_end).total_seconds())
            if seconds <= 0:
                continue
            last = self.connection.execute(
                "SELECT p.recorded_at,p.latitude,p.longitude "
                "FROM drive_gps_points dgp JOIN gps_points p ON p.id=dgp.gps_point_id "
                "WHERE dgp.drive_id=? ORDER BY dgp.ordinal DESC LIMIT 1",
                (previous[0],),
            ).fetchone()
            first = self.connection.execute(
                "SELECT p.recorded_at,p.latitude,p.longitude "
                "FROM drive_gps_points dgp JOIN gps_points p ON p.id=dgp.gps_point_id "
                "WHERE dgp.drive_id=? ORDER BY dgp.ordinal LIMIT 1",
                (following[0],),
            ).fetchone()
            existing = self.connection.execute(
                "SELECT s.id,s.name,s.place_type,s.stop_type,s.arrived_at,s.departed_at,od.place_kind "
                "FROM stops s LEFT JOIN overnight_details od ON od.place_id=s.id "
                "WHERE s.vehicle_id=? AND s.trip_id=? "
                "AND s.arrived_at IS NOT NULL AND s.departed_at IS NOT NULL "
                "AND s.arrived_at < ? AND s.departed_at > ? ORDER BY s.occurred_at",
                (vehicle_id, trip_id, following[1], previous[2]),
            ).fetchall()
            interruption_id = f"{previous[0]}:{following[0]}"
            link = self.connection.execute(
                "SELECT status,stop_id FROM interruption_links WHERE trip_id=? AND interruption_id=?",
                (trip_id, interruption_id),
            ).fetchone()
            overnight = False
            if link and link[1]:
                overnight = self.connection.execute(
                    "SELECT 1 FROM overnight_details WHERE place_id=?", (link[1],)
                ).fetchone() is not None
            # A matching time window is only a candidate.  It is not an
            # explicit user decision and must never change the interruption
            # status or hide the assignment action.
            status = link[0] if link else "unassigned"
            stop_id = link[1] if link else None
            existing_place_name = None
            if stop_id:
                place = self.connection.execute(
                    "SELECT name FROM stops WHERE id=? AND vehicle_id=? AND (trip_id=? OR trip_id IS NULL)",
                    (stop_id, vehicle_id, trip_id),
                ).fetchone()
                existing_place_name = place[0] if place else None
            candidates = [
                {
                    "id": candidate[0],
                    "name": candidate[1],
                    "place_type": candidate[2],
                    "stop_type": candidate[3],
                    "arrived_at": candidate[4],
                    "departed_at": candidate[5],
                    "place_kind": candidate[6],
                }
                for candidate in existing
            ] if not link else []
            result.append({
                "id": interruption_id,
                "status": status,
                "previous_drive_id": previous[0],
                "next_drive_id": following[0],
                "started_at": previous[2],
                "ended_at": following[1],
                "duration_seconds": seconds,
                "previous_end_point": dict(last) if last else None,
                "next_start_point": dict(first) if first else None,
                "existing_place_id": stop_id,
                "existing_place_name": existing_place_name,
                "existing_places": candidates,
            })
        return result

    def _interruption_row(self, trip_id: str, interruption_id: str):
        """Resolve a derived interruption without trusting client-supplied times."""
        if self.connection is None:
            raise RuntimeError("store is not open")
        parts = interruption_id.split(":", 1)
        if len(parts) != 2:
            raise ValueError("interruption_not_found")
        row = self.connection.execute(
            "SELECT d1.vehicle_id,d1.id AS previous_drive_id,d2.id AS next_drive_id "
            "FROM drives d1 JOIN drives d2 ON d2.id=? "
            "JOIN trip_drives t1 ON t1.drive_id=d1.id AND t1.trip_id=? "
            "JOIN trip_drives t2 ON t2.drive_id=d2.id AND t2.trip_id=? "
            "WHERE d1.id=? AND d1.ended_at < d2.started_at",
            (parts[1], trip_id, trip_id, parts[0]),
        ).fetchone()
        if row is None:
            raise ValueError("interruption_not_found")
        return row

    def assign_interruption(self, trip_id: str, interruption_id: str, now: datetime, *, status: str, stop_id: str | None = None) -> None:
        """Store a reversible, confirmed user decision for a derived gap."""
        if status not in {"unassigned", "stop", "overnight", "pause", "ignored"}:
            raise ValueError("interruption_status_invalid")
        row = self._interruption_row(trip_id, interruption_id)
        if status in {"stop", "overnight"}:
            if not stop_id:
                raise ValueError("interruption_place_required")
            place = self.connection.execute(
                "SELECT vehicle_id,trip_id FROM stops WHERE id=?", (stop_id,)
            ).fetchone()
            if place is None:
                raise ValueError("place_not_found")
            if place[0] != row[0] or place[1] not in (None, trip_id):
                raise ValueError("vehicle_mismatch")
        else:
            stop_id = None
        stamp = utc_iso(now)
        with self.transaction() as connection:
            connection.execute(
                "INSERT INTO interruption_links(trip_id,interruption_id,previous_drive_id,next_drive_id,status,stop_id,created_at,updated_at) "
                "VALUES(?,?,?,?,?,?,?,?) ON CONFLICT(trip_id,interruption_id) DO UPDATE SET "
                "previous_drive_id=excluded.previous_drive_id,next_drive_id=excluded.next_drive_id,status=excluded.status,stop_id=excluded.stop_id,updated_at=excluded.updated_at",
                (trip_id, interruption_id, row[1], row[2], status, stop_id, stamp, stamp),
            )

    def create_stop_from_interruption(self, trip_id: str, interruption_id: str, now: datetime, *, name: str, place_type: str = "other", overnight: bool = False, address: str = "", description: str = "", website_url: str | None = None) -> str:
        """Create one place and its interruption link atomically and idempotently."""
        row = self._interruption_row(trip_id, interruption_id)
        drives = self.connection.execute(
            "SELECT started_at,ended_at FROM drives WHERE id IN (?,?) ORDER BY started_at",
            (row[1], row[2]),
        ).fetchall()
        started = datetime.fromisoformat(drives[0][1])
        ended = datetime.fromisoformat(drives[1][0])
        points = self.connection.execute(
            "SELECT p.latitude,p.longitude FROM drive_gps_points dgp JOIN gps_points p ON p.id=dgp.gps_point_id WHERE dgp.drive_id=? ORDER BY dgp.ordinal DESC LIMIT 1",
            (row[1],),
        ).fetchone()
        stop = type("InterruptionStop", (), {
            "id": "", "vehicle_id": row[0], "trip_id": trip_id, "drive_id": row[1],
            "name": name, "occurred_at": started, "arrived_at": started, "departed_at": ended,
            "latitude": points[0] if points else None, "longitude": points[1] if points else None,
            "description": description, "stop_type": place_type, "place_type": place_type,
            "address": address, "source": "interruption", "automatic": False, "confirmed": True,
        })()
        status = "overnight" if overnight else "stop"
        with self.transaction() as connection:
            # BEGIN IMMEDIATE serializes competing writers before the
            # idempotency check. The losing request therefore reuses the
            # committed link instead of racing into a second INSERT.
            existing = connection.execute(
                "SELECT stop_id FROM interruption_links WHERE trip_id=? AND interruption_id=?",
                (trip_id, interruption_id),
            ).fetchone()
            if existing and existing[0] and connection.execute(
                "SELECT 1 FROM stops WHERE id=?", (existing[0],)
            ).fetchone():
                return existing[0]
            stop_id = self._insert_stop(connection, stop, now)
            if overnight:
                website = normalize_website_url(website_url)
                stamp = utc_iso(now)
                connection.execute("INSERT INTO overnight_details(place_id,place_kind,website_url,booking_note,large_rv_suitable,created_at,updated_at) VALUES(?,?,?,?,?,?,?)", (stop_id, place_type, website, None, None, stamp, stamp))
            stamp = utc_iso(now)
            connection.execute(
                "INSERT INTO interruption_links(trip_id,interruption_id,previous_drive_id,next_drive_id,status,stop_id,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?)",
                (trip_id, interruption_id, row[1], row[2], status, stop_id, stamp, stamp),
            )
        return stop_id

    def list_available_drives(self, vehicle_id: str) -> list[dict]:
        if self.connection is None: raise RuntimeError("store is not open")
        return self._with_saved_place_labels(vehicle_id, None, [self._drive_dict(row) for row in self.connection.execute("SELECT d.*, NULL AS trip_id FROM drives d LEFT JOIN trip_drives td ON td.drive_id=d.id WHERE d.vehicle_id=? AND td.drive_id IS NULL ORDER BY d.started_at DESC", (vehicle_id,)).fetchall()])

    def _with_saved_place_labels(self, vehicle_id: str, trip_id: str | None, drives: list[dict]) -> list[dict]:
        """Use one unambiguous, same-trip saved place for a coordinate label."""
        if not trip_id:
            return drives
        places = self.connection.execute(
            "SELECT name,latitude,longitude,occurred_at,arrived_at,departed_at FROM stops "
            "WHERE vehicle_id=? AND trip_id=? AND confirmed=1 AND latitude IS NOT NULL AND longitude IS NOT NULL",
            (vehicle_id, trip_id),
        ).fetchall()
        for drive in drives:
            for prefix in ("start", "end"):
                label = drive.get(f"{prefix}_label")
                if label and not _is_coordinate_label(label):
                    continue
                lat, lon = drive.get(f"{prefix}_latitude"), drive.get(f"{prefix}_longitude")
                if not _valid_coordinates(lat, lon):
                    continue
                try:
                    endpoint_time = datetime.fromisoformat(drive[f"{'started' if prefix == 'start' else 'ended'}_at"])
                except (KeyError, TypeError, ValueError):
                    continue
                candidates = []
                for place in places:
                    distance = (float(place[1]) - float(lat)) ** 2 + (float(place[2]) - float(lon)) ** 2
                    if distance > 0.01 ** 2:
                        continue
                    try:
                        place_start = datetime.fromisoformat(place[4] or place[3])
                        place_end = datetime.fromisoformat(place[5] or place[3])
                    except (TypeError, ValueError):
                        continue
                    if place_start - timedelta(hours=24) <= endpoint_time <= place_end + timedelta(hours=24):
                        candidates.append(place)
                if len(candidates) == 1:
                    drive[f"{prefix}_label"] = candidates[0][0]
        return drives

    @staticmethod
    def _drive_dict(row) -> dict:
        result = dict(row)
        try:
            started = datetime.fromisoformat(result["started_at"])
            ended = datetime.fromisoformat(result["ended_at"])
            result["duration_seconds"] = max(0, int((ended - started).total_seconds()))
        except (KeyError, TypeError, ValueError):
            result["duration_seconds"] = 0
        result["assignment_status"] = "assigned" if result.get("trip_id") else "unassigned"
        result.setdefault("source", "gps")
        if not result.get("start_label") and _valid_coordinates(result.get("start_latitude"), result.get("start_longitude")):
            result["start_label"] = f"{result['start_latitude']:.5f}, {result['start_longitude']:.5f}"
        if not result.get("end_label") and _valid_coordinates(result.get("end_latitude"), result.get("end_longitude")):
            result["end_label"] = f"{result['end_latitude']:.5f}, {result['end_longitude']:.5f}"
        return result

    def create_manual_drive(self, vehicle_id: str, started_at: datetime, start_label: str, end_label: str, distance_km: float, duration_minutes: int | None, now: datetime, trip_id: str | None = None) -> str:
        if not start_label.strip() or not end_label.strip():
            raise ValueError("drive_location_required")
        if distance_km < 0:
            raise ValueError("drive_distance_invalid")
        if duration_minutes is not None and duration_minutes < 0:
            raise ValueError("drive_duration_invalid")
        drive_id = str(uuid.uuid4())
        ended_at = started_at + timedelta(minutes=duration_minutes or 0)
        with self.transaction() as connection:
            if connection.execute("SELECT 1 FROM vehicles WHERE id=?", (vehicle_id,)).fetchone() is None:
                raise ValueError("vehicle_not_found")
            if trip_id is not None:
                trip = connection.execute("SELECT vehicle_id FROM trips WHERE id=?", (trip_id,)).fetchone()
                if trip is None:
                    raise ValueError("trip_not_found")
                if trip[0] != vehicle_id:
                    raise ValueError("vehicle_mismatch")
            stamp = utc_iso(now)
            connection.execute("INSERT INTO drives(id,vehicle_id,started_at,ended_at,distance_m,end_reason,manual_distance_km,source,start_label,end_label,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)", (drive_id, vehicle_id, utc_iso(started_at), utc_iso(ended_at), distance_km * 1000, "manual", distance_km, "manual", start_label.strip(), end_label.strip(), stamp))
            if trip_id is not None:
                connection.execute("INSERT INTO trip_drives(trip_id,drive_id,linked_at) VALUES(?,?,?)", (trip_id, drive_id, stamp))
        return drive_id

    def update_manual_drive(self, drive_id: str, vehicle_id: str, started_at: datetime, start_label: str, end_label: str, distance_km: float, duration_minutes: int | None, now: datetime) -> None:
        if not start_label.strip() or not end_label.strip():
            raise ValueError("drive_location_required")
        if distance_km < 0:
            raise ValueError("drive_distance_invalid")
        if duration_minutes is not None and duration_minutes < 0:
            raise ValueError("drive_duration_invalid")
        ended_at = started_at + timedelta(minutes=duration_minutes or 0)
        with self.transaction() as connection:
            drive = connection.execute("SELECT vehicle_id, source FROM drives WHERE id=?", (drive_id,)).fetchone()
            if drive is None:
                raise ValueError("drive_not_found")
            if drive[0] != vehicle_id:
                raise ValueError("vehicle_mismatch")
            if drive[1] != "manual":
                raise ValueError("drive_not_manual")
            connection.execute("UPDATE drives SET started_at=?, ended_at=?, distance_m=?, manual_distance_km=?, start_label=?, end_label=? WHERE id=?", (utc_iso(started_at), utc_iso(ended_at), distance_km * 1000, distance_km, start_label.strip(), end_label.strip(), drive_id))

    def delete_manual_drive(self, drive_id: str, vehicle_id: str) -> None:
        with self.transaction() as connection:
            drive = connection.execute("SELECT vehicle_id, source FROM drives WHERE id=?", (drive_id,)).fetchone()
            if drive is None:
                raise ValueError("drive_not_found")
            if drive[0] != vehicle_id:
                raise ValueError("vehicle_mismatch")
            if drive[1] != "manual":
                raise ValueError("drive_not_manual")
            connection.execute("DELETE FROM trip_drives WHERE drive_id=?", (drive_id,))
            connection.execute("DELETE FROM drives WHERE id=?", (drive_id,))

    def _insert_stop(self, connection, stop, now: datetime) -> str:
        stop_id = stop.id or str(uuid.uuid4())
        vehicle = connection.execute("SELECT 1 FROM vehicles WHERE id=?", (stop.vehicle_id,)).fetchone()
        if vehicle is None:
            raise ValueError("vehicle_not_found")
        if stop.trip_id is not None:
            trip = connection.execute("SELECT vehicle_id FROM trips WHERE id=?", (stop.trip_id,)).fetchone()
            if trip is None:
                raise ValueError("trip_not_found")
            if trip[0] != stop.vehicle_id:
                raise ValueError("vehicle_mismatch")
        if stop.drive_id is not None:
            drive = connection.execute("SELECT vehicle_id FROM drives WHERE id=?", (stop.drive_id,)).fetchone()
            if drive is None:
                raise ValueError("drive_not_found")
            if drive[0] != stop.vehicle_id:
                raise ValueError("vehicle_mismatch")
        if stop.arrived_at and stop.departed_at and stop.departed_at < stop.arrived_at:
            raise ValueError("stop_time_range_invalid")
        stamp = utc_iso(now)
        place_type = stop.place_type or stop.stop_type
        connection.execute("INSERT INTO stops(id,vehicle_id,trip_id,drive_id,name,occurred_at,arrived_at,departed_at,latitude,longitude,description,stop_type,place_type,address,source,automatic,confirmed,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", (stop_id, stop.vehicle_id, stop.trip_id, stop.drive_id, stop.name.strip(), utc_iso(stop.occurred_at), utc_iso(stop.arrived_at) if stop.arrived_at else None, utc_iso(stop.departed_at) if stop.departed_at else None, stop.latitude, stop.longitude, stop.description.strip(), place_type, place_type, (stop.address or "").strip(), stop.source, int(stop.automatic), int(stop.confirmed), stamp, stamp))
        return stop_id

    def create_stop(self, stop, now: datetime) -> str:
        with self.transaction() as connection:
            return self._insert_stop(connection, stop, now)

    def list_stops(self, vehicle_id: str, trip_id: str | None = None) -> list[dict]:
        if self.connection is None: raise RuntimeError("store is not open")
        query = "SELECT s.*, od.place_kind, od.website_url, od.booking_note, od.large_rv_suitable, pr.overall AS rating_overall, pr.large_rv_access, pr.space_maneuvering, pr.facilities, pr.surroundings, pr.review_text, pr.rated_at FROM stops s LEFT JOIN overnight_details od ON od.place_id=s.id LEFT JOIN place_ratings pr ON pr.place_id=s.id WHERE s.vehicle_id=?"; args: list = [vehicle_id]
        if trip_id: query += " AND trip_id=?"; args.append(trip_id)
        query += " ORDER BY s.occurred_at"
        result = []
        for row in self.connection.execute(query, args).fetchall():
            item = dict(row)
            arrived = item.get("arrived_at") or item.get("occurred_at")
            departed = item.get("departed_at")
            item["duration_seconds"] = 0
            if arrived and departed:
                try:
                    item["duration_seconds"] = max(0, int((datetime.fromisoformat(departed) - datetime.fromisoformat(arrived)).total_seconds()))
                except ValueError:
                    pass
            item["confirmed"] = bool(item.get("confirmed", 1))
            item["automatic"] = bool(item.get("automatic", 0))
            result.append(item)
        return result

    def delete_stop(self, stop_id: str) -> None:
        with self.transaction() as connection: connection.execute("DELETE FROM stops WHERE id=?", (stop_id,))

    def update_stop(self, stop_id: str, now: datetime, **fields) -> None:
        allowed = {"trip_id", "drive_id", "name", "occurred_at", "arrived_at", "departed_at", "latitude", "longitude", "description", "stop_type", "place_type", "address", "source", "automatic", "confirmed"}
        changes = {key: value for key, value in fields.items() if key in allowed and value is not None}
        for key in ("occurred_at", "arrived_at", "departed_at"):
            if isinstance(changes.get(key), datetime):
                changes[key] = utc_iso(changes[key])
        if "name" in changes: changes["name"] = changes["name"].strip()
        if "address" in changes: changes["address"] = changes["address"].strip()
        if "place_type" in changes: changes["stop_type"] = changes["place_type"]
        if "arrived_at" in changes and "departed_at" in changes and changes["arrived_at"] and changes["departed_at"] and changes["departed_at"] < changes["arrived_at"]:
            raise ValueError("stop_time_range_invalid")
        if not changes: return
        changes["updated_at"] = utc_iso(now)
        assignments = ",".join(f"{key}=?" for key in changes)
        with self.transaction() as connection:
            current = connection.execute("SELECT vehicle_id FROM stops WHERE id=?", (stop_id,)).fetchone()
            if current is None:
                raise ValueError("stop_not_found")
            vehicle_id = current[0]
            if "trip_id" in changes and changes["trip_id"]:
                trip = connection.execute("SELECT vehicle_id FROM trips WHERE id=?", (changes["trip_id"],)).fetchone()
                if trip is None: raise ValueError("trip_not_found")
                if trip[0] != vehicle_id: raise ValueError("vehicle_mismatch")
            if "drive_id" in changes and changes["drive_id"]:
                drive = connection.execute("SELECT vehicle_id FROM drives WHERE id=?", (changes["drive_id"],)).fetchone()
                if drive is None: raise ValueError("drive_not_found")
                if drive[0] != vehicle_id: raise ValueError("vehicle_mismatch")
            cursor = connection.execute(f"UPDATE stops SET {assignments} WHERE id=?", (*changes.values(), stop_id))
            if cursor.rowcount != 1: raise ValueError("stop_not_found")

    def upsert_overnight_details(self, place_id: str, now: datetime, **fields) -> None:
        """Store only overnight-specific data in its normalized 1:1 table."""
        allowed = {"place_kind", "website_url", "booking_note", "large_rv_suitable"}
        changes = {key: value for key, value in fields.items() if key in allowed}
        if not changes:
            return
        if "website_url" in changes:
            changes["website_url"] = normalize_website_url(changes["website_url"])
        stamp = utc_iso(now)
        with self.transaction() as connection:
            if connection.execute("SELECT 1 FROM stops WHERE id=?", (place_id,)).fetchone() is None:
                raise ValueError("stop_not_found")
            existing = connection.execute("SELECT 1 FROM overnight_details WHERE place_id=?", (place_id,)).fetchone()
            if existing is None:
                values = {"place_kind": "other", "website_url": None, "booking_note": None, "large_rv_suitable": None, **changes}
                connection.execute("INSERT INTO overnight_details(place_id,place_kind,website_url,booking_note,large_rv_suitable,created_at,updated_at) VALUES(?,?,?,?,?,?,?)", (place_id, values["place_kind"], values["website_url"], values["booking_note"], values["large_rv_suitable"], stamp, stamp))
            else:
                changes["updated_at"] = stamp
                assignments = ",".join(f"{key}=?" for key in changes)
                connection.execute(f"UPDATE overnight_details SET {assignments} WHERE place_id=?", (*changes.values(), place_id))

    def upsert_place_rating(self, place_id: str, now: datetime, **fields) -> None:
        """Persist an optional rating; overall is independent and mandatory per rating."""
        allowed = {"overall", "large_rv_access", "space_maneuvering", "facilities", "surroundings", "review_text", "rated_at"}
        changes = {key: value for key, value in fields.items() if key in allowed}
        if "overall" not in changes or not isinstance(changes["overall"], int) or not 1 <= changes["overall"] <= 5:
            raise ValueError("rating_overall_invalid")
        for key in ("large_rv_access", "space_maneuvering", "facilities", "surroundings"):
            if changes.get(key) is not None and (not isinstance(changes[key], int) or not 1 <= changes[key] <= 5):
                raise ValueError("rating_criterion_invalid")
        changes["review_text"] = str(changes.get("review_text") or "").strip()
        stamp = utc_iso(now)
        with self.transaction() as connection:
            if connection.execute("SELECT 1 FROM stops WHERE id=?", (place_id,)).fetchone() is None:
                raise ValueError("stop_not_found")
            existing = connection.execute("SELECT 1 FROM place_ratings WHERE place_id=?", (place_id,)).fetchone()
            if existing is None:
                values = {key: changes.get(key) for key in ("overall", "large_rv_access", "space_maneuvering", "facilities", "surroundings", "review_text", "rated_at")}
                connection.execute("INSERT INTO place_ratings(place_id,overall,large_rv_access,space_maneuvering,facilities,surroundings,review_text,rated_at,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?)", (place_id, values["overall"], values["large_rv_access"], values["space_maneuvering"], values["facilities"], values["surroundings"], values["review_text"], values["rated_at"], stamp, stamp))
            else:
                changes["updated_at"] = stamp
                assignments = ",".join(f"{key}=?" for key in changes)
                connection.execute(f"UPDATE place_ratings SET {assignments} WHERE place_id=?", (*changes.values(), place_id))

    def delete_place_rating(self, place_id: str) -> None:
        with self.transaction() as connection:
            connection.execute("DELETE FROM place_ratings WHERE place_id=?", (place_id,))

    def list_stop_suggestions(self, vehicle_id: str, *, trip_id: str | None = None, status: str = "pending") -> list[dict]:
        if self.connection is None: raise RuntimeError("store is not open")
        if status not in {"pending", "accepted", "dismissed", "all"}:
            raise ValueError("suggestion_status_invalid")
        query = "SELECT * FROM stop_suggestions WHERE vehicle_id=?"
        args: list = [vehicle_id]
        if trip_id:
            query += " AND trip_id=?"; args.append(trip_id)
        if status != "all":
            query += " AND status=?"; args.append(status)
        return [dict(row) for row in self.connection.execute(query + " ORDER BY arrived_at", args).fetchall()]

    @staticmethod
    def _distance_m(latitude_a: float, longitude_a: float, latitude_b: float, longitude_b: float) -> float:
        earth = 6_371_000.0
        lat1, lat2 = radians(latitude_a), radians(latitude_b)
        dlat, dlon = lat2 - lat1, radians(longitude_b - longitude_a)
        value = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
        return 2 * earth * asin(min(1.0, sqrt(value)))

    def generate_stop_suggestions(self, vehicle_id: str, now: datetime, *, minimum_minutes: int = 10, radius_m: float = 150.0, max_gap_minutes: int = 10, trip_id: str | None = None) -> list[dict]:
        """Create pending suggestions from contiguous, gap-free stationary GPS windows.

        This never creates a confirmed stop and never treats a GPS outage as a stay.
        """
        if self.connection is None: raise RuntimeError("store is not open")
        if minimum_minutes < 1 or radius_m <= 0:
            raise ValueError("suggestion_parameters_invalid")
        if trip_id:
            trip = self.connection.execute("SELECT vehicle_id FROM trips WHERE id=?", (trip_id,)).fetchone()
            if trip is None:
                raise ValueError("trip_not_found")
            if trip["vehicle_id"] != vehicle_id:
                raise ValueError("trip_vehicle_mismatch")
            # A retrospective analysis must use the points actually assigned to
            # this trip.  The vehicle-wide fallback below is retained for the
            # existing maintenance/API use case where no trip is supplied.
            rows = self.connection.execute(
                "SELECT DISTINCT g.recorded_at,g.latitude,g.longitude,dgp.drive_id "
                "FROM gps_points AS g "
                "JOIN drive_gps_points AS dgp ON dgp.gps_point_id=g.id "
                "JOIN trip_drives AS td ON td.drive_id=dgp.drive_id "
                "WHERE g.vehicle_id=? AND td.trip_id=? "
                "ORDER BY g.recorded_at,g.id",
                (vehicle_id, trip_id),
            ).fetchall()
        else:
            rows = self.connection.execute("SELECT recorded_at,latitude,longitude,NULL AS drive_id FROM gps_points WHERE vehicle_id=? ORDER BY recorded_at,id", (vehicle_id,)).fetchall()
        candidates: list[tuple] = []
        window: list = []
        max_gap = timedelta(minutes=max_gap_minutes)
        minimum = timedelta(minutes=minimum_minutes)
        def flush() -> None:
            nonlocal window
            if len(window) >= 2:
                start = datetime.fromisoformat(window[0][0]); end = datetime.fromisoformat(window[-1][0])
                if end - start >= minimum:
                    lat = sum(float(row[1]) for row in window) / len(window)
                    lon = sum(float(row[2]) for row in window) / len(window)
                    drive_ids = {row[3] for row in window if row[3]}
                    candidates.append((start, end, lat, lon, next(iter(drive_ids)) if len(drive_ids) == 1 else None))
            window = []
        for row in rows:
            current = datetime.fromisoformat(row[0])
            if not window:
                window = [row]; continue
            previous = datetime.fromisoformat(window[-1][0])
            if current - previous > max_gap or self._distance_m(float(window[0][1]), float(window[0][2]), float(row[1]), float(row[2])) > radius_m:
                flush()
            window.append(row)
        flush()
        created: list[dict] = []
        with self.transaction() as connection:
            for start, end, lat, lon, drive_id in candidates:
                overlap = connection.execute("SELECT 1 FROM stops WHERE vehicle_id=? AND confirmed=1 AND latitude IS NOT NULL AND longitude IS NOT NULL AND ((arrived_at IS NULL AND occurred_at BETWEEN ? AND ?) OR (arrived_at <= ? AND (departed_at IS NULL OR departed_at >= ?))) LIMIT 1", (vehicle_id, utc_iso(start), utc_iso(end), utc_iso(end), utc_iso(start))).fetchone()
                if overlap:
                    continue
                duplicate_query = "SELECT 1 FROM stop_suggestions WHERE vehicle_id=? AND status IN ('pending','accepted') AND arrived_at=? AND abs(latitude-?) < 0.002 AND abs(longitude-?) < 0.002"
                duplicate_args: tuple = (vehicle_id, utc_iso(start), lat, lon)
                if trip_id:
                    duplicate_query += " AND (trip_id=? OR trip_id IS NULL)"
                    duplicate_args += (trip_id,)
                existing = connection.execute(duplicate_query, duplicate_args).fetchone()
                if existing:
                    continue
                suggestion_id = str(uuid.uuid4()); stamp = utc_iso(now)
                connection.execute("INSERT INTO stop_suggestions(id,vehicle_id,trip_id,drive_id,arrived_at,departed_at,latitude,longitude,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?)", (suggestion_id, vehicle_id, trip_id, drive_id, utc_iso(start), utc_iso(end), lat, lon, stamp, stamp))
                created.append(dict(connection.execute("SELECT * FROM stop_suggestions WHERE id=?", (suggestion_id,)).fetchone()))
        return created

    def accept_stop_suggestion(self, suggestion_id: str, now: datetime, *, name: str = "GPS-Stopp", place_type: str = "other", trip_id: str | None = None) -> str:
        if self.connection is None: raise RuntimeError("store is not open")
        row = self.connection.execute("SELECT * FROM stop_suggestions WHERE id=?", (suggestion_id,)).fetchone()
        if row is None: raise ValueError("suggestion_not_found")
        if row["status"] != "pending": raise ValueError("suggestion_not_pending")
        selected_trip = trip_id or row["trip_id"]
        stop = type("SuggestionStop", (), {"id": "", "vehicle_id": row["vehicle_id"], "trip_id": selected_trip, "drive_id": row["drive_id"], "name": name, "occurred_at": datetime.fromisoformat(row["arrived_at"]), "arrived_at": datetime.fromisoformat(row["arrived_at"]), "departed_at": datetime.fromisoformat(row["departed_at"]) if row["departed_at"] else None, "latitude": row["latitude"], "longitude": row["longitude"], "description": "", "stop_type": place_type, "place_type": place_type, "address": "", "source": "gps_suggestion", "automatic": True, "confirmed": True})()
        stop_id = self.create_stop(stop, now)
        with self.transaction() as connection:
            connection.execute("UPDATE stop_suggestions SET status='accepted',updated_at=? WHERE id=?", (utc_iso(now), suggestion_id))
        return stop_id

    def dismiss_stop_suggestion(self, suggestion_id: str, now: datetime) -> None:
        with self.transaction() as connection:
            cursor = connection.execute("UPDATE stop_suggestions SET status='dismissed',updated_at=? WHERE id=? AND status='pending'", (utc_iso(now), suggestion_id))
            if cursor.rowcount != 1: raise ValueError("suggestion_not_pending")

    def create_expense(self, expense, now: datetime) -> str:
        expense_id = expense.id or str(uuid.uuid4())
        amount_minor = validate_amount(expense.amount_minor)
        category = validate_expense_category(expense.category)
        currency = validate_expense_currency(expense.currency)
        fuel_amount, fuel_liters, fuel_price = resolve_fuel_values(
            amount_minor if category == "fuel" else amount_minor,
            expense.fuel_liters if category == "fuel" else None,
            expense.fuel_price_per_liter if category == "fuel" else None,
        )
        if fuel_amount is not None:
            amount_minor = fuel_amount
        occurred_on = expense.occurred_on or expense.occurred_at.astimezone(timezone.utc).date().isoformat()
        occurred_time = expense.occurred_time
        if occurred_time is not None and not re.fullmatch(r"(?:[01]\d|2[0-3]):[0-5]\d", occurred_time):
            raise ValueError("expense_time_invalid")
        with self.transaction() as connection:
            stamp = utc_iso(now)
            trip = connection.execute("SELECT vehicle_id FROM trips WHERE id=?", (expense.trip_id,)).fetchone()
            if trip is None:
                raise ValueError("trip_not_found")
            place_id = expense.place_id or expense.stay_id
            if place_id is not None:
                place = connection.execute("SELECT vehicle_id,trip_id FROM stops WHERE id=?", (place_id,)).fetchone()
                if place is None: raise ValueError("place_not_found")
                if place[0] != trip[0] or place[1] not in (None, expense.trip_id): raise ValueError("vehicle_mismatch")
            connection.execute("INSERT INTO expenses(id,trip_id,occurred_at,category,amount_minor,currency,note,created_at,updated_at,odometer_km,stay_id,place_id,occurred_on,occurred_time,fuel_liters,fuel_price_per_liter) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", (expense_id, expense.trip_id, utc_iso(expense.occurred_at), category, amount_minor, currency, expense.note, stamp, stamp, expense.odometer_km, expense.stay_id, place_id, occurred_on, occurred_time, fuel_liters, fuel_price))
        return expense_id

    def list_expenses(self, trip_id: str) -> list[dict]:
        if self.connection is None: raise RuntimeError("store is not open")
        return [dict(row) for row in self.connection.execute("SELECT e.*, s.name AS place_name FROM expenses e LEFT JOIN stops s ON s.id=COALESCE(e.place_id,e.stay_id) WHERE e.trip_id=? ORDER BY e.occurred_at DESC", (trip_id,)).fetchall()]

    def delete_expense(self, expense_id: str) -> None:
        with self.transaction() as connection:
            cursor = connection.execute("DELETE FROM expenses WHERE id=?", (expense_id,))
            if cursor.rowcount != 1:
                raise ValueError("expense_not_found")

    def update_expense(self, expense_id: str, now: datetime, **fields) -> None:
        allowed = {"trip_id", "occurred_at", "occurred_on", "occurred_time", "category", "amount_minor", "currency", "note", "odometer_km", "stay_id", "place_id", "fuel_liters", "fuel_price_per_liter"}
        nullable_fields = {"occurred_on", "occurred_time", "fuel_liters", "fuel_price_per_liter"}
        changes = {
            key: value for key, value in fields.items()
            if key in allowed and (value is not None or key in nullable_fields)
        }
        if "amount_minor" in changes: changes["amount_minor"] = validate_amount(changes["amount_minor"])
        if "category" in changes:
            try:
                changes["category"] = validate_expense_category(changes["category"])
            except ValueError:
                current = self.connection.execute("SELECT category FROM expenses WHERE id=?", (expense_id,)).fetchone()
                if current is None or changes["category"] != current[0]:
                    raise
                # Preserve an unknown historical value only when the submitted
                # value is byte-for-byte identical to the stored value.
                changes["category"] = current[0]
        if isinstance(changes.get("occurred_at"), datetime): changes["occurred_at"] = utc_iso(changes["occurred_at"])
        if "occurred_time" in changes and changes["occurred_time"] is not None and not re.fullmatch(r"(?:[01]\d|2[0-3]):[0-5]\d", changes["occurred_time"]):
            raise ValueError("expense_time_invalid")
        if "currency" in changes: changes["currency"] = validate_expense_currency(changes["currency"])
        if not changes: return
        changes["updated_at"] = utc_iso(now)
        assignments = ",".join(f"{key}=?" for key in changes)
        with self.transaction() as connection:
            current = connection.execute("SELECT trip_id,category,amount_minor,fuel_liters,fuel_price_per_liter FROM expenses WHERE id=?", (expense_id,)).fetchone()
            if current is None:
                raise ValueError("expense_not_found")
            category = changes.get("category", current[1])
            if category == "fuel":
                explicit_clear = any(key in changes and changes[key] is None for key in ("fuel_liters", "fuel_price_per_liter"))
                resolved_amount, resolved_liters, resolved_price = resolve_fuel_values(
                    changes.get("amount_minor", current[2]),
                    changes["fuel_liters"] if "fuel_liters" in changes else current[3],
                    changes["fuel_price_per_liter"] if "fuel_price_per_liter" in changes else current[4],
                    complete_missing=not explicit_clear,
                )
                if resolved_amount is not None:
                    changes["amount_minor"] = resolved_amount
                changes["fuel_liters"], changes["fuel_price_per_liter"] = resolved_liters, resolved_price
            else:
                changes["fuel_liters"] = None
                changes["fuel_price_per_liter"] = None
            assignments = ",".join(f"{key}=?" for key in changes)
            if "place_id" in changes and changes["place_id"]:
                place = connection.execute("SELECT 1 FROM stops WHERE id=? AND (trip_id IS NULL OR trip_id=?)", (changes["place_id"], current[0])).fetchone()
                if place is None: raise ValueError("place_not_found")
            cursor = connection.execute(f"UPDATE expenses SET {assignments} WHERE id=?", (*changes.values(), expense_id))
            if cursor.rowcount != 1: raise ValueError("expense_not_found")

    def auto_assign_drive(self, vehicle_id: str, drive_id: str, now: datetime) -> str | None:
        """Assign a newly detected drive only when exactly one trip is active."""
        with self.transaction() as connection:
            existing = connection.execute("SELECT trip_id FROM trip_drives WHERE drive_id=?", (drive_id,)).fetchone()
            if existing is not None:
                return existing[0]
            trips = connection.execute("SELECT id FROM trips WHERE vehicle_id=? AND status='active' ORDER BY started_at DESC", (vehicle_id,)).fetchall()
            if len(trips) != 1:
                return None
            trip_id = trips[0][0]
            drive = connection.execute("SELECT vehicle_id FROM drives WHERE id=?", (drive_id,)).fetchone()
            if drive is None or drive[0] != vehicle_id:
                return None
            connection.execute("INSERT INTO trip_drives(trip_id,drive_id,linked_at) VALUES(?,?,?)", (trip_id, drive_id, utc_iso(now)))
            return trip_id

    def expense_summary(self, trip_id: str) -> dict:
        if self.connection is None: raise RuntimeError("store is not open")
        rows = self.connection.execute("SELECT currency, SUM(amount_minor) total, category FROM expenses WHERE trip_id=? GROUP BY currency, category", (trip_id,)).fetchall()
        currencies = {row[0] for row in rows}
        return {"currency": next(iter(currencies)) if len(currencies) == 1 else None, "total_minor": sum(row[1] for row in rows) if len(currencies) <= 1 else None, "by_category": {row[2]: row[1] for row in rows} if len(currencies) <= 1 else {}, "mixed_currency": len(currencies) > 1}

    def gpx_conflicts(self, vehicle_id: str, preview) -> dict:
        """Return safe conflict metadata for a preview; never return coordinates."""
        if self.connection is None: raise RuntimeError("store is not open")
        duplicate_file = self.connection.execute("SELECT 1 FROM gpx_imports WHERE file_hash=?", (preview.file_hash,)).fetchone() is not None
        duplicate_points = sum(1 for item in preview.points if self.connection.execute("SELECT 1 FROM gpx_import_points WHERE point_key=?", (item.key,)).fetchone())
        overlaps = 0
        for drive in preview.drives:
            overlaps += self.connection.execute("SELECT count(*) FROM drives WHERE vehicle_id=? AND started_at < ? AND ended_at > ?", (vehicle_id, utc_iso(drive.ended_at), utc_iso(drive.started_at))).fetchone()[0]
        return {"duplicate_file": duplicate_file, "duplicate_points": duplicate_points, "overlapping_drives": overlaps}

    def import_gpx(self, vehicle_id: str, preview, trip_id: str | None, now: datetime, drive_keys: list[str] | None = None) -> dict:
        """Atomically import a confirmed preview with stable provenance."""
        from uuid import uuid5, NAMESPACE_URL
        with self.transaction() as connection:
            if connection.execute("SELECT 1 FROM vehicles WHERE id=?", (vehicle_id,)).fetchone() is None:
                raise ValueError("vehicle_not_found")
            if trip_id is not None:
                trip = connection.execute("SELECT vehicle_id FROM trips WHERE id=?", (trip_id,)).fetchone()
                if trip is None: raise ValueError("trip_not_found")
                if trip[0] != vehicle_id: raise ValueError("vehicle_mismatch")
            existing = connection.execute("SELECT 1 FROM gpx_imports WHERE file_hash=?", (preview.file_hash,)).fetchone()
            if existing is not None:
                raise ValueError("gpx_already_imported")
            stamp = utc_iso(now)
            selected = set(drive_keys) if drive_keys is not None else {item.key for item in preview.drives}
            selected_drives = [item for item in preview.drives if item.key in selected]
            for item in selected_drives:
                if connection.execute("SELECT 1 FROM drives WHERE vehicle_id=? AND started_at < ? AND ended_at > ? LIMIT 1", (vehicle_id, utc_iso(item.ended_at), utc_iso(item.started_at))).fetchone():
                    raise ValueError("gpx_overlap_conflict")
            connection.execute("INSERT INTO gpx_imports(file_hash,vehicle_id,imported_at,point_count,drive_count) VALUES(?,?,?,?,?)", (preview.file_hash, vehicle_id, stamp, len(preview.points), len(selected_drives)))
            point_count = 0
            for item in preview.points:
                cursor = connection.execute("INSERT OR IGNORE INTO gps_points(vehicle_id,recorded_at,latitude,longitude,accuracy_m,source_state,source_type) VALUES(?,?,?,?,?,?,?)", (vehicle_id, utc_iso(item.point.recorded_at), item.point.latitude, item.point.longitude, item.point.accuracy_m, item.point.source_state, "gpx"))
                row = connection.execute("SELECT id FROM gps_points WHERE vehicle_id=? AND recorded_at=? AND latitude=? AND longitude=?", (vehicle_id, utc_iso(item.point.recorded_at), item.point.latitude, item.point.longitude)).fetchone()
                connection.execute("INSERT INTO gpx_import_points(point_key,file_hash,gps_point_id) VALUES(?,?,?)", (item.key, preview.file_hash, row[0] if row else None))
                point_count += cursor.rowcount
            drive_count = 0
            for item in selected_drives:
                drive_id = str(uuid5(NAMESPACE_URL, f"camper-travel-journal:gpx:{preview.file_hash}:{item.key}"))
                drive = type("ImportedDrive", (), {"id": drive_id, "vehicle_id": vehicle_id, "started_at": item.started_at, "ended_at": item.ended_at, "distance_m": item.distance_m, "end_reason": item.reason, "manual_distance_km": None, "source": "gpx", "start_label": None, "end_label": None})()
                first_point = next((p for p in preview.points if p.key == item.point_keys[0]), None) if item.point_keys else None
                last_point = next((p for p in reversed(preview.points) if p.key == item.point_keys[-1]), None) if item.point_keys else None
                connection.execute("INSERT INTO drives(id,vehicle_id,started_at,ended_at,distance_m,end_reason,manual_distance_km,source,start_label,end_label,start_latitude,start_longitude,end_latitude,end_longitude,created_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", (drive.id, vehicle_id, utc_iso(drive.started_at), utc_iso(drive.ended_at), drive.distance_m, drive.end_reason, None, "gpx", None, None, first_point.point.latitude if first_point else None, first_point.point.longitude if first_point else None, last_point.point.latitude if last_point else None, last_point.point.longitude if last_point else None, stamp))
                connection.execute("INSERT INTO gpx_import_drives(drive_key,file_hash,drive_id) VALUES(?,?,?)", (item.key, preview.file_hash, drive_id))
                if trip_id is not None:
                    connection.execute("INSERT INTO trip_drives(trip_id,drive_id,linked_at) VALUES(?,?,?)", (trip_id, drive_id, stamp))
                for ordinal, point_key in enumerate(item.point_keys):
                    point_row = connection.execute(
                        "SELECT gps_point_id FROM gpx_import_points WHERE point_key=? AND file_hash=?",
                        (point_key, preview.file_hash),
                    ).fetchone()
                    if point_row and point_row[0] is not None:
                        connection.execute(
                            "INSERT OR IGNORE INTO drive_gps_points(drive_id,gps_point_id,ordinal,association_source) VALUES(?,?,?,?)",
                            (drive_id, point_row[0], ordinal, "gpx_exact"),
                        )
                drive_count += 1
            return {"file_hash": preview.file_hash, "points_imported": point_count, "drives_imported": drive_count, "trip_id": trip_id}


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

    async def async_call(self, method: str, *args, **kwargs):
        """Run a repository method off the event loop."""
        if kwargs:
            async with self._lock:
                return await asyncio.to_thread(lambda: getattr(self.store, method)(*args, **kwargs))
        return await self._call(method, *args)

    async def async_insert_point(self, point): return await self._call("insert_point", point)
    async def async_insert_drive(self, drive): return await self._call("insert_drive", drive)
    async def async_insert_vehicle(self, *args): return await self._call("insert_vehicle", *args)
    async def async_load_recent_points(self, *args): return await self._call("load_recent_points", *args)
