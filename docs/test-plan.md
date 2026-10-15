# Test plan and evidence boundaries

The repository has separate offline, Home Assistant fixture, frontend and
browser gates. A green automated gate does not equal a productive Home
Assistant pilot.

## Offline Python tests

- coordinate ranges, aware timestamps, accuracy and duplicate filtering;
- haversine distance, movement/time thresholds and implausible jumps;
- drive start/finish, stationary stops and GPS gaps without artificial distance;
- SQLite schema, migrations, foreign keys and serialized worker;
- restart tail recovery and multi-vehicle isolation;
- retention candidate safety and assigned-data protection;
- trip lifecycle, drive assignment and reversible links;
- stop CRUD and expense CRUD, categories, integer cents and mixed currencies;
- expense edit, delete, reload persistence and invalid-input rejection.

## Home Assistant fixture tests

The pinned CI environment uses Home Assistant 2026.10.1 and covers:

- Config-/Options-Flow validation and tracker selection;
- entry setup/unload and recording listener lifecycle;
- authenticated WebSocket registration after entry setup;
- exact read command response shape and the complete command registry;
- API validation and non-mutating diagnostic behavior.

These tests use synthetic states and isolated databases. They do not access the
productive installation.

## Frontend and emitted bundle

Vitest and TypeScript cover:

- card/editor registration and reload-loop guards;
- vehicle discovery and stable YAML configuration;
- localized labels and category IDs;
- exact cent parsing and currency formatting;
- trip-specific cost loading, inline category/amount editing and error UI;
- diagnostic sequencing, masking and mobile-safe report fallback.

The production bundle is rebuilt and checked into the integration. The
Chromium lifecycle harness verifies editor selection, summary cost rendering,
manual diagnostics and repeated Home Assistant state updates.

## Practice and production gates

The Beta-10 practice report found a `camping` expense-category round-trip bug.
Beta 11 adds the real selection → WebSocket → storage → response → reload
regression path and narrow-layout interaction coverage.

Still separate from automated tests:

- broad live-instance validation across desktop/iOS/WebKit;
- backup/restore against a real user backup;
- destructive retention execution;
- MariaDB/Recorder backend evaluation;
- map/statistics/export acceptance.

No test creates a productive travel, changes the productive database, restarts
Home Assistant or changes VM 104.
