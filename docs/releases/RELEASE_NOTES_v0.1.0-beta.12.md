# Camper Travel Journal v0.1.0-beta.12

> Prepared development release notes. This version is not published yet.

## Trips and drives

- Adds optional trip start and end dates with inline editing.
- Displays detected drives with start/end timestamps, distance, duration,
  source and assignment status.
- Keeps drive assignment bound to the vehicle and unique across trips.
- Adds manual drives with start location, destination, distance and optional
  duration; manual drives never create synthetic GPS points.
- Refreshes the Summary Card after confirmed trip or drive changes.

## Storage and compatibility

- Adds schema version 5 with additive, backward-compatible columns for trip
  dates and manual-drive metadata.
- Existing trips, GPS points, detected drives and expenses are preserved.
- No Recorder/MariaDB migration and no automatic GPS-to-trip date assignment.

## Validation

- Python storage/API regression tests and frontend tests/build are required on
  the exact candidate commit.
- Desktop Chromium/CI validation is covered; iOS/Safari/WebKit practice and
  production Home Assistant validation remain open.

No Home Assistant installation, restart, database migration on VM 104, tag or
GitHub release is part of preparation.
