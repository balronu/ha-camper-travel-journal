"""Home Assistant Config and Options flows for Camper Travel Journal."""

from __future__ import annotations

from typing import Any

from .const import (
    CONF_MAX_GAP, CONF_MAX_SPEED, CONF_MIN_INTERVAL, CONF_MIN_MOVEMENT,
    CONF_RECORDING_ENABLED, CONF_RETENTION_DAYS, CONF_STOP_AFTER,
    CONF_TRACKER_ENTITY, CONF_VEHICLE_NAME, DEFAULT_MAX_GAP_MINUTES,
    DEFAULT_MAX_SPEED_KMH, DEFAULT_MIN_INTERVAL_SECONDS, DEFAULT_MIN_MOVEMENT_M,
    DEFAULT_RECORDING_ENABLED, DEFAULT_STOP_AFTER_MINUTES,
    DEFAULT_UNASSIGNED_RETENTION, MAX_INTERVAL_SECONDS, MAX_MOVEMENT_METERS,
    MAX_RETENTION_DAYS, MIN_INTERVAL_SECONDS, MIN_MOVEMENT_METERS,
    MIN_RETENTION_DAYS,
    CONF_CARTO_API_KEY, CONF_MAP_PROVIDER,
    CONF_REMOVE_CARTO_API_KEY, MAP_PROVIDER_CARTO, MAP_PROVIDER_NONE,
)

try:  # Imported by Home Assistant; pure helpers remain testable offline.
    from homeassistant import config_entries
    from homeassistant.const import CONF_NAME
    from homeassistant.core import callback
    from homeassistant.helpers import selector
    from homeassistant.exceptions import HomeAssistantError
except ImportError:  # pragma: no cover - exercised only outside HA
    config_entries = None  # type: ignore[assignment]
    CONF_NAME = "name"
    callback = lambda func: func
    selector = None  # type: ignore[assignment]
    class HomeAssistantError(Exception):
        pass

DOMAIN = "camper_travel_journal"


def defaults(source: dict[str, Any] | None = None) -> dict[str, Any]:
    """Normalize stored options without changing their internal keys."""
    source = source or {}
    return {
        CONF_VEHICLE_NAME: source.get(CONF_VEHICLE_NAME, source.get(CONF_NAME, "Wohnmobil")),
        CONF_TRACKER_ENTITY: source.get(CONF_TRACKER_ENTITY, ""),
        CONF_RECORDING_ENABLED: bool(source.get(CONF_RECORDING_ENABLED, DEFAULT_RECORDING_ENABLED)),
        CONF_MIN_INTERVAL: int(source.get(CONF_MIN_INTERVAL, DEFAULT_MIN_INTERVAL_SECONDS)),
        CONF_MIN_MOVEMENT: float(source.get(CONF_MIN_MOVEMENT, DEFAULT_MIN_MOVEMENT_M)),
        CONF_RETENTION_DAYS: int(source.get(CONF_RETENTION_DAYS, int(DEFAULT_UNASSIGNED_RETENTION.days))),
        CONF_STOP_AFTER: int(source.get(CONF_STOP_AFTER, DEFAULT_STOP_AFTER_MINUTES)),
        CONF_MAX_GAP: int(source.get(CONF_MAX_GAP, DEFAULT_MAX_GAP_MINUTES)),
        CONF_MAX_SPEED: float(source.get(CONF_MAX_SPEED, DEFAULT_MAX_SPEED_KMH)),
        CONF_MAP_PROVIDER: source.get(CONF_MAP_PROVIDER, MAP_PROVIDER_NONE),
    }


def normalize_options(current: dict[str, Any], submitted: dict[str, Any]) -> dict[str, Any]:
    """Merge options while keeping an existing secret out of the form value."""
    result = {**defaults(current), **submitted}
    result[CONF_MAP_PROVIDER] = submitted.get(CONF_MAP_PROVIDER, MAP_PROVIDER_NONE)
    new_key = str(submitted.get(CONF_CARTO_API_KEY, "") or "").strip()
    if submitted.get(CONF_REMOVE_CARTO_API_KEY):
        result.pop(CONF_CARTO_API_KEY, None)
    elif new_key:
        result[CONF_CARTO_API_KEY] = new_key
    elif current.get(CONF_CARTO_API_KEY):
        result[CONF_CARTO_API_KEY] = current[CONF_CARTO_API_KEY]
    result.pop(CONF_REMOVE_CARTO_API_KEY, None)
    return result


def validate_submission(hass: Any, data: dict[str, Any]) -> dict[str, str]:
    """Validate the selected tracker using only the HA state registry."""
    errors: dict[str, str] = {}
    entity_id = data.get(CONF_TRACKER_ENTITY, "")
    state = hass.states.get(entity_id) if entity_id else None
    if not entity_id:
        errors[CONF_TRACKER_ENTITY] = "tracker_required"
    elif state is None:
        errors[CONF_TRACKER_ENTITY] = "tracker_not_found"
    elif state.domain != "device_tracker":
        errors[CONF_TRACKER_ENTITY] = "tracker_wrong_domain"
    elif not isinstance(state.attributes.get("latitude"), (int, float)) or not isinstance(state.attributes.get("longitude"), (int, float)):
        errors[CONF_TRACKER_ENTITY] = "tracker_no_coordinates"
    return errors


def _schema(value: dict[str, Any] | None = None) -> dict[str, Any]:
    current = defaults(value)
    return {
        vol.Required(CONF_VEHICLE_NAME, default=current[CONF_VEHICLE_NAME]): str,
        vol.Required(CONF_TRACKER_ENTITY, default=current[CONF_TRACKER_ENTITY]): selector.EntitySelector(
            selector.EntitySelectorConfig(domain="device_tracker")
        ),
        vol.Required(CONF_RECORDING_ENABLED, default=current[CONF_RECORDING_ENABLED]): bool,
        vol.Required(CONF_MIN_INTERVAL, default=current[CONF_MIN_INTERVAL]): selector.NumberSelector(
            selector.NumberSelectorConfig(min=MIN_INTERVAL_SECONDS, max=MAX_INTERVAL_SECONDS, step=1, mode=selector.NumberSelectorMode.BOX)
        ),
        vol.Required(CONF_MIN_MOVEMENT, default=current[CONF_MIN_MOVEMENT]): selector.NumberSelector(
            selector.NumberSelectorConfig(min=MIN_MOVEMENT_METERS, max=MAX_MOVEMENT_METERS, step=1, mode=selector.NumberSelectorMode.BOX)
        ),
        vol.Required(CONF_RETENTION_DAYS, default=current[CONF_RETENTION_DAYS]): selector.NumberSelector(
            selector.NumberSelectorConfig(min=MIN_RETENTION_DAYS, max=MAX_RETENTION_DAYS, step=1, mode=selector.NumberSelectorMode.BOX)
        ),
        vol.Required(CONF_STOP_AFTER, default=current[CONF_STOP_AFTER]): selector.NumberSelector(
            selector.NumberSelectorConfig(min=1, max=1440, step=1, mode=selector.NumberSelectorMode.BOX)
        ),
        vol.Required(CONF_MAX_GAP, default=current[CONF_MAX_GAP]): selector.NumberSelector(
            selector.NumberSelectorConfig(min=1, max=1440, step=1, mode=selector.NumberSelectorMode.BOX)
        ),
        vol.Required(CONF_MAX_SPEED, default=current[CONF_MAX_SPEED]): selector.NumberSelector(
            selector.NumberSelectorConfig(min=20, max=400, step=1, mode=selector.NumberSelectorMode.BOX)
        ),
        vol.Required(CONF_MAP_PROVIDER, default=current[CONF_MAP_PROVIDER]): selector.SelectSelector(
            selector.SelectSelectorConfig(options=[MAP_PROVIDER_NONE, MAP_PROVIDER_CARTO], mode=selector.SelectSelectorMode.DROPDOWN)
        ),
        vol.Optional(CONF_CARTO_API_KEY, default=""): selector.TextSelector(
            selector.TextSelectorConfig(type=selector.TextSelectorType.PASSWORD)
        ),
        vol.Optional(CONF_REMOVE_CARTO_API_KEY, default=False): bool,
    }


if config_entries is not None:
    import voluptuous as vol

    class CamperTravelJournalConfigFlow(config_entries.ConfigFlow, domain=DOMAIN):
        """Create one independently configurable vehicle entry."""

        VERSION = 1

        async def async_step_user(self, user_input: dict[str, Any] | None = None):
            errors: dict[str, str] = {}
            if user_input is not None:
                errors = validate_submission(self.hass, user_input)
                if not errors:
                    await self.async_set_unique_id(user_input[CONF_TRACKER_ENTITY])
                    self._abort_if_unique_id_configured()
                    return self.async_create_entry(title=user_input[CONF_VEHICLE_NAME], data=normalize_options({}, user_input))
            return self.async_show_form(step_id="user", data_schema=vol.Schema(_schema()), errors=errors)

        @staticmethod
        @callback
        def async_get_options_flow(config_entry):
            return CamperTravelJournalOptionsFlow()

    class CamperTravelJournalOptionsFlow(config_entries.OptionsFlow):
        """Edit all runtime settings without reinstalling the entry."""

        async def async_step_init(self, user_input: dict[str, Any] | None = None):
            errors: dict[str, str] = {}
            if user_input is not None:
                errors = validate_submission(self.hass, user_input)
                if not errors:
                    current = {**self.config_entry.data, **self.config_entry.options}
                    return self.async_create_entry(title="", data=normalize_options(current, user_input))
            return self.async_show_form(step_id="init", data_schema=vol.Schema(_schema({**self.config_entry.data, **self.config_entry.options})), errors=errors)

else:
    CamperTravelJournalConfigFlow = None
    CamperTravelJournalOptionsFlow = None
