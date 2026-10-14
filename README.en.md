# Camper Travel Journal

<p align="center">
  <img src="assets/branding/readme-banner.png" alt="Camper Travel Journal — Your digital camper travel journal for Home Assistant" width="1200">
</p>

<p align="center">
  <img src="assets/branding/logo.png" alt="Camper Travel Journal logo" width="220">
</p>

[![Tests](https://github.com/balronu/ha-camper-travel-journal/actions/workflows/tests.yml/badge.svg)](https://github.com/balronu/ha-camper-travel-journal/actions/workflows/tests.yml)
[![Validate](https://github.com/balronu/ha-camper-travel-journal/actions/workflows/validate.yml/badge.svg)](https://github.com/balronu/ha-camper-travel-journal/actions/workflows/validate.yml)
[![Latest beta](https://img.shields.io/github/v/release/balronu/ha-camper-travel-journal?include_prereleases&label=latest%20beta)](https://github.com/balronu/ha-camper-travel-journal/releases)

🇩🇪 [Deutsch](README.md) | 🇬🇧 English

An early Home Assistant custom integration for a privacy-conscious digital
camper travel journal: GPS recording, drive detection, trips, expenses, maps,
statistics and exports are the long-term goal.

> **Status: `v0.1.0-beta.1` development beta.** Not production-ready. The
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
| Trip/expense UI | Not available; schema foundation only |
| Maps, statistics, exports | Planned |

## Installation

This beta is for development testing. Do not connect a production GPS source
until CI and Home Assistant gates are green and a separate backup/pilot approval
exists.

### HACS custom repository

1. Open **HACS → Integrations → Custom repositories**.
2. Add `https://github.com/balronu/ha-camper-travel-journal` as an **Integration**.
3. Install the beta and restart Home Assistant.
4. Add **Camper Travel Journal** under **Settings → Devices & services**.

### Manual

Copy `custom_components/camper_travel_journal` and `translations` into the
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
this beta. Trips and expenses are retained, but their UI is not available yet.
Include this additional database file in backup/restore checks.

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

## Roadmap

- `v0.1.x`: GPS foundation and controlled beta validation
- `v0.2.x`: trip management UI
- `v0.3.x`: expense management UI
- `v0.4.x`: maps and dashboard resources
- `v1.0.0`: stable release after production-grade validation

## Support

- [Bug report](https://github.com/balronu/ha-camper-travel-journal/issues/new?template=bug_report.yml)
- [Feature request](https://github.com/balronu/ha-camper-travel-journal/issues/new?template=feature_request.yml)
- [Issues](https://github.com/balronu/ha-camper-travel-journal/issues)
- [Releases](https://github.com/balronu/ha-camper-travel-journal/releases)
- [Changelog](CHANGELOG.md)

## License

MIT; see [LICENSE](LICENSE).
