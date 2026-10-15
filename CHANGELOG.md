# Änderungsprotokoll

🇩🇪 Deutsch | 🇬🇧 [English](README.en.md)

## 0.1.0-beta.14 – vorbereitet, noch nicht veröffentlicht

- Lokalisiert reine Kalenderdaten in Manager- und Summary Card ohne
  Zeitzonenverschiebung; interne Eingabewerte bleiben ISO-formatiert.
- Ergänzt read-only GPS-Collector-Diagnose mit Lebenszyklus-, Ereignis- und
  Verwerfungszählern sowie datenschutzsicherem Bericht ohne Koordinaten.
- Verarbeitet Tracker-Events auch bei unverändertem Zustand (`home`) mit
  aktualisierten GPS-Attributen und akzeptiert `gps_accuracy: 0`.
- Härtet die HA-2026.10-Callback-Registrierung und behandelt GPS-Lücken über
  zehn Minuten ohne künstliche Luftlinien-Entfernung.

## 0.1.0-beta.13 – veröffentlicht

- Behebt die Frontend-Registrierung nach einem HACS-Update: historische
  Camper-Travel-Journal-Extra-JS-URLs werden vor der aktuellen Bundle-URL
  entfernt.
- Die versionsgebundene URL für Cache-Busting bleibt erhalten, ohne alte und
  neue Bundles parallel zu registrieren.
- Ergänzt Browser-Regressionstests, die sichtbare Lit-Marker und JavaScript-
  Handler-Ausdrücke im DOM erkennen.

## 0.1.0-beta.11 – veröffentlicht

- Korrigiert die initiale Kostenkategorie `camping`, die zuvor beim ersten
  Speichern als `other` übertragen werden konnte.
- Verwendet kanonische interne Kostenkategorie-IDs unabhängig von den
  deutschen Anzeigenamen.
- Bewahrt `camping` über Auswahl, WebSocket, SQLite, Antwort und Reload; lehnt
  unbekannte Kategorien ohne Fallback auf `other` ab.
- Aktualisiert die Summary Card nach erfolgreichen Kostenänderungen erneut aus
  dem Backend.
- Macht den Details-Button zu einem Auf-/Zu-Umschalter und erhält den
  Detailzustand bei Kostenänderungen.
- Überarbeitet README, README.de, README.en und Roadmap grundlegend und hält
  den tatsächlichen Entwicklungsstand sowie offene Mobile-/Praxisprüfungen
  fest.
- Ergänzt API-, Storage-, Frontend- und Browser-Regressionstests ohne Migration
  oder automatische Änderung bestehender Einträge.

## 0.1.0-beta.12 – veröffentlicht

- Ergänzt optionale Start- und Enddaten für Reisen inklusive Bearbeitung und
  Anzeige in Manager- und Summary Card.
- Macht erkannte Fahrten mit Start/Ende, Entfernung, Dauer und Zuordnungsstatus
  sichtbar und hält Fahrzeuggrenzen sowie eindeutige Zuordnungen ein.
- Ergänzt getrennte manuelle Fahrten mit Startort, Zielort, Kilometern und
  optionaler Dauer; es werden keine künstlichen GPS-Punkte erzeugt. Manuelle
  Fahrten können bearbeitet und mit Sicherheitsbestätigung gelöscht werden;
  automatisch erkannte GPS-Fahrten bleiben geschützt.
- Führt Schema 5 mit rückwärtskompatibler Migration für Reisedaten und
  manuelle Fahrtmetadaten ein; die Migration ist transaktional und bei Fehlern
  wiederholbar.
- Aktualisiert die Summary Card nach bestätigten Reise-/Fahrtänderungen und
  dokumentiert Beta 12 als veröffentlichten Entwicklungsstand.

## 0.1.0-beta.10 – Vollständige Kostenverwaltung

- Korrigiert Kostenkategorien, Beträge und Reisezuordnung über die gesamte
  Frontend-/WebSocket-/Speicher-Kette.
- Berechnet Summen centgenau pro Reise und erhält bestehende Datensätze ohne
  automatische Umkategorisierung oder Datenbankmigration.
- Ersetzt die Kosten-Browser-Prompts durch ein responsives Bearbeitungsformular
  mit Kategorieauswahl, Betrag, Speichern/Abbrechen und robuster Fehleranzeige.
- Ergänzt Regressionstests für Kategorien, Bearbeitung, Löschen, Summen,
  Persistenz und die Beta-9-WebSocket-Registrierung.

## 0.1.0-beta.9 – WebSocket-Registrierung und iOS-Kopierfallback

- Registriert die WebSocket-Befehle beim Laden eines Config Entries und ergänzt
  einen echten HA-WebSocket-Regressionstest für `list` und `list_vehicles`.
- Prüft die vollständige Befehlsliste ohne schreibende Testoperation.
- Ergänzt eine manuell auswählbare Diagnosebericht-Ausgabe für iOS/Safari.

## 0.1.0-beta.8 – Read-only-WebSocket-Diagnose

- Ergänzt eine manuell startbare Diagnosekarte für authentifizierte
  `list_vehicles`- und `list`-Abfragen ohne Schreiboperationen.
- Maskiert IDs und gibt ausschließlich Status, Zeiten, Struktur und Zähler aus.
- Trennt Lade- und Aktionsfehler und entfernt veraltete Ladefehler nach einem
  erfolgreichen Refresh.
- Die Ursache der iOS-WebSocket-RSV-Fehler bleibt ausdrücklich offen.

## 0.1.0-beta.7 – Karteneditor-Lifecycle-Hotfix

- Liefert das korrigierte Frontend-Bundle tatsächlich aus.
- Stabilisiert native Fahrzeugauswahl, automatische Vorauswahl und Vorschau
  gegen wiederholte HA-State-Updates.
- Ergänzt einen realitätsnahen Chromium-Lifecycle-Test mit Custom Elements,
  simulierten WebSocket-Antworten und State-Updates.

## 0.1.0-beta.6 – Hotfix für Paketstruktur und HACS

- Übersetzungen liegen jetzt im offiziellen Integrationspfad und werden durch
  einen Regressionstest gegen ein versehentliches Root-Verzeichnis geschützt.
- README-Bilder verwenden dauerhaft erreichbare absolute GitHub-Raw-URLs.
- HACS-Pre-Release-Auswahl, `main`-Synchronisierung und lokale/HACS/Update-
  Branding-Grenzen sind dokumentiert.

## 0.1.0-beta.2 – Reiseverwaltung und Lovelace-Karten

- Reiseverwaltung mit Statusmodell, Fahrtzuordnung, Zwischenstopps und
  Reisekosten-Grundfunktionen.
- Authentifizierte WebSocket-API und SQLite-Schema-Migration auf Version 3.
- Kompakte Summary Card und Reiseverwaltungs-Card mit gemeinsamem API-Modul.
- Versionsgebundenes Frontend-Bundle für Cache-Updates.
- Frühe Entwickler-Beta; kein produktiver Dashboard-Pilot.

## 0.1.0-beta.1 – Frühe Entwickler-Beta

- Config Flow und Options Flow für mehrere Fahrzeuge hinzugefügt.
- Ereignisbasierte GPS-Aufzeichnung mit Validierung, Duplikatfilter,
  adaptiver Speicherung, Lückenschutz und konservativer Fahrterkennung.
- Eigene SQLite-Speicherung mit Schema-Versionierung, asynchronem Worker und
  begrenzter Neustart-Wiederherstellung.
- Retention-Dry-Run ohne destruktive Löschung.
- Lokale Tests sowie CI-, Hassfest-, HACS-Struktur- und Secret-Scan-Workflows.
- Diese Beta wurde noch nicht in einer produktiven Home-Assistant-Instanz
  getestet und ist nicht produktionsreif.
