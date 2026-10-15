export type Hass = { connection: { sendMessagePromise<T>(message: Record<string, unknown>): Promise<T> }; locale?: { language?: string } };
export type Vehicle = { vehicle_id: string; name: string; title: string };
export type Trip = { id: string; title: string; description: string; destination: string; status: "planned" | "active" | "paused" | "completed"; started_at: string; ended_at?: string; start_date?: string | null; end_date?: string | null };
export type Drive = { id: string; started_at: string; ended_at: string; duration_seconds?: number; distance_m: number; trip_id?: string | null; assignment_status?: "assigned" | "unassigned"; source?: "gps" | "manual"; start_label?: string | null; end_label?: string | null };
export type Stop = { id: string; trip_id?: string; name: string; description: string; occurred_at: string; stop_type: string };
export type Expense = { id: string; trip_id?: string; category: string; amount_minor: number; currency: string; occurred_at: string; note?: string };
export type Snapshot = { trips: Trip[]; drives: Drive[]; available_drives?: Drive[]; stops: Stop[]; expenses?: Expense[]; expense_summary?: { total_minor?: number; by_category?: Record<string, number>; currency?: string | null; mixed_currency?: boolean } };
export async function command<T>(hass: Hass, type: string, vehicleId: string, data: Record<string, unknown> = {}): Promise<T> { return hass.connection.sendMessagePromise<T>({ type, vehicle_id: vehicleId, ...data }); }
export const list = (hass: Hass, vehicleId: string, tripId?: string) => command<Snapshot>(hass, "camper_travel_journal/list", vehicleId, tripId ? { trip_id: tripId } : {});
export const transition = (hass: Hass, vehicleId: string, tripId: string, status: Trip["status"]) => command(hass, "camper_travel_journal/transition_trip", vehicleId, { trip_id: tripId, status });
export const createTrip = (hass: Hass, vehicleId: string, title: string, startDate = "", endDate = "", destination = "") => command(hass, "camper_travel_journal/create_trip", vehicleId, { title, start_date: startDate || undefined, end_date: endDate || undefined, destination });
export const updateTrip = (hass: Hass, vehicleId: string, tripId: string, data: Record<string, unknown>) => command(hass, "camper_travel_journal/update_trip", vehicleId, { trip_id: tripId, ...data });
export const deleteTrip = (hass: Hass, vehicleId: string, tripId: string) => command(hass, "camper_travel_journal/delete_trip", vehicleId, { trip_id: tripId });
export const unlinkDrive = (hass: Hass, vehicleId: string, tripId: string, driveId: string) => command(hass, "camper_travel_journal/unlink_drive", vehicleId, { trip_id: tripId, drive_id: driveId });
export const linkDrives = (hass: Hass, vehicleId: string, tripId: string, driveIds: string[]) => command(hass, "camper_travel_journal/link_drives", vehicleId, { trip_id: tripId, drive_ids: driveIds });
export const createManualDrive = (hass: Hass, vehicleId: string, data: { occurred_at: string; start_location: string; end_location: string; distance_km: number; duration_minutes?: number; trip_id?: string }) => command(hass, "camper_travel_journal/create_manual_drive", vehicleId, data);
export const createExpense = (hass: Hass, vehicleId: string, tripId: string, data: { occurred_at: string; category: string; amount_minor: number; currency: string; note?: string }) => command(hass, "camper_travel_journal/create_expense", vehicleId, { trip_id: tripId, ...data });
export const updateExpense = (hass: Hass, vehicleId: string, expenseId: string, data: Record<string, unknown>) => command(hass, "camper_travel_journal/update_expense", vehicleId, { expense_id: expenseId, ...data });
export const deleteExpense = (hass: Hass, vehicleId: string, expenseId: string) => command(hass, "camper_travel_journal/delete_expense", vehicleId, { expense_id: expenseId });
export const listVehicles = async (hass: Hass): Promise<Vehicle[]> => {
  const result = await hass.connection.sendMessagePromise<{ vehicles?: Vehicle[] }>({ type: "camper_travel_journal/list_vehicles" });
  return result.vehicles ?? [];
};
