import type { Hass } from "./api";

type Language = "de" | "en";
/** Canonical wire/database IDs; labels must never be sent to the backend. */
export const EXPENSE_CATEGORY_IDS = ["camping", "fuel", "toll", "parking", "food", "activities", "other"] as const;
export type ExpenseCategory = typeof EXPENSE_CATEGORY_IDS[number];
export const EXPENSE_CATEGORIES = EXPENSE_CATEGORY_IDS;
type Messages = {
  title: string; noDestination: string; loading: string; noTrip: string; loadError: string; statusError: string; summaryTrip: string; summaryChooseTrip: string;
  distance: string; drives: string; stops: string; costs: string; start: string; resume: string; pause: string; complete: string;
  manager: string; newTrip: string; tripName: string; destination: string; create: string; trips: string;
  edit: string; remove: string; details: string; close: string; assignedDrives: string; freeDrives: string; assign: string;
  unassign: string; expenses: string; amount: string; category: string; save: string; deleteCost: string;
  tripDeleteConfirm: string; expenseDeleteConfirm: string; tripCreateError: string; tripEditError: string;
  tripDeleteError: string; expenseCreateError: string; expenseEditError: string; expenseDeleteError: string;
  driveAssignError: string; categories: Record<string, string>; statuses: Record<string, string>;
  amountInvalid: string; categoryInvalid: string; mixedCurrency: string; cancel: string; saving: string; total: string;
  editorVehicle: string; editorChooseVehicle: string; editorLoading: string; editorNoVehicle: string; editorLoadError: string; confirmDelete: string;
  startDate: string; endDate: string; period: string; noDrives: string; driveStart: string; driveEnd: string; duration: string;
  sourceGps: string; sourceManual: string; startLocation: string; endLocation: string; distanceKm: string; durationMinutes: string;
  manualDrive: string; createDrive: string; driveCreateError: string; driveEditError: string; driveDeleteError: string; dateInvalid: string;
  gpxImport: string; gpxPrivacy: string; gpxAnalyzeError: string; gpxImportError: string; gpxConfirm: string; gpxDuplicate: string; gpxSections: string; gpxPoints: string; gpxWarnings: string;
  gpxVehicle: string; gpxVehicleFixed: string; gpxTargetTrip: string; gpxNoTrip: string; gpxSelectTrip: string; gpxSummary: string; gpxSelectedDrives: string; gpxDistance: string; gpxPeriod: string; gpxPeriodWarning: string; gpxGapBoundary: string;
  mapTitle: string; mapDriveSegments: string; mapStart: string; mapEnd: string; mapGap: string; mapTruncated: string; mapNoPoints: string; mapRouteImageAlt: string; mapAttribution: string; mapTilesNotConfigured?: string; mapTilesUnavailable?: string;
};

const de: Messages = {
  title: "Reisetagebuch", noDestination: "Kein Reiseziel", loading: "Reisedaten werden geladen …", noTrip: "Noch keine Reise angelegt.", summaryTrip: "Reise", summaryChooseTrip: "Reise auswählen",
  loadError: "Reisedaten konnten nicht geladen werden.", statusError: "Reisestatus konnte nicht geändert werden.", distance: "Strecke", drives: "Fahrten", stops: "Zwischenstopps", costs: "Kosten", start: "Reise starten", resume: "Reise fortsetzen", pause: "Pausieren", complete: "Abschließen",
  manager: "Reiseverwaltung", newTrip: "Neue Reise", tripName: "Reisename", destination: "Reiseziel", create: "Anlegen", trips: "Reisen", edit: "Bearbeiten", remove: "Löschen", details: "Details", close: "Schließen", assignedDrives: "Fahrten dieser Reise", freeDrives: "Freie Fahrten", assign: "Zuordnen", unassign: "Zuordnung lösen", expenses: "Kosten", amount: "Betrag", category: "Kategorie", save: "Speichern", deleteCost: "Kosten löschen?", tripDeleteConfirm: "Reise löschen? Zugehörige Fahrten bleiben erhalten.", expenseDeleteConfirm: "Kosten löschen?", tripCreateError: "Reise konnte nicht gespeichert werden.", tripEditError: "Reise konnte nicht bearbeitet werden.", tripDeleteError: "Reise konnte nicht gelöscht werden.", expenseCreateError: "Ausgabe konnte nicht gespeichert werden.", expenseEditError: "Kosten konnten nicht bearbeitet werden.", expenseDeleteError: "Kosten konnten nicht gelöscht werden.", driveAssignError: "Fahrt konnte nicht zugeordnet werden.",
  categories: { camping: "Stellplatz/Campingplatz", fuel: "Kraftstoff", toll: "Maut", parking: "Parkgebühren", food: "Verpflegung", activities: "Aktivitäten", other: "Sonstiges" }, statuses: { planned: "geplant", active: "aktiv", paused: "pausiert", completed: "abgeschlossen" }, amountInvalid: "Bitte einen gültigen Betrag mit höchstens zwei Nachkommastellen eingeben.", categoryInvalid: "Bitte eine gültige Kostenkategorie auswählen.", mixedCurrency: "Mehrere Währungen", cancel: "Abbrechen", saving: "Speichern …", total: "Gesamt",
  editorVehicle: "Wohnmobil", editorChooseVehicle: "Wohnmobil auswählen", editorLoading: "Wohnmobile werden geladen …", editorNoVehicle: "Kein eingerichtetes Wohnmobil gefunden.", editorLoadError: "Wohnmobile konnten nicht geladen werden.", confirmDelete: "Nochmals zum Bestätigen klicken", startDate: "Beginn", endDate: "Ende", period: "Reisezeitraum", noDrives: "Noch keine Fahrten erfasst.", driveStart: "Start", driveEnd: "Ende", duration: "Dauer", sourceGps: "GPS-erkannt", sourceManual: "Manuell", startLocation: "Startort", endLocation: "Zielort", distanceKm: "Kilometer", durationMinutes: "Dauer in Minuten", manualDrive: "Manuelle Fahrt", createDrive: "Fahrt anlegen", driveCreateError: "Fahrt konnte nicht gespeichert werden.", driveEditError: "Manuelle Fahrt konnte nicht bearbeitet werden.", driveDeleteError: "Manuelle Fahrt konnte nicht gelöscht werden.", dateInvalid: "Bitte gültige Daten eingeben.", gpxImport: "GPX importieren", gpxPrivacy: "Die Datei wird lokal analysiert; erst die Bestätigung schreibt Daten.", gpxAnalyzeError: "GPX-Datei konnte nicht analysiert werden.", gpxImportError: "GPX-Import konnte nicht abgeschlossen werden.", gpxConfirm: "GPX-Fahrten importieren", gpxDuplicate: "Diese Datei wurde bereits importiert.", gpxSections: "Fahrtabschnitte", gpxPoints: "GPS-Punkte", gpxWarnings: "Hinweise", gpxVehicle: "Fahrzeug", gpxVehicleFixed: "durch diese Karte festgelegt", gpxTargetTrip: "Zielreise", gpxNoTrip: "Keine Reise – freie Fahrten", gpxSelectTrip: "Reise auswählen …", gpxSummary: "Zusammenfassung", gpxSelectedDrives: "ausgewählte Fahrten", gpxDistance: "Kilometer", gpxPeriod: "GPX-Zeitraum", gpxPeriodWarning: "Der GPX-Zeitraum liegt teilweise außerhalb des Reisezeitraums.", gpxGapBoundary: "Mögliche neue Fahrt nach längerer GPS-Lücke", mapTitle: "Camper Travel Journal – Karte", mapDriveSegments: "Fahrtabschnitte", mapStart: "Start", mapEnd: "Ende", mapGap: "GPS-Lücke", mapTruncated: "Route gekürzt", mapNoPoints: "Keine zugeordneten GPS-Punkte für diese Reise.", mapRouteImageAlt: "GPS-Routenkarte", mapAttribution: "© OpenStreetMap-Mitwirkende · GPS-Route, keine Straßenberechnung",
};

const en: Messages = {
  title: "Travel journal", noDestination: "No destination", loading: "Loading travel data …", noTrip: "No trip created yet.", summaryTrip: "Trip", summaryChooseTrip: "Select trip",
  loadError: "Travel data could not be loaded.", statusError: "Trip status could not be changed.", distance: "Distance", drives: "Drives", stops: "Stops", costs: "Costs", start: "Start trip", resume: "Resume trip", pause: "Pause", complete: "Complete",
  manager: "Trip management", newTrip: "New trip", tripName: "Trip name", destination: "Destination", create: "Create", trips: "Trips", edit: "Edit", remove: "Delete", details: "Details", close: "Close", assignedDrives: "Drives in this trip", freeDrives: "Unassigned drives", assign: "Assign", unassign: "Unassign", expenses: "Costs", amount: "Amount", category: "Category", save: "Save", deleteCost: "Delete cost?", tripDeleteConfirm: "Delete trip? Assigned drives will be kept.", expenseDeleteConfirm: "Delete cost?", tripCreateError: "Trip could not be saved.", tripEditError: "Trip could not be edited.", tripDeleteError: "Trip could not be deleted.", expenseCreateError: "Cost could not be saved.", expenseEditError: "Cost could not be edited.", expenseDeleteError: "Cost could not be deleted.", driveAssignError: "Drive could not be assigned.",
  categories: { camping: "Camping site", fuel: "Fuel", toll: "Toll", parking: "Parking fees", food: "Food", activities: "Activities", other: "Other" }, statuses: { planned: "planned", active: "active", paused: "paused", completed: "completed" }, amountInvalid: "Enter a valid amount with no more than two decimal places.", categoryInvalid: "Select a valid cost category.", mixedCurrency: "Multiple currencies", cancel: "Cancel", saving: "Saving …", total: "Total",
  editorVehicle: "Camper", editorChooseVehicle: "Select camper", editorLoading: "Loading campers …", editorNoVehicle: "No configured camper found.", editorLoadError: "Configured campers could not be loaded.", confirmDelete: "Click again to confirm", startDate: "Start", endDate: "End", period: "Travel period", noDrives: "No drives recorded yet.", driveStart: "Start", driveEnd: "End", duration: "Duration", sourceGps: "GPS detected", sourceManual: "Manual", startLocation: "Start location", endLocation: "Destination", distanceKm: "Distance in km", durationMinutes: "Duration", manualDrive: "Manual drive", createDrive: "Create drive", driveCreateError: "Drive could not be saved.", driveEditError: "Manual drive could not be edited.", driveDeleteError: "Drive could not be deleted.", dateInvalid: "Enter valid dates.", gpxImport: "Import GPX", gpxPrivacy: "The file is analyzed locally; data is written only after confirmation.", gpxAnalyzeError: "The GPX file could not be analyzed.", gpxImportError: "The GPX import could not be completed.", gpxConfirm: "Import GPX drives", gpxDuplicate: "This file was already imported.", gpxSections: "drive sections", gpxPoints: "GPS points", gpxWarnings: "Notes", gpxVehicle: "Camper", gpxVehicleFixed: "fixed by this card", gpxTargetTrip: "Target trip", gpxNoTrip: "No trip – unassigned drives", gpxSelectTrip: "Select trip …", gpxSummary: "Summary", gpxSelectedDrives: "selected drives", gpxDistance: "kilometers", gpxPeriod: "GPX period", gpxPeriodWarning: "The GPX period is partly outside the trip period.", gpxGapBoundary: "Possible new drive after a long GPS gap", mapTitle: "Camper Travel Journal – Map", mapDriveSegments: "Drive segments", mapStart: "Start", mapEnd: "End", mapGap: "GPS gap", mapTruncated: "Route truncated", mapNoPoints: "No associated GPS points for this trip.", mapRouteImageAlt: "GPS route map", mapAttribution: "© OpenStreetMap contributors · GPS track, no road routing",
};

export function messages(hass?: Hass): Messages {
  const language = hass?.locale?.language?.toLowerCase() ?? "de";
  return language.startsWith("de") ? de : en;
}

function localeFor(hass?: Hass): string {
  return (hass?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de-DE" : "en-US";
}

/** Format an ISO calendar date without parsing it as a UTC/local Date. */
export function formatDate(value: string, hass?: Hass): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (match) {
    const [, year, month, day] = match;
    return localeFor(hass).startsWith("de") ? `${day}.${month}.${year}` : `${month}/${day}/${year}`;
  }
  return new Date(value).toLocaleDateString(localeFor(hass));
}
export function formatDateTime(value: string, hass?: Hass): string {
  return new Date(value).toLocaleString(localeFor(hass), { dateStyle: "short", timeStyle: "short" });
}
export function formatDuration(seconds: number | undefined, hass?: Hass): string {
  const minutes = Math.max(0, Math.round((seconds ?? 0) / 60));
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  return `${hours} h ${minutes % 60} min`;
}
export function formatTripPeriod(trip: { start_date?: string | null; end_date?: string | null; started_at?: string; ended_at?: string | null }, hass?: Hass): string {
  if (trip.start_date || trip.end_date) return [trip.start_date, trip.end_date].filter(Boolean).map((value) => formatDate(value!, hass)).join(" – ") || "";
  if (trip.started_at) return `${formatDate(trip.started_at, hass)}${trip.ended_at ? ` – ${formatDate(trip.ended_at, hass)}` : ""}`;
  return "";
}

export function statusLabel(status: string, hass?: Hass): string { return messages(hass).statuses[status] ?? status; }
export function categoryLabel(category: string, hass?: Hass): string { return messages(hass).categories[category] ?? category; }
export function isExpenseCategory(value: string): value is ExpenseCategory { return (EXPENSE_CATEGORY_IDS as readonly string[]).includes(value); }
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
