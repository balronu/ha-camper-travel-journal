# Camper Travel Journal

<p align="center">
  <img src="https://raw.githubusercontent.com/balronu/ha-camper-travel-journal/main/assets/branding/readme-banner-de.png" alt="Camper Travel Journal — Dein digitales Wohnmobil-Reisetagebuch für Home Assistant" width="1200">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/balronu/ha-camper-travel-journal/main/assets/branding/logo.png" alt="Camper Travel Journal Logo" width="220">
</p>

🇩🇪 Deutsch | 🇬🇧 [English](README.en.md)

Eine frühe Home-Assistant-Custom-Integration für ein datenschutzbewusstes
digitales Wohnmobil-Reisetagebuch. Langfristig sind GPS-Aufzeichnung,
Fahrtenbuch, Reisen, Ausgaben, Karten, Statistiken und Exporte vorgesehen.

> **Status: `v0.1.0-beta.6` Entwickler-Beta.** Nicht produktionsreif. Die
> aktuelle Version wurde noch nicht in einer produktiven Home-Assistant-
> Instanz validiert.

## Aktueller Funktionsstand

| Bereich | Status |
| --- | --- |
| Config Flow / Options Flow | Implementiert; offline getestet, HA-Fixtures laufen in CI |
| GPS-Validierung | Implementiert und mit synthetischen Daten getestet |
| Ereignisbasierter Collector | Implementiert; echter HA-Lifecycle wird in CI geprüft |
| Duplikate, Genauigkeit, Sprünge und GPS-Lücken | Implementiert und synthetisch getestet |
| Adaptive Punktspeicherung | Implementiert und synthetisch getestet |
| Mehrere Fahrzeuge | Implementiert und synthetisch getestet |
| Eigene SQLite-Datenbank | Implementiert und synthetisch getestet |
| Neustart-Wiederherstellung | Implementiert mit begrenztem Replay; HA-Neustart wird in CI geprüft |
| Aufbewahrung | Nur Dry-Run; keine destruktive Löschung in der Beta |
| Reise-/Ausgabenoberfläche | Summary-/Manager-Card implementiert; CI getestet, produktiver Pilot offen |
| Reiseverwaltung | Reise-CRUD, Statuswechsel, manuelle Fahrtzuordnung und Aufhebung |
| Zwischenstopps, Reisekosten | API-CRUD; Manager-Grundfunktionen, Kategorien und Summen je Kategorie |
| Karten, Statistiken, Exporte | Kartenansicht und Exporte geplant; Kostenübersicht teilweise vorhanden |

## Installation

Diese Beta ist für Entwicklungstests bestimmt. Produktive GPS-Quellen erst
nach grünen CI-/Home-Assistant-Prüfungen und separater Backup-/Pilotfreigabe
verbinden.

### HACS-Custom-Repository

1. **HACS → Integrationen → Benutzerdefinierte Repositories** öffnen.
2. `https://github.com/balronu/ha-camper-travel-journal` als **Integration** hinzufügen.
3. In der HACS-Repository-Ansicht die Pre-Release-Version `v0.1.0-beta.6` auswählen und installieren; nicht den Entwicklungsstand `main` wählen.
4. Home Assistant neu starten.
5. **Einstellungen → Geräte & Dienste** öffnen und Camper Travel Journal hinzufügen.

HACS verwaltet Pre-Releases pro Repository. Falls Beta 6 nicht angeboten wird,
im HACS-Menü die Repository-Informationen aktualisieren und beim Repository die
Pre-Release-Unterstützung aktivieren (in aktuellen HACS-Versionen über den
Pre-Release-Schalter bzw. die Update-Entität). Diese Einstellung kann nicht
zuverlässig durch Repository-Dateien erzwungen werden. Ein angezeigter
`main`-Commit ist kein Beta-Release und darf nicht als Update installiert
werden.

### Manuell

`custom_components/camper_travel_journal`-Verzeichnis einschließlich seines
Unterverzeichnisses `translations` in das
Home-Assistant-Konfigurationsverzeichnis kopieren, Home Assistant neu starten
und die Integration über die Oberfläche hinzufügen.

## Konfiguration

Der Flow benötigt einen Fahrzeugnamen und eine `device_tracker`-Entität mit
numerischen `latitude`- und `longitude`-Attributen. Zusätzlich werden
Aufzeichnung, Mindestintervall (Standard 30 Sekunden), Mindestbewegung (25 m),
Aufbewahrung unzugeordneter Daten (90 Tage), Stopperkennung (10 Minuten),
GPS-Lücken und Plausibilitätsgrenzen konfiguriert.

In diesem Entwicklungsstand ist die Aufzeichnung standardmäßig deaktiviert.
Optionen können ohne Neuinstallation geändert werden. Mehrere Config Entries
unterstützen mehrere Fahrzeuge.

## Datenbank und Datenschutz

Die Integration verwaltet `camper_travel_journal.db` im Home-Assistant-
Konfigurationsverzeichnis. Die Recorder-Datenbank wird weder geändert noch
geöffnet; Recorder-/MariaDB-Zugangsdaten werden nicht verwendet. SQLite-
Zugriffe laufen über einen serialisierten Executor-Worker.

Unzugeordnete GPS-Punkte werden im Retention-Dry-Run berücksichtigt; zugeordnete
Routen bleiben geschützt. Destruktive Löschung ist in dieser Beta nicht
implementiert. Reisen, Zwischenstopps und Ausgaben werden in der eigenen
Datenbank aufbewahrt; die zusätzliche Datenbankdatei muss in Backups enthalten
sein. Automatische Fahrtzuordnung erfolgt nur bei genau einer aktiven Reise
und überschreibt keine bestehende manuelle Zuordnung.

GPS-Daten sind sensibel. In Issues und Pull Requests nur synthetische
Koordinaten verwenden; niemals exakte Orte, Adressen, Tokens oder unredigierte
Home-Assistant-Logs veröffentlichen.

## Fehlerbehebung

- **Tracker nicht verfügbar:** Entitäts-ID und numerische Koordinaten prüfen.
- **Keine Punkte:** Aufzeichnung und Schwellwerte prüfen.
- **Keine Fahrt:** Die Erkennung ist konservativ und benötigt mehrere plausible Bewegungen.
- **GPS-Lücke:** Die Lücke wird absichtlich nicht als Streckenkilometer berechnet.
- **Datenbankfehler:** Logs prüfen und nur die separate Datenbank aus einem Backup wiederherstellen; Recorder nicht anfassen.
- **HACS:** Dies ist eine frühe Custom-Repository-Beta, keine offizielle HACS-Standardlistung.

## Entwicklung und Tests

```bash
pytest -q
python -m compileall -q custom_components tests
```

GitHub Actions prüfen zusätzlich Home Assistant 2026.10.1, Coverage,
Hassfest, JSON-/Strukturvalidierung und Gitleaks. Fehlende oder fehlgeschlagene
Pflichtprüfungen blockieren eine Veröffentlichung.

Siehe [Architektur](docs/architecture.md), [Datenbankschema](docs/database-schema.md),
[Testplan](docs/test-plan.md), [Branding-Dokumentation](docs/BRANDING.md) und
[Phase-1C-Bericht](docs/phase-1c-report.md).

## Lovelace-Frontend und Cache

Die Beta enthält eine kompakte Summary Card und eine breite Manager Card. Das
Bundle wird automatisch über die Integration mit der versionsgebundenen URL
`/camper_travel_journal/camper-travel-journal.js?v=0.1.0-beta.6` registriert.
Eine zweite manuelle Resource darf nicht angelegt werden. Bei veralteter
Anzeige zuerst Resource-Version prüfen und Dashboard neu laden; manuelles
Cache-Leeren ist letzte Maßnahme. Eine installierbare, aber nicht produktiv
angewendete Unterseitenvorlage steht in
[dashboard-wohnmobil-reisetagebuch.yaml](docs/examples/dashboard-wohnmobil-reisetagebuch.yaml).
Details: [Frontend-Cache-Standard](docs/frontend-cache.md).

### Kontrollierte Erstinstallation

Nach Auswahl von `v0.1.0-beta.6` als Pre-Release in HACS, Neustart und
Einrichtung des Config-Flows kann im Wohnmobil-Dashboard zunächst eine
Testansicht mit beiden Karten angelegt werden:

```yaml
type: custom:camper-travel-journal-summary-card
vehicle_id: <config-entry-id>
```

```yaml
type: custom:camper-travel-journal-manager-card
vehicle_id: <config-entry-id>
```

Die Beispiel-Unterseite in `docs/examples/dashboard-wohnmobil-reisetagebuch.yaml`
ist nur eine Vorlage und wird nicht automatisch installiert.

Beide Karten sind zusätzlich im visuellen Kartenkatalog verfügbar. Nach Auswahl
einer Karte wird das eingerichtete Wohnmobil im grafischen Editor ausgewählt;
bei genau einem Hub erfolgt die Vorauswahl automatisch.

## Roadmap

- `v0.1.x`: GPS-Grundlage und kontrollierte Beta-Validierung
- `v0.1.x`: GPS-Grundlage, Reiseverwaltung und kontrollierte Beta-Validierung
- `v0.2.x`: Kartenansicht, Statistiken und Datenexporte
- `v1.0.0`: stabile Version nach produktiver Validierung

## Support

- [Fehler melden](https://github.com/balronu/ha-camper-travel-journal/issues/new?template=bug_report.yml)
- [Feature vorschlagen](https://github.com/balronu/ha-camper-travel-journal/issues/new?template=feature_request.yml)
- [Issues](https://github.com/balronu/ha-camper-travel-journal/issues)
- [Releases](https://github.com/balronu/ha-camper-travel-journal/releases)
- [Changelog](CHANGELOG.md)

## Lizenz

MIT; siehe [LICENSE](LICENSE).
