from pathlib import Path


ROOT = Path(__file__).parents[1]


def test_beta_does_not_claim_a_missing_lovelace_bundle():
    assert not (ROOT / "frontend").exists()
    assert not (ROOT / "custom_components" / "camper_travel_journal" / "frontend").exists()
    text = (ROOT / "docs/frontend-cache.md").read_text(encoding="utf-8")
    assert "Lovelace-Karte" in text
    assert "keine" in text
    assert "async_register_static_paths" in text
    assert "customElements.get" in text


def test_frontend_contract_is_linked_from_both_primary_readmes():
    for name in ("README.md", "README.en.md"):
        text = (ROOT / name).read_text(encoding="utf-8")
        assert "docs/frontend-cache.md" in text
