# Camper Travel Journal v0.3.4

## Deutsch

- Kosten unterstützen jetzt eine optionale mehrzeilige Bemerkung für alle Kategorien.
- Das vorhandene nullable Feld `expenses.note` wird wiederverwendet; es ist keine Datenbankmigration erforderlich.
- Bemerkungen können beim Anlegen und Bearbeiten gespeichert, geändert und vollständig entfernt werden.
- Zeilenumbrüche, Unicode und deutsche Sonderzeichen bleiben erhalten; die Eingabe ist auf 2.000 Zeichen begrenzt.
- Die zentrale Journal Card und der deutsche PDF-Reisebericht zeigen Bemerkungen sicher als Text mit Zeilenumbruch an.
- Kraftstoffdetails, Beträge, Summen und bestehende Datensätze bleiben unverändert.

## English

- Expenses now support an optional multiline note for every category.
- The existing nullable `expenses.note` field is reused; no database migration is required.
- Notes can be stored, edited, and fully cleared when creating or editing an expense.
- Newlines, Unicode, and German special characters are preserved; input is limited to 2,000 characters.
- The central Journal Card and English PDF travel report render notes safely as text with wrapping.
- Fuel details, amounts, totals, and existing records remain unchanged.

## Compatibility and limitations

Existing expenses without notes remain valid and editable. Note content is never
interpreted as HTML. No productive Home Assistant installation or database was
modified by this release process.
