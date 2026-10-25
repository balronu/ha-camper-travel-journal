# Camper Travel Journal v0.3.11 Stable Hotfix

## Deutsch

- GPS-Fahrten können jetzt direkt in der zentralen Journal-Card gelöscht werden. Das Papierkorb-Symbol erscheint dezent im jeweiligen Fahrtdetail.
- Der Bestätigungsdialog zeigt Datum, Uhrzeit und Strecke und weist ausdrücklich darauf hin, dass GPS-Rohpunkte erhalten bleiben.
- Nach bestätigter Löschung aktualisiert sich die geöffnete Fahrtenliste sofort.
- Es wird ausschließlich die bereits vorhandene sichere `delete_drive`-API verwendet. Die dauerhaften Ausschlüsse aus Schema 14 verhindern weiterhin die automatische Wiedererzeugung exakt gelöschter GPS-Fahrten.
- Bestehende Aufenthalte, Kosten, Reisen und GPS-Rohdaten werden nicht gelöscht oder verändert.
- Dialog und Aktionsflächen sind für schmale mobile/iOS-Ansichten ausgelegt.

**Kompatibilität und Update:** Der Hotfix aktualisiert die Frontend-Ressource auf `v0.3.11`. Es ist keine Datenbankmigration, Installation in VM104 oder Home-Assistant-Neustart Bestandteil dieses Releases.

## English

- GPS drives can now be deleted directly in the central Journal Card. A discreet trash icon is shown in each drive detail.
- The confirmation dialog shows the date, time, and distance and explicitly states that raw GPS points are retained.
- The open drive list refreshes immediately after a confirmed deletion.
- The existing safe `delete_drive` API is reused. Schema 14 durable exclusions continue to prevent an exactly deleted GPS drive from being recreated automatically.
- Existing stays, costs, trips, and raw GPS data are not deleted or changed.
- The dialog and actions are designed for narrow mobile/iOS layouts.

**Compatibility and update:** The hotfix updates the frontend resource to `v0.3.11`. No database migration, VM104 installation, or Home Assistant restart is part of this release.

**Known limitation:** This release does not delete any productive drive automatically. A productive deletion still requires an explicit user confirmation in the UI.
