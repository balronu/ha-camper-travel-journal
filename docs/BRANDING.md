# Branding

## Assets

| Asset | Abmessungen | Verwendung |
| --- | ---: | --- |
| `assets/branding/logo.png` | 1024 × 1024 px | Projektlogo, README |
| `assets/branding/icon.png` | 256 × 256 px | Kleine Integration-/HACS-Darstellung im Repository |
| `assets/branding/social-preview.png` | 1280 × 640 px | GitHub Social Preview |
| `assets/branding/readme-banner.png` | 1280 × 640 px | Englischer README-Header |
| `assets/branding/readme-banner-de.png` | 1280 × 640 px | Deutscher README-Header |

Alle Dateien sind PNGs. Die breiten Grafiken verwenden bewusst dieselbe
Bildsprache. Der deutsche README-Banner enthält `Dein digitales
Wohnmobil-Reisetagebuch für Home Assistant`, der englische Banner
`Your digital camper travel journal for Home Assistant`.

## Quelle und Rechte

Die Grafiken wurden für dieses Projekt mit einem generativen Bildwerkzeug als
originäre Illustrationen erstellt und anschließend auf die Zielabmessungen
gebracht. Sie enthalten keine realen GPS-Daten, privaten Bewegungsprofile,
Fahrzeuglogos, Home-Assistant-Logos oder erfundenen Produkt-Screenshots.
Die Projektdateien sind unter der im Repository genannten MIT-Lizenz abgelegt;
für die Nutzung außerhalb dieses Projekts gelten zusätzlich die Bedingungen
des jeweils verwendeten Bilddienstes.

## Einbindung

Für Home Assistant 2026.3 und neuer wird das Integrationssymbol lokal unter
`custom_components/camper_travel_journal/brand/icon.png` ausgeliefert. Das ist
der unterstützte Brands-Proxy-Weg; ein zusätzlicher `icon`-Eintrag im Manifest
ist nicht erforderlich. Nach einem HACS-Update sind ein Home-Assistant-Neustart
und gegebenenfalls ein harter Browser-Refresh erforderlich.

- `README.md` referenziert `readme-banner-de.png`, `README.en.md`
  referenziert `readme-banner.png`; beide verwenden `logo.png` über relative
  Pfade.
- `social-preview.png` ist für die Einstellung der GitHub-Repository-Vorschau
  vorgesehen.
- `icon.png` ist ein lokales Projekt-Asset. Es ist **keine** Aussage über eine
  offizielle HACS-Brand-Registrierung oder eine Aufnahme in den HACS-
  Standardkatalog. Eine solche Registrierung wurde nicht beantragt.

Neue Custom-Integration-Assets werden nicht mehr als gewöhnliche PR im
offiziellen `home-assistant/brands`-Repository aufgenommen. Die lokale
Auslieferung und die HACS-Anzeige sind getrennte Pfade; ein CDN-Platzhalter in
HACS beweist daher nicht, dass das lokale Home-Assistant-Symbol fehlt.

## Qualitäts- und Datenschutzprüfung

Die PNG-Signaturen und exakten Abmessungen werden durch
`tests/test_brand_assets.py` geprüft. Die CI darf keine Datenbankdateien,
Backups, produktive Home-Assistant-Konfigurationen oder Standortexporte
enthalten. Vor einer Veröffentlichung sind Lesbarkeit und Dateigröße der
Grafiken visuell zu prüfen.
