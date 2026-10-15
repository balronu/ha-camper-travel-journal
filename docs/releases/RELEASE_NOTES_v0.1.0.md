# Camper Travel Journal `v0.1.0`

Camper Travel Journal `v0.1.0` is the first stable release of the local
Home Assistant travel journal.

## Highlights

- Summary Card selection consistently derives title, destination, dates,
  status, metrics and actions from one selected trip.
- Active trips are preferred by the deterministic default rule; manual
  selection survives data refresh and falls back safely if a trip disappears.
- GPX import supports an explicit destination trip or free drives, with
  preview, duplicate protection, period warnings and atomic persistence.
- German is the primary project language and the English README is maintained
  as a complete translation.
- The frontend bundle is versioned as `?v=0.1.0` and historical beta URLs are
  removed idempotently before the current bundle is registered.

## Scope and limitations

Data is stored locally in SQLite under the Home Assistant configuration
directory. MariaDB, maps, statistics, exports and complete Lovelace stop
management are not part of this release. Mobile Safari/WebKit and productive
installation practice still require environment-specific validation.

No existing trips, drives, expenses or GPS points are changed automatically.
