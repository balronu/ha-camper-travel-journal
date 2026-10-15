from pathlib import Path


ROOT = Path(__file__).parents[1]


def test_beta_contains_the_versioned_lovelace_bundle():
    assert (ROOT / "frontend").exists()
    assert (ROOT / "custom_components" / "camper_travel_journal" / "frontend" / "camper-travel-journal.js").exists()
    text = (ROOT / "docs/frontend-cache.md").read_text(encoding="utf-8")
    assert "Lovelace-Karte" in text
    assert "async_register_static_paths" in text
    assert "customElements.get" in text
    assert "0.1.0-beta.13" in text
    api = (ROOT / "custom_components" / "camper_travel_journal" / "api.py").read_text(encoding="utf-8")
    assert "camper_travel_journal/list_vehicles" in api
    assert "ws_list_vehicles" in api
    for command in (
        "list", "create_trip", "update_trip", "delete_trip", "transition_trip",
        "link_drives", "unlink_drive", "create_manual_drive", "update_manual_drive", "delete_manual_drive", "create_stop", "update_stop", "delete_stop",
        "create_expense", "update_expense", "delete_expense",
    ):
        assert f'camper_travel_journal/{command}' in api


def test_frontend_contract_is_linked_from_both_primary_readmes():
    for name in ("README.md", "README.en.md"):
        text = (ROOT / name).read_text(encoding="utf-8")
        assert "docs/frontend-cache.md" in text


def test_release_version_is_aligned_across_project_and_readmes():
    assert 'version = "0.1.0-beta.13"' in (ROOT / "pyproject.toml").read_text(encoding="utf-8")
    for name in ("README.md", "README.de.md", "README.en.md"):
        assert "0.1.0-beta.12" in (ROOT / name).read_text(encoding="utf-8")


def test_local_home_assistant_brand_asset_is_present():
    icon = ROOT / "custom_components" / "camper_travel_journal" / "brand" / "icon.png"
    assert icon.is_file()
    assert icon.read_bytes()[:8] == b"\x89PNG\r\n\x1a\n"
