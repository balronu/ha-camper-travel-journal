# Camper Travel Journal v0.3.8

## Deutsch

### Behoben

- „Vorschläge aktualisieren“ zeigt in der eingebetteten Journal-Card jetzt einen sichtbaren Ladezustand, Erfolg bzw. „keine neuen offenen Vorschläge“ und Backend-Fehler.
- Parallele Mehrfachklicks auf die historische Nachberechnung werden während eines laufenden Requests verhindert.

### Kompatibilität und Migration

- Stable-Patch auf Basis von v0.3.7; keine Datenbankmigration erforderlich.
- Bestehende Fahrten, Orte und Vorschläge werden nicht verändert.
- Nach der Installation kann die historische Nachberechnung weiterhin manuell über die Journal-Card gestartet werden.

### Einschränkungen

- Die produktive Installation auf VM104 ist nicht Bestandteil dieses Releases und bleibt unverändert.
- Ein iPhone-Praxistest muss nach der Installation mit einem authentifizierten Benutzer durchgeführt werden.

## English

### Fixed

- “Refresh suggestions” now shows loading, success, “no new open suggestions”, and backend errors in the embedded journal card.
- Concurrent clicks are blocked while historical suggestion generation is running.

### Compatibility and migration

- Stable patch based on v0.3.7; no database migration is required.
- Existing drives, places, and suggestions are not changed.
- Historical recalculation remains an explicit manual action in the journal card.

### Limitations

- Production installation on VM104 is outside this release and remains unchanged.
- An authenticated iPhone field test is still required after installation.
