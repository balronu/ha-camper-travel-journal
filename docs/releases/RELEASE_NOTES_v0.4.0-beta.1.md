# Camper Travel Journal v0.4.0-beta.1

## Deutsch

### Inhalt

- Die zentrale Journal Card ist intern in konfigurierbare Module aufgeteilt.
- Der Karteneditor kann Bereiche aktivieren, deaktivieren und mit Nach-oben-/Nach-unten-Steuerung sortieren.
- Bestehende YAML-Konfigurationen ohne Moduldefinition verwenden weiterhin die bisherige Standardansicht.
- Das Tankbuch ist als zukünftiges Modul vorgemerkt, enthält in dieser Beta aber noch keine Tankdatenbank und keine Verbrauchsberechnung.
- Das Layout wurde für schmale mobile Ansichten verbessert.

### Kompatibilität und Grenzen

- Keine SQLite-Migration.
- Keine Änderung an GPS-Erkennung, Fahrten, Aufenthalten, Reisen, Kosten, GPX- oder PDF-Daten.
- Keine Abfragen an Mobile Fuel Stations, Camper Route Planner oder andere externe Provider.
- Diese Version ist ein echtes GitHub-Pre-Release und kein Stable-Release.

## English

### Included

- The central Journal Card is internally organized into configurable modules.
- The card editor can enable, disable and reorder sections with accessible move controls.
- Existing YAML configurations without a module list continue to use the previous default presentation.
- The fuel log is reserved as a future module; this beta contains no fuel database or consumption calculation.
- The layout was improved for narrow mobile views.

### Compatibility and limitations

- No SQLite migration.
- No changes to GPS detection, drives, stays, trips, expenses, GPX or PDF data.
- No requests to Mobile Fuel Stations, Camper Route Planner or other external providers.
- This is a GitHub pre-release, not a stable release.

### Validation

The release must be created only after the complete local and GitHub CI gates pass on the exact candidate commit.
