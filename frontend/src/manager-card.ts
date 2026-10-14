import { css, html } from "lit";
import { TravelCard, defineOnce } from "./base-card";
import { createExpense, createTrip, list, type Snapshot } from "./api";

export class ManagerCard extends TravelCard {
  private snapshot?: Snapshot; private error = ""; private tripTitle = ""; private destination = ""; private amount = "";
  connectedCallback() { super.connectedCallback(); void this.refresh(); }
  disconnectedCallback() { super.disconnectedCallback(); }
  private async refresh() { if (!this.hass || !this.vehicleId) return; try { this.snapshot = await list(this.hass, this.vehicleId); this.requestUpdate(); } catch { this.error = "Reisedaten konnten nicht geladen werden."; this.requestUpdate(); } }
  private async addTrip() { if (!this.hass || !this.tripTitle.trim()) return; try { await createTrip(this.hass, this.vehicleId, this.tripTitle, new Date().toISOString(), this.destination); this.tripTitle = ""; this.destination = ""; await this.refresh(); } catch { this.error = "Reise konnte nicht gespeichert werden."; this.requestUpdate(); } }
  private async addExpense(tripId: string) { if (!this.hass || !this.amount) return; try { await createExpense(this.hass, this.vehicleId, tripId, { occurred_at: new Date().toISOString(), category: "other", amount_minor: Math.round(Number(this.amount) * 100), currency: "EUR" }); this.amount = ""; await this.refresh(); } catch { this.error = "Ausgabe konnte nicht gespeichert werden."; this.requestUpdate(); } }
  render() { const trips = this.snapshot?.trips ?? []; return html`<ha-card><h2>Reiseverwaltung</h2>${this.error ? html`<p class="error">${this.error}</p>` : ""}<section><h3>Neue Reise</h3><div class="actions"><input aria-label="Reisename" placeholder="Reisename" .value=${this.tripTitle} @input=${(e: InputEvent) => this.tripTitle = (e.target as HTMLInputElement).value}><input aria-label="Reiseziel" placeholder="Reiseziel" .value=${this.destination} @input=${(e: InputEvent) => this.destination = (e.target as HTMLInputElement).value}><button @click=${() => this.addTrip()}>Anlegen</button></div></section><section><h3>Reisen</h3>${trips.length ? trips.map((trip) => html`<article class="trip"><strong>${trip.title}</strong><span class="muted">${trip.destination || ""} · ${trip.status}</span><div class="actions"><input aria-label="Betrag" type="number" min="0" step="0.01" placeholder="EUR" .value=${this.amount} @input=${(e: InputEvent) => this.amount = (e.target as HTMLInputElement).value}><button class="secondary" @click=${() => this.addExpense(trip.id)}>Ausgabe speichern</button></div></article>`) : html`<p class="muted">Noch keine Reise angelegt.</p>`}</section></ha-card>`; }
}
ManagerCard.styles = [TravelCard.styles, css`section{margin-top:16px}.trip{display:grid;gap:6px;padding:12px 0;border-bottom:1px solid var(--divider-color)}`] as any;
defineOnce("camper-travel-journal-manager-card", ManagerCard);
