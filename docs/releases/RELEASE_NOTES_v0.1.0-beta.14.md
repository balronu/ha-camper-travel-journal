# Camper Travel Journal `v0.1.0-beta.14`

This pre-release candidate is prepared for manual practice validation. It is
not tagged or published yet.

## Date formatting

- Localizes ISO calendar dates in the Manager and Summary cards without
  timezone shifts.
- Keeps native date input values in ISO format for reliable editing.

## GPS collector diagnostics

- Adds a read-only diagnostic report for collector lifecycle, tracker events,
  accepted points, rejection counters and drive-detection state.
- Handles GPS attribute updates even when the tracker state remains `home`.
- Accepts `gps_accuracy: 0`, validates coordinates and timestamps, and records
  explicit rejection reasons for interval, movement, invalid and implausible
  samples.
- Re-registers safely after Home Assistant startup and closes open drives over
  ten-minute GPS gaps without inventing straight-line distance.
- Diagnostic output contains no GPS coordinates or private route data.

## Compatibility and safety

- Corrects callback registration for Home Assistant 2026.10 compatibility.
- No database migration, existing travel-data modification, productive
  Home-Assistant change, dashboard change or VM 104 operation is part of this
  candidate.
