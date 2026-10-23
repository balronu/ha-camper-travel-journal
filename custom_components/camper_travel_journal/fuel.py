"""Decimal-based fuel quantity and price validation."""

from __future__ import annotations

from decimal import Decimal, InvalidOperation, ROUND_HALF_UP
from typing import Any


MONEY_TOLERANCE = Decimal("0.005")
VALUE_TOLERANCE = Decimal("0.0005")


def _decimal(value: Any, field: str) -> Decimal | None:
    if value is None or value == "":
        return None
    try:
        parsed = Decimal(str(value).strip().replace(",", "."))
    except (AttributeError, InvalidOperation):
        raise ValueError(f"fuel_{field}_invalid") from None
    if not parsed.is_finite() or parsed < 0:
        raise ValueError(f"fuel_{field}_invalid")
    return parsed


def resolve_fuel_values(
    amount_minor: int | None,
    liters: Any = None,
    price_per_liter: Any = None,
    *,
    complete_missing: bool = True,
) -> tuple[int | None, float | None, float | None]:
    """Return a validated, completed fuel tuple without binary-float math.

    A single value is allowed for backwards-compatible optional entry. When
    two values are present, the third is derived. If all three are present,
    they must agree within sensible display precision.
    """
    amount = None if amount_minor is None else Decimal(amount_minor) / 100
    if amount is not None and amount < 0:
        raise ValueError("amount_invalid")
    liters_d = _decimal(liters, "liters")
    price_d = _decimal(price_per_liter, "price_per_liter")
    if liters_d == 0 or price_d == 0:
        raise ValueError("fuel_zero_invalid")
    if amount is not None and amount == 0 and (liters_d is not None or price_d is not None):
        raise ValueError("fuel_zero_invalid")

    present = sum(value is not None for value in (amount, liters_d, price_d))
    if present == 0:
        raise ValueError("fuel_value_required")
    if complete_missing:
        if amount is None and liters_d is not None and price_d is not None:
            amount = (liters_d * price_d).quantize(Decimal("0.01"), rounding=ROUND_HALF_UP)
        elif liters_d is None and amount is not None and price_d is not None:
            liters_d = amount / price_d
        elif price_d is None and amount is not None and liters_d is not None:
            price_d = amount / liters_d

    if amount is not None and liters_d is not None and price_d is not None:
        if abs(liters_d * price_d - amount) > MONEY_TOLERANCE:
            raise ValueError("fuel_values_inconsistent")
    return (
        None if amount is None else int((amount * 100).quantize(Decimal("1"), rounding=ROUND_HALF_UP)),
        None if liters_d is None else float(liters_d),
        None if price_d is None else float(price_d),
    )
