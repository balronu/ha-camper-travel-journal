# Camper Travel Journal v0.4.0

## Deutsch

Camper Travel Journal v0.4.0 ist die Stable-Version der modularen Journal Card,
des Tankbuchs, der Kostenübernahme und der GPS-basierten Verbrauchsdiagnose.

- Zahlen werden passend zur Sprache formatiert: Deutsch mit Dezimalkomma,
  Englisch mit Dezimalpunkt.
- Tankmengen und Literpreise werden mit bis zu drei Nachkommastellen,
  Verbrauch mit zwei und Strecken mit einer Nachkommastelle angezeigt.
- Deutsche Eingaben wie `42,420` bleiben numerisch korrekt und werden nicht als
  Tausendertrennzeichen fehlinterpretiert.
- Tankbuch-Kostenverknüpfungen bleiben 1:1 und erzeugen keine Doppelbuchungen.
- GPS-Verbrauch bleibt als geschätzter kombinierter Fahr-/Heizungsverbrauch
  gekennzeichnet, solange keine belastbaren Webasto-Daten vorliegen.
- SQLite-Schema 15 bleibt unverändert; es gibt keine automatische Datenänderung.

Vor einer Migration ist ein Backup erforderlich. Ein direktes Downgrade auf
v0.3.13 ist ohne Wiederherstellung einer kompatiblen Datenbank nicht vorgesehen.
Die Installation auf Home Assistant erfolgt manuell; VM104 wurde für diesen
Release nicht verändert.

## English

Camper Travel Journal v0.4.0 is the Stable release of the modular Journal Card,
fuel log, expense import and GPS-based consumption diagnostics.

- Numbers follow the selected language: German uses decimal commas and English
  uses decimal points.
- Fuel quantities and prices use up to three fractional digits, consumption two,
  and distances one fractional digit.
- German input such as `42,420` remains numerically correct and is not treated
  as a thousands separator.
- Fuel-log expense links remain one-to-one and do not create duplicate costs.
- GPS consumption remains labelled as estimated combined driving/heating
  consumption while reliable Webasto data is unavailable.
- SQLite schema 15 remains unchanged; no automatic data rewrite is performed.

Back up before a migration. A direct downgrade to v0.3.13 is not supported
without restoring a compatible database. Install the release manually in Home
Assistant; VM104 was not changed for this release.
