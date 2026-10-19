# Camper Travel Journal v0.3.0-beta.10

Letzter geplanter Funktions- und Qualitätskandidat vor v0.3.0 Stable.

## Ausgaben

- Das tatsächliche Ausgabendatum ist verpflichtend; eine Uhrzeit wird nur gespeichert und angezeigt, wenn sie ausdrücklich erfasst wurde.
- `created_at` bleibt der unveränderte automatische Erfassungszeitpunkt und wird nicht als tatsächliches Ausgabendatum ausgegeben.
- Schema-Version 10 ist additiv, transaktional und wiederholbar. Altbestände behalten ihre Beträge, Kategorien, Verknüpfungen und Summen; ihr tatsächliches Datum bleibt unbekannt, bis es ergänzt wird.

## GPX und Strecken

- Start und Ziel werden aus dem ersten bzw. letzten gültigen gespeicherten Trackpunkt je Fahrt abgeleitet.
- Fehlende oder ungültige Koordinaten werden nicht erfunden. Manuelle Ortsnamen haben Vorrang; ohne Ortsnamen werden Koordinaten als Fallback dargestellt.
- Es wird kein externer Geocoding-Dienst automatisch kontaktiert.

## PDF

- Deutsch und Englisch zeigen tatsächliche Ausgabendaten, optionale Uhrzeiten und einen verständlichen Hinweis für alte Ausgaben ohne gesichertes Datum.
- Mehrseitige Tabellen, wiederholte Tabellenköpfe und A4-Layout bleiben erhalten.

Diese Version wird nicht automatisch gemergt, getaggt oder veröffentlicht.
