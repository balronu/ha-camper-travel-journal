# Camper Travel Journal v0.3.3

## Deutsch

- Kraftstoffkosten unterstützen optionale getankte Liter und Literpreis beim Anlegen und Bearbeiten.
- Sobald zwei Werte vorhanden sind, wird der dritte mit Decimal-Arithmetik berechnet.
- Widersprüchliche Dreierkombinationen, negative Werte und Division durch null werden abgewiesen.
- Kraftstoffdetails erscheinen kompakt in der zentralen Journal-Kostenliste und im PDF-Reisebericht.
- SQLite-Migration 11 ist additiv und nullable; bestehende Datensätze und Kostenbeträge bleiben erhalten.
- Nicht-Kraftstoffkategorien löschen Kraftstoffdetails beim Speichern.

## English

- Fuel expenses now support optional liters and price per liter when creating and editing an expense.
- When two values are present, the third is calculated using Decimal arithmetic.
- Inconsistent triples, negative values, and division by zero are rejected.
- Fuel details are shown compactly in the central journal expense list and PDF travel reports.
- SQLite migration 11 is additive and nullable; existing records and amounts are preserved.
- Switching away from Fuel clears fuel details on save.

## Compatibility and limitations

Old expenses without fuel details remain readable and editable. No productive
Home Assistant installation or database is modified by this release process.
