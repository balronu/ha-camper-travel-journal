import type { Hass } from "./api";

type Language = "de" | "en";
/** Canonical wire/database IDs; labels must never be sent to the backend. */
export const EXPENSE_CATEGORY_IDS = ["camping", "fuel", "toll", "parking", "food", "activities", "water_waste", "other"] as const;
export const EXPENSE_SERVICE_IDS = ["electricity", "fresh_water", "grey_water", "toilet_cassette", "shower"] as const;
export type ExpenseCategory = typeof EXPENSE_CATEGORY_IDS[number];
export const EXPENSE_CATEGORIES = EXPENSE_CATEGORY_IDS;
type Messages = {
  [key: string]: unknown;
  staySince?: string; stayOngoing?: string;
  title: string; noDestination: string; loading: string; noTrip: string; loadError: string; statusError: string; summaryTrip: string; summaryChooseTrip: string;
  distance: string; drives: string; stops: string; costs: string; start: string; resume: string; pause: string; complete: string;
  manager: string; newTrip: string; tripName: string; destination: string; create: string; trips: string;
  edit: string; remove: string; details: string; close: string; assignedDrives: string; freeDrives: string; assign: string;
  unassign: string; expenses: string; amount: string; category: string; save: string; deleteCost: string;
  tripDeleteConfirm: string; expenseDeleteConfirm: string; tripCreateError: string; tripEditError: string;
  tripDeleteError: string; expenseCreateError: string; expenseEditError: string; expenseDeleteError: string;
  driveAssignError: string; savedRefreshError: string; categories: Record<string, string>; statuses: Record<string, string>;
  amountInvalid: string; categoryInvalid: string; mixedCurrency: string; cancel: string; saving: string; total: string;
  expenseDate?: string; expenseDateUnknown?: string; expenseTime?: string; time?: string; fuelLiters?: string; fuelPrice?: string; services?: string;
  editorVehicle: string; editorChooseVehicle: string; editorLoading: string; editorNoVehicle: string; editorLoadError: string; confirmDelete: string;
  startDate: string; endDate: string; period: string; noDrives: string; driveStart: string; driveEnd: string; duration: string;
  sourceGps: string; sourceGpx?: string; sourceManual: string; startLocation: string; endLocation: string; distanceKm: string; durationMinutes: string;
  manualDrive: string; createDrive: string; driveCreateError: string; driveEditError: string; driveDeleteError: string; driveDelete?: string; driveDeleteTitle?: string; driveDeleteQuestion?: string; driveDeleteConfirm?: string; driveDeleteEffects?: string; driveDate?: string; dateInvalid: string;
  gpxImport: string; gpxPrivacy: string; gpxAnalyzeError: string; gpxImportError: string; gpxConfirm: string; gpxDuplicate: string; gpxSections: string; gpxPoints: string; gpxWarnings: string;
  gpxVehicle: string; gpxVehicleFixed: string; gpxTargetTrip: string; gpxNoTrip: string; gpxSelectTrip: string; gpxSummary: string; gpxSelectedDrives: string; gpxDistance: string; gpxPeriod: string; gpxPeriodWarning: string; gpxGapBoundary: string;
  mapTitle: string; mapVehicle?: string; mapTrip?: string; mapTotalDistance?: string; mapSelectedDrives?: string; mapTripPeriod?: string; mapDriveSegments: string; mapExpandSegments?: string; mapCollapseSegments?: string; mapSelectAll?: string; mapSelectNone?: string; mapStart: string; mapEnd: string; mapGap: string; mapTruncated: string; mapNoPoints: string; mapNoValidPoints?: string; mapNoRouteWithPlaces?: string; mapRouteImageAlt: string; mapAttribution: string; mapTilesNotConfigured?: string; mapTilesUnavailable?: string; mapAddPlace?: string; mapCancelPlace?: string; mapPlaceHint?: string; interruption?: string; interruptionUnconfirmed?: string; recordInterruption?: string; suggestedPosition?: string;
  pdfExportTitle: string; pdfExportTrip: string; pdfExport: string; pdfExporting: string; pdfExportError: string;
  overnights?: string; overnightPlaces?: string; gpsSuggestions?: string; generateSuggestions?: string; accept?: string; dismiss?: string; noSuggestions?: string; places?: string; placesAndStays?: string; unassignedInterruptions?: string; noPlaces?: string; placeName?: string; placeCategory?: string; placeArrived?: string; placeDeparted?: string; placeAddress?: string; placeWebsite?: string; placeWebsiteOpen?: string; placeDescription?: string; placeOther?: string; placeRestaurant?: string; placeFuel?: string; placeAttraction?: string; placeFerry?: string; placeCampsite?: string; placeRvSite?: string; placeWildCamp?: string; ratingAdd?: string; ratingEdit?: string; ratingOverall?: string; ratingAccess?: string; ratingSpace?: string; ratingFacilities?: string; ratingSurroundings?: string; ratingComment?: string; placeSaveError?: string; placeDeleteError?: string; ratingInvalid?: string; ratingSaveError?: string;
  journalEntry?: string; journalEntryHint?: string; journalSelect?: string; journalChoose?: string; journalOpen?: string; journalOpenTrip?: string; journalClose?: string; journalOverview?: string; journalDrives?: string; journalStopsHint?: string; journalOvernightHint?: string; noInterruptions?: string; notAvailable?: string; unsavedTripChange?: string; migrationTitle?: string; migrationText?: string; migrationLink?: string; tripActions?: string; tripReactivate?: string; tripDeleteTitle?: string; tripDeleteDrives?: string; tripDeleteLinkedData?: string;
  editorModules?: string; editorModulesHint?: string; moduleMoveUp?: string; moduleMoveDown?: string; modulePosition?: string; moduleOf?: string; modulePlanned?: string; modulePlannedHint?: string; module_overview?: string; module_drives?: string; module_stays?: string; module_expenses?: string; module_map?: string; module_gpx?: string; module_pdf?: string; module_tankbook?: string;
};

const de: Messages = {
  staySince: "Seit", stayOngoing: "Aufenthalt läuft",
  title: "Reisetagebuch", noDestination: "Kein Reiseziel", loading: "Reisedaten werden geladen …", noTrip: "Noch keine Reise angelegt.", summaryTrip: "Reise", summaryChooseTrip: "Reise auswählen", journalEntry: "Reise auswählen oder neu anlegen", journalEntryHint: "Öffne eine Reise, um ihre Fahrten, Orte, Karte und Exporte zu sehen.", journalSelect: "Reise auswählen", journalChoose: "Bitte auswählen …", journalOpen: "Reise öffnen", journalOpenTrip: "Geöffnete Reise", journalClose: "Reise wechseln", journalOverview: "Reiseübersicht", journalDrives: "Fahrten und Unterbrechungen", journalStopsHint: "Bestätigte Zwischenstopps dieser Reise.", journalOvernightHint: "Übernachtungsplätze und ihre Bewertungen werden im Ortsbereich verwaltet.", noInterruptions: "Keine Unterbrechungen zwischen Fahrten.", notAvailable: "Nicht verfügbar", unsavedTripChange: "Ungespeicherte Änderungen verwerfen?", migrationTitle: "WICHTIG: DIE LOVELACE-KARTEN HABEN SICH GEÄNDERT!", migrationText: "Ab Version 0.3.0 werden neue Dashboards mit der zentralen Karte Camper Travel Journal – Reisetagebuch eingerichtet. Diese bisherige Karte bleibt aus Kompatibilitätsgründen funktionsfähig, wird aber nicht mehr für neue Dashboards empfohlen.", migrationLink: "Migrationsanleitung", tripActions: "Reiseaktionen", tripReactivate: "Reise wieder aktivieren", tripDeleteTitle: "Reise löschen?", tripDeleteDrives: "Zugeordnete Fahrten bleiben erhalten.", tripDeleteLinkedData: "Kosten und Orte bleiben erhalten, verlieren aber ihre Reisezuordnung.",
  loadError: "Reisedaten konnten nicht geladen werden.", statusError: "Reisestatus konnte nicht geändert werden.", distance: "Strecke", drives: "Fahrten", stops: "Zwischenstopps", costs: "Kosten", start: "Reise starten", resume: "Reise fortsetzen", pause: "Pausieren", complete: "Abschließen",
  manager: "Reiseverwaltung", newTrip: "Neue Reise", tripName: "Reisename", destination: "Reiseziel", create: "Anlegen", trips: "Reisen", edit: "Bearbeiten", remove: "Löschen", details: "Details", close: "Schließen", assignedDrives: "Fahrten dieser Reise", freeDrives: "Freie Fahrten", assign: "Zuordnen", unassign: "Zuordnung lösen", expenses: "Kosten", amount: "Betrag", category: "Kategorie", save: "Speichern", deleteCost: "Kosten löschen?", tripDeleteConfirm: "Die Reise wird gelöscht. Dieser Vorgang kann nicht rückgängig gemacht werden.", expenseDeleteConfirm: "Kosten löschen?", tripCreateError: "Reise konnte nicht gespeichert werden.", tripEditError: "Reise konnte nicht bearbeitet werden.", tripDeleteError: "Reise konnte nicht gelöscht werden.", expenseCreateError: "Ausgabe konnte nicht gespeichert werden.", expenseEditError: "Kosten konnten nicht bearbeitet werden.", expenseDeleteError: "Kosten konnten nicht gelöscht werden.", driveAssignError: "Fahrt konnte nicht zugeordnet werden.", savedRefreshError: "Gespeichert. Die Ansicht konnte anschließend nicht aktualisiert werden. Bitte später erneut laden.",
  categories: { camping: "Stellplatz/Campingplatz", fuel: "Kraftstoff", toll: "Maut", parking: "Parkgebühren", food: "Verpflegung", activities: "Aktivitäten", other: "Sonstiges" }, statuses: { planned: "geplant", active: "aktiv", paused: "pausiert", completed: "abgeschlossen" }, amountInvalid: "Bitte einen gültigen Betrag mit höchstens zwei Nachkommastellen eingeben.", categoryInvalid: "Bitte eine gültige Kostenkategorie auswählen.", mixedCurrency: "Mehrere Währungen", cancel: "Abbrechen", saving: "Speichern …", total: "Gesamt", expenseDate: "Tatsächliches Ausgabendatum", expenseDateUnknown: "Ausgabendatum unbekannt", expenseTime: "Uhrzeit erfassen", time: "Uhrzeit", fuelLiters: "Getankte Liter (l)", fuelPrice: "Literpreis (€/l)", pdfExportTitle: "PDF-Reisebericht", pdfExportTrip: "Reise für PDF auswählen", pdfExport: "PDF exportieren", pdfExporting: "PDF wird erstellt …", pdfExportError: "PDF-Reisebericht konnte nicht erstellt werden.",
  editorVehicle: "Wohnmobil", editorChooseVehicle: "Wohnmobil auswählen", editorLoading: "Wohnmobile werden geladen …", editorNoVehicle: "Kein eingerichtetes Wohnmobil gefunden.", editorLoadError: "Wohnmobile konnten nicht geladen werden.", confirmDelete: "Nochmals zum Bestätigen klicken", startDate: "Beginn", endDate: "Ende", period: "Reisezeitraum", noDrives: "Noch keine Fahrten erfasst.", driveStart: "Start", driveEnd: "Ende", duration: "Dauer", sourceGps: "GPS-erkannt", sourceManual: "Manuell", startLocation: "Startort", endLocation: "Zielort", distanceKm: "Kilometer", durationMinutes: "Dauer in Minuten", manualDrive: "Manuelle Fahrt", createDrive: "Fahrt anlegen", driveCreateError: "Fahrt konnte nicht gespeichert werden.", driveEditError: "Manuelle Fahrt konnte nicht bearbeitet werden.", driveDeleteError: "Manuelle Fahrt konnte nicht gelöscht werden.", dateInvalid: "Bitte gültige Daten eingeben.", gpxImport: "GPX importieren", gpxPrivacy: "Die Datei wird lokal analysiert; erst die Bestätigung schreibt Daten.", gpxAnalyzeError: "GPX-Datei konnte nicht analysiert werden.", gpxImportError: "GPX-Import konnte nicht abgeschlossen werden.", gpxConfirm: "GPX-Fahrten importieren", gpxDuplicate: "Diese Datei wurde bereits importiert.", gpxSections: "Fahrtabschnitte", gpxPoints: "GPS-Punkte", gpxWarnings: "Hinweise", gpxVehicle: "Fahrzeug", gpxVehicleFixed: "durch diese Karte festgelegt", gpxTargetTrip: "Zielreise", gpxNoTrip: "Keine Reise – freie Fahrten", gpxSelectTrip: "Reise auswählen …", gpxSummary: "Zusammenfassung", gpxSelectedDrives: "ausgewählte Fahrten", gpxDistance: "Kilometer", gpxPeriod: "GPX-Zeitraum", gpxPeriodWarning: "Der GPX-Zeitraum liegt teilweise außerhalb des Reisezeitraums.", gpxGapBoundary: "Mögliche neue Fahrt nach längerer GPS-Lücke", mapTitle: "Camper Travel Journal – Karte", mapDriveSegments: "Fahrtabschnitte", mapStart: "Start", mapEnd: "Ende", mapGap: "GPS-Lücke", mapTruncated: "Route gekürzt", mapNoPoints: "Keine zugeordneten GPS-Punkte für diese Reise.", mapRouteImageAlt: "GPS-Routenkarte", mapAttribution: "© OpenStreetMap-Mitwirkende · GPS-Route, keine Straßenberechnung",
};

const en: Messages = {
  staySince: "Since", stayOngoing: "Stay ongoing",
  title: "Travel journal", noDestination: "No destination", loading: "Loading travel data …", noTrip: "No trip created yet.", summaryTrip: "Trip", summaryChooseTrip: "Select trip", journalEntry: "Select or create a trip", journalEntryHint: "Open a trip to see its drives, places, map and exports.", journalSelect: "Select trip", journalChoose: "Choose …", journalOpen: "Open trip", journalOpenTrip: "Open trip", journalClose: "Switch trip", journalOverview: "Trip overview", journalDrives: "Drives and interruptions", journalStopsHint: "Confirmed stops belonging to this trip.", journalOvernightHint: "Overnight places and their ratings are managed in the places area.", noInterruptions: "No gaps between drives.", notAvailable: "Not available", unsavedTripChange: "Discard unsaved changes?", migrationTitle: "IMPORTANT: THE LOVELACE CARDS HAVE CHANGED!", migrationText: "From version 0.3.0, new dashboards should use the central Camper Travel Journal card. This legacy card remains functional for compatibility, but is no longer recommended for new dashboards.", migrationLink: "Migration guide", tripActions: "Trip actions", tripReactivate: "Reactivate trip", tripDeleteTitle: "Delete trip?", tripDeleteDrives: "Assigned drives will be kept.", tripDeleteLinkedData: "Costs and places will be kept but lose their trip assignment.",
  loadError: "Travel data could not be loaded.", statusError: "Trip status could not be changed.", distance: "Distance", drives: "Drives", stops: "Stops", costs: "Costs", start: "Start trip", resume: "Resume trip", pause: "Pause", complete: "Complete",
  manager: "Trip management", newTrip: "New trip", tripName: "Trip name", destination: "Destination", create: "Create", trips: "Trips", edit: "Edit", remove: "Delete", details: "Details", close: "Close", assignedDrives: "Drives in this trip", freeDrives: "Unassigned drives", assign: "Assign", unassign: "Unassign", expenses: "Costs", amount: "Amount", category: "Category", save: "Save", deleteCost: "Delete cost?", tripDeleteConfirm: "The trip will be deleted. This cannot be undone.", expenseDeleteConfirm: "Delete cost?", tripCreateError: "Trip could not be saved.", tripEditError: "Trip could not be edited.", tripDeleteError: "Trip could not be deleted.", expenseCreateError: "Cost could not be saved.", expenseEditError: "Cost could not be edited.", expenseDeleteError: "Cost could not be deleted.", driveAssignError: "Drive could not be assigned.", savedRefreshError: "Saved, but the view could not be refreshed. Please reload later.",
  categories: { camping: "Camping site", fuel: "Fuel", toll: "Toll", parking: "Parking fees", food: "Food", activities: "Activities", other: "Other" }, statuses: { planned: "planned", active: "active", paused: "paused", completed: "completed" }, amountInvalid: "Enter a valid amount with no more than two decimal places.", categoryInvalid: "Select a valid cost category.", mixedCurrency: "Multiple currencies", cancel: "Cancel", saving: "Saving …", total: "Total", expenseDate: "Actual expense date", expenseDateUnknown: "Expense date unknown", expenseTime: "Record time", time: "Time", fuelLiters: "Fuel quantity (l)", fuelPrice: "Price per liter (€/l)", pdfExportTitle: "PDF travel report", pdfExportTrip: "Select trip for PDF", pdfExport: "Export PDF", pdfExporting: "Creating PDF …", pdfExportError: "The PDF travel report could not be created.",
  editorVehicle: "Camper", editorChooseVehicle: "Select camper", editorLoading: "Loading campers …", editorNoVehicle: "No configured camper found.", editorLoadError: "Configured campers could not be loaded.", confirmDelete: "Click again to confirm", startDate: "Start", endDate: "End", period: "Travel period", noDrives: "No drives recorded yet.", driveStart: "Start", driveEnd: "End", duration: "Duration", sourceGps: "GPS detected", sourceManual: "Manual", startLocation: "Start location", endLocation: "Destination", distanceKm: "Distance in km", durationMinutes: "Duration", manualDrive: "Manual drive", createDrive: "Create drive", driveCreateError: "Drive could not be saved.", driveEditError: "Manual drive could not be edited.", driveDeleteError: "Drive could not be deleted.", dateInvalid: "Enter valid dates.", gpxImport: "Import GPX", gpxPrivacy: "The file is analyzed locally; data is written only after confirmation.", gpxAnalyzeError: "The GPX file could not be analyzed.", gpxImportError: "The GPX import could not be completed.", gpxConfirm: "Import GPX drives", gpxDuplicate: "This file was already imported.", gpxSections: "drive sections", gpxPoints: "GPS points", gpxWarnings: "Notes", gpxVehicle: "Camper", gpxVehicleFixed: "fixed by this card", gpxTargetTrip: "Target trip", gpxNoTrip: "No trip – unassigned drives", gpxSelectTrip: "Select trip …", gpxSummary: "Summary", gpxSelectedDrives: "selected drives", gpxDistance: "kilometers", gpxPeriod: "GPX period", gpxPeriodWarning: "The GPX period is partly outside the trip period.", gpxGapBoundary: "Possible new drive after a long GPS gap", mapTitle: "Camper Travel Journal – Map", mapDriveSegments: "Drive segments", mapStart: "Start", mapEnd: "End", mapGap: "GPS gap", mapTruncated: "Route truncated", mapNoPoints: "No associated GPS points for this trip.", mapRouteImageAlt: "GPS route map", mapAttribution: "© OpenStreetMap contributors · GPS track, no road routing",
};

const mapLabels: Record<"de" | "en", Partial<Messages>> = {
  de: {
    editorModules: "Journal-Module", editorModulesHint: "Sichtbare Bereiche auswählen und ihre Reihenfolge festlegen.", moduleMoveUp: "Nach oben", moduleMoveDown: "Nach unten", modulePosition: "Position", moduleOf: "von", modulePlanned: "geplant", modulePlannedHint: "Dieses Modul ist für eine spätere Version vorgemerkt. In dieser Beta werden keine Tankdaten und keine Providerabfragen verwendet.", module_overview: "Reiseübersicht", module_drives: "Fahrten", module_stays: "Orte & Aufenthalte", module_expenses: "Kosten", module_map: "Reisekarte", module_gpx: "GPX", module_pdf: "PDF-Export", module_tankbook: "Tankbuch",
    categories: { camping: "Stellplatz/Campingplatz", fuel: "Kraftstoff", toll: "Maut", parking: "Parkgebühren", food: "Verpflegung", activities: "Aktivitäten", water_waste: "Ver- & Entsorgung", other: "Sonstiges" }, services: "Leistungen (optional)",
    mapNoValidPoints: "Für diese Reise sind keine gültigen GPS-Punkte verfügbar.", mapNoRouteWithPlaces: "Keine gültige GPS-Route verfügbar; gespeicherte Orte werden angezeigt.",
    mapTitle: "Reisekarte", mapVehicle: "Fahrzeug", mapTrip: "Reise", mapTotalDistance: "Kilometer",
    mapSelectedDrives: "Fahrtabschnitte", mapTripPeriod: "Reisezeitraum", mapPlaces: "Orte anzeigen", mapExpandSegments: "Fahrtabschnitte aufklappen",
    overnights: "Übernachtungen", overnightPlaces: "Übernachtungsplätze", gpsSuggestions: "GPS-Stoppvorschläge", generateSuggestions: "Vorschläge aktualisieren", accept: "Übernehmen", dismiss: "Verwerfen", noSuggestions: "Keine offenen Vorschläge.", places: "Orte und Zwischenstopps", placesAndStays: "Orte & Aufenthalte", unassignedInterruptions: "Nicht zugeordnete Fahrtunterbrechungen", noPlaces: "Keine Orte gespeichert.", placeName: "Name", placeCategory: "Kategorie", placeArrived: "Ankunft", placeDeparted: "Abfahrt", placeAddress: "Adresse", placeWebsite: "Webseite (optional)", placeWebsiteOpen: "Webseite öffnen", placeDescription: "Beschreibung und Notizen", placeOther: "Sonstiger Ort", placeRestaurant: "Restaurant", placeFuel: "Tankpause", placeAttraction: "Sehenswürdigkeit", placeFerry: "Fähre", placeCampsite: "Campingplatz", placeRvSite: "Wohnmobilstellplatz", placeWildCamp: "Freistehplatz", ratingAdd: "Bewerten", ratingEdit: "Bewertung bearbeiten", ratingOverall: "Gesamtbewertung", ratingAccess: "Anfahrt", ratingSpace: "Platzgröße", ratingFacilities: "Ausstattung", ratingSurroundings: "Umgebung", ratingComment: "Kommentar", placeSaveError: "Ort konnte nicht gespeichert werden.", placeDeleteError: "Ort konnte nicht gelöscht werden.", ratingInvalid: "Bewertung muss zwischen 1 und 5 liegen.", ratingSaveError: "Bewertung konnte nicht gespeichert werden.",
    mapCollapseSegments: "Fahrtabschnitte zuklappen", mapSelectAll: "Alle auswählen", mapSelectNone: "Alle abwählen", sourceGpx: "GPX-importiert", mapAddPlace: "Ort hinzufügen", mapCancelPlace: "Ortserfassung abbrechen", mapPlaceHint: "Kartenpunkt auswählen; erst nach ausdrücklichem Speichern wird ein Ort angelegt.", interruption: "Unterbrechung zwischen Fahrten", interruptionUnconfirmed: "Nicht als Aufenthalt nachgewiesen", recordInterruption: "Als Aufenthalt erfassen", suggestedPosition: "Vorgeschlagene Position", expenseNote: "Bemerkung (optional)", expenseNoteHint: "Bis zu 2.000 Zeichen, Zeilenumbrüche sind möglich.",
  },
  en: {
    editorModules: "Journal modules", editorModulesHint: "Choose visible sections and arrange their order.", moduleMoveUp: "Move up", moduleMoveDown: "Move down", modulePosition: "Position", moduleOf: "of", modulePlanned: "planned", modulePlannedHint: "This module is reserved for a future release. No tank data or provider request is used in this beta.", module_overview: "Trip overview", module_drives: "Drives", module_stays: "Places & stays", module_expenses: "Costs", module_map: "Travel map", module_gpx: "GPX", module_pdf: "PDF export", module_tankbook: "Fuel log",
    categories: { camping: "Camping site", fuel: "Fuel", toll: "Toll", parking: "Parking fees", food: "Food", activities: "Activities", water_waste: "Water & waste services", other: "Other" }, services: "Services (optional)",
    mapNoValidPoints: "No valid GPS points are available for this trip.", mapNoRouteWithPlaces: "No valid GPS route is available; saved places are shown.",
    mapTitle: "Travel map", mapVehicle: "Camper", mapTrip: "Trip", mapTotalDistance: "Kilometers",
    mapSelectedDrives: "Drive sections", mapTripPeriod: "Trip period", mapPlaces: "Show places", mapExpandSegments: "Expand drive sections",
    overnights: "Overnights", overnightPlaces: "Overnight places", gpsSuggestions: "GPS stop suggestions", generateSuggestions: "Refresh suggestions", accept: "Accept", dismiss: "Dismiss", noSuggestions: "No open suggestions.", places: "Places and stops", placesAndStays: "Places & stays", unassignedInterruptions: "Unassigned drive interruptions", noPlaces: "No places saved.", placeName: "Name", placeCategory: "Category", placeArrived: "Arrival", placeDeparted: "Departure", placeAddress: "Address", placeWebsite: "Website (optional)", placeWebsiteOpen: "Open website", placeDescription: "Description and notes", placeOther: "Other place", placeRestaurant: "Restaurant", placeFuel: "Fuel stop", placeAttraction: "Attraction", placeFerry: "Ferry", placeCampsite: "Campsite", placeRvSite: "RV site", placeWildCamp: "Wild camping", ratingAdd: "Rate", ratingEdit: "Edit rating", ratingOverall: "Overall rating", ratingAccess: "Access", ratingSpace: "Space", ratingFacilities: "Facilities", ratingSurroundings: "Surroundings", ratingComment: "Comment", placeSaveError: "Place could not be saved.", placeDeleteError: "Place could not be deleted.", ratingInvalid: "Rating must be between 1 and 5.", ratingSaveError: "Rating could not be saved.",
    mapCollapseSegments: "Collapse drive sections", mapSelectAll: "Select all", mapSelectNone: "Select none", sourceGpx: "GPX imported", mapAddPlace: "Add place", mapCancelPlace: "Cancel place capture", mapPlaceHint: "Select a map point; a place is created only after explicit saving.", interruption: "Gap between drives", interruptionUnconfirmed: "Not proven to be a stay", recordInterruption: "Record as stay", suggestedPosition: "Suggested position", expenseNote: "Note (optional)", expenseNoteHint: "Up to 2,000 characters; line breaks are supported.",
  },
};

export function messages(hass?: Hass): Messages {
  const language = hass?.locale?.language?.toLowerCase() ?? "de";
  return { ...(language.startsWith("de") ? de : en), ...(language.startsWith("de") ? mapLabels.de : mapLabels.en) };
}

/** Translate backend tankbook diagnostics without exposing internal reason codes. */
export function tankbookDiagnostic(note: string | undefined, hass?: Hass, validResult = false): { prefix: string; text: string } | undefined {
  if (!note) return undefined;
  const german = (hass?.locale?.language ?? "").toLowerCase().startsWith("de");
  const [code, detail = ""] = note.split(":", 2);
  const gaps = detail.split(",").filter(Boolean).map((gap) => ({
    start_boundary: german ? "am Intervallbeginn" : "at the interval start",
    end_boundary: german ? "am Intervallende" : "at the interval end",
    drive_boundary: german ? "bei einer Grenzfahrt" : "on a boundary-crossing drive",
  }[gap] ?? (german ? "in einem Teilbereich" : "in part of the interval")));
  const labels: Record<string, string> = german ? {
    gps_distance_is_estimated: "Fahrstrecke anhand von GPS-Daten geschätzt",
    gps_coverage_incomplete: gaps.length ? `GPS-Daten unvollständig (${gaps.join(", ")})` : "GPS-Daten unvollständig",
    distance_missing: "Keine geeigneten GPS-Fahrten vorhanden",
    odometer_invalid: "Unplausible Kilometerstände",
  } : {
    gps_distance_is_estimated: "Distance estimated from GPS data",
    gps_coverage_incomplete: gaps.length ? `GPS data incomplete (${gaps.join(", ")})` : "GPS data incomplete",
    distance_missing: "No suitable GPS drives available",
    odometer_invalid: "Odometer readings are implausible",
  };
  return { prefix: validResult && code === "gps_distance_is_estimated" ? (german ? "Hinweis" : "Note") : (german ? "Grund" : "Reason"), text: labels[code] ?? (german ? "Verbrauch nicht zuverlässig bestimmbar" : "Consumption cannot be determined reliably") };
}

export function driveDeleteMessages(hass?: Hass) {
  return (hass?.locale?.language ?? "").toLowerCase().startsWith("de")
    ? { label: "Fahrt löschen", title: "Fahrt löschen?", question: "Möchtest du diese Fahrt wirklich löschen?", confirm: "Fahrt löschen", effects: "Die Fahrt wird entfernt. GPS-Rohpunkte, Kosten, Aufenthalte und Reisen bleiben erhalten; dieselbe Fahrt wird nicht automatisch neu erzeugt.", date: "Datum / Uhrzeit" }
    : { label: "Delete drive", title: "Delete drive?", question: "Do you really want to delete this drive?", confirm: "Delete drive", effects: "The drive is removed. Raw GPS points, costs, stays, and trips remain; the same drive will not be recreated automatically.", date: "Date / time" };
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
export function formatTime(value: string, hass?: Hass): string {
  return new Date(value).toLocaleTimeString(localeFor(hass), { hour: "2-digit", minute: "2-digit" });
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
export function formatCompactTripPeriod(trip: { start_date?: string | null; end_date?: string | null; started_at?: string; ended_at?: string | null }, hass?: Hass): string {
  const start = trip.start_date || trip.started_at;
  const end = trip.end_date || trip.ended_at;
  if (!start && !end) return "";
  const calendarDate = (value: string) => {
    const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
    return match ? new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3])) : new Date(value);
  };
  const first = calendarDate(start || end || "");
  const second = calendarDate(end || start || "");
  if (Number.isNaN(first.getTime()) || Number.isNaN(second.getTime())) return formatTripPeriod(trip, hass);
  const german = (hass?.locale?.language ?? "").toLowerCase().startsWith("de");
  if (!german) {
    const month = new Intl.DateTimeFormat("en-US", { month: "short" });
    const day = (value: Date) => value.getDate();
    const year = (value: Date) => value.getFullYear();
    if (year(first) === year(second) && first.getMonth() === second.getMonth()) return `${month.format(first)} ${day(first)}–${day(second)}, ${year(first)}`;
    if (year(first) === year(second)) return `${month.format(first)} ${day(first)}–${month.format(second)} ${day(second)}, ${year(first)}`;
    return `${month.format(first)} ${day(first)}, ${year(first)}–${month.format(second)} ${day(second)}, ${year(second)}`;
  }
  const compact = (value: Date) => `${String(value.getDate()).padStart(2, "0")}.${String(value.getMonth() + 1).padStart(2, "0")}.${String(value.getFullYear()).slice(-2)}`;
  if (first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth()) return `${String(first.getDate()).padStart(2, "0")}.–${compact(second).slice(0, 2)}.${String(second.getMonth() + 1).padStart(2, "0")}.${String(second.getFullYear()).slice(-2)}`;
  return `${compact(first)}–${compact(second)}`;
}

export function statusLabel(status: string, hass?: Hass): string { return messages(hass).statuses[status] ?? status; }
export function categoryLabel(category: string, hass?: Hass): string { return messages(hass).categories[category] ?? category; }
export function serviceLabel(service: string, hass?: Hass): string {
  const german = (hass?.locale?.language ?? "").toLowerCase().startsWith("de");
  const labels: Record<string, string> = german
    ? { electricity: "Strom / Landstrom", fresh_water: "Frischwasser auffüllen", grey_water: "Grauwasser entsorgen", toilet_cassette: "Toilettenkassette entsorgen", shower: "Dusche" }
    : { electricity: "Electricity / shore power", fresh_water: "Refill fresh water", grey_water: "Dispose of grey water", toilet_cassette: "Dispose of toilet cassette", shower: "Shower" };
  return labels[service] ?? service;
}
const LEGACY_EXPENSE_CATEGORY_IDS: Record<string, ExpenseCategory> = {
  "Stellplatz/Campingplatz": "camping", Campingplatz: "camping", "Camping site": "camping", camping: "camping",
  Kraftstoff: "fuel", Fuel: "fuel", fuel: "fuel", Maut: "toll", Toll: "toll", toll: "toll",
  Parkplatz: "parking", Parkgebühren: "parking", Parking: "parking", "Parking fees": "parking", parking: "parking", Essen: "food", Verpflegung: "food", Food: "food", food: "food",
  Aktivitäten: "activities", Activities: "activities", activities: "activities", Sonstiges: "other", Other: "other", other: "other",
};
export function normalizeExpenseCategory(value: string | undefined | null): string { const raw = (value ?? "").trim(); return LEGACY_EXPENSE_CATEGORY_IDS[raw] ?? raw; }
export function placeCategoryLabel(category: string | undefined, hass?: Hass): string {
  const lang = messages(hass);
  const labels: Record<string, string | undefined> = {
    other: lang.placeOther, restaurant: lang.placeRestaurant, fuel_stop: lang.placeFuel,
    attraction: lang.placeAttraction, ferry: lang.placeFerry, campsite: lang.placeCampsite,
    rv_site: lang.placeRvSite, wild_camp: lang.placeWildCamp, parking: languageOf(hass) === "de" ? "Parkplatz" : "Parking",
    overnight: lang.overnights,
  };
  return (category && labels[category]) || lang.placeOther || category || "—";
}
function languageOf(hass?: Hass): "de" | "en" { return (hass?.locale?.language ?? "").toLowerCase().startsWith("de") ? "de" : "en"; }
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
