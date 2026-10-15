import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { categoryLabel, EXPENSE_CATEGORIES, EXPENSE_CATEGORY_IDS, formatDate, formatMoneyMinor, formatTripPeriod, isExpenseCategory, messages, parseAmountMinor, statusLabel } from "../src/i18n";
import { autoSelectVehicle, sameCardConfig } from "../src/card-editor";
import { listVehicles } from "../src/api";

const root = resolve(import.meta.dirname, "..");
const manifest = JSON.parse(readFileSync(resolve(root, "../custom_components/camper_travel_journal/manifest.json"), "utf8"));
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const bundle = resolve(root, "../custom_components/camper_travel_journal/frontend/camper-travel-journal.js");

describe("frontend release contract", () => {
  it("keeps backend, npm metadata and beta bundle aligned", () => {
    expect(manifest.version).toBe("0.1.0-beta.16");
    expect(pkg.version).toBe(manifest.version);
    expect(existsSync(bundle)).toBe(true);
  });
  it("registers both cards idempotently", () => {
    const source = readFileSync(resolve(root, "src/index.ts"), "utf8");
    expect(source).toContain("customCards.some");
    expect(readFileSync(resolve(root, "src/base-card.ts"), "utf8")).toContain("customElements.get");
    expect(source).toContain("camper-travel-journal-summary-card");
    expect(source).toContain("camper-travel-journal-manager-card");
    expect(source).toContain("camper-travel-journal-diagnostics-card");
    expect(source).toContain("Diagnose");
    expect(source).toContain("Reiseübersicht");
    expect(source).toContain("Reiseverwaltung");
    const init = readFileSync(resolve(root, "../custom_components/camper_travel_journal/__init__.py"), "utf8");
    expect(init).toContain("async_register_static_paths");
    expect(init).toContain("add_extra_js_url");
    expect(init).toContain("frontend_registered");
  });
  it("provides graphical editors and preserves the vehicle_id API contract", () => {
    const base = readFileSync(resolve(root, "src/base-card.ts"), "utf8");
    const editor = readFileSync(resolve(root, "src/card-editor.ts"), "utf8");
    const api = readFileSync(resolve(root, "src/api.ts"), "utf8");
    expect(base).toContain("getConfigElement");
    expect(base).toContain("getStubConfig");
    expect(editor).toContain("config-changed");
    expect(editor).toContain("editorNoVehicle");
    expect(api).toContain("listVehicles");
    expect(autoSelectVehicle({}, [{ vehicle_id: "entry-1", name: "Wohnmobil", title: "Camper Travel Journal" }])).toEqual({ vehicle_id: "entry-1" });
    expect(autoSelectVehicle({ vehicle_id: "existing" }, [{ vehicle_id: "entry-1", name: "Wohnmobil", title: "Camper Travel Journal" }])).toEqual({ vehicle_id: "existing" });
    expect(autoSelectVehicle({}, [])).toEqual({});
    expect(autoSelectVehicle({}, [
      { vehicle_id: "entry-1", name: "Eins", title: "Eins" },
      { vehicle_id: "entry-2", name: "Zwei", title: "Zwei" },
    ])).toEqual({});
  });
  it("covers vehicle discovery, empty/error responses and stable editor configs", async () => {
    const vehicle = { vehicle_id: "entry-1", name: "Wohnmobil", title: "Camper Travel Journal" };
    expect(autoSelectVehicle({}, [vehicle])).toEqual({ vehicle_id: "entry-1" });
    expect(autoSelectVehicle({}, [vehicle, { ...vehicle, vehicle_id: "entry-2", name: "Zweitfahrzeug" }])).toEqual({});
    expect(autoSelectVehicle({}, [])).toEqual({});
    expect(sameCardConfig({ vehicle_id: "entry-1" }, { vehicle_id: "entry-1" })).toBe(true);
    expect(sameCardConfig({ vehicle_id: "entry-1" }, { vehicle_id: "entry-2" })).toBe(false);
    const hass = { connection: { sendMessagePromise: async () => ({ vehicles: [vehicle] }) } } as any;
    await expect(listVehicles(hass)).resolves.toEqual([vehicle]);
    const empty = { connection: { sendMessagePromise: async () => ({}) } } as any;
    await expect(listVehicles(empty)).resolves.toEqual([]);
    const broken = { connection: { sendMessagePromise: async () => { throw new Error("websocket failed"); } } } as any;
    await expect(listVehicles(broken)).rejects.toThrow("websocket failed");
  });
  it("keeps the hub editor texts in German and English", () => {
    expect(messages({ locale: { language: "de-DE" } } as any).editorChooseVehicle).toBe("Wohnmobil auswählen");
    expect(messages({ locale: { language: "en-US" } } as any).editorChooseVehicle).toBe("Select camper");
  });
  it("guards reload loops and repeated state updates in card sources", () => {
    const editor = readFileSync(resolve(root, "src/card-editor.ts"), "utf8");
    const base = readFileSync(resolve(root, "src/base-card.ts"), "utf8");
    const summary = readFileSync(resolve(root, "src/summary-card.ts"), "utf8");
    expect(editor).toContain("this._hass?.connection !== value?.connection");
    expect(editor).toContain("if (this.loadingPromise) return this.loadingPromise");
    expect(editor).toContain("sameCardConfig(this._config, config)");
    expect(editor).toContain("?selected=${vehicle.vehicle_id === this._config.vehicle_id}");
    expect(base).toContain("this._hass?.connection !== value?.connection");
    expect(base).toContain("if (this.config.vehicle_id === config.vehicle_id) return");
    expect(summary).toContain("protected onHassConnectionChanged");
  });
  it("contains no location data and exposes the versioned resource contract", () => {
    const source = readFileSync(bundle, "utf8");
    expect(source).not.toMatch(/49\.\d+|7\.\d+/);
    const constants = readFileSync(resolve(root, "../custom_components/camper_travel_journal/const.py"), "utf8");
    expect(constants).toContain("FRONTEND_URL");
    expect(constants).toContain("?v={FRONTEND_VERSION}");
  });
  it("exposes CRUD, assignment and error-state UI contracts", () => {
    const api = readFileSync(resolve(root, "src/api.ts"), "utf8");
    const manager = readFileSync(resolve(root, "src/manager-card.ts"), "utf8");
    const i18n = readFileSync(resolve(root, "src/i18n.ts"), "utf8");
    expect(api).toContain("updateTrip");
    expect(api).toContain("deleteTrip");
    expect(api).toContain("linkDrives");
    expect(api).toContain("updateExpense");
    expect(manager).not.toContain("window.confirm");
    expect(manager).toContain("role=\"alert\"");
    expect(manager).toContain("statusLabel");
    expect(manager).toContain("categoryLabel");
    expect(i18n).toContain("const de");
    expect(i18n).toContain("const en");
    expect(i18n).toContain("language");
  });
  it("localizes visible status and category labels for German and English", () => {
    const german = { locale: { language: "de-DE" } } as any;
    const english = { locale: { language: "en-US" } } as any;
    expect(messages(german).manager).toBe("Reiseverwaltung");
    expect(messages(english).manager).toBe("Trip management");
    expect(statusLabel("paused", german)).toBe("pausiert");
    expect(statusLabel("paused", english)).toBe("paused");
    expect(categoryLabel("fuel", german)).toBe("Kraftstoff");
    expect(categoryLabel("fuel", english)).toBe("Fuel");
  });
  it("parses cent amounts exactly and formats the selected currency", () => {
    expect(parseAmountMinor("23.00")).toBe(2300);
    expect(parseAmountMinor("23,50")).toBe(2350);
    expect(parseAmountMinor("0.01")).toBe(1);
    expect(parseAmountMinor("-1")).toBeNull();
    expect(parseAmountMinor("23.456")).toBeNull();
    expect(formatMoneyMinor(2300, "EUR", { locale: { language: "de-DE" } } as any)).toBe("23,00 €");
    expect(EXPENSE_CATEGORY_IDS).toEqual(["camping", "fuel", "toll", "parking", "food", "activities", "other"]);
    expect(EXPENSE_CATEGORIES).toEqual(EXPENSE_CATEGORY_IDS);
    expect(isExpenseCategory("camping")).toBe(true);
    expect(isExpenseCategory("Stellplatz/Campingplatz")).toBe(false);
  });
  it("formats ISO calendar dates without timezone shifts in both languages", () => {
    const german = { locale: { language: "de-DE" } } as any;
    const english = { locale: { language: "en-US" } } as any;
    expect(formatDate("2026-10-23", german)).toBe("23.10.2026");
    expect(formatDate("2026-10-23", english)).toBe("10/23/2026");
    expect(formatTripPeriod({ start_date: "2026-10-23", end_date: "2026-10-25" }, german)).toBe("23.10.2026 – 25.10.2026");
    expect(formatTripPeriod({ start_date: "2026-10-23", end_date: "2026-10-25" }, english)).toBe("10/23/2026 – 10/25/2026");
  });
  it("uses the trip-specific cost response and an inline edit form", () => {
    const summary = readFileSync(resolve(root, "src/summary-card.ts"), "utf8");
    const manager = readFileSync(resolve(root, "src/manager-card.ts"), "utf8");
    expect(summary).toContain("const overview = await list");
    expect(summary).toContain("await list(this.hass, this.vehicleId, trip.id)");
    expect(manager).toContain("startExpenseEdit");
    expect(manager).toContain("editingCategory");
    expect(manager).toContain("expense-form");
    expect(manager).not.toContain("window.prompt(lang.amount");
    expect(manager).toContain("category: this.editingCategory");
    expect(manager).toContain("event.currentTarget as HTMLSelectElement");
    expect(manager).toContain("setExpenseCategory");
    expect(manager).toContain("setExpenseAmount");
    expect(manager).toContain("notifyExpensesChanged");
    expect(manager).toContain("toggleTripDetails");
    expect(manager).toContain("lang.close");
    expect(summary).toContain("EXPENSES_CHANGED_EVENT");
  });
  it("exposes beta 12 trip dates, drive management and cross-card refresh contracts", () => {
    const api = readFileSync(resolve(root, "src/api.ts"), "utf8");
    const manager = readFileSync(resolve(root, "src/manager-card.ts"), "utf8");
    const summary = readFileSync(resolve(root, "src/summary-card.ts"), "utf8");
    expect(api).toContain("createManualDrive");
    expect(api).toContain("updateManualDrive");
    expect(api).toContain("deleteManualDrive");
    expect(api).toContain("start_date");
    expect(api).toContain("end_date");
    expect(manager).toContain("type=\"date\"");
    expect(manager).toContain("type=\"datetime-local\"");
    expect(manager).toContain("notifyTravelChanged");
    expect(manager).toContain("formatDuration");
    expect(manager).toContain("sourceManual");
    expect(manager).toContain("saveManualDrive");
    expect(manager).toContain("removeManualDrive");
    expect(summary).toContain("TRAVEL_DATA_CHANGED_EVENT");
  });
});
