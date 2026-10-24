# GPS-Stoppvorschläge

Neue bestätigte Stillstände erzeugt die laufende Erkennung automatisch als
`pending`-Vorschlag. Dieser wird nicht automatisch bestätigt und erzeugt keinen
Übernachtungsplatz.

## Historische Nachberechnung

Nach Installation kann die Nachberechnung im Ortsbereich der jeweiligen Reise
über **Vorschläge aktualisieren** gestartet werden. Sie ist bewusst
nutzergestartet und eng begrenzt:

- verwendet nur vorhandene GPS-Punkte, die der Reise und einer echten
  `stationary_timeout`-Fahrt zugeordnet sind;
- benötigt zusammenhängende, ausreichend lange stationäre Punkte;
- interpretiert GPS-Lücken nicht als Aufenthalt;
- übernimmt Fahrzeug-, Fahrt- und Reisezuordnung;
- erzeugt ausschließlich `pending`-Vorschläge;
- ist idempotent und berücksichtigt auch bereits angenommene oder verworfene
  Vorschläge.

Die historischen Fahrt- und GPS-Datensätze werden dabei nicht geändert. Für
die Fahrt `8ae1ee76-79c9-4a25-952b-f6a2d35ba979` ist nach Installation eine
Prüfung über diese Aktion möglich. Während der Entwicklung wurde kein solcher
produktiver Vorschlag angelegt.
