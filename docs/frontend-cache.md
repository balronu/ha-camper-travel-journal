# Lovelace-Frontend- und Cache-Standard

Der Stable-Stand enthält die Bereinigung aller seit Beta 2 bekannten historischen
Camper-Bundle-URLs, bevor die aktuelle URL registriert wird. Diese Bereinigung
wird bei jedem Domain- und Entry-Setup idempotent ausgeführt; dadurch bleiben
nach wiederholten HACS-Updates nicht mehrere Beta-Module als Extra-Module
aktiv. Die versionierte URL bleibt für Browser-Cache-Busting erhalten.

## Aktueller Stand

Der veröffentlichte Stand `v0.1.0` enthält die Phase-3-Lovelace-Karten
und die GPX-Importvorschau,
die optionale read-only-Diagnosekarte und registriert das Bundle
über den öffentlichen HA-Mechanismus. Der vorherige historische Stand
`v0.1.0-beta.18` bleibt als Release-Dokument erhalten; der noch ältere Tag
`v0.1.0-beta.1`
enthielt **keine** Lovelace-Karte.

## Bundle- und Cache-Vertrag

Wenn die Karte entwickelt wird, müssen Bundle, Backend-Manifest und npm-
Metadaten dieselbe vorbereitete bzw. veröffentlichte Version tragen. Die
Resource-URL folgt dann
diesem Muster:

```text
/camper_travel_journal/camper-travel-journal.js?v=0.1.0
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

Die Browser- und echte Dashboard-Verifikation außerhalb der geprüften
Chromium-Harnesses bleibt für den Stable-Stand umgebungsabhängig;
die statische Registrierung, Versionskennung und idempotente Elementdefinition
sowie der Editor-Vertrag sind durch Code- und CI-Tests abgesichert. Der
Release-Build muss zusätzlich bytegenau dem eingecheckten Bundle entsprechen;
ein abweichendes Bundle lässt CI fehlschlagen. Eine echte iOS-/WebKit-Prüfung
wurde nicht durchgeführt.

## Datumsdarstellung

ISO-Kalenderdaten (`YYYY-MM-DD`) werden in der deutschen Oberfläche als
`TT.MM.JJJJ` und in der englischen Oberfläche als `MM/DD/YYYY` angezeigt.
Die Werte bleiben für API und SQLite unverändert im ISO-Format. Die
Formatierung zerlegt reine Kalenderdaten direkt und verwendet dafür kein
`new Date("YYYY-MM-DD")`; dadurch entsteht keine Verschiebung auf den
Vortag durch UTC-/Zeitzoneninterpretation. Zeitstempel von Fahrten werden
weiterhin als echte Zeitstempel in der lokalen HA-Zeitzone formatiert.

`<input type="date">` muss seinen Wert ebenfalls als `YYYY-MM-DD` erhalten.
Die sichtbare Eingabemaske wird vom Browser/OS lokalisiert und kann von einer
Web-Komponente nicht zuverlässig auf `TT.MM.JJJJ` festgelegt werden. Die
deutsche Darstellung ist daher für Beschriftungen, Listen, Zusammenfassungen
und Zeitstempel garantiert; bei nativen Datumseingaben entscheidet der
Browser über das sichtbare Muster. Die gespeicherte Eingabe bleibt ISO.
