# GPS collector diagnostics

The collector listens only to the configured `device_tracker` entity. It uses
`async_track_state_change_event` for state or attribute changes and a filtered
`state_reported` bus listener for reports where neither the state nor the
attributes changed. The current tracker state is sampled once during startup
after the persisted point tail is replayed.

The authenticated read-only WebSocket command is:

```json
{"id": 1, "type": "camper_travel_journal/diagnostics", "vehicle_id": "<entry_id>"}
```

The result contains collector lifecycle/counters, timestamps, filter reasons,
detector state and aggregate counts for stored GPS points, drives and trips.
It deliberately does not return latitude, longitude, addresses or raw event
payloads. It is intended for diagnosis without putting private movement data
in logs or browser reports.

## Filtering and drive lifecycle

- `gps_accuracy=0` is accepted; only negative or greater-than-1000 metre
  accuracy values are rejected.
- A valid point can still be excluded from storage by `time_filter` or
  `movement_filter`. Significant movement has the existing adaptive path.
- Coordinates, timestamps and implied speed are validated before detection.
- Two consecutive plausible movement samples are required for a drive start.
- A gap over the configured ten-minute default ends an open drive at its last
  plausible point with `end_reason="gps_gap"`; the gap segment is not counted
  as distance. The detector then reports `gps_gap` until a new candidate drive
  has enough samples.
- Exactly one active trip is required for automatic drive assignment.

This command and the counters are process-lifetime diagnostics. Persisted
database totals are read-only aggregate queries; event counters reset when the
integration starts.
