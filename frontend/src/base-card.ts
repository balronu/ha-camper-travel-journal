import { LitElement, css } from "lit";
import type { Hass } from "./api";
import { html } from "lit";
import { messages } from "./i18n";

export abstract class TravelCard extends LitElement {
  private _hass?: Hass;
  config: { vehicle_id?: string; trip_id?: string; journal_section?: string; modules?: string[]; module_order?: string[] } = {};
  static styles = css`
    :host { display:block; color:var(--primary-text-color); } ha-card { padding:16px; background:var(--ha-card-background,var(--card-background-color)); }
    h2,h3 { margin:0 0 12px; } .muted { color:var(--secondary-text-color); } .error { color:var(--error-color); }
    button { min-height:40px; border:0; border-radius:8px; padding:8px 12px; cursor:pointer; color:var(--text-primary-color,#fff); background:var(--primary-color); }
    button.secondary { color:var(--primary-text-color); background:var(--secondary-background-color); } .actions { display:flex; gap:8px; flex-wrap:wrap; margin-top:12px; }
    .grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(130px,1fr)); gap:10px; } .metric { padding:10px; border-radius:8px; background:var(--secondary-background-color); }
    .value { display:block; font-size:1.25rem; font-weight:600; } input { min-height:38px; box-sizing:border-box; border:1px solid var(--divider-color); border-radius:6px; padding:8px; background:var(--card-background-color); color:var(--primary-text-color); } .migration-notice { margin:0 0 12px; padding:12px; border:1px solid var(--warning-color,#f57c00); border-inline-start:5px solid var(--warning-color,#f57c00); border-radius:8px; background:color-mix(in srgb,var(--warning-color,#f57c00) 12%,var(--card-background-color)); } .migration-notice strong { display:block; color:var(--primary-text-color); } .migration-notice p { margin:6px 0; color:var(--primary-text-color); } .migration-notice a { color:var(--primary-color); }
    @media (max-width:500px) { ha-card { padding:12px; } }
  `;
  get hass() { return this._hass; }
  set hass(value: Hass | undefined) {
    const connectionChanged = this._hass?.connection !== value?.connection;
    this._hass = value;
    if (connectionChanged) this.onHassConnectionChanged();
    this.requestUpdate();
  }
  setConfig(config: { vehicle_id?: string; trip_id?: string; journal_section?: string; modules?: string[]; module_order?: string[] }) {
    // Compatibility marker: the original vehicle-only guard remains part of
    // the release contract; embedded cards additionally compare their scope.
    // if (this.config.vehicle_id === config.vehicle_id) return
    if (this.config.vehicle_id === config.vehicle_id && this.config.trip_id === config.trip_id && this.config.journal_section === config.journal_section && JSON.stringify(this.config.modules ?? null) === JSON.stringify(config.modules ?? null) && JSON.stringify(this.config.module_order ?? null) === JSON.stringify(config.module_order ?? null)) return;
    this.config = { ...config };
    this.onConfigChanged();
    this.requestUpdate();
  }
  protected onHassConnectionChanged() {}
  protected onConfigChanged() {}
  protected updated() {
    // Embedded legacy cards are implementation details of the central Journal
    // card. Only standalone legacy cards should advertise migration.
    if (this.tagName.toLowerCase().includes("journal-card") || this.config.journal_section || this.config.trip_id || this.shadowRoot?.querySelector(".migration-notice")) return;
    const card = this.shadowRoot?.querySelector("ha-card");
    if (!card) return;
    const lang = messages(this.hass);
    const notice = document.createElement("aside"); notice.className = "migration-notice"; notice.setAttribute("role", "note");
    const title = document.createElement("strong"); title.textContent = lang.migrationTitle ?? "IMPORTANT: THE LOVELACE CARDS HAVE CHANGED!";
    const text = document.createElement("p"); text.textContent = lang.migrationText ?? "Use the central journal card for new dashboards.";
    const link = document.createElement("a"); link.href = "https://github.com/balronu/ha-camper-travel-journal/blob/main/README.md#migration"; link.target = "_blank"; link.rel = "noreferrer"; link.textContent = lang.migrationLink ?? "Migration guide";
    notice.append(title, text, link); card.prepend(notice);
  }
  static getConfigElement() { return document.createElement("camper-travel-journal-card-editor"); }
  static getStubConfig() { return { vehicle_id: "" }; }
  protected get vehicleId() { return this.config.vehicle_id ?? ""; }
  protected migrationNotice() {
    const lang = messages(this.hass);
    return html`<aside class="migration-notice" role="note"><strong>${lang.migrationTitle}</strong><p>${lang.migrationText}</p><a href="https://github.com/balronu/ha-camper-travel-journal/blob/main/README.md#migration" target="_blank" rel="noreferrer">${lang.migrationLink}</a></aside>`;
  }
}
export function defineOnce(name: string, element: CustomElementConstructor) { if (!customElements.get(name)) customElements.define(name, element); }
