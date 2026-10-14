"""Pure travel-management validation shared by HA and offline tests."""

from __future__ import annotations

from enum import StrEnum


class TripStatus(StrEnum):
    PLANNED = "planned"
    ACTIVE = "active"
    PAUSED = "paused"
    COMPLETED = "completed"


EXPENSE_CATEGORIES = frozenset({"camping", "fuel", "toll", "parking", "food", "activities", "other"})


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
