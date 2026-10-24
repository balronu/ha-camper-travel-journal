# Kostenverwaltung

## Ver- & Entsorgung

Die Hauptkategorie `water_waste` wird als **Ver- & Entsorgung** angezeigt.
Optional können mehrere Leistungen ausgewählt werden:

- Strom / Landstrom (`electricity`)
- Frischwasser auffüllen (`fresh_water`)
- Grauwasser entsorgen (`grey_water`)
- Toilettenkassette entsorgen (`toilet_cassette`)
- Dusche (`shower`)

Der Betrag wird genau einmal als Gesamtkosten gespeichert. Die Leistungen
liegen in der additiven SQLite-Migration 12 in einer normalisierten
Verknüpfungstabelle. Beim Wechsel zu einer anderen Hauptkategorie werden alte
Leistungsverknüpfungen entfernt; bestehende Ausgaben ohne Leistungen bleiben
unverändert.

Journal Card und PDF-Reisebericht zeigen Kategorie, Leistungen und Bemerkung
im aktiven Deutsch-/Englisch-Kontext. Betrag, Ausgabendatum, optionale Uhrzeit
und Bemerkung bleiben die bestehenden Felder.
