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
with the integration configuration. Phase 1B does not run a live backup,
restore, migration against production, or destructive retention job.
