import type { Hass } from "./api";

type Language = "de" | "en";
export const EXPENSE_CATEGORIES = ["camping", "fuel", "toll", "parking", "food", "activities", "other"] as const;
type Messages = {
  title: string; noDestination: string; loading: string; noTrip: string; loadError: string; statusError: string;
  distance: string; drives: string; stops: string; costs: string; resume: string; pause: string; complete: string;
  manager: string; newTrip: string; tripName: string; destination: string; create: string; trips: string;
  edit: string; remove: string; details: string; assignedDrives: string; freeDrives: string; assign: string;
  unassign: string; expenses: string; amount: string; category: string; save: string; deleteCost: string;
  tripDeleteConfirm: string; expenseDeleteConfirm: string; tripCreateError: string; tripEditError: string;
  tripDeleteError: string; expenseCreateError: string; expenseEditError: string; expenseDeleteError: string;
  driveAssignError: string; categories: Record<string, string>; statuses: Record<string, string>;
  amountInvalid: string; categoryInvalid: string; mixedCurrency: string; cancel: string; saving: string; total: string;
  editorVehicle: string; editorChooseVehicle: string; editorLoading: string; editorNoVehicle: string; editorLoadError: string;
};

const de: Messages = {
  title: "Reisetagebuch", noDestination: "Kein Reiseziel", loading: "Reisedaten werden geladen …", noTrip: "Noch keine Reise angelegt.",
  loadError: "Reisedaten konnten nicht geladen werden.", statusError: "Reisestatus konnte nicht geändert werden.", distance: "Strecke", drives: "Fahrten", stops: "Zwischenstopps", costs: "Kosten", resume: "Reise fortsetzen", pause: "Pausieren", complete: "Abschließen",
  manager: "Reiseverwaltung", newTrip: "Neue Reise", tripName: "Reisename", destination: "Reiseziel", create: "Anlegen", trips: "Reisen", edit: "Bearbeiten", remove: "Löschen", details: "Details", assignedDrives: "Fahrten dieser Reise", freeDrives: "Freie Fahrten", assign: "Zuordnen", unassign: "Zuordnung lösen", expenses: "Kosten", amount: "Betrag", category: "Kategorie", save: "Speichern", deleteCost: "Kosten löschen?", tripDeleteConfirm: "Reise löschen? Zugehörige Fahrten bleiben erhalten.", expenseDeleteConfirm: "Kosten löschen?", tripCreateError: "Reise konnte nicht gespeichert werden.", tripEditError: "Reise konnte nicht bearbeitet werden.", tripDeleteError: "Reise konnte nicht gelöscht werden.", expenseCreateError: "Ausgabe konnte nicht gespeichert werden.", expenseEditError: "Kosten konnten nicht bearbeitet werden.", expenseDeleteError: "Kosten konnten nicht gelöscht werden.", driveAssignError: "Fahrt konnte nicht zugeordnet werden.",
  categories: { camping: "Stellplatz/Campingplatz", fuel: "Kraftstoff", toll: "Maut", parking: "Parkgebühren", food: "Verpflegung", activities: "Aktivitäten", other: "Sonstiges" }, statuses: { planned: "geplant", active: "aktiv", paused: "pausiert", completed: "abgeschlossen" }, amountInvalid: "Bitte einen gültigen Betrag mit höchstens zwei Nachkommastellen eingeben.", categoryInvalid: "Bitte eine gültige Kostenkategorie auswählen.", mixedCurrency: "Mehrere Währungen", cancel: "Abbrechen", saving: "Speichern …", total: "Gesamt",
  editorVehicle: "Wohnmobil", editorChooseVehicle: "Wohnmobil auswählen", editorLoading: "Wohnmobile werden geladen …", editorNoVehicle: "Kein eingerichtetes Wohnmobil gefunden.", editorLoadError: "Wohnmobile konnten nicht geladen werden.",
};

const en: Messages = {
  title: "Travel journal", noDestination: "No destination", loading: "Loading travel data …", noTrip: "No trip created yet.",
  loadError: "Travel data could not be loaded.", statusError: "Trip status could not be changed.", distance: "Distance", drives: "Drives", stops: "Stops", costs: "Costs", resume: "Resume trip", pause: "Pause", complete: "Complete",
  manager: "Trip management", newTrip: "New trip", tripName: "Trip name", destination: "Destination", create: "Create", trips: "Trips", edit: "Edit", remove: "Delete", details: "Details", assignedDrives: "Drives in this trip", freeDrives: "Unassigned drives", assign: "Assign", unassign: "Unassign", expenses: "Costs", amount: "Amount", category: "Category", save: "Save", deleteCost: "Delete cost?", tripDeleteConfirm: "Delete trip? Assigned drives will be kept.", expenseDeleteConfirm: "Delete cost?", tripCreateError: "Trip could not be saved.", tripEditError: "Trip could not be edited.", tripDeleteError: "Trip could not be deleted.", expenseCreateError: "Cost could not be saved.", expenseEditError: "Cost could not be edited.", expenseDeleteError: "Cost could not be deleted.", driveAssignError: "Drive could not be assigned.",
  categories: { camping: "Camping site", fuel: "Fuel", toll: "Toll", parking: "Parking fees", food: "Food", activities: "Activities", other: "Other" }, statuses: { planned: "planned", active: "active", paused: "paused", completed: "completed" }, amountInvalid: "Enter a valid amount with no more than two decimal places.", categoryInvalid: "Select a valid cost category.", mixedCurrency: "Multiple currencies", cancel: "Cancel", saving: "Saving …", total: "Total",
  editorVehicle: "Camper", editorChooseVehicle: "Select camper", editorLoading: "Loading campers …", editorNoVehicle: "No configured camper found.", editorLoadError: "Configured campers could not be loaded.",
};

export function messages(hass?: Hass): Messages {
  const language = hass?.locale?.language?.toLowerCase() ?? "de";
  return language.startsWith("de") ? de : en;
}

export function formatDate(value: string, hass?: Hass): string {
  const language = (hass?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
  return new Date(value).toLocaleDateString(language);
}

export function statusLabel(status: string, hass?: Hass): string { return messages(hass).statuses[status] ?? status; }
export function categoryLabel(category: string, hass?: Hass): string { return messages(hass).categories[category] ?? category; }
export function formatMoneyMinor(amountMinor: number, currency: string, hass?: Hass): string {
  const language = (hass?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
  return new Intl.NumberFormat(language, { style: "currency", currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amountMinor / 100);
}
export function parseAmountMinor(value: string): number | null {
  const normalized = value.trim().replace(",", ".");
  if (!/^\d+(?:\.\d{1,2})?$/.test(normalized)) return null;
  const [whole, fraction = ""] = normalized.split(".");
  const amount = Number(whole) * 100 + Number((fraction + "00").slice(0, 2));
  return Number.isSafeInteger(amount) ? amount : null;
}
