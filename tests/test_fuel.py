import sqlite3
import tempfile
from datetime import datetime, timezone
from pathlib import Path

import pytest

from custom_components.camper_travel_journal.fuel import resolve_fuel_values
from custom_components.camper_travel_journal.models import Expense
from custom_components.camper_travel_journal.storage import SQLiteStore
from custom_components.camper_travel_journal.travel import MAX_EXPENSE_NOTE_LENGTH, validate_expense_note


def test_fuel_calculations_use_decimal_safe_rounding():
    assert resolve_fuel_values(None, "75,00", "1,750") == (13125, 75.0, 1.75)
    assert resolve_fuel_values(13125, None, "1.750") == (13125, 75.0, 1.75)
    assert resolve_fuel_values(13125, 75, None) == (13125, 75.0, 1.75)
    assert resolve_fuel_values(None, 0.1, 0.1)[0] == 1


@pytest.mark.parametrize("values", [(-1, 75, 1.75), (13125, 0, 1.75), (13125, 75, 0), (13125, 75, 2)])
def test_fuel_rejects_invalid_or_inconsistent_values(values):
    with pytest.raises(ValueError):
        resolve_fuel_values(*values)


def test_v11_migration_is_additive_and_old_expenses_survive():
    with tempfile.TemporaryDirectory() as directory:
        path = Path(directory) / "legacy.db"
        connection = sqlite3.connect(path)
        connection.executescript("CREATE TABLE schema_meta(key TEXT PRIMARY KEY, value TEXT NOT NULL); INSERT INTO schema_meta VALUES('version','10'); CREATE TABLE expenses(id TEXT PRIMARY KEY, trip_id TEXT, occurred_at TEXT, category TEXT, amount_minor INTEGER, currency TEXT, note TEXT, created_at TEXT, updated_at TEXT, odometer_km REAL, stay_id TEXT, occurred_on TEXT, occurred_time TEXT);")
        connection.execute("INSERT INTO expenses VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)", ("old", None, datetime.now(timezone.utc).isoformat(), "fuel", 1234, "EUR", None, "now", "now", None, None, None, None))
        connection.commit(); connection.close()
        store = SQLiteStore(path); store.open()
        columns = {row[1] for row in store.connection.execute("PRAGMA table_info(expenses)")}
        assert {"fuel_liters", "fuel_price_per_liter"} <= columns
        row = store.connection.execute("SELECT amount_minor, fuel_liters, fuel_price_per_liter FROM expenses WHERE id='old'").fetchone()
        assert tuple(row) == (1234, None, None)
        store.close()


def test_store_create_and_update_fuel_details_and_clear_on_category_change():
    with tempfile.TemporaryDirectory() as directory:
        store = SQLiteStore(Path(directory) / "journal.db"); store.open()
        now = datetime(2026, 10, 23, tzinfo=timezone.utc); store.insert_vehicle("v", "Camper", None, now); trip = store.create_trip("v", "Trip", now, now)
        expense_id = store.create_expense(Expense("", trip, now, "fuel", 13125, "EUR", fuel_liters=75, fuel_price_per_liter=1.75), now)
        row = store.list_expenses(trip)[0]
        assert (row["amount_minor"], row["fuel_liters"], row["fuel_price_per_liter"]) == (13125, 75.0, 1.75)
        store.update_expense(expense_id, now, category="food", amount_minor=100)
        row = store.list_expenses(trip)[0]
        assert row["fuel_liters"] is None and row["fuel_price_per_liter"] is None
        store.update_expense(expense_id, now, category="fuel", amount_minor=13125, fuel_liters=75, fuel_price_per_liter=1.75)
        store.update_expense(expense_id, now, fuel_liters=None)
        row = store.list_expenses(trip)[0]
        assert row["fuel_liters"] is None and row["fuel_price_per_liter"] == 1.75
        store.close()


def test_expense_note_reuses_existing_nullable_column_and_supports_unicode_edit_and_clear():
    note = "Stellplatz inklusive Thermeneintritt, Brötchen und Kurtaxe.\nVielen Dank – Grüße!"
    assert validate_expense_note("  " + note + "  ") == note
    assert validate_expense_note("") is None
    with pytest.raises(ValueError, match="expense_note_invalid"):
        validate_expense_note("x" * (MAX_EXPENSE_NOTE_LENGTH + 1))
    with tempfile.TemporaryDirectory() as directory:
        store = SQLiteStore(Path(directory) / "journal.db"); store.open()
        now = datetime(2026, 10, 23, tzinfo=timezone.utc); store.insert_vehicle("v", "Camper", None, now); trip = store.create_trip("v", "Trip", now, now)
        expense_id = store.create_expense(Expense("", trip, now, "camping", 13125, "EUR", note=note), now)
        assert store.list_expenses(trip)[0]["note"] == note
        store.update_expense(expense_id, now, note="Geändert – Café\nzweite Zeile")
        assert store.list_expenses(trip)[0]["note"] == "Geändert – Café\nzweite Zeile"
        store.update_expense(expense_id, now, note=None)
        assert store.list_expenses(trip)[0]["note"] is None
        columns = {row[1] for row in store.connection.execute("PRAGMA table_info(expenses)")}
        assert "note" in columns
        store.close()
