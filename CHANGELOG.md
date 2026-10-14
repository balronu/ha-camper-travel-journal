# Änderungsprotokoll

🇩🇪 Deutsch | 🇬🇧 [English](README.en.md)

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
