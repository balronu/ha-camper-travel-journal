# Camper Travel Journal `v0.1.0-beta.18`

## Summary Card: Reiseauswahl

- Aktive Reisen werden standardmäßig vor geplanten Reisen angezeigt.
- Bei mehreren aktiven Reisen ist die Auswahl nach `started_at` und ID
  deterministisch.
- Ohne aktive Reise wird die zuletzt relevante Reise nach derselben Regel
  angezeigt.
- Eine kompakte Auswahl erlaubt geplante, aktive, pausierte und abgeschlossene
  Reisen des konfigurierten Fahrzeugs.
- Die manuelle Auswahl bleibt bei Datenaktualisierungen erhalten und fällt bei
  einer entfernten Reise auf die Standardregel zurück.
- Kennzahlen, Kosten, Fahrten und statusabhängige Aktionen beziehen sich auf
  die ausgewählte Reise.

## Sicherheit und Kompatibilität

- GPX-Import, Duplikatschutz, atomare Backend-Validierung und bestehende
  Fahrzeug-/Reisedaten bleiben unverändert.
- Historische Camper-Extra-JS-URLs werden beim Setup bis Beta 17 bereinigt;
  registriert wird ausschließlich die Beta-18-URL.
- Kein Stable-Release; diese Version ist eine Pre-Release.

## Validierung

- Python-/Home-Assistant-Tests, Frontend-Vitest, reproduzierbarer Bundle-Build,
  Chromium-DOM-Regressionsprüfungen, Hassfest, HACS-Struktur und Secret-Scan
  erfolgreich.
