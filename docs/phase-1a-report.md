# Camper Travel Journal — Phase 1A Abschlussbericht

Stand: 2026-10-14, Europe/Berlin. Die Live-Prüfung war read-only. Es gab keine
Änderung an VM 104, Proxmox, Home Assistant, Dashboards, `mobile_fuel_stations`
oder `device_tracker.wohnmobil_zoe`; es wurden keine Dienste neu gestartet,
keine produktiven Daten gelöscht und kein GitHub-Repository angelegt.

## 1. Bestandsprüfung

- Proxmox read-only identity check: host `pve-home`, Proxmox VE `9.2.0`,
  `pve-manager 9.2.21`, VM `104` status `running`.
- Home Assistant: **2026.10.1**, Status `RUNNING`, Zeitzone `Europe/Berlin`,
  Sprache Deutsch.
- Zielentität: `device_tracker.wohnmobil_zoe`, Anzeige `Zoe`.
- Registry: Plattform `paj_gps`, `source_type=gps`, Tracking-Typ `position`;
  die Entität ist aktiviert.
- Aktueller beobachteter Zustand: `home`, Koordinaten vorhanden,
  `gps_accuracy=0`.
- Recorder: 14-Tage-Anfrage lieferte 38.791 Datensätze (Tool-Limit/Pagination
  wurde sichtbar); ein 48-Stunden-Fenster enthielt mindestens 1.000 Ereignisse.
  In dem ausgewerteten Ausschnitt lagen die Updates überwiegend bei ca. 30 s;
  eine Lücke über 90 s, keine über 10 min.
- Attribute im ausgewerteten Verlauf: `latitude`, `longitude`,
  `gps_accuracy`, `source_type`, `tracking_type`, `in_zones`.
  **`speed`, `course` und `altitude` wurden nicht geliefert.**
- Logs: keine Systemlog-Treffer zum exakten Entity-ID-Suchbegriff.

`mobile_fuel_stations` ist separat geladen und nutzt dieselbe Tracker-Entität
als `location_entity`. Es wurden Optionen gelesen, aber nicht verändert:
Bewegungsupdates sind dort bereits aktiviert. Das neue Projekt darf diese
Integration nicht koppeln oder deren Optionen übernehmen.

## 2. Bewertung der GPS-Quelle

Die Quelle ist für einen ereignisbasierten Collector **geeignet**, weil sie
regelmäßige Position-Attribute und Recorder-Historie liefert. Sie ist nicht
allein ausreichend für präzise Geschwindigkeitslogik: Geschwindigkeit/Kurs
fehlen und `gps_accuracy=0` muss als Quellenwert, nicht als automatisch
bewiesene Messgenauigkeit, behandelt werden. Der Collector braucht daher
Distanz/Zeit-Schätzung, Sprunggrenze, Lückenstatus und konservative Defaults.

## 3. HA-API- und Speicherentscheidung

- Listener: `async_track_state_change_event` für die konfigurierte Entität.
  Attribut-only updates müssen mit HA 2026.10 gezielt über `state_reported`
  geprüft werden; der Event-Typ ist hochvolumig und braucht einen Filter.
- Shutdown: Listener und Tasks über den Config-Entry-Lifecycle abmelden.
- Blocking I/O: SQLite niemals im Event Loop; komplette Transaktionen über
  `hass.async_add_executor_job` oder einen dedizierten Worker ausführen.
- Persistenz: eigene DB im HA-Konfigurationsverzeichnis, z. B.
  `<config>/camper_travel_journal.db`; kein Zugriff auf Recorder-Interna.
  HA `Store` ist für kleine JSON-Metadaten geeignet, nicht für die geplante
  wachsende Punkt-/Routen-Tabelle.

## 4. Architektur und Schema

Siehe [architecture.md](architecture.md) und
[database-schema.md](database-schema.md). Der lokale Entwurf trennt Collector,
Validierung, Detector, Storage, Retention, Travel und Expense Manager.

## 5. Fahrterkennung

Der Entwurf startet erst nach zwei plausiblen Bewegungsproben, beendet nach
fünf Minuten ohne Bewegung und führt Distanz nur zwischen zeitnahen,
plausiblen Punkten fort. Ein Gap über zehn Minuten erzeugt ein Gap-Ereignis
und beendet/unterbricht die Distanzkette; die Luftlinie zwischen den Endpunkten
wird ausdrücklich nicht als gefahrene Strecke gezählt. Ein späterer manueller
Kilometerstand erhält Vorrang vor GPS-Schätzung.

## 6. Aufbewahrung und Zuordnung

Unzugeordnete GPS-/Fahrtdaten sind 90 Tage bereinigbar. Daten, die über
`trip_drives` zugeordnet sind, bleiben dauerhaft. Zuordnung ist reversibel:
Link löschen, Rohpunkte/Fahrt behalten. Eine Fahrt darf wegen der Unique-FK
nicht gleichzeitig zwei Reisen zugeordnet sein. Überlappende Reisezeiträume
sind möglich, aber bei Auswahl warnpflichtig. Löschung/Archivierung ist in
Phase 1A nur als Regel beschrieben, nicht implementiert.

## 7. Erstellte lokale Dateien

- `custom_components/camper_travel_journal/`: Manifest, Konstanten,
  Domain-Modelle, Validierung, Detector, Retention und SQLite-Schema.
- `tests/`: ausführbare, HA-freie Tests.
- `docs/`: Architektur, Schema, Testplan und dieser Bericht.
- `README.md`, `README.de.md`, `LICENSE`, `hacs.json`, `.gitignore`.

## 8. Qualitäts-/HACS-Prüfung

HA verlangt für neue Core-Integrationen mindestens Bronze; HACS verlangt u. a.
eine öffentliche GitHub-Struktur mit genau einer Integration unter
`custom_components/`, gültigem Manifest, README, `hacs.json`, Branding und
späteren Validierungs-Workflows. In Phase 1A fehlen absichtlich noch Config
Flow, echter Codeowner, öffentliches Repository, Release und `brand/icon.png`.
Das Verzeichnis ist deshalb **eine vorbereitete lokale Entwicklungsbasis,
noch keine veröffentlichungsfertige HACS-Integration**.

## 9. Risiken/offene Entscheidungen

1. Tracker liefert keine Geschwindigkeit/Kursdaten; Schwellwerte müssen mit
   realen Fahrten kalibriert werden.
2. `gps_accuracy=0` semantisch mit PAJ-GPS klären.
3. `state_reported`-Verhalten und Last mit einer HA-Testinstanz verifizieren.
4. Mehrere Fahrzeuge und Tracker-Auswahl brauchen einen Config Flow.
5. SQLite-Backup/Restore, Migration und ggf. WAL-Verhalten auf HA OS testen.
6. Codeowner/GitHub-URL und Branding fehlen, da keine externe Freigabe vorlag.

## 10. Vorschlag Phase 1B

1. Config Flow/Options Flow für Fahrzeuge, Tracker, 30 s, 25 m, Gap- und
   Retention-Werte bauen.
2. Read-only Dry-run Collector mit Diagnosezähler und Test-Eventquelle;
   zunächst keine Produktivdaten schreiben.
3. SQLite-Worker, Migration 1, Restart-Recovery und vollständige HA-Fixtures.
4. Kontrollierte Pilotfreigabe nach separatem Backup und expliziter
   Produktivfreigabe; erst danach dauerhafte GPS-Aufzeichnung aktivieren.
