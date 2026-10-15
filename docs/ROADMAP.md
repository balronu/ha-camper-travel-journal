# Camper Travel Journal – Roadmap

This roadmap separates implemented work, current limitations and planned
features. It is based on the source tree and tests at `v0.1.0-beta.10`; a
database table or WebSocket method is not treated as a finished user feature
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
- Expense CRUD, integer-cent totals, mixed-currency protection and inline
  expense editing. The `camping` practical round-trip is the active Beta 11
  correction item.

## Current Beta: `v0.1.0-beta.10`

This is a development beta. CI covers the pinned Home Assistant environment and
synthetic/isolated data. A manual Beta 10 practice test confirmed that the
total could be displayed, but reported that `Stellplatz/Campingplatz` was
stored/displayed as `Sonstiges`. Existing rows must remain untouched until a
user explicitly edits them.

## Beta 11 – expense-category correction

1. Use stable internal IDs independently from German labels.
2. Test every category through select input, WebSocket payload, storage,
   response, display and reload; give `camping` a dedicated regression path.
3. Reject unknown category IDs; never fall back silently to `other`.
4. Add browser interaction checks at desktop and narrow/mobile widths.
5. Preserve existing expenses and avoid schema migration or automatic
   recategorization.

## Next development phase

- Make detected drives user-accessible with date, duration, distance and
  assignment context.
- Decide whether manual drive creation is needed and define its contract.
- Provide a route/drive detail view and clear assignment controls.
- Add complete stop creation, editing and deletion to Lovelace.
- Add acceptance tests for reload, empty data, failures and mobile layout.

## `v0.2.x` – planned travel views

- Map view and trip route history.
- Drive, distance and stop statistics.
- Privacy-aware data exports.
- Usability improvements after Beta 11 practice validation.

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
