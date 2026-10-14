import { css, html, LitElement } from "lit";
import { runDiagnostic, reportText, statusLabel, type DiagnosticHass, type DiagnosticReport } from "./diagnostics";

const DEFAULT_VEHICLE_ID = "01M4XW0KD3GQ0KASAYHQ29840P";

export class DiagnosticCard extends LitElement {
  static styles = css`
    :host { display: block; color: var(--primary-text-color); }
    ha-card { padding: 16px; }
    h2 { margin: 0 0 12px; }
    dl { display: grid; grid-template-columns: minmax(10rem, 1fr) auto; gap: 8px; margin: 0 0 16px; }
    dt { color: var(--secondary-text-color); } dd { margin: 0; text-align: right; }
    .actions { display: flex; gap: 8px; flex-wrap: wrap; }
    button { min-height: 40px; border: 0; border-radius: 8px; padding: 8px 12px; cursor: pointer; color: var(--text-primary-color, #fff); background: var(--primary-color); }
    button.secondary { color: var(--primary-text-color); background: var(--secondary-background-color); }
    .error { color: var(--error-color); } .muted { color: var(--secondary-text-color); }
    pre { max-height: 16rem; overflow: auto; white-space: pre-wrap; font-size: .78rem; background: var(--secondary-background-color); padding: 8px; }
  `;

  private _hass?: DiagnosticHass;
  private report?: DiagnosticReport;
  private running = false;
  private error = "";
  private config = { vehicle_id: DEFAULT_VEHICLE_ID };

  set hass(value: DiagnosticHass | undefined) { this._hass = value; this.requestUpdate(); }
  get hass() { return this._hass; }
  setConfig(config: { vehicle_id?: string }) { this.config = { vehicle_id: config.vehicle_id || DEFAULT_VEHICLE_ID }; }

  private async start() {
    if (!this._hass || this.running) { this.error = "Keine aktive Home-Assistant-Verbindung verfügbar."; this.requestUpdate(); return; }
    this.running = true; this.error = ""; this.requestUpdate();
    try { this.report = await runDiagnostic(this._hass, this.config.vehicle_id); }
    catch { this.error = "Diagnose konnte nicht gestartet werden."; }
    finally { this.running = false; this.requestUpdate(); }
  }

  private async copyReport() {
    if (!this.report || !navigator.clipboard?.writeText) { this.error = "Bericht kann in diesem Browser nicht kopiert werden."; this.requestUpdate(); return; }
    try { await navigator.clipboard.writeText(reportText(this.report)); this.error = ""; }
    catch { this.error = "Bericht konnte nicht kopiert werden."; }
    this.requestUpdate();
  }

  render() {
    const report = this.report;
    return html`<ha-card><h2>Camper Travel Journal – Diagnose</h2>
      ${this.error ? html`<p class="error" role="alert">${this.error}</p>` : ""}
      ${this.running ? html`<p class="muted" aria-live="polite">Diagnose läuft …</p>` : ""}
      ${report ? html`<dl>
        <dt>Version</dt><dd>${report.version}</dd>
        <dt>Verbindung vorher</dt><dd>${report.connectionBefore}</dd>
        <dt>Verbindung nachher</dt><dd>${report.connectionAfter}</dd>
        <dt>Authentifizierung</dt><dd>${statusLabel(report.authentication)}</dd>
        <dt>Fahrzeugabfrage</dt><dd>${statusLabel(report.vehicles)}${report.vehicles.durationMs === null ? "" : ` (${report.vehicles.durationMs} ms)`}</dd>
        <dt>Reisedatenabfrage</dt><dd>${statusLabel(report.trips)}${report.trips.durationMs === null ? "" : ` (${report.trips.durationMs} ms)`}${report.trips.state === "success" ? ` · ${report.trips.count ?? 0} Reisen / ${report.trips.drivesCount ?? 0} Fahrten / ${report.trips.stopsCount ?? 0} Stopps` : ""}</dd>
        <dt>Strukturprüfung</dt><dd>${report.vehicles.structure === "ok" && report.trips.structure === "ok" ? "ok" : "siehe Bericht"}</dd>
      </dl><pre aria-label="Diagnosebericht">${reportText(report)}</pre>` : ""}
      <div class="actions"><button @click=${() => this.start()} ?disabled=${this.running}>${report ? "Diagnose wiederholen" : "Diagnose starten"}</button>${report ? html`<button class="secondary" @click=${() => this.copyReport()}>Bericht kopieren</button>` : ""}</div>
    </ha-card>`;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("camper-travel-journal-diagnostics-card")) customElements.define("camper-travel-journal-diagnostics-card", DiagnosticCard);
