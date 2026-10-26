# Camper Travel Journal v0.4.0-beta.5

## Deutsch

### Behobene Fehler

- Das Tankbuch ist im Editor nicht mehr als „geplant“ deaktiviert. Die Aktivierung wird gespeichert und die Modulreihenfolge bleibt auch nach Deaktivieren, Reaktivieren und Reload erhalten.
- Dialoge für Kosten, Reisen, Aufenthalte, Fahrten und Tankbuch verwenden nur einen vertikalen Inhalts-Scrollbereich. Felder, Aktionen, Touch-Bedienung und Bildschirmtastatur bleiben erreichbar.
- Kosten werden nach tatsächlichem Ausgabedatum und vorhandener Uhrzeit absteigend sortiert. Einträge ohne Uhrzeit bleiben am richtigen Kalendertag; innerhalb eines Tages kommen zeitbehaftete Einträge zuerst, danach entscheidet die stabile ID.
- PDF-Ausgaben verwenden dieselbe Sortierregel.

### Kompatibilität und Grenzen

- Keine SQLite-Migration; Schema 15 bleibt unverändert.
- Keine bestehenden Kosten, Summen, GPS-Rohdaten, Fahrten, Aufenthalte, Reisen oder Tankbuchdaten werden verändert.
- v0.3.13 bleibt Stable. Dies ist ein GitHub-Pre-Release.
- Echte iPhone-/Safari-Abnahme ist nach Veröffentlichung noch erforderlich.

## English

### Fixed issues

- The fuel log is no longer disabled as “planned” in the editor. Activation is persisted and module order survives disable, re-enable and reload.
- Expense, trip, stay, drive and fuel-log dialogs now have exactly one vertical content scroll area. Fields, actions, touch input and the virtual keyboard remain reachable.
- Expenses are sorted newest first by actual expense date and recorded time. Entries without a time stay on the correct calendar day; timed entries come first within a day, then the stable ID is used.
- PDF expense lists use the same ordering rule.

### Compatibility and limits

- No SQLite migration; schema 15 is unchanged.
- Existing expenses, totals, raw GPS points, drives, stays, trips and fuel-log data are not modified.
- v0.3.13 remains Stable. This is a GitHub pre-release.
- Real iPhone/Safari acceptance is still required after publication.
