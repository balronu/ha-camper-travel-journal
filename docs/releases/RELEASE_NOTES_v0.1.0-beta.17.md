# Camper Travel Journal `v0.1.0-beta.17`

## GPX-Import mit expliziter Zielauswahl

- Zeigt die durch die Karte gebundene Fahrzeug-ID sichtbar im Importdialog.
- Bietet eine explizite Auswahl einer Fahrzeugreise oder „Keine Reise – freie Fahrten“.
- Verwendet eine geöffnete Reise nur als sichtbare Vorauswahl; Auswahländerungen nach der Vorschau werden berücksichtigt.
- Zeigt GPS-Punktzahl, ausgewählte Fahrtabschnitte und Kilometer vor der Bestätigung.
- Warnt bei Abweichungen zwischen GPX-Zeitraum und Reisezeitraum, ohne den Import automatisch zu blockieren.
- Übersetzt den Lückenhinweis verständlich und entfernt technische Lit-/JavaScript-Ausdrücke aus der sichtbaren Oberfläche.
- Aktualisiert Manager- und Summary-Card nach erfolgreichem Import.

## Sicherheits- und Kompatibilitätsgrenzen

- Backend-Validierungen, Duplikatschutz und atomarer Import bleiben unverändert.
- Keine produktiven GPX-Daten, Reisen, Fahrten oder Kosten sind Bestandteil dieses Releases.
- Stable `v0.1.0` bleibt ausdrücklich unveröffentlicht.
