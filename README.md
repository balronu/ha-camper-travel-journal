# Camper Travel Journal

<p align="center">
  <img src="https://raw.githubusercontent.com/balronu/ha-camper-travel-journal/main/assets/branding/logo.png" alt="Camper Travel Journal Logo" width="220">
</p>

<h1 align="center">Camper Travel Journal</h1>
<p align="center">Dein digitales Wohnmobil-Reisetagebuch für Home Assistant</p>
<p align="center"><strong>Stable: v0.3.9</strong></p>

<p align="center">
  <a href="https://github.com/balronu/ha-camper-travel-journal/releases/latest"><img src="https://img.shields.io/github/v/release/balronu/ha-camper-travel-journal?label=Release" alt="Release"></a>
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

Die Integration ist weiterhin ein aktives Projekt; Praxisvalidierung auf
verschiedenen mobilen Browsern und in unterschiedlichen Home-Assistant-
Installationen bleibt wichtig.

## Funktionen

- GPS-Aufzeichnung über einen konfigurierten `device_tracker`, standardmäßig
  deaktiviert.
- Pending-GPS-Stoppvorschläge aus bestätigter `stationary_timeout`-Evidenz;
  Vorschläge werden erst nach Nutzerbestätigung als Stopp gespeichert.
- Konservative Erkennung von Fahrten mit Mindestbewegung, Duplikatfilter,
  Sprungschutz und Schutz vor künstlichen Luftlinien über GPS-Lücken.
- Mehrere Fahrzeuge über getrennte Home-Assistant-Config-Entries.
- Reiseverwaltung mit Zeitraum, Ziel, Status und Bearbeitung.
- Summary Card mit aktiver Reise als Standard und kompakter Auswahl aller
  Reisen des Fahrzeugs. Kennzahlen und Aktionen gehören immer zur Auswahl.
- Manager Card für Reisen, Fahrtzuordnung, manuelle Fahrten und Kosten.
- PDF-Reiseberichte mit Fahrten, Kosten, Zwischenstopps und Notizen; Berichte
  werden authentifiziert und nur im Speicher erzeugt.
- Map Card mit CARTO Basemaps, GPS-Linien, Fahrtabschnitten und Segmentfarben.
- Sicherer, atomarer GPX-Import für PAJ-GPX-1.1-Dateien mit Vorschau,
  Duplikatschutz, Zeitraumwarnungen und expliziter Zielreise.
- Kostenverwaltung mit stabilen Kategorien, Cent-Beträgen und
  Währungsprüfung.
- Deutsche und englische Benutzeroberfläche.
- Zentrale Journal Card für neue Dashboards: Reise auswählen, öffnen,
  bearbeiten, fortsetzen, pausieren, beenden, löschen oder wechseln; alle
  Reisebereiche verwenden denselben Reisekontext.

### Kraftstoffkosten

Bei der Kategorie **Kraftstoff** sind getankte Liter und Literpreis optional.
Wenn zwei der drei Werte vorhanden sind, wird der fehlende Wert berechnet.
Deutsche Kommaeingaben werden unterstützt; Betrag wird mit zwei, Liter und
Literpreis mit bis zu drei Nachkommastellen dargestellt. Alte Kraftstoffkosten
ohne diese Angaben bleiben gültig.

### Bemerkungen zu Kosten

Jede Ausgabe kann optional eine mehrzeilige Bemerkung mit bis zu 2.000 Zeichen
enthalten. Zeilenumbrüche und Sonderzeichen werden in der Journal Card und im
PDF-Reisebericht sicher als Text dargestellt. Bestehende Ausgaben ohne
Bemerkung bleiben gültig.

### Ver- & Entsorgung

Die Kostenkategorie **Ver- & Entsorgung** kann optional mehrfach auswählbare
Leistungen enthalten: Strom/Landstrom, Frischwasser, Grauwasser,
Toilettenkassette und Dusche. Der Betrag wird einmal gespeichert. Die
Leistungen werden über stabile technische Schlüssel in einer additiven
Migration gespeichert; bestehende Ausgaben werden nicht verändert.

### Historische GPS-Stoppvorschläge

Neue bestätigte Stillstände werden weiterhin automatisch als `pending`
Vorschlag angeboten. Für historische Daten gibt es zusätzlich die
nutzergestartete Funktion **Vorschläge aktualisieren** im Ortsbereich einer
Reise. Sie verwendet ausschließlich vorhandene GPS-Punkte, die einer echten
`stationary_timeout`-Fahrt zugeordnet sind, ist idempotent und bestätigt weder
einen Aufenthalt noch legt sie einen Übernachtungsplatz an. GPS-Lücken und
bereits vorhandene, bestätigte oder verworfene Vorschläge werden übersprungen.

## Installation über HACS

1. Öffne **HACS → Integrationen → Benutzerdefinierte Repositories**.
2. Füge `https://github.com/balronu/ha-camper-travel-journal` als Repository
   vom Typ **Integration** hinzu.
3. Installiere die stabile Version `v0.3.9`.
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

Start- und Enddatum einer Reise dienen der Planung und Anzeige; ein Startdatum
aktiviert eine Reise nicht automatisch. Die GPS-Aufzeichnung läuft unabhängig
vom Reisestatus, sofern sie aktiviert ist. Eine neu erkannte Fahrt wird nur
automatisch zugeordnet, wenn für das konfigurierte Fahrzeug genau eine aktive
Reise existiert; andernfalls bleibt sie bis zur manuellen Zuordnung frei.

## Dashboard-Karten

> **WICHTIG – LOVELACE-KARTEN GEÄNDERT!**
>
> Mit v0.3.0 wird die bisherige Kartenstruktur zusammengeführt. Für neue
> Dashboards wird nur noch `Camper Travel Journal – Reisetagebuch` benötigt.
> Summary-, Manager-, Map- und Diagnostics-Karten bleiben für bestehende
> Dashboards funktionsfähig, werden aber nicht mehr für neue Dashboards
> angeboten und zeigen einen Migrationshinweis. Bestehende Reisen, Fahrten,
> GPS-Daten, Übernachtungen, Bewertungen und Kosten bleiben erhalten.

### Migration {#migration}

Nach dem Update bitte die bisherigen Einzelkarten im Dashboard manuell durch
die zentrale Journal Card ersetzen. HACS unterstützt hierfür keinen eigenen
Warnbanner; der Hinweis wird deshalb in jeder Legacy-Karte angezeigt und steht
zusätzlich in diesen Release Notes und der README.

Für neue Dashboards wird die zentrale Journal Card empfohlen:

```yaml
type: custom:camper-travel-journal-journal-card
vehicle_id: <config-entry-id>
```

Der Ablauf lautet **Reise auswählen → Reise öffnen → Reiseaktionen nutzen → Reise
wechseln**. Statusaktionen verändern nur die geöffnete Reise; „Reise wechseln“
öffnet die Auswahl ohne Statusänderung. Ohne geöffnete Reise erscheinen keine reisebezogenen Formulare,
Karten, GPX- oder PDF-Aktionen. Die Diagnostics Card bleibt unabhängig. Die
bisherigen Summary-, Manager- und Map-Karten bleiben als kompatible
Bestandsvariante unterstützt.

Füge die Karten über den visuellen Lovelace-Editor oder YAML hinzu:

```yaml
type: custom:camper-travel-journal-summary-card
vehicle_id: <config-entry-id>
```

```yaml
type: custom:camper-travel-journal-manager-card
vehicle_id: <config-entry-id>
```

Die zentrale Journal Card ist der einzige neue Kartentyp im Lovelace-Katalog.
Die bisherige Summary-, Manager-, Map- und Diagnostics Card bleibt per YAML
und in bestehenden Dashboards funktionsfähig. Die Map Card zeigt
gespeicherte GPS-Linien und Fahrtsegmente, berechnet keine Straßenroute und
verwendet keine Geocoding- oder Routing-Dienste:

```yaml
type: custom:camper-travel-journal-map-card
vehicle_id: <config-entry-id>
```

Der Kartenanbieter wird unter **Einstellungen → Geräte & Dienste → Camper
Travel Journal → Konfigurieren** ausgewählt. CARTO Basemaps verwendet die
offizielle Voyager-Raster-URL und die Attribution `© OpenStreetMap contributors,
© CARTO`. Der API-Schlüssel wird als Passwortfeld gespeichert, beim Bearbeiten
nicht vorbefüllt und für Browser-Tile-Anfragen an den Browser übergeben; er ist
daher in den Browser-Netzwerktools sichtbar. Ein Schlüssel kann geändert oder
entfernt werden. Ohne Anbieter wird keine externe Hintergrundkarte geladen;
die GPS-Route bleibt sichtbar. Fehlende oder gesperrte Kacheln werden als
verständlicher Hinweis angezeigt. Manuelle `tile_url`/`tile_attribution`-Werte
bleiben für fortgeschrittene Kartenkonfigurationen kompatibel.
Historische Punkte ohne eindeutige Fahrtmitgliedschaft werden nicht als exakt
zugeordnet ausgegeben.

Die Summary Card bevorzugt aktive Reisen. Bei mehreren aktiven Reisen wird
deterministisch nach dem neuesten `started_at` und bei Gleichstand nach der ID
entschieden. Ohne aktive Reise gilt dieselbe Regel für alle Reisen. Die Auswahl
bleibt bei Aktualisierungen erhalten und zeigt Titel, Zeitraum, Status,
Kennzahlen und Aktionen immer aus derselben Reise.

## GPS-Aufzeichnung und GPX-Import

Live-GPS-Fahrten werden bei exakt identischem Fahrzeug sowie Start- und
Endzeitpunkt idempotent gespeichert. Ähnliche oder überlappende Zeitintervalle
werden nicht automatisch zusammengeführt. Die optionale Diagnosekarte zeigt
letzten gültigen Trackerzeitpunkt, Detektorzustand, Abschlussursache,
Stillstands-/Gap-Schwellwerte und Verwerfungszähler ohne Koordinaten oder
Routen. Ein Stillstand wird weiterhin erst durch einen nachfolgenden gültigen
Trackerpunkt bestätigt; eine automatische Timer-Beendigung gibt es nicht.

Die Aufzeichnung reagiert auf Tracker-Ereignisse, verwirft ungültige Punkte und
bewahrt sensible Koordinaten ausschließlich lokal auf.

Über **GPX importieren** in der Manager Card kann eine PAJ-GPX-1.1-Datei
analysiert werden. Die Vorschau zeigt GPS-Punkte, Fahrtabschnitte, Zeit,
Entfernung, Lücken und Duplikatkonflikte. Fahrzeug und Zielreise werden vor der
Bestätigung angezeigt; die Zielreise kann ausgewählt oder leer gelassen werden,
um freie Fahrten zu speichern. Reisezeitraumabweichungen warnen, blockieren den
Import aber nicht. Erst die ausdrückliche Bestätigung schreibt atomar in die
lokale Datenbank.

## Praxiserprobte Abläufe

Der Stable-Stand wurde mit einer realen PAJ-GPX-Datei praktisch geprüft: 903
GPS-Punkte wurden in drei Fahrtabschnitte mit insgesamt rund 1.118,7 km
aufbereitet. Die Fahrtenzuordnung zu einer Reise, Streckensummen und die
Kostenverwaltung wurden dabei erfolgreich kontrolliert. Diese Ergebnisse
belegen den geprüften Ablauf mit den verwendeten Daten; sie sind keine
allgemeine Kompatibilitätszusage für jede Home-Assistant- oder
Browser-Umgebung.

## Reise- und Kostenverwaltung

Reisen können angelegt, bearbeitet, gestartet, pausiert und abgeschlossen
werden. Erkannte Fahrten können einer Reise zugeordnet oder wieder gelöst
werden; manuelle Fahrten sind separat möglich. Kosten werden als ganzzahlige
Cent-Beträge pro Reise summiert. Unterschiedliche Währungen werden nicht
stillschweigend addiert.

Seit v0.3.1 stehen im geöffneten Reisekontext statusabhängige Aktionen zum
Fortsetzen, Abschließen, Bearbeiten, Löschen und Wechseln der Reise bereit.
v0.3.5 ordnet sie in einem einheitlichen responsiven Aktionsraster mit zwei
Spalten und Einspalten-Fallback unter 420 px an. Der rote Löschbutton und der
bestehende Bestätigungsdialog bleiben separat erhalten.

## Orte, Zuhause und Reverse Geocoding

Fahrtendpunkte können mit manuellen Ortsnamen, der Home-Assistant-Zone
`zone.home`, eindeutig zugeordneten Aufenthalten oder einem optionalen
Reverse-Geocoding-Ergebnis beschriftet werden. Manuelle Namen bleiben erhalten;
ohne eindeutige Information werden Koordinaten angezeigt. Die Zuhause-
Erkennung verwendet den konfigurierten Radius und legt keinen Aufenthalt
automatisch an.

Reverse Geocoding ist standardmäßig deaktiviert. Bei ausdrücklicher Aktivierung
werden nur relevante Fahrtendpunkte an Nominatim übertragen. Timeout, Cache und
der Offline-Koordinatenfallback bleiben aktiv. Details stehen in der
[Lovelace- und Datenschutzdokumentation](docs/lovelace.md).

## PDF-Reisebericht

Der authentifizierte Export erzeugt eine deutsche oder englische PDF-Datei im
Speicher. Sie enthält Übersicht, Fahrten, Aufenthalte, Orte, Bewertungen,
Ausgaben und eine geografisch korrekte Offline-Reisekarte auf neutralem
Hintergrund. Start, Ziel und bestätigte Übernachtungsplätze werden markiert;
identische Ortsbeschriftungen werden gruppiert. Lange Tabellen umbrechen mit
wiederholten Tabellenköpfen; HTTPS-Webseiten werden als klickbare Links
ausgegeben.

## Datenschutz und lokale Datenspeicherung

Die Integration speichert ihre Daten in `camper_travel_journal.db` im
Home-Assistant-Konfigurationsverzeichnis. Sie verwendet weder Recorder noch
MariaDB und sendet keine GPS-Daten an einen externen Dienst. Nimm die
zusätzliche SQLite-Datei in deine Backups auf. Teile in Issues und Tests keine
privaten Koordinaten, Tokens oder unredigierten Logs.

## Bekannte Einschränkungen

- Der Funktionsumfang ist auf Reisetagebuch, Fahrten, Kosten und den GPX-Import
  konzentriert.
- Historische Beta-Änderungen bleiben im Changelog dokumentiert.
- Die Retention-Funktion berechnet Kandidaten, löscht in dieser Version aber
  nicht automatisch.
- Mobile Safari/WebKit und produktive Installationen benötigen weiterhin
  Praxisvalidierung.

Technische Hinweise zur versionierten Frontend-Auslieferung stehen in der
[Frontend-Cache-Dokumentation](docs/frontend-cache.md); die aktuelle
Projektversion steht oben bei den Release-Badges.

## Roadmap

Die statusgetrennte Roadmap steht in [docs/ROADMAP.md](docs/ROADMAP.md).
Weiter geplant sind unter anderem erweiterte Statistiken, Exporte und
vollständige Lovelace-Verwaltung von Zwischenstopps. Die Kartenansicht, die
zentrale Journal Card und der authentifizierte PDF-Reisebericht sind Bestandteil
von v0.3.0.

## Support und Mitwirkung

- [Fehler melden](https://github.com/balronu/ha-camper-travel-journal/issues/new?template=bug_report.yml)
- [Feature vorschlagen](https://github.com/balronu/ha-camper-travel-journal/issues/new?template=feature_request.yml)
- [Issues und Pull Requests](https://github.com/balronu/ha-camper-travel-journal/issues)
- [Releases](https://github.com/balronu/ha-camper-travel-journal/releases)
- [Feature-Matrix](docs/v0.3.0-feature-matrix.md) · [Lovelace-Karten](docs/lovelace.md)
- [Upgrade](docs/upgrade-v0.3.0.md) · [Architektur](docs/architecture.md) · [Testplan](docs/test-plan.md)

Beiträge mit synthetischen Testdaten, klarer Fehlerbeschreibung und passenden
Regressionstests sind besonders willkommen. Änderungen an GPS-, Reise- oder
Kostenlogik sollten bestehende Daten und atomare Backend-Validierungen
bewahren.

## Lizenz

Camper Travel Journal steht unter der [MIT-Lizenz](LICENSE).
