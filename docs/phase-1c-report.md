# Camper Travel Journal – Phase 1C Abschlussbericht

Stand: 2026-10-14, Europe/Berlin.

## 1. Implementierungsprüfung

Die Implementierung enthält inzwischen:

- Config Flow und Options Flow mit Fahrzeug, Tracker und Laufzeitparametern.
- Entity-Validierung für `device_tracker` mit Koordinatenprüfung.
- Ereignisbasierten Collector ohne permanente Polling-Schleife.
- UTC-Normalisierung, Genauigkeitsgrenze, Duplikatfilter, adaptive
  Speicherung, Sprungerkennung und Gap-Schutz.
- Eigene SQLite-Datei im HA-Konfigurationsverzeichnis, getrennt vom Recorder.
- Fremdschlüssel, Indizes, Transaktionen, Schema-Version und asynchronen
  Worker.
- Mehrfahrzeug-Unterstützung und begrenztes Replay zur Restart-Recovery.
- Retention-Kandidatenberechnung als Dry-Run ohne DELETE.
- Backend-Protokoll für einen späteren optionalen MariaDB-Adapter.

Unvollständig bzw. nicht produktionsreif bleiben:

- Die HA-Integration wurde nicht in einer echten HA-2026.10.1-Instanz geladen.
- `state_reported` wird zusätzlich entity-gefiltert abonniert; der bestehende
  `async_track_state_change_event`-Listener verarbeitet weiterhin echte State-
  oder Attributänderungen.
- Echter HA-Config-/Options-Flow, Listener-Unload und Backup/Restore sind nur
  offline bzw. durch Codeprüfung abgedeckt.
- MariaDB/PostgreSQL-Adapter existieren nicht.
- Produktive Retention-Löschung ist absichtlich nicht implementiert.
- HACS-Publikationsanforderungen wie Codeowner, Branding, öffentliches Repo,
  Release und CI fehlen absichtlich.

## 2. Testumgebung

Eine isolierte HA-Core-Umgebung konnte nicht eingerichtet werden:

- Python 3.13.5 ist vorhanden.
- `pip` ist nicht installiert.
- Home Assistant, `pytest`, `hassfest`, Docker und Podman sind nicht
  vorhanden.
- Es wurde keine Installation nachinstalliert, weil dafür die lokale
  Werkzeugkette fehlt und kein produktives System verwendet werden darf.

Daher wurden keine isolierten HA-Integrationstests und kein Hassfest-Lauf
ausgegeben oder vorgetäuscht.

## 3. Tatsächlich ausgeführte Tests

Mit synthetischen Daten wurden **18/18 Offline-Tests bestanden** (16 aus dem
vorherigen Stand plus Genauigkeits-/Fehlerfalltests). Abgedeckt sind:

- Config-Defaults und Tracker-Validierung
- Übersetzungsstruktur Deutsch/Englisch
- Koordinaten, Genauigkeit, Zeitstempel und Sprünge
- Duplikate und adaptive Speicherung
- Fahrtbeginn, Fahrtende, Gaps und Stopps
- `unknown`/`unavailable`
- mehrere Fahrzeuge
- SQLite-Fremdschlüssel, Indizes, Transaktionen und Worker-Schließen
- Restart-Recovery ohne doppelte Punkte
- Retention-Dry-Run und Schutz zugeordneter Punkte
- JSON-/Manifest-Prüfung und Python-Kompilierung

Zusätzlich wurden `git diff --check` und JSON-Prüfungen erfolgreich ausgeführt.

## 4. Abgrenzung der Ergebnisse

| Testart | Ergebnis |
| --- | --- |
| Synthetische Domain-/SQLite-Tests | 18/18 bestanden |
| Isolierte Home-Assistant-Integrationstests | nicht ausgeführt – HA/Pytest fehlen |
| Hassfest | nicht ausgeführt – Tool fehlt |
| Produktivtests | nicht ausgeführt und verboten |
| MariaDB | nicht getestet, kein Adapter vorhanden |
| Backup-/Restore-Test mit realem HA-Backup | nicht ausgeführt |

## 5. HACS-/Kompatibilitätsstatus

Die lokale Struktur ist grundsätzlich HACS-orientiert: eine Integration unter
`custom_components/`, Manifest, README und `hacs.json`. Sie ist jedoch noch
nicht veröffentlichungsfertig. Der Manifest-Codeowner ist leer, Branding und
öffentliches Repository fehlen, und Hassfest wurde nicht ausgeführt.

## 6. SQLite und Recovery

Der Worker nutzt `hass.config.path("camper_travel_journal.db")`, aktiviert
Fremdschlüssel und serialisiert alle Operationen außerhalb des Event-Loops.
Der letzte Punkt-Tail wird beim Neustart replayed. Doppelte Punkte werden über
die Unique-Struktur und Zeit-/Koordinatenprüfung verhindert. Gaps werden nicht
als Luftlinienkilometer gezählt.

## 7. Retention-Sicherheit

Die Phase berechnet nur Kandidaten. Es gibt keinen produktiven DELETE-Aufruf.
Punkte innerhalb zugeordneten Fahrten werden aus den Kandidaten ausgeschlossen;
Reise- und Ausgabedaten werden nicht bereinigt. Die Frist ist konfigurierbar,
der Standard beträgt 90 Tage. Ein echter Löschlauf wurde nicht ausgeführt.

## 8. Empfehlung für Phase 1D

Phase 1D sollte zunächst eine isolierte HA-2026.10.1-Testumgebung mit
festgeschriebener Python-/Pytest-/Hassfest-Version bereitstellen. Danach sind
echte Config-/Options-Flow-Fixtures, Listener-Lifecycle, attribute-only
Updates, Fehlerdatenbanken, Backup/Restore und ein kontrollierter MariaDB-
Adapter-Spike zu prüfen. Eine produktive Installation oder Aufzeichnung ist
vor diesen Gates nicht zu empfehlen.
