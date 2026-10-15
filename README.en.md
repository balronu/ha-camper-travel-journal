# Camper Travel Journal

A privacy-conscious Home Assistant custom integration for **Your digital camper
travel journal**. GPS points, detected drives, trips, stops and expenses are
stored in an integration-owned SQLite database.

[Deutsch](README.md) | 🇬🇧 English

> **Status:** `v0.1.0-beta.10` – development beta. Not a stable or generally
> production-validated release.

## Actual feature status

| Area | Beta 10 status | Lovelace? | Evidence |
| --- | --- | --- | --- |
| Config-/Options Flow | Vehicle, tracker and recording options | No, HA settings | HA fixtures/offline |
| GPS recording | Event collector, filters, jump/gap protection | Indirectly through options | Domain/SQLite tests, CI |
| Drive detection | Conservative state machine and distance | No, result data | Synthetic tests |
| Multiple vehicles | Separate config entries | Card editor | HA/frontend tests |
| Trips | Create, edit title, delete, status changes | Yes, Manager Card | API/HA/frontend tests |
| Drives | GPS result, link/unlink | Assignment | Storage/API contracts |
| Stops | Schema and WebSocket CRUD | No | Storage/API tests |
| Expenses | Categories, cents, totals, edit, delete | Yes | Tests; `camping` practice fix open |
| Cards/diagnostics | Summary, Manager, editor, manual diagnostics | Yes | Bundle/Vitest/Chromium |
| Maps, statistics, exports | Not implemented | No | Roadmap |

This table distinguishes backend/API, user interface, tests and practical
validation. A database table or API method is not automatically a finished
user feature.

## HACS installation

Beta 10 is intended for controlled development testing:

1. Open **HACS → Integrations → Custom repositories**.
2. Add `https://github.com/balronu/ha-camper-travel-journal` as an integration.
3. Select the `v0.1.0-beta.10` pre-release, not `main`.
4. Restart Home Assistant manually after installation.
5. Add the integration under **Settings → Devices & services**.

If HACS does not offer Beta 10, refresh repository information and enable
pre-release selection. A `main` commit is not the beta release. See
[docs/HACS_RELEASE_STRATEGY.md](docs/HACS_RELEASE_STRATEGY.md).

Manual installation copies `custom_components/camper_travel_journal/`,
including `translations/`, into the Home Assistant configuration directory,
followed by a manual restart.

## Setup and GPS tracker

The config flow requires a vehicle name and a `device_tracker` entity with
numeric `latitude`/`longitude` attributes. Recording is disabled by default.
Interval, movement threshold, stop detection, GPS gap, plausible maximum speed
and unassigned retention are configurable. Multiple vehicles use separate
config entries.

The collector reacts to state events, rejects invalid or implausible points and
duplicates, and never bridges a long GPS outage with artificial straight-line
distance.

## Dashboard cards

The integration registers its versioned bundle automatically; do not add a
second manual resource.

```yaml
type: custom:camper-travel-journal-summary-card
vehicle_id: <config-entry-id>
```

```yaml
type: custom:camper-travel-journal-manager-card
vehicle_id: <config-entry-id>
```

The Summary Card shows the current trip, status, distance, drives, stops and
costs. The Manager Card manages trips, status changes, drive assignment and
expenses. The visual editor auto-selects the vehicle when exactly one exists.

Bundle URL: `/camper_travel_journal/camper-travel-journal.js?v=0.1.0-beta.10`.
See [docs/frontend-cache.md](docs/frontend-cache.md).

## Trips, drives and stops

Trips can be created, renamed, deleted, started, paused and completed. GPS
drives are detected conservatively and can be linked to or unlinked from a
trip. There is no complete route map, manual drive creation or detailed route
view yet.

Stops exist in the schema and authenticated WebSocket API, but are not yet
operable from Lovelace cards.

## Expense management

The internal category IDs are `camping`, `fuel`, `toll`, `parking`, `food`,
`activities` and `other`. German labels are translations; the slash in
“Stellplatz/Campingplatz” is not stored. Expenses use integer cents and are
summed per trip; mixed currencies are not silently added.

**Beta 10 practice issue:** A broken `camping` round-trip was reported.
Existing entries are not automatically recategorized. Beta 11 will stabilize
the IDs and add a complete selection/WebSocket/database/reload test.

## Database, privacy and backups

The integration owns `camper_travel_journal.db` in the Home Assistant
configuration directory and never opens or changes Recorder/MariaDB. SQLite
access is serialized; the current schema is version 4. Destructive retention
deletion is disabled in this beta. Include the additional database file in
backups; see [docs/database-schema.md](docs/database-schema.md).

GPS data is sensitive. Use synthetic coordinates in issues and tests; never
publish private routes, tokens or unredacted logs.

## Known limitations

- No stable release or general production pilot.
- Stops are not usable from Lovelace yet.
- No maps, statistics or exports.
- Retention only calculates candidates and does not delete automatically.
- Only integration-owned SQLite exists; using HA Recorder/MariaDB is neither
  decided nor implemented.
- Separate iOS WebSocket `non-zero reserved bits` messages were not changed.

## Roadmap

See the status-separated [docs/ROADMAP.md](docs/ROADMAP.md):

- **Beta 11:** stabilize the expense-category round-trip and prove `camping`.
- **Next phase:** make drives, routes and stops fully user-accessible.
- **v0.2.x:** maps, trip history, statistics and exports.
- **Later:** evaluate an alternative HA database backend separately.
- **v1.0.0:** stable only after sufficient practical validation.

## Support, development and license

- [Bug report](https://github.com/balronu/ha-camper-travel-journal/issues/new?template=bug_report.yml)
- [Feature request](https://github.com/balronu/ha-camper-travel-journal/issues/new?template=feature_request.yml)
- [Issues](https://github.com/balronu/ha-camper-travel-journal/issues)
- [Releases](https://github.com/balronu/ha-camper-travel-journal/releases)
- [Changelog](CHANGELOG.md)
- [Architecture](docs/architecture.md) · [Test plan](docs/test-plan.md) · [Branding](docs/BRANDING.md)

Local checks:

```bash
pytest -q
python -m compileall -q custom_components tests
```

License: MIT, see [LICENSE](LICENSE).
