# Camper Travel Journal v0.3.9

## Deutsch

### Behoben

- Exakte GPS-Fahrtintervalle werden über eine transaktional eindeutige Identität
  dedupliziert, auch wenn zwei Laufzeitinstanzen dieselbe Fahrt mit neuen UUIDs
  abschließen.
- Die Migration bewahrt vorhandene Fahrtzeilen unverändert und wählt nur eine
  kanonische Identität für zukünftige Schreibvorgänge; historische Fahrten
  werden nicht automatisch zusammengeführt oder gelöscht.
- Laufende bestätigte Aufenthalte dürfen ohne bekannte Abfahrtszeit bestehen.
  Eine Abfahrtszeit wird erst bei späterer echter Bewegung gespeichert.
- Automatische GPS-Stoppvorschläge bestätigen keinen Aufenthalt und erzeugen
  für einen laufenden Aufenthalt keine fiktive Abfahrtszeit.

### Kompatibilität und Migration

- Stable-Patch auf Basis von v0.3.8 mit additiver SQLite-Schema-Migration 13.
- Keine vorhandenen GPS-Punkte, Fahrten, Orte oder Vorschläge werden gelöscht
  oder zusammengeführt.
- Die Migration registriert bei exakten Alt-Duplikaten deterministisch die
  früheste Fahrt als kanonische Identität; die sichtbaren Altzeilen bleiben
  für eine separate, ausdrücklich freizugebende Bereinigung erhalten.

### Einschränkungen und erforderliche Schritte

- Die Installation auf VM104 ist nicht Bestandteil dieses Releases. Nach der
  Installation ist ein authentifizierter iPhone-/HA-Praxistest erforderlich.
- Die bestehende produktive Datenbank darf nicht automatisch bereinigt werden.

## English

### Fixed

- Exact GPS drive intervals now use a transactionally unique identity, even
  when two runtime instances finish the same drive with fresh UUIDs.
- The migration preserves existing drive rows and selects only a canonical
  identity for future writes; historical drives are not merged or deleted.
- Confirmed ongoing stays may remain stored without a known departure time.
  The departure is written only after later real movement is observed.
- Automatic GPS stop suggestions do not confirm a stay and do not invent a
  departure time for an ongoing stay.

### Compatibility and migration

- Stable patch based on v0.3.8 with additive SQLite schema migration 13.
- Existing GPS points, drives, places, and suggestions are not deleted or
  merged.
- For exact legacy duplicates, the migration deterministically registers the
  earliest drive as canonical while retaining all visible legacy rows for a
  separately authorized cleanup.

### Limitations and required steps

- Installation on VM104 is outside this release. An authenticated iPhone/HA
  field test is required after installation.
- The productive database must not be cleaned automatically.
