from pathlib import Path


ROOT = Path(__file__).parents[1]


def test_beta_contains_the_versioned_lovelace_bundle():
    assert (ROOT / "frontend").exists()
    assert (ROOT / "custom_components" / "camper_travel_journal" / "frontend" / "camper-travel-journal.js").exists()
    text = (ROOT / "docs/frontend-cache.md").read_text(encoding="utf-8")
    assert "Lovelace-Karte" in text
    assert "async_register_static_paths" in text
    assert "customElements.get" in text
    assert "0.1.0-beta.3" in text


def test_frontend_contract_is_linked_from_both_primary_readmes():
    for name in ("README.md", "README.en.md"):
        text = (ROOT / name).read_text(encoding="utf-8")
        assert "docs/frontend-cache.md" in text
