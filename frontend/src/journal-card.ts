import { css, html } from "lit";
import { TravelCard, defineOnce } from "./base-card";
import { assignInterruption, createStopFromInterruption, list, listVehicles, type Snapshot, type Trip, type TripInterruption } from "./api";
import { clearActiveTrip, publishActiveTrip, readActiveTrip, type TripContextDetail, ACTIVE_TRIP_CHANGED_EVENT } from "./trip-context";
import { TRAVEL_DATA_CHANGED_EVENT } from "./expense-events";
import { formatDateTime, formatDuration, formatMoneyMinor, formatTripPeriod, messages, statusLabel } from "./i18n";

type JournalConfig = { vehicle_id: string };

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
  private overviewRequest = 0;
  private detailRequest = 0;

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
  protected onConfigChanged() { this.closeTrip(false); void this.refreshOverview(); }
  protected updated() {
    const dialog = this.renderRoot.querySelector("dialog.interruption-dialog") as HTMLDialogElement | null;
    if (!dialog) return;
    if (this.interruptionDialog && !dialog.open) dialog.showModal();
    if (!this.interruptionDialog && dialog.open) dialog.close();
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
    if (request === this.detailRequest && this.openTripId === tripId) this.detail = detail;
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
      return [html`<article class="drive-item"><strong>${lang.drive ?? "Fahrt"}</strong><span>${formatDateTime(drive.started_at, this.hass)} → ${drive.ended_at ? formatDateTime(drive.ended_at, this.hass) : (lang.notAvailable ?? "Nicht verfügbar")}</span><span>${(drive.distance_m / 1000).toFixed(1)} km · ${drive.duration_seconds ? formatDuration(drive.duration_seconds, this.hass) : "–"} · ${drive.source === "gpx" ? (lang.sourceGpx ?? "GPX-importiert") : drive.source === "manual" ? lang.sourceManual : lang.sourceGps}</span></article>`, ...(following ? [html`<article class="interruption-item"><strong>${following.status === "pause" ? (lang.drivePause ?? "Fahrtpause") : following.status === "ignored" ? (lang.interruptionIgnored ?? "Ignoriert") : assigned ? `${lang.assignedStay ?? "Aufenthalt"}: ${assigned.name}` : (lang.interruptionUnassigned ?? "Nicht zugeordnet")}</strong><span>${formatDateTime(following.started_at, this.hass)} → ${formatDateTime(following.ended_at, this.hass)} · ${formatDuration(following.duration_seconds, this.hass)}</span>${following.status === "unassigned" ? html`<button type="button" class="compact-action" @click=${() => this.openInterruptionDialog(following)}>${lang.assignStay ?? "Aufenthalt zuordnen"}</button>` : ""}</article>`] : [])];
    });
    return html`<header class="trip-header"><div><p class="eyebrow">${lang.journalOpenTrip ?? "Geöffnete Reise"}</p><h2>${trip.title}</h2><p class="muted">${trip.destination || lang.noDestination} · ${formatTripPeriod(trip, this.hass)} · ${statusLabel(trip.status, this.hass)}${this.vehicleName ? ` · ${this.vehicleName}` : ""}</p><div class="trip-management">${manager("trip-actions")}</div></div><button type="button" class="secondary switch-trip" @click=${() => this.closeTrip()}>${lang.journalClose ?? "Reise wechseln"}</button></header>
      ${this.section(lang.journalOverview ?? "Reiseübersicht", "▣", undefined, html`<div class="metric-grid"><div><span>${lang.distance}</span><strong>${km.toFixed(1)} km</strong></div><div><span>${lang.drives}</span><strong>${snapshot?.drives.length ?? 0}</strong></div><div><span>${lang.stops}</span><strong>${confirmed.filter((stop) => !overnightKinds.has(stop.place_kind || stop.place_type || stop.stop_type)).length}</strong></div><div><span>${lang.overnights ?? "Übernachtungsplätze"}</span><strong>${overnights.length}</strong></div><div><span>${lang.costs}</span><strong>${total}</strong></div></div>`)}
      ${this.section(lang.journalDrives ?? "Fahrten und Unterbrechungen", "↔", (snapshot?.drives.length ?? 0) + interruptions.length, html`${timeline.length ? timeline : html`<p class="muted">${lang.noDrives ?? "Keine Fahrten erfasst."}</p>`}`)}
      ${this.section(lang.placesAndStays ?? "Orte & Aufenthalte", "●", confirmed.length, html`<p class="muted">${lang.journalStopsHint ?? "Bestätigte Aufenthalte dieser Reise."}</p>${manager("places")}`)}
      ${this.section(lang.expenses, "€", snapshot?.expenses?.length ?? 0, html`${manager("expenses")}`)}
      ${this.section(lang.mapTitle ?? "Reisekarte", "⌖", undefined, map)}
      ${this.section(lang.gpxImport, "⇧", undefined, html`${manager("gpx")}`)}
      ${this.section(lang.pdfExportTitle, "▤", undefined, html`${manager("pdf")}`)}
      ${this.error ? html`<p class="error" role="alert">${this.error}</p>` : ""}${this.loading ? html`<p class="muted" role="status">${lang.loading}</p>` : ""}
      <dialog class="interruption-dialog" @cancel=${(event: Event) => { event.preventDefault(); this.closeInterruptionDialog(); }}><form method="dialog" @submit=${(event: SubmitEvent) => { event.preventDefault(); void this.saveInterruption(); }}><h3>${lang.assignStay ?? "Aufenthalt zuordnen"}</h3><p class="muted">${this.interruptionDialog ? `${formatDateTime(this.interruptionDialog.started_at, this.hass)} → ${formatDateTime(this.interruptionDialog.ended_at, this.hass)}` : ""}</p><label>${lang.interruptionAction ?? "Aktion"}<select .value=${this.interruptionAction} @change=${(event: Event) => { this.interruptionAction = (event.currentTarget as HTMLSelectElement).value as typeof this.interruptionAction; this.requestUpdate(); }}><option value="stop">${lang.assignStop ?? "Zwischenstopp zuordnen"}</option><option value="overnight">${lang.assignOvernight ?? "Übernachtungsplatz zuordnen"}</option><option value="pause">${lang.drivePause ?? "Als Fahrtpause kennzeichnen"}</option><option value="ignored">${lang.interruptionIgnored ?? "Als nicht relevant markieren"}</option></select></label>${this.interruptionAction === "stop" || this.interruptionAction === "overnight" ? html`<label>${lang.existingPlace ?? "Bestehender Ort"}<select .value=${this.interruptionPlaceId} @change=${(event: Event) => { this.interruptionPlaceId = (event.currentTarget as HTMLSelectElement).value; this.requestUpdate(); }}><option value="">${lang.createNewPlace ?? "Neuen Eintrag erstellen …"}</option>${confirmed.map((place) => html`<option value=${place.id}>${place.name}</option>`)}</select></label>${!this.interruptionPlaceId ? html`<input aria-label=${lang.placeName} placeholder=${lang.placeName} .value=${this.interruptionName} @input=${(event: InputEvent) => this.interruptionName = (event.currentTarget as HTMLInputElement).value} required><select aria-label=${lang.placeCategory} .value=${this.interruptionType} @change=${(event: Event) => this.interruptionType = (event.currentTarget as HTMLSelectElement).value}><option value="other">${lang.placeOther}</option><option value="rv_site">${lang.placeRvSite}</option><option value="parking">${lang.placeParking ?? "Raststätte / Parkplatz"}</option></select><input aria-label=${lang.placeAddress} placeholder=${lang.placeAddress} .value=${this.interruptionAddress} @input=${(event: InputEvent) => this.interruptionAddress = (event.currentTarget as HTMLInputElement).value}><input aria-label=${lang.placeWebsite ?? "Webseite"} type="url" placeholder=${lang.placeWebsite ?? "Webseite (optional)"} .value=${this.interruptionWebsite} @input=${(event: InputEvent) => this.interruptionWebsite = (event.currentTarget as HTMLInputElement).value}><textarea aria-label=${lang.placeDescription} placeholder=${lang.placeDescription} .value=${this.interruptionDescription} @input=${(event: InputEvent) => this.interruptionDescription = (event.currentTarget as HTMLTextAreaElement).value}></textarea>` : ""}` : ""}<div class="dialog-actions"><button type="button" class="secondary" @click=${() => this.closeInterruptionDialog()}>${lang.cancel}</button><button type="submit" ?disabled=${this.interruptionSaving}>${this.interruptionSaving ? lang.saving : lang.save}</button></div></form></dialog>`;
  }
  private vehicleName = "";
  render() {
    const lang = messages(this.hass);
    const trip = this.trip();
    return html`<ha-card><h1>${lang.title}</h1>${!trip ? this.renderPicker(lang) : this.renderOpenTrip(lang, trip)}${this.error && !trip ? html`<p class="error" role="alert">${this.error}</p>` : ""}${this.loading && !trip ? html`<p class="muted" role="status">${lang.loading}</p>` : ""}</ha-card>`;
  }
}

JournalCard.styles = [TravelCard.styles, css`
  :host { min-width: 0; } ha-card { padding: 0; overflow: hidden; } h1 { margin: 0; padding: 18px 18px 12px; font-size: 1.35rem; } h2 { margin: 0; } .entry, .trip-header { padding: 18px; } .entry { text-align: center; } .entry-icon { font-size: 2.4rem; } .entry h2 { margin: 8px 0; } .picker-label { display: grid; gap: 6px; text-align: left; margin: 18px 0 0; } select, input, textarea { box-sizing: border-box; min-width: 0; width: 100%; border: 1px solid var(--divider-color); border-radius: 8px; padding: 9px; background: var(--card-background-color); color: var(--primary-text-color); font: inherit; } .trip-header { display: flex; justify-content: space-between; gap: 14px; align-items: start; border-block: 1px solid var(--divider-color); background: var(--secondary-background-color); } .eyebrow { margin: 0 0 4px; color: var(--secondary-text-color); font-size: .78rem; text-transform: uppercase; letter-spacing: .04em; } .muted { color: var(--secondary-text-color); } .actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 12px; } .form-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(9rem,1fr)); gap: 10px; align-items: end; } .form-grid label { display: grid; gap: 5px; text-align: left; } .new-trip { margin-top: 16px; padding: 14px; border: 1px solid var(--divider-color); border-radius: 10px; text-align: left; } .journal-section { border-bottom: 1px solid var(--divider-color); } .journal-section details { padding: 0 18px; } .journal-section summary { display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 14px 0; cursor: pointer; list-style: none; } .journal-section summary::-webkit-details-marker { display:none; } .section-title { display: flex; gap: 9px; align-items: center; } .section-title span { color: var(--primary-color); width: 1.2em; text-align: center; } .count { color: var(--secondary-text-color); } .section-content { padding: 0 0 16px; min-width: 0; } .metric-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(7rem,1fr)); gap: 8px; } .metric-grid > div { min-width: 0; padding: 10px; border-radius: 9px; background: var(--secondary-background-color); } .metric-grid span, .metric-grid strong { display: block; min-width: 0; overflow-wrap: anywhere; word-break: normal; } .metric-grid span { color: var(--secondary-text-color); font-size: .78rem; line-height: 1.2; } .metric-grid strong { margin-top: 3px; } .drive-item, .interruption-item { display: grid; gap: 3px; padding: 10px; margin-bottom: 7px; border-radius: 8px; background: var(--secondary-background-color); } .interruption-item { border-inline-start: 4px solid var(--warning-color, #f57c00); } camper-travel-journal-manager-card, camper-travel-journal-map-card { display: block; min-width: 0; } button:focus-visible, input:focus-visible, select:focus-visible, textarea:focus-visible, summary:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; } @media (max-width: 600px) { h1 { padding: 14px; } .entry, .trip-header { padding: 14px; } .trip-header { flex-direction: column; } .trip-header button { width: 100%; } .journal-section details { padding-inline: 14px; } .form-grid { grid-template-columns: 1fr; } .metric-grid { grid-template-columns: repeat(2,minmax(0,1fr)); } }
  .compact-action { justify-self: start; padding: 5px 8px; font-size: .85em; }
  dialog { max-width: min(32rem, calc(100vw - 2rem)); width: calc(100% - 2rem); border: 0; border-radius: 12px; padding: 0; color: var(--primary-text-color); background: var(--card-background-color); }
  dialog::backdrop { background: rgb(0 0 0 / .48); }
  dialog form { display: grid; gap: 12px; padding: 18px; }
  dialog label { display: grid; gap: 5px; }
  dialog textarea { min-height: 4rem; }
  .dialog-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 4px; }
`] as any;
defineOnce("camper-travel-journal-journal-card", JournalCard);
