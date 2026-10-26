# Camper Travel Journal v0.4.0-beta.7

## Deutsch

### GPS-Verbrauchsdiagnose

- Fehlende Kilometerstände lösen jetzt einen nachvollziehbaren GPS-Fallback über tatsächlich aufgezeichnete Fahrten aus.
- Fahrten werden fahrzeugbezogen und unabhängig von ihrer Reisezuordnung berücksichtigt.
- Mehrtägige Standzeiten werden nicht pauschal als GPS-Lücke gewertet.
- Fahrten an Tankintervallgrenzen werden nur mit vorhandenen zeitgestempelten GPS-Punkten anteilig berücksichtigt; unzureichende Abdeckung bleibt ausdrücklich unvollständig.
- Die Karte zeigt Streckenquelle, GPS-Abdeckung, erfasste Strecke, Zeitraum und den konkreten Grund für eine nicht zuverlässige Berechnung.
- Ein GPS-Ergebnis ist ein geschätzter kombinierter Dieselverbrauch. Der Diesel kann Fahrbetrieb und Webasto-Standheizung enthalten; ein reiner Fahrverbrauch wird ohne Heizungsdaten nicht ausgewiesen.

### Kompatibilität und Grenzen

- Schema 15 bleibt unverändert; es gibt keine Migration und keine automatische Änderung bestehender Daten.
- Tankmengen, Kostenverknüpfungen, GPS-Rohdaten, Fahrten, Aufenthalte und Reisen werden nicht verändert.
- v0.3.13 bleibt Stable. Dies ist ein GitHub-Pre-Release.
- Echte iPhone-/Safari-Abnahme mit den beiden realen Volltankungen bleibt nach Veröffentlichung erforderlich.

## English

### GPS consumption diagnosis

- Missing odometer readings now use a traceable GPS fallback based on recorded drives.
- Drives are filtered by vehicle and included independently of trip assignment.
- Multi-day stationary periods are not automatically classified as GPS gaps.
- Drives crossing an interval boundary are clipped only when existing timestamped GPS points support that calculation; insufficient coverage remains explicitly incomplete.
- The card explains the distance source, GPS coverage, recorded distance, interval and the concrete reason when a result is not reliable.
- A GPS result is estimated combined diesel consumption. Diesel may include driving and Webasto heating; pure driving consumption is not shown without heating data.

### Compatibility and limits

- Schema 15 remains unchanged; no migration or automatic existing-data rewrite is included.
- Fuel quantities, expense links, raw GPS data, drives, stays and trips are not changed.
- v0.3.13 remains Stable. This is a GitHub pre-release.
- Real iPhone/Safari acceptance with the two real full fills remains required after publication.
