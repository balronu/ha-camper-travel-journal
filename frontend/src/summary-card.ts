import { html } from "lit";
import { TravelCard, defineOnce } from "./base-card";
import { list, transition, type Snapshot } from "./api";
import { formatDate, formatMoneyMinor, messages, statusLabel } from "./i18n";
import { EXPENSES_CHANGED_EVENT, type ExpenseChangedDetail } from "./expense-events";

export class SummaryCard extends TravelCard {
  private snapshot?: Snapshot; private loading = false; private loadError = ""; private actionError = "";
  private readonly onExpensesChanged = (event: Event) => {
    const detail = (event as CustomEvent<ExpenseChangedDetail>).detail;
    if (detail?.vehicleId === this.vehicleId) void this.refresh();
  };
  connectedCallback() { super.connectedCallback(); window.addEventListener(EXPENSES_CHANGED_EVENT, this.onExpensesChanged); void this.refresh(); }
  disconnectedCallback() { window.removeEventListener(EXPENSES_CHANGED_EVENT, this.onExpensesChanged); super.disconnectedCallback(); }
  protected onHassConnectionChanged() { void this.refresh(); }
  protected onConfigChanged() { void this.refresh(); }
  private async refresh(): Promise<boolean> { if (!this.hass || !this.vehicleId) return false; this.loading = true; this.requestUpdate(); try { const overview = await list(this.hass, this.vehicleId); const trip = overview.trips[0]; this.snapshot = trip ? await list(this.hass, this.vehicleId, trip.id) : overview; this.loadError = ""; return true; } catch { this.loadError = messages(this.hass).loadError; return false; } finally { this.loading = false; this.requestUpdate(); } }
  private async setStatus(status: "active" | "paused" | "completed") { const trip = this.snapshot?.trips[0]; if (!this.hass || !trip) return; try { await transition(this.hass, this.vehicleId, trip.id, status); this.actionError = ""; await this.refresh(); } catch { this.actionError = messages(this.hass).statusError; this.requestUpdate(); } }
  render() { const lang = messages(this.hass); const trip = this.snapshot?.trips[0]; const km = (this.snapshot?.drives ?? []).reduce((sum, drive) => sum + drive.distance_m, 0) / 1000; const summary = this.snapshot?.expense_summary; const total = summary?.mixed_currency ? lang.mixedCurrency : summary?.total_minor !== undefined && summary.currency ? formatMoneyMinor(summary.total_minor, summary.currency, this.hass) : formatMoneyMinor(0, "EUR", this.hass); const error = this.loadError || this.actionError; return html`<ha-card><h2>${trip?.title ?? lang.title}</h2>${error ? html`<p class="error" role="alert">${error}</p>` : trip ? html`<p class="muted">${trip.destination || lang.noDestination} · ${statusLabel(trip.status, this.hass)} · ${formatDate(trip.started_at, this.hass)}${trip.ended_at ? ` – ${formatDate(trip.ended_at, this.hass)}` : ""}</p><div class="grid"><div class="metric"><span class="muted">${lang.distance}</span><span class="value">${km.toFixed(1)} km</span></div><div class="metric"><span class="muted">${lang.drives}</span><span class="value">${this.snapshot?.drives.length ?? 0}</span></div><div class="metric"><span class="muted">${lang.stops}</span><span class="value">${this.snapshot?.stops.length ?? 0}</span></div><div class="metric"><span class="muted">${lang.costs}</span><span class="value">${total}</span></div></div><div class="actions">${trip.status === "planned" || trip.status === "paused" ? html`<button @click=${() => this.setStatus("active")}>${lang.resume}</button>` : ""}${trip.status === "active" ? html`<button class="secondary" @click=${() => this.setStatus("paused")}>${lang.pause}</button><button @click=${() => this.setStatus("completed")}>${lang.complete}</button>` : ""}</div>` : html`<p class="muted">${lang.noTrip}</p>`}${this.loading ? html`<p class="muted">${lang.loading}</p>` : ""}</ha-card>`; }
}
defineOnce("camper-travel-journal-summary-card", SummaryCard);
