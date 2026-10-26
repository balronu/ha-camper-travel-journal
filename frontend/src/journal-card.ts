import { css, html } from "lit";
import { TravelCard, defineOnce } from "./base-card";
import { assignInterruption, createStopFromInterruption, createTankEvent, deleteDrive, deleteTankEvent, list, listTankbook, listVehicles, updateTankEvent, type ConsumptionInterval, type Drive, type Snapshot, type TankbookSnapshot, type TankEvent, type Trip, type TripInterruption } from "./api";
import { clearActiveTrip, publishActiveTrip, readActiveTrip, type TripContextDetail, ACTIVE_TRIP_CHANGED_EVENT } from "./trip-context";
import { notifyTravelChanged, TRAVEL_DATA_CHANGED_EVENT } from "./expense-events";
import { driveDeleteMessages, formatDateTime, formatDuration, formatMoneyMinor, formatTripPeriod, messages, statusLabel } from "./i18n";
import { orderedJournalModules, type JournalModuleId } from "./journal-modules";

type JournalConfig = { vehicle_id: string; modules?: string[]; module_order?: string[] };

const overnightKinds = new Set(["campsite", "rv_site", "wild_camp", "overnight"]);

/**
 * The recommended beta.3 entry point. It owns the open-trip lifecycle while
 * reusing the mature Manager and Map implementations in embedded mode.
 */
export class JournalCard extends TravelCard {
  private overview?: Snapshot;
  private detail?: Snapshot;
  private openTripId = "";
  private selectedTripId = "";
  private loading = false;
  private error = "";
  private readonly onActiveTripChanged = (event: Event) => {
    const detail = (event as CustomEvent<TripContextDetail>).detail;
    if (detail?.vehicleId !== this.vehicleId || !detail.tripId || detail.tripId === this.openTripId) return;
    if (this.openTripId) void this.openTrip(detail.tripId);
  };
  private readonly onTravelDataChanged = (event: Event) => {
    const detail = (event as CustomEvent<{ vehicleId: string; tripId: string }>).detail;
    if (detail?.vehicleId !== this.vehicleId) return;
    void this.refreshOverview();
  };
  private interruptionDialog?: TripInterruption;
  private interruptionAction: "stop" | "overnight" | "pause" | "ignored" = "stop";
  private interruptionPlaceId = "";
  private interruptionName = "";
  private interruptionType = "other";
  private interruptionAddress = "";
  private interruptionDescription = "";
  private interruptionWebsite = "";
  private interruptionSaving = false;
  private deletingDrive?: Drive;
  private driveDeleting = false;
  private overviewRequest = 0;
  private detailRequest = 0;
  private tankbook?: TankbookSnapshot;
  private tankbookEditingId = "";
  private tankbookSaving = false;
  private tankbookForm = { occurred_at: "", fuel_type: "diesel", liters: "", price_per_liter: "", amount_minor: "", odometer_km: "", fill_level: "unknown", station: "", note: "" };

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(ACTIVE_TRIP_CHANGED_EVENT, this.onActiveTripChanged);
    window.addEventListener(TRAVEL_DATA_CHANGED_EVENT, this.onTravelDataChanged);
    void this.refreshOverview();
  }
  disconnectedCallback() {
    window.removeEventListener(ACTIVE_TRIP_CHANGED_EVENT, this.onActiveTripChanged);
    window.removeEventListener(TRAVEL_DATA_CHANGED_EVENT, this.onTravelDataChanged);
    super.disconnectedCallback();
  }
  protected onHassConnectionChanged() { void this.refreshOverview(); }
  protected onConfigChanged() { this.closeTrip(false); this.tankbook = undefined; void this.refreshOverview(); }
  protected updated() {
    const dialog = this.renderRoot.querySelector("dialog.interruption-dialog") as HTMLDialogElement | null;
    if (dialog) {
      if (this.interruptionDialog && !dialog.open) dialog.showModal();
      if (!this.interruptionDialog && dialog.open) dialog.close();
    }
    const driveDialog = this.renderRoot.querySelector("dialog.drive-delete-dialog") as HTMLDialogElement | null;
    if (!driveDialog) return;
    if (this.deletingDrive && !driveDialog.open) driveDialog.showModal();
    if (!this.deletingDrive && driveDialog.open) driveDialog.close();
  }

  private async refreshOverview(): Promise<boolean> {
    if (!this.hass || !this.vehicleId) return false;
    const request = ++this.overviewRequest;
    this.loading = true; this.error = ""; this.requestUpdate();
    try {
      const overview = await list(this.hass, this.vehicleId);
      if (request !== this.overviewRequest) return false;
      this.overview = overview;
      if (this.openTripId && !overview.trips.some((trip) => trip.id === this.openTripId)) {
        this.openTripId = "";
        this.detail = undefined;
        clearActiveTrip(this.vehicleId, "journal");
      }
      try { this.vehicleName = (await listVehicles(this.hass)).find((vehicle) => vehicle.vehicle_id === this.vehicleId)?.name ?? ""; } catch { this.vehicleName = ""; }
      const remembered = readActiveTrip(this.vehicleId);
      this.selectedTripId = this.overview.trips.some((trip) => trip.id === (this.openTripId || remembered)) ? (this.openTripId || remembered) : "";
      if (this.openTripId && this.overview.trips.some((trip) => trip.id === this.openTripId)) await this.loadDetail(this.openTripId);
      return true;
    } catch { if (request === this.overviewRequest) this.error = messages(this.hass).loadError; return false; }
    finally { if (request === this.overviewRequest) { this.loading = false; this.requestUpdate(); } }
  }
  private async loadDetail(tripId: string) {
    if (!this.hass || !tripId) return;
    const request = ++this.detailRequest;
    const detail = await list(this.hass, this.vehicleId, tripId);
    const tankbook = this.tankbookEnabled() ? await listTankbook(this.hass, this.vehicleId) : undefined;
    if (request === this.detailRequest && this.openTripId === tripId) { this.detail = detail; this.tankbook = tankbook; }
  }
  private tankbookEnabled() { return orderedJournalModules(this.config.modules, this.config.module_order).includes("tankbook"); }
  private editTankEvent(event: TankEvent) {
    this.tankbookEditingId = event.id;
    this.tankbookForm = { occurred_at: event.occurred_at.slice(0, 16), fuel_type: event.fuel_type, liters: String(event.liters), price_per_liter: event.price_per_liter == null ? "" : String(event.price_per_liter), amount_minor: event.amount_minor == null ? "" : String(event.amount_minor / 100), odometer_km: event.odometer_km == null ? "" : String(event.odometer_km), fill_level: event.fill_level, station: event.station ?? "", note: event.note ?? "" };
    this.requestUpdate();
  }
  private resetTankEventForm() {
    this.tankbookEditingId = "";
    this.tankbookForm = { occurred_at: new Date().toISOString().slice(0, 16), fuel_type: "diesel", liters: "", price_per_liter: "", amount_minor: "", odometer_km: "", fill_level: "unknown", station: "", note: "" };
  }
  private async saveTankEvent() {
    if (!this.hass || this.tankbookSaving || !this.tankbookForm.occurred_at) return;
    this.tankbookSaving = true; this.requestUpdate();
    const data: Record<string, unknown> = { occurred_at: new Date(this.tankbookForm.occurred_at).toISOString(), fuel_type: this.tankbookForm.fuel_type, liters: Number(this.tankbookForm.liters), fill_level: this.tankbookForm.fill_level, price_per_liter: this.tankbookForm.price_per_liter ? Number(this.tankbookForm.price_per_liter) : undefined, amount_minor: this.tankbookForm.amount_minor ? Math.round(Number(this.tankbookForm.amount_minor) * 100) : undefined, odometer_km: this.tankbookForm.odometer_km ? Number(this.tankbookForm.odometer_km) : undefined, station: this.tankbookForm.station.trim() || undefined, note: this.tankbookForm.note.trim() || undefined };
    try {
      if (this.tankbookEditingId) await updateTankEvent(this.hass, this.vehicleId, this.tankbookEditingId, data);
      else await createTankEvent(this.hass, this.vehicleId, data);
      this.tankbook = await listTankbook(this.hass, this.vehicleId);
      this.resetTankEventForm();
    } catch (error) { this.error = error instanceof Error ? error.message : messages(this.hass).loadError; }
    finally { this.tankbookSaving = false; this.requestUpdate(); }
  }
  private async removeTankEvent(event: TankEvent) {
    if (!this.hass || !window.confirm(`Tankvorgang vom ${formatDateTime(event.occurred_at, this.hass)} löschen?`)) return;
    try { await deleteTankEvent(this.hass, this.vehicleId, event.id); this.tankbook = await listTankbook(this.hass, this.vehicleId); if (this.tankbookEditingId === event.id) this.resetTankEventForm(); this.requestUpdate(); } catch (error) { this.error = error instanceof Error ? error.message : messages(this.hass).loadError; this.requestUpdate(); }
  }
  private async openTrip(tripId = this.selectedTripId) {
    if (!tripId || !this.overview?.trips.some((trip) => trip.id === tripId)) return;
    this.loading = true; this.error = ""; this.openTripId = tripId; this.selectedTripId = tripId;
    try { await this.loadDetail(tripId); publishActiveTrip({ vehicleId: this.vehicleId, tripId, source: "journal" }); }
    catch { this.error = messages(this.hass).loadError; this.openTripId = ""; }
    finally { this.loading = false; this.requestUpdate(); }
  }
  private closeTrip(confirm = true) {
    this.openTripId = ""; this.detail = undefined; clearActiveTrip(this.vehicleId, "journal"); this.requestUpdate();
  }
  private openDriveDeleteDialog(drive: Drive) { if (this.driveDeleting) return; this.deletingDrive = drive; this.requestUpdate(); }
  private closeDriveDeleteDialog() { if (this.driveDeleting) return; this.deletingDrive = undefined; this.requestUpdate(); }
  private async confirmDriveDelete() {
    if (!this.hass || !this.deletingDrive || this.driveDeleting || !this.openTripId) return;
    const drive = this.deletingDrive;
    this.driveDeleting = true; this.requestUpdate();
    try {
      await deleteDrive(this.hass, this.vehicleId, drive.id);
      this.deletingDrive = undefined;
      const refreshed = await this.refreshOverview();
      if (!refreshed) throw new Error("refresh_failed");
      notifyTravelChanged({ vehicleId: this.vehicleId, tripId: this.openTripId });
    } catch { this.error = messages(this.hass).driveDeleteError ?? messages(this.hass).loadError; }
    finally { this.driveDeleting = false; this.requestUpdate(); }
  }
  private trip() { return this.overview?.trips.find((trip) => trip.id === this.openTripId) ?? this.detail?.trips.find((trip) => trip.id === this.openTripId); }
  private async onTripCreated(event: Event) {
    const tripId = (event as CustomEvent<{ tripId?: string }>).detail?.tripId;
    await this.refreshOverview();
    if (tripId) await this.openTrip(tripId);
  }
  private openTripCreateDialog() {
    const editor = this.renderRoot.querySelector<HTMLElement & { openTripCreate?: () => void }>("camper-travel-journal-manager-card");
    editor?.openTripCreate?.();
  }
  private openInterruptionDialog(item: TripInterruption) {
    this.interruptionDialog = item;
    this.interruptionAction = item.status === "unassigned" ? "stop" : item.status === "overnight" ? "overnight" : item.status === "stop" ? "stop" : item.status;
    this.interruptionPlaceId = item.existing_place_id ?? "";
    this.interruptionName = "";
    this.interruptionType = "other";
    this.interruptionAddress = "";
    this.interruptionDescription = "";
    this.interruptionWebsite = "";
    this.requestUpdate();
  }
  private closeInterruptionDialog() { this.interruptionDialog = undefined; this.interruptionSaving = false; this.requestUpdate(); }
  private async saveInterruption() {
    if (!this.hass || !this.openTripId || !this.interruptionDialog) return;
    const item = this.interruptionDialog;
    this.interruptionSaving = true; this.requestUpdate();
    try {
      if (this.interruptionAction === "stop" || this.interruptionAction === "overnight") {
        if (this.interruptionPlaceId) {
          await assignInterruption(this.hass, this.vehicleId, this.openTripId, item.id, this.interruptionAction, this.interruptionPlaceId);
        } else {
          if (!this.interruptionName.trim()) throw new Error("place_name_required");
          await createStopFromInterruption(this.hass, this.vehicleId, this.openTripId, item.id, { name: this.interruptionName.trim(), place_type: this.interruptionType, overnight: this.interruptionAction === "overnight", address: this.interruptionAddress.trim(), description: this.interruptionDescription.trim(), website_url: this.interruptionWebsite.trim() || undefined });
        }
      } else {
        await assignInterruption(this.hass, this.vehicleId, this.openTripId, item.id, this.interruptionAction);
      }
      const refreshed = await this.refreshOverview();
      if (!refreshed) {
        this.error = "Aufenthalt gespeichert, aber die Reiseübersicht konnte nicht aktualisiert werden. Bitte später erneut laden.";
        this.interruptionSaving = false; this.requestUpdate();
        return;
      }
      this.closeInterruptionDialog();
    } catch (error) {
      const code = error instanceof Error ? error.message : "";
      const details: Record<string, string> = {
        invalid_input: "Die Eingaben sind ungültig.",
        timestamp_invalid: "Bitte Datum und Uhrzeit prüfen.",
        permission_denied: "Die Berechtigung zum Speichern fehlt.",
        conflict: "Der Datensatz wurde zwischenzeitlich geändert. Bitte neu laden.",
        database_error: "Der Server konnte die Änderung nicht speichern.",
        request_failed: "Der Server konnte die Änderung nicht verarbeiten.",
        interruption_not_found: "Die Unterbrechung existiert nicht mehr.",
        interruption_place_required: "Bitte einen Ort auswählen.",
        trip_not_found: "Die Reise existiert nicht mehr.",
        vehicle_mismatch: "Reise und Fahrzeug passen nicht zusammen.",
        website_url_invalid: "Die Webseite muss mit http:// oder https:// beginnen.",
      };
      this.error = code === "place_name_required" ? "Bitte einen Namen eingeben." : `Aufenthalt konnte nicht gespeichert werden${details[code] ? `: ${details[code]}` : ". Bitte Eingaben prüfen und erneut versuchen."}`;
      this.interruptionSaving = false; this.requestUpdate();
    }
  }
  private section(title: string, icon: string, count: number | undefined, content: unknown, open = false) {
    return html`<section class="journal-section"><details ?open=${open} @toggle=${(event: Event) => this.onSectionToggle(event)}><summary><span class="section-title"><span aria-hidden="true">${icon}</span><strong>${title}</strong></span>${count === undefined ? "" : html`<span class="count">${count}</span>`}</summary><div class="section-content">${content}</div></details></section>`;
  }
  private onSectionToggle(event: Event) {
    const current = event.currentTarget as HTMLDetailsElement;
    if (!current.open) return;
    this.shadowRoot?.querySelectorAll<HTMLDetailsElement>(".journal-section details").forEach((details) => { if (details !== current) details.open = false; });
  }
  private renderTankbook(lang: ReturnType<typeof messages>) {
    const events = this.tankbook?.events ?? [];
    const intervals = this.tankbook?.consumption?.intervals?.diesel ?? [];
    const qualityLabel = (quality: string) => quality === "measured" ? "gemessen" : quality === "estimated" ? "geschätzt" : quality === "incomplete" ? "unvollständig" : "nicht berechenbar";
    return html`<div class="tankbook"><form class="form-grid tankbook-form" @submit=${(event: SubmitEvent) => { event.preventDefault(); void this.saveTankEvent(); }}><label>Datum/Zeit<input type="datetime-local" .value=${this.tankbookForm.occurred_at} @input=${(event: Event) => this.tankbookForm.occurred_at = (event.currentTarget as HTMLInputElement).value} required></label><label>Betriebsstoff<select .value=${this.tankbookForm.fuel_type} @change=${(event: Event) => this.tankbookForm.fuel_type = (event.currentTarget as HTMLSelectElement).value}><option value="diesel">Diesel</option><option value="adblue">AdBlue</option><option value="other">Sonstiges</option></select></label><label>Liter<input type="number" min="0.001" step="0.001" .value=${this.tankbookForm.liters} @input=${(event: Event) => this.tankbookForm.liters = (event.currentTarget as HTMLInputElement).value} required></label><label>Füllstand<select .value=${this.tankbookForm.fill_level} @change=${(event: Event) => this.tankbookForm.fill_level = (event.currentTarget as HTMLSelectElement).value}><option value="full">Volltankung</option><option value="partial">Teilbetankung</option><option value="unknown">Unbekannt</option></select></label><label>Kilometerstand<input type="number" min="0" step="0.1" .value=${this.tankbookForm.odometer_km} @input=${(event: Event) => this.tankbookForm.odometer_km = (event.currentTarget as HTMLInputElement).value}></label><label>Preis/Liter<input type="number" min="0" step="0.001" .value=${this.tankbookForm.price_per_liter} @input=${(event: Event) => this.tankbookForm.price_per_liter = (event.currentTarget as HTMLInputElement).value}></label><label>Gesamtbetrag €<input type="number" min="0" step="0.01" .value=${this.tankbookForm.amount_minor} @input=${(event: Event) => this.tankbookForm.amount_minor = (event.currentTarget as HTMLInputElement).value}></label><label>Tankstelle<input .value=${this.tankbookForm.station} @input=${(event: Event) => this.tankbookForm.station = (event.currentTarget as HTMLInputElement).value}></label><label class="full-width">Bemerkung<textarea .value=${this.tankbookForm.note} @input=${(event: Event) => this.tankbookForm.note = (event.currentTarget as HTMLTextAreaElement).value}></textarea></label><div class="actions full-width"><button type="submit" ?disabled=${this.tankbookSaving}>${this.tankbookEditingId ? "Tankvorgang aktualisieren" : "Tankvorgang hinzufügen"}</button>${this.tankbookEditingId ? html`<button type="button" class="secondary" @click=${() => { this.resetTankEventForm(); this.requestUpdate(); }}>Abbrechen</button>` : ""}</div></form><p class="muted">Tankausgaben werden nicht automatisch als neue Kosten gebucht. Heizungsverbrauch: unbekannt, solange keine belastbaren Webasto-Daten hinterlegt sind.</p>${intervals.map((interval: ConsumptionInterval) => html`<article class="tankbook-interval"><strong>${interval.combined_l_per_100km == null ? "Verbrauch nicht berechenbar" : `${interval.combined_l_per_100km.toFixed(2)} l/100 km`}</strong><span>${interval.distance_source === "gps_drives" ? "Strecke aus GPS-Daten" : "Strecke aus Kilometerständen"} · ${qualityLabel(interval.quality)}</span><span>Gemessene Dieselmenge: ${interval.liters.toFixed(3)} l · ${interval.heater_quality === "unknown" ? "Heizungsverbrauch unbekannt" : "Heizungsverbrauch geschätzt"}</span></article>`)}<div class="tankbook-events">${events.map((event) => html`<article class="tankbook-event"><div><strong>${event.fuel_type === "diesel" ? "Diesel" : event.fuel_type === "adblue" ? "AdBlue" : "Sonstiges"} · ${event.liters.toFixed(3)} l</strong><span>${formatDateTime(event.occurred_at, this.hass)} · ${event.fill_level === "full" ? "Volltankung" : event.fill_level === "partial" ? "Teilbetankung" : "Füllstand unbekannt"}</span><span>${event.odometer_km == null ? "Kilometerstand fehlt" : `${event.odometer_km.toFixed(1)} km`}${event.amount_minor == null ? " · Belegbetrag fehlt" : ` · ${(event.amount_minor / 100).toFixed(2)} €`}</span></div><span class="actions"><button type="button" class="secondary" @click=${() => this.editTankEvent(event)}>Bearbeiten</button><button type="button" class="danger" @click=${() => void this.removeTankEvent(event)}>Löschen</button></span></article>`)}</div></div>`;
  }
  private renderModule(module: JournalModuleId, lang: ReturnType<typeof messages>, trip: Trip, content: { overview: unknown; drives: unknown; stays: unknown; expenses: unknown; map: unknown; gpx: unknown; pdf: unknown; tankbook: unknown }, counts: Partial<Record<JournalModuleId, number>>) {
    const labels: Record<JournalModuleId, [string, string]> = {
      overview: [lang.journalOverview ?? "Trip overview", "▣"],
      drives: [lang.journalDrives ?? "Drives and interruptions", "↔"],
      stays: [lang.placesAndStays ?? "Places & stays", "●"],
      expenses: [lang.expenses, "€"],
      map: [lang.mapTitle ?? "Travel map", "⌖"],
      gpx: [lang.gpxImport, "⇧"],
      pdf: [lang.pdfExportTitle, "▤"],
      tankbook: [lang.module_tankbook ?? "Fuel log", "⛽"],
    };
    const [title, icon] = labels[module];
    if (module === "tankbook") return this.section(title, icon, counts[module], this.renderTankbook(lang));
    const values: Record<string, unknown> = content;
    return this.section(title, icon, counts[module], values[module]);
  }
  private renderDriveDeleteDialog(lang: ReturnType<typeof messages>) {
    const drive = this.deletingDrive;
    const text = driveDeleteMessages(this.hass);
    return html`<dialog class="drive-delete-dialog" @cancel=${(event: Event) => { event.preventDefault(); this.closeDriveDeleteDialog(); }}><form method="dialog" @submit=${(event: SubmitEvent) => { event.preventDefault(); void this.confirmDriveDelete(); }}><h3>${text.title}</h3>${drive ? html`<p>${text.question}</p><dl><dt>${text.date}</dt><dd>${formatDateTime(drive.started_at, this.hass)}${drive.ended_at ? ` → ${formatDateTime(drive.ended_at, this.hass)}` : ""}</dd><dt>${lang.distance}</dt><dd>${(drive.distance_m / 1000).toFixed(1)} km</dd></dl><p class="muted">${text.effects}</p>` : ""}<div class="dialog-actions"><button type="button" class="secondary" @click=${() => this.closeDriveDeleteDialog()}>${lang.cancel}</button><button type="submit" class="danger" ?disabled=${this.driveDeleting}>${this.driveDeleting ? lang.saving : text.confirm}</button></div></form></dialog>`;
  }
  private renderPicker(lang: ReturnType<typeof messages>) {
    const trips = this.overview?.trips ?? [];
    return html`<section class="entry" aria-labelledby="journal-entry-title"><div class="entry-icon" aria-hidden="true">🚐</div><h2 id="journal-entry-title">${lang.journalEntry ?? "Reise auswählen oder neu anlegen"}</h2><p class="muted">${lang.journalEntryHint ?? "Öffne eine Reise, um ihre Fahrten, Orte, Karte und Exporte zu sehen."}</p>${trips.length ? html`<label class="picker-label">${lang.journalSelect ?? "Reise auswählen"}<select aria-label=${lang.journalSelect ?? "Reise auswählen"} .value=${this.selectedTripId} @change=${(event: Event) => { this.selectedTripId = (event.currentTarget as HTMLSelectElement).value; this.requestUpdate(); }}><option value="">${lang.journalChoose ?? "Bitte auswählen …"}</option>${trips.map((trip) => html`<option value=${trip.id}>${trip.title} · ${statusLabel(trip.status, this.hass)} · ${formatTripPeriod(trip, this.hass)}</option>`)}</select></label>` : html`<p class="muted">${lang.noTrip}</p>`}<div class="actions"><button type="button" @click=${() => void this.openTrip() } ?disabled=${!this.selectedTripId || this.loading}>${lang.journalOpen ?? "Reise öffnen"}</button><button type="button" class="secondary" @click=${() => this.openTripCreateDialog()}>${lang.newTrip}</button></div><camper-travel-journal-manager-card .config=${{ vehicle_id: this.vehicleId, journal_section: "trip-create" }} .hass=${this.hass} @trip-created=${(event: Event) => void this.onTripCreated(event)}></camper-travel-journal-manager-card></section>`;
  }
  private renderOpenTrip(lang: ReturnType<typeof messages>, trip: Trip) {
    const snapshot = this.detail;
    const confirmed = (snapshot?.stops ?? []).filter((stop) => stop.confirmed !== false);
    const overnights = confirmed.filter((stop) => overnightKinds.has(stop.place_kind || stop.place_type || stop.stop_type));
    const km = (snapshot?.drives ?? []).reduce((sum, drive) => sum + drive.distance_m, 0) / 1000;
    const expense = snapshot?.expense_summary;
    const total = expense?.mixed_currency ? lang.mixedCurrency : expense?.total_minor !== undefined && expense.currency ? formatMoneyMinor(expense.total_minor, expense.currency, this.hass) : formatMoneyMinor(0, "EUR", this.hass);
    const manager = (section: string) => html`<camper-travel-journal-manager-card .config=${{ vehicle_id: this.vehicleId, trip_id: trip.id, journal_section: section }} .hass=${this.hass}></camper-travel-journal-manager-card>`;
    const map = html`<camper-travel-journal-map-card .config=${{ vehicle_id: this.vehicleId, trip_id: trip.id }} .hass=${this.hass}></camper-travel-journal-map-card>`;
    const interruptions = snapshot?.interruptions ?? [];
    const timeline = [...(snapshot?.drives ?? [])].sort((left, right) => left.started_at.localeCompare(right.started_at)).flatMap((drive) => {
      const following = interruptions.find((item) => item.previous_drive_id === drive.id);
      const assigned = (snapshot?.stops ?? []).find((stop) => stop.id === following?.existing_place_id);
      return [html`<article class="drive-item"><div class="drive-heading"><strong>${lang.drive ?? "Fahrt"}</strong><button type="button" class="drive-delete-icon" aria-label=${lang.driveDelete ?? "Fahrt löschen"} title=${lang.driveDelete ?? "Fahrt löschen"} ?disabled=${this.driveDeleting} @click=${() => this.openDriveDeleteDialog(drive)}>🗑️</button></div><span>${formatDateTime(drive.started_at, this.hass)} → ${drive.ended_at ? formatDateTime(drive.ended_at, this.hass) : (lang.notAvailable ?? "Nicht verfügbar")}</span><span>${(drive.distance_m / 1000).toFixed(1)} km · ${drive.duration_seconds ? formatDuration(drive.duration_seconds, this.hass) : "–"} · ${drive.source === "gpx" ? (lang.sourceGpx ?? "GPX-importiert") : drive.source === "manual" ? lang.sourceManual : lang.sourceGps}</span></article>`, ...(following ? [html`<article class="interruption-item"><strong>${following.status === "pause" ? (lang.drivePause ?? "Fahrtpause") : following.status === "ignored" ? (lang.interruptionIgnored ?? "Ignoriert") : assigned ? `${lang.assignedStay ?? "Aufenthalt"}: ${assigned.name}` : (lang.interruptionUnassigned ?? "Nicht zugeordnet")}</strong><span>${formatDateTime(following.started_at, this.hass)} → ${formatDateTime(following.ended_at, this.hass)} · ${formatDuration(following.duration_seconds, this.hass)}</span>${following.status === "unassigned" ? html`<button type="button" class="compact-action" @click=${() => this.openInterruptionDialog(following)}>${lang.assignStay ?? "Aufenthalt zuordnen"}</button>` : ""}</article>`] : [])];
    });
    const moduleContent = {
      overview: html`<div class="metric-grid"><div><span>${lang.distance}</span><strong>${km.toFixed(1)} km</strong></div><div><span>${lang.drives}</span><strong>${snapshot?.drives.length ?? 0}</strong></div><div><span>${lang.stops}</span><strong>${confirmed.filter((stop) => !overnightKinds.has(stop.place_kind || stop.place_type || stop.stop_type)).length}</strong></div><div><span>${lang.overnights ?? "Übernachtungsplätze"}</span><strong>${overnights.length}</strong></div><div><span>${lang.costs}</span><strong>${total}</strong></div></div>`,
      drives: html`${timeline.length ? timeline : html`<p class="muted">${lang.noDrives ?? "Keine Fahrten erfasst."}</p>`}`,
      stays: html`<p class="muted">${lang.journalStopsHint ?? "Bestätigte Aufenthalte dieser Reise."}</p>${manager("places")}`,
      expenses: html`${manager("expenses")}`,
      map,
      gpx: html`${manager("gpx")}`,
      pdf: html`${manager("pdf")}`,
      tankbook: this.renderTankbook(lang),
    };
    const modules = orderedJournalModules(this.config.modules, this.config.module_order);
    const moduleCounts: Partial<Record<JournalModuleId, number>> = {
      drives: (snapshot?.drives.length ?? 0) + interruptions.length,
      stays: confirmed.length,
      expenses: snapshot?.expenses?.length ?? 0,
      tankbook: this.tankbook?.events.length ?? 0,
    };
    return html`<header class="trip-header"><div><p class="eyebrow">${lang.journalOpenTrip ?? "Geöffnete Reise"}</p><h2>${trip.title}</h2><p class="muted">${trip.destination || lang.noDestination} · ${formatTripPeriod(trip, this.hass)} · ${statusLabel(trip.status, this.hass)}${this.vehicleName ? ` · ${this.vehicleName}` : ""}</p><div class="trip-management" @trip-switch=${() => this.closeTrip()}>${manager("trip-actions")}</div></div></header>
      ${modules.map((module) => this.renderModule(module, lang, trip, moduleContent, moduleCounts))}
      ${this.error ? html`<p class="error" role="alert">${this.error}</p>` : ""}${this.loading ? html`<p class="muted" role="status">${lang.loading}</p>` : ""}
      <dialog class="interruption-dialog" @cancel=${(event: Event) => { event.preventDefault(); this.closeInterruptionDialog(); }}><form method="dialog" @submit=${(event: SubmitEvent) => { event.preventDefault(); void this.saveInterruption(); }}><h3>${lang.assignStay ?? "Aufenthalt zuordnen"}</h3><p class="muted">${this.interruptionDialog ? `${formatDateTime(this.interruptionDialog.started_at, this.hass)} → ${formatDateTime(this.interruptionDialog.ended_at, this.hass)}` : ""}</p><label>${lang.interruptionAction ?? "Aktion"}<select .value=${this.interruptionAction} @change=${(event: Event) => { this.interruptionAction = (event.currentTarget as HTMLSelectElement).value as typeof this.interruptionAction; this.requestUpdate(); }}><option value="stop">${lang.assignStop ?? "Zwischenstopp zuordnen"}</option><option value="overnight">${lang.assignOvernight ?? "Übernachtungsplatz zuordnen"}</option><option value="pause">${lang.drivePause ?? "Als Fahrtpause kennzeichnen"}</option><option value="ignored">${lang.interruptionIgnored ?? "Als nicht relevant markieren"}</option></select></label>${this.interruptionAction === "stop" || this.interruptionAction === "overnight" ? html`<label>${lang.existingPlace ?? "Bestehender Ort"}<select .value=${this.interruptionPlaceId} @change=${(event: Event) => { this.interruptionPlaceId = (event.currentTarget as HTMLSelectElement).value; this.requestUpdate(); }}><option value="">${lang.createNewPlace ?? "Neuen Eintrag erstellen …"}</option>${confirmed.map((place) => html`<option value=${place.id}>${place.name}</option>`)}</select></label>${!this.interruptionPlaceId ? html`<input aria-label=${lang.placeName} placeholder=${lang.placeName} .value=${this.interruptionName} @input=${(event: InputEvent) => this.interruptionName = (event.currentTarget as HTMLInputElement).value} required><select aria-label=${lang.placeCategory} .value=${this.interruptionType} @change=${(event: Event) => this.interruptionType = (event.currentTarget as HTMLSelectElement).value}><option value="other">${lang.placeOther}</option><option value="rv_site">${lang.placeRvSite}</option><option value="parking">${lang.placeParking ?? "Raststätte / Parkplatz"}</option></select><input aria-label=${lang.placeAddress} placeholder=${lang.placeAddress} .value=${this.interruptionAddress} @input=${(event: InputEvent) => this.interruptionAddress = (event.currentTarget as HTMLInputElement).value}><input aria-label=${lang.placeWebsite ?? "Webseite"} type="url" placeholder=${lang.placeWebsite ?? "Webseite (optional)"} .value=${this.interruptionWebsite} @input=${(event: InputEvent) => this.interruptionWebsite = (event.currentTarget as HTMLInputElement).value}><textarea aria-label=${lang.placeDescription} placeholder=${lang.placeDescription} .value=${this.interruptionDescription} @input=${(event: InputEvent) => this.interruptionDescription = (event.currentTarget as HTMLTextAreaElement).value}></textarea>` : ""}` : ""}<div class="dialog-actions"><button type="button" class="secondary" @click=${() => this.closeInterruptionDialog()}>${lang.cancel}</button><button type="submit" ?disabled=${this.interruptionSaving}>${this.interruptionSaving ? lang.saving : lang.save}</button></div></form></dialog>`;
  }
  private vehicleName = "";
  render() {
    const lang = messages(this.hass);
    const trip = this.trip();
    return html`<ha-card><h1>${lang.title}</h1>${!trip ? this.renderPicker(lang) : this.renderOpenTrip(lang, trip)}${this.error && !trip ? html`<p class="error" role="alert">${this.error}</p>` : ""}${this.loading && !trip ? html`<p class="muted" role="status">${lang.loading}</p>` : ""}</ha-card>${this.renderDriveDeleteDialog(lang)}`;
  }
}

JournalCard.styles = [TravelCard.styles, css`
  :host { min-width: 0; } ha-card { padding: 0; overflow: hidden; } h1 { margin: 0; padding: 18px 18px 12px; font-size: 1.35rem; } h2 { margin: 0; } .entry, .trip-header { padding: 18px; } .entry { text-align: center; } .entry-icon { font-size: 2.4rem; } .entry h2 { margin: 8px 0; } .picker-label { display: grid; gap: 6px; text-align: left; margin: 18px 0 0; } select, input, textarea { box-sizing: border-box; min-width: 0; width: 100%; border: 1px solid var(--divider-color); border-radius: 8px; padding: 9px; background: var(--card-background-color); color: var(--primary-text-color); font: inherit; } .trip-header { display: flex; justify-content: space-between; gap: 14px; align-items: start; border-block: 1px solid var(--divider-color); background: var(--secondary-background-color); } .eyebrow { margin: 0 0 4px; color: var(--secondary-text-color); font-size: .78rem; text-transform: uppercase; letter-spacing: .04em; } .muted { color: var(--secondary-text-color); } .actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; } .form-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(9rem,1fr)); gap: 10px; align-items: end; } .form-grid label { display: grid; gap: 5px; text-align: left; } .new-trip { margin-top: 16px; padding: 14px; border: 1px solid var(--divider-color); border-radius: 10px; text-align: left; } .journal-section { border-bottom: 1px solid var(--divider-color); } .journal-section details { padding: 0 18px; } .journal-section summary { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 14px 0; cursor: pointer; list-style: none; } .journal-section summary::-webkit-details-marker { display:none; } .section-title { display: flex; gap: 9px; align-items: center; } .section-title span { color: var(--primary-color); width: 1.2em; text-align: center; } .count { color: var(--secondary-text-color); } .section-content { padding: 0 0 16px; min-width: 0; } .metric-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(7rem,1fr)); gap: 8px; } .metric-grid > div { min-width: 0; padding: 10px; border-radius: 9px; background: var(--secondary-background-color); } .metric-grid span, .metric-grid strong { display: block; min-width: 0; overflow-wrap: anywhere; word-break: normal; } .metric-grid span { color: var(--secondary-text-color); font-size: .78rem; line-height: 1.2; } .metric-grid strong { margin-top: 3px; } .drive-item, .interruption-item { display: grid; gap: 3px; padding: 10px; margin-bottom: 7px; border-radius: 8px; background: var(--secondary-background-color); } .interruption-item { border-inline-start: 4px solid var(--warning-color, #f57c00); } camper-travel-journal-manager-card, camper-travel-journal-map-card { display: block; min-width: 0; } button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, summary:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; } @media (max-width: 600px) { h1 { padding: 14px; } .entry, .trip-header { padding: 14px; } .trip-header { flex-direction: column; } .trip-header button { width: 100%; } .journal-section details { padding-inline: 14px; } .form-grid { grid-template-columns: 1fr; } .metric-grid { grid-template-columns: repeat(2,minmax(0,1fr)); } }
  .compact-action { justify-self: start; padding: 5px 8px; font-size: .85em; }
  .drive-heading { display:flex; justify-content:space-between; align-items:center; gap:8px; }
  .drive-delete-icon { min-height:32px; min-width:32px; padding:4px; border-radius:50%; color:var(--secondary-text-color); background:transparent; font-size:1rem; line-height:1; }
  .drive-delete-icon:hover, .drive-delete-icon:focus-visible { color:var(--error-color,#c62828); background:var(--secondary-background-color); }
  .drive-delete-dialog { width:min(34rem,calc(100vw - 2rem)); max-width:calc(100vw - 2rem); padding:0; border:0; border-radius:12px; color:var(--primary-text-color); background:var(--card-background-color); }
  .drive-delete-dialog::backdrop { background:rgb(0 0 0 / .5); }
  .drive-delete-dialog form { display:grid; gap:12px; padding:18px; }
  .drive-delete-dialog dl { display:grid; grid-template-columns:auto minmax(0,1fr); gap:4px 12px; margin:0; }
  .drive-delete-dialog dt { color:var(--secondary-text-color); }
  .drive-delete-dialog dd { margin:0; }
  .danger { color:var(--text-primary-color,#fff); background:var(--error-color,#c62828); }
  @media(max-width:650px) { .drive-delete-dialog { width:calc(100vw - 1rem); max-width:calc(100vw - 1rem); } .drive-delete-dialog .dialog-actions { flex-direction:column-reverse; } .drive-delete-dialog .dialog-actions button { width:100%; } }
  dialog { max-width: min(32rem, calc(100vw - 2rem)); width: calc(100% - 2rem); max-height: calc(100dvh - 2rem); overflow: hidden; border: 0; border-radius: 12px; padding: 0; color: var(--primary-text-color); background: var(--card-background-color); }
  dialog::backdrop { background: rgb(0 0 0 / .48); }
  dialog form { display: grid; gap: 12px; padding: 18px; max-height: calc(100dvh - 2rem); overflow-y: auto; overscroll-behavior: contain; scrollbar-gutter: stable; }
  dialog label { display: grid; gap: 5px; }
  dialog textarea { min-height: 4rem; }
  .dialog-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 4px; }
  .tankbook { display:grid; gap:12px; min-width:0; }
  .tankbook-form { padding:12px; border:1px solid var(--divider-color); border-radius:10px; }
  .tankbook-event, .tankbook-interval { display:flex; justify-content:space-between; align-items:flex-start; gap:10px; padding:10px; margin-top:7px; border-radius:9px; background:var(--secondary-background-color); }
  .tankbook-event > div, .tankbook-interval { display:grid; gap:3px; min-width:0; }
  .tankbook-event span, .tankbook-interval span { color:var(--secondary-text-color); font-size:.88em; overflow-wrap:anywhere; }
  .full-width { grid-column:1/-1; }
  @media(max-width:600px) { .tankbook-event { flex-direction:column; } .tankbook-event .actions { width:100%; } .tankbook-event .actions button { flex:1; } }
`] as any;
defineOnce("camper-travel-journal-journal-card", JournalCard);
