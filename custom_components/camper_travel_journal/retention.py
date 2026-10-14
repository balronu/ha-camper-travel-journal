"""Retention decisions and dry-run reporting; destructive deletion is absent."""

from datetime import datetime, timedelta, timezone

from .const import DEFAULT_UNASSIGNED_RETENTION


def dry_run_report(store, now: datetime, retention: timedelta = DEFAULT_UNASSIGNED_RETENTION, batch_size: int = 100) -> dict[str, int | bool]:
    """Report eligible point IDs without deleting or mutating anything."""
    cutoff = retention_cutoff(now, False, retention)
    candidates = store.retention_candidates(cutoff, batch_size)
    return {"dry_run": True, "eligible_points": len(candidates), "batch_size": batch_size}


def retention_cutoff(now: datetime, assigned: bool, retention: timedelta = DEFAULT_UNASSIGNED_RETENTION) -> datetime | None:
    """Return the cutoff for unassigned data, or None for retained data."""
    if assigned:
        return None
    if now.tzinfo is None or now.utcoffset() is None:
        raise ValueError("now must be timezone-aware")
    return now.astimezone(timezone.utc) - retention


def is_expired(recorded_at: datetime, now: datetime, assigned: bool, retention: timedelta = DEFAULT_UNASSIGNED_RETENTION) -> bool:
    """Return whether an unassigned record is eligible for retention cleanup."""
    cutoff = retention_cutoff(now, assigned, retention)
    return cutoff is not None and recorded_at.astimezone(timezone.utc) < cutoff
