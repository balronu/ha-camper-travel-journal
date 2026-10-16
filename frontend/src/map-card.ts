import { css, html, unsafeCSS } from "lit";
import { TravelCard, defineOnce } from "./base-card";
import { list, route, type RouteResponse, type Snapshot } from "./api";
import { formatDateTime, messages } from "./i18n";
import * as L from "leaflet";
import leafletCss from "leaflet/dist/leaflet.css?inline";
import { sortDrivesChronologically } from "./map-utils";

const COLORS = ["#1976d2", "#d32f2f", "#388e3c", "#7b1fa2", "#f57c00", "#00796b"];
const LEAFLET_CSS = leafletCss.replace(/\s+/g, " ").trim();

export type MapCardConfig = { vehicle_id: string; tile_url?: string; tile_attribution?: string };


export class MapCard extends TravelCard {
  private trips: Snapshot["trips"] = [];
  private selectedTripId = "";
  private drives: Snapshot["drives"] = [];
  private selectedDriveIds: string[] = [];
  private driveSelectionInitialized = false;
  private data?: RouteResponse;
  private map?: L.Map;
  private layers: L.Layer[] = [];
  private loading = false;
  private error = "";
  private tileError = false;
  private tileLayer?: L.TileLayer;
  private renderQueued = false;

  connectedCallback() {
    super.connectedCallback();
    void this.refresh();
  }
  disconnectedCallback() {
    this.map?.remove();
    this.map = undefined;
    super.disconnectedCallback();
  }
  protected onHassConnectionChanged() { void this.refresh(); }
  protected onConfigChanged() {
    this.tileLayer?.remove();
    this.tileLayer = undefined;
    this.tileError = false;
    void this.refresh();
  }

  private async refresh() {
    if (!this.hass || !this.vehicleId) return;
    this.loading = true;
    this.error = "";
    this.requestUpdate();
    try {
      const overview = await list(this.hass, this.vehicleId);
      this.trips = overview.trips;
      if (!this.selectedTripId || !this.trips.some((trip) => trip.id === this.selectedTripId)) {
        this.selectedTripId = this.trips.find((trip) => trip.status === "active")?.id ?? this.trips[0]?.id ?? "";
      }
      const details = this.selectedTripId ? await list(this.hass, this.vehicleId, this.selectedTripId) : overview;
      this.drives = sortDrivesChronologically(details.drives);
      const available = new Set(this.drives.map((drive) => drive.id));
      this.selectedDriveIds = this.selectedDriveIds.filter((id) => available.has(id));
      if (!this.driveSelectionInitialized) {
        this.selectedDriveIds = this.drives.map((drive) => drive.id);
        this.driveSelectionInitialized = true;
      }
      this.data = await route(this.hass, this.vehicleId, this.selectedTripId || undefined, this.selectedDriveIds);
    } catch {
      this.error = messages(this.hass).loadError;
      this.data = undefined;
    } finally {
      this.loading = false;
      this.requestUpdate();
      this.queueMapRender();
    }
  }

  private queueMapRender() {
    if (this.renderQueued) return;
    this.renderQueued = true;
    void this.updateComplete.then(() => {
      this.renderQueued = false;
      this.renderMap();
    });
  }

  private renderMap() {
    const host = this.shadowRoot?.querySelector<HTMLElement>(".map");
    if (!host) return;
    if (!this.map) {
      this.map = L.map(host, { zoomControl: true, attributionControl: true });
      this.map.setView([51.0, 10.0], 5);
    }
    const config = this.config as MapCardConfig;
    if (config.tile_url && !this.tileError && !this.tileLayer) {
      const attribution = config.tile_attribution || (config.tile_url.includes("openstreetmap.org") ? "© OpenStreetMap contributors" : "");
      this.tileLayer = L.tileLayer(config.tile_url, { maxZoom: 19, attribution }).on("tileerror", () => {
        this.tileError = true;
        this.tileLayer?.remove();
        this.tileLayer = undefined;
        this.requestUpdate();
      }).addTo(this.map);
    }
    for (const layer of this.layers) layer.remove();
    this.layers = [];
    const bounds = L.latLngBounds([]);
    for (const [index, segment] of (this.data?.segments ?? []).entries()) {
      const points = segment.points.map((point) => L.latLng(point.latitude, point.longitude));
      if (points.length) {
        const line = L.polyline(points, { color: COLORS[index % COLORS.length], weight: 4, opacity: 0.85 }).addTo(this.map);
        this.layers.push(line);
        points.forEach((point) => bounds.extend(point));
        const lang = messages(this.hass);
        const start = L.circleMarker(points[0], { radius: 6, color: COLORS[index % COLORS.length], fillOpacity: 1 }).bindTooltip(lang.mapStart).addTo(this.map);
        const end = L.circleMarker(points[points.length - 1], { radius: 6, color: "#111", fillColor: COLORS[index % COLORS.length], fillOpacity: 1 }).bindTooltip(lang.mapEnd).addTo(this.map);
        this.layers.push(start, end);
        for (const gap of segment.gaps) {
          const gapPoint = points[Math.max(0, Math.floor(points.length / 2))];
          const marker = L.circleMarker(gapPoint, { radius: 8, color: "#f57c00", fillOpacity: 0.9 }).bindTooltip(`${lang.mapGap}: ${gap.seconds}s`).addTo(this.map);
          this.layers.push(marker);
        }
      }
    }
    if (bounds.isValid()) this.map.fitBounds(bounds.pad(0.08));
    setTimeout(() => this.map?.invalidateSize(), 0);
  }

  private async selectTrip(event: Event) {
    this.selectedTripId = (event.currentTarget as HTMLSelectElement).value;
    this.selectedDriveIds = [];
    this.driveSelectionInitialized = false;
    await this.refresh();
  }

  private async toggleDrive(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    this.selectedDriveIds = input.checked ? [...this.selectedDriveIds, input.value] : this.selectedDriveIds.filter((id) => id !== input.value);
    await this.refresh();
  }

  render() {
    const lang = messages(this.hass);
    return html`<ha-card><h2>${lang.mapTitle}</h2>
      ${this.trips.length ? html`<label class="selector">${lang.summaryChooseTrip}<select @change=${(event: Event) => void this.selectTrip(event)} .value=${this.selectedTripId}>${this.trips.map((trip) => html`<option value=${trip.id}>${trip.title} · ${trip.status}</option>`)}</select></label>` : ""}
      ${this.drives.length ? html`<fieldset class="drives"><legend>${lang.mapDriveSegments}</legend>${this.drives.map((drive) => html`<label><input type="checkbox" value=${drive.id} .checked=${this.selectedDriveIds.includes(drive.id)} @change=${(event: Event) => void this.toggleDrive(event)}> ${formatDateTime(drive.started_at, this.hass)} · ${(drive.distance_m / 1000).toFixed(1)} km</label>`)}</fieldset>` : ""}
      ${this.error ? html`<p class="error" role="alert">${this.error}</p>` : ""}
      ${this.tileError ? html`<p class="error" role="alert">${messages(this.hass).mapTilesUnavailable ?? (this.hass?.locale?.language?.toLowerCase().startsWith("de") ? "Die Hintergrundkarte konnte nicht geladen werden. Die GPS-Route bleibt sichtbar." : "The background map could not be loaded. The GPS route remains visible.")}</p>` : !(this.config as MapCardConfig).tile_url ? html`<p class="muted" role="status">${messages(this.hass).mapTilesNotConfigured ?? (this.hass?.locale?.language?.toLowerCase().startsWith("de") ? "Keine Hintergrundkarte konfiguriert. Die GPS-Route bleibt sichtbar." : "No background map is configured. The GPS route remains visible.")}</p>` : ""}
      ${this.data?.truncated ? html`<p class="muted">${lang.mapTruncated}: ${this.data.returned_points} / ${this.data.total_points}</p>` : ""}
      ${!this.loading && !this.data?.segments.length ? html`<p class="muted">${lang.mapNoPoints}</p>` : ""}
      <div class="map" role="img" aria-label=${lang.mapRouteImageAlt}></div>
      ${(this.config as MapCardConfig | undefined)?.tile_attribution ? html`<p class="attribution">${(this.config as MapCardConfig).tile_attribution}</p>` : ""}
      ${this.loading ? html`<p class="muted">${lang.loading}</p>` : ""}
    </ha-card>`;
  }
}
MapCard.styles = [TravelCard.styles, unsafeCSS(LEAFLET_CSS), css`.map{height:420px;min-height:240px;border-radius:8px;overflow:hidden;background:var(--secondary-background-color)}.selector{display:grid;gap:4px;margin:12px 0}.selector select{padding:8px;background:var(--card-background-color);color:var(--primary-text-color);border:1px solid var(--divider-color)}.drives{display:grid;gap:6px;border:1px solid var(--divider-color);border-radius:6px;margin:10px 0;padding:8px}.drives label{font-size:.85em}.attribution{font-size:.75rem;color:var(--secondary-text-color);margin:6px 0 0}.muted{color:var(--secondary-text-color)}@media(max-width:500px){.map{height:300px}}`] as any;
defineOnce("camper-travel-journal-map-card", MapCard);
