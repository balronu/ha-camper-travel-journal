import { css, html } from "lit";
import { TravelCard, defineOnce } from "./base-card";
import { createExpense, createTrip, deleteExpense, deleteTrip, linkDrives, list, transition, unlinkDrive, updateExpense, updateTrip, type Expense, type Snapshot } from "./api";
import { notifyExpensesChanged } from "./expense-events";
import { categoryLabel, EXPENSE_CATEGORIES, formatDate, formatMoneyMinor, isExpenseCategory, messages, parseAmountMinor, statusLabel, type ExpenseCategory } from "./i18n";

export class ManagerCard extends TravelCard {
  private snapshot?: Snapshot;
  private loadError = "";
  private actionError = "";
  private tripTitle = "";
  private destination = "";
  private amount = "";
  private category: ExpenseCategory = EXPENSE_CATEGORIES[0];
  private selected = "";
  private editingExpenseId = "";
  private editingAmount = "";
  private editingCategory = "other";
  private expenseSavingId = "";

  connectedCallback() { super.connectedCallback(); void this.refresh(); }
  protected onHassConnectionChanged() { void this.refresh(); }
  protected onConfigChanged() { void this.refresh(); }

  private async refresh(): Promise<boolean> {
    if (!this.hass || !this.vehicleId) return false;
    try {
      this.snapshot = await list(this.hass, this.vehicleId, this.selected || undefined);
      this.loadError = "";
      this.requestUpdate();
      return true;
    } catch {
      this.loadError = messages(this.hass).loadError;
      this.requestUpdate();
      return false;
    }
  }

  private fail(message: string) { this.actionError = message; this.requestUpdate(); }

  private setExpenseAmount(value: string) {
    this.amount = value;
    this.requestUpdate();
  }

  private setEditingExpenseAmount(value: string) {
    this.editingAmount = value;
    this.requestUpdate();
  }

  private setExpenseCategory(value: string) {
    if (!isExpenseCategory(value)) {
      this.fail(messages(this.hass).categoryInvalid);
      return;
    }
    this.category = value;
    this.requestUpdate();
  }

  private setEditingExpenseCategory(value: string) {
    if (!isExpenseCategory(value)) {
      this.fail(messages(this.hass).categoryInvalid);
      return;
    }
    this.editingCategory = value;
    this.requestUpdate();
  }

  private async addTrip() {
    if (!this.hass || !this.tripTitle.trim()) return;
    try {
      await createTrip(this.hass, this.vehicleId, this.tripTitle, new Date().toISOString(), this.destination);
      this.actionError = "";
      this.tripTitle = "";
      this.destination = "";
      await this.refresh();
    } catch { this.fail(messages(this.hass).tripCreateError); }
  }

  private async editTrip(trip: Snapshot["trips"][number]) {
    if (!this.hass) return;
    const lang = messages(this.hass);
    const title = window.prompt(lang.tripName, trip.title);
    if (title === null || !title.trim()) return;
    try { await updateTrip(this.hass, this.vehicleId, trip.id, { title }); await this.refresh(); }
    catch { this.fail(lang.tripEditError); }
  }

  private async removeTrip(id: string) {
    if (!this.hass) return;
    const lang = messages(this.hass);
    if (!window.confirm(lang.tripDeleteConfirm)) return;
    try {
      await deleteTrip(this.hass, this.vehicleId, id);
      if (this.selected === id) this.selected = "";
      await this.refresh();
    } catch { this.fail(lang.tripDeleteError); }
  }

  private async changeStatus(id: string, status: "active" | "paused" | "completed") {
    if (!this.hass) return;
    try { await transition(this.hass, this.vehicleId, id, status); await this.refresh(); }
    catch { this.fail(messages(this.hass).statusError); }
  }

  private async assignDrive(tripId: string, driveId: string) {
    if (!this.hass) return;
    try { await linkDrives(this.hass, this.vehicleId, tripId, [driveId]); await this.refresh(); }
    catch { this.fail(messages(this.hass).driveAssignError); }
  }

  private toggleTripDetails(tripId: string) {
    if (this.selected === tripId) {
      this.selected = "";
      this.requestUpdate();
      return;
    }
    this.selected = tripId;
    void this.refresh();
  }

  private async addExpense(tripId: string) {
    if (!this.hass) return;
    const lang = messages(this.hass);
    const amountMinor = parseAmountMinor(this.amount);
    if (amountMinor === null) { this.fail(lang.amountInvalid); return; }
    try {
      await createExpense(this.hass, this.vehicleId, tripId, { occurred_at: new Date().toISOString(), category: this.category, amount_minor: amountMinor, currency: "EUR" });
      this.actionError = "";
      if (await this.refresh()) {
        this.amount = "";
        notifyExpensesChanged({ vehicleId: this.vehicleId, tripId });
      }
    } catch { this.fail(lang.expenseCreateError); }
  }

  private startExpenseEdit(expense: Expense) {
    this.actionError = "";
    this.editingExpenseId = expense.id;
    this.editingAmount = (expense.amount_minor / 100).toFixed(2);
    this.editingCategory = expense.category;
    this.requestUpdate();
  }

  private cancelExpenseEdit() {
    this.editingExpenseId = "";
    this.editingAmount = "";
    this.editingCategory = "other";
    this.actionError = "";
    this.requestUpdate();
  }

  private async saveExpense(expense: Expense) {
    if (!this.hass || this.expenseSavingId) return;
    const lang = messages(this.hass);
    const amountMinor = parseAmountMinor(this.editingAmount);
    if (amountMinor === null) { this.fail(lang.amountInvalid); return; }
    if (!(EXPENSE_CATEGORIES as readonly string[]).includes(this.editingCategory)) { this.fail(lang.categoryInvalid); return; }
    this.expenseSavingId = expense.id;
    try {
      await updateExpense(this.hass, this.vehicleId, expense.id, { amount_minor: amountMinor, category: this.editingCategory });
      this.actionError = "";
      if (await this.refresh()) {
        this.cancelExpenseEdit();
        notifyExpensesChanged({ vehicleId: this.vehicleId, tripId: expense.trip_id ?? this.selected });
      }
    } catch { this.fail(lang.expenseEditError); }
    finally { this.expenseSavingId = ""; this.requestUpdate(); }
  }

  private async removeExpense(id: string) {
    if (!this.hass || this.expenseSavingId) return;
    const lang = messages(this.hass);
    if (!window.confirm(lang.expenseDeleteConfirm)) return;
    this.expenseSavingId = id;
    try { await deleteExpense(this.hass, this.vehicleId, id); this.actionError = ""; if (await this.refresh()) notifyExpensesChanged({ vehicleId: this.vehicleId, tripId: this.selected }); }
    catch { this.fail(lang.expenseDeleteError); }
    finally { this.expenseSavingId = ""; this.requestUpdate(); }
  }

  private categoryOptions(current?: string) {
    const categories = [...EXPENSE_CATEGORIES] as string[];
    if (current && !categories.includes(current)) categories.unshift(current);
    return categories;
  }

  private renderExpense(expense: Expense, lang: ReturnType<typeof messages>) {
    const editing = this.editingExpenseId === expense.id;
    const saving = this.expenseSavingId === expense.id;
    return html`<div class="expense-row">
      ${editing ? html`<form class="expense-form" @submit=${(event: SubmitEvent) => { event.preventDefault(); void this.saveExpense(expense); }}>
        <select aria-label=${lang.category} .value=${this.editingCategory} @change=${(event: Event) => this.setEditingExpenseCategory((event.currentTarget as HTMLSelectElement).value)}>
          ${this.categoryOptions(this.editingCategory).map((item) => html`<option value=${item}>${categoryLabel(item, this.hass)}</option>`)}
        </select>
        <input aria-label=${lang.amount} type="number" min="0" step="0.01" inputmode="decimal" .value=${this.editingAmount} @input=${(event: InputEvent) => this.setEditingExpenseAmount((event.currentTarget as HTMLInputElement).value)}>
        <div class="actions"><button type="submit" ?disabled=${saving}>${saving ? lang.saving : lang.save}</button><button type="button" class="secondary" @click=${() => this.cancelExpenseEdit()} ?disabled=${saving}>${lang.cancel}</button></div>
      </form>` : html`<span>${categoryLabel(expense.category, this.hass)}: ${formatMoneyMinor(expense.amount_minor, expense.currency, this.hass)}</span>
        <span class="actions"><button type="button" class="link" @click=${() => this.startExpenseEdit(expense)} ?disabled=${Boolean(this.expenseSavingId)}>${lang.edit}</button><button type="button" class="link" @click=${() => this.removeExpense(expense.id)} ?disabled=${Boolean(this.expenseSavingId)}>${lang.remove}</button></span>`}
    </div>`;
  }

  render() {
    const lang = messages(this.hass);
    const trips = this.snapshot?.trips ?? [];
    const expenses = this.snapshot?.expenses ?? [];
    const summary = this.snapshot?.expense_summary;
    const total = summary?.mixed_currency ? lang.mixedCurrency : summary?.total_minor !== undefined && summary.currency ? formatMoneyMinor(summary.total_minor, summary.currency, this.hass) : formatMoneyMinor(0, "EUR", this.hass);
    const error = this.loadError || this.actionError;
    return html`<ha-card><h2>${lang.manager}</h2>${error ? html`<p class="error" role="alert">${error}</p>` : ""}<section><h3>${lang.newTrip}</h3><div class="actions"><input aria-label=${lang.tripName} placeholder=${lang.tripName} .value=${this.tripTitle} @input=${(event: InputEvent) => this.tripTitle = (event.target as HTMLInputElement).value}><input aria-label=${lang.destination} placeholder=${lang.destination} .value=${this.destination} @input=${(event: InputEvent) => this.destination = (event.target as HTMLInputElement).value}><button type="button" @click=${() => this.addTrip()}>${lang.create}</button></div></section><section><h3>${lang.trips}</h3>${trips.length ? trips.map((trip) => html`<article class="trip"><div class="row"><strong>${trip.title}</strong><span class="muted">${trip.destination || ""} · ${statusLabel(trip.status, this.hass)}</span></div><div class="actions"><button type="button" class="secondary" @click=${() => this.editTrip(trip)}>${lang.edit}</button><button type="button" class="secondary" @click=${() => this.removeTrip(trip.id)}>${lang.remove}</button>${trip.status === "planned" || trip.status === "paused" ? html`<button type="button" @click=${() => this.changeStatus(trip.id, "active")}>${lang.resume}</button>` : ""}${trip.status === "active" ? html`<button type="button" class="secondary" @click=${() => this.changeStatus(trip.id, "paused")}>${lang.pause}</button><button type="button" @click=${() => this.changeStatus(trip.id, "completed")}>${lang.complete}</button>` : ""}<button type="button" class="secondary" @click=${() => this.toggleTripDetails(trip.id)}>${this.selected === trip.id ? lang.close : lang.details}</button></div>${this.selected === trip.id ? html`<div class="details"><h4>${lang.assignedDrives}</h4>${(this.snapshot?.drives ?? []).map((drive) => html`<div class="row"><span>${formatDate(drive.started_at, this.hass)} · ${(drive.distance_m / 1000).toFixed(1)} km</span>${drive.trip_id === trip.id ? html`<button type="button" class="link" @click=${() => this.hass && unlinkDrive(this.hass, this.vehicleId, trip.id, drive.id).then(() => this.refresh())}>${lang.unassign}</button>` : ""}</div>`)}${(this.snapshot?.available_drives ?? []).length ? html`<h4>${lang.freeDrives}</h4>${this.snapshot?.available_drives?.map((drive) => html`<div class="row"><span>${formatDate(drive.started_at, this.hass)} · ${(drive.distance_m / 1000).toFixed(1)} km}</span><button type="button" class="link" @click=${() => this.assignDrive(trip.id, drive.id)}>${lang.assign}</button></div>`)}` : ""}<h4>${lang.expenses}</h4><div class="expense-form create-form"><input aria-label=${lang.amount} type="number" min="0" step="0.01" inputmode="decimal" placeholder="EUR" .value=${this.amount} @input=${(event: InputEvent) => this.setExpenseAmount((event.currentTarget as HTMLInputElement).value)}><select aria-label=${lang.category} .value=${this.category} @change=${(event: Event) => this.setExpenseCategory((event.currentTarget as HTMLSelectElement).value)}>${EXPENSE_CATEGORIES.map((item) => html`<option value=${item}>${categoryLabel(item, this.hass)}</option>`)}</select><button type="button" @click=${() => this.addExpense(trip.id)}>${lang.save}</button></div>${expenses.map((expense) => this.renderExpense(expense, lang))}<p class="total"><strong>${lang.total}: ${total}</strong></p></div>` : ""}</article>`) : html`<p class="muted">${lang.noTrip}</p>`}</section></ha-card>`;
  }
}

ManagerCard.styles = [TravelCard.styles, css`section{margin-top:16px}.trip{display:grid;gap:8px;padding:12px 0;border-bottom:1px solid var(--divider-color)}.row,.expense-row{display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap}.details{padding:8px;background:var(--secondary-background-color)}h4{margin:12px 0 4px}.link{min-height:30px;padding:4px 8px;font-size:.9em}.expense-form{display:grid;grid-template-columns:minmax(0,1fr) minmax(7rem,10rem) auto;gap:8px;align-items:center;width:100%}.expense-form input,.expense-form select{min-width:0;width:100%;box-sizing:border-box}.create-form{grid-template-columns:minmax(7rem,10rem) minmax(0,1fr) auto}.total{margin:12px 0 0;text-align:right}@media(max-width:500px){.expense-form,.create-form{grid-template-columns:1fr}.expense-form .actions{margin-top:0}.total{text-align:left}}`] as any;
defineOnce("camper-travel-journal-manager-card", ManagerCard);
