# Camper Travel Journal `v0.1.0-beta.13`

This pre-release is published for manual practice validation.

## Frontend hotfix

- Removes known historical Camper Travel Journal Extra-JS URLs before adding
  the current versioned bundle URL.
- Keeps cache-busting through the `?v=` version query while preventing stale
  Beta-10/Beta-11/Beta-12 modules from remaining registered after an update or
  integration reload.
- Adds HA registration coverage and browser DOM regressions for visible Lit
  markers and JavaScript handler expressions.

No database migration, travel-data change, dashboard edit, or Home Assistant
installation is part of this candidate.
