# Camper Travel Journal v0.1.0-beta.2

Frühe Entwickler-Beta mit Reiseverwaltung, transaktionaler Fahrtzuordnung,
Zwischenstopps, Reisekosten und zwei Lovelace-Cards. Nicht als Stable- oder
produktive Freigabe kennzeichnen.

## Enthalten

- SQLite-Schema 3 mit Migration und eigener Persistenz
- Reise-Zustandsmodell und exklusive Fahrtzuordnung
- authentifizierte Home-Assistant-WebSocket-API
- Summary Card und Manager Card mit gemeinsamer API-Schicht
- versionsgebundenes Frontend-Bundle `0.1.0-beta.2`

## Einschränkungen

- Kartenansicht mit externen Tiles ist noch nicht enthalten.
- Vollständige Reise-/Ausgabenbearbeitung und echte Browser-Tests bleiben zu erweitern.
- Keine produktive Dashboard-Installation wurde vorgenommen.

## Qualität

Die Veröffentlichung darf erst nach erfolgreichem Python-, Frontend-,
Hassfest-, HACS-, Secret-Scan-, Bundle- und Cache-Gate getaggt werden.
