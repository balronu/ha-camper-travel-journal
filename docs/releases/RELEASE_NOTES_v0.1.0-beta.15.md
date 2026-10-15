# Camper Travel Journal `v0.1.0-beta.15`

## GPX-Import historischer Wohnmobilfahrten

Die Manager-Karte analysiert PAJ-GPX-1.1-Dateien und zeigt Zeit, Entfernung,
Dauer, Lücken, Sprünge und Duplikatkonflikte. Erst die ausdrückliche
Bestätigung schreibt Daten. DTDs/externe Entitäten, übergroße Dateien und zu
viele Punkte werden abgewiesen. Der Import ist transaktional und idempotent;
bestehende Reisen, Kosten und Reisestatus bleiben unverändert.

Die Entfernung ist eine GPS-Punktstrecke, keine berechnete Straßenroute.
Die automatische Fahrtenerkennung ist eine überprüfbare Vorschlagslogik.
Koordinaten werden nicht in Git, CI-Artefakte oder öffentliche Testdaten
übernommen. Die reale PAJ-Testdatei ist in diesem Entwicklungsstand nicht im
Repository enthalten.

## Abnahme und Grenzen

Der Real-GPX-Abnahmetest verarbeitete 903 GPS-Punkte aus einem Track und einem
Tracksegment und erkannte drei konservative Fahrtabschnitte. Der isolierte
SQLite-Import blieb nach dem erneuten Öffnen erhalten; identische und
überlappende Folgeimporte wurden abgewiesen. Die PAJ-Gesamtstrecke kann wegen
unterschiedlicher Punktfilterung und Berechnungsmethoden geringfügig von der
GPS-Punktstrecke abweichen. Keine produktive Home-Assistant-Installation,
VM 104 oder produktive Datenbank wurde verändert.
