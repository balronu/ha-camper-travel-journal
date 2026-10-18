# Camper Travel Journal v0.3.0-beta.8

## WebSocket-Hotfix

Diese Beta behebt die fehlende Registrierung der bereits implementierten
authentifizierten WebSocket-Befehle:

- `camper_travel_journal/assign_interruption`
- `camper_travel_journal/create_stop_from_interruption`

Die Handler-Schemas, Berechtigungsgrenzen über den geladenen Fahrzeug-Runtime-
Kontext, Feldnamen und kontrollierten Fehlerantworten bleiben unverändert.
Ein isolierter Home-Assistant-Test ruft beide Befehle über den echten HA-
WebSocket auf und prüft erfolgreiche Zuordnung, neue Aufenthalte,
Idempotenz, ungültige Eingaben sowie Reise- und Fahrzeuggrenzen.

Es gibt keine Datenbankmigration. Produktive Home-Assistant-Daten werden durch
diesen Hotfix nicht verändert.
