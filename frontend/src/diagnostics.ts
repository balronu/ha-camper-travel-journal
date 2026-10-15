export type DiagnosticState = "success" | "failed" | "not_run";
export type ConnectionState = "available" | "unavailable" | "unknown";

export type DiagnosticResult = {
  state: DiagnosticState;
  durationMs: number | null;
  errorCode?: string;
  errorMessage?: string;
  structure?: string;
  count?: number;
  drivesCount?: number;
  stopsCount?: number;
};

export type DiagnosticReport = {
  version: "0.1.0-beta.18";
  connectionBefore: ConnectionState;
  connectionAfter: ConnectionState;
  authentication: DiagnosticResult;
  vehicles: DiagnosticResult;
  trips: DiagnosticResult;
  vehicleId: string;
  resolvedVehicleId?: string;
};

type Connection = {
  connected?: boolean;
  sendMessagePromise<T>(message: Record<string, unknown>): Promise<T>;
};

export type DiagnosticHass = { connection: Connection };

const DEFAULT_TIMEOUT_MS = 10_000;

function now(): number { return typeof performance !== "undefined" ? performance.now() : Date.now(); }

function mask(value: string): string {
  if (value.length <= 8) return "••••";
  return `${value.slice(0, 4)}…${value.slice(-4)}`;
}

export function maskIdentifier(value: string): string { return mask(value); }

export function connectionState(hass?: DiagnosticHass): ConnectionState {
  if (!hass?.connection) return "unavailable";
  if (hass.connection.connected === true) return "available";
  if (hass.connection.connected === false) return "unavailable";
  return "unknown";
}

function errorDetails(error: unknown): Pick<DiagnosticResult, "errorCode" | "errorMessage"> {
  const item = error as { code?: unknown; message?: unknown } | null;
  const code = typeof item?.code === "string" ? item.code.replace(/[^a-zA-Z0-9_.-]/g, "_").slice(0, 80) : "promise_rejected";
  const message = typeof item?.message === "string"
    ? item.message.replace(/bearer\s+[^\s]+/gi, "Bearer [maskiert]").replace(/(token|cookie|authorization|password)\s*[:=]\s*[^\s,;]+/gi, "$1=[maskiert]").slice(0, 240)
    : "Die Anfrage wurde abgelehnt.";
  return { errorCode: code, errorMessage: message };
}

function timeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(Object.assign(new Error("Zeitüberschreitung"), { code: "timeout" })), timeoutMs);
    promise.then((value) => { clearTimeout(timer); resolve(value); }, (error) => { clearTimeout(timer); reject(error); });
  });
}

async function runRequest<T>(hass: DiagnosticHass, message: Record<string, unknown>, validate: (value: T) => Omit<DiagnosticResult, "durationMs">, timeoutMs: number): Promise<DiagnosticResult & { value?: T }> {
  const started = now();
  try {
    const value = await timeout(hass.connection.sendMessagePromise<T>(message), timeoutMs);
    return { ...validate(value), durationMs: Math.round(now() - started), value };
  } catch (error) {
    return { state: "failed", durationMs: Math.round(now() - started), ...errorDetails(error) };
  }
}

function validateAuth(value: unknown): Omit<DiagnosticResult, "durationMs"> {
  return value && typeof value === "object" ? { state: "success", structure: "ok" } : { state: "failed", structure: "invalid" };
}

function validateVehicles(value: unknown): Omit<DiagnosticResult, "durationMs"> {
  const vehicles = (value as { vehicles?: unknown } | null)?.vehicles;
  return Array.isArray(vehicles) && vehicles.every((item) => item && typeof item === "object" && typeof (item as { vehicle_id?: unknown }).vehicle_id === "string")
    ? { state: "success", structure: "ok", count: vehicles.length }
    : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Fahrzeugantwort hat eine ungültige Struktur." };
}

function validateTrips(value: unknown): Omit<DiagnosticResult, "durationMs"> {
  const item = value as { trips?: unknown; drives?: unknown; stops?: unknown } | null;
  return Array.isArray(item?.trips) && Array.isArray(item?.drives) && Array.isArray(item?.stops)
    ? { state: "success", structure: "ok", count: item.trips.length, drivesCount: item.drives.length, stopsCount: item.stops.length }
    : { state: "failed", structure: "invalid", errorCode: "invalid_response", errorMessage: "Reisedatenantwort hat eine ungültige Struktur." };
}

export async function runDiagnostic(hass: DiagnosticHass | undefined, requestedVehicleId: string, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<DiagnosticReport> {
  const fallback: DiagnosticResult = { state: "not_run", durationMs: null };
  if (!hass?.connection) return { version: "0.1.0-beta.18", connectionBefore: "unavailable", connectionAfter: "unavailable", authentication: fallback, vehicles: fallback, trips: fallback, vehicleId: mask(requestedVehicleId) };
  const connectionBefore = connectionState(hass);
  const authentication = await runRequest(hass, { type: "auth/current_user" }, validateAuth, timeoutMs);
  const vehicles = await runRequest<{ vehicles?: Array<{ vehicle_id?: string }> }>(hass, { type: "camper_travel_journal/list_vehicles" }, validateVehicles, timeoutMs);
  const listed = vehicles.value?.vehicles?.filter((item) => typeof item.vehicle_id === "string") ?? [];
  const resolvedVehicleId = listed.length === 1 ? listed[0].vehicle_id : undefined;
  const target = resolvedVehicleId ?? requestedVehicleId;
  const trips = await runRequest(hass, { type: "camper_travel_journal/list", vehicle_id: target }, validateTrips, timeoutMs);
  const { value: _authenticationValue, ...authenticationResult } = authentication;
  const { value: _vehiclesValue, ...vehiclesResult } = vehicles;
  const { value: _tripsValue, ...tripsResult } = trips;
  return {
    version: "0.1.0-beta.18",
    connectionBefore,
    connectionAfter: connectionState(hass),
    authentication: authenticationResult,
    vehicles: vehiclesResult,
    trips: tripsResult,
    vehicleId: mask(requestedVehicleId),
    ...(resolvedVehicleId ? { resolvedVehicleId: mask(resolvedVehicleId) } : {}),
  };
}

export function reportText(report: DiagnosticReport): string {
  return JSON.stringify(report, null, 2);
}

export function statusLabel(result: DiagnosticResult): string {
  if (result.state === "success") return "erfolgreich";
  if (result.state === "failed") return "fehlgeschlagen";
  return "nicht geprüft";
}
