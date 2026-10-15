# SQLite schema (integration-owned, not Recorder)

The database file is `camper_travel_journal.db` below the Home Assistant
configuration directory, obtained through `hass.config.path(...)`. It is not
the Recorder database and is never opened through Recorder internals.

The schema is versioned via `schema_meta`. All timestamps are ISO-8601 UTC.

| Table | Purpose | Key relationships |
| --- | --- | --- |
| `vehicles` | Multiple tracked vehicles | `tracker_entity_id` unique |
| `gps_points` | Validated raw positions | vehicle + time index, de-duplication key |
| `drives` | Detected drive intervals and distance | belongs to vehicle |
| `stays` | Intervals without repeated identical points | belongs to vehicle |
| `trips` | User-managed journeys, independent of GPS | belongs to vehicle |
| `trip_drives` | Reversible assignment | unique drive assignment, FK cascade only from trip |
| `expenses` | Costs, optionally linked to a trip | `trip_id` is nullable and set NULL on trip deletion |

The `UNIQUE(drive_id)` constraint prevents one drive being assigned to two
trips at once. Unassignment deletes only the link, never the drive or points.
Overlapping trip dates are allowed because they are user records; the UI/API
must warn and require an explicit choice when selecting already-assigned
drives.

## Phase 2 schema additions (version 3)

Migration 3 adds trip descriptions/destinations, `stops`, and optional expense
references to stops. Existing GPS rows are preserved. `trip_drives` remains
transactional and its unique `drive_id` constraint prevents silent
multi-assignment. Mixed expense currencies are reported rather than summed.

## Phase 3 schema additions (version 4)

Migration 4 adds `updated_at` to `stops` and `expenses`, backfilled from
`created_at` for existing rows. All edits use allow-listed columns and a
transaction. The worker opens SQLite with WAL mode, a 30-second busy timeout,
foreign keys, and `BEGIN IMMEDIATE` for writes; this protects the file when
more than one executor or backup reader is present.

## Phase 4 schema additions (version 5)

Migration 5 adds nullable `start_date` and `end_date` columns to `trips` and
adds `source`, `start_label` and `end_label` to `drives`. Existing trips keep
their legacy operational timestamps and existing GPS drives receive
`source='gps'`. Manual drives use `source='manual'`, store neutral user-entered
location labels and never create synthetic GPS points. The migration is
additive, preserves existing rows and runs in one explicit SQLite transaction
together with the schema-version update. If an `ALTER TABLE` step fails, the
transaction rolls back and the database remains at schema version 4; a retry
also handles already-present version-5 columns. Rollback means restoring the
backed-up integration database; no destructive down-migration is attempted.

All changes run through the serialized executor worker. A database newer than
the supported version fails closed. No Recorder tables or migrations are
touched, and retention remains non-destructive in this beta.

## Schema versioning and recovery

`schema_meta.version` is checked during startup. A newer unsupported version
fails closed; supported migrations run inside the integration-owned database
before the worker is exposed. Phase 1B version 2 adds `runtime_state` and
keeps all existing rows intact.

On startup the worker loads a bounded, oldest-first tail of each vehicle's
points and replays it through the detector. The next event is deduplicated by
the vehicle/time/coordinate uniqueness key. A long elapsed interval enters the
GPS-gap state and never contributes an air-line segment to distance.

The file resides in the HA configuration directory and is therefore included
in a normal HA configuration backup; restore must restore this file together
with the integration configuration. For a manual backup, stop/unload the
integration or use SQLite's online backup API, copy `camper_travel_journal.db`
together with `-wal`/`-shm` if present, and verify it with `PRAGMA
integrity_check` on a separate copy. Restore is the inverse: stop the
integration, preserve the old file, restore the database, run the integrity
check, and start the integration. No live backup, restore, migration against
production, or destructive retention job is performed by this project.
