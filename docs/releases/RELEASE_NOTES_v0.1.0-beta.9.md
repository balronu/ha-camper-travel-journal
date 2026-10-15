# Camper Travel Journal v0.1.0-beta.9

## WebSocket-Registrierung und iOS/Safari-Diagnosebericht

- Registriert die authentifizierten `camper_travel_journal/*`-WebSocket-Befehle
  auch während `async_setup_entry`, damit geladene Config Entries nach einem
  Reload zuverlässig `list`, `list_vehicles`, `create_trip` und die übrigen
  Befehle anbieten.
- Verwendet in jedem WebSocket-Schema den exakten Befehlsnamen statt des
  generischen Typs `str`; damit werden Frontend-Aufrufe nicht mehr als
  `unknown_command` abgewiesen.
- Ergänzt einen HA-WebSocket-Regressionstest für die geladene Integration.
- Führt keine schreibenden Live-Tests aus; die Schreibbefehle werden über die
  gemeinsame Registrierungsliste geprüft.
- Ergänzt eine manuell auswählbare Berichtstextfläche als Fallback, wenn die
  Clipboard-API auf iOS/Safari fehlt oder abgelehnt wird.

Bestehende Reisen, Datenbank- und Dashboard-Konfigurationen werden nicht
verändert. Netzwerk, Proxy und WebSocket-Kompression werden nicht angepasst.
