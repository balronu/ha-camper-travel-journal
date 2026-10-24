# Camper Travel Journal v0.3.6

## Deutsch

- Ein bestätigter `stationary_timeout` erzeugt einen einzelnen `pending`-
  GPS-Stoppvorschlag aus dem tatsächlich gemeldeten Stillstandsintervall.
- Wiederholte identische Trackerberichte, Reloads und Neustarts erzeugen keine
  mehrfachen Vorschläge. GPS-Gaps bleiben ausdrücklich von Aufenthalten getrennt.
- Die aktive Reise- und Fahrzeugzuordnung wird übernommen, wenn die Fahrt
  eindeutig automatisch zugeordnet werden konnte. Pausierte oder mehrdeutige
  Reisen bleiben unzugeordnet.
- Der Vorschlag muss weiterhin bestätigt oder abgelehnt werden. Es wird kein
  bestätigter Stopp und kein Übernachtungsplatz automatisch erstellt.
- Die read-only Diagnose zeigt letzten gültigen GPS-Bericht, Detektorstatus,
  Abschlussgrund, Gap-/Stillstandsschwellen, Verwerfungszähler sowie erzeugte
  und offene Vorschläge, ohne Koordinaten oder Routen.

## English

- A confirmed `stationary_timeout` creates one `pending` GPS stop suggestion
  from the actually reported stationary interval.
- Repeated identical tracker reports, reloads, and restarts do not create
  duplicate suggestions. GPS gaps remain explicitly separate from stays.
- The active trip and vehicle assignment is carried over when the drive was
  unambiguously assigned automatically. Paused or ambiguous trips remain
  unassigned.
- The suggestion still requires user acceptance or dismissal. No confirmed
  stop or overnight place is created automatically.
- Read-only diagnostics expose the last valid GPS report, detector state, end
  reason, gap/stationary thresholds, rejection counters, and generated/open
  suggestion counts without coordinates or routes.

## Compatibility and limitations

No destructive database migration is required. Existing drives, GPS points,
trip assignments, expenses, GPX imports, and costs are not modified. A live
timeout still requires a subsequent valid tracker report; a GPS outage alone
cannot prove a stop. Productive Home Assistant VM 104 and its database remain
unchanged by the release process.
