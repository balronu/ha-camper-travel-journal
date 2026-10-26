import { describe, expect, it } from "vitest";
import { formatDecimal, parseLocalizedDecimal } from "../src/i18n";

const hass = (language: string) => ({ locale: { language } }) as any;

describe("locale-aware numeric presentation", () => {
  it("formats the real consumption values with German decimal commas", () => {
    expect(formatDecimal(11.16, 2, hass("de-DE"))).toBe("11,16");
    expect(formatDecimal(42.42, 3, hass("de-DE"))).toBe("42,420");
    expect(formatDecimal(380, 1, hass("de-DE"))).toBe("380,0");
  });

  it("keeps English decimal points", () => {
    expect(formatDecimal(11.16, 2, hass("en-US"))).toBe("11.16");
    expect(formatDecimal(1234.5, 1, hass("en-US"))).toBe("1,234.5");
  });

  it("accepts decimal commas without changing the stored numeric meaning", () => {
    expect(parseLocalizedDecimal("42,420")).toBe(42.42);
    expect(parseLocalizedDecimal("1.234,56")).toBe(1234.56);
    expect(parseLocalizedDecimal("42.420")).toBe(42.42);
  });
});
