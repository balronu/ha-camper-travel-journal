# Änderungsprotokoll

🇩🇪 Deutsch | 🇬🇧 [English](README.en.md)

## 0.1.0-beta.1 – Frühe Entwickler-Beta

- Config Flow und Options Flow für mehrere Fahrzeuge hinzugefügt.
- Ereignisbasierte GPS-Aufzeichnung mit Validierung, Duplikatfilter,
  adaptiver Speicherung, Lückenschutz und konservativer Fahrterkennung.
- Eigene SQLite-Speicherung mit Schema-Versionierung, asynchronem Worker und
  begrenzter Neustart-Wiederherstellung.
- Retention-Dry-Run ohne destruktive Löschung.
- Lokale Tests sowie CI-, Hassfest-, HACS-Struktur- und Secret-Scan-Workflows.
- Diese Beta wurde noch nicht in einer produktiven Home-Assistant-Instanz
  getestet und ist nicht produktionsreif.
