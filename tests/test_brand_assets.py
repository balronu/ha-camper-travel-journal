from pathlib import Path
import struct


ROOT = Path(__file__).parents[1]


def png_size(path: Path) -> tuple[int, int]:
    data = path.read_bytes()
    assert data[:8] == b"\x89PNG\r\n\x1a\n"
    assert data[12:16] == b"IHDR"
    return struct.unpack(">II", data[16:24])


def test_branding_assets_have_required_dimensions_and_no_coordinates():
    expected = {
        "logo.png": (1024, 1024),
        "icon.png": (256, 256),
        "social-preview.png": (1280, 640),
        "readme-banner.png": (1280, 640),
        "readme-banner-de.png": (1280, 640),
    }
    asset_dir = ROOT / "assets" / "branding"
    for name, size in expected.items():
        path = asset_dir / name
        assert path.is_file()
        assert png_size(path) == size
        assert b"45.6261" not in path.read_bytes()


def test_readmes_reference_relative_branding_assets():
    for name in ("README.md", "README.en.md"):
        text = (ROOT / name).read_text(encoding="utf-8")
        assert "assets/branding/readme-banner" in text
        assert "assets/branding/logo.png" in text
        assert "Deutsch" in text or "German" in text


def test_local_integration_brand_icon_has_home_assistant_dimensions():
    icon = ROOT / "custom_components" / "camper_travel_journal" / "brand" / "icon.png"
    assert icon.is_file()
    assert png_size(icon) == (256, 256)
