# Camper Travel Journal v0.1.0-beta.11

## Kostenkategorie und Karten-Synchronisierung

- Behebt die fehlerhafte Initialisierung des Kostenformulars, durch die die
  erste sichtbare Auswahl von `Stellplatz/Campingplatz` als `other` übertragen
  werden konnte.
- Verwendet stabile interne IDs (`camping`, `fuel`, `toll`, `parking`, `food`,
  `activities`, `other`) unabhängig von den deutschen Anzeigetexten.
- Prüft den `camping`-Roundtrip von Lovelace über WebSocket und Speicherung bis
  zur erneuten Anzeige; bestehende Daten werden nicht migriert oder automatisch
  umkategorisiert.
- Aktualisiert die Summary Card nach erfolgreichem Anlegen, Bearbeiten oder
  Löschen eines Kosteneintrags durch einen verlässlichen Backend-Reload.
- Verhindert Synchronisationsschleifen und unterdrückt die Aktualisierung bei
  fehlgeschlagenen Schreibvorgängen.

## Qualitätssicherung

- Regression für die Erstselektion von `camping` im Chromium-Browser-Harness.
- Regression für die kartenübergreifende Aktualisierung der Summary Card.
- Python-/HA-Tests, Frontend-Tests, TypeScript, Produktionsbundle,
  Chromium-Lifecycle, Compileall, JSON-, Hassfest-, HACS- und Secret-Scan-
  Prüfungen müssen vor der Veröffentlichung auf dem exakten Release-Commit
  erfolgreich sein.

Die separaten Home-Assistant-Meldungen zu `non-zero reserved bits` wurden nicht
verändert und bleiben außerhalb dieses Releases.
