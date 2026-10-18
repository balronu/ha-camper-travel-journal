export type TripContextDetail = { vehicleId: string; tripId: string; source?: string };

export const ACTIVE_TRIP_CHANGED_EVENT = "camper-travel-journal-active-trip-changed";

function storageKey(vehicleId: string): string {
  // sessionStorage survives a dashboard reload but does not leak the active
  // trip into another browser tab. Including the Lovelace path also keeps two
  // dashboards for the same vehicle independent.
  const dashboard = typeof window !== "undefined" ? window.location.pathname || "/" : "/";
  return `camper-travel-journal:${dashboard}:${vehicleId}`;
}

export function readActiveTrip(vehicleId: string): string {
  if (!vehicleId || typeof window === "undefined") return "";
  try { return window.sessionStorage.getItem(storageKey(vehicleId)) ?? ""; } catch { return ""; }
}

export function publishActiveTrip(detail: TripContextDetail): void {
  if (!detail.vehicleId || !detail.tripId || typeof window === "undefined") return;
  try { window.sessionStorage.setItem(storageKey(detail.vehicleId), detail.tripId); } catch { /* private browsing */ }
  window.dispatchEvent(new CustomEvent<TripContextDetail>(ACTIVE_TRIP_CHANGED_EVENT, { detail }));
}

