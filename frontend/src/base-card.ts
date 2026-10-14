import { LitElement, css } from "lit";
import type { Hass } from "./api";

export abstract class TravelCard extends LitElement {
  hass?: Hass;
  config: { vehicle_id?: string } = {};
  static styles = css`
    :host { display:block; color:var(--primary-text-color); } ha-card { padding:16px; background:var(--ha-card-background,var(--card-background-color)); }
    h2,h3 { margin:0 0 12px; } .muted { color:var(--secondary-text-color); } .error { color:var(--error-color); }
    button { min-height:40px; border:0; border-radius:8px; padding:8px 12px; cursor:pointer; color:var(--text-primary-color,#fff); background:var(--primary-color); }
    button.secondary { color:var(--primary-text-color); background:var(--secondary-background-color); } .actions { display:flex; gap:8px; flex-wrap:wrap; margin-top:12px; }
    .grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(130px,1fr)); gap:10px; } .metric { padding:10px; border-radius:8px; background:var(--secondary-background-color); }
    .value { display:block; font-size:1.25rem; font-weight:600; } input { min-height:38px; box-sizing:border-box; border:1px solid var(--divider-color); border-radius:6px; padding:8px; background:var(--card-background-color); color:var(--primary-text-color); }
    @media (max-width:500px) { ha-card { padding:12px; } }
  `;
  setConfig(config: { vehicle_id?: string }) { this.config = config; }
  static getConfigElement() { return document.createElement("camper-travel-journal-card-editor"); }
  static getStubConfig() { return { vehicle_id: "" }; }
  protected get vehicleId() { return this.config.vehicle_id ?? ""; }
}
export function defineOnce(name: string, element: CustomElementConstructor) { if (!customElements.get(name)) customElements.define(name, element); }
