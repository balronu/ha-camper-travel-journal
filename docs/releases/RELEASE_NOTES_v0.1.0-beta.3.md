# Camper Travel Journal v0.1.0-beta.3

## Phase 3

- Schema 4 migration adds edit timestamps while preserving schema 3 data.
- SQLite writes use WAL, busy timeout, foreign keys, serialized worker calls, and immediate transactions.
- Manager card/API now support trip CRUD, lifecycle controls, manual drive assignment/unassignment, stop CRUD, and expense CRUD.
- Deleting a trip preserves detected drives and clears only their assignment links.
- Newly detected drives are assigned only when exactly one active trip exists; assigned drives and ambiguous cases are never overwritten.
- Expense categories are validated: camping, fuel, toll, parking, food, activities, and other.
- Summary card shows date range, distance, drives, stops, and total costs.
- Backup and restore procedure is documented in `docs/database-schema.md`.

## Scope

This is a GitHub developer pre-release. It does not install or modify Home
Assistant VM 104, Proxmox, Recorder, or productive dashboards.
