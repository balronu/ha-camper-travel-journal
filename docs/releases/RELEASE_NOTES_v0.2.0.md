# Camper Travel Journal v0.2.0

Camper Travel Journal v0.2.0 is the stable release after the v0.2.0 beta
series.

## Included

- Four Lovelace cards: Summary, Manager, Map and optional Diagnostics.
- CARTO Basemaps configuration with secret-safe options handling and manual
  tile overrides for advanced users.
- GPS routes, drive sections, GPX import, trip and expense management.
- Authenticated, in-memory PDF travel reports without GPS coordinates or
  unprotected public download URLs.
- PDF timestamps converted to Home Assistant's configured timezone, including
  daylight-saving transitions, with German and English category labels.
- Responsive map and trip-management interfaces with German and English
  translations.

## Privacy

No productive Home Assistant data was changed during the release work. API
keys are never included in logs, diagnostics, tests or repository files. CARTO
tile requests are browser-visible by design; use a provider key according to
its terms and do not use the integration to bypass provider restrictions.
