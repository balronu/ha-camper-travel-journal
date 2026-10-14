# Architecture proposal

## Phase 2 travel API and cards

The backend remains the single source of truth. `api.py` exposes authenticated
Home Assistant WebSocket commands for listing data, creating trips/stops/
expenses, changing trip status and linking drives. Input is validated before
the repository operation runs in the SQLite worker; the browser never opens
the database.

`frontend/src/api.ts` is shared by the compact summary card and the manager
card. Both custom elements are registered idempotently and served from the
versioned static resource configured by `__init__.py`. The example dashboard
view under `docs/examples/` is intentionally not applied to production.

## Runtime boundary

`GPS Collector` receives state-change events for configured tracker entities.
The future adapter should use `async_track_state_change_event` for ordinary
state/attribute changes and evaluate whether a narrowly filtered
`state_reported` listener is needed for attribute-only updates. The latter is
high-volume and must never be subscribed globally.

The collector normalizes timestamps to UTC, validates coordinates, rejects
impossible jumps, applies the 30-second/25-metre filter, and sends accepted
points to a single serialized storage worker. The detector consumes the same
validated stream but never infers distance across a GPS gap.

`Travel Manager` and `Expense Manager` are independent consumers of stored
drives and do not change collector semantics. Their operations are exposed
through the authenticated WebSocket API and remain backed by the same
integration-owned schema.

## Components

1. GPS Collector: HA event subscription, normalization and back-pressure.
2. GPS Validation: coordinate/time/jump checks (`validation.py`).
3. Trip Detector: conservative drive state machine (`detector.py`).
4. Route Storage: SQLite repository (`storage.py`) behind an executor boundary.
5. Retention Manager: eligibility decisions only; deletion requires a later
   explicit, transactional job and is disabled in Phase 1C.
6. Travel/Expense Managers: validated repository operations and beta UI/API.
7. HA API/WebSocket and Lovelace UI: implemented for the beta cards; map/export
   features remain future work.

## Standstill strategy

Do not write identical GPS rows every 30 seconds. A stay is represented by its
start/end and one or more representative coordinates. A configurable 15-minute
stay anchor may be written only if needed for restart/recovery diagnostics; it
is never used to fabricate movement. Map rendering uses the last valid point
and the stay interval.
