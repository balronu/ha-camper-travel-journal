# Camper Travel Journal v0.3.0-beta.9

Qualitätsrunde vor dem möglichen Stable-Release.

## PDF-Reiseberichte

- Start und Ende werden als lesbare Datum-/Zeitwerte in eigenen, ausreichend breiten Spalten dargestellt.
- Tabellen verwenden umbruchfähige Zellen, wiederholte Kopfzeilen und automatische Seitenumbrüche.
- Ortskategorien werden lokalisiert; interne Werte wie `rv_site` erscheinen nicht mehr im Bericht.
- Aufenthaltsstatus, Bewertungen, Adressen, Webseiten, Notizen und Ausgaben bleiben erhalten.
- Dauerwerte werden konsistent mit Half-up-Rundung auf die nächste Minute gerundet; Quelldaten werden nicht verändert.

## Fehlerbehandlung

WebSocket-Fehler liefern stabile, nicht-sensitive Fehlercodes. Erfolgreiches Speichern bleibt von einem anschließenden fehlgeschlagenen Refresh unterscheidbar.

## Grenzen

Diese Beta enthält keine Migration und ändert keine produktiven Home-Assistant-Daten. Stable, Tag und Release sind Gegenstand eines unabhängigen Reviews.
