# Camper Travel Journal v0.4.1 Stable

## Deutsch

- Die zentrale Journal Card zeigt ohne geöffnete Reise nur noch „Reisetagebuch“, die kompakte Reiseauswahl sowie die Aktionen „Reise öffnen“ und „Neue Reise“.
- Das große Wohnmobil-Emoji, die Begrüßungsüberschrift, der Erklärungstext und unnötige Leerflächen wurden entfernt.
- Es gibt keine Auf-/Zuklappfunktion für die Reiseauswahl. Das Auswahlfeld ist direkt sichtbar und die Touch-Flächen sind mindestens 44 px groß.
- Die Darstellung ist für 320, 375, 390, 430, 768 und 1280 px getestet. Geöffnete Reisen, Module, Reisewechsel, Reiseerstellung und bestehende YAML-Konfigurationen bleiben unverändert.
- SQLite-Schema 15, Backend-APIs, GPS, Fahrten, Aufenthalte, Kosten, Tankbuch, Verbrauchsberechnung und Exporte wurden nicht geändert.

### Installation und Kompatibilität

Installiere v0.4.1 über HACS und starte Home Assistant anschließend manuell neu. Bestehende Config Entries, Daten und YAML-Konfigurationen bleiben kompatibel. Die Abnahme erfolgte mit Chromium; eine separate iPhone-/Safari-Abnahme ist nicht Bestandteil dieses Laufs.

## English

- The central Journal Card now shows only “Reisetagebuch”, the compact trip selector, and the “Reise öffnen” and “Neue Reise” actions when no trip is open.
- The large camper emoji, welcome heading, explanatory text, and unnecessary empty space were removed.
- There is no expand/collapse interaction for trip selection. The selector is always visible and touch targets are at least 44 px high.
- The layout was tested at 320, 375, 390, 430, 768, and 1280 px. Open-trip modules, trip switching, trip creation, and existing YAML configuration remain unchanged.
- SQLite schema 15, backend APIs, GPS, drives, stays, expenses, fuel log, consumption calculation, and exports were not changed.

### Installation and compatibility

Install v0.4.1 through HACS and restart Home Assistant manually afterward. Existing config entries, data, and YAML configurations remain compatible. Validation used Chromium; a separate iPhone/Safari acceptance test is not included in this run.
