# Camper Travel Journal v0.3.1

Camper Travel Journal v0.3.1 is a stable hotfix for the central Journal Card.

## Reiseverwaltung

- The opened trip context now exposes the actions appropriate to the current
  status: start, resume, pause, complete, reactivate, edit and delete.
- “Switch trip” only returns to trip selection; it never sends a backend status
  transition.
- Editing and status changes refresh the central card immediately.
- Deleting requires explicit confirmation. Assigned drives remain; expenses
  and places remain but lose their trip assignment.
- The action group and destructive confirmation dialog are usable on desktop
  and narrow mobile layouts.

## Compatibility and safety

- Existing backend status transitions and storage behavior are unchanged.
- No database schema, migration, production data or Home Assistant instance is
  changed by this hotfix.
- v0.3.0 remains available as the previous stable release.

## Verification

The release is covered by Python lifecycle tests, frontend contract tests,
Vitest, TypeScript/Vite build checks, Chromium interaction and responsive
regressions, Hassfest/HACS validation and security checks.
