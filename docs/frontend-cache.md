# Lovelace-Frontend- und Cache-Standard

## Aktueller Stand

`v0.1.0-beta.7` enthält die Phase-3-Lovelace-Karten und registriert das Bundle
über den öffentlichen HA-Mechanismus. Der historische Tag `v0.1.0-beta.1`
enthielt **keine** Lovelace-Karte.

## Bundle- und Cache-Vertrag

Wenn die Karte entwickelt wird, müssen Bundle, Backend-Manifest und npm-
Metadaten dieselbe veröffentlichte Version tragen. Die Resource-URL folgt dann
diesem Muster:

```text
/camper_travel_journal/camper-travel-journal.js?v=0.1.0-beta.7
```

`<VERSION>` wird bei jeder Bundle-Änderung erhöht, auch zwischen stabilen
Releases. Ein Build-Check muss Manifest, `frontend/package.json`, Lockfile und
den eingebetteten/abgeleiteten Cache-Identifier vergleichen.

## Home-Assistant-Registrierung

Die Integration verwendet ausschließlich die zu Home Assistant passende,
öffentliche Registrierung: einen statischen Pfad über
`hass.http.async_register_static_paths` und eine einmalige Lovelace-Resource-
Registrierung über den unterstützten Helper. Die Resource-URL muss
versionsgebunden sein und darf nicht durch direkte Änderungen an
`.storage/lovelace.resources` gepflegt werden.

Das Bundle registriert beide Kartentypen zusätzlich idempotent in
`window.customCards`. Beide Karten liefern über `getConfigElement()` einen
grafischen Editor. Dieser lädt die eingerichteten Camper über den
authentifizierten Befehl `camper_travel_journal/list_vehicles`, übernimmt
bestehende `vehicle_id`-Werte und wählt den einzigen vorhandenen Hub
automatisch vor.

Die API-Signatur wird in der HA-Fixture geprüft. Cache-Control-Header werden nur
verwendet, wenn die öffentliche HA-HTTP-Schnittstelle sie kontrollieren lässt;
es werden keine privaten HTTP-/Recorder-Interna angenommen. Die
Referenzimplementierung von
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
geprüft, sobald die CI-Browserumgebung aktiviert ist. Ein produktiver
HA-/Browser-Test wurde nicht ausgeführt.

## CI-Anforderungen

Vor einer Frontend-Veröffentlichung sind zusätzlich zu den Python-/Hassfest-
Gates erforderlich:

1. reproduzierbarer npm-Build und Bundle-Diff-Prüfung,
2. JavaScript-Lifecycle- und Resource-Registrierungstests,
3. Versionsabgleich zwischen Manifest, npm-Lockfile und URL,
4. isolierte HA-Fixture für Registrierung ohne Duplikate,
5. Browser-Tests für Update/Reload, iOS/WebKit und Windows Chromium.

Die Browser- und echte Dashboard-Verifikation bleibt für diese Beta offen;
die statische Registrierung, Versionskennung und idempotente Elementdefinition
sowie der Editor-Vertrag sind durch Code- und CI-Tests abgesichert. Eine echte
iOS-/WebKit-Prüfung wurde nicht durchgeführt.
