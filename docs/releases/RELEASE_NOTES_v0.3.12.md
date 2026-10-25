# Camper Travel Journal v0.3.12

## Deutsch

### Behoben

- Ein `stationary_timeout` bestätigt das Ende einer Fahrt, speichert aber nicht
  mehr den späteren Prüfpunkt als Fahrtende. Die tatsächliche Endzeit folgt dem
  letzten belastbaren Bewegungsereignis; der Prüfzeitpunkt bleibt intern als
  Erkennungs- und Stillstandsevidenz erhalten.
- Wiederholte Abschlussereignisse mit geringfügig unterschiedlichen Start- oder
  Endzeiten werden anhand Fahrzeug-ID und gemeinsamer GPS-Punktidentitäten
  idempotent behandelt. Mindestens zwei gemeinsame Punkte und 80 % der kleineren
  Punktfolge sind erforderlich. Echte nahe Folgefahrten mit nur einem gemeinsamen
  Grenzpunkt werden nicht zusammengeführt.
- HA-Neustart, Integrations-Reload, wiederholte historische Verarbeitung,
  Schema-13-Identitäten und Schema-14-Löschausschlüsse bleiben abgedeckt.

### Kilometer und Daten

- Die Distanzberechnung bleibt unverändert. Die produktiv verglichenen
  Duplikatpaare besitzen identische GPS-Punktfolgen und identische Haversine-
  Strecken; die PAJ-Abweichung ist damit keine nachgewiesene Filter-, Rundungs-
  oder Ausreißerabweichung.
- Bestehende GPS-Punkte, Aufenthalte, Kosten, Reisen, Exporte und manuelle
  Zuordnungen werden nicht automatisch verändert.

## English

### Fixed

- `stationary_timeout` confirms a drive end without persisting the later timeout
  sample as the drive endpoint. The actual end follows the last reliable
  movement event; the detection sample remains available as stationary evidence.
- Repeated completion events with slightly different start or end times are
  made idempotent using the vehicle ID and shared GPS point identities. At least
  two shared points and 80% of the smaller point sequence are required. Real
  adjacent drives sharing only one boundary point are not merged.
- HA restart, integration reload, repeated historical processing, Schema-13
  identities, and Schema-14 deletion exclusions remain covered.

### Distance and data

- Distance calculation is unchanged. The production duplicate pairs have
  identical GPS point sequences and identical Haversine distances, so the PAJ
  difference is not a demonstrated filtering, rounding, or outlier defect.
- Existing GPS points, stays, costs, trips, exports, and manual assignments are
  not changed automatically.

## Compatibility and required step

This is an additive code/test/documentation correction without a SQLite schema
migration. After the Stable release, install the version manually in VM104 and
perform the controlled integration reload or restart required by the local
maintenance procedure before any productive cleanup. Productive deletion is a
separate, explicitly gated operation requiring a verified backup, isolated
restore test, simulation, and the existing `delete_drive` API.

## Limitations

No PAJ road-distance correction is applied. PAJ values are not copied into the
journal. No confirmed stay is automatically deleted or rewritten.
