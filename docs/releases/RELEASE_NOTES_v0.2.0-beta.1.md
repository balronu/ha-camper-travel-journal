# Camper Travel Journal `v0.2.0-beta.1`

Die erste Beta der Kartenphase ergänzt eine read-only Darstellung tatsächlich
gespeicherter GPS-Verläufe.

## Enthalten

- additive Schema-7-Migration mit `drive_gps_points`
- exakte GPX-Punkt-zu-Fahrt-Zuordnung
- getrennte Kennzeichnung historischer Intervall-Rekonstruktionen
- authentifizierter read-only Route-WebSocket
- Punktlimit, Bounds, GPS-Lücken und response-seitige Vereinfachung
- eigenständige Leaflet-Lovelace-Karte
- Reiseauswahl, farbige Fahrtsegmente und Start-/Endmarker
- Light-/Dark-kompatible Home-Assistant-Kartenoberfläche
- synthetische Backend- und Frontend-Regressionsprüfungen

## Datenschutz und Grenzen

Die Karte verwendet keine Routing- oder Geocoding-Dienste. Kartenkacheln werden
separat vom konfigurierten Tile-Anbieter geladen und benötigen sichtbare
Attribution. GPS-Koordinaten werden nicht an diesen Anbieter übertragen.

Historische v0.1.0-Punkte werden nur dann als exakt einer Fahrt zugeordnet
angezeigt, wenn eine eindeutige Mitgliedschaft gespeichert ist. Mehrdeutige
Zeitintervalle werden nicht stillschweigend als exakt rekonstruiert.

Die Beta verändert keine produktive Home-Assistant-Installation und enthält
keine privaten GPS-Koordinaten in Tests oder Repository-Dateien.
