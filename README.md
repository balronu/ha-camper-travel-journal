# Camper Travel Journal

<p align="center">
  <img src="https://raw.githubusercontent.com/balronu/ha-camper-travel-journal/main/assets/branding/logo.png" alt="Camper Travel Journal Logo" width="220">
</p>

<h1 align="center">Camper Travel Journal</h1>
<p align="center">Dein digitales Wohnmobil-Reisetagebuch für Home Assistant</p>

<p align="center">
  <a href="https://github.com/balronu/ha-camper-travel-journal/releases/latest"><img src="https://img.shields.io/github/v/release/balronu/ha-camper-travel-journal?include_prereleases&label=Release" alt="Release"></a>
  <a href="https://hacs.xyz/"><img src="https://img.shields.io/badge/HACS-Custom-orange" alt="HACS Custom Integration"></a>
  <a href="https://github.com/balronu/ha-camper-travel-journal/actions/workflows/tests.yml"><img src="https://img.shields.io/github/actions/workflow/status/balronu/ha-camper-travel-journal/tests.yml?label=CI" alt="CI"></a>
  <a href="https://github.com/balronu/ha-camper-travel-journal/actions/workflows/validate.yml"><img src="https://img.shields.io/github/actions/workflow/status/balronu/ha-camper-travel-journal/validate.yml?label=Hassfest%20%2F%20HACS" alt="Hassfest and HACS validation"></a>
  <a href="https://github.com/balronu/ha-camper-travel-journal/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License"></a>
</p>

🇩🇪 Deutsch | [🇬🇧 English](README.en.md)

## Was ist Camper Travel Journal?

Camper Travel Journal sammelt und organisiert die Reiseinformationen deines
Wohnmobils direkt in Home Assistant. GPS-Punkte, erkannte Fahrten, Reisen,
Zwischenstopps und Kosten bleiben in einer eigenen lokalen SQLite-Datenbank.
Die Integration ist für private Home-Assistant-Installationen ausgelegt und
benötigt keinen externen Cloud-Dienst.

Die aktuelle stabile Version ist `v0.1.0`. Die Integration ist weiterhin ein
aktives Projekt; Praxisvalidierung auf verschiedenen mobilen Browsern und in
unterschiedlichen Home-Assistant-Installationen bleibt wichtig.

## Funktionen

- GPS-Aufzeichnung über einen konfigurierten `device_tracker`, standardmäßig
  deaktiviert.
- Konservative Erkennung von Fahrten mit Mindestbewegung, Duplikatfilter,
  Sprungschutz und Schutz vor künstlichen Luftlinien über GPS-Lücken.
- Mehrere Fahrzeuge über getrennte Home-Assistant-Config-Entries.
- Reiseverwaltung mit Zeitraum, Ziel, Status und Bearbeitung.
- Summary Card mit aktiver Reise als Standard und kompakter Auswahl aller
  Reisen des Fahrzeugs. Kennzahlen und Aktionen gehören immer zur Auswahl.
- Manager Card für Reisen, Fahrtzuordnung, manuelle Fahrten und Kosten.
- Sicherer, atomarer GPX-Import für PAJ-GPX-1.1-Dateien mit Vorschau,
  Duplikatschutz, Zeitraumwarnungen und expliziter Zielreise.
- Kostenverwaltung mit stabilen Kategorien, Cent-Beträgen und
  Währungsprüfung.
- Deutsche und englische Benutzeroberfläche.

## Installation über HACS

1. Öffne **HACS → Integrationen → Benutzerdefinierte Repositories**.
2. Füge `https://github.com/balronu/ha-camper-travel-journal` als Repository
   vom Typ **Integration** hinzu.
3. Installiere die stabile Version `v0.1.0`.
4. Starte Home Assistant manuell neu.
5. Füge die Integration unter **Einstellungen → Geräte & Dienste** hinzu.

Die Integration registriert ihr versioniertes Frontend-Bundle selbst. Eine
zusätzliche Lovelace-Ressource mit derselben JavaScript-Datei ist nicht nötig.
Die Release- und HACS-Hinweise stehen in
[docs/HACS_RELEASE_STRATEGY.md](docs/HACS_RELEASE_STRATEGY.md).

## Erste Einrichtung

Beim Einrichten werden ein Fahrzeugname und eine `device_tracker`-Entität mit
numerischen `latitude`-/`longitude`-Attributen benötigt. Aktiviere die
Aufzeichnung erst, wenn Tracker und Datenschutzanforderungen geprüft sind.
Intervall, Mindestbewegung, Stopperkennung, GPS-Lücke, plausible
Maximalgeschwindigkeit und Aufbewahrung unzugeordneter Punkte sind Optionen.

## Dashboard-Karten

Füge die Karten über den visuellen Lovelace-Editor oder YAML hinzu:

```yaml
type: custom:camper-travel-journal-summary-card
vehicle_id: <config-entry-id>
```

```yaml
type: custom:camper-travel-journal-manager-card
vehicle_id: <config-entry-id>
```

Die Summary Card bevorzugt aktive Reisen. Bei mehreren aktiven Reisen wird
deterministisch nach dem neuesten `started_at` und bei Gleichstand nach der ID
entschieden. Ohne aktive Reise gilt dieselbe Regel für alle Reisen. Die Auswahl
bleibt bei Aktualisierungen erhalten und zeigt Titel, Zeitraum, Status,
Kennzahlen und Aktionen immer aus derselben Reise.

## GPS-Aufzeichnung und GPX-Import

Die Aufzeichnung reagiert auf Tracker-Ereignisse, verwirft ungültige Punkte und
bewahrt sensible Koordinaten ausschließlich lokal auf.

Über **GPX importieren** in der Manager Card kann eine PAJ-GPX-1.1-Datei
analysiert werden. Die Vorschau zeigt GPS-Punkte, Fahrtabschnitte, Zeit,
Entfernung, Lücken und Duplikatkonflikte. Fahrzeug und Zielreise werden vor der
Bestätigung angezeigt; die Zielreise kann ausgewählt oder leer gelassen werden,
um freie Fahrten zu speichern. Reisezeitraumabweichungen warnen, blockieren den
Import aber nicht. Erst die ausdrückliche Bestätigung schreibt atomar in die
lokale Datenbank.

## Reise- und Kostenverwaltung

Reisen können angelegt, bearbeitet, gestartet, pausiert und abgeschlossen
werden. Erkannte Fahrten können einer Reise zugeordnet oder wieder gelöst
werden; manuelle Fahrten sind separat möglich. Kosten werden als ganzzahlige
Cent-Beträge pro Reise summiert. Unterschiedliche Währungen werden nicht
stillschweigend addiert.

## Datenschutz und lokale Datenspeicherung

Die Integration speichert ihre Daten in `camper_travel_journal.db` im
Home-Assistant-Konfigurationsverzeichnis. Sie verwendet weder Recorder noch
MariaDB und sendet keine GPS-Daten an einen externen Dienst. Nimm die
zusätzliche SQLite-Datei in deine Backups auf. Teile in Issues und Tests keine
privaten Koordinaten, Tokens oder unredigierten Logs.

## Bekannte Einschränkungen

- Der Funktionsumfang ist auf Reisetagebuch, Fahrten, Kosten und den GPX-Import
  konzentriert.
- Eine Kartenansicht, Statistiken und Exporte sind noch nicht implementiert.
- Zwischenstopps sind im Backend vorhanden, aber noch nicht vollständig über
  Lovelace bedienbar.
- Die Retention-Funktion berechnet Kandidaten, löscht in dieser Version aber
  nicht automatisch.
- Mobile Safari/WebKit und produktive Installationen benötigen weiterhin
  Praxisvalidierung.

Technische Hinweise zur versionierten Frontend-Auslieferung stehen in der
[Frontend-Cache-Dokumentation](docs/frontend-cache.md). Historische
Kompatibilitätsstände wie `0.1.0-beta.12` bleiben dort nachvollziehbar; die
aktuelle Projektversion steht oben bei den Release-Badges.

## Roadmap

Die statusgetrennte Roadmap steht in [docs/ROADMAP.md](docs/ROADMAP.md).
Geplant sind unter anderem eine Routen-/Kartenansicht, Reiseverlauf,
Statistiken, Exporte und eine vollständige Lovelace-Verwaltung der
Zwischenstopps.

## Support und Mitwirkung

- [Fehler melden](https://github.com/balronu/ha-camper-travel-journal/issues/new?template=bug_report.yml)
- [Feature vorschlagen](https://github.com/balronu/ha-camper-travel-journal/issues/new?template=feature_request.yml)
- [Issues und Pull Requests](https://github.com/balronu/ha-camper-travel-journal/issues)
- [Releases](https://github.com/balronu/ha-camper-travel-journal/releases)
- [Architektur](docs/architecture.md) · [Testplan](docs/test-plan.md)

Beiträge mit synthetischen Testdaten, klarer Fehlerbeschreibung und passenden
Regressionstests sind besonders willkommen. Änderungen an GPS-, Reise- oder
Kostenlogik sollten bestehende Daten und atomare Backend-Validierungen
bewahren.

## Lizenz

Camper Travel Journal steht unter der [MIT-Lizenz](LICENSE).
