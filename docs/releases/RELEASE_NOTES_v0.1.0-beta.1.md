# Camper Travel Journal v0.1.0-beta.1 – Versionshinweise

🇩🇪 Deutsch | 🇬🇧 [English](../../README.en.md)

Frühe Entwickler-Beta für ein datenschutzbewusstes digitales
Wohnmobil-Reisetagebuch für Home Assistant.

## Enthalten

- Config Flow und Options Flow für mehrere Fahrzeuge
- Ereignisbasierter GPS-Collector mit synthetisch getesteter Validierung
- Eigene SQLite-Datenbank im Home-Assistant-Konfigurationsverzeichnis
- Schema-Versionierung, asynchroner Worker und Neustart-Wiederherstellung
- Retention-Dry-Run ohne destruktive Löschung
- Deutsche und englische Projektübersetzungen sowie Branding-Assets

## Wichtige Einschränkungen

- Dies ist keine stabile Version und nicht produktionsreif.
- Produktive Home-Assistant-Installation und GPS-Aufzeichnung benötigen eine
  separate Validierung und Freigabe.
- Die Datenbank ist von Home Assistant Recorder getrennt; MariaDB-/PostgreSQL-
  Adapter sind nicht enthalten.
- Reise- und Ausgabenverwaltung besitzen nur Schema-Grundlagen, keine UI.
- Keine exakten GPS-Koordinaten oder Bewegungsprofile in Issues veröffentlichen.

## Validierung

Die Beta darf nur dann als qualitätsgesichert gelten, wenn Python-/HA-Tests,
Hassfest, HACS-Strukturprüfung, JSON-Validierung und Secret-Scan auf dem
tatsächlich veröffentlichten Commit erfolgreich sind.

## English summary

Early developer beta with Config/Options Flow, event-driven GPS collection,
separate SQLite storage, restart recovery and retention dry-run. It is not a
stable release; travel/expense UI and production validation are not included.
