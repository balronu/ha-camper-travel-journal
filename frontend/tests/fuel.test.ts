import { describe, expect, it } from "vitest";
import { fuelPayload, updateFuelInput, type FuelInputs } from "../src/fuel";

describe("fuel input", () => {
  it("accepts German decimal commas and derives the missing value", () => {
    const manual = new Set<"amount" | "liters" | "price">(["liters", "price"]);
    const values: FuelInputs = updateFuelInput({ amount: "", liters: "75,00", price: "1,750" }, "price", "1,750", manual);
    expect(fuelPayload(values)).toMatchObject({ amount_minor: 13125, fuel_liters: 75, fuel_price_per_liter: 1.75 });
  });

  it("keeps optional details empty for ordinary expenses", () => {
    expect(fuelPayload({ amount: "23,00", liters: "", price: "" })).toEqual({ amount_minor: 2300, fuel_liters: null, fuel_price_per_liter: null });
  });

  it("does not divide by zero while editing", () => {
    const manual = new Set<"amount" | "liters" | "price">();
    expect(updateFuelInput({ amount: "131,25", liters: "0", price: "" }, "liters", "0", manual)).toEqual({ amount: "131,25", liters: "0", price: "" });
  });
});
