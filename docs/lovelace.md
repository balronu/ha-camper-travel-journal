# Lovelace-Karten in v0.3.0

Camper Travel Journal liefert ein versioniertes Frontend-Bundle mit mehreren
Custom Elements. Die zentrale Journal Card ist für neue Dashboards empfohlen;
die älteren Karten bleiben für bestehende Dashboards kompatibel.

## Installation und Resource-Registrierung

Bei einer Installation über HACS registriert die Integration das Bundle
automatisch über Home Assistant. Eine zweite manuelle Resource mit derselben
Datei darf nicht angelegt werden. Nach einem Update kann ein harter Browser-
Reload erforderlich sein; die URL enthält die Integrationsversion als
Cache-Buster. Details stehen in [frontend-cache.md](frontend-cache.md).

Für YAML-Karten wird die `vehicle_id` der Config Entry benötigt. Sie ist nicht
der Anzeigename des Wohnmobils. Die visuelle Kartenauswahl kann die einzige
verfügbare Config Entry automatisch übernehmen.

## Zentrale Journal Card (empfohlen)

```yaml
type: custom:camper-travel-journal-journal-card
vehicle_id: <config-entry-id>
```

Die Karte bietet Reiseauswahl, Reiseöffnung und Reiseanlage. Nach dem Öffnen
werden Übersicht, Fahrten, Orte/Aufenthalte, Kosten, GPX-Import,
Reisekarte und PDF-Export im gemeinsamen Reisekontext angezeigt. Beim Schließen
werden die reisebezogenen Bereiche ausgeblendet. Die fünf Kennzahlen bleiben
unverändert; die Kachel heißt „Übernachtungen“.

## Kompakte und Legacy-Karten

```yaml
type: custom:camper-travel-journal-summary-card
vehicle_id: <config-entry-id>
```

```yaml
type: custom:camper-travel-journal-manager-card
vehicle_id: <config-entry-id>
```

```yaml
type: custom:camper-travel-journal-map-card
vehicle_id: <config-entry-id>
trip_id: <optional-trip-id>
```

```yaml
type: custom:camper-travel-journal-diagnostics-card
vehicle_id: <config-entry-id>
```

Summary, Manager und Map sind für bestehende Dashboards vorgesehen und zeigen
gegebenenfalls einen Migrationshinweis. Die Diagnostics Card bleibt unabhängig
und prüft Authentifizierung, Config Entries, Datenantworten und die erkannte
Frontend-Version.

### Unterstützte Map-Optionen

Die Map Card akzeptiert zusätzlich `tile_url` und `tile_attribution` für eine
fortgeschrittene, ausdrücklich konfigurierte Hintergrundkarte. Ohne Anbieter
bleibt die GPS-Route auf neutralem Hintergrund sichtbar. Die Karte zeichnet
gespeicherte GPX-/GPS-Segmente, berechnet keine Straßenroute und verwendet
keinen Geocoding-Dienst.

## Einrichtung

1. Integration über **Einstellungen → Geräte & Dienste** einrichten.
2. Fahrzeug, `device_tracker`, Aufzeichnungsoptionen und optional den
   Kartenanbieter konfigurieren.
3. Eine Karte über den visuellen Editor oder YAML hinzufügen.
4. Bei mehreren Fahrzeugen die jeweilige `vehicle_id` auswählen.
5. Eine Reise öffnen, bevor reisebezogene Aktionen verwendet werden.

Der Options-Flow unterstützt unter anderem Mindestintervall, Mindestbewegung,
Stopperkennung, GPS-Lücke, Maximalgeschwindigkeit, Aufbewahrung,
Kartenanbieter, Zuhause-Radius und Reverse Geocoding.

## Datenschutz und Ortsauflösung

`zone.home` wird nur zur Anzeige eines Fahrtendpunkts als „Zuhause“ innerhalb
des konfigurierten Radius verwendet. Es wird kein Aufenthalt angelegt und kein
GPX-Punkt geändert. Manuelle Ortsnamen haben Vorrang.

Reverse Geocoding ist standardmäßig deaktiviert. Bei Aktivierung werden nur
relevante Fahrtendpunkte an Nominatim gesendet; vollständige GPX-Tracks werden
nicht übertragen. Ergebnisse werden zwischengespeichert und bei Timeout,
Fehler oder Offlinebetrieb durch Koordinaten ersetzt. API-Schlüssel sind nicht
erforderlich und werden nicht im Frontend abgelegt.

## Darstellung und Fehlerbehebung

- Die zentrale Karte passt sich an Mobil- und Desktopbreiten an.
- Kosten, Datum und optionale Uhrzeit werden lokalisiert angezeigt.
- Wenn Tiles fehlen, bleibt die Route sichtbar und es erscheint ein Hinweis.
- Wenn keine gültigen GPS-Punkte vorhanden sind, zeigt die Map Card einen
  verständlichen Leerzustand; gültige Ortsmarker bleiben sichtbar.
- Nach HACS-Updates zuerst Browser-Cache leeren beziehungsweise hart laden.
- Bei Problemen Diagnostics Card öffnen und die Browser-Konsole sowie die
  WebSocket-Fehlermeldung redigiert für ein Issue sichern.

## Screenshots

Die reproduzierbaren synthetischen Darstellungen liegen unter
[docs/screenshots](screenshots/). Sie enthalten keine produktiven Adressen,
Tokens oder GPS-Daten.
