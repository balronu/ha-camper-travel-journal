# Camper Travel Journal v0.3.0

Camper Travel Journal v0.3.0 ist der Stable-Release nach der v0.3.0-Beta-Serie.

## Neue Funktionen

- Zentrale Journal Card für Reiseauswahl, Reiseverwaltung und gemeinsamen
  Reisekontext.
- Fahrten, Fahrtunterbrechungen, bestätigte Aufenthalte, Übernachtungsplätze,
  Bewertungen und Webseiten.
- Atomarer PAJ-GPX-1.1-Import mit Vorschau, Duplikatschutz und wählbarer
  Zielreise.
- Offlinefähige PDF-Reisekarte mit tatsächlichen GPS-Segmenten, Start-/Ziel-
  und Übernachtungsmarkern.

## Verbesserungen

- Kostenkategorien und Legacy-Werte werden beim Bearbeiten korrekt erhalten.
- Ausgabendatum und optionale Uhrzeit bleiben getrennt und lokalisiert.
- Responsive Reiseübersicht und Kostenverwaltung.
- PDF-Tabellen, Seitenumbrüche, Links, Bewertungen und Ortsdetails wurden
  erweitert.
- Identische PDF-Ortslabels werden deterministisch gruppiert; bei Überfüllung
  werden Labels kontrolliert ausgelassen und gemeldet.

## GPS, Ortsnamen und Datenschutz

- GPS-Koordinaten werden zentral validiert; ungültige Punkte werden sicher
  übersprungen.
- Manuelle Ortsnamen haben Vorrang. `zone.home` kann Fahrtendpunkte innerhalb
  eines konfigurierten Radius als „Zuhause“ anzeigen, ohne Aufenthalte anzulegen.
- Reverse Geocoding ist standardmäßig deaktiviert. Bei Aktivierung werden nur
  relevante Endpunkte an Nominatim übertragen; Cache, Timeout und
  Koordinatenfallback bleiben aktiv.
- Die Integration verwendet eine eigene lokale SQLite-Datei und keinen
  Recorder-/MariaDB-Adapter.

## Upgrade

Vor dem Upgrade bitte die Integrationsdatei sichern. Die Hinweise und Grenzen
stehen in [upgrade-v0.3.0.md](../upgrade-v0.3.0.md). Die v0.3.0 ist ein
Stable-Release, aber mobile Browser und produktive Installationen sollten
weiterhin mit den eigenen Daten praktisch geprüft werden.
