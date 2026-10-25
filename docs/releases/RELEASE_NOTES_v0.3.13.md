# Camper Travel Journal v0.3.13

## Deutsch

### Behoben

- Bestätigte laufende Aufenthalte ohne `departed_at` werden in der zentralen
  Journal Card als „Seit … · Aufenthalt läuft“ angezeigt.
- GPS-Stoppvorschläge ohne bekannte Abfahrt zeigen nicht mehr dieselbe Uhrzeit
  als künstliches Ende; bekannte Zeitspannen bleiben unverändert.
- Die Darstellung verwendet weiterhin die lokalisierten Datums- und
  Uhrzeitformate. Die bestehenden Aktionen zum Bearbeiten, Löschen, Bewerten
  und Übernehmen bleiben erhalten.

### Kompatibilität und Update

- Kein SQLite-Schema, keine Migration und keine Änderung produktiver Daten.
- Nach der Installation muss Home Assistant die versionierte Frontend-Ressource
  laden; ein HA-Neustart oder Reload wird von diesem Release nicht automatisch
  ausgelöst.

## English

### Fixed

- Confirmed ongoing stays without `departed_at` are shown in the central
  Journal Card as “Since … · Stay ongoing”.
- GPS stop suggestions without a known departure no longer display the arrival
  time as an artificial end; known time ranges remain unchanged.
- Localized date/time formatting remains in use. Existing edit, delete, rating,
  and accept actions are preserved.

### Compatibility and update

- No SQLite schema, migration, or productive data change is included.
- After installation, Home Assistant must load the versioned frontend resource;
  this release does not trigger an HA restart or reload automatically.

### Limitations

- This release changes presentation only. Backend stay finalization remains the
  existing `drive_started` behavior.
