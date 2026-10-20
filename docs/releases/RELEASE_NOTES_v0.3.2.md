# Camper Travel Journal v0.3.2

Stable UI release based on v0.3.1.

## Changes

- Unified the central Journal Card trip actions with consistent button sizing,
  spacing, typography and rounded corners.
- Added a responsive two-column action grid with a narrow-screen single-column
  fallback.
- Highlighted start, resume and reactivate as primary actions.
- Kept complete, edit and switch-trip actions neutral.
- Moved “Switch trip” into the shared action grid without changing trip status.
- Kept deletion visually separate and red while preserving the existing
  confirmation dialog and data-retention explanation.

## Scope

No backend APIs, status transitions, database schema, GPS recording, trips,
production Home Assistant systems or VM 104 were changed.
