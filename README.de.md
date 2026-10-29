# Camper Travel Journal – Deutsch

**Stable: v0.4.1**

Die vollständige deutsche Produktdokumentation steht in der
[deutschen Haupt-README](README.md).

Camper Travel Journal ist **Dein GPS-gestütztes Wohnmobil-Reisetagebuch für
Home Assistant**. Es erkennt Fahrten und Aufenthalte, verwaltet Reisen,
Stellplätze und Kosten und speichert die Daten lokal in einer eigenen SQLite-
Datenbank.

[🇬🇧 English](README.en.md) · [🇩🇪 Deutsche Hauptdokumentation](README.md)

**Stable: v0.4.1**

Für neue Dashboards wird die zentrale Journal Card empfohlen. Im geöffneten
Reisekontext stehen Bearbeiten, Fortsetzen, Pausieren, Beenden, Löschen und
Reise wechseln zur Verfügung; der Wechsel verändert den Status nicht. Die
älteren Summary-, Manager- und Map-Karten bleiben kompatibel.

Start- und Enddaten aktivieren Reisen nicht automatisch. Die GPS-Aufzeichnung
läuft unabhängig vom Reisestatus, wenn sie aktiviert ist; die automatische
Fahrtzuordnung erfolgt nur bei genau einer aktiven Reise des Fahrzeugs.

Das Tankbuch unterstützt Diesel, AdBlue und weitere Betriebsstoffe. Der
Verbrauch wird zwischen Volltankungen berechnet. Eine GPS-Strecke ist dabei nur
eine klar gekennzeichnete Schätzung; eine automatische Tankstellenerkennung,
eine direkte Verbindung zu Mobile Fuel Stations oder Camper Route Planner und
eine exakte Trennung von Motor- und Standheizungsverbrauch gibt es in v0.4.1
nicht.

Technische Hinweise zur versionierten Frontend-Auslieferung stehen in der
[Frontend-Cache-Dokumentation](docs/frontend-cache.md).

Screenshots der geöffneten Journal Card und der Reisekarte stehen in der
[deutschen Hauptdokumentation](README.md). Separate Tankbuch- oder
Verbrauchsaufnahmen sind derzeit nicht veröffentlicht.
## Kraftstoffkosten

Bei der Kategorie **Kraftstoff** sind getankte Liter und Literpreis optional.
Sind zwei der drei Werte vorhanden, wird der fehlende Wert berechnet. Deutsche
Kommaeingaben werden unterstützt; Betrag wird mit zwei, Liter und Literpreis
mit bis zu drei Nachkommastellen dargestellt. Alte Kraftstoffkosten ohne diese
Angaben bleiben gültig.

## Bemerkungen zu Kosten

Jede Ausgabe kann optional eine mehrzeilige Bemerkung mit bis zu 2.000 Zeichen
enthalten. Zeilenumbrüche und Sonderzeichen werden in der Journal Card und im
PDF-Reisebericht sicher als Text dargestellt. Bestehende Ausgaben ohne
Bemerkung bleiben gültig.
