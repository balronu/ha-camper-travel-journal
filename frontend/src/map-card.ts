import { css, html, unsafeCSS } from "lit";
import { TravelCard, defineOnce } from "./base-card";
import { list, listVehicles, route, type Drive, type MapConfig, type RouteResponse, type Snapshot } from "./api";
import { formatCompactTripPeriod, formatDate, formatTime, messages } from "./i18n";
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
  private places: Snapshot["stops"] = [];
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
  private mapConfig?: MapConfig;
  private vehicleName = "";
  private driveSectionsOpen = false;
  private fitMapPending = true;
  private showPlaces = true;

  connectedCallback() {
    super.connectedCallback();
    this.driveSectionsOpen = typeof window !== "undefined" && window.matchMedia("(min-width: 700px)").matches;
    void this.refresh(true);
  }

  disconnectedCallback() {
    this.map?.remove();
    this.map = undefined;
    this.tileLayer = undefined;
    super.disconnectedCallback();
  }

  protected onHassConnectionChanged() { void this.refresh(true); }

  protected onConfigChanged() {
    this.tileLayer?.remove();
    this.tileLayer = undefined;
    this.tileError = false;
    this.fitMapPending = true;
    void this.refresh(true);
  }

  private async refresh(fitMap = false) {
    if (!this.hass || !this.vehicleId) return;
    this.fitMapPending ||= fitMap;
    this.loading = true;
    this.error = "";
    this.requestUpdate();
    try {
      const vehicles = await listVehicles(this.hass);
      this.vehicleName = vehicles.find((vehicle) => vehicle.vehicle_id === this.vehicleId)?.name ?? "";
      const overview = await list(this.hass, this.vehicleId);
      this.mapConfig = overview.map_config;
      this.trips = overview.trips;
      if (!this.selectedTripId || !this.trips.some((trip) => trip.id === this.selectedTripId)) {
        this.selectedTripId = this.trips.find((trip) => trip.status === "active")?.id ?? this.trips[0]?.id ?? "";
      }
      const details = this.selectedTripId ? await list(this.hass, this.vehicleId, this.selectedTripId) : overview;
      this.mapConfig = details.map_config ?? this.mapConfig;
      this.drives = sortDrivesChronologically(details.drives);
      this.places = details.stops ?? [];
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
    const manualConfig = this.config as MapCardConfig;
    const tileUrl = manualConfig.tile_url ?? this.mapConfig?.tile_url ?? undefined;
    const tileAttribution = manualConfig.tile_attribution ?? this.mapConfig?.tile_attribution ?? undefined;
    if (tileUrl && !this.tileError && !this.tileLayer) {
      const attribution = tileAttribution || (tileUrl.includes("openstreetmap.org") ? "© OpenStreetMap contributors" : "");
      this.tileLayer = L.tileLayer(tileUrl, { maxZoom: 19, attribution }).on("tileerror", () => {
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
      if (!points.length) continue;
      const driveIndex = this.drives.findIndex((drive) => drive.id === segment.drive_id);
      const color = this.driveColor(driveIndex >= 0 ? driveIndex : index);
      const line = L.polyline(points, { color, weight: 4, opacity: 0.85 }).addTo(this.map);
      this.layers.push(line);
      points.forEach((point) => bounds.extend(point));
      const lang = messages(this.hass);
      const start = L.circleMarker(points[0], { radius: 6, color, fillOpacity: 1 }).bindTooltip(lang.mapStart).addTo(this.map);
      const end = L.circleMarker(points[points.length - 1], { radius: 6, color: "#111", fillColor: color, fillOpacity: 1 }).bindTooltip(lang.mapEnd).addTo(this.map);
      this.layers.push(start, end);
      for (const gap of segment.gaps) {
        const gapPoint = points[Math.max(0, Math.floor(points.length / 2))];
        const marker = L.circleMarker(gapPoint, { radius: 8, color: "#f57c00", fillOpacity: 0.9 }).bindTooltip(`${lang.mapGap}: ${gap.seconds}s`).addTo(this.map);
        this.layers.push(marker);
      }
    }
    for (const place of this.places) {
      if (!this.showPlaces) continue;
      if (place.latitude == null || place.longitude == null || place.confirmed === false) continue;
      const overnight = ["campsite", "rv_site", "wild_camp", "overnight"].includes(place.place_kind || place.place_type || place.stop_type);
      const marker = L.circleMarker([place.latitude, place.longitude], { radius: overnight ? 9 : 7, color: overnight ? "#7b1fa2" : "#455a64", fillColor: overnight ? "#ce93d8" : "#90a4ae", fillOpacity: 0.95, weight: 2 });
      const rating = place.rating_overall ? ` · ${place.rating_overall}/5` : "";
      const popup = document.createElement("div");
      const title = document.createElement("strong");
      title.textContent = place.name || "Ort";
      popup.append(title, document.createElement("br"));
      popup.append(document.createTextNode(`${place.place_type || place.stop_type}${rating}`), document.createElement("br"));
      popup.append(document.createTextNode(place.description || ""));
      marker.bindPopup(popup);
      marker.addTo(this.map);
      this.layers.push(marker);
      bounds.extend([place.latitude, place.longitude]);
    }
    if (this.fitMapPending && bounds.isValid()) {
      this.map.fitBounds(bounds.pad(0.08));
      this.fitMapPending = false;
    }
    setTimeout(() => this.map?.invalidateSize(), 0);
  }

  private driveColor(index: number) { return COLORS[index % COLORS.length]; }
  private selectedTrip() { return this.trips.find((trip) => trip.id === this.selectedTripId); }
  private selectedDrives() { return this.drives.filter((drive) => this.selectedDriveIds.includes(drive.id)); }

  private async selectTrip(event: Event) {
    this.selectedTripId = (event.currentTarget as HTMLSelectElement).value;
    this.selectedDriveIds = [];
    this.driveSelectionInitialized = false;
    await this.refresh(true);
  }

  private async toggleDrive(event: Event) {
    const input = event.currentTarget as HTMLInputElement;
    this.selectedDriveIds = input.checked
      ? [...new Set([...this.selectedDriveIds, input.value])]
      : this.selectedDriveIds.filter((id) => id !== input.value);
    await this.refresh(true);
  }

  private async selectAllDrives() {
    this.selectedDriveIds = this.drives.map((drive) => drive.id);
    await this.refresh(true);
  }

  private async selectNoDrives() {
    this.selectedDriveIds = [];
    await this.refresh(true);
  }

  private onDriveSectionsToggle(event: Event) {
    this.driveSectionsOpen = (event.currentTarget as HTMLDetailsElement).open;
  }

  private driveRow(drive: Drive, index: number) {
    const lang = messages(this.hass);
    return html`<label class="drive-row" style=${`--drive-color:${this.driveColor(index)}`}>
      <input type="checkbox" value=${drive.id} .checked=${this.selectedDriveIds.includes(drive.id)} @change=${(event: Event) => void this.toggleDrive(event)}>
      <span class="drive-info"><strong>${formatDate(drive.started_at, this.hass)} · ${formatTime(drive.started_at, this.hass)}</strong><span>${(drive.distance_m / 1000).toFixed(1)} km · ${drive.source === "manual" ? lang.sourceManual : lang.sourceGps}</span></span>
    </label>`;
  }

  render() {
    const lang = messages(this.hass);
    const manualConfig = this.config as MapCardConfig;
    const selectedTrip = this.selectedTrip();
    const selectedDrives = this.selectedDrives();
    const totalDistance = selectedDrives.reduce((sum, drive) => sum + drive.distance_m, 0) / 1000;
    const tileAttribution = manualConfig.tile_attribution ?? this.mapConfig?.tile_attribution ?? undefined;
    return html`<ha-card>
      <header class="map-header">
        <div><h2>${lang.mapTitle}</h2><p class="vehicle-context">${this.vehicleName || lang.mapVehicle}</p></div>
        ${this.trips.length ? html`<label class="trip-picker"><span>${lang.mapTrip}</span><select @change=${(event: Event) => void this.selectTrip(event)} .value=${this.selectedTripId}>${this.trips.map((trip) => html`<option value=${trip.id}>${trip.title}</option>`)}</select></label>` : ""}
      </header>
      ${selectedTrip ? html`<div class="metrics" aria-label=${lang.mapTrip}>
        <div class="metric"><span>${lang.mapTotalDistance}</span><strong>${totalDistance.toFixed(1)} km</strong></div>
        <div class="metric"><span>${lang.mapSelectedDrives}</span><strong>${selectedDrives.length} / ${this.drives.length}</strong></div>
        <div class="metric"><span>${lang.mapTripPeriod}</span><strong>${formatCompactTripPeriod(selectedTrip, this.hass) || "–"}</strong></div>
      </div>` : ""}
      ${this.drives.length ? html`<details class="drive-details" .open=${this.driveSectionsOpen} @toggle=${(event: Event) => this.onDriveSectionsToggle(event)}>
        <summary><span>${lang.mapDriveSegments}</span><span class="summary-count">${selectedDrives.length} / ${this.drives.length}</span></summary>
        <div class="drive-actions"><button class="secondary" type="button" @click=${() => void this.selectAllDrives()}>${lang.mapSelectAll}</button><button class="secondary" type="button" @click=${() => void this.selectNoDrives()}>${lang.mapSelectNone}</button></div>
        <div class="drive-list">${this.drives.map((drive, index) => this.driveRow(drive, index))}</div>
      </details>` : ""}
      <label class="place-filter"><input type="checkbox" .checked=${this.showPlaces} @change=${(event: Event) => { this.showPlaces = (event.currentTarget as HTMLInputElement).checked; this.queueMapRender(); this.requestUpdate(); }}> ${lang.mapPlaces ?? "Orte anzeigen"}</label>
      ${this.error ? html`<p class="error" role="alert">${this.error}</p>` : ""}
      ${this.tileError ? html`<p class="error" role="alert">${messages(this.hass).mapTilesUnavailable ?? (this.hass?.locale?.language?.toLowerCase().startsWith("de") ? "Die Hintergrundkarte konnte nicht geladen werden. Die GPS-Route bleibt sichtbar." : "The background map could not be loaded. The GPS route remains visible.")}</p>` : !manualConfig.tile_url && !this.mapConfig?.tile_url ? html`<p class="muted" role="status">${messages(this.hass).mapTilesNotConfigured ?? (this.hass?.locale?.language?.toLowerCase().startsWith("de") ? "Keine Hintergrundkarte konfiguriert. Die GPS-Route bleibt sichtbar." : "No background map is configured. The GPS route remains visible.")}</p>` : ""}
      ${this.data?.truncated ? html`<p class="muted">${lang.mapTruncated}: ${this.data.returned_points} / ${this.data.total_points}</p>` : ""}
      ${!this.loading && !this.data?.segments.length ? html`<p class="muted">${lang.mapNoPoints}</p>` : ""}
      <div class="map" role="img" aria-label=${lang.mapRouteImageAlt}></div>
      ${tileAttribution ? html`<p class="attribution">${tileAttribution}</p>` : ""}
      ${this.loading ? html`<p class="muted">${lang.loading}</p>` : ""}
    </ha-card>`;
  }
}

MapCard.styles = [TravelCard.styles, unsafeCSS(LEAFLET_CSS), css`
  :host { min-width: 0; }
  ha-card { overflow: hidden; }
  .map-header { display: flex; align-items: end; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
  h2 { margin: 0 0 3px; font-size: 1.25rem; }
  .vehicle-context { margin: 0; color: var(--secondary-text-color); font-size: .86rem; }
  .trip-picker { display: grid; gap: 3px; min-width: min(260px, 50%); font-size: .78rem; color: var(--secondary-text-color); }
  select { min-height: 38px; max-width: 100%; border: 1px solid var(--divider-color); border-radius: 8px; padding: 7px 9px; background: var(--card-background-color); color: var(--primary-text-color); font: inherit; }
  .metrics { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 7px; margin-bottom: 10px; }
  .metric { min-width: 0; padding: 8px 9px; border-radius: 9px; background: var(--secondary-background-color); }
  .metric span, .metric strong { display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .metric span { color: var(--secondary-text-color); font-size: .72rem; }
  .metric strong { margin-top: 3px; font-size: .95rem; }
  .drive-details { margin: 0 0 10px; border-block: 1px solid var(--divider-color); }
  summary { display: flex; justify-content: space-between; gap: 8px; cursor: pointer; padding: 10px 2px; font-weight: 600; list-style-position: inside; }
  .summary-count { color: var(--secondary-text-color); font-size: .85rem; font-weight: 400; }
  .drive-actions { display: flex; gap: 7px; flex-wrap: wrap; padding: 0 0 8px 20px; }
  .drive-actions button { min-height: 34px; padding: 6px 10px; font-size: .82rem; }
  .drive-list { display: grid; gap: 5px; padding: 0 0 8px 20px; }
  .drive-row { display: flex; align-items: center; gap: 8px; min-height: 38px; padding: 5px 7px; border-inline-start: 4px solid var(--drive-color); border-radius: 4px; background: var(--secondary-background-color); cursor: pointer; }
  .drive-row input { flex: 0 0 auto; min-height: 20px; width: 20px; accent-color: var(--drive-color); }
  .drive-info { display: grid; gap: 2px; min-width: 0; font-size: .83rem; }
  .drive-info span { color: var(--secondary-text-color); font-size: .76rem; }
  .map { height: clamp(300px, 58vh, 620px); min-height: 280px; border-radius: 9px; overflow: hidden; background: var(--secondary-background-color); }
  .attribution { margin: 6px 0 0; color: var(--secondary-text-color); font-size: .72rem; }
  button:focus-visible, input:focus-visible, select:focus-visible, summary:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
  @media (max-width: 600px) {
    .map-header { align-items: stretch; flex-direction: column; }
    .trip-picker { min-width: 0; }
    .metrics { gap: 5px; }
    .metric { padding: 7px; }
    .metric strong { font-size: .85rem; }
    .map { height: clamp(300px, 62vh, 560px); }
  }
`] as any;
defineOnce("camper-travel-journal-map-card", MapCard);
