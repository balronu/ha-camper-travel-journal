import { LitElement, css, html } from "lit";
import type { Hass, Vehicle } from "./api";
import { listVehicles } from "./api";
import { messages } from "./i18n";
import { JOURNAL_MODULE_IDS, normalizeJournalModuleOrder, normalizeJournalModules, sameJournalModuleOrder, sameJournalModules, type JournalModuleId } from "./journal-modules";

export type CardConfig = { type?: string; vehicle_id?: string; modules?: string[]; module_order?: string[] };

export function autoSelectVehicle(config: CardConfig, vehicles: Vehicle[]): CardConfig {
  if (config.vehicle_id || vehicles.length !== 1) return config;
  return { ...config, vehicle_id: vehicles[0].vehicle_id };
}

export function sameCardConfig(left: CardConfig, right: CardConfig): boolean {
  return left.type === right.type && left.vehicle_id === right.vehicle_id && sameJournalModules(left.modules, right.modules, left.module_order, right.module_order) && sameJournalModuleOrder(left.module_order, right.module_order, left.modules, right.modules);
}

export class TravelCardEditor extends LitElement {
  static styles = css`
    :host { display: block; color: var(--primary-text-color); }
    .field { display: flex; flex-direction: column; gap: 6px; margin: 8px 0; }
    label { font-weight: 500; }
    select { min-height: 44px; width: 100%; box-sizing: border-box; border: 1px solid var(--divider-color); border-radius: 6px; padding: 8px; background: var(--card-background-color, var(--primary-background-color)); color: var(--primary-text-color); }
    .module-list { display:grid; gap:6px; margin-top:6px; }
    .module-row { display:grid; grid-template-columns:minmax(0,1fr) auto auto; gap:6px; align-items:center; padding:8px; border:1px solid var(--divider-color); border-radius:8px; }
    .module-row.moved { animation: module-moved 900ms ease-out; border-color:var(--primary-color); box-shadow:0 0 0 2px color-mix(in srgb,var(--primary-color) 25%,transparent); }
    .module-position { color:var(--secondary-text-color); font-size:.85em; white-space:nowrap; }
    .module-row label { min-width:0; font-weight:400; }
    .module-row button { min-width:40px; min-height:40px; border:1px solid var(--divider-color); border-radius:6px; background:var(--secondary-background-color); color:var(--primary-text-color); font:inherit; cursor:pointer; }
    .module-row button:disabled { opacity:.45; cursor:default; }
    .planned { color:var(--secondary-text-color); font-size:.85em; }
    .error { color: var(--error-color); }
    .muted { color: var(--secondary-text-color); }
    @keyframes module-moved { from { background:color-mix(in srgb,var(--primary-color) 16%,transparent); } to { background:transparent; } }
  `;

  private _hass?: Hass;
  private _config: CardConfig = {};
  private vehicles: Vehicle[] = [];
  private loading = false;
  private error = "";
  private loadedConnection?: Hass["connection"];
  private loadingPromise?: Promise<void>;
  private highlightedModule?: JournalModuleId;

  set hass(value: Hass | undefined) {
    const changed = this._hass?.connection !== value?.connection;
    this._hass = value;
    if (changed && value) void this.loadVehicles();
    this.requestUpdate();
  }

  get hass() { return this._hass; }

  setConfig(config: CardConfig) {
    if (sameCardConfig(this._config, config)) return;
    this._config = { ...config };
    if (this._hass && !this.loadedConnection) void this.loadVehicles();
    this.requestUpdate();
  }

  private async loadVehicles() {
    if (!this._hass) return;
    if (this.loadingPromise) return this.loadingPromise;
    if (this.loadedConnection === this._hass.connection) return;
    this.loading = true;
    this.error = "";
    this.requestUpdate();
    const hass = this._hass;
    this.loadingPromise = (async () => {
      try {
        this.vehicles = await listVehicles(hass);
        this.loadedConnection = hass.connection;
        const selected = autoSelectVehicle(this._config, this.vehicles);
        if (selected.vehicle_id !== this._config.vehicle_id) {
          this._config = selected;
          this.fireConfigChanged();
        }
      } catch {
        this.error = messages(hass).editorLoadError;
      } finally {
        this.loading = false;
        this.loadingPromise = undefined;
        this.requestUpdate();
      }
    })();
    return this.loadingPromise;
  }

  private fireConfigChanged() {
    this.dispatchEvent(new CustomEvent("config-changed", { bubbles: true, composed: true, detail: { config: { ...this._config } } }));
  }

  private selectVehicle(event: Event) {
    const vehicleId = (event.target as HTMLSelectElement).value;
    this._config = { ...this._config, vehicle_id: vehicleId };
    this.fireConfigChanged();
  }

  private toggleModule(module: JournalModuleId, event: Event) {
    if (module === "tankbook") return;
    const checked = (event.currentTarget as HTMLInputElement).checked;
    const order = normalizeJournalModuleOrder(this._config.module_order, this._config.modules);
    const current = normalizeJournalModules(this._config.modules);
    const modules = checked ? [...current, module] : current.filter((item) => item !== module);
    this._config = { ...this._config, modules: order.filter((item) => modules.includes(item)), module_order: order };
    this.fireConfigChanged();
    this.requestUpdate();
  }

  private moveModule(module: JournalModuleId, direction: -1 | 1) {
    const current = normalizeJournalModuleOrder(this._config.module_order, this._config.modules);
    const index = current.indexOf(module);
    const next = index + direction;
    if (index < 0 || next < 0 || next >= current.length) return;
    [current[index], current[next]] = [current[next], current[index]];
    const enabled = normalizeJournalModules(this._config.modules);
    this._config = { ...this._config, modules: current.filter((item) => enabled.includes(item)), module_order: current };
    this.highlightedModule = module;
    this.fireConfigChanged();
    this.requestUpdate();
    void this.updateComplete.then(() => {
      const row = this.renderRoot.querySelector<HTMLElement>(`.module-row[data-module="${module}"]`);
      if (!row) return;
      row.focus({ preventScroll: true });
      row.scrollIntoView({ block: "nearest", inline: "nearest" });
      window.setTimeout(() => { if (this.highlightedModule === module) { this.highlightedModule = undefined; this.requestUpdate(); } }, 900);
    });
  }

  render() {
    const lang = messages(this._hass);
    const modules = normalizeJournalModules(this._config.modules);
    const order = normalizeJournalModuleOrder(this._config.module_order, this._config.modules);
    return html`
      <div class="field">
        <label for="vehicle">${lang.editorVehicle}</label>
        ${this.loading ? html`<span class="muted">${lang.editorLoading}</span>` : html`
          <select id="vehicle" aria-label=${lang.editorVehicle} @change=${this.selectVehicle}>
            <option value="" ?selected=${!this._config.vehicle_id}>${lang.editorChooseVehicle}</option>
            ${this.vehicles.map((vehicle) => html`<option value=${vehicle.vehicle_id} ?selected=${vehicle.vehicle_id === this._config.vehicle_id}>${vehicle.name || vehicle.title}</option>`)}
          </select>
        `}
        ${this.error ? html`<span class="error" role="alert">${this.error}</span>` : ""}
        ${!this.loading && !this.error && !this.vehicles.length ? html`<span class="error" role="alert">${lang.editorNoVehicle}</span>` : ""}
      </div>
      <div class="field">
        <label>${lang.editorModules ?? "Journal modules"}</label>
        <span class="muted">${lang.editorModulesHint ?? "Choose visible sections and arrange their order."}</span>
        <div class="module-list" role="list">
          ${order.map((module, index) => {
            const enabled = modules.includes(module);
            const planned = module === "tankbook";
            return html`<div class="module-row ${this.highlightedModule === module ? "moved" : ""}" data-module=${module} role="listitem" tabindex="-1">
              <label><input type="checkbox" .checked=${enabled} ?disabled=${planned} @change=${(event: Event) => this.toggleModule(module, event)}> ${lang[`module_${module}`] ?? module}${planned ? html` <span class="planned">(${lang.modulePlanned ?? "planned"})</span>` : ""}</label>
              <span class="module-position" aria-label=${`${lang.modulePosition ?? "Position"}: ${index + 1} ${lang.moduleOf ?? "of"} ${order.length}`}>${index + 1} ${lang.moduleOf ?? "of"} ${order.length}</span>
              <span><button type="button" aria-label=${lang.moduleMoveUp ?? "Move up"} title=${lang.moduleMoveUp ?? "Move up"} ?disabled=${index <= 0} @click=${() => this.moveModule(module, -1)}>↑</button>
              <button type="button" aria-label=${lang.moduleMoveDown ?? "Move down"} title=${lang.moduleMoveDown ?? "Move down"} ?disabled=${index >= order.length - 1} @click=${() => this.moveModule(module, 1)}>↓</button></span>
            </div>`;
          })}
        </div>
      </div>
    `;
  }
}

if (typeof customElements !== "undefined" && !customElements.get("camper-travel-journal-card-editor")) customElements.define("camper-travel-journal-card-editor", TravelCardEditor);
