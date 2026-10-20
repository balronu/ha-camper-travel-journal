# Architecture – implemented v0.3.2 boundary

This document describes the current implementation, not a proposal for
features that are only planned.

## Runtime flow

```text
Home Assistant device_tracker state/state_reported event
        │
        ▼
Runtime → GPSCollector → validation/detector → AsyncSQLiteWorker
                                      │
                                      ▼
                             drives / stays / points

Lovelace cards → authenticated HA WebSocket API → same worker/database
```

Recording is opt-in in the Config-/Options Flow. `Runtime` installs a filtered
state listener and a filtered `state_reported` listener only when recording is
enabled, restores a bounded recent point tail, samples the current tracker
state on startup, and closes both listeners and the worker on unload.

## Implemented components

1. **Config-/Options-Flow** validates the selected `device_tracker` and exposes
   recording thresholds for each vehicle entry.
2. **GPS Collector and detector** normalize timestamps, validate coordinates,
   reject duplicates and implausible jumps, apply movement/time filters and
   protect against distance across a GPS gap.
3. **SQLite worker** serializes blocking SQLite calls outside the HA event loop.
   Schema 7 contains vehicles, points, drives, stays, trips, trip-drive links,
   explicit drive-point links, stops, expenses and GPX provenance.
4. **WebSocket API** registers authenticated commands during both domain and
   config-entry setup. Exact literal command schemas are used. Read commands
   return trip, drive, stop and (for a selected trip) expense data.
5. **Lovelace cards** include the central Journal Card plus compatible Summary,
   Manager, diagnostics and Leaflet Map Cards. The Map Card obtains route
   geometry only through the authenticated route command and never performs
   routing or geocoding. The Manager Card also supports manual drives, places,
   stays, ratings, expenses and GPX import.
6. **Collector diagnostics** are available through the authenticated,
   read-only `camper_travel_journal/diagnostics` command. They expose counters,
   timestamps, filter reasons, detector state and aggregate database counts,
   but never GPS coordinates.

## Deliberate boundaries

- The Map Card is limited to stored GPS geometry and does not calculate road
  routes. The PDF travel report is generated in memory; it is not a hosted
  document store.
- Retention only computes candidates. It does not delete data automatically in
  this release.
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
