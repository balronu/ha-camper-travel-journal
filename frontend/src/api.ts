export type Hass = { connection: { sendMessagePromise<T>(message: Record<string, unknown>): Promise<T> } };
export type Trip = { id: string; title: string; description: string; destination: string; status: "planned" | "active" | "paused" | "completed"; started_at: string; ended_at?: string };
export type Drive = { id: string; started_at: string; ended_at: string; distance_m: number; trip_id?: string };
export type Expense = { id: string; category: string; amount_minor: number; currency: string; occurred_at: string; note?: string };
export type Snapshot = { trips: Trip[]; drives: Drive[]; stops: unknown[]; expenses?: Expense[]; expense_summary?: Record<string, unknown> };
export async function command<T>(hass: Hass, type: string, vehicleId: string, data: Record<string, unknown> = {}): Promise<T> { return hass.connection.sendMessagePromise<T>({ type, vehicle_id: vehicleId, ...data }); }
export const list = (hass: Hass, vehicleId: string, tripId?: string) => command<Snapshot>(hass, "camper_travel_journal/list", vehicleId, tripId ? { trip_id: tripId } : {});
export const transition = (hass: Hass, vehicleId: string, tripId: string, status: Trip["status"]) => command(hass, "camper_travel_journal/transition_trip", vehicleId, { trip_id: tripId, status });
export const createTrip = (hass: Hass, vehicleId: string, title: string, startedAt: string, destination = "") => command(hass, "camper_travel_journal/create_trip", vehicleId, { title, started_at: startedAt, destination });
export const createExpense = (hass: Hass, vehicleId: string, tripId: string, data: { occurred_at: string; category: string; amount_minor: number; currency: string; note?: string }) => command(hass, "camper_travel_journal/create_expense", vehicleId, { trip_id: tripId, ...data });
