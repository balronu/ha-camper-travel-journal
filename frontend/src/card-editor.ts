import { LitElement, css, html } from "lit";
import type { Hass, Vehicle } from "./api";
import { listVehicles } from "./api";
import { messages } from "./i18n";

export type CardConfig = { type?: string; vehicle_id?: string };

export function autoSelectVehicle(config: CardConfig, vehicles: Vehicle[]): CardConfig {
  if (config.vehicle_id || vehicles.length !== 1) return config;
  return { ...config, vehicle_id: vehicles[0].vehicle_id };
}

export class TravelCardEditor extends LitElement {
  static styles = css`
    :host { display: block; color: var(--primary-text-color); }
    .field { display: flex; flex-direction: column; gap: 6px; margin: 8px 0; }
    label { font-weight: 500; }
    select { min-height: 44px; width: 100%; box-sizing: border-box; border: 1px solid var(--divider-color); border-radius: 6px; padding: 8px; background: var(--card-background-color, var(--primary-background-color)); color: var(--primary-text-color); }
    .error { color: var(--error-color); }
    .muted { color: var(--secondary-text-color); }
  `;

  private _hass?: Hass;
  private _config: CardConfig = {};
  private vehicles: Vehicle[] = [];
  private loading = false;
  private error = "";

  set hass(value: Hass | undefined) {
    const changed = this._hass !== value;
    this._hass = value;
    if (changed && value) void this.loadVehicles();
  }

  get hass() { return this._hass; }

  setConfig(config: CardConfig) {
    this._config = { ...config };
    if (this._hass) void this.loadVehicles();
  }

  private async loadVehicles() {
    if (!this._hass) return;
    this.loading = true;
    this.error = "";
    this.requestUpdate();
    try {
      this.vehicles = await listVehicles(this._hass);
      const selected = autoSelectVehicle(this._config, this.vehicles);
      if (selected.vehicle_id !== this._config.vehicle_id) {
        this._config = selected;
        this.fireConfigChanged();
      }
    } catch {
      this.error = messages(this._hass).editorLoadError;
    } finally {
      this.loading = false;
      this.requestUpdate();
    }
  }

  private fireConfigChanged() {
    this.dispatchEvent(new CustomEvent("config-changed", { bubbles: true, composed: true, detail: { config: { ...this._config } } }));
  }

  private selectVehicle(event: Event) {
    const vehicleId = (event.target as HTMLSelectElement).value;
    this._config = { ...this._config, vehicle_id: vehicleId };
    this.fireConfigChanged();
  }

  render() {
    const lang = messages(this._hass);
    return html`
      <div class="field">
        <label for="vehicle">${lang.editorVehicle}</label>
        ${this.loading ? html`<span class="muted">${lang.editorLoading}</span>` : html`
          <select id="vehicle" aria-label=${lang.editorVehicle} .value=${this._config.vehicle_id ?? ""} @change=${this.selectVehicle}>
            <option value="">${lang.editorChooseVehicle}</option>
            ${this.vehicles.map((vehicle) => html`<option value=${vehicle.vehicle_id}>${vehicle.name || vehicle.title}</option>`)}
          </select>
        `}
        ${this.error ? html`<span class="error" role="alert">${this.error}</span>` : ""}
        ${!this.loading && !this.error && !this.vehicles.length ? html`<span class="error" role="alert">${lang.editorNoVehicle}</span>` : ""}
      </div>
    `;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("camper-travel-journal-card-editor")) customElements.define("camper-travel-journal-card-editor", TravelCardEditor);
