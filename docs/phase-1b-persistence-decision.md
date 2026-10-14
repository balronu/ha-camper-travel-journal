# Phase 1B – Persistenzentscheidung (Stand 2026-10-14)

## Ergebnis der Machbarkeitsprüfung

Home Assistant 2026.10.1 dokumentiert den Recorder als Eigentümer seiner
Historien-Datenbank, Tabellen und Migrationen. Unterstützte Recorder-Engines
sind SQLite, MariaDB/MySQL und PostgreSQL; die Auswahl erfolgt über die
Recorder-Konfiguration. Dokumentiert sind Recorder-Historie, Filter und
Recorder-Aktionen wie `recorder.purge` – keine öffentliche API, über die eine
Custom Integration eigene Tabellen, Migrationen oder Transaktionen in die
aktive Recorder-Datenbank einhängen kann.

Direktes Schreiben in die Recorder-Datenbank, Zugriff auf
`homeassistant.components.recorder`-Interna oder das Einspielen eigener
SQLAlchemy-Tabellen wäre daher kein stabil unterstützter Integrationsweg. Es
würde außerdem Recorder-Migrationen und `purge_keep_days` mit den eigenen
90-Tage-/dauerhaft-Regeln vermischen. Dieser Teil von Phase 1B ist deshalb
angehalten; es wurde keine produktive Datenbank geöffnet oder verändert.

Die offizielle `Store`-Hilfe ist für JSON-serialisierbare Integrationsdaten im
HA-Konfigurationsverzeichnis vorgesehen. Sie eignet sich für Konfiguration,
Cursor und kleinen Restart-Zustand, aber nicht als wachsende, indizierte
GPS-Punkt-/Fahrt-Datenbank. Bei der Phase-1A-Messung wären bereits 38.791
Punkte in 14 Tagen zu erwarten; wiederholte JSON-Gesamtschreibvorgänge wären
für diese Datenmenge und Retention ungeeignet.

## Alternativen

| Ansatz | Vorteil | Nachteil / Status |
| --- | --- | --- |
| Recorder-Tabellen direkt erweitern | nutzt den vorhandenen DB-Server | nicht öffentlich unterstützt; private Interna, Recorder-Purge/Migration und Backend-Dialekte würden gekoppelt. **Nicht empfohlen, nicht implementieren.** |
| HA `Store` für alles | offiziell, kein DB-Server, backend-unabhängig | keine geeignete Append-/Index-/Batch-Löschstruktur für GPS-Routen. Nur für kleine Metadaten verwenden. **Nicht ausreichend allein.** |
| Eigene SQLite-Datei im HA-Konfigurationsverzeichnis | kein zusätzlicher Server, atomare Transaktionen, Indizes, unabhängige Retention und Restart-Recovery | nutzt nicht die vom Nutzer konfigurierte MariaDB; zusätzliche Datei muss in HA-Backup/Restore berücksichtigt werden. **Robuste Empfehlung.** |
| Eigene DB-Verbindung zur bestehenden MariaDB | gleiche Serverinstanz möglich | Zugangsdaten/Berechtigungen müssten sicher übergeben werden; Recorder-URL ist keine öffentliche Integrations-API; zusätzliche Konfiguration und Backend-Abhängigkeit. **Nicht ohne explizite Nutzerentscheidung.** |
| GPS nur als HA-Entitäten/Events in Recorder schreiben | keine zusätzliche Persistenz | Recorder-Purge löscht Rohdaten nach dessen Regel; keine unabhängige 90-Tage-/dauerhafte Zuordnungsgarantie; hohe Eventlast. **Nicht ausreichend.** |

## Empfehlung zur Freigabe

Phase 1B sollte mit einer **eigenen SQLite-Datei ohne separaten Datenbankserver**
fortgesetzt werden. Die Geschäftslogik erhält eine Repository-Schnittstelle;
SQLite ist zunächst der einzige produktiv getestete Adapter. `Store` bleibt
für kleine Konfigurations-/Recovery-Metadaten möglich. Ein MariaDB-Adapter
kann später als ausdrücklich optionale, separat konfigurierte Erweiterung
kommen, wird aber erst nach einem echten MariaDB-Testlauf als unterstützt
bezeichnet.

Damit bleiben Recorder-Tabellen, Credentials, Migrationen, Purge-Regeln und
der produktive Datenbestand vollständig unangetastet.

## Quellen

- [Recorder-Dokumentation für Home Assistant 2026.10.1](https://www.home-assistant.io/integrations/recorder/): unterstützte Datenbanken, Recorder-Schema-/Purge-Verantwortung und Aktionen.
- [Store runtime data inside the config entry](https://developers.home-assistant.io/blog/2024/04/30/store-runtime-data-inside-config-entry/): offizieller Runtime-/Config-Entry-Lifecycle.
- [Store is now a Generic class](https://developers.home-assistant.io/blog/2022/07/08/generic-store/): offizieller JSON-Store für Integrationsdaten.
- [Custom integration localization](https://developers.home-assistant.io/docs/internationalization/custom_integration/): Hinweis, dass Custom Integrations `translations/*.json` verwenden; `strings.json` ist hier nicht ausreichend.

## Konsequenz für den aktuellen Arbeitsstand

Der bisherige lokale SQLite-Prototyp wird nicht als Nutzung des Recorder-
Backends ausgegeben. Vor einer Fortsetzung müssen Adaptergrenze,
Backup-/Restore-Verhalten und die Entscheidung für die eigene SQLite-Datei
bestätigt sein. Diese Freigabe ist inzwischen erteilt; Phase 1B verwendet
deshalb die eigene SQLite-Datei. MariaDB und andere Recorder-Backends bleiben
bis zu einem echten Adapter- und Integrationstest **ungetestet und nicht
unterstützt**.
