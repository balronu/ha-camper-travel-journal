# Lovelace-Frontend- und Cache-Standard

## Aktueller Stand

`v0.1.0-beta.1` enthält **keine** Lovelace-Karte, kein JavaScript-Bundle und
keine automatische Resource-Registrierung. Es gibt deshalb aktuell keine
Frontend-URL, die ein Browser cachen könnte. Eine Kartenfunktion wird nicht als
bereits vorhanden dargestellt.

## Verbindlicher zukünftiger Vertrag

Wenn die Karte entwickelt wird, müssen Bundle, Backend-Manifest und npm-
Metadaten dieselbe veröffentlichte Version tragen. Die Resource-URL folgt dann
diesem Muster:

```text
/camper_travel_journal/camper-travel-journal-card.js?v=<VERSION>
```

`<VERSION>` wird bei jeder Bundle-Änderung erhöht, auch zwischen stabilen
Releases. Ein Build-Check muss Manifest, `frontend/package.json`, Lockfile und
den eingebetteten/abgeleiteten Cache-Identifier vergleichen.

## Home-Assistant-Registrierung

Die spätere Integration soll ausschließlich die zu Home Assistant passende,
öffentliche Registrierung verwenden: einen statischen Pfad über
`hass.http.async_register_static_paths` und eine einmalige Lovelace-Resource-
Registrierung über den unterstützten Helper. Die Resource-URL muss
versionsgebunden sein und darf nicht durch direkte Änderungen an
`.storage/lovelace.resources` gepflegt werden.

Die genaue API-Signatur wird gegen die dann unterstützte HA-Version in einer
isolierten Fixture geprüft. Cache-Control-Header werden nur verwendet, wenn die
öffentliche HA-HTTP-Schnittstelle sie kontrollieren lässt; es werden keine
privaten HTTP-/Recorder-Interna angenommen. Die Referenzimplementierung von
Mobile Fuel Stations nutzt für das statische Bundle `cache_headers=False` und
registriert den Extra-JS-URL-Helper integrationweit genau einmal; diese
Eigenschaften sind der Prüfmaßstab, keine Änderung am Referenzprojekt.

## JavaScript-Lifecycle

- `customElements.get(name)` vor jedem `customElements.define(name, klass)`.
- Kein doppeltes `load`-Event, kein mehrfacher Timer und keine unverwalteten
  Subscriptions.
- Cleanup in `disconnectedCallback()` für alle eigenen Listener/Timer.
- Eine bereits registrierte Custom-Element-Klasse wird im laufenden Browser
  nicht ersetzt. Ein Versionswechsel wirkt zuverlässig nach einem neuen
  Resource-Load bzw. Browser-Neuladen; alte Sessions werden nicht als live
  hot-swappable versprochen.
- Tests müssen Mehrfach-Import, doppelte Karteneinfügung, fehlende Bundles,
  Cleanup und bestehende Browser-Sessions abdecken.

## Update- und Fehlerbehebung

Nach einem Update wird die neue `?v=`-URL registriert. Bei einer veralteten
Darstellung zuerst die Lovelace-Resource-Liste und die Bundle-Version prüfen,
dann die Karte neu laden und erst als letzte Maßnahme den Browser-Cache leeren.
iOS/WebKit und Windows-Browser werden in getrennten isolierten Browser-Tests
geprüft, sobald ein Bundle existiert. Ein echter HA-/Browser-Test ist im
aktuellen Beta-Tag noch nicht ausgeführt.

## CI-Anforderungen

Vor einer Frontend-Veröffentlichung sind zusätzlich zu den Python-/Hassfest-
Gates erforderlich:

1. reproduzierbarer npm-Build und Bundle-Diff-Prüfung,
2. JavaScript-Lifecycle- und Resource-Registrierungstests,
3. Versionsabgleich zwischen Manifest, npm-Lockfile und URL,
4. isolierte HA-Fixture für Registrierung ohne Duplikate,
5. Browser-Tests für Update/Reload, iOS/WebKit und Windows Chromium.

Bis diese Dateien und Tests existieren, bleiben die Punkte ausdrücklich
`nicht implementiert` und `nicht getestet`.
