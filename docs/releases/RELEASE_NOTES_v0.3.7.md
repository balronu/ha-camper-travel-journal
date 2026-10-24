# Camper Travel Journal v0.3.7

## Deutsch

- Neue Hauptkategorie **Ver- & Entsorgung** mit optionaler Mehrfachauswahl für
  Strom/Landstrom, Frischwasser, Grauwasser, Toilettenkassette und Dusche.
- Additive SQLite-Migration 12; bestehende Datensätze bleiben unverändert.
- Journal Card und PDF-Reiseberichte zeigen Kategorie, Leistungen und Bemerkung
  auf Deutsch und Englisch.
- Die nutzergestartete historische GPS-Nachberechnung erzeugt nur aus realen,
  zugeordneten `stationary_timeout`-Fahrten zunächst `pending`-Vorschläge.
  Wiederholungen, GPS-Lücken sowie vorhandene pending/accepted/dismissed
  Vorschläge erzeugen keine Duplikate.

## English

- Added the **Water & waste services** expense category with optional
  multi-select services for electricity/shore power, fresh water, grey water,
  toilet cassette and shower.
- Additive SQLite migration 12; existing records remain unchanged.
- Journal Card and PDF travel reports show the category, selected services and
  note in German and English.
- User-triggered historical GPS recalculation creates pending suggestions only
  from real GPS points assigned to `stationary_timeout` drives. Repeated runs,
  GPS gaps and existing pending/accepted/dismissed suggestions are idempotent.

### Migration and limitation

The migration runs automatically when the integration opens its own database.
No productive database migration or stop suggestion was performed during
development. The historical suggestion for drive
`8ae1ee76-79c9-4a25-952b-f6a2d35ba979` can be reviewed after installation by
opening the trip's places area and selecting **Refresh suggestions**; it stays
pending until the user explicitly accepts or dismisses it.
