"""Provider-neutral, explicitly public travel export contract."""

from __future__ import annotations

from typing import Any

EXPORT_CONTRACT_VERSION = "1.0"


def build_public_trip_export(trip: dict[str, Any], places: list[dict[str, Any]], *, include_coordinates: bool = False, include_descriptions: bool = False, include_expenses: bool = False, include_notes: bool = False) -> dict[str, Any]:
    """Build a JSON-compatible public place snapshot; private fields are opt-in.

    ``include_expenses`` is retained as a privacy-contract flag, but expenses
    are not part of this provider-neutral contract yet because the function
    accepts no expense records. It therefore emits an explicit empty list.
    """
    public_places = []
    for place in places:
        item: dict[str, Any] = {
            "id": place.get("id"),
            "type": place.get("place_type") or place.get("stop_type") or "other",
            "name": place.get("name", ""),
            "arrived_at": place.get("arrived_at") or place.get("occurred_at"),
            "departed_at": place.get("departed_at"),
            "duration_seconds": place.get("duration_seconds", 0),
            "rating": place.get("rating_overall"),
        }
        if include_coordinates and place.get("latitude") is not None and place.get("longitude") is not None:
            item["location"] = {"latitude": place["latitude"], "longitude": place["longitude"]}
        if include_descriptions:
            item["description"] = place.get("description", "")
        if include_notes:
            item["review_text"] = place.get("review_text", "")
        public_places.append(item)
    result: dict[str, Any] = {
        "contract_version": EXPORT_CONTRACT_VERSION,
        "provider": "provider-neutral",
        "trip": {key: trip.get(key) for key in ("id", "title", "destination", "start_date", "end_date")},
        "places": public_places,
        "privacy": {"coordinates": include_coordinates, "descriptions": include_descriptions, "expenses": include_expenses, "notes": include_notes},
    }
    if include_expenses:
        result["expenses"] = []
    return result
