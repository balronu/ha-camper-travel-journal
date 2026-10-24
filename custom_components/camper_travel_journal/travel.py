"""Pure travel-management validation shared by HA and offline tests."""

from __future__ import annotations

from enum import StrEnum
import re


class TripStatus(StrEnum):
    PLANNED = "planned"
    ACTIVE = "active"
    PAUSED = "paused"
    COMPLETED = "completed"


EXPENSE_CATEGORY_IDS = ("camping", "fuel", "toll", "parking", "food", "activities", "water_waste", "other")
EXPENSE_SERVICE_IDS = ("electricity", "fresh_water", "grey_water", "toilet_cassette", "shower")
EXPENSE_SERVICES = frozenset(EXPENSE_SERVICE_IDS)
EXPENSE_CATEGORIES = frozenset(EXPENSE_CATEGORY_IDS)
EXPENSE_CURRENCY_PATTERN = re.compile(r"^[A-Z]{3}$")
MAX_EXPENSE_NOTE_LENGTH = 2000


VALID_TRANSITIONS: dict[TripStatus, frozenset[TripStatus]] = {
    TripStatus.PLANNED: frozenset({TripStatus.ACTIVE}),
    TripStatus.ACTIVE: frozenset({TripStatus.PAUSED, TripStatus.COMPLETED}),
    TripStatus.PAUSED: frozenset({TripStatus.ACTIVE, TripStatus.COMPLETED}),
    TripStatus.COMPLETED: frozenset({TripStatus.ACTIVE}),
}


def validate_transition(current: str, target: str) -> None:
    """Reject invalid trip state changes with a stable API error."""
    try:
        source = TripStatus(current)
        destination = TripStatus(target)
    except ValueError as err:
        raise ValueError("invalid_trip_status") from err
    if destination not in VALID_TRANSITIONS[source]:
        raise ValueError("invalid_status_transition")


def validate_amount(amount_minor: object) -> int:
    if isinstance(amount_minor, bool) or not isinstance(amount_minor, int) or amount_minor < 0:
        raise ValueError("amount_invalid")
    return amount_minor


def validate_expense_category(category: object) -> str:
    if not isinstance(category, str) or category not in EXPENSE_CATEGORIES:
        raise ValueError("expense_category_invalid")
    return category


def validate_expense_services(services: object) -> tuple[str, ...]:
    if services is None:
        return ()
    if isinstance(services, str) or not isinstance(services, (list, tuple, set)):
        raise ValueError("expense_services_invalid")
    normalized = tuple(dict.fromkeys(services))
    if any(not isinstance(value, str) or value not in EXPENSE_SERVICES for value in normalized):
        raise ValueError("expense_services_invalid")
    return normalized


def validate_expense_currency(currency: object) -> str:
    """Return a normalized ISO-like currency code for expense storage."""
    if not isinstance(currency, str):
        raise ValueError("currency_invalid")
    normalized = currency.strip().upper()
    if not EXPENSE_CURRENCY_PATTERN.fullmatch(normalized):
        raise ValueError("currency_invalid")
    return normalized


def validate_expense_note(note: object) -> str | None:
    """Normalize the optional expense note without interpreting its contents."""
    if note is None:
        return None
    if not isinstance(note, str) or len(note) > MAX_EXPENSE_NOTE_LENGTH:
        raise ValueError("expense_note_invalid")
    normalized = note.strip()
    return normalized or None
