# Änderungsprotokoll

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
