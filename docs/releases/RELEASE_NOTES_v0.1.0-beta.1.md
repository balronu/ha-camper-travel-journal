# Camper Travel Journal v0.1.0-beta.1

Early developer beta for an integration-owned GPS travel journal.

## Included

- Config and Options Flow
- Event-driven GPS collector
- Synthetic-test-covered validation and drive detection
- Separate SQLite database in the HA configuration directory
- Restart recovery and retention dry-run

## Important limitations

- This is not a stable release.
- Production Home Assistant installation and GPS recording require separate
  validation and approval.
- The database is separate from Recorder.
- MariaDB/PostgreSQL adapters are not included.
- Travel and expense management have schema foundations but no user UI.
- Do not publish exact GPS coordinates or movement profiles in issues.

## Validation

The release is valid only after the GitHub Actions Python, HA integration,
Hassfest, HACS-structure and secret-scan checks pass on the tagged commit.

## Deutsche Kurzfassung

Frühe Entwickler-Beta mit Config-/Options-Flow, ereignisbasierter GPS-
Aufzeichnung, eigener SQLite-Datenbank, Neustart-Wiederherstellung und
Retention-Dry-Run. Keine stabile Version: Reise-/Ausgabenoberflächen fehlen,
produktive GPS-Aufzeichnung und destruktive Löschungen sind nicht Bestandteil
dieser Beta.
