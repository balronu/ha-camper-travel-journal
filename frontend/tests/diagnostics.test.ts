import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { maskIdentifier, reportText, runDiagnostic } from "../src/diagnostics";

const root = resolve(import.meta.dirname, "..");
const source = (name: string) => readFileSync(resolve(root, "src", name), "utf8");

function hass(handler: (message: Record<string, unknown>) => unknown, connected = true) {
  return { connection: { connected, sendMessagePromise: vi.fn(async (message: Record<string, unknown>) => handler(message)) } } as any;
}

describe("read-only WebSocket diagnostics", () => {
  it("records successful authentication and vehicle discovery", async () => {
    const instance = hass((message) => message.type === "auth/current_user" ? { authenticated: true } : { vehicles: [{ vehicle_id: "entry-1" }] });
    const report = await runDiagnostic(instance, "01M4XW0KD3GQ0KASAYHQ29840P");
    expect(report.authentication.state).toBe("success");
    expect(report.vehicles).toMatchObject({ state: "success", structure: "ok", count: 1 });
    expect(report.resolvedVehicleId).toBe("••••");
  });

  it("records authentication failure without stopping the read-only sequence", async () => {
    const instance = hass((message) => { if (message.type === "auth/current_user") throw Object.assign(new Error("denied"), { code: "auth_failed" }); if (String(message.type).endsWith("list_vehicles")) return { vehicles: [] }; return { trips: [], drives: [], stops: [] }; });
    const report = await runDiagnostic(instance, "entry-1");
    expect(report.authentication).toMatchObject({ state: "failed", errorCode: "auth_failed" });
    expect(report.trips.state).toBe("success");
  });

  it("accepts empty and non-empty list responses and counts them", async () => {
    const empty = hass((message) => message.type === "auth/current_user" ? {} : String(message.type).endsWith("list_vehicles") ? { vehicles: [] } : { trips: [], drives: [], stops: [] });
    expect((await runDiagnostic(empty, "entry-1")).trips).toMatchObject({ state: "success", count: 0, drivesCount: 0, stopsCount: 0 });
    const filled = hass((message) => message.type === "auth/current_user" ? {} : String(message.type).endsWith("list_vehicles") ? { vehicles: [{ vehicle_id: "entry-1" }] } : { trips: [{ id: "private" }], drives: [{ id: "drive" }], stops: [{ id: "stop" }] });
    expect((await runDiagnostic(filled, "entry-1")).trips).toMatchObject({ state: "success", count: 1, drivesCount: 1, stopsCount: 1 });
  });

  it("captures backend errors, rejected promises, disconnects, timeouts and invalid structures", async () => {
    const backend = hass((message) => message.type === "auth/current_user" ? {} : String(message.type).endsWith("list_vehicles") ? { vehicles: [] } : Promise.reject(Object.assign(new Error("backend"), { code: "backend_error" })));
    expect((await runDiagnostic(backend, "entry-1")).trips).toMatchObject({ state: "failed", errorCode: "backend_error" });
    const rejected = hass(() => Promise.reject(new Error("socket closed")), true);
    const rejectedReport = await runDiagnostic(rejected, "entry-1");
    expect(rejectedReport.authentication.errorCode).toBe("promise_rejected");
    const disconnected = hass((message) => { if (message.type === "auth/current_user") { disconnected.connection.connected = false; } return String(message.type).endsWith("list_vehicles") ? { vehicles: [] } : { trips: [], drives: [], stops: [] }; });
    expect((await runDiagnostic(disconnected, "entry-1")).connectionAfter).toBe("unavailable");
    const timeout = hass(() => new Promise(() => undefined));
    expect((await runDiagnostic(timeout, "entry-1", 5)).authentication).toMatchObject({ state: "failed", errorCode: "timeout" });
    const malformed = hass((message) => message.type === "auth/current_user" ? {} : String(message.type).endsWith("list_vehicles") ? { vehicles: [{}] } : { trips: {} });
    expect((await runDiagnostic(malformed, "entry-1")).vehicles.errorCode).toBe("invalid_response");
  });

  it("is repeatable only when called manually and masks report data", async () => {
    const instance = hass((message) => message.type === "auth/current_user" ? {} : String(message.type).endsWith("list_vehicles") ? { vehicles: [] } : { trips: [], drives: [], stops: [] });
    await runDiagnostic(instance, "01M4XW0KD3GQ0KASAYHQ29840P");
    await runDiagnostic(instance, "01M4XW0KD3GQ0KASAYHQ29840P");
    expect(instance.connection.sendMessagePromise).toHaveBeenCalledTimes(6);
    const text = reportText(await runDiagnostic(instance, "01M4XW0KD3GQ0KASAYHQ29840P"));
    expect(text).not.toContain("01M4XW0KD3GQ0KASAYHQ29840P");
    expect(text).not.toContain("Authorization");
    expect(maskIdentifier("123456789")).toBe("1234…6789");
  });

  it("keeps diagnosis manual, mobile-safe and separates stale load/save errors", () => {
    const card = source("diagnostic-card.ts");
    const summary = source("summary-card.ts");
    const manager = source("manager-card.ts");
    expect(card).not.toContain("connectedCallback");
    expect(card).toContain("Diagnose starten");
    expect(card).toContain("Diagnose wiederholen");
    expect(card).toContain("Bericht kopieren");
    expect(card).toContain("navigator.clipboard");
    expect(summary).toContain('this.loadError = ""');
    expect(manager).toContain('this.loadError = ""');
    expect(manager).toContain("private actionError");
    expect(manager).toContain("catch { this.fail(messages(this.hass).tripCreateError); return; }");
    expect(manager).toContain("await this.refresh();");
  });
});
