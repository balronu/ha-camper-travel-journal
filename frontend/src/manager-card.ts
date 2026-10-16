import { css, html } from "lit";
import { TravelCard, defineOnce } from "./base-card";
import { analyzeGPX, createExpense, createManualDrive, createTrip, deleteExpense, deleteManualDrive, deleteTrip, exportPdf, importGPX, linkDrives, list, transition, unlinkDrive, updateExpense, updateManualDrive, updateTrip, type Drive, type Expense, type GPXPreview, type Snapshot } from "./api";
import { notifyExpensesChanged, notifyTravelChanged } from "./expense-events";
import { categoryLabel, EXPENSE_CATEGORIES, formatDateTime, formatDuration, formatMoneyMinor, formatTripPeriod, isExpenseCategory, messages, parseAmountMinor, statusLabel, type ExpenseCategory } from "./i18n";

export class ManagerCard extends TravelCard {
  private snapshot?: Snapshot; private loadError = ""; private actionError = "";
  private tripTitle = ""; private destination = ""; private tripStartDate = ""; private tripEndDate = "";
  private editingTripId = ""; private editingTripTitle = ""; private editingDestination = ""; private editingStartDate = ""; private editingEndDate = "";
  private confirmingTripId = ""; private confirmingExpenseId = ""; private amount = ""; private category: ExpenseCategory = EXPENSE_CATEGORIES[0];
  private selected = ""; private editingExpenseId = ""; private editingAmount = ""; private editingCategory = "other"; private expenseSavingId = "";
  private manualOccurredAt = ""; private manualStartLocation = ""; private manualEndLocation = ""; private manualDistanceKm = ""; private manualDurationMinutes = ""; private manualSaving = false;
  private editingDriveId = ""; private editingDriveOccurredAt = ""; private editingDriveStartLocation = ""; private editingDriveEndLocation = ""; private editingDriveDistanceKm = ""; private editingDriveDurationMinutes = ""; private driveSavingId = ""; private confirmingDriveId = "";
  private gpxContent = ""; private gpxName = ""; private gpxPreview?: GPXPreview; private gpxSelected = new Set<string>(); private gpxTripId = ""; private gpxBusy = false; private gpxError = "";
  private pdfBusyTripId = "";
  private pdfSelectedTripId = "";

  connectedCallback() { super.connectedCallback(); void this.refresh(); }
  protected onHassConnectionChanged() { void this.refresh(); }
  protected onConfigChanged() { void this.refresh(); }
  private async refresh(): Promise<boolean> { if (!this.hass || !this.vehicleId) return false; try { this.snapshot = await list(this.hass, this.vehicleId, this.selected || undefined); this.loadError = ""; this.requestUpdate(); return true; } catch { this.loadError = messages(this.hass).loadError; this.requestUpdate(); return false; } }
  private fail(message: string) { this.actionError = message; this.requestUpdate(); }
  private async readGPX(event: Event) {
    const file = (event.currentTarget as HTMLInputElement).files?.[0];
    if (!file || !this.hass) return;
    this.gpxBusy = true; this.gpxError = ""; this.gpxPreview = undefined; this.gpxName = file.name;
    try { const bytes = new Uint8Array(await file.arrayBuffer()); let binary = ""; bytes.forEach((byte) => { binary += String.fromCharCode(byte); }); this.gpxContent = btoa(binary); this.gpxPreview = await analyzeGPX(this.hass, this.vehicleId, this.gpxContent); this.gpxSelected = new Set(this.gpxPreview.drives.map((drive) => drive.key)); this.gpxTripId = this.selected; }
    catch { this.gpxError = messages(this.hass).gpxAnalyzeError; }
    finally { this.gpxBusy = false; this.requestUpdate(); }
  }
  private async confirmGPX() {
    if (!this.hass || !this.gpxPreview || this.gpxBusy || this.gpxPreview.conflicts.duplicate_file) return;
    this.gpxBusy = true; this.gpxError = "";
    try { const importedTripId = this.gpxTripId || undefined; await importGPX(this.hass, this.vehicleId, this.gpxContent, this.gpxPreview.file_hash, [...this.gpxSelected], importedTripId); this.gpxPreview = undefined; this.gpxContent = ""; this.gpxSelected.clear(); this.gpxTripId = ""; this.actionError = ""; await this.refresh(); notifyTravelChanged({ vehicleId: this.vehicleId, tripId: importedTripId ?? "" }); }
    catch { this.gpxError = messages(this.hass).gpxImportError; }
    finally { this.gpxBusy = false; this.requestUpdate(); }
  }
  private setExpenseAmount(value: string) { this.amount = value; this.requestUpdate(); }
  private setEditingExpenseAmount(value: string) { this.editingAmount = value; this.requestUpdate(); }
  private setExpenseCategory(value: string) { if (!isExpenseCategory(value)) return this.fail(messages(this.hass).categoryInvalid); this.category = value; this.requestUpdate(); }
  private setEditingExpenseCategory(value: string) { if (!isExpenseCategory(value)) return this.fail(messages(this.hass).categoryInvalid); this.editingCategory = value; this.requestUpdate(); }
  private gpxPeriod(): { start: string; end: string } | undefined {
    const dates = (this.gpxPreview?.points ?? []).map((point) => point.recorded_at).sort();
    return dates.length ? { start: dates[0], end: dates[dates.length - 1] } : undefined;
  }
  private gpxSelectedDistanceKm(): number { return (this.gpxPreview?.drives ?? []).filter((drive) => this.gpxSelected.has(drive.key)).reduce((total, drive) => total + drive.distance_m, 0) / 1000; }
  private gpxTripPeriodWarning(trip: Snapshot["trips"][number] | undefined): boolean {
    const period = this.gpxPeriod();
    if (!period || !trip || (!trip.start_date && !trip.end_date)) return false;
    const start = period.start.slice(0, 10); const end = period.end.slice(0, 10);
    return Boolean((trip.start_date && start < trip.start_date) || (trip.end_date && end > trip.end_date));
  }

  private async addTrip() {
    if (!this.hass || !this.tripTitle.trim()) return;
    if (this.tripStartDate && this.tripEndDate && this.tripEndDate < this.tripStartDate) return this.fail(messages(this.hass).dateInvalid);
    try { await createTrip(this.hass, this.vehicleId, this.tripTitle, this.tripStartDate, this.tripEndDate, this.destination); this.actionError = ""; this.tripTitle = ""; this.destination = ""; this.tripStartDate = ""; this.tripEndDate = ""; await this.refresh(); notifyTravelChanged({ vehicleId: this.vehicleId, tripId: this.selected }); }
    catch { this.fail(messages(this.hass).tripCreateError); }
  }
  private startTripEdit(trip: Snapshot["trips"][number]) { this.actionError = ""; this.editingTripId = trip.id; this.editingTripTitle = trip.title; this.editingDestination = trip.destination || ""; this.editingStartDate = trip.start_date || ""; this.editingEndDate = trip.end_date || ""; this.requestUpdate(); }
  private cancelTripEdit() { this.editingTripId = ""; this.actionError = ""; this.requestUpdate(); }
  private async saveTrip(trip: Snapshot["trips"][number]) {
    if (!this.hass || !this.editingTripTitle.trim()) return this.fail(messages(this.hass).tripEditError);
    if (this.editingStartDate && this.editingEndDate && this.editingEndDate < this.editingStartDate) return this.fail(messages(this.hass).dateInvalid);
    try { await updateTrip(this.hass, this.vehicleId, trip.id, { title: this.editingTripTitle, destination: this.editingDestination, start_date: this.editingStartDate, end_date: this.editingEndDate }); this.actionError = ""; this.editingTripId = ""; await this.refresh(); notifyTravelChanged({ vehicleId: this.vehicleId, tripId: trip.id }); }
    catch { this.fail(messages(this.hass).tripEditError); }
  }
  private async removeTrip(id: string) {
    if (!this.hass) return;
    if (this.confirmingTripId !== id) { this.confirmingTripId = id; this.requestUpdate(); return; }
    try { await deleteTrip(this.hass, this.vehicleId, id); this.confirmingTripId = ""; if (this.selected === id) this.selected = ""; await this.refresh(); notifyTravelChanged({ vehicleId: this.vehicleId, tripId: id }); }
    catch { this.fail(messages(this.hass).tripDeleteError); }
  }
  private async changeStatus(id: string, status: "active" | "paused" | "completed") { if (!this.hass) return; try { await transition(this.hass, this.vehicleId, id, status); this.actionError = ""; await this.refresh(); notifyTravelChanged({ vehicleId: this.vehicleId, tripId: id }); } catch { this.fail(messages(this.hass).statusError); } }
  private async assignDrive(tripId: string, driveId: string) { if (!this.hass) return; try { await linkDrives(this.hass, this.vehicleId, tripId, [driveId]); this.actionError = ""; await this.refresh(); notifyTravelChanged({ vehicleId: this.vehicleId, tripId }); } catch { this.fail(messages(this.hass).driveAssignError); } }
  private async unassignDrive(tripId: string, driveId: string) { if (!this.hass) return; try { await unlinkDrive(this.hass, this.vehicleId, tripId, driveId); this.actionError = ""; await this.refresh(); notifyTravelChanged({ vehicleId: this.vehicleId, tripId }); } catch { this.fail(messages(this.hass).driveAssignError); } }
  private toggleTripDetails(tripId: string) { this.selected = this.selected === tripId ? "" : tripId; if (this.selected) void this.refresh(); else this.requestUpdate(); }

  private async addManualDrive(tripId: string) {
    if (!this.hass || this.manualSaving) return;
    const distance = Number(this.manualDistanceKm.replace(",", ".")); const duration = this.manualDurationMinutes ? Number(this.manualDurationMinutes) : undefined;
    if (!this.manualOccurredAt || !this.manualStartLocation.trim() || !this.manualEndLocation.trim() || !Number.isFinite(distance) || distance < 0 || (duration !== undefined && (!Number.isInteger(duration) || duration < 0))) return this.fail(messages(this.hass).dateInvalid);
    this.manualSaving = true;
    try { await createManualDrive(this.hass, this.vehicleId, { trip_id: tripId, occurred_at: new Date(this.manualOccurredAt).toISOString(), start_location: this.manualStartLocation, end_location: this.manualEndLocation, distance_km: distance, ...(duration === undefined ? {} : { duration_minutes: duration }) }); this.actionError = ""; this.manualStartLocation = ""; this.manualEndLocation = ""; this.manualDistanceKm = ""; this.manualDurationMinutes = ""; await this.refresh(); notifyTravelChanged({ vehicleId: this.vehicleId, tripId }); }
    catch { this.fail(messages(this.hass).driveCreateError); }
    finally { this.manualSaving = false; this.requestUpdate(); }
  }
  private localDateTime(value: string) { const date = new Date(value); const pad = (part: number) => String(part).padStart(2, "0"); return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`; }
  private startManualDriveEdit(drive: Drive) { this.actionError = ""; this.editingDriveId = drive.id; this.editingDriveOccurredAt = this.localDateTime(drive.started_at); this.editingDriveStartLocation = drive.start_label || ""; this.editingDriveEndLocation = drive.end_label || ""; this.editingDriveDistanceKm = (drive.distance_m / 1000).toFixed(1); this.editingDriveDurationMinutes = drive.duration_seconds ? String(Math.round(drive.duration_seconds / 60)) : ""; this.requestUpdate(); }
  private cancelManualDriveEdit() { this.editingDriveId = ""; this.actionError = ""; this.requestUpdate(); }
  private async saveManualDrive(drive: Drive, tripId: string) {
    if (!this.hass || this.driveSavingId) return;
    const distance = Number(this.editingDriveDistanceKm.replace(",", ".")); const duration = this.editingDriveDurationMinutes ? Number(this.editingDriveDurationMinutes) : undefined;
    if (!this.editingDriveOccurredAt || !this.editingDriveStartLocation.trim() || !this.editingDriveEndLocation.trim() || !Number.isFinite(distance) || distance < 0 || (duration !== undefined && (!Number.isInteger(duration) || duration < 0))) return this.fail(messages(this.hass).dateInvalid);
    this.driveSavingId = drive.id;
    try { await updateManualDrive(this.hass, this.vehicleId, drive.id, { occurred_at: new Date(this.editingDriveOccurredAt).toISOString(), start_location: this.editingDriveStartLocation, end_location: this.editingDriveEndLocation, distance_km: distance, ...(duration === undefined ? {} : { duration_minutes: duration }) }); this.actionError = ""; this.cancelManualDriveEdit(); await this.refresh(); notifyTravelChanged({ vehicleId: this.vehicleId, tripId }); }
    catch { this.fail(messages(this.hass).driveEditError); }
    finally { this.driveSavingId = ""; this.requestUpdate(); }
  }
  private async removeManualDrive(tripId: string, driveId: string) {
    if (!this.hass || this.driveSavingId) return;
    if (this.confirmingDriveId !== driveId) { this.confirmingDriveId = driveId; this.requestUpdate(); return; }
    this.driveSavingId = driveId;
    try { await deleteManualDrive(this.hass, this.vehicleId, driveId); this.confirmingDriveId = ""; this.actionError = ""; await this.refresh(); notifyTravelChanged({ vehicleId: this.vehicleId, tripId }); }
    catch { this.fail(messages(this.hass).driveDeleteError); }
    finally { this.driveSavingId = ""; this.requestUpdate(); }
  }
  private async addExpense(tripId: string) {
    if (!this.hass) return; const lang = messages(this.hass); const amountMinor = parseAmountMinor(this.amount); if (amountMinor === null) return this.fail(lang.amountInvalid);
    try { await createExpense(this.hass, this.vehicleId, tripId, { occurred_at: new Date().toISOString(), category: this.category, amount_minor: amountMinor, currency: "EUR" }); this.actionError = ""; if (await this.refresh()) { this.amount = ""; notifyExpensesChanged({ vehicleId: this.vehicleId, tripId }); } }
    catch { this.fail(lang.expenseCreateError); }
  }
  private startExpenseEdit(expense: Expense) { this.actionError = ""; this.editingExpenseId = expense.id; this.editingAmount = (expense.amount_minor / 100).toFixed(2); this.editingCategory = expense.category; this.requestUpdate(); }
  private cancelExpenseEdit() { this.editingExpenseId = ""; this.editingAmount = ""; this.editingCategory = "other"; this.actionError = ""; this.requestUpdate(); }
  private async saveExpense(expense: Expense) {
    if (!this.hass || this.expenseSavingId) return; const lang = messages(this.hass); const amountMinor = parseAmountMinor(this.editingAmount); if (amountMinor === null) return this.fail(lang.amountInvalid); if (!isExpenseCategory(this.editingCategory)) return this.fail(lang.categoryInvalid);
    this.expenseSavingId = expense.id;
    try { await updateExpense(this.hass, this.vehicleId, expense.id, { amount_minor: amountMinor, category: this.editingCategory }); this.actionError = ""; if (await this.refresh()) { this.cancelExpenseEdit(); notifyExpensesChanged({ vehicleId: this.vehicleId, tripId: expense.trip_id ?? this.selected }); } }
    catch { this.fail(lang.expenseEditError); }
    finally { this.expenseSavingId = ""; this.requestUpdate(); }
  }
  private async removeExpense(id: string) {
    if (!this.hass || this.expenseSavingId) return; if (this.confirmingExpenseId !== id) { this.confirmingExpenseId = id; this.requestUpdate(); return; }
    this.expenseSavingId = id;
    try { await deleteExpense(this.hass, this.vehicleId, id); this.confirmingExpenseId = ""; this.actionError = ""; if (await this.refresh()) notifyExpensesChanged({ vehicleId: this.vehicleId, tripId: this.selected }); }
    catch { this.fail(messages(this.hass).expenseDeleteError); }
    finally { this.expenseSavingId = ""; this.requestUpdate(); }
  }
  private categoryOptions(current?: string) { const categories = [...EXPENSE_CATEGORIES] as string[]; if (current && !categories.includes(current)) categories.unshift(current); return categories; }

  private async downloadPdf(trip: Snapshot["trips"][number]) {
    if (!this.hass || this.pdfBusyTripId) return;
    this.pdfBusyTripId = trip.id; this.actionError = ""; this.requestUpdate();
    try {
      const report = await exportPdf(this.hass, this.vehicleId, trip.id);
      const binary = atob(report.pdf_base64);
      const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
      const url = URL.createObjectURL(new Blob([bytes], { type: report.content_type }));
      const anchor = document.createElement("a");
      anchor.href = url; anchor.download = report.filename; anchor.click();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch { this.fail(messages(this.hass).pdfExportError); }
    finally { this.pdfBusyTripId = ""; this.requestUpdate(); }
  }

  private renderExpense(expense: Expense, lang: ReturnType<typeof messages>) {
    const editing = this.editingExpenseId === expense.id; const saving = this.expenseSavingId === expense.id;
    return html`<div class="expense-row">${editing ? html`<form class="expense-form" @submit=${(event: SubmitEvent) => { event.preventDefault(); void this.saveExpense(expense); }}><select aria-label=${lang.category} .value=${this.editingCategory} @change=${(event: Event) => this.setEditingExpenseCategory((event.currentTarget as HTMLSelectElement).value)}>${this.categoryOptions(this.editingCategory).map((item) => html`<option value=${item}>${categoryLabel(item, this.hass)}</option>`)}</select><input aria-label=${lang.amount} type="number" min="0" step="0.01" inputmode="decimal" .value=${this.editingAmount} @input=${(event: InputEvent) => this.setEditingExpenseAmount((event.currentTarget as HTMLInputElement).value)}><div class="actions"><button type="submit" ?disabled=${saving}>${saving ? lang.saving : lang.save}</button><button type="button" class="secondary" @click=${() => this.cancelExpenseEdit()} ?disabled=${saving}>${lang.cancel}</button></div></form>` : html`<span>${categoryLabel(expense.category, this.hass)}: ${formatMoneyMinor(expense.amount_minor, expense.currency, this.hass)}</span><span class="actions"><button type="button" class="link" @click=${() => this.startExpenseEdit(expense)} ?disabled=${Boolean(this.expenseSavingId)}>${lang.edit}</button><button type="button" class="link" @click=${() => this.removeExpense(expense.id)}>${this.confirmingExpenseId === expense.id ? lang.confirmDelete : lang.remove}</button></span>`}</div>`;
  }
  private renderDrive(drive: Drive, tripId: string, lang: ReturnType<typeof messages>) {
    const source = drive.source === "manual" ? lang.sourceManual : lang.sourceGps;
    const locations = drive.source === "manual" ? `${drive.start_label || "—"} → ${drive.end_label || "—"}` : `${lang.driveStart}: ${formatDateTime(drive.started_at, this.hass)} · ${lang.driveEnd}: ${formatDateTime(drive.ended_at, this.hass)}`;
    if (this.editingDriveId === drive.id) return html`<form class="form-grid drive-edit-form" @submit=${(event: SubmitEvent) => { event.preventDefault(); void this.saveManualDrive(drive, tripId); }}><label>${lang.driveStart}<input type="datetime-local" .value=${this.editingDriveOccurredAt} @input=${(event: InputEvent) => this.editingDriveOccurredAt = (event.currentTarget as HTMLInputElement).value}></label><input aria-label=${lang.startLocation} .value=${this.editingDriveStartLocation} @input=${(event: InputEvent) => this.editingDriveStartLocation = (event.currentTarget as HTMLInputElement).value}><input aria-label=${lang.endLocation} .value=${this.editingDriveEndLocation} @input=${(event: InputEvent) => this.editingDriveEndLocation = (event.currentTarget as HTMLInputElement).value}><input aria-label=${lang.distanceKm} type="number" min="0" step="0.1" inputmode="decimal" .value=${this.editingDriveDistanceKm} @input=${(event: InputEvent) => this.editingDriveDistanceKm = (event.currentTarget as HTMLInputElement).value}><input aria-label=${lang.durationMinutes} type="number" min="0" step="1" .value=${this.editingDriveDurationMinutes} @input=${(event: InputEvent) => this.editingDriveDurationMinutes = (event.currentTarget as HTMLInputElement).value}><button type="submit" ?disabled=${this.driveSavingId === drive.id}>${this.driveSavingId === drive.id ? lang.saving : lang.save}</button><button type="button" class="secondary" @click=${() => this.cancelManualDriveEdit()} ?disabled=${Boolean(this.driveSavingId)}>${lang.cancel}</button></form>`;
    const assignment = drive.trip_id === tripId ? html`<button type="button" class="link" @click=${() => this.unassignDrive(tripId, drive.id)}>${lang.unassign}</button>` : html`<button type="button" class="link" @click=${() => this.assignDrive(tripId, drive.id)}>${lang.assign}</button>`;
    const manualActions = drive.source === "manual" ? html`<button type="button" class="link" @click=${() => this.startManualDriveEdit(drive)} ?disabled=${Boolean(this.driveSavingId)}>${lang.edit}</button><button type="button" class="link" @click=${() => this.removeManualDrive(tripId, drive.id)} ?disabled=${Boolean(this.driveSavingId)}>${this.confirmingDriveId === drive.id ? lang.confirmDelete : lang.remove}</button>` : "";
    return html`<div class="drive-row"><div><strong>${source}</strong> · ${locations}<br><span class="muted">${(drive.distance_m / 1000).toFixed(1)} km · ${formatDuration(drive.duration_seconds, this.hass)} · ${drive.assignment_status === "assigned" ? lang.assignedDrives : lang.freeDrives}</span></div><span class="actions">${manualActions}${assignment}</span></div>`;
  }
  private renderGpx(lang: ReturnType<typeof messages>, trips: Snapshot["trips"], gpx: GPXPreview | undefined) {
    const selectedTrip = trips.find((trip) => trip.id === this.gpxTripId);
    const period = this.gpxPeriod();
    const periodWarning = this.gpxTripPeriodWarning(selectedTrip);
    return html`<ha-card><section class="gpx-import gpx-explicit"><h2>${lang.gpxImport}</h2><p class="muted"><strong>${lang.gpxVehicle}:</strong> ${this.vehicleId} (${lang.gpxVehicleFixed})</p><label>${lang.gpxTargetTrip}<select aria-label=${lang.gpxTargetTrip} .value=${this.gpxTripId} @change=${(event: Event) => { this.gpxTripId = (event.currentTarget as HTMLSelectElement).value; this.requestUpdate(); }}><option value="">${lang.gpxNoTrip}</option>${trips.map((trip) => html`<option value=${trip.id}>${trip.title} · ${statusLabel(trip.status, this.hass)} · ${formatTripPeriod(trip, this.hass) || lang.period}</option>`)}</select></label><input type="file" accept=".gpx,application/gpx+xml,application/xml" @change=${(event: Event) => this.readGPX(event)} ?disabled=${this.gpxBusy}><p class="muted">${this.gpxName || lang.gpxPrivacy}</p>${this.gpxError ? html`<p class="error" role="alert">${this.gpxError}</p>` : ""}${gpx ? html`<div class="gpx-preview"><strong>${gpx.drives.length} ${lang.gpxSections}, ${gpx.points.length} ${lang.gpxPoints}</strong>${period ? html`<p class="muted">${lang.gpxPeriod}: ${formatDateTime(period.start, this.hass)} – ${formatDateTime(period.end, this.hass)}</p>` : ""}${periodWarning ? html`<p class="warning" role="alert">${lang.gpxPeriodWarning}</p>` : ""}<h3>${lang.gpxSummary}</h3><p class="muted">${gpx.points.length} ${lang.gpxPoints}, ${this.gpxSelected.size} ${lang.gpxSelectedDrives}, ${this.gpxSelectedDistanceKm().toFixed(1)} ${lang.gpxDistance}, ${selectedTrip?.title || lang.gpxNoTrip}</p><div class="gpx-drive-list">${gpx.drives.map((drive) => html`<label><input type="checkbox" .checked=${this.gpxSelected.has(drive.key)} @change=${(event: Event) => { const checked = (event.currentTarget as HTMLInputElement).checked; checked ? this.gpxSelected.add(drive.key) : this.gpxSelected.delete(drive.key); this.requestUpdate(); }}> ${formatDateTime(drive.started_at, this.hass)} – ${formatDateTime(drive.ended_at, this.hass)} · ${(drive.distance_m / 1000).toFixed(1)} km · ${formatDuration(drive.duration_seconds, this.hass)}</label>`)}</div>${gpx.warnings.length ? html`<p class="muted">${lang.gpxWarnings}: ${gpx.warnings.map((warning) => warning === "gpx_gap_possible_drive_boundary" ? lang.gpxGapBoundary : warning).join(", ")}</p>` : ""}${gpx.conflicts.duplicate_file ? html`<p class="error" role="alert">${lang.gpxDuplicate}</p>` : html`<button type="button" @click=${() => this.confirmGPX()} ?disabled=${this.gpxBusy || this.gpxSelected.size === 0}>${this.gpxBusy ? lang.saving : lang.gpxConfirm}</button>`}</div>` : ""}</section></ha-card>`;
  }
  private renderPdfExport(lang: ReturnType<typeof messages>, trips: Snapshot["trips"]) {
    if (!trips.length) return "";
    const tripId = trips.some((trip) => trip.id === this.pdfSelectedTripId) ? this.pdfSelectedTripId : (this.selected || trips[0].id);
    const trip = trips.find((item) => item.id === tripId) ?? trips[0];
    return html`<section class="pdf-export"><h3>${lang.pdfExportTitle}</h3><div class="pdf-export-row"><select aria-label=${lang.pdfExportTrip} .value=${trip.id} @change=${(event: Event) => { this.pdfSelectedTripId = (event.currentTarget as HTMLSelectElement).value; this.requestUpdate(); }}>${trips.map((item) => html`<option value=${item.id}>${item.title}</option>`)}</select><button type="button" @click=${() => void this.downloadPdf(trip)} ?disabled=${Boolean(this.pdfBusyTripId)}>${this.pdfBusyTripId ? lang.pdfExporting : lang.pdfExport}</button></div></section>`;
  }
  render() { const lang = messages(this.hass); const trips = this.snapshot?.trips ?? []; return html`${this.renderGpx(lang, trips, this.gpxPreview)}${this.renderPdfExport(lang, trips)}${this.renderLegacy()}`; }
  private renderLegacy() {
    const lang = messages(this.hass); const trips = this.snapshot?.trips ?? []; const expenses = this.snapshot?.expenses ?? []; const summary = this.snapshot?.expense_summary;
    const total = summary?.mixed_currency ? lang.mixedCurrency : summary?.total_minor !== undefined && summary.currency ? formatMoneyMinor(summary.total_minor, summary.currency, this.hass) : formatMoneyMinor(0, "EUR", this.hass); const error = this.loadError || this.actionError;
    const gpx = this.gpxPreview;
    return html`<ha-card><h2>${lang.manager}</h2>${error ? html`<p class="error" role="alert">${error}</p>` : ""}<section class="gpx-import"><h3>${lang.gpxImport}</h3><input type="file" accept=".gpx,application/gpx+xml,application/xml" @change=${(event: Event) => this.readGPX(event)} ?disabled=${this.gpxBusy}><p class="muted">${this.gpxName || lang.gpxPrivacy}</p>${this.gpxError ? html`<p class="error" role="alert">${this.gpxError}</p>` : ""}${gpx ? html`<div class="gpx-preview"><strong>${gpx.drives.length} ${lang.gpxSections}, ${gpx.points.length} ${lang.gpxPoints}</strong><ul>${gpx.drives.map((drive) => html`<li><label><input type="checkbox" .checked=${this.gpxSelected.has(drive.key)} @change=${(event: Event) => { const checked = (event.currentTarget as HTMLInputElement).checked; checked ? this.gpxSelected.add(drive.key) : this.gpxSelected.delete(drive.key); this.requestUpdate(); }}> ${formatDateTime(drive.started_at, this.hass)} – ${formatDateTime(drive.ended_at, this.hass)} · ${(drive.distance_m / 1000).toFixed(1)} km · ${formatDuration(drive.duration_seconds, this.hass)}</label></li>`)}</ul>${gpx.warnings.length ? html`<p class="muted">${lang.gpxWarnings}: ${gpx.warnings.join(", ")}</p>` : ""}${gpx.conflicts.duplicate_file ? html`<p class="error" role="alert">${lang.gpxDuplicate}</p>` : html`<button type="button" @click=${() => this.confirmGPX()} ?disabled=${this.gpxBusy || this.gpxSelected.size === 0}>${this.gpxBusy ? lang.saving : lang.gpxConfirm}</button>`}</div>` : ""}</section><section><h3>${lang.newTrip}</h3><div class="form-grid"><input aria-label=${lang.tripName} placeholder=${lang.tripName} .value=${this.tripTitle} @input=${(event: InputEvent) => this.tripTitle = (event.target as HTMLInputElement).value}><input aria-label=${lang.destination} placeholder=${lang.destination} .value=${this.destination} @input=${(event: InputEvent) => this.destination = (event.target as HTMLInputElement).value}><label>${lang.startDate}<input type="date" .value=${this.tripStartDate} @input=${(event: InputEvent) => this.tripStartDate = (event.currentTarget as HTMLInputElement).value}></label><label>${lang.endDate}<input type="date" .value=${this.tripEndDate} @input=${(event: InputEvent) => this.tripEndDate = (event.currentTarget as HTMLInputElement).value}></label><button type="button" @click=${() => this.addTrip()}>${lang.create}</button></div></section><section><h3>${lang.trips}</h3>${trips.length ? trips.map((trip) => html`<article class="trip"><div class="row"><strong>${trip.title}</strong><span class="muted">${trip.destination || ""} · ${statusLabel(trip.status, this.hass)} · ${formatTripPeriod(trip, this.hass) || lang.period}</span></div>${this.editingTripId === trip.id ? html`<form class="form-grid" @submit=${(event: SubmitEvent) => { event.preventDefault(); void this.saveTrip(trip); }}><input aria-label=${lang.tripName} .value=${this.editingTripTitle} @input=${(event: InputEvent) => this.editingTripTitle = (event.currentTarget as HTMLInputElement).value}><input aria-label=${lang.destination} .value=${this.editingDestination} @input=${(event: InputEvent) => this.editingDestination = (event.currentTarget as HTMLInputElement).value}><label>${lang.startDate}<input type="date" .value=${this.editingStartDate} @input=${(event: InputEvent) => this.editingStartDate = (event.currentTarget as HTMLInputElement).value}></label><label>${lang.endDate}<input type="date" .value=${this.editingEndDate} @input=${(event: InputEvent) => this.editingEndDate = (event.currentTarget as HTMLInputElement).value}></label><button type="submit">${lang.save}</button><button type="button" class="secondary" @click=${() => this.cancelTripEdit()}>${lang.cancel}</button></form>` : html`<div class="actions"><button type="button" class="secondary" @click=${() => this.startTripEdit(trip)}>${lang.edit}</button><button type="button" class="secondary" @click=${() => this.removeTrip(trip.id)}>${this.confirmingTripId === trip.id ? lang.confirmDelete : lang.remove}</button>${trip.status === "planned" || trip.status === "paused" ? html`<button type="button" @click=${() => this.changeStatus(trip.id, "active")}>${lang.resume}</button>` : ""}${trip.status === "active" ? html`<button type="button" class="secondary" @click=${() => this.changeStatus(trip.id, "paused")}>${lang.pause}</button><button type="button" @click=${() => this.changeStatus(trip.id, "completed")}>${lang.complete}</button>` : ""}<button type="button" class="secondary" @click=${() => this.toggleTripDetails(trip.id)}>${this.selected === trip.id ? lang.close : lang.details}</button></div>`}${this.selected === trip.id ? html`<div class="details"><h4>${lang.assignedDrives}</h4>${(this.snapshot?.drives ?? []).length ? (this.snapshot?.drives ?? []).map((drive) => this.renderDrive(drive, trip.id, lang)) : html`<p class="muted">${lang.noDrives}</p>`}<h4>${lang.freeDrives}</h4>${(this.snapshot?.available_drives ?? []).length ? (this.snapshot?.available_drives ?? []).map((drive) => this.renderDrive(drive, trip.id, lang)) : html`<p class="muted">${lang.noDrives}</p>`}<h4>${lang.manualDrive}</h4><div class="form-grid"><label>${lang.driveStart}<input type="datetime-local" .value=${this.manualOccurredAt} @input=${(event: InputEvent) => this.manualOccurredAt = (event.currentTarget as HTMLInputElement).value}></label><input aria-label=${lang.startLocation} placeholder=${lang.startLocation} .value=${this.manualStartLocation} @input=${(event: InputEvent) => this.manualStartLocation = (event.currentTarget as HTMLInputElement).value}><input aria-label=${lang.endLocation} placeholder=${lang.endLocation} .value=${this.manualEndLocation} @input=${(event: InputEvent) => this.manualEndLocation = (event.currentTarget as HTMLInputElement).value}><input aria-label=${lang.distanceKm} type="number" min="0" step="0.1" inputmode="decimal" placeholder=${lang.distanceKm} .value=${this.manualDistanceKm} @input=${(event: InputEvent) => this.manualDistanceKm = (event.currentTarget as HTMLInputElement).value}><input aria-label=${lang.durationMinutes} type="number" min="0" step="1" placeholder=${lang.durationMinutes} .value=${this.manualDurationMinutes} @input=${(event: InputEvent) => this.manualDurationMinutes = (event.currentTarget as HTMLInputElement).value}><button type="button" @click=${() => this.addManualDrive(trip.id)} ?disabled=${this.manualSaving}>${this.manualSaving ? lang.saving : lang.createDrive}</button></div><h4>${lang.expenses}</h4><div class="expense-form create-form"><input aria-label=${lang.amount} type="number" min="0" step="0.01" inputmode="decimal" placeholder="EUR" .value=${this.amount} @input=${(event: InputEvent) => this.setExpenseAmount((event.currentTarget as HTMLInputElement).value)}><select aria-label=${lang.category} .value=${this.category} @change=${(event: Event) => this.setExpenseCategory((event.currentTarget as HTMLSelectElement).value)}>${EXPENSE_CATEGORIES.map((item) => html`<option value=${item}>${categoryLabel(item, this.hass)}</option>`)}</select><button type="button" @click=${() => this.addExpense(trip.id)}>${lang.save}</button></div>${expenses.map((expense) => this.renderExpense(expense, lang))}<p class="total"><strong>${lang.total}: ${total}</strong></p></div>` : ""}</article>`) : html`<p class="muted">${lang.noTrip}</p>`}</section></ha-card>`;
  }
}

ManagerCard.styles = [TravelCard.styles, css`section{margin-top:16px}.gpx-preview{padding:8px;background:var(--secondary-background-color)}.trip{display:grid;gap:8px;padding:12px 0;border-bottom:1px solid var(--divider-color)}.row,.expense-row,.drive-row{display:flex;justify-content:space-between;gap:8px;align-items:center;flex-wrap:wrap}.details{padding:8px;background:var(--secondary-background-color)}h4{margin:12px 0 4px}.link{min-height:30px;padding:4px 8px;font-size:.9em}.form-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(9rem,1fr));gap:8px;align-items:end}.form-grid input,.form-grid select{min-width:0;width:100%;box-sizing:border-box}.form-grid label{display:grid;gap:4px;font-size:.9em}.expense-form{display:grid;grid-template-columns:minmax(0,1fr) minmax(7rem,10rem) auto;gap:8px;align-items:center;width:100%}.expense-form input,.expense-form select{min-width:0;width:100%;box-sizing:border-box}.create-form{grid-template-columns:minmax(7rem,10rem) minmax(0,1fr) auto}.total{margin:12px 0 0;text-align:right}@media(max-width:500px){.expense-form,.create-form,.drive-edit-form{grid-template-columns:1fr}.expense-form .actions{margin-top:0}.total{text-align:left}}`] as any;
ManagerCard.styles = [...(ManagerCard.styles as any), css`.gpx-import:not(.gpx-explicit){display:none}.gpx-import.gpx-explicit label{display:grid;gap:4px}.gpx-import.gpx-explicit select{min-width:0;max-width:100%;padding:6px}.gpx-drive-list{display:grid;gap:6px;margin:8px 0}.pdf-export{margin-top:16px;padding-top:12px;border-top:1px solid var(--divider-color)}.pdf-export-row{display:flex;gap:8px;align-items:center;flex-wrap:wrap}.pdf-export-row select{min-width:0;flex:1 1 14rem;padding:8px;border:1px solid var(--divider-color);border-radius:6px;background:var(--card-background-color);color:var(--primary-text-color)}.warning{padding:8px;background:var(--warning-color,#ff9800);color:var(--primary-text-color)}`] as any;
defineOnce("camper-travel-journal-manager-card", ManagerCard);
