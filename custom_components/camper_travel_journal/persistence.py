"""Backend-neutral persistence contract for future non-SQLite adapters."""

from __future__ import annotations

from datetime import datetime
from typing import Protocol


class PersistenceBackend(Protocol):
    """The domain depends on these async operations, not on SQL dialects."""

    async def async_insert_point(self, point) -> bool: ...  # pragma: no cover - protocol contract
    async def async_insert_drive(self, drive) -> None: ...  # pragma: no cover - protocol contract
    async def async_insert_vehicle(self, vehicle_id: str, name: str, tracker_entity_id: str, now: datetime) -> None: ...  # pragma: no cover - protocol contract
    async def async_load_recent_points(self, vehicle_id: str, limit: int = 256) -> list[tuple]: ...  # pragma: no cover - protocol contract
    async def async_close(self) -> None: ...  # pragma: no cover - protocol contract
