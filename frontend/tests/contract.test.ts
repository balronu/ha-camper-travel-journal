import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { categoryLabel, EXPENSE_CATEGORIES, EXPENSE_CATEGORY_IDS, formatDate, formatMoneyMinor, formatTripPeriod, isExpenseCategory, messages, normalizeExpenseCategory, parseAmountMinor, statusLabel } from "../src/i18n";
import { autoSelectVehicle, sameCardConfig } from "../src/card-editor";
import { listVehicles } from "../src/api";
import { sortDrivesChronologically } from "../src/map-utils";

const root = resolve(import.meta.dirname, "..");
const manifest = JSON.parse(readFileSync(resolve(root, "../custom_components/camper_travel_journal/manifest.json"), "utf8"));
const pkg = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8"));
const bundle = resolve(root, "../custom_components/camper_travel_journal/frontend/camper-travel-journal.js");

describe("frontend release contract", () => {
  it("keeps backend, npm metadata and beta bundle aligned", () => {
    expect(manifest.version).toBe("0.3.10");
    expect(pkg.version).toBe(manifest.version);
    expect(existsSync(bundle)).toBe(true);
    expect(readFileSync(resolve(root, "../custom_components/camper_travel_journal/const.py"), "utf8")).toContain('FRONTEND_VERSION = "0.3.10"');
  });
  it("registers the central card in the catalog while retaining legacy elements", () => {
    const source = readFileSync(resolve(root, "src/index.ts"), "utf8");
    expect(source).toContain("customCards.some");
    expect(readFileSync(resolve(root, "src/base-card.ts"), "utf8")).toContain("customElements.get");
    expect(source).toContain("camper-travel-journal-journal-card");
    expect(source).not.toContain('{ type: "camper-travel-journal-summary-card"');
    expect(source).not.toContain('{ type: "camper-travel-journal-manager-card"');
    expect(source).toContain('{ type: "camper-travel-journal-diagnostics-card"');
    expect(source).not.toContain('{ type: "camper-travel-journal-map-card"');
    expect(readFileSync(resolve(root, "src/base-card.ts"), "utf8")).toContain("migration-notice");
    expect(readFileSync(resolve(root, "src/map-card.ts"), "utf8")).toContain("TravelCard");
    expect(source).toContain("Camper Travel Journal – Journal");
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
    expect(messages({ locale: { language: "de-DE" } } as any).summaryChooseTrip).toBe("Reise auswählen");
    expect(messages({ locale: { language: "en-US" } } as any).summaryChooseTrip).toBe("Select trip");
    expect(messages({ locale: { language: "de-DE" } } as any).start).toBe("Reise starten");
    expect(messages({ locale: { language: "en-US" } } as any).start).toBe("Start trip");
  });
  it("formats expense calendar dates without timezone conversion", () => {
    expect(formatDate("2026-10-13", { locale: { language: "de-DE" } } as any)).toBe("13.10.2026");
    expect(formatDate("2026-10-13", { locale: { language: "en-US" } } as any)).toBe("10/13/2026");
  });
  it("translates the explicit GPX target controls", () => {
    expect(messages({ locale: { language: "de-DE" } } as any).gpxTargetTrip).toBe("Zielreise");
    expect(messages({ locale: { language: "de-DE" } } as any).gpxGapBoundary).toContain("GPS-Lücke");
    expect(messages({ locale: { language: "en-US" } } as any).gpxTargetTrip).toBe("Target trip");
    expect(messages({ locale: { language: "en-US" } } as any).gpxNoTrip).toContain("unassigned");
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
    expect(manager).toContain("expenseNote");
    expect(manager).toContain("maxlength=\"2000\"");
    expect(manager).toContain("white-space:pre-wrap");
  });
  it("makes historical suggestion refresh observable and single-flight", () => {
    const manager = readFileSync(resolve(root, "src/manager-card.ts"), "utf8");
    expect(manager).toContain("private suggestionsBusy = false");
    expect(manager).toContain("?disabled=${this.suggestionsBusy}");
    expect(manager).toContain('role="status"');
    expect(manager).toContain('role="alert"');
    expect(manager).toContain("this.suggestionsBusy");
    expect(readFileSync(resolve(root, "src/api.ts"), "utf8")).toContain("historical_only: true");
  });
  it("exposes the read-only route contract and map lifecycle", () => {
    const api = readFileSync(resolve(root, "src/api.ts"), "utf8");
    const map = readFileSync(resolve(root, "src/map-card.ts"), "utf8");
    expect(api).toContain("camper_travel_journal/route");
    expect(map).toContain("L.polyline");
    expect(map).toContain("disconnectedCallback");
    expect(map).toContain("OpenStreetMap contributors");
    expect(map).toContain("tile_attribution");
    expect(map).toContain("tileerror");
    expect(map).toContain("mapTilesUnavailable");
    expect(map).toContain("map_config");
    expect(readFileSync(resolve(root, "../custom_components/camper_travel_journal/const.py"), "utf8")).toContain("basemaps.cartocdn.com");
    expect(map).not.toContain("tile.openstreetmap.org/{z}/{x}/{y}.png");
    expect(map).not.toContain("routing");
  });
  it("keeps the compact responsive map presentation contract", () => {
    const map = readFileSync(resolve(root, "src/map-card.ts"), "utf8");
    expect(map).toContain('mapTitle');
    expect(map).toContain('mapTotalDistance');
    expect(map).toContain('mapSelectedDrives');
    expect(map).toContain('mapTripPeriod');
    expect(map).toContain('<details class="drive-details"');
    expect(map).toContain('mapSelectAll');
    expect(map).toContain('mapSelectNone');
    expect(map).toContain('matchMedia("(min-width: 700px)")');
    expect(map).toContain('fitMapPending');
    expect(map).toContain('this.map?.remove()');
    expect(map).toContain('height: clamp(');
    expect(map).toContain('focus-visible');
    expect(map).toContain('tile_attribution');
    expect(map).toContain('invalidateSize({ pan: false })');
    expect(map).toContain('maxZoom: 15');
  });
  it("keeps the central journal entry gated and trip-scoped", () => {
    const journal = readFileSync(resolve(root, "src/journal-card.ts"), "utf8");
    const manager = readFileSync(resolve(root, "src/manager-card.ts"), "utf8");
    const map = readFileSync(resolve(root, "src/map-card.ts"), "utf8");
    expect(journal).toContain("Reise auswählen oder neu anlegen");
    expect(journal).toContain("camper-travel-journal-manager-card");
    expect(journal).toContain("camper-travel-journal-map-card");
    expect(journal).toContain("clearActiveTrip");
    expect(journal).toContain('manager("trip-actions")');
    expect(journal).toContain("TRAVEL_DATA_CHANGED_EVENT");
    expect(journal).toContain("trip_id: trip.id");
    expect(manager).toContain("embeddedSection");
    expect(manager).toContain("trip-delete-dialog");
    expect(manager).toContain("trip-switch");
    expect(manager).toContain("journalClose");
    expect(manager).toContain("trip-actions-grid");
    expect(manager).toContain("@media(max-width:420px)");
    expect(manager).toContain('trip.status === "planned"');
    expect(manager).toContain('trip.status === "paused"');
    expect(manager).toContain('trip.status === "completed"');
    expect(manager).toContain("starPicker");
    expect(manager).toContain('role="radio"');
    expect(map).toContain("embeddedTripId");
  });
  it("keeps legacy cards visible without advertising them as new cards", () => {
    const base = readFileSync(resolve(root, "src/base-card.ts"), "utf8");
    const index = readFileSync(resolve(root, "src/index.ts"), "utf8");
    const journal = readFileSync(resolve(root, "src/journal-card.ts"), "utf8");
    expect(base).toContain("migration-notice");
    expect(base).toContain("README.md#migration");
    expect(index).toContain('type: "camper-travel-journal-journal-card"');
    expect(index).not.toContain('type: "camper-travel-journal-manager-card"');
    expect(index).toContain('type: "camper-travel-journal-diagnostics-card"');
    expect(base).toContain("this.config.journal_section");
    expect(journal).toContain("onSectionToggle");
    expect(journal).toContain("details.open = false");
  });
  it("uses one shared, accessible modal editor for every CRUD editor", () => {
    const manager = readFileSync(resolve(root, "src/manager-card.ts"), "utf8");
    expect(manager).toContain('dialog class="editor-dialog"');
    expect(manager).toContain('dialog.showModal()');
    expect(manager).toContain('event.preventDefault(); close();');
    expect(manager).toContain("discardPrompt");
    for (const kind of ["trip-create", "trip-edit", "drive-create", "drive-edit", "place-create", "place-edit", "expense-create", "expense-edit", "rating-edit"]) {
      expect(manager).toContain(`openEditor(\"${kind}\"`);
    }
    expect(manager).toContain("max-height:calc(100dvh - 2rem)");
    expect(manager).toContain('role="alert"');
  });
  it("keeps central trip creation on the shared modal path", () => {
    const journal = readFileSync(resolve(root, "src/journal-card.ts"), "utf8");
    const manager = readFileSync(resolve(root, "src/manager-card.ts"), "utf8");
    expect(journal).not.toContain('class="new-trip');
    expect(journal).toContain('journal_section: "trip-create"');
    expect(journal).toContain("trip-created");
    expect(manager).toContain('this.embeddedSection() === "trip-create"');
    expect(manager).toContain("openTripCreate()");
    expect(manager).toContain("tripSaving");
  });
  it("sorts map drive segments in ascending start-time order", () => {
    expect(sortDrivesChronologically([
      { id: "late", started_at: "2026-10-13T12:00:00Z" },
      { id: "early", started_at: "2026-10-13T08:00:00Z" },
      { id: "unknown", started_at: null },
    ]).map((drive) => drive.id)).toEqual(["early", "late", "unknown"]);
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
    expect(normalizeExpenseCategory("Kraftstoff")).toBe("fuel");
    expect(normalizeExpenseCategory("Parkgebühren")).toBe("parking");
    expect(normalizeExpenseCategory("Verpflegung")).toBe("food");
    expect(normalizeExpenseCategory("Camping site")).toBe("camping");
    expect(normalizeExpenseCategory("Parking fees")).toBe("parking");
    expect(normalizeExpenseCategory("legacy-custom-category")).toBe("legacy-custom-category");
  });
  it("parses cent amounts exactly and formats the selected currency", () => {
    expect(parseAmountMinor("23.00")).toBe(2300);
    expect(parseAmountMinor("23,50")).toBe(2350);
    expect(parseAmountMinor("0.01")).toBe(1);
    expect(parseAmountMinor("-1")).toBeNull();
    expect(parseAmountMinor("23.456")).toBeNull();
    expect(formatMoneyMinor(2300, "EUR", { locale: { language: "de-DE" } } as any)).toBe("23,00 €");
    expect(EXPENSE_CATEGORY_IDS).toEqual(["camping", "fuel", "toll", "parking", "food", "activities", "water_waste", "other"]);
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
    expect(manager).toContain("expense-info");
    expect(manager).toContain("inline-check");
    expect(summary).toContain("overnightCount");
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
