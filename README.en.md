# Camper Travel Journal

<p align="center">
  <img src="https://raw.githubusercontent.com/balronu/ha-camper-travel-journal/main/assets/branding/readme-banner.png" alt="Camper Travel Journal — Your digital camper travel journal for Home Assistant" width="1200">
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/balronu/ha-camper-travel-journal/main/assets/branding/logo.png" alt="Camper Travel Journal logo" width="220">
</p>

[![Tests](https://github.com/balronu/ha-camper-travel-journal/actions/workflows/tests.yml/badge.svg)](https://github.com/balronu/ha-camper-travel-journal/actions/workflows/tests.yml)
[![Validate](https://github.com/balronu/ha-camper-travel-journal/actions/workflows/validate.yml/badge.svg)](https://github.com/balronu/ha-camper-travel-journal/actions/workflows/validate.yml)
[![Latest beta](https://img.shields.io/github/v/release/balronu/ha-camper-travel-journal?include_prereleases&label=latest%20beta)](https://github.com/balronu/ha-camper-travel-journal/releases)

🇩🇪 [Deutsch](README.md) | 🇬🇧 English

An early Home Assistant custom integration for a privacy-conscious digital
camper travel journal: GPS recording, drive detection, trips, expenses, maps,
statistics and exports are the long-term goal.

> **Status: `v0.1.0-beta.10` expense-management development beta.** Not production-ready. The
> current release has not yet been validated in a live Home Assistant instance.

## Current feature matrix

| Area | Status |
| --- | --- |
| Config Flow / Options Flow | Implemented; offline-tested, HA fixtures run in CI |
| GPS validation | Implemented and synthetic-tested |
| Event-driven collector | Implemented; live HA lifecycle still requires CI verification |
| Duplicate, accuracy, jump and GPS-gap handling | Implemented and synthetic-tested |
| Adaptive point storage | Implemented and synthetic-tested |
| Multiple vehicles | Implemented and synthetic-tested |
| Separate SQLite database | Implemented and synthetic-tested |
| Restart recovery | Implemented with bounded replay; HA restart requires CI verification |
| Retention | Dry-run only; no destructive deletion in beta |
| Trip/expense UI | Summary and manager cards implemented; production pilot remains open |
| Trip management | Trip CRUD, lifecycle controls, manual drive assignment/unassignment |
| Stops and travel costs | API CRUD, expense categories and per-category totals; basic manager UI |
| Maps, statistics, exports | Map/export work planned; expense summary is partial |

## Installation

This beta is for development testing. Do not connect a production GPS source
until CI and Home Assistant gates are green and a separate backup/pilot approval
exists.

### HACS custom repository

1. Open **HACS → Integrations → Custom repositories**.
2. Add `https://github.com/balronu/ha-camper-travel-journal` as an **Integration**.
3. For the development build, select the `v0.1.0-beta.10` pre-release; do not select the development `main` ref.
4. Restart Home Assistant.
5. Add **Camper Travel Journal** under **Settings → Devices & services**.

HACS manages pre-releases per repository. If Beta 10 is not offered, refresh the
repository information in the HACS menu and enable pre-release tracking for
this repository (in current HACS versions this is exposed as a pre-release
switch or update entity). This user setting cannot reliably be forced by
repository files. A displayed `main` commit is not a beta release and must not
be installed as the update.

The durable beta/stable strategy, HACS update logic, and branding paths are
documented in [`docs/HACS_RELEASE_STRATEGY.md`](docs/HACS_RELEASE_STRATEGY.md).

### Manual

Copy `custom_components/camper_travel_journal`, including its `translations`
subdirectory, into the
Home Assistant configuration directory, restart Home Assistant, and add the
integration through the UI.

## Configuration

The flow requires a vehicle name and a `device_tracker` entity with numeric
`latitude` and `longitude` attributes. It also configures recording enabled,
minimum interval (30 seconds by default), minimum movement (25 metres),
unassigned retention (90 days), stop detection (10 minutes), GPS-gap and
plausible-speed thresholds.

Recording is disabled by default in this development build. Options can be
changed without reinstalling. Multiple config entries support multiple vehicles.

The collector uses state events, validates timestamps and coordinates, rejects
implausible jumps, handles `unknown`/`unavailable`, and does not bridge a long
GPS outage with artificial straight-line distance. Logs do not contain complete
routes or coordinates.

## Database and privacy

The integration owns `camper_travel_journal.db` in the Home Assistant
configuration directory. It never changes or opens the Recorder database and
does not use Recorder/MariaDB credentials. SQLite operations run through an
executor-backed serialized worker.

Unassigned GPS points are eligible for a configurable retention dry-run;
assigned route data is protected. Destructive deletion is not implemented in
this beta. Trips, stops and expenses are retained in the integration-owned
database. Include this additional database file in backup/restore checks.
Automatic drive assignment runs only when exactly one trip is active and never
overwrites an existing manual assignment.

GPS data is sensitive. Use synthetic coordinates in issues, tests and pull
requests. Never publish exact locations, private addresses, tokens, credentials
or unredacted Home Assistant logs.

## Troubleshooting

- **Tracker unavailable:** verify the entity ID and numeric coordinates.
- **No points:** check recording and configured thresholds.
- **No drive:** detection is intentionally conservative and needs multiple
  plausible movement samples.
- **GPS gap:** the gap is deliberately not converted into route kilometres.
- **Database error:** inspect logs and restore only the separate database from
  a known-good backup; do not touch Recorder.
- **HACS validation:** this is an early custom-repository beta, not an official
  HACS default-listing submission.

## Development and tests

```bash
pytest -q
python -m compileall -q custom_components tests
```

GitHub Actions additionally run Home Assistant 2026.10.1 fixtures, coverage,
Hassfest, JSON/structure validation and Gitleaks. A missing or failing required
gate blocks a release.

See [the Phase 1C report](docs/phase-1c-report.md), [architecture](docs/architecture.md),
[database schema](docs/database-schema.md), [test plan](docs/test-plan.md) and
[branding documentation](docs/BRANDING.md).

## Lovelace frontend and cache

This beta includes a compact summary card and a full-width manager card. The
integration registers the versioned bundle URL
`/camper_travel_journal/camper-travel-journal.js?v=0.1.0-beta.10` automatically.
Do not add a second manual resource. For a stale display, check the resource
version and reload the dashboard first; clearing the browser cache is a last
resort. An installable but intentionally unapplied subview example is in
[dashboard-wohnmobil-reisetagebuch.yaml](docs/examples/dashboard-wohnmobil-reisetagebuch.yaml).
See the [frontend/cache standard](docs/frontend-cache.md).

### Controlled first installation

After selecting the `v0.1.0-beta.10` pre-release in HACS, restarting Home
Assistant and completing the config flow, add a test view to the camper
dashboard with both cards:

```yaml
type: custom:camper-travel-journal-summary-card
vehicle_id: <config-entry-id>
```

```yaml
type: custom:camper-travel-journal-manager-card
vehicle_id: <config-entry-id>
```

The example subview in `docs/examples/dashboard-wohnmobil-reisetagebuch.yaml`
is a template only and is not installed automatically.

Both cards are also available in the visual card picker. After choosing a card,
the configured camper can be selected in the graphical editor; when exactly one
hub exists, it is selected automatically.

### Beta 8 diagnostic card

For targeted analysis, temporarily add a separate Lovelace card of type
`custom:camper-travel-journal-diagnostics-card`. It never starts automatically.
On the iPhone, select **Diagnose starten** and, if needed, the one-time
**Diagnose wiederholen**, then use **Bericht kopieren** to provide the sanitized
report. The report contains no tokens, cookies, coordinates, routes or private
trip content.

## Roadmap

- `v0.1.x`: GPS foundation and controlled beta validation
- `v0.1.x`: GPS foundation, trip management and controlled beta validation
- `v0.2.x`: maps, statistics and data exports
- `v1.0.0`: stable release after production-grade validation

## Support

- [Bug report](https://github.com/balronu/ha-camper-travel-journal/issues/new?template=bug_report.yml)
- [Feature request](https://github.com/balronu/ha-camper-travel-journal/issues/new?template=feature_request.yml)
- [Issues](https://github.com/balronu/ha-camper-travel-journal/issues)
- [Releases](https://github.com/balronu/ha-camper-travel-journal/releases)
- [Changelog](CHANGELOG.md)

## License

MIT; see [LICENSE](LICENSE).
