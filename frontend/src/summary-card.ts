import { html } from "lit";
import { TravelCard, defineOnce } from "./base-card";
import { list, transition, type Snapshot } from "./api";
import { formatDate, messages, statusLabel } from "./i18n";

export class SummaryCard extends TravelCard {
  private snapshot?: Snapshot; private loading = false; private error = "";
  connectedCallback() { super.connectedCallback(); void this.refresh(); }
  disconnectedCallback() { super.disconnectedCallback(); }
  protected onHassConnectionChanged() { void this.refresh(); }
  protected onConfigChanged() { void this.refresh(); }
  private async refresh() { if (!this.hass || !this.vehicleId) return; this.loading = true; this.requestUpdate(); try { this.snapshot = await list(this.hass, this.vehicleId); } catch { this.error = messages(this.hass).loadError; } finally { this.loading = false; this.requestUpdate(); } }
  private async setStatus(status: "active" | "paused" | "completed") { const trip = this.snapshot?.trips[0]; if (!this.hass || !trip) return; try { await transition(this.hass, this.vehicleId, trip.id, status); await this.refresh(); } catch { this.error = messages(this.hass).statusError; this.requestUpdate(); } }
  render() { const lang = messages(this.hass); const trip = this.snapshot?.trips[0]; const km = (this.snapshot?.drives ?? []).reduce((sum, drive) => sum + drive.distance_m, 0) / 1000; const total = (this.snapshot?.expense_summary?.total_minor ?? 0) / 100; return html`<ha-card><h2>${trip?.title ?? lang.title}</h2>${this.error ? html`<p class="error" role="alert">${this.error}</p>` : trip ? html`<p class="muted">${trip.destination || lang.noDestination} · ${statusLabel(trip.status, this.hass)} · ${formatDate(trip.started_at, this.hass)}${trip.ended_at ? ` – ${formatDate(trip.ended_at, this.hass)}` : ""}</p><div class="grid"><div class="metric"><span class="muted">${lang.distance}</span><span class="value">${km.toFixed(1)} km</span></div><div class="metric"><span class="muted">${lang.drives}</span><span class="value">${this.snapshot?.drives.length ?? 0}</span></div><div class="metric"><span class="muted">${lang.stops}</span><span class="value">${this.snapshot?.stops.length ?? 0}</span></div><div class="metric"><span class="muted">${lang.costs}</span><span class="value">${total.toFixed(2)} €</span></div></div><div class="actions">${trip.status === "planned" || trip.status === "paused" ? html`<button @click=${() => this.setStatus("active")}>${lang.resume}</button>` : ""}${trip.status === "active" ? html`<button class="secondary" @click=${() => this.setStatus("paused")}>${lang.pause}</button><button @click=${() => this.setStatus("completed")}>${lang.complete}</button>` : ""}</div>` : html`<p class="muted">${lang.noTrip}</p>`}${this.loading ? html`<p class="muted">${lang.loading}</p>` : ""}</ha-card>`; }
}
defineOnce("camper-travel-journal-summary-card", SummaryCard);
