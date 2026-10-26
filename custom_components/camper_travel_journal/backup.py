"""Offline-safe SQLite backup and restore helpers.

The helpers use SQLite's Online Backup API so a WAL database is copied as a
consistent database image rather than by copying only its ``.db`` file.
Restore intentionally refuses to overwrite an existing path.  Callers must
stop the owning application and choose an explicit, empty destination.
"""

from __future__ import annotations

from dataclasses import dataclass
import hashlib
from pathlib import Path
import sqlite3


@dataclass(frozen=True)
class DatabaseEvidence:
    path: Path
    sha256: str
    integrity_check: str
    foreign_key_errors: tuple[str, ...]
    page_count: int


def _sha256(path: Path) -> str:
    digest = hashlib.sha256()
    with path.open("rb") as handle:
        for chunk in iter(lambda: handle.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()


def validate_database(path: str | Path) -> DatabaseEvidence:
    """Validate a closed SQLite database and hash the actual database file."""
    database_path = Path(path)
    if not database_path.is_file():
        raise FileNotFoundError(database_path)
    connection = sqlite3.connect(f"file:{database_path}?mode=ro", uri=True)
    try:
        connection.execute("PRAGMA foreign_keys = ON")
        integrity = connection.execute("PRAGMA integrity_check").fetchone()[0]
        foreign_keys = tuple(
            "|".join(str(value) for value in row)
            for row in connection.execute("PRAGMA foreign_key_check")
        )
        if integrity != "ok" or foreign_keys:
            raise ValueError(
                f"database validation failed: integrity={integrity!r}, "
                f"foreign_keys={foreign_keys!r}"
            )
        page_count = int(connection.execute("PRAGMA page_count").fetchone()[0])
    finally:
        connection.close()
    return DatabaseEvidence(database_path, _sha256(database_path), integrity, foreign_keys, page_count)


def backup_database(source: str | Path, destination: str | Path) -> DatabaseEvidence:
    """Create and validate a consistent backup using SQLite Online Backup."""
    source_path = Path(source)
    destination_path = Path(destination)
    if not source_path.is_file():
        raise FileNotFoundError(source_path)
    if destination_path.exists():
        raise FileExistsError(destination_path)
    destination_path.parent.mkdir(parents=True, exist_ok=True)
    source_connection = sqlite3.connect(source_path)
    destination_connection = sqlite3.connect(destination_path)
    try:
        source_connection.backup(destination_connection)
        destination_connection.commit()
    finally:
        destination_connection.close()
        source_connection.close()
    return validate_database(destination_path)


def restore_database(backup: str | Path, destination: str | Path) -> DatabaseEvidence:
    """Restore a validated backup into a new, offline destination database."""
    backup_path = Path(backup)
    destination_path = Path(destination)
    validate_database(backup_path)
    if destination_path.exists():
        raise FileExistsError(destination_path)
    destination_path.parent.mkdir(parents=True, exist_ok=True)
    source_connection = sqlite3.connect(backup_path)
    destination_connection = sqlite3.connect(destination_path)
    try:
        source_connection.backup(destination_connection)
        destination_connection.commit()
    finally:
        destination_connection.close()
        source_connection.close()
    return validate_database(destination_path)
