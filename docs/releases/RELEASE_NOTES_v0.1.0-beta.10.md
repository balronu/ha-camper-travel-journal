# Camper Travel Journal v0.1.0-beta.10

## Kostenverwaltung vollständig korrigiert

- Kostenkategorien werden beim Anlegen, Anzeigen und Bearbeiten konsistent
  übertragen und validiert, einschließlich Stellplatz/Campingplatz.
- Die Reise-Gesamtkosten werden pro Reise aus gültigen Cent-Beträgen berechnet
  und nach Anlegen, Bearbeiten, Löschen und Reload korrekt angezeigt.
- Kostenbearbeitung erfolgt über ein responsives Inline-Formular statt über
  native Browser-Prompts; Kategorie und Betrag können gemeinsam oder getrennt
  geändert werden.
- Fehler bleiben sichtbar und verständlich; ungültige Kategorien, Beträge,
  Währungen und fehlende Datensätze werden nicht stillschweigend umgewandelt.
- Bestehende Reisen und Kosten bleiben unverändert; es gibt keine
  Datenbankmigration und keine automatische Umkategorisierung.
- Die Beta-9-WebSocket-Registrierung und die bestehende Diagnosekarte bleiben
  durch Regressionstests geschützt.

Die separaten iOS-WebSocket-Meldungen zu `non-zero reserved bits` wurden nicht
verändert und bleiben außerhalb dieses Releases.
