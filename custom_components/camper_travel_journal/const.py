"""Constants for the Camper Travel Journal domain."""

from datetime import timedelta

DOMAIN = "camper_travel_journal"
FRONTEND_VERSION = "0.1.0-beta.13"
FRONTEND_URL = f"/{DOMAIN}/camper-travel-journal.js?v={FRONTEND_VERSION}"
# HA keeps extra module URLs in memory until they are explicitly removed.  A
# HACS update/reload can therefore leave the previous beta bundle registered
# next to the new one.  Remove the known historical URLs before registering
# the current bundle; the URL remains versioned for browser cache-busting.
LEGACY_FRONTEND_VERSIONS = (
    "0.1.0-beta.10",
    "0.1.0-beta.11",
    "0.1.0-beta.12",
)
DEFAULT_MIN_INTERVAL = timedelta(seconds=30)
DEFAULT_MIN_MOVEMENT_M = 25.0
DEFAULT_UNASSIGNED_RETENTION = timedelta(days=90)
DEFAULT_STAY_ANCHOR_INTERVAL = timedelta(minutes=15)
DEFAULT_MAX_GPS_GAP = timedelta(minutes=10)
DEFAULT_MAX_PLAUSIBLE_SPEED_KMH = 200.0
DEFAULT_STOP_AFTER = timedelta(minutes=10)

CONF_VEHICLE_NAME = "vehicle_name"
CONF_TRACKER_ENTITY = "tracker_entity"
CONF_RECORDING_ENABLED = "recording_enabled"
CONF_MIN_INTERVAL = "min_interval"
CONF_MIN_MOVEMENT = "min_movement"
CONF_RETENTION_DAYS = "retention_days"
CONF_STOP_AFTER = "stop_after"
CONF_MAX_GAP = "max_gap"
CONF_MAX_SPEED = "max_speed"

DEFAULT_RECORDING_ENABLED = False
DEFAULT_MIN_INTERVAL_SECONDS = 30
DEFAULT_STOP_AFTER_MINUTES = 10
DEFAULT_MAX_GAP_MINUTES = 10
DEFAULT_MAX_SPEED_KMH = 200.0
MIN_INTERVAL_SECONDS = 5
MAX_INTERVAL_SECONDS = 300
MIN_MOVEMENT_METERS = 1.0
MAX_MOVEMENT_METERS = 5000.0
MIN_RETENTION_DAYS = 1
MAX_RETENTION_DAYS = 3650
