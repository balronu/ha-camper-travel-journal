# Camper Travel Journal v0.4.0-beta.3

## Deutsch

### SQLite-Migrationssicherheit

- Alle versionierten Migrationen v3 bis v14 verwenden keinen `executescript()`-Aufruf mehr. Einzelne DDL-/DML-Statements bleiben in der kontrollierten Transaktion von `SQLiteStore.open()`.
- Schema-Version, Tabellen, Indizes und Daten werden bei einem Migrationsfehler gemeinsam zurückgerollt.
- Bestehende Schema-14-Datenbanken bleiben ohne erforderliche Migration bytegleich.
- Es gibt keine Tankbuch-Tabelle, keine Verbrauchsberechnung und keine Änderung an der Journal Card in dieser Sicherheits-Beta.

### Backup und Wiederherstellung

- Die neue Offline-Komponente nutzt die SQLite Online Backup API und validiert die tatsächlich erzeugte Datei mit `PRAGMA integrity_check`, `PRAGMA foreign_key_check` und SHA-256.
- Wiederherstellung überschreibt keine vorhandene Datei. Ein Downgrade erfolgt ausschließlich über eine zuvor geprüfte Sicherung im angehaltenen Zustand.
- Historische Schema-10-Datenbanken und realistische GPS-/Reise-/Kostenbestände wurden isoliert geprüft.

### Kompatibilität und Grenzen

- v0.3.13 bleibt Stable; v0.4.0-beta.3 ist ein GitHub-Pre-Release.
- Produktive Home-Assistant-Daten, VM104 und Dashboards wurden nicht verändert.
- Vor der Tankbuchentwicklung sind weitere CI-/Praxisprüfungen und die ausdrückliche Freigabe für den nächsten Implementierungsschritt erforderlich.

## English

### SQLite migration safety

- All versioned migrations v3 through v14 no longer use `executescript()`. Individual DDL/DML statements remain inside the controlled transaction opened by `SQLiteStore.open()`.
- Schema version, tables, indexes and data roll back together when a migration fails.
- Existing schema-14 databases remain byte-identical when no migration is required.
- This safety beta adds no fuel-log table, consumption calculation or Journal Card change.

### Backup and restore

- The new offline component uses SQLite Online Backup API and validates the actual generated file with `PRAGMA integrity_check`, `PRAGMA foreign_key_check` and SHA-256.
- Restore never overwrites an existing file. Downgrades are supported only by restoring a previously verified backup while the owning application is stopped.
- Historical schema-10 databases and realistic GPS/trip/expense data were checked in isolation.

### Compatibility and limitations

- v0.3.13 remains Stable; v0.4.0-beta.3 is a GitHub pre-release.
- Productive Home Assistant data, VM104 and dashboards were not changed.
- Further CI/practical checks and explicit approval are required before fuel-log implementation proceeds.
