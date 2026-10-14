# Contributing

Run `pytest -q` and `python -m compileall -q custom_components tests` before a
pull request. Keep English and German documentation aligned.

Use only synthetic GPS data in tests. Never commit exact private coordinates,
movement profiles, credentials, tokens, or unredacted Home Assistant logs.
Changes affecting Config Flow, storage, listener lifecycle, migrations or
retention require focused regression tests.
