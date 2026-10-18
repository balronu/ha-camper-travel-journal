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
    .migration-notice { margin:0 0 12px; padding:12px; border:1px solid var(--warning-color,#f57c00); border-inline-start:5px solid var(--warning-color,#f57c00); border-radius:8px; background:color-mix(in srgb,var(--warning-color,#f57c00) 12%,var(--card-background-color)); }
    .migration-notice strong { display:block; } .migration-notice p { margin:6px 0; } .migration-notice a { color:var(--primary-color); }
    pre, textarea { max-height: 16rem; width: 100%; box-sizing: border-box; overflow: auto; white-space: pre-wrap; font-size: .78rem; background: var(--secondary-background-color); padding: 8px; }
  `;

  private _hass?: DiagnosticHass;
  private report?: DiagnosticReport;
  private running = false;
  private error = "";
  private manualCopy = false;
  private config = { vehicle_id: DEFAULT_VEHICLE_ID };

  set hass(value: DiagnosticHass | undefined) { this._hass = value; this.requestUpdate(); }
  get hass() { return this._hass; }
  setConfig(config: { vehicle_id?: string }) { this.config = { vehicle_id: config.vehicle_id || DEFAULT_VEHICLE_ID }; }

  private async start() {
    if (!this._hass || this.running) { this.error = "Keine aktive Home-Assistant-Verbindung verfügbar."; this.requestUpdate(); return; }
    this.running = true; this.error = ""; this.manualCopy = false; this.requestUpdate();
    try { this.report = await runDiagnostic(this._hass, this.config.vehicle_id); }
    catch { this.error = "Diagnose konnte nicht gestartet werden."; }
    finally { this.running = false; this.requestUpdate(); }
  }

  private async copyReport() {
    if (!this.report) return;
    const text = reportText(this.report);
    if (!navigator.clipboard?.writeText) {
      this.manualCopy = true;
      this.error = "Bitte den eingeblendeten Bericht manuell auswählen und kopieren.";
      this.requestUpdate();
      return;
    }
    try { await navigator.clipboard.writeText(text); this.manualCopy = false; this.error = ""; }
    catch {
      this.manualCopy = true;
      this.error = "Automatisches Kopieren ist in diesem Browser nicht verfügbar. Bitte den Bericht manuell auswählen und kopieren.";
    }
    this.requestUpdate();
  }

  private selectReport() {
    const target = this.shadowRoot?.querySelector<HTMLTextAreaElement>('textarea[aria-label="Diagnosebericht zum manuellen Kopieren"]');
    target?.select();
  }

  protected updated() {
    if (this.shadowRoot?.querySelector(".migration-notice")) return;
    const card = this.shadowRoot?.querySelector("ha-card");
    if (!card) return;
    const notice = document.createElement("aside"); notice.className = "migration-notice"; notice.setAttribute("role", "note");
    const title = document.createElement("strong"); title.textContent = "IMPORTANT: THE LOVELACE CARDS HAVE CHANGED!";
    const text = document.createElement("p"); text.textContent = "Use the central Camper Travel Journal card for new dashboards. This legacy card remains supported for compatibility.";
    const link = document.createElement("a"); link.href = "https://github.com/balronu/ha-camper-travel-journal/blob/main/README.md#migration"; link.target = "_blank"; link.rel = "noreferrer"; link.textContent = "Migration guide";
    notice.append(title, text, link); card.prepend(notice);
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
      </dl><pre aria-label="Diagnosebericht">${reportText(report)}</pre>${this.manualCopy ? html`<textarea aria-label="Diagnosebericht zum manuellen Kopieren" readonly rows="8" @click=${() => this.selectReport()}>${reportText(report)}</textarea>` : ""}` : ""}
      <div class="actions"><button @click=${() => this.start()} ?disabled=${this.running}>${report ? "Diagnose wiederholen" : "Diagnose starten"}</button>${report ? html`<button class="secondary" @click=${() => this.copyReport()}>Bericht kopieren</button>${this.manualCopy ? html`<button class="secondary" @click=${() => this.selectReport()}>Bericht auswählen</button>` : ""}` : ""}</div>
    </ha-card>`;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("camper-travel-journal-diagnostics-card")) customElements.define("camper-travel-journal-diagnostics-card", DiagnosticCard);
