# Camper Travel Journal – Roadmap

This roadmap separates implemented work, current limitations and planned
features. It is based on the published `v0.1.0-beta.13` source tree and tests.
A database
table or WebSocket method is not treated as a finished user feature
without a corresponding UI and test path.

## Completed foundation

- Config Flow and Options Flow for one or more `device_tracker` vehicles.
- Event-driven GPS collection with coordinate/time validation, duplicate and
  implausible-jump filtering, adaptive point storage and GPS-gap protection.
- Conservative drive/stay detection and bounded restart recovery.
- Versioned integration-owned SQLite schema with serialized worker,
  transactions, foreign keys and reversible drive-to-trip links.
- Trip CRUD, lifecycle transitions and drive assignment in the authenticated
  WebSocket API and Manager Card.
- Summary Card, Manager Card, visual card editor and manual read-only
  diagnostic card.
- Expense CRUD, integer-cent totals, mixed-currency protection, inline editing
  and canonical category IDs, including the `camping` round-trip.

## Current published development baseline: `v0.1.0-beta.13`

This is a published development beta, not a stable release. CI covers the
pinned Home Assistant environment and synthetic/isolated data. Beta 12 adds
trip periods, visible and assignable drives, manual-drive CRUD and atomic
schema migration. Existing rows remain untouched until a user explicitly
edits them.

## Beta 12 – travel periods and drives (published)

`v0.1.0-beta.12` adds optional trip start/end dates, inline editing, visible detected drives,
vehicle-bound assignment/unassignment, and separate manual drives with source,
locations, distance, optional duration, editing and deletion. The schema-5
migration is transactional and preserves existing GPS rows and trips without
dates; no GPS timestamps are copied into a trip date automatically. Desktop
Chromium/CI coverage is required; iOS, Safari/WebKit and production-dashboard
practice remain open.

## Beta 13 – frontend bundle registration hotfix (published)

`v0.1.0-beta.13` removes stale historical
Extra-JS bundle URLs during integration setup before registering the current
versioned bundle. This addresses update/reload situations in which Manager,
Summary and diagnostic cards could be affected by parallel bundle lifecycles.
The candidate adds DOM checks that fail if Lit markers or JavaScript handler
source becomes visible text. No database, trip, drive or expense behavior is
changed.

## Beta 11 – expense-category correction (completed)

1. Use stable internal IDs independently from German labels. **Done.**
2. Test every category through select input, WebSocket payload, storage,
   response, display and reload; give `camping` a dedicated regression path.
3. Reject unknown category IDs; never fall back silently to `other`. **Done.**
4. Add desktop Chromium browser interaction checks. **Done.** iOS/Safari/WebKit
   and narrow/mobile practice validation remain open.
5. Preserve existing expenses and avoid schema migration or automatic
   recategorization. **Done.**

## Next development phase

- Provide a map/route detail view with coordinates or neutral labels where no
  place name exists.
- Add richer drive filtering and date-range selection without mixing vehicles.
- Add complete stop creation, editing and deletion to Lovelace.
- Add acceptance tests for reload, empty data, failures and mobile layout.

## `v0.2.x` – planned travel views

- Map view and trip route history.
- Drive, distance and stop statistics.
- Privacy-aware data exports.
- Usability improvements after Beta 12 practice validation.

## Later architecture investigation

Evaluate whether an HA-configured database backend could replace or complement
the separate SQLite database. A separate spike must cover Recorder
compatibility, custom tables, migration, concurrency, backup/restore,
retention and performance. Documentation must not present this as decided.

## `v1.0.0` – stable release gate

Stable publication requires successful CI/Hassfest/HACS validation, complete
user-facing travel and expense workflows, backup/restore evidence, mobile and
desktop acceptance, and sufficient practical Home Assistant validation.

## Evidence boundaries

| Evidence | Meaning |
| --- | --- |
| Source/API present | Backend capability, not necessarily user-facing |
| Offline/unit test | Deterministic local behavior covered |
| HA CI fixture | Integration lifecycle/API works in pinned test environment |
| Browser harness | Emitted card behavior in tested browser |
| Practice test | Human exercised released installation; scope must be stated |
| Production readiness | Separate decision, not implied by one green test |

## Approval gates

- No production installation, HA restart, database migration or test travel is
  part of roadmap work by default.
- New releases require a reviewed PR, full CI on the exact merge commit, an
  immutable annotated tag and explicit release authorization.
- Database-backend changes, destructive retention, migrations and Stable
  publication require separate explicit approval.
