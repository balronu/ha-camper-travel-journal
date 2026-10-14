from pathlib import Path


ROOT = Path(__file__).parents[1]


def test_german_is_primary_and_english_is_explicitly_available():
    german = (ROOT / "README.md").read_text(encoding="utf-8")
    english = (ROOT / "README.en.md").read_text(encoding="utf-8")
    assert "🇩🇪 Deutsch" in german
    assert "README.en.md" in german
    assert "🇬🇧 English" in english
    assert "README.md" in english
    assert "Dein digitales Wohnmobil-Reisetagebuch" in german
    assert "Your digital camper travel journal" in english


def test_primary_documents_are_german_and_links_are_relative():
    for name in ("CHANGELOG.md", "CONTRIBUTING.md", "SECURITY.md"):
        text = (ROOT / name).read_text(encoding="utf-8")
        assert "README.en.md" in text
    assert "README.en.md" in (ROOT / "README.de.md").read_text(encoding="utf-8")
    assert "README.en.md" in (ROOT / "docs/releases/RELEASE_NOTES_v0.1.0-beta.1.md").read_text(encoding="utf-8")
