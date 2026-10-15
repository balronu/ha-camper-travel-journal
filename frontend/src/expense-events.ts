export const EXPENSES_CHANGED_EVENT = "camper-travel-journal-expenses-changed";
export const TRAVEL_DATA_CHANGED_EVENT = "camper-travel-journal-data-changed";

export type ExpenseChangedDetail = { vehicleId: string; tripId: string };

export function notifyExpensesChanged(detail: ExpenseChangedDetail): void {
  window.dispatchEvent(new CustomEvent<ExpenseChangedDetail>(EXPENSES_CHANGED_EVENT, { detail }));
}

export function notifyTravelChanged(detail: ExpenseChangedDetail): void {
  window.dispatchEvent(new CustomEvent<ExpenseChangedDetail>(TRAVEL_DATA_CHANGED_EVENT, { detail }));
}
