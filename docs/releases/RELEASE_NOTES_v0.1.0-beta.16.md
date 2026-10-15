# Camper Travel Journal `v0.1.0-beta.16`

## Reproduzierbares Frontend-Bundle

Beta 16 korrigiert das nicht build-konsistente Beta-15-Bundle. Das eingecheckte
Frontend-Artefakt ist bytegenau gegen den reproduzierbaren Vite-Build geprüft;
CI bricht bei einer Abweichung ab. Die versionierte Extra-JS-URL verwendet
`?v=0.1.0-beta.16`, und historische Beta-2–15-URLs werden bei jedem Setup
idempotent entfernt.

## GPX-Import bleibt erhalten

Der sichere, begrenzte GPX-1.1-Parser, die lokale Vorschau sowie der ausdrücklich
bestätigte, atomare und idempotente Import aus Beta 15 bleiben unverändert.
Keine produktive Home-Assistant-Installation, VM 104 oder produktive Datenbank
wurde verändert.
