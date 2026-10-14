# Architecture proposal

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
drives and can be added later without changing collector semantics. Their
tables already exist in the integration-owned schema, while user-facing
management remains future work.

## Components

1. GPS Collector: HA event subscription, normalization and back-pressure.
2. GPS Validation: coordinate/time/jump checks (`validation.py`).
3. Trip Detector: conservative drive state machine (`detector.py`).
4. Route Storage: SQLite repository (`storage.py`) behind an executor boundary.
5. Retention Manager: eligibility decisions only; deletion requires a later
   explicit, transactional job and is disabled in Phase 1C.
6. Travel/Expense Managers: schema boundary exists; management UI/API is not
   implemented.
7. HA API/WebSocket and Lovelace UI: not implemented.

## Standstill strategy

Do not write identical GPS rows every 30 seconds. A stay is represented by its
start/end and one or more representative coordinates. A configurable 15-minute
stay anchor may be written only if needed for restart/recovery diagnostics; it
is never used to fabricate movement. Map rendering uses the last valid point
and the stay interval.
