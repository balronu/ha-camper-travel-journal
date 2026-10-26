# Camper Travel Journal v0.4.0-beta.2

## Deutsch

### UX-Hotfix

- Der modulare Karteneditor zeigt für jedes Modul die Position („n von m“).
- Nach dem Verschieben wird das Modul kurz hervorgehoben; Fokus und Scrollposition bleiben am betroffenen Element.
- Deaktivierte Module behalten ihre Position. Nach Speichern, Reload und erneuter Aktivierung erscheinen sie wieder an derselben Stelle.
- Erste und letzte Position deaktivieren die jeweils nicht möglichen Pfeilaktionen korrekt.
- Das geplante Tankbuch ist in dieser Beta nicht aktivierbar und führt keine Tankdatenbank- oder Providerabfragen aus.

### Kompatibilität und Grenzen

- Bestehende YAML-Karten ohne Moduldefinition bleiben unverändert nutzbar.
- Die additive Frontend-Konfiguration `module_order` enthält keine Nutzdaten und benötigt keine SQLite-Migration.
- GPS-Erkennung, Fahrten, Aufenthalte, Kosten, GPX-/PDF-Export und produktive Home-Assistant-Daten bleiben unverändert.
- Diese Version ist ein GitHub-Pre-Release; v0.3.13 bleibt Stable.
- Ein echter iPhone-/Safari-Praxistest nach diesem Hotfix steht noch aus.

## English

### UX hotfix

- The modular card editor shows each module position (“n of m”).
- The moved module is briefly highlighted; focus and scrolling stay with the affected element.
- Disabled modules retain their position and return to it after save, reload and re-enabling.
- The first and last positions correctly disable the unavailable arrow actions.
- The planned fuel log cannot be activated in this beta and performs no fuel-database or provider requests.

### Compatibility and limitations

- Existing YAML cards without a module definition remain compatible.
- The additive frontend `module_order` setting contains no journal data and requires no SQLite migration.
- GPS detection, drives, stays, expenses, GPX/PDF export and productive Home Assistant data remain unchanged.
- This is a GitHub pre-release; v0.3.13 remains Stable.
- A real iPhone/Safari practical test after this hotfix is still pending.
