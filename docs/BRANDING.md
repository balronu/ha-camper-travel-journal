# Branding

## Assets

| Asset | Abmessungen | Verwendung |
| --- | ---: | --- |
| `assets/branding/logo.png` | 1024 × 1024 px | Projektlogo, README |
| `assets/branding/icon.png` | 256 × 256 px | Kleine Integration-/HACS-Darstellung im Repository |
| `assets/branding/social-preview.png` | 1280 × 640 px | GitHub Social Preview |
| `assets/branding/readme-banner.png` | 1280 × 640 px | README-Header in Englisch und Deutsch |

Alle Dateien sind PNGs. Die beiden breiten Grafiken verwenden bewusst dieselbe
Bildsprache; der README-Banner enthält den englischen Projekttitel und den
Untertitel `Your digital camper travel journal for Home Assistant`.

## Quelle und Rechte

Die Grafiken wurden für dieses Projekt mit einem generativen Bildwerkzeug als
originäre Illustrationen erstellt und anschließend auf die Zielabmessungen
gebracht. Sie enthalten keine realen GPS-Daten, privaten Bewegungsprofile,
Fahrzeuglogos, Home-Assistant-Logos oder erfundenen Produkt-Screenshots.
Die Projektdateien sind unter der im Repository genannten MIT-Lizenz abgelegt;
für die Nutzung außerhalb dieses Projekts gelten zusätzlich die Bedingungen
des jeweils verwendeten Bilddienstes.

## Einbindung

- Beide READMEs referenzieren `readme-banner.png` und `logo.png` über relative
  Pfade.
- `social-preview.png` ist für die Einstellung der GitHub-Repository-Vorschau
  vorgesehen.
- `icon.png` ist ein lokales Projekt-Asset. Es ist **keine** Aussage über eine
  offizielle HACS-Brand-Registrierung oder eine Aufnahme in den HACS-
  Standardkatalog. Eine solche Registrierung wurde nicht beantragt.

## Qualitäts- und Datenschutzprüfung

Die PNG-Signaturen und exakten Abmessungen werden durch
`tests/test_brand_assets.py` geprüft. Die CI darf keine Datenbankdateien,
Backups, produktive Home-Assistant-Konfigurationen oder Standortexporte
enthalten. Vor einer Veröffentlichung sind Lesbarkeit und Dateigröße der
Grafiken visuell zu prüfen.
