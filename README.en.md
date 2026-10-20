# Camper Travel Journal

<p align="center">
  <img src="https://raw.githubusercontent.com/balronu/ha-camper-travel-journal/main/assets/branding/logo.png" alt="Camper Travel Journal logo" width="220">
</p>

<h1 align="center">Camper Travel Journal</h1>
<p align="center">Your digital camper travel journal for Home Assistant</p>
<p align="center"><strong>Stable: v0.3.1</strong></p>

<p align="center">
  <a href="https://github.com/balronu/ha-camper-travel-journal/releases/latest"><img src="https://img.shields.io/github/v/release/balronu/ha-camper-travel-journal?label=Release" alt="Release"></a>
  <a href="https://hacs.xyz/"><img src="https://img.shields.io/badge/HACS-Custom-orange" alt="HACS Custom Integration"></a>
  <a href="https://github.com/balronu/ha-camper-travel-journal/actions/workflows/tests.yml"><img src="https://img.shields.io/github/actions/workflow/status/balronu/ha-camper-travel-journal/tests.yml?label=CI" alt="CI"></a>
  <a href="https://github.com/balronu/ha-camper-travel-journal/actions/workflows/validate.yml"><img src="https://img.shields.io/github/actions/workflow/status/balronu/ha-camper-travel-journal/validate.yml?label=Hassfest%20%2F%20HACS" alt="Hassfest and HACS validation"></a>
  <a href="https://github.com/balronu/ha-camper-travel-journal/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License"></a>
</p>

[🇩🇪 Deutsch](README.md) | 🇬🇧 English

## What is Camper Travel Journal?

Camper Travel Journal collects and organizes camper travel information directly
in Home Assistant. GPS points, detected drives, trips, stops and expenses are
stored in an integration-owned local SQLite database. No external cloud service
is required.

The project is still actively evolving; practical validation on different
mobile browsers and Home Assistant setups is important.

## Features

- GPS recording from a configured `device_tracker`, disabled by default.
- Conservative drive detection with movement thresholds, duplicate filtering,
  jump protection and GPS-gap protection.
- Multiple campers through separate Home Assistant config entries.
- Trip management with dates, destinations, statuses and editing.
- Summary Card with active-trip priority and a compact selector for every trip
  of the configured vehicle. Metrics and actions always use the same trip.
- Manager Card for trips, drive assignment, manual drives and expenses.
- PDF travel reports with drives, expenses, stops and notes; reports are
  authenticated and generated in memory only.
- Map Card with CARTO Basemaps, GPS lines, drive sections and segment colors.
- Safe atomic PAJ GPX 1.1 import with preview, duplicate protection, period
  warnings and explicit target-trip selection.
- Expense management with stable categories, integer cents and currency checks.
- German and English user interfaces.
- A central Journal Card for new dashboards: select, open, edit, resume,
  pause, complete, delete or switch a trip while all trip sections use the
  same trip context.

## HACS installation

1. Open **HACS → Integrations → Custom repositories**.
2. Add `https://github.com/balronu/ha-camper-travel-journal` as an
   **Integration** repository.
3. Install the stable `v0.3.1` release.
4. Restart Home Assistant manually.
5. Add the integration under **Settings → Devices & services**.

The integration registers its versioned frontend bundle automatically. Do not
add a second Lovelace resource for the same JavaScript file. See
[docs/HACS_RELEASE_STRATEGY.md](docs/HACS_RELEASE_STRATEGY.md) for release and
HACS guidance.

## First setup

Setup requires a vehicle name and a `device_tracker` entity with numeric
`latitude` and `longitude` attributes. Enable recording only after checking the
tracker and your privacy requirements. Interval, minimum movement, stop
detection, GPS gap, plausible maximum speed and unassigned-point retention are
configurable options.

## Dashboard cards

> **IMPORTANT – LOVELACE CARDS HAVE CHANGED!**
>
> v0.3.0 consolidates the previous card structure. New dashboards only need
> `Camper Travel Journal – Reisetagebuch`. Summary, Manager, Map and
> Diagnostics remain functional for existing dashboards, but are no longer
> offered for new cards and display a migration notice. Existing trips,
> drives, GPS data, overnight places, ratings and expenses are retained.

### Migration {#migration}

After updating, manually replace the previous individual cards in dashboards
with the central Journal Card. HACS does not provide a custom warning banner;
the notice is therefore shown inside every legacy card and documented here and
in the release notes.

For new dashboards, use the central Journal Card:

```yaml
type: custom:camper-travel-journal-journal-card
vehicle_id: <config-entry-id>
```

The workflow is **select trip → open trip → use trip actions → switch trip**.
Status actions affect only the open trip; “Switch trip” does not change its
status.
Without an open trip, trip forms, maps, GPX and PDF actions are hidden. The
Diagnostics Card remains independent. Existing Summary, Manager and Map cards
remain supported for compatibility.

Add the cards through the Lovelace visual editor or YAML:

```yaml
type: custom:camper-travel-journal-summary-card
vehicle_id: <config-entry-id>
```

```yaml
type: custom:camper-travel-journal-manager-card
vehicle_id: <config-entry-id>
```

The central Journal Card is the only new card type offered by the Lovelace
catalog. Existing Summary, Manager, Map and Diagnostics cards remain usable in
YAML and existing dashboards. The Map Card displays stored GPS
lines and drive segments, does not calculate road routes, and uses no geocoding
or routing service:

```yaml
type: custom:camper-travel-journal-map-card
vehicle_id: <config-entry-id>
```

Choose the provider under **Settings → Devices & services → Camper Travel
Journal → Configure**. CARTO Basemaps uses the official Voyager raster URL and
the attribution `© OpenStreetMap contributors, © CARTO`. The API key is stored
in a password field, is never prefilled when editing, and is passed to the
browser for tile requests; it is therefore visible in browser network tools.
The key can be changed or removed. Without a provider, no external background
map is requested and the GPS route remains visible. Manual
`tile_url`/`tile_attribution` values remain compatible for advanced card
configuration.
Historical points without an unambiguous drive membership are not presented as
exact assignments.

The Summary Card prefers active trips. When several trips are active, it makes
a deterministic choice using the latest `started_at` and, for ties, the trip
ID. With no active trip, the same rule applies to all trips. The selection
survives refreshes, and title, period, status, metrics and actions always come
from that selected trip.

## GPS recording and GPX import

Recording reacts to tracker events, rejects invalid points and keeps sensitive
coordinates local.

Use **Import GPX** in the Manager Card to analyze a PAJ GPX 1.1 file. The
preview shows GPS points, drive sections, timestamps, distance, gaps and
duplicate conflicts. The camper and target trip are visible before confirmation;
the target trip can be selected or left empty to save free drives. Trip-period
differences produce warnings but do not block the import. Only explicit
confirmation writes atomically to the local database.

## Practically validated workflows

The stable release was practically checked with a real PAJ GPX file: 903 GPS
points were processed into three drive sections covering about 1,118.7 km.
Drive assignment to a trip, distance totals and expense management were
successfully verified. These results document the tested workflow with the
data used; they are not a general compatibility promise for every Home
Assistant or browser environment.

## Trip and expense management

Trips can be created, edited, started, paused and completed. Detected drives can
be linked to or unlinked from a trip, and manual drives can be stored separately.
Expenses are summed per trip as integer cents. Mixed currencies are never added
silently.

## Places, Home and reverse geocoding

Drive endpoints can be labelled from manual place names, the Home Assistant
`zone.home`, an unambiguous stay on the same trip, or optional reverse
geocoding. Manual names are preserved; coordinates remain the fallback when no
unambiguous information exists. Home detection uses the configured radius and
never creates a stay automatically.

Reverse geocoding is disabled by default. When explicitly enabled, only
relevant drive endpoints are sent to Nominatim. Timeout, caching and the
offline coordinate fallback remain active. See the
[Lovelace and privacy documentation](docs/lovelace.md).

## PDF travel report

The authenticated export creates a German or English PDF in memory. It
contains the summary, drives, stays, places, ratings, expenses and a
geographically correct offline travel map on a neutral background. Start,
destination and confirmed overnight places are marked; identical labels are
grouped. Long tables split with repeated headers, and HTTPS websites are
emitted as clickable links.

## Privacy and local storage

The integration stores its data in `camper_travel_journal.db` in the Home
Assistant configuration directory. It does not use Recorder or MariaDB and
does not send GPS data to an external service. Include this SQLite file in your
backups. Do not publish private coordinates, tokens or unredacted logs in
issues or tests.

## Known limitations

- The scope is focused on the travel journal, drives, expenses and GPX import.
- Historical beta changes remain documented in the changelog.
- Retention calculates candidates but does not automatically delete in this
  version.
- Mobile Safari/WebKit and productive installations still need practical
  validation.

Technical details about versioned frontend delivery are documented in the
[frontend cache documentation](docs/frontend-cache.md); the current project
version is shown by the release badges above.

## Roadmap

See the status-separated [docs/ROADMAP.md](docs/ROADMAP.md). Planned work
includes expanded statistics, exports and complete Lovelace stop management.
The map view, central Journal Card and authenticated PDF travel reports are
part of v0.3.0.

## Support and contributing

- [Report a bug](https://github.com/balronu/ha-camper-travel-journal/issues/new?template=bug_report.yml)
- [Request a feature](https://github.com/balronu/ha-camper-travel-journal/issues/new?template=feature_request.yml)
- [Issues and pull requests](https://github.com/balronu/ha-camper-travel-journal/issues)
- [Releases](https://github.com/balronu/ha-camper-travel-journal/releases)
- [Feature matrix](docs/v0.3.0-feature-matrix.md) · [Lovelace cards](docs/lovelace.md)
- [Upgrade](docs/upgrade-v0.3.0.md) · [Architecture](docs/architecture.md) · [Test plan](docs/test-plan.md)

Contributions with synthetic test data, a clear problem statement and focused
regression tests are especially welcome. Changes to GPS, trip or expense logic
should preserve existing data and atomic backend validation.

## License

Camper Travel Journal is released under the [MIT License](LICENSE).
