# Upgrade auf v0.3.2

Dieses Dokument beschreibt den Upgradepfad von v0.3.0 und v0.3.1 auf den
aktuellen Stable-Stand v0.3.2. Die v0.3.2 ist eine UI-/Dokumentationspflege
auf Basis von v0.3.1; sie verschiebt den bestehenden Tag nicht und ändert
weder Datenmodell noch GPS-/Statuslogik.

## Unterstützter Upgrade-Pfad

Der Release-Stand verwendet eine eigene SQLite-Datei
`camper_travel_journal.db` im Home-Assistant-Konfigurationsverzeichnis. Die
Schemaentwicklung ist additiv und wird beim Start durch die Integration
angewendet. Vor dem Upgrade muss diese Datei über den normalen Home-Assistant-
Backupweg gesichert werden.

Getestete Grenzen:

- Neuinstallation mit leerer SQLite-Datei.
- Bestehende v0.2.0-Strukturen und Legacy-Kostenkategorien.
- beta.13-Daten mit GPX-Fahrten, Aufenthalten, Bewertungen, Kosten und
  optionalen Ausgabendaten.
- Idempotentes erneutes Öffnen und erneute Verarbeitung ohne Kilometer- oder
  Duplikatänderung.

Die Integration verwendet nicht den Home-Assistant-Recorder und bietet keinen
MariaDB-/PostgreSQL-Adapter. Die Datenbank ist daher separat zu sichern.

## Vorgehen

1. Home-Assistant-Backup einschließlich der Integrationsdatei erstellen.
2. In HACS **Camper Travel Journal** auf `v0.3.2` aktualisieren.
3. Home Assistant nach dem HACS-Update manuell neu starten.
4. Config Entry und Options prüfen; insbesondere `device_tracker`, Zuhause-
   Radius, Kartenanbieter und Reverse Geocoding.
5. Journal Card öffnen und eine bestehende Reise prüfen.
6. Kosten, Fahrten, Aufenthalte, Kilometer, GPX-Route und PDF testweise lesen.
7. Erst danach die GPS-Aufzeichnung wieder aktivieren, falls sie zuvor
   deaktiviert war.

## Rückfall

Bei einem Problem Home Assistant beenden, das Backup wiederherstellen und den
vorherigen unveränderten GitHub-Tag installieren. Tags werden nicht verschoben
oder überschrieben. Eine Wiederherstellung darf nicht mit einer produktiven
Migration während des laufenden Betriebs verwechselt werden.

## Daten- und Funktionsgrenzen

Die v0.3.2 ändert keine bestehenden GPX-Rohpunkte, Fahrten, Kilometer,
Aufenthalte oder Ausgaben durch reine Anzeigeänderungen. Reverse Geocoding ist
aus; eine Aktivierung ist eine bewusste Datenschutzentscheidung. Eine vollständige
Online-Straßenkarte ist nicht Bestandteil des Upgrades.
