import { css, html } from "lit";
import { TravelCard, defineOnce } from "./base-card";
import { list, transition, type Snapshot } from "./api";
import { formatMoneyMinor, formatTripPeriod, messages, statusLabel } from "./i18n";
import { EXPENSES_CHANGED_EVENT, TRAVEL_DATA_CHANGED_EVENT, type ExpenseChangedDetail } from "./expense-events";
import { ACTIVE_TRIP_CHANGED_EVENT, publishActiveTrip, readActiveTrip, type TripContextDetail } from "./trip-context";

export class SummaryCard extends TravelCard {
  private snapshot?: Snapshot;
  private trips: Snapshot["trips"] = [];
  private selectedTripId = "";
  private loading = false;
  private loadError = "";
  private actionError = "";
  private readonly onDataChanged = (event: Event) => {
    const detail = (event as CustomEvent<ExpenseChangedDetail>).detail;
    if (detail?.vehicleId === this.vehicleId) void this.refresh();
  };
  private readonly onActiveTripChanged = (event: Event) => {
    const detail = (event as CustomEvent<TripContextDetail>).detail;
    if (detail?.vehicleId !== this.vehicleId || detail.tripId === this.selectedTripId) return;
    this.selectedTripId = detail.tripId;
    void this.refresh();
  };
  connectedCallback() {
    super.connectedCallback();
    window.addEventListener(EXPENSES_CHANGED_EVENT, this.onDataChanged);
    window.addEventListener(TRAVEL_DATA_CHANGED_EVENT, this.onDataChanged);
    window.addEventListener(ACTIVE_TRIP_CHANGED_EVENT, this.onActiveTripChanged);
    void this.refresh();
  }
  disconnectedCallback() {
    window.removeEventListener(EXPENSES_CHANGED_EVENT, this.onDataChanged);
    window.removeEventListener(TRAVEL_DATA_CHANGED_EVENT, this.onDataChanged);
    window.removeEventListener(ACTIVE_TRIP_CHANGED_EVENT, this.onActiveTripChanged);
    super.disconnectedCallback();
  }
  protected onHassConnectionChanged() { void this.refresh(); }
  protected onConfigChanged() { void this.refresh(); }
  private chooseDefaultTrip(trips: Snapshot["trips"]): Snapshot["trips"][number] | undefined {
    const byRelevance = (left: Snapshot["trips"][number], right: Snapshot["trips"][number]) => {
      const start = (right.started_at || "").localeCompare(left.started_at || "");
      return start || right.id.localeCompare(left.id);
    };
    return trips.filter((trip) => trip.status === "active").sort(byRelevance)[0] ?? [...trips].sort(byRelevance)[0];
  }
  private async refresh(): Promise<boolean> {
    if (!this.hass || !this.vehicleId) return false;
    this.loading = true;
    this.requestUpdate();
    try {
      const overview = await list(this.hass, this.vehicleId);
      this.trips = overview.trips;
      const contextTripId = readActiveTrip(this.vehicleId);
      const existing = overview.trips.find((trip) => trip.id === (contextTripId || this.selectedTripId));
      const trip = existing ?? this.chooseDefaultTrip(overview.trips);
      this.selectedTripId = trip?.id ?? "";
      if (trip) publishActiveTrip({ vehicleId: this.vehicleId, tripId: trip.id, source: "summary" });
      const details = trip ? await list(this.hass, this.vehicleId, trip.id) : overview;
      // The backend keeps the vehicle-wide trip list in a trip-specific
      // response while filtering drives/stops/expenses. Keep the selected
      // overview trip beside those filtered metrics so the card cannot mix
      // metadata from trips[0] with data from the requested trip.
      this.snapshot = trip ? { ...details, trips: [trip] } : details;
      this.loadError = "";
      return true;
    } catch {
      this.loadError = messages(this.hass).loadError;
      return false;
    } finally {
      this.loading = false;
      this.requestUpdate();
    }
  }
  private async setStatus(status: "active" | "paused" | "completed") {
    const trip = this.snapshot?.trips[0];
    if (!this.hass || !trip) return;
    try { await transition(this.hass, this.vehicleId, trip.id, status); this.actionError = ""; await this.refresh(); }
    catch { this.actionError = messages(this.hass).statusError; this.requestUpdate(); }
  }
  private async selectTrip(tripId: string) {
    if (!this.hass || this.loading || !this.trips.some((trip) => trip.id === tripId)) return;
    this.selectedTripId = tripId;
    publishActiveTrip({ vehicleId: this.vehicleId, tripId, source: "summary" });
    await this.refresh();
  }
  render() {
    const lang = messages(this.hass);
    const trip = this.snapshot?.trips[0];
    const trips = this.trips;
    const km = (this.snapshot?.drives ?? []).reduce((sum, drive) => sum + drive.distance_m, 0) / 1000;
    const confirmedStops = (this.snapshot?.stops ?? []).filter((stop) => stop.confirmed !== false);
    const overnightCount = confirmedStops.filter((stop) => ["campsite", "rv_site", "wild_camp", "overnight"].includes(stop.place_kind || stop.place_type || stop.stop_type)).length;
    const summary = this.snapshot?.expense_summary;
    const total = summary?.mixed_currency ? lang.mixedCurrency : summary?.total_minor !== undefined && summary.currency ? formatMoneyMinor(summary.total_minor, summary.currency, this.hass) : formatMoneyMinor(0, "EUR", this.hass);
    const error = this.loadError || this.actionError;
    const period = trip ? formatTripPeriod(trip, this.hass) : "";
    return html`<ha-card><h2>${trip?.title ?? lang.title}</h2>${trips.length ? html`<label class="trip-selector">${lang.summaryChooseTrip}<select aria-label=${lang.summaryTrip} @change=${(event: Event) => void this.selectTrip((event.currentTarget as HTMLSelectElement).value)} ?disabled=${this.loading}>${trips.map((option) => html`<option value=${option.id} ?selected=${option.id === this.selectedTripId}>${option.title} · ${statusLabel(option.status, this.hass)} · ${formatTripPeriod(option, this.hass)}</option>`)}</select></label>` : ""}${error ? html`<p class="error" role="alert">${error}</p>` : trip ? html`<p class="muted">${trip.destination || lang.noDestination} · ${statusLabel(trip.status, this.hass)} · ${period}</p><div class="grid"><div class="metric"><span class="muted">${lang.distance}</span><span class="value">${km.toFixed(1)} km</span></div><div class="metric"><span class="muted">${lang.drives}</span><span class="value">${this.snapshot?.drives.length ?? 0}</span></div><div class="metric"><span class="muted">${lang.stops}</span><span class="value">${this.snapshot?.stops.length ?? 0}</span></div><div class="metric"><span class="muted">${lang.overnights ?? "Übernachtungsplätze"}</span><span class="value">${overnightCount}</span></div><div class="metric"><span class="muted">${lang.costs}</span><span class="value">${total}</span></div></div><div class="actions">${trip.status === "planned" ? html`<button @click=${() => this.setStatus("active")}>${lang.start}</button>` : trip.status === "paused" ? html`<button @click=${() => this.setStatus("active")}>${lang.resume}</button>` : ""}${trip.status === "active" ? html`<button class="secondary" @click=${() => this.setStatus("paused")}>${lang.pause}</button><button @click=${() => this.setStatus("completed")}>${lang.complete}</button>` : ""}</div>` : html`<p class="muted">${lang.noTrip}</p>`}${this.loading ? html`<p class="muted">${lang.loading}</p>` : ""}</ha-card>`;
  }
}
SummaryCard.styles = [TravelCard.styles, css`.trip-selector{display:grid;gap:4px;margin:12px 0;font-size:.9em}.trip-selector select{min-width:0;width:100%;box-sizing:border-box;padding:6px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:8px}.metric{min-width:0;min-height:3.7rem;padding:10px;border-radius:9px;background:var(--secondary-background-color);display:flex;flex-direction:column;justify-content:center}.metric .muted{overflow-wrap:anywhere}.metric .value{margin-top:3px;white-space:nowrap}@media(max-width:420px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}.metric{padding:8px;font-size:.9em}}`] as any;
defineOnce("camper-travel-journal-summary-card", SummaryCard);
