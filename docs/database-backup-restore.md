# SQLite backup and restore

The journal database uses SQLite in WAL mode. A backup must therefore be made
with SQLite's Online Backup API; copying only `journal.db` is not a complete
backup while the application is running.

`custom_components.camper_travel_journal.backup` provides two deliberately
conservative operations:

- `backup_database(source, destination)` creates a standalone database image,
  validates `PRAGMA integrity_check` and `PRAGMA foreign_key_check`, and
  returns the SHA-256 of the actual destination file.
- `restore_database(backup, destination)` validates the backup first and
  refuses to overwrite an existing destination. Restore is an offline
  operation: stop the owning Home Assistant/application before replacing a
  production database, and keep the original file until the restored copy has
  been checked.

The returned evidence records the file path, SHA-256, page count, and both
SQLite validation results. A hash of the active WAL database file alone is not
treated as a complete data-set hash.

Schema downgrades are not supported in place. Returning to an older release is
only supported by stopping the application and restoring a verified backup
created before the upgrade.
