# GPS-Praxistest-Diagnose v0.3.4 – doppelte Fahrten und Stopperkennung

Datum: 2026-10-24  
Repository-Basis: Stable `v0.3.4`  
Branch: `diagnosis/v0.3.4-gps-duplicates-stop`

## Scope und Beweislage

Die Diagnose ist read-only gegenüber VM 104, Home Assistant und produktiven
SQLite-Daten. Es wurden keine produktiven Fahrt-, GPS-, Reise- oder
Stop-Datensätze gelesen oder verändert. Die konkrete Behauptung, dass die sechs
angezeigten Einträge sechs verschiedene Produktions-IDs besitzen, konnte daher
nicht direkt bestätigt werden. Die folgenden Befunde sind Quellcode- und
isolierte Testbefunde; sie werden nicht als Live-Datenbefund ausgegeben.

## Fahrten-Duplikate

### Nachgewiesener Quellcodefehler

Eine erkannte Live-Fahrt erhält in `DriveDetector._finish()` immer eine neue
UUID. Die `drives`-Tabelle erzwingt nur `id` als Primary Key; für
`vehicle_id + started_at + ended_at` gibt es keine fachliche Eindeutigkeit.
`INSERT OR IGNORE` verhindert deshalb nur das erneute Einfügen derselben UUID,
nicht das Speichern derselben Fahrt mit einer neuen UUID.

Das ist reproduzierbar, wenn zwei Detektoren – etwa durch einen überlappenden
Reload-/Listener-Lifecycle – denselben synthetischen Track abschließen:
Vor der lokalen Korrektur entstehen zwei verschiedene Fahrten für dasselbe
Intervall. Die Frontend-Liste fügt keine Duplikate hinzu; sie rendert die vom
Backend gelieferte Fahrtliste. Eine reine Frontend-Dopplung ist damit im
Quellpfad nicht der naheliegende Mechanismus.

### Ereignisquellen

Die Runtime registriert sowohl `state_changed` als auch entity-gefiltertes
`state_reported`. Derselbe Tracker-Bericht kann deshalb beide Callback-Pfade
erreichen. Bei identischem Zeitstempel wird der zweite Bericht aktuell als
`timestamp_not_increasing` verworfen; er erzeugt im isolierten Test keine zweite
GPS-Aufzeichnung. Der Detektor wird allerdings für jeden validierten Bericht
aufgerufen, auch wenn der Collector den GPS-Punkt wegen Zeit-/Bewegungsfilter
nicht speichert. Das ist ein zusätzlicher Lifecycle-/Semantik-Risikopunkt.

Der normale HA-Unload-Pfad entfernt beide Listener. Aus dem Quellcode allein
ist nicht beweisbar, dass im produktiven Lauf tatsächlich zwei Runtime-
Instanzen gleichzeitig aktiv waren; die neue Speicherungssperre schützt aber
gegen genau diese Wiederholung desselben Live-Intervalls.

### Lokale Korrektur

Im Diagnosebranch prüft `insert_drive()` innerhalb derselben SQLite-
Transaktion für `source='gps'`, ob Fahrzeug, Start- und Endzeit bereits
vorhanden sind. Dann wird die bestehende kanonische ID zurückgegeben.
Der Collector verwendet diese ID auch für GPS-Punktzuordnung und automatische
Reisezuordnung. Manuelle und GPX-Fahrten bleiben davon unberührt. Es gibt keine
Migration und keine Änderung bestehender Zeilen.

## Stopperkennung

### Nachgewiesene Runtime-Grenze

Ein Live-Stop wird erst bei einem weiteren akzeptierten GPS-Punkt geprüft:

- `stop_after` ist konfigurierbar, Standard sind 10 Minuten.
- Der letzte Punkt muss mindestens `stop_after` nach dem letzten bewegten Punkt
  liegen und innerhalb der GPS-Lücken-Grenze bleiben.
- Ohne weitere Tracker-Meldung läuft der Detektor weiter in `DRIVING`; die
  Live-Runtime hat keinen Timer und keinen End-of-stream-Abschluss.
- `finish_at_end()` beendet nur eine GPX-Importvorschau mit `track_end` und wird
  nicht für Live-Tracker aufgerufen.
- Überschreitet der nächste Punkt `max_gap` (Standard 10 Minuten), wird die
  offene Fahrt mit `gps_gap` beendet; die Lücke wird nicht als Strecke gezählt.

Das erklärt sicher, warum ein realer Halt ohne weitere GPS-Berichte weder als
`stationary_timeout`-Fahrtende noch als anschließender Vorschlag sichtbar sein
muss. Es ist kein Beweis, dass genau dieser Mechanismus im genannten
Produktivfall eingetreten ist.

### Stoppvorschläge

`generate_stop_suggestions()` ist eine manuelle, rückblickende Analyse:

- standardmäßig mindestens 10 Minuten zusammenhängende Punkte,
- maximal 10 Minuten Abstand zwischen Punkten,
- maximal 150 m räumliche Ausdehnung,
- Ergebnis ist zunächst `pending`, niemals automatisch ein bestätigter Ort.

Mit `trip_id` werden ausschließlich GPS-Punkte berücksichtigt, die über
`drive_gps_points` einer Fahrt und über `trip_drives` dieser Reise zugeordnet
sind. Ohne `trip_id` wird fahrzeugweit analysiert. Der Reisestatus (`active`,
`paused` usw.) ist keine Voraussetzung; die isolierten Tests bestätigen auch
Vorschläge für eine pausierte Reise. Ein Fahrtabschluss erzeugt nicht
automatisch einen Aufenthaltsvorschlag. Bestätigte Aufenthaltsorte entstehen
erst durch Annahme eines Vorschlags oder eine manuelle Zuordnung.

Damit sind `0 Übernachtungsplätze`, `0 Orte` und `0 offene Vorschläge` nicht
widersprüchlich: Ein Vorschlag muss explizit aktualisiert werden und benötigt
zusammenhängende GPS-Punkte sowie – bei Reiseauswahl – eine Fahrtzuordnung.

## Isolierte Tests

`tests/test_gps_diagnosis.py` deckt ab:

- normale Fahrt mit anschließendem Stillstand,
- Fahrtende ohne weitere GPS-Meldung,
- identische `state_changed`-/`state_reported`-Ereignisse,
- Reload-/zweiten-Detektor-Simulation mit idempotenter Speicherung,
- unterschiedliche UUIDs für dasselbe Intervall,
- wiederholte Fahrtlistenabfrage,
- stationäre Vorschläge und Gap-Unterbrechung,
- Vorschläge unabhängig vom Reisestatus.

Ergebnis nach der lokalen Korrektur: **9 Diagnose-Tests bestanden**, vollständige
Suite **158 Tests bestanden**, Coverage **86,34 %**, Compileall und
`git diff --check` bestanden.

## Empfehlung

Die lokale Idempotenzkorrektur ist als gezielter Hotfix-Kandidat sinnvoll. Für
die Stopperkennung sollte vor einer Verhaltensänderung zunächst ein begrenztes
Produktiv-Telemetrie-/Trace-Konzept geprüft werden: letzter Tracker-Bericht,
Detektorstatus, `last_moving`, GPS-Gap und Zähler – ohne Koordinaten oder
Produktivdaten zu verändern. Ein Timer- oder Restart-Abschluss wäre eine
fachliche Änderung und sollte erst nach separater Freigabe und Tests für
Unsicherheit, GPS-Lücken und Neustarts implementiert werden.

## Status

- Kein PR, kein Tag und kein Release erstellt.
- Keine Installation oder Änderung auf VM 104.
- Keine produktiven Daten verändert oder bereinigt.
- Keine Fahrt automatisch gelöscht, zusammengeführt oder nachträglich geändert.
