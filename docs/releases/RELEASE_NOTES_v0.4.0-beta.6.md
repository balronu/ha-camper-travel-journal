# Camper Travel Journal v0.4.0-beta.6

## Deutsch

### Neue Funktion

- Vorhandene Kraftstoffausgaben können über **„Aus Kosten übernehmen“** im Tankbuch ausgewählt werden.
- Datum/Zeit, Liter, Literpreis, Betrag, Kilometerstand und Bemerkung werden in eine bearbeitbare Vorschau übernommen.
- Die Vorschau erzeugt erst nach ausdrücklichem Speichern einen Tankvorgang.
- Bereits übernommene Ausgaben bleiben sichtbar, sind aber nicht erneut auswählbar.
- Kosten und Tankvorgang werden dauerhaft 1:1 verknüpft; es entstehen keine doppelten Ausgaben.
- Verknüpfungen können nach Bestätigung gelöst werden. Das Löschen einer verknüpften Ausgabe wird bis dahin verhindert.

### Kompatibilität und Grenzen

- Schema 15 reicht aus; es gibt keine neue Migration und keine Änderung bestehender Daten.
- GPS-basierte Verbrauchsberechnung, Diesel-/AdBlue-Trennung und Webasto-Hinweise bleiben unverändert.
- Mobile Fuel Stations wird in Beta.6 nicht angebunden; das Tankstellenfeld bleibt freie optionale Texteingabe.
- v0.3.13 bleibt Stable. Dies ist ein GitHub-Pre-Release.
- Die tatsächliche Übernahme der genannten Ausgaben in VM104 muss später manuell erfolgen; Beta.6 verändert keine produktive Datenbank.
- Echte iPhone-/Safari-Abnahme ist nach Veröffentlichung noch erforderlich.

## English

### New feature

- Existing fuel expenses can be selected through **“Import from expenses”** in the fuel log.
- Date/time, liters, price per liter, amount, odometer and note are copied into an editable preview.
- The preview creates a tank event only after explicit save.
- Already imported expenses remain visible but cannot be selected again.
- Expense and tank event are persistently linked one-to-one; no duplicate expense is created.
- Links can be removed after confirmation. Deletion of a linked expense is blocked until then.

### Compatibility and limits

- Schema 15 is sufficient; no new migration and no existing-data rewrite are included.
- GPS-based consumption, diesel/AdBlue separation and Webasto notices remain unchanged.
- Mobile Fuel Stations is not integrated in Beta.6; the station field remains optional free text.
- v0.3.13 remains Stable. This is a GitHub pre-release.
- Importing the named real expenses into VM104 must be done manually later; Beta.6 does not change the productive database.
- Real iPhone/Safari acceptance is still required after publication.
