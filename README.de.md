# Camper Travel Journal

`v0.1.0-beta.9` ist eine kontrollierte WebSocket-Fix-Entwickler-Beta für Home Assistant.
Sie enthält eine eigene SQLite-Datenbank, GPS-Fahrterkennung, Reiseverwaltung,
automatische und manuelle Fahrtzuordnung, Zwischenstopps, Reisekosten sowie
eine Summary- und Manager-Card. Die Karten werden über die automatische,
versionsgebundene Frontend-Resource registriert.

Die Installation erfolgt als Pre-Release `v0.1.0-beta.9` über HACS. Der HACS-
Pre-Release-Schalter muss für dieses Repository aktiviert sein; ein angezeigter
`main`-Commit ist kein Beta-Release. Nach dem Config-Flow kann
die Beispiel-Unterseite
[`docs/examples/dashboard-wohnmobil-reisetagebuch.yaml`](docs/examples/dashboard-wohnmobil-reisetagebuch.yaml)
in das Wohnmobil-Dashboard übernommen werden; sie wird nicht automatisch
angewendet. Für vollständige deutsche Details siehe [README.md](README.md).
Die dauerhafte Release-, HACS- und Branding-Strategie steht in
[`docs/HACS_RELEASE_STRATEGY.md`](docs/HACS_RELEASE_STRATEGY.md).

Die Beta ist noch nicht produktiv validiert. Keine Installation, kein Reload
und keine Änderung an VM 104, Proxmox, Recorder oder produktiven Dashboards
ist Bestandteil dieses Releases.

🇩🇪 Deutsch | 🇬🇧 [English](README.en.md)
