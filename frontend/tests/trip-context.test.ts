import { beforeEach, describe, expect, it, vi } from "vitest";
import { ACTIVE_TRIP_CHANGED_EVENT, publishActiveTrip, readActiveTrip } from "../src/trip-context";

describe("shared active trip context", () => {
  const listeners = new Map<string, (event: Event) => void>();
  beforeEach(() => {
    const values = new Map<string, string>();
    vi.stubGlobal("window", {
      location: { pathname: "/lovelace/camper" },
      sessionStorage: { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => values.set(key, value), clear: () => values.clear() },
      addEventListener: (name: string, handler: (event: Event) => void) => listeners.set(name, handler),
      removeEventListener: (name: string) => listeners.delete(name),
      dispatchEvent: (event: Event) => { listeners.get(event.type)?.(event); return true; },
    });
  });

  it("persists across card instances and emits one vehicle-scoped event", () => {
    const received: CustomEvent[] = [];
    const handler = (event: Event) => received.push(event as CustomEvent);
    window.addEventListener(ACTIVE_TRIP_CHANGED_EVENT, handler);

    publishActiveTrip({ vehicleId: "camper", tripId: "bremen", source: "summary" });

    expect(readActiveTrip("camper")).toBe("bremen");
    expect(readActiveTrip("other-vehicle")).toBe("");
    expect(received).toHaveLength(1);
    expect(received[0].detail).toMatchObject({ vehicleId: "camper", tripId: "bremen" });
    window.removeEventListener(ACTIVE_TRIP_CHANGED_EVENT, handler);
  });

  it("isolates the same vehicle between dashboard paths", () => {
    window.location.pathname = "/lovelace/camper";
    publishActiveTrip({ vehicleId: "camper", tripId: "bremen" });
    window.location.pathname = "/lovelace/overview";
    expect(readActiveTrip("camper")).toBe("");
  });
});
