export type FuelField = "amount" | "liters" | "price";
export type FuelInputs = { amount: string; liters: string; price: string };

export function parseDecimal(value: string): number | null {
  const normalized = value.trim().replace(",", ".");
  if (!normalized) return null;
  const parsed = Number(normalized);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

export function updateFuelInput(inputs: FuelInputs, field: FuelField, value: string, manual: Set<FuelField>): FuelInputs {
  const next = { ...inputs, [field]: value };
  manual.add(field);
  const amount = parseDecimal(next.amount);
  const liters = parseDecimal(next.liters);
  const price = parseDecimal(next.price);
  if (amount !== null && liters !== null && liters > 0 && !manual.has("price")) next.price = (amount / liters).toFixed(3);
  else if (amount !== null && price !== null && price > 0 && !manual.has("liters")) next.liters = (amount / price).toFixed(3);
  else if (liters !== null && price !== null && liters > 0 && price > 0 && !manual.has("amount")) next.amount = (Math.round(liters * price * 100) / 100).toFixed(2);
  return next;
}

export function fuelPayload(inputs: FuelInputs): { amount_minor?: number; fuel_liters?: number | null; fuel_price_per_liter?: number | null } {
  const amount = parseDecimal(inputs.amount);
  const liters = parseDecimal(inputs.liters);
  const price = parseDecimal(inputs.price);
  return {
    ...(amount === null ? {} : { amount_minor: Math.round(amount * 100) }),
    fuel_liters: liters,
    fuel_price_per_liter: price,
  };
}

export function fuelDetails(inputs: FuelInputs, language = "de"): string {
  const liters = parseDecimal(inputs.liters);
  const price = parseDecimal(inputs.price);
  const parts = [liters === null ? "" : `${liters.toFixed(3)} l`, price === null ? "" : `${price.toFixed(3)} €/l`].filter(Boolean);
  return parts.join(" · ");
}
