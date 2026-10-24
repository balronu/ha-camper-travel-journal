# Camper Travel Journal v0.3.5

## Deutsch

- Live-GPS-Fahrten werden bei exakt identischem Fahrzeug, Startzeitpunkt und
  Endzeitpunkt idempotent gespeichert. Nach Reload, Neustart oder wiederholtem
  Abschluss wird die vorhandene Fahrt-ID wiederverwendet.
- Minimal abweichende oder überlappende Intervalle werden nicht automatisch
  zusammengeführt. Dadurch bleiben kurze echte Fahrten und unterschiedliche
  Fahrzeuge getrennt; unklare Überlappungen bleiben für eine spätere Prüfung
  sichtbar.
- Die read-only GPS-Diagnose zeigt letzten gültigen Trackerzeitpunkt,
  Detektorzustand, Zeit seit dem letzten gültigen Ereignis, letzte
  Fahrtabschlussursache, konfigurierte Stillstandszeit, GPS-Gap und verworfene
  Ereignisse — ohne Koordinaten, Routen oder Rohdaten.
- Es wird keine automatische Timer-Beendigung eingeführt. Ohne nachfolgenden
  gültigen Trackerpunkt kann ein Stillstand weiterhin nicht bestätigt werden;
  ein GPS-Gap beendet nur konservativ mit `gps_gap`.
- Bestehende Fahrten, Fahrt-IDs, GPS-Punkte, Reisezuordnungen, GPX-Importe und
  manuelle Fahrten werden nicht gelöscht, verändert oder rückwirkend bereinigt.

## English

- Live GPS drives are stored idempotently for an exactly matching vehicle,
  start timestamp, and end timestamp. After a reload, restart, or repeated
  completion, the existing drive ID is reused.
- Minimally shifted or overlapping intervals are not merged automatically.
  This keeps short real drives and different vehicles separate; ambiguous
  overlaps remain available for later review.
- Read-only GPS diagnostics now expose the last valid tracker timestamp,
  detector state, age of the last valid event, the last drive-end reason,
  configured stationary timeout, GPS gap, and rejection counters — without
  coordinates, routes, or raw payloads.
- No automatic timer-based drive completion is introduced. Without a later
  valid tracker point, a stationary stop still cannot be confirmed; a GPS gap
  only closes conservatively with `gps_gap`.
- Existing drives, drive IDs, GPS points, trip assignments, GPX imports, and
  manual drives are not deleted, modified, or retroactively cleaned up.

## Compatibility and limitations

The idempotency key is deliberately exact. Similar timestamps do not prove the
same physical drive, so the integration does not perform fuzzy deduplication.
No database migration is required. Productive Home Assistant, VM 104, and
productive databases were not modified during this release process.
