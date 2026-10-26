# Camper Travel Journal v0.4.0-beta.4

## Deutsch

### Tankbuch und Verbrauch

- Neues aktivierbares Tankbuchmodul in der zentralen Journal Card für Diesel, AdBlue und sonstige Betriebsstoffe.
- Tankvorgänge unterstützen Voll-/Teilbetankung, Liter, Kilometerstand, Literpreis, Betrag, Tankstelle, Bemerkung sowie optionale Reise-/Kostenverknüpfungen.
- Bestehende Kraftstoffkosten bleiben unverändert; neue Tankvorgänge erzeugen keine doppelten Expense-Datensätze.
- Volltank-zu-Volltank-Verbrauch berücksichtigt Teilbetankungen. Plausible Kilometerstände haben Vorrang.
- Bestehende GPS-Fahrten können fehlende Kilometerstände nur geschätzt ergänzen; GPS-Lücken bleiben unvollständig und liefern keinen scheinbar genauen Verbrauch.
- Diesel wird als kombinierter Fahr-/Heizungsverbrauch dargestellt. Ohne belastbare Webasto-Daten ist der reine Fahrverbrauch nicht berechenbar.

### Sicherheit

- Additive Migration auf Schema 15.
- Isolierter Child-Prozessabbruch, Rollback und Wiederanlauf sind regressionsgetestet.
- Keine Migration oder Änderung produktiver Home-Assistant-Daten.

## English

### Fuel log and consumption

- New optional fuel-log module in the central Journal Card for diesel, AdBlue and other fluids.
- Fuel events support full/partial fills, liters, odometer, unit price, amount, station, note and optional trip/expense links.
- Existing fuel expenses are preserved; new tank events never create duplicate expense records.
- Full-to-full consumption includes partial fills. Plausible odometers take precedence.
- Existing GPS drives can only estimate missing odometers; GPS gaps remain incomplete and never produce a falsely precise rate.
- Diesel is shown as combined driving/heating consumption. Pure driving consumption is not calculable without reliable Webasto data.

### Safety

- Additive migration to schema 15.
- Isolated child-process abort, rollback and restart are covered by regression tests.
- No productive Home Assistant data was migrated or changed.

This is a pre-release. v0.3.13 remains the latest Stable release.
