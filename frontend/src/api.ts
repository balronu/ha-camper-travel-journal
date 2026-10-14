export type Hass = { connection: { sendMessagePromise<T>(message: Record<string, unknown>): Promise<T> }; locale?: { language?: string } };
export type Trip = { id: string; title: string; description: string; destination: string; status: "planned" | "active" | "paused" | "completed"; started_at: string; ended_at?: string };
export type Drive = { id: string; started_at: string; ended_at: string; distance_m: number; trip_id?: string };
export type Stop = { id: string; trip_id?: string; name: string; description: string; occurred_at: string; stop_type: string };
export type Expense = { id: string; category: string; amount_minor: number; currency: string; occurred_at: string; note?: string };
export type Snapshot = { trips: Trip[]; drives: Drive[]; available_drives?: Drive[]; stops: Stop[]; expenses?: Expense[]; expense_summary?: { total_minor?: number; by_category?: Record<string, number>; currency?: string | null } };
export async function command<T>(hass: Hass, type: string, vehicleId: string, data: Record<string, unknown> = {}): Promise<T> { return hass.connection.sendMessagePromise<T>({ type, vehicle_id: vehicleId, ...data }); }
export const list = (hass: Hass, vehicleId: string, tripId?: string) => command<Snapshot>(hass, "camper_travel_journal/list", vehicleId, tripId ? { trip_id: tripId } : {});
export const transition = (hass: Hass, vehicleId: string, tripId: string, status: Trip["status"]) => command(hass, "camper_travel_journal/transition_trip", vehicleId, { trip_id: tripId, status });
export const createTrip = (hass: Hass, vehicleId: string, title: string, startedAt: string, destination = "") => command(hass, "camper_travel_journal/create_trip", vehicleId, { title, started_at: startedAt, destination });
export const updateTrip = (hass: Hass, vehicleId: string, tripId: string, data: Record<string, unknown>) => command(hass, "camper_travel_journal/update_trip", vehicleId, { trip_id: tripId, ...data });
export const deleteTrip = (hass: Hass, vehicleId: string, tripId: string) => command(hass, "camper_travel_journal/delete_trip", vehicleId, { trip_id: tripId });
export const unlinkDrive = (hass: Hass, vehicleId: string, tripId: string, driveId: string) => command(hass, "camper_travel_journal/unlink_drive", vehicleId, { trip_id: tripId, drive_id: driveId });
export const linkDrives = (hass: Hass, vehicleId: string, tripId: string, driveIds: string[]) => command(hass, "camper_travel_journal/link_drives", vehicleId, { trip_id: tripId, drive_ids: driveIds });
export const createExpense = (hass: Hass, vehicleId: string, tripId: string, data: { occurred_at: string; category: string; amount_minor: number; currency: string; note?: string }) => command(hass, "camper_travel_journal/create_expense", vehicleId, { trip_id: tripId, ...data });
export const updateExpense = (hass: Hass, vehicleId: string, expenseId: string, data: Record<string, unknown>) => command(hass, "camper_travel_journal/update_expense", vehicleId, { expense_id: expenseId, ...data });
export const deleteExpense = (hass: Hass, vehicleId: string, expenseId: string) => command(hass, "camper_travel_journal/delete_expense", vehicleId, { expense_id: expenseId });
