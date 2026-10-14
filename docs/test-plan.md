# Test plan

## Executable without Home Assistant

- coordinate ranges, aware timestamps and duplicate timestamps;
- haversine distance and 30-second/25-metre filtering;
- implausible jump rejection;
- start candidate, drive start, stationary stop and drive distance;
- GPS gap event with no air-line distance;
- SQLite schema, foreign keys and assignment uniqueness;
- 90-day retention eligibility and assigned-data exemption;
- migration fixtures for every schema version.

## Requires Home Assistant test fixtures

- config flow/options validation and entity selection;
- event listener lifecycle and unload cleanup;
- `state_changed` and narrowly filtered `state_reported` behavior;
- restart recovery and persisted detector state;
- executor serialization under event bursts;
- diagnostics, translations, service actions and Lovelace resources.

Phase 1C could not execute this section because the workspace has no Home
Assistant, pytest, pip, Docker, Podman or Hassfest installation. No productive
instance was used as a substitute.

## Product acceptance gates

No production install until the Phase 1B tests prove that a restart cannot
duplicate a point, a GPS outage cannot add distance, an assignment can be
undone losslessly, and a migration has a tested rollback path.

Phase 1C result: 18 synthetic offline tests passed. HA fixture tests,
Hassfest, MariaDB, real backup/restore and productive tests remain open gates.
