# Camper Travel Journal `v0.2.0-beta.3`

## CARTO Basemaps

- Choose CARTO Basemaps or no background provider in the integration Options Flow.
- Store, change, and remove the CARTO Basemaps API key through a password field.
- Existing keys are never prefilled in the Options Flow; leaving the field empty keeps the key.
- The browser receives the key for CARTO tile requests, so it is visible in browser network tools.
- Use the official Voyager raster URL and keep `© OpenStreetMap contributors, © CARTO` visible.
- Manual `tile_url`/`tile_attribution` card overrides remain compatible.
- Without a provider, or after tile failure, GPS routes remain visible without a background map.

No productive Home Assistant, database, dashboard, VM 104, or restart changes are part of this release.
