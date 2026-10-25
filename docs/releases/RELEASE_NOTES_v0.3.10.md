# Camper Travel Journal v0.3.10

## Deutsch

### Behoben

- Fahrten können aus der zentralen Journal Card nach einer Bestätigung sicher gelöscht werden.
- Bekannte Fahrtbeziehungen werden kontrolliert getrennt; GPS-Rohpunkte, Kosten, Aufenthalte und Reisen bleiben erhalten.
- Eine additive Schema-14-Migration speichert dauerhafte Ausschlüsse, damit eine manuell gelöschte GPS-Fahrt bei Reload, Neustart oder historischer Wiederverarbeitung nicht wieder erscheint.
- Ausschlüsse greifen nur für dieselbe Punktfolge beziehungsweise dasselbe Intervall; neue Punktfolgen bleiben erkennbar.
- Null-Minuten-Stoppvorschläge werden ignoriert und nicht bestätigt. Laufende Vorschläge behalten `departed_at = NULL`.

### Migration und Einschränkungen

- Die Migration ist additiv und löscht keine bestehenden Daten.
- Produktive Löschung, Backup und Wiederherstellung wurden nicht auf VM104 ausgeführt; dafür ist ein separater, authentifizierter Freigabeschritt erforderlich.

## English

### Fixed

- Drives can be deleted from the central Journal Card after an explicit confirmation.
- Known drive relationships are detached in a controlled way; raw GPS points, costs, stays, and trips remain intact.
- Additive schema-14 migration stores durable exclusions so a manually deleted GPS drive does not return after reload, restart, or historical replay.
- Exclusions match the same point sequence or interval only; new point sequences remain detectable.
- Zero-duration stop suggestions are ignored and cannot be accepted. Ongoing suggestions retain `departed_at = NULL`.

### Migration and limitations

- The migration is additive and does not delete existing data.
- No productive deletion, backup, or restore was performed on VM104; a separate authenticated approval step is required.
