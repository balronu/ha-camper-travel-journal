# Änderungsprotokoll

## 0.4.0-beta.4 – Tankbuch und Verbrauchsqualität

### Deutsch

- Additive Schema-15-Migration für Tankvorgänge; bestehende Fahrten, Aufenthalte, Reisen, GPS-Rohdaten, Kosten und Ausschlüsse bleiben erhalten.
- Tankbuchmodul mit Diesel, AdBlue und sonstigen Betriebsstoffen, Voll-/Teilbetankungen, Belegen, Kilometerständen und optionaler Verknüpfung bestehender Kraftstoffkosten.
- Volltank-zu-Volltank-Verbrauch berücksichtigt Teilbetankungen und erzeugt keine zusätzlichen Expense-Datensätze.
- GPS-Fahrstrecken können ohne Kilometerstände nur als geschätzte Strecke verwendet werden; unvollständige GPS-Abdeckung liefert keinen scheinbar genauen Verbrauch.
- Dieselverbrauch bleibt als kombinierter Fahr-/Heizungsverbrauch gekennzeichnet. Webasto-Werte sind unbekannt, bis belastbare Betriebsstunden oder manuelle Schätzwerte vorliegen.
- Beta-Release; v0.3.13 bleibt Stable. Keine produktive Datenbankmigration.

### English

- Additive schema-15 migration for fuel-log events; existing drives, stays, trips, raw GPS points, expenses and exclusions are preserved.
- Fuel-log module for diesel, AdBlue and other fluids with full/partial fills, receipts, odometers and optional links to existing fuel expenses.
- Full-to-full consumption includes partial fills and never creates additional expense records.
- Existing GPS drives can provide an estimated distance when odometers are missing; incomplete GPS coverage never produces a falsely precise rate.
- Diesel remains labelled as combined driving/heating consumption. Webasto data stays unknown until supported hours or a documented manual estimate is supplied.
- Beta release; v0.3.13 remains Stable. No productive database migration.

## 0.4.0-beta.3 – SQLite-Migrationssicherheit und Backup

### Deutsch

- Versionierte SQLite-Migrationen v3–v14 laufen ohne implizite `executescript()`-Commits in einer kontrollierten Transaktion.
- Fehlerpfade, historische Schema-10-Datenbanken sowie WAL-Online-Backup und Restore werden automatisiert geprüft.
- Keine Tankbuch- oder Journal-Card-Änderung; v0.3.13 bleibt Stable.

### English

- Versioned SQLite migrations v3–v14 run without implicit `executescript()` commits inside a controlled transaction.
- Failure paths, historical schema-10 databases, and WAL Online Backup/restore are covered by automated checks.
- No fuel-log or Journal Card change; v0.3.13 remains Stable.

## 0.4.0-beta.2 – UX-Hotfix für den modularen Karteneditor

### Deutsch

- Modulpositionen zeigen jetzt sichtbar „n von m“.
- Verschobene Module werden kurz hervorgehoben; Fokus und Scrollposition folgen dem verschobenen Element.
- Die vollständige Modulreihenfolge bleibt beim Deaktivieren, Speichern, Reload und erneuten Aktivieren erhalten.
- Tankbuch bleibt als geplantes Modul nicht aktivierbar und löst keine Datenbank- oder Providerabfragen aus.
- Keine Änderungen an GPS, Fahrten, Aufenthalten, Kosten, Exporten oder SQLite.

### English

- Module positions now show a visible “n of m” indicator.
- Moved modules are briefly highlighted; focus and scrolling follow the moved element.
- The complete module order is preserved across disabling, saving, reload and re-enabling.
- The fuel log remains a planned module and cannot be activated; it performs no database or provider requests.
- GPS, drives, stays, expenses, exports and SQLite remain unchanged.

## 0.4.0-beta.1 – Modulare Journal Card

### Deutsch

- Die zentrale Journal Card verwendet intern ein versioniertes Modul-Registry.
- Bestehende YAML-Konfigurationen und die bisherige Standarddarstellung bleiben kompatibel.
- Der Karteneditor kann Journal-Bereiche aktivieren, deaktivieren und mit mobilen Bedienelementen sortieren.
- Das zukünftige Tankbuch ist als geplanter Bereich sichtbar, verwendet in dieser Beta aber weder Datenbankdaten noch Providerabfragen.
- GPS-Erkennung, Aufenthaltsabschluss, Reisen, Kosten, GPX- und PDF-Export bleiben unverändert.

### English

- The central Journal Card now uses an internal versioned module registry.
- Existing YAML configurations and the previous default presentation remain compatible.
- The card editor can enable, disable and reorder journal sections with mobile-friendly controls.
- The future fuel log is represented as a planned section, but this beta performs no fuel-database or provider requests.
- GPS detection, stay completion, trips, expenses, GPX and PDF exports remain unchanged.

## 0.3.13 – Stable laufende Aufenthalte

### Deutsch

- Laufende bestätigte Aufenthalte werden mit „Seit … · Aufenthalt läuft“
  angezeigt, solange keine Abfahrtszeit vorliegt.
- GPS-Stoppvorschläge ohne bekannte Abfahrt zeigen keine irreführende
  Endezeit mehr; abgeschlossene Vorschläge behalten ihre Zeitspanne.
- Die mobile Darstellung sowie die bestehenden Bearbeiten-, Löschen-,
  Bewerten- und Übernehmen-Aktionen bleiben erhalten.

### English

- Confirmed ongoing stays now show “Since … · Stay ongoing” while no departure
  time is known.
- GPS stop suggestions without a known departure no longer repeat the arrival
  time as a misleading end time; completed suggestions retain their range.
- Mobile presentation and the existing edit, delete, rating, and accept actions
  remain unchanged.

## 0.3.12 – Stable GPS-Fahrtabschluss und Duplikatschutz

### Deutsch

- `stationary_timeout` bestätigt das Fahrtende, verlängert aber nicht mehr die
  gespeicherte Fahrt um das Stillstandsfenster; die Endzeit folgt dem letzten
  belastbaren Bewegungspunkt.
- Wiederholte GPS-Abschlüsse mit leicht abweichenden Zeitgrenzen werden über
  gemeinsame Punktidentitäten idempotent erkannt. Echte Folgefahrten mit nur
  einem gemeinsamen Grenzpunkt bleiben getrennt.
- GPS-Punkte, Streckenberechnung, Aufenthalte, Kosten, Exporte und bestehende
  Zuordnungen werden nicht pauschal verändert.

### English

- `stationary_timeout` confirms a drive end without adding the stationary window
  to the persisted duration; the end follows the last reliable movement point.
- Repeated GPS completions with slightly different time boundaries are made
  idempotent through shared point identities. Real adjacent drives sharing only
  one boundary point remain separate.
- GPS points, distance calculation, stays, costs, exports, and existing
  assignments are not changed wholesale.

## 0.3.9 – GPS-Identität und laufende Aufenthalte

- Exakte GPS-Fahrtintervalle erhalten eine transaktional eindeutige,
  migrationssichere Identität; vorhandene historische Duplikate werden weder
  gelöscht noch zusammengeführt.
- Bestätigte laufende Aufenthalte können ohne bekannte Abfahrtszeit gespeichert
  werden und werden erst bei später nachgewiesener Bewegung geschlossen.
- Automatische GPS-Vorschläge erzeugen für den noch laufenden Aufenthalt keine
  fiktive Abfahrtszeit; die Bestätigung bleibt weiterhin eine Nutzeraktion.

## 0.3.7 – Stable Ver- & Entsorgung und historische GPS-Stoppnachberechnung

- Neue Kostenkategorie **Ver- & Entsorgung** mit fünf optionalen, mehrfach
  auswählbaren Leistungen und additiver SQLite-Migration 12.
- Leistungen erscheinen in Journal Card und deutschen/englischen PDF-Berichten;
  der Gesamtbetrag wird nicht aufgeteilt.
- Nutzergestartete historische Nachberechnung berücksichtigt ausschließlich
  vorhandene, zugeordnete GPS-Punkte echter `stationary_timeout`-Fahrten und
  bleibt bei wiederholter Ausführung idempotent.
- Bestehende Kosten, Fahrten, GPS-Punkte und Aufenthalte werden nicht verändert.

## 0.3.6 – Stable GPS-Stoppvorschläge

- Bestätigte `stationary_timeout`-Ereignisse erzeugen genau einen offenen,
  noch nicht bestätigten GPS-Stoppvorschlag aus den echten Trackerzeitpunkten.
- Stationäre Reports dürfen für diese Evidenz verarbeitet werden, ohne den
  normalen Streckenpunktfilter oder GPS-Gap-Schutz aufzuweichen.
- Diagnosewerte enthalten erzeugte und offene Vorschläge sowie weiterhin nur
  datensparsame Tracker-/Detektorwerte ohne Koordinaten oder Routen.
- Vorschläge werden nicht automatisch als Aufenthalt oder Übernachtungsplatz
  gespeichert; historische Fahrten und produktive Daten werden nicht bereinigt.

## 0.3.5 – Stable GPS-Hotfix

- GPS-Livefahrten werden bei exakt gleicher Fahrzeug-/Start-/Endzeit nur noch
  einmal gespeichert; die vorhandene Fahrt-ID wird für Zuordnung und Reise-Links
  wiederverwendet.
- Nahe oder überlappende Intervalle werden bewusst nicht automatisch
  zusammengeführt, damit getrennte reale Fahrten nicht verloren gehen.
- Diagnosewerte zeigen jetzt datensparsam letzten gültigen Trackerzeitpunkt,
  Detektorzustand, Alter des letzten gültigen Ereignisses, Abschlussursache,
  Stillstandszeit, GPS-Gap und Verwerfungszähler.
- Es gibt weiterhin keine Timer-Fahrtbeendigung und keine rückwirkende
  Bereinigung bestehender Fahrten oder GPS-Punkte.

## 0.3.2 – Stable UI-Politur

- Vereinheitlicht die Reiseaktionen in der zentralen Journal Card mit einem
  responsiven Zwei-Spalten-Raster.
- Hebt Starten/Fortsetzen/Reaktivieren als Primäraktionen hervor und trennt
  Löschen mit dem bestehenden Bestätigungsdialog optisch ab.
- Integriert „Reise wechseln“ in das Aktionsraster, ohne Statusänderung oder
  Backend-Aufruf.
- Prüft Desktop- und mobile Chromium-Darstellung einschließlich Reihenfolge,
  Überlauffreiheit und unveränderter Aktionen.

## 0.3.1 – Stable Hotfix

- Stellt die vollständige Reiseverwaltung direkt im geöffneten Kontext der
  zentralen Journal Card wieder her.
- Ergänzt statusabhängige Aktionen zum Starten, Fortsetzen, Pausieren,
  Beenden, Reaktivieren, Bearbeiten und Löschen.
- Trennt „Reise wechseln“ vom Backend-Statuswechsel und schützt das Löschen
  durch einen Dialog mit klarer Datenfolgen-Erklärung.
- Aktualisiert die Journal-Ansicht nach Bearbeitungen und Statuswechseln ohne
  Browser-Neustart und prüft die mobile Darstellung.

## 0.3.0 – Stable

Stable-Release der vollständigen v0.3.0-Funktionsserie. Enthält zentrale
Journal- und Kostenverwaltung, GPX-Import und -Backfill, bestätigte Orte und
Bewertungen, Zuhause-Erkennung, optionales Reverse Geocoding, interaktive und
offlinefähige PDF-Reisekarten sowie die beta.10–beta.13-Qualitätskorrekturen.
Siehe [Release Notes](docs/releases/RELEASE_NOTES_v0.3.0.md),
[Feature-Matrix](docs/v0.3.0-feature-matrix.md) und
[Upgrade-Hinweise](docs/upgrade-v0.3.0.md).

## 0.3.0-beta.13 – Korrigierte Kosten- und Kartenanzeige

- Die Statistik-Kachel verwendet auf Deutsch und Englisch die kompakte Bezeichnung „Übernachtungen“ beziehungsweise „Overnights“, ohne die zugrunde liegende Kennzahl zu ändern.
- Die zentrale Kostenansicht besitzt nur noch eine sichtbare Aufklappebene; Anzahl, Anlegen-Button, Liste und Gesamtsumme bleiben darin direkt bedienbar.
- Die PDF-Reisekarte gruppiert gleiche geografische Darstellungsorte deterministisch, damit Zuhause und bekannte Übernachtungsplätze nicht mehrfach beschriftet werden; unterschiedliche nahe Orte bleiben getrennt.

## 0.3.0-beta.12 – Kostenanzeige, Heimatzone und Ortsbeschriftungen

- Bearbeitungsdialoge wählen die tatsächlich gespeicherte Kostenkategorie auch beim Wechsel zwischen Ausgaben zuverlässig aus; unbekannte historische Werte bleiben unverändert speicherbar.
- Kostenliste und Reiseübersicht formatieren Kalenderdaten lokalisiert und bleiben bei langen deutschen Bezeichnungen responsiv.
- `zone.home` kann Fahrtendpunkte innerhalb eines konfigurierbaren Radius als „Zuhause“ beschriften, ohne Aufenthalte oder GPX-Daten anzulegen oder zu verändern.
- Optionales Reverse Geocoding ist standardmäßig deaktiviert; falls ausdrücklich aktiviert, werden nur gerundete relevante Endpunkte mit Cache, Rate Limit und Timeout abgefragt. Ohne Dienst bleibt der Koordinaten-Fallback erhalten.
- Die offlinefähige PDF-Reisekarte erhält sichere Start-/Zielbeschriftungen, validierte Übernachtungsmarker, mehrzeilige kollisionsarme Labels und eine verständlichere Legende; Kartentiles und externe Geocoding-Aufrufe sind keine Voraussetzung.


## 0.3.0-beta.10 – Tatsächliche Ausgabendaten und GPX-Endpunkte

- Ausgaben speichern das tatsächliche Datum verpflichtend und die Uhrzeit nur bei ausdrücklicher Erfassung; der automatische Erfassungszeitpunkt bleibt unverändert.
- Bestehende Ausgaben werden additiv migriert und ohne belegtes Ausgabendatum als unbekannt behandelt, ohne Summen oder Datensätze zu verlieren.
- GPX-Fahrten erhalten Start-/Zielkoordinaten aus den ersten/letzten gültigen Trackpunkten; vorhandene Fahrten werden nur aus gespeicherten Zuordnungen ergänzt.
- Streckenfallbacks zeigen Koordinaten, manuelle Ortsnamen behalten Vorrang; es gibt keine ungefragte externe Ortsauflösung.
- PDF-Ausgaben zeigen das tatsächliche Datum, optionale Uhrzeit und sichere Hinweise für unbekannte Altbestände.

## 0.3.0-beta.9 – Druckfreundliche Reiseberichte

- PDF-Berichte verwenden kompakte Start-/Ende-Spalten mit lokalisierten Datum-/Zeitwerten.
- Ortskategorien, einschließlich `rv_site`, werden menschenlesbar ausgegeben; lange Namen und Notizen umbrechen an Wortgrenzen.
- Aufenthaltsstatus, Bewertungen, Adressen, Webseiten und Kosten bleiben im mehrseitigen Export sichtbar.
- Fehlerantworten verwenden stabile, nicht-sensitive Codes und getrennte Meldungen für Speichern und Aktualisieren.

## 0.3.0-beta.8 – WebSocket-Hotfix

- Registriert die vorhandenen authentifizierten Befehle `assign_interruption`
  und `create_stop_from_interruption` beim Home-Assistant-Integrationsstart.
- Ergänzt einen echten isolierten Home-Assistant-WebSocket-Regressionspfad für
  Registrierung, Zuordnung, neue Aufenthalte, Idempotenz und Grenzen.
- Keine Datenbankmigration und keine Änderung produktiver Daten.

🇩🇪 Deutsch | 🇬🇧 [English](README.en.md)

## 0.3.0-beta.6 – Praxis-Fixes

- Fehlerbehandlung und Refresh nach der Aufenthaltserfassung aus GPS-Unterbrechungen korrigiert.
- Diagnosekarte wieder im Home-Assistant-Kartenkatalog registriert.
- Legacy-Migrationshinweis aus eingebetteten Karten der zentralen Journal-Karte entfernt.

## 0.3.0-beta.7 – Aufenthaltsverwaltung

- Unterbrechungen werden über den atomaren Interruption-API-Pfad als Aufenthalt gespeichert und idempotent mit bestehenden Orten verknüpft.
- Orte & Aufenthalte werden kompakt nach Übernachtungsplätzen, Zwischenstopps und nicht zugeordneten Fahrtunterbrechungen gruppiert.
- Interne Kategoriecodes werden in der Oberfläche durch übersetzte Bezeichnungen ersetzt.
- Die produktive Ursache des VM-104-Speicherfehlers ist wegen fehlendem read-only Zugriff nicht bestätigt; der offene Praxistest bleibt dokumentiert.

## 0.3.0-beta.5 – zentrale Kartenmigration

- Nur die zentrale Journal Card wird im Lovelace-Kartenkatalog für neue
  Dashboards angeboten; Legacy-Karten bleiben technisch kompatibel.
- Legacy-Karten zeigen dauerhaft einen gut lesbaren Migrationshinweis mit Link
  zur Anleitung. HACS besitzt keinen eigenen, unterstützten Warnbanner.
- Die zentrale Timeline öffnet Bereiche standardmäßig geschlossen und lässt
  immer nur einen Hauptbereich gleichzeitig offen.
- Stable bleibt bis zum authentifizierten Test in einer isolierten
  Home-Assistant-Instanz gesperrt.

## 0.3.0-beta.4 – verknüpfte Fahrtunterbrechungen

- Fahrtunterbrechungen erscheinen chronologisch zwischen den zugehörigen Fahrten.
- „Aufenthalt zuordnen“ öffnet einen mobilen Dialog für bestehende Orte,
  Übernachtungsplätze, neue Einträge, Fahrtpausen und irrelevante Stopps.
- Entscheidungen bleiben in der additiven Schema-9-Tabelle persistent und
  können geändert werden, ohne GPS-Rohdaten oder Orte zu duplizieren.
- Die zentrale Journal Card verwendet dafür weiterhin ausschließlich die aktive
  Reise-ID; Legacy-Karten bleiben kompatibel.

## 0.3.0-beta.3 – zentrale Journal-Oberfläche

- Neue zentrale `camper-travel-journal-journal-card` als empfohlener Einstieg
  für neue Dashboards: Reise auswählen oder anlegen, Reise öffnen, Funktionen
  nutzen und Reise wieder schließen.
- Der geöffnete Reisekontext bindet Manager, Karte, Fahrten, Unterbrechungen,
  Orte, Kosten, GPX-Import und PDF-Export an dieselbe Reise-ID.
- Bestehende Summary-, Manager- und Map-Karten bleiben als kompatible
  Bestandskonfigurationen erhalten; die Diagnostics Card bleibt unabhängig.
- Die Bewertungsmaske verwendet eine mobile, tastaturbedienbare Auswahl von
  ein bis fünf Sternen mit optionalen Einzelkriterien.

## 0.3.0-beta.2 – rückwirkative GPS-Aufenthalte und gemeinsamer Reisekontext

- Retroaktive GPS-Stoppvorschläge werden bei gesetzter Reise strikt aus den
  zugeordneten Fahrt-/GPS-Punkt-Beziehungen ermittelt; GPS-Lücken werden nicht
  als Aufenthalte gespeichert.
- Summary, Manager und Map synchronisieren den aktiven Reisekontext pro
  Lovelace-Dashboard und Fahrzeug; der PDF-Export verwendet dieselbe Reise.
- Ortsformulare sind auf iPhone-Breiten einspaltig und touch-freundlicher.
- Fahrtunterbrechungen zwischen aufeinanderfolgenden Fahrten werden read-only
  abgeleitet, als unbestätigt angezeigt und erst nach ausdrücklicher Benennung
  als Ort gespeichert.
- Die Map Card bietet einen sichtbaren, nicht automatisch speichernden Modus
  „Ort hinzufügen“; Kartenklicks erzeugen zunächst nur eine Vorschau.
- Fahrtübersichten und PDF-Berichte enthalten Start-/Enddatum, Uhrzeit, Dauer,
  Strecke und Herkunft der Fahrt.
- Produktive Reisen, Fahrten, GPS-Punkte und Kosten bleiben unverändert.

## 0.2.0 – Stable

- Stable release of the four-card Lovelace experience: Summary, Manager, Map
  and optional Diagnostics.
- CARTO Basemaps options, authenticated in-memory PDF travel reports, local
  Home Assistant timezone formatting and localized expense categories.
- Documentation, release metadata and frontend cache version updated for the
  stable release. Historical beta entries remain below.

## 0.2.0-beta.6 – PDF-Reiseberichte

- Authentifizierter PDF-Export der aktuell gespeicherten Reise mit Fahrten, Kosten, Ausgaben, Zwischenstopps und Notizen.
- A4-Layout mit Seitenzahlen, Erstellungsdatum, deutschen/englischen Beschriftungen und sprachabhängiger Formatierung.
- PDF-Dateien werden nur im Speicher erzeugt und nicht dauerhaft oder öffentlich abgelegt.
- Kompakte Reisezeiträume in der Map Card vermeiden abgeschnittene Datumsangaben auf schmalen Displays.

## 0.2.0-beta.5 – kompakte responsive Reisekarte

- Kompakter Kartenkopf mit Reiseauswahl und Fahrzeugkontext.
- Dynamische Kilometer-, Auswahl- und Zeitraum-Kennzahlen.
- Einklappbare Fahrtabschnitte mit Einzel-, Alle-auswählen- und Alle-abwählen-Steuerung.
- Responsive Kartenhöhe, Touch-freundliche Bedienung, Fokuszustände und stabiler Leaflet-Lifecycle.
- CARTO, manuelle Tile-Overrides, GPS-Routen, Marker und Lücken bleiben unverändert.

## 0.2.0-beta.4 – Options-Lebenszyklus

- CARTO-Optionen werden bei Änderungen zuverlässig in der laufenden Integration wirksam.
- Leere Passwortfelder behalten vorhandene Schlüssel; explizites Entfernen bleibt möglich.
- Config-Entry-Reloads sind unload-gebunden und werden nicht doppelt registriert.
- WebSocket- und Frontend-Regressionsabdeckung für Optionsänderungen ergänzt.

## 0.2.0-beta.3 – CARTO Basemaps

- Ergänzt CARTO Basemaps als optionalen Anbieter im Integrations-Optionsflow.
- Speichert, ändert und entfernt den API-Schlüssel über ein Passwortfeld; bestehende Schlüssel werden beim Bearbeiten nicht vorbefüllt.
- Verwendet die offizielle CARTO-Voyager-Raster-URL und die Attribution `© OpenStreetMap contributors, © CARTO`.
- Dokumentiert, dass browserbasierte Tile-Anfragen den Schlüssel in der Netzwerkansicht sichtbar machen.
- Bewahrt manuelle `tile_url`/`tile_attribution`-Overrides und lässt GPS-Routen ohne Hintergrundkarte sichtbar.

## 0.2.0-beta.2 – regelkonforme Kartenprovider

- OSM-Kacheln werden nicht mehr ungefragt als Standardprovider verwendet.
- `tile_url` und `tile_attribution` bleiben für einen autorisierten Provider konfigurierbar.
- Kachelfehler entfernen die Hintergrundebene und lassen GPS-Routen sichtbar.
- Fahrtabschnitte werden chronologisch aufsteigend angezeigt.

## 0.2.0-beta.1 – erste Karten-Beta

- Ergänzt die additive Schema-7-Tabelle `drive_gps_points` für explizite
  GPS-Punkt-zu-Fahrt-Zuordnungen.
- Speichert GPX-Punktmitgliedschaften innerhalb des atomaren Imports exakt und
  kennzeichnet historische Intervall-Rekonstruktionen getrennt.
- Ergänzt den read-only WebSocket-Befehl `camper_travel_journal/route` mit
  Fahrtfiltern, Bounds, GPS-Lücken, Punktlimit und response-seitiger
  Vereinfachung.
- Ergänzt die eigenständige Leaflet-Karte
  `custom:camper-travel-journal-map-card` mit Reiseauswahl, Segmentfarben,
  Start-/Endmarkern und sichtbarer Karten-Attribution.
- Keine Routing- oder Geocoding-Anfragen; Originalkoordinaten werden nicht
  verändert.

## 0.1.0 – veröffentlicht

- Stabilisiert die Summary Card: Titel, Ziel, Zeitraum, Status, Kennzahlen und
  Aktionen stammen immer aus derselben ausgewählten Reise.
- Bevorzugt aktive Reisen und bewahrt eine manuelle Reiseauswahl bei Refresh.
- Enthält die explizite GPX-Zielreiseauswahl, freie Fahrten und die sichere
  historische GPX-Importkette aus den Betas.
- Modernisiert die deutschsprachige Projektdokumentation und ergänzt die
  vollständige englische README.
- Keine automatische Änderung bestehender Reisen, Fahrten, Kosten oder
  produktiver Home-Assistant-Daten.

## 0.1.0-beta.18 – veröffentlicht

- Bevorzugt in der Summary Card deterministisch eine aktive Reise vor
  geplanten Reisen.
- Ergänzt eine kompakte Reiseauswahl für geplante, aktive, pausierte und
  abgeschlossene Reisen; die Auswahl bleibt bei Datenaktualisierungen erhalten.
- Bezieht Kennzahlen, Kosten, Fahrten und Statusaktionen ausschließlich aus der
  ausgewählten Reise.
- Ergänzt deutsche/englische Beschriftungen, mobile Darstellung und
  Chromium-/Bundle-Regressionsprüfungen.
- Backend, GPX-Import, Datenbank und bestehende Produktivdaten bleiben
  unverändert.

## 0.1.0-beta.15 – veröffentlicht

- Ergänzt sicheren, begrenzten GPX-1.1-Import für historische PAJ-Fahrten.
- Zeigt eine read-only Vorschau mit UTC-Zeitstempeln, Fahrtabschnitten,
  Entfernungen, Pausen-/Lückenhinweisen und Konflikten.
- Importiert nach ausdrücklicher Bestätigung atomar und idempotent in bestehende
  Fahrzeuge und Reisen; doppelte und überlappende Importe werden abgewiesen.
- Akzeptiert gültige XML-CDATA und weist weiterhin DOCTYPE-/ENTITY-Deklarationen,
  übergroße Dateien und zu viele Punkte ab.
- Real-GPX-Abnahmetest: 903 Punkte, drei Fahrtabschnitte, isolierter SQLite-
  Import und Wiedereröffnung erfolgreich; Originalkoordinaten bleiben erhalten.

## 0.1.0-beta.14 – veröffentlicht

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
## 0.1.0-beta.15 – GPX-Import vorbereitet

- Sicherer, begrenzter GPX-1.1-Parser für Tracks und Tracksegmente.
- Read-only Vorschau mit UTC-Zeitstempeln, Fahrtenerkennung, Sprung-/Lückenhinweisen und Duplikatkonflikten.
- Atomarer, idempotenter Import in bestehende Fahrzeuge und Reisen.
- Manager-Karte mit Dateiauswahl, Vorschau und ausdrücklicher Bestätigung.
# v0.3.0 (development)

- Added authenticated place, overnight-detail, rating, expense-link and GPS-stop-suggestion APIs on top of schema v8.
- Added gap-aware, deduplicated pending GPS suggestions with explicit accept/dismiss actions; suggestions never become public stops automatically.
- Extended the ReportLab report with place type, stay duration, ratings and linked expense context while preserving timezone-aware output.
- Added a provider-neutral public export contract with coordinates, descriptions, notes and expenses opt-in only.
- Extended the map bundle with confirmed place markers and typed place API helpers. No fifth card was added.
## 0.3.0-beta.11

- Correct expense category editing for canonical and legacy values; improve responsive expense actions and the optional time checkbox.
- Add responsive overnight-place metrics, robust route-map fitting, saved-place endpoint labels, and an offline GPX route map in PDF reports.
- Preserve GPX data, distances, manual labels, and existing migration semantics; no external geocoding is required.
# v0.3.4

- Reuses the existing nullable expense `note` field for an optional multiline note across all categories.
- Adds safe note editing, clearing, Unicode/newline support, a documented 2,000-character limit, Journal Card rendering, and wrapped bilingual PDF output.
- Preserves fuel details, amounts, totals, and all existing records without a database migration.

# v0.3.3

- Adds optional fuel liters and price-per-liter fields to create/edit expense forms.
- Completes missing fuel values deterministically and rejects inconsistent values.
- Shows fuel details in the central expense list and PDF travel reports.
- Adds an additive SQLite migration; existing expenses remain unchanged.
## 0.3.8 – Sichtbares Feedback für historische GPS-Stoppvorschläge

- **DE:** Der Button „Vorschläge aktualisieren“ zeigt jetzt Lade-, Erfolgs- und Fehlerzustände auch in der eingebetteten Journal-Card und verhindert parallele Requests.
- **EN:** “Refresh suggestions” now shows loading, success and error states in the embedded journal card and prevents concurrent requests.
# 0.3.10 – Sichere Fahrtlöschung und laufende GPS-Aufenthalte

## Deutsch

- Fahrtlöschung mit Bestätigungsdialog; GPS-Rohpunkte, Kosten, Aufenthalte und Reisen bleiben erhalten.
- Dauerhafte Ausschlüsse verhindern die Wiedererzeugung einer ausdrücklich gelöschten GPS-Fahrt, ohne neue Punktfolgen pauschal zu blockieren.
- Null-Minuten-Vorschläge werden nicht mehr erzeugt oder übernommen; laufende Vorschläge bleiben ohne Abfahrtszeit.

## English

- Drive deletion now uses a confirmation dialog; raw GPS points, costs, stays, and trips remain intact.
- Durable exclusions prevent an explicitly deleted GPS drive from reappearing without suppressing new point sequences.
- Zero-duration suggestions are no longer created or accepted; ongoing suggestions keep departure unknown.
# 0.3.11 – Direkte Fahrtlöschung in der zentralen Journal-Card

- Jede GPS-Fahrt kann direkt im jeweiligen Fahrtdetail der zentralen Journal-Card über ein dezentes Papierkorb-Symbol gelöscht werden.
- Vor der Löschung zeigt ein natives Bestätigungsdialogfeld Datum, Uhrzeit, Strecke und den Erhalt der GPS-Rohpunkte an.
- Nach erfolgreicher Löschung wird die geöffnete Fahrtenliste unmittelbar aktualisiert.
- Die bestehende sichere `delete_drive`-API und die dauerhaften Ausschlüsse aus Schema 14 werden wiederverwendet; Aufenthalte, Kosten, Reisen und GPS-Rohdaten bleiben unverändert.
- Die mobile Dialogbedienung ist für schmale iOS-Ansichten optimiert.

## 0.3.11 – Direct drive deletion in the central Journal Card

- Each GPS drive can be deleted directly from its drive detail in the central Journal Card with a discreet trash icon.
- A native confirmation dialog shows the date, time, distance, and that raw GPS points will be retained.
- The open drive list refreshes immediately after a successful deletion.
- The existing safe `delete_drive` API and Schema 14 durable exclusions are reused; stays, costs, trips, and raw GPS data remain unchanged.
- The dialog actions are optimized for narrow iOS layouts.
