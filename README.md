# Camper Travel Journal

Eine datenschutzbewusste Home-Assistant-Custom-Integration für **Dein digitales Wohnmobil-Reisetagebuch**. GPS-Punkte, erkannte Fahrten, Reisen, Zwischenstopps
und Kosten werden in einer eigenen SQLite-Datei gespeichert.

🇩🇪 Deutsch | 🇬🇧 [English](README.en.md)

![Camper Travel Journal Logo](https://raw.githubusercontent.com/balronu/ha-camper-travel-journal/main/assets/branding/logo.png)

> **Stand:** `v0.1.0-beta.12` – aktuell veröffentlichte Pre-Release-Version.
> Die Praxisvalidierung auf iOS/Safari und in einer produktiven HA-Installation
> bleibt offen.

## Tatsächlicher Funktionsstand

| Bereich | Aktueller Stand | Lovelace? | Nachweis |
| --- | --- | --- | --- |
| Config-/Options-Flow | Fahrzeug, Tracker, Aufzeichnungsoptionen | Nein, HA-Einstellungen | HA-Fixtures/offline |
| GPS-Aufzeichnung | Ereignis-Collector, Filter, Sprung-/Gap-Schutz | Indirekt über Optionen | Domain-/SQLite-Tests, CI |
| Fahrterkennung | Konservativer Statusautomat und Distanz | Nein, Ergebnisdaten | Synthetische Tests |
| Mehrere Fahrzeuge | Getrennte Config Entries | Karteneditor | HA-/Frontend-Tests |
| Reisen | Anlegen, Zeitraum bearbeiten, löschen, Statuswechsel | Ja, Manager Card | API-/HA-/Frontend-Tests |
| Fahrten | GPS-Fahrten anzeigen/zuordnen; manuelle Fahrten anlegen, bearbeiten, löschen | Ja, Manager Card | Beta-12-API-/Frontend-Tests |
| Zwischenstopps | Schema und WebSocket-CRUD | Nein | Storage-/API-Tests |
| Kosten | Kategorien, Cent-Beträge, Summen, Editieren, Löschen | Ja | Beta-11-Roundtrip getestet |
| Karten/Diagnose | Summary, Manager, Editor, manuelle Diagnose | Ja | Bundle/Vitest/Chromium |
| Kartenansicht, Statistiken, Exporte | Nicht implementiert | Nein | Roadmap |

Die Tabelle unterscheidet bewusst Backend/API, Benutzeroberfläche, Tests und
Praxisvalidierung. Eine Datenbanktabelle oder API-Methode ist nicht automatisch
eine fertige Benutzerfunktion.

## Installation über HACS

Aktuell veröffentlicht und unterstützt ist `v0.1.0-beta.12`. Sie ist nicht
allgemein produktiv validiert; Beta 11 bleibt als historischer Release
verfügbar.

Für die aktuell veröffentlichte Beta 12:

1. **HACS → Integrationen → Benutzerdefinierte Repositories** öffnen.
2. `https://github.com/balronu/ha-camper-travel-journal` als Integration
   hinzufügen.
3. Pre-Release `v0.1.0-beta.12` auswählen, nicht `main`.
4. Home Assistant nach der Installation manuell neu starten.
5. Die Integration unter **Einstellungen → Geräte & Dienste** hinzufügen.

Ein `main`-Commit ist kein Beta-Release. Falls HACS die Pre-Release nicht
anzeigt, die Pre-Release-Auswahl aktivieren und die Repository-Informationen
aktualisieren.
Details: [HACS-/Release-Strategie](docs/HACS_RELEASE_STRATEGY.md).

Manuell das Verzeichnis `custom_components/camper_travel_journal/` samt
`translations/` kopieren und danach ebenfalls manuell neu starten.

## Einrichtung und GPS-Tracker

Der Config Flow benötigt Fahrzeugname sowie eine `device_tracker`-Entität mit
numerischen `latitude`-/`longitude`-Attributen. Aufzeichnung ist standardmäßig
deaktiviert. Intervall, Mindestbewegung, Stopperkennung, GPS-Lücke, plausible
Maximalgeschwindigkeit und Aufbewahrung unzugeordneter Punkte sind konfigurierbar.
Mehrere Fahrzeuge werden über mehrere Config Entries getrennt geführt.

Der Collector reagiert auf State-Events, verwirft ungültige/unplausible Punkte,
filtert Duplikate und berechnet über längere GPS-Lücken keine Luftlinie.

## Dashboard-Karten

Die Integration registriert ihr versioniertes Bundle selbst. Keine zweite
manuelle Resource mit derselben Datei anlegen.

```yaml
type: custom:camper-travel-journal-summary-card
vehicle_id: <config-entry-id>
```

```yaml
type: custom:camper-travel-journal-manager-card
vehicle_id: <config-entry-id>
```

Die Summary Card zeigt aktuelle Reise, Status, Strecke, Fahrten, Stopps und
Kosten. Die Manager Card verwaltet Reisen, Statuswechsel, Fahrtzuordnung und
Kosten. Der visuelle Editor wählt bei genau einem Fahrzeug automatisch aus.

Bundle-URL des vorbereiteten Beta-12-Stands: `/camper_travel_journal/camper-travel-journal.js?v=0.1.0-beta.12`.
Details: [Frontend-Cache-Standard](docs/frontend-cache.md).

## Reisen, Fahrten und Zwischenstopps

Reisen können angelegt, umbenannt, gelöscht, gestartet, pausiert und
abgeschlossen werden; Start- und Enddatum sind optional und bearbeitbar. GPS-
Fahrten werden konservativ erkannt und mit Start/Ende, Dauer und Entfernung
angezeigt. Sie können einer Reise zugeordnet bzw. wieder gelöst werden.
Manuelle Fahrten mit Startort, Zielort, Kilometern und optionaler Dauer sind
getrennt von GPS-Fahrten speicherbar. Eine vollständige Routenkarte und
detaillierte Kartenansicht fehlen noch.

Zwischenstopps existieren im Schema und in der authentifizierten WebSocket-API,
sind aber noch nicht über Lovelace bedienbar.

## Kostenverwaltung

Die internen Kategorie-IDs sind `camping`, `fuel`, `toll`, `parking`, `food`,
`activities` und `other`. Die deutschen Anzeigenamen sind Übersetzungen; der
Schrägstrich in „Stellplatz/Campingplatz“ gehört nicht zum gespeicherten Wert.
Kosten werden als ganzzahlige Cent-Beträge pro Reise summiert; unterschiedliche
Währungen werden nicht stillschweigend addiert.

**Beta-11-Korrektur:** `camping` verwendet eine kanonische interne ID, die
unabhängig vom deutschen Label über Auswahl, WebSocket, Datenbank, Antwort und
Reload erhalten bleibt. Unbekannte IDs werden abgewiesen; bestehende Einträge
werden nicht automatisch umkategorisiert.

## Datenbank, Datenschutz und Backups

`camper_travel_journal.db` liegt im Home-Assistant-Konfigurationsverzeichnis
und ist von Recorder/MariaDB getrennt. SQLite läuft über einen serialisierten
Worker; Beta 12 verwendet Schema 5. Die Migration ergänzt optionale Reisedaten
und Metadaten für manuelle Fahrten, verändert keine GPS-Punkte und ist
rückwärtskompatibel und transaktional wiederholbar. Destruktive Retention-Löschung ist in der
Beta deaktiviert. Die zusätzliche Datenbankdatei muss in Backups enthalten
sein. Siehe [Datenbankschema](docs/database-schema.md).

GPS-Daten sind sensibel; in Issues und Tests nur synthetische Koordinaten,
keine privaten Routen, Tokens oder unredigierten Logs verwenden.

## Bekannte Einschränkungen

- Keine stabile Freigabe und kein allgemeiner Produktiv-Pilot.
- Zwischenstopps sind in Lovelace noch nicht bedienbar.
- Keine Kartenansicht, Statistiken oder Exporte.
- Retention berechnet Kandidaten, löscht aber nicht automatisch.
- Nur die eigene SQLite-Persistenz ist implementiert; eine Nutzung des HA-
  Recorder-/MariaDB-Backends ist nicht entschieden oder umgesetzt.
- Die separaten iOS-WebSocket-Meldungen `non-zero reserved bits` wurden nicht
  durch diese Integration behoben.

## Roadmap

Die verbindliche, statusgetrennte Roadmap steht in [docs/ROADMAP.md](docs/ROADMAP.md):

- **Beta 11:** Kostenkategorie-Roundtrip mit stabilen IDs abgeschlossen.
- **Beta 12 vorbereitet:** Reisezeiträume, sichtbare/zuordenbare Fahrten und
  manuelle Fahrten; iOS/WebKit-Praxistest bleibt offen.
- **v0.2.x:** Kartenansicht, Reiseverlauf, Statistiken und Exporte.
- **Später:** alternatives HA-Datenbank-Backend separat untersuchen.
- **v1.0.0:** Stable erst nach ausreichender Praxisvalidierung.

## Support, Entwicklung und Lizenz

- [Fehler melden](https://github.com/balronu/ha-camper-travel-journal/issues/new?template=bug_report.yml)
- [Feature vorschlagen](https://github.com/balronu/ha-camper-travel-journal/issues/new?template=feature_request.yml)
- [Issues](https://github.com/balronu/ha-camper-travel-journal/issues)
- [Releases](https://github.com/balronu/ha-camper-travel-journal/releases)
- [Changelog](CHANGELOG.md)
- [Architektur](docs/architecture.md) · [Testplan](docs/test-plan.md) · [Branding](docs/BRANDING.md)

Lokale Prüfungen:

```bash
pytest -q
python -m compileall -q custom_components tests
```

Lizenz: MIT, siehe [LICENSE](LICENSE).
