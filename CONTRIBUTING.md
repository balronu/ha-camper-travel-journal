# Mitwirken

🇩🇪 Deutsch | 🇬🇧 [English](README.en.md)

Vor einem Pull Request `pytest -q` und `python -m compileall -q custom_components tests`
ausführen. Deutsche und englische Dokumentation müssen inhaltlich übereinstimmen.

Nur synthetische GPS-Daten in Tests verwenden. Niemals exakte private Koordinaten,
movement profiles, credentials, tokens, or unredacted Home Assistant logs.
Änderungen an Config Flow, Speicherung, Listener-Lifecycle, Migrationen oder
Retention benötigen gezielte Regressionstests.
