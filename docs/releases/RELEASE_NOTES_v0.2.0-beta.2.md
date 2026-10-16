# Camper Travel Journal `v0.2.0-beta.2`

## Kartenprovider und Fahrtenreihenfolge

- Die Map Card verwendet keinen ungefragt fest verdrahteten externen Tile-Provider mehr.
- `tile_url` und `tile_attribution` können für einen ausdrücklich autorisierten Provider gesetzt werden.
- Tile-Fehler entfernen die fehlerhafte Hintergrundebene und zeigen einen verständlichen Hinweis; GPS-Polylines und Marker bleiben sichtbar.
- Fahrtabschnitte werden chronologisch nach `started_at` aufsteigend sortiert.

## Nutzungshinweis

Für `tile.openstreetmap.org` gelten die offiziellen OSM-Tile-Nutzungsbedingungen. Dazu gehören sichtbare Attribution, korrekte Browser-Identifikation/Referer und Caching. Die Karte versucht nicht, Sperren durch Header-Manipulation, Proxies oder wechselnde Domains zu umgehen. Ohne konfigurierten Provider bleibt die GPS-Route ohne Hintergrundkarte sichtbar.

Die Beta enthält keine Datenbankmigration und ändert keine Reise-, GPS-, Kosten- oder Backend-Funktionen.
