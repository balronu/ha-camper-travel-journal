"""Shared test configuration; HA fixtures are supplied in CI only."""

import pytest

pytest_plugins = ("pytest_homeassistant_custom_component",)


@pytest.fixture
def hass_config_dir(tmp_path):
    """Give every HA test a fresh integration database and .storage tree."""
    return str(tmp_path)

try:
    import pytest_homeassistant_custom_component  # noqa: F401
except ImportError:  # pragma: no cover - local offline environment
    pass
