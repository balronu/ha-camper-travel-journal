# Architecture – implemented Beta-10 boundary

This document describes the current implementation, not a proposal for
features that are only planned.

## Runtime flow

```text
Home Assistant device_tracker state event
        │
        ▼
Runtime → GPSCollector → validation/detector → AsyncSQLiteWorker
                                      │
                                      ▼
                             drives / stays / points

Lovelace cards → authenticated HA WebSocket API → same worker/database
```

Recording is opt-in in the Config-/Options Flow. `Runtime` installs a state
listener only when recording is enabled, restores a bounded recent point tail,
and closes the listener and worker on unload.

## Implemented components

1. **Config-/Options-Flow** validates the selected `device_tracker` and exposes
   recording thresholds for each vehicle entry.
2. **GPS Collector and detector** normalize timestamps, validate coordinates,
   reject duplicates and implausible jumps, apply movement/time filters and
   protect against distance across a GPS gap.
3. **SQLite worker** serializes blocking SQLite calls outside the HA event loop.
   Schema 4 contains vehicles, points, drives, stays, trips, trip-drive links,
   stops and expenses.
4. **WebSocket API** registers 14 authenticated commands during both domain and
   config-entry setup. Exact literal command schemas are used. Read commands
   return trip, drive, stop and (for a selected trip) expense data.
5. **Lovelace cards** are the Summary Card and Manager Card. The Manager Card
   handles trip lifecycle, drive assignment and expense CRUD. The diagnostic
   card is manual and read-only.

## Deliberate boundaries

- No map renderer, statistics view, export path or Lovelace stop editor exists.
- There is no manual drive creation form; drives originate in GPS detection.
- Retention only computes candidates. It does not delete data in this beta.
- The integration-owned SQLite file is separate from HA Recorder/MariaDB.
  Replacing it is a future technical investigation, not an implemented option.
- Existing expense categories are not migrated or automatically recategorized.

## Data ownership and safety

The browser never opens SQLite. WebSocket handlers validate input, call the
worker and return sanitized data. Trip deletion removes assignment links but
preserves detected drives. Mixed expense currencies are reported instead of
being silently added.

## Evidence

The architecture is covered by offline domain/storage tests, pinned HA fixture
tests, frontend contract tests, production bundle checks and a Chromium
lifecycle harness. Those checks are not a substitute for general live-instance
validation. The separate iOS `non-zero reserved bits` issue remains outside
this architecture.

Planned work is tracked in [ROADMAP.md](ROADMAP.md).
