# Camper Travel Journal v0.1.0-beta.8

Beta 8 ist eine Diagnoseversion. Sie macht die Antworten der bereits
authentifizierten Home-Assistant-WebSocket-Verbindung sichtbar, ohne die
Ursache der bisher beobachteten iOS/WebSocket-Fehler vorwegzunehmen.

## Neu

- optionale `custom:camper-travel-journal-diagnostics-card`
- manuelle, sequenzielle read-only-Prüfung von Authentifizierung,
  `list_vehicles` und `list`
- Timeout-, Promise-, Verbindungs-, Fehlercode- und Strukturdiagnose
- datenschutzbereinigter, kopierbarer Bericht mit maskierten IDs
- getrennte Lade- und Speicherfehler in den bestehenden Karten

## Sicherheit und Grenzen

Die Diagnose wird nicht automatisch gestartet, speichert nichts in SQLite,
überträgt keinen Bericht und verwendet keine neuen Zugangsdaten. Die bekannten
`non-zero reserved bits`-Meldungen werden nicht durch Proxy-, Kompressions- oder
Home-Assistant-Änderungen behandelt. Eine echte iOS/WebKit-Verifikation bleibt
eine Einschränkung der verfügbaren CI-Umgebung.
