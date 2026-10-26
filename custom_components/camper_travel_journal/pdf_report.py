"""Private, in-memory PDF travel-report rendering."""

from __future__ import annotations

from datetime import datetime
from io import BytesIO
from math import isfinite
import re
import textwrap
from typing import Any
from urllib.parse import urlsplit
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import BaseDocTemplate, Flowable, Frame, KeepTogether, PageBreak, PageTemplate, Paragraph, Spacer, Table, TableStyle
from .validation import is_coordinate_label

PLACE_LABELS = {
    "de": {"campsite": "Campingplatz", "rv_site": "Wohnmobilstellplatz", "wild_camp": "Freistehplatz", "overnight": "Übernachtungsplatz", "parking": "Parkplatz", "restaurant": "Restaurant", "fuel_stop": "Tankstelle", "fuel": "Kraftstoff", "attraction": "Sehenswürdigkeit", "ferry": "Fähre", "other": "Sonstiger Ort"},
    "en": {"campsite": "Campsite", "rv_site": "RV site", "wild_camp": "Wild camping", "overnight": "Overnight place", "parking": "Parking", "restaurant": "Restaurant", "fuel_stop": "Fuel station", "fuel": "Fuel", "attraction": "Attraction", "ferry": "Ferry", "other": "Other place"},
}
COST_LABELS = {
    "de": {"camping": "Camping", "fuel": "Kraftstoff", "toll": "Maut", "parking": "Parkgebühren", "food": "Verpflegung", "activities": "Aktivitäten", "ferry": "Fähre", "water_waste": "Ver- & Entsorgung", "other": "Sonstiges"},
    "en": {"camping": "Camping", "fuel": "Fuel", "toll": "Toll", "parking": "Parking", "food": "Food", "activities": "Activities", "ferry": "Ferry", "water_waste": "Water & waste services", "other": "Other"},
}
SERVICE_LABELS = {"de": {"electricity": "Strom / Landstrom", "fresh_water": "Frischwasser auffüllen", "grey_water": "Grauwasser entsorgen", "toilet_cassette": "Toilettenkassette entsorgen", "shower": "Dusche"}, "en": {"electricity": "Electricity / shore power", "fresh_water": "Refill fresh water", "grey_water": "Dispose of grey water", "toilet_cassette": "Dispose of toilet cassette", "shower": "Shower"}}
STATUS_LABELS = {
    "de": {"unassigned": "Nicht zugeordnet", "stop": "Zwischenstopp", "overnight": "Übernachtungsplatz", "pause": "Fahrtpause", "ignored": "Ignoriert"},
    "en": {"unassigned": "Unassigned", "stop": "Stop", "overnight": "Overnight place", "pause": "Drive pause", "ignored": "Ignored"},
}


def _dt(value: str | None) -> datetime | None:
    if not value:
        return None
    try:
        return datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError:
        return None


def _local_zone(name: str | None) -> ZoneInfo:
    try:
        return ZoneInfo(name or "UTC")
    except ZoneInfoNotFoundError:
        return ZoneInfo("UTC")


def _localized_datetime(value: str | None, time_zone: str | None) -> datetime | None:
    parsed = _dt(value)
    return None if parsed is None else (parsed if parsed.tzinfo is None else parsed.astimezone(_local_zone(time_zone)))


def _date(value: str | None, language: str, time_zone: str = "UTC") -> str:
    parsed = _dt(value) if value and re.fullmatch(r"\d{4}-\d{2}-\d{2}", value) else _localized_datetime(value, time_zone)
    if parsed is None and value:
        return value[:10]
    if parsed is None:
        return ""
    return parsed.strftime("%d.%m.%Y" if language == "de" else "%m/%d/%Y")


def _time(value: str | None, language: str, time_zone: str = "UTC") -> str:
    parsed = _localized_datetime(value, time_zone)
    return "" if parsed is None else parsed.strftime("%H:%M" if language == "de" else "%I:%M %p")


def _expense_time(value: str | None, language: str) -> str:
    """Format a stored wall-clock time without applying a timezone shift."""
    if not value or not re.fullmatch(r"(?:[01]\d|2[0-3]):[0-5]\d", value):
        return ""
    parsed = datetime.strptime(value, "%H:%M")
    return parsed.strftime("%H:%M" if language == "de" else "%I:%M %p")


def _date_time(value: str | None, language: str, time_zone: str = "UTC") -> str:
    parsed = _localized_datetime(value, time_zone)
    if language == "en" and parsed is not None:
        # Keep English table cells readable on A4: the full year remains in
        # the report header/period, while row timestamps use a compact form.
        return parsed.strftime("%m/%d/%y %I:%M %p")
    date_value, time_value = _date(value, language, time_zone), _time(value, language, time_zone)
    return f"{date_value}, {time_value}" if date_value and time_value else date_value or time_value


def _period(trip: dict[str, Any], language: str, time_zone: str = "UTC") -> str:
    first = _date(trip.get("start_date") or trip.get("started_at"), language, time_zone)
    second = _date(trip.get("end_date") or trip.get("ended_at"), language, time_zone)
    return f"{first} – {second}" if first and second and first != second else first or second


def _km(distance_m: float | int | None, language: str) -> str:
    value = float(distance_m or 0) / 1000
    formatted = f"{value:,.1f}"
    return f"{formatted.replace(',', 'X').replace('.', ',').replace('X', '.')} km" if language == "de" else f"{formatted} km"


def _duration(seconds: int | float | None, language: str) -> str:
    # Half-up avoids Python's banker rounding and leaves source timestamps untouched.
    minutes = max(0, int(float(seconds or 0) / 60 + 0.5))
    hours, rest = divmod(minutes, 60)
    return f"{hours} h {rest} min" if hours else f"{rest} min"


def _money(minor: int | None, currency: str | None, language: str) -> str:
    value, symbol = (minor or 0) / 100, currency or "EUR"
    if language == "de":
        return f"{value:,.2f} {symbol}".replace(",", "X").replace(".", ",").replace("X", ".")
    return f"{symbol} {value:,.2f}"


def _fuel_details(expense: dict[str, Any], language: str) -> str:
    parts = []
    if expense.get("fuel_liters") is not None:
        value = f"{float(expense['fuel_liters']):.3f} l"
        parts.append(value.replace(".", ",") if language == "de" else value)
    if expense.get("fuel_price_per_liter") is not None:
        value = f"{float(expense['fuel_price_per_liter']):.3f} €/l"
        parts.append(value.replace(".", ",") if language == "de" else value)
    return " · ".join(parts)


def _text(value: Any) -> str:
    return "" if value is None else str(value).strip()


def _expense_sort_key(expense: dict[str, Any]) -> tuple[str, int, str, str]:
    """Sort by the recorded expense date/time, never capture timestamps."""
    date = _text(expense.get("occurred_on")) or _text(expense.get("occurred_at"))[:10]
    time = _text(expense.get("occurred_time"))
    # Missing time is deliberately placed after timed entries on the same day.
    return date, 1 if time else 0, time, _text(expense.get("id"))


def _markup(value: Any) -> str:
    return escape(_text(value)).replace("\n", "<br/>")


def _place_details(stop: dict[str, Any], style: ParagraphStyle, language: str) -> Paragraph:
    """Render place details with a compact, safe website link label."""
    lines = [_text(stop.get("address")), _text(stop.get("description"))]
    website = _text(stop.get("website_url"))
    if website:
        parsed = urlsplit(website)
        if parsed.scheme.lower() in {"http", "https"} and parsed.netloc and not any(char.isspace() for char in website):
            href = escape(website, {"\"": "&quot;", "'": "&apos;"})
            lines.append(f'<link href="{href}">{"Webseite öffnen" if language == "de" else "Open website"}</link>')
    content = "<br/>".join(escape(line) for line in lines[:2] if line)
    if website and lines and lines[-1].startswith("<link "):
        content = f"{content}<br/>{lines[-1]}" if content else lines[-1]
    return Paragraph(content or "–", style)


def _category_label(category: Any, language: str) -> str:
    value = _text(category)
    return COST_LABELS[language].get(value, value or "–")


def _service_labels(services: Any, language: str) -> str:
    if not isinstance(services, (list, tuple)):
        return ""
    return " · ".join(SERVICE_LABELS[language].get(_text(value), _text(value)) for value in services if _text(value))


def _place_label(category: Any, language: str) -> str:
    value = _text(category)
    return PLACE_LABELS[language].get(value, value or "–")


def _drive_source(source: Any, language: str) -> str:
    labels = {"de": {"gps": "GPS-erkannt", "gpx": "GPX-importiert", "manual": "Manuell"}, "en": {"gps": "GPS detected", "gpx": "GPX imported", "manual": "Manual"}}
    return labels[language].get(_text(source), _text(source) or "–")


def _safe_filename(title: str, period: str) -> str:
    years = re.findall(r"\d{4}", period)
    suffix = f"_{years[0]}" if years else ""
    clean = re.sub(r"[^A-Za-z0-9ÄÖÜäöüß_-]+", "_", title, flags=re.UNICODE).strip("_") or "Reise"
    return f"Camper-Travel-Journal_{clean}{suffix}.pdf"


class _ReportDocTemplate(BaseDocTemplate):
    def __init__(self, stream, *, created: str, language: str):
        super().__init__(stream, pagesize=A4, leftMargin=16 * mm, rightMargin=16 * mm, topMargin=16 * mm, bottomMargin=17 * mm)
        self.created, self.language = created, language
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id="normal")
        self.addPageTemplates([PageTemplate(id="report", frames=[frame], onPage=self._footer)])

    def _footer(self, canvas, document):
        canvas.saveState(); canvas.setStrokeColor(colors.HexColor("#d8dee8")); canvas.line(self.leftMargin, 12 * mm, A4[0] - self.rightMargin, 12 * mm)
        canvas.setFont("Helvetica", 8); canvas.setFillColor(colors.HexColor("#667085"))
        canvas.drawString(self.leftMargin, 8 * mm, f"{'Erstellt' if self.language == 'de' else 'Created'}: {self.created}")
        canvas.drawRightString(A4[0] - self.rightMargin, 8 * mm, f"{'Seite' if self.language == 'de' else 'Page'} {document.page}"); canvas.restoreState()


class _RouteMap(Flowable):
    """Draw a deterministic, offline route overview from persisted GPX points."""
    def __init__(self, segments: list[dict[str, Any]], *, width: float, height: float, language: str, endpoint_labels: dict[str, tuple[str, str]] | None = None, stops: list[dict[str, Any]] | None = None):
        super().__init__(); self.segments = segments; self.width = width; self.height = height; self.language = language; self.endpoint_labels = endpoint_labels or {}; self.stops = stops or []

    def wrap(self, avail_width: float, avail_height: float) -> tuple[float, float]:
        return min(self.width, avail_width), self.height

    def draw(self):
        valid_runs = []
        for segment in self.segments:
            current_run = []
            for point in segment.get("points", []):
                try:
                    latitude, longitude = float(point.get("latitude")), float(point.get("longitude"))
                except (AttributeError, TypeError, ValueError):
                    if current_run:
                        valid_runs.append(current_run)
                        current_run = []
                    continue
                if isfinite(latitude) and isfinite(longitude) and -90 <= latitude <= 90 and -180 <= longitude <= 180:
                    current_run.append((longitude, latitude))
                elif current_run:
                    valid_runs.append(current_run)
                    current_run = []
            if current_run:
                valid_runs.append(current_run)
        points = [point for run in valid_runs for point in run]
        canvas = self.canv; canvas.saveState(); canvas.setStrokeColor(colors.HexColor("#d8dee8")); canvas.setFillColor(colors.HexColor("#f8fafc")); canvas.roundRect(0, 0, self.width, self.height, 5, stroke=1, fill=1)
        pad = 14
        legend_font_size, legend_line_height = 7.0, 8.5
        legend_ascent, legend_descent = legend_font_size * 0.8, legend_font_size * 0.2
        legend_left, legend_right = pad, self.width - pad
        legend_width = max(1.0, legend_right - legend_left)
        base_legend = "S = Start, Z = Ziel, Ü = Übernachtungsplatz" if self.language == "de" else "S = start, Z = destination, O = overnight place"

        def wrap_legend(value: str) -> list[str]:
            words = value.split()
            lines: list[str] = []
            current = ""
            for word in words:
                candidate = f"{current} {word}".strip()
                if current and canvas.stringWidth(candidate, "Helvetica", legend_font_size) > legend_width:
                    lines.append(current)
                    current = word
                else:
                    current = candidate
            if current:
                lines.append(current)
            return lines or [""]

        endpoint_count = sum(2 for segment in self.segments if self.endpoint_labels.get(_text(segment.get("drive_id"))))
        endpoint_count += sum(1 for stop in self.stops if _text(stop.get("place_kind") or stop.get("place_type") or stop.get("stop_type")) in {"overnight", "campsite", "rv_site", "wild_camp"})
        reserved_hint = f"{max(1, endpoint_count)} additional location labels not shown." if self.language == "en" else f"Weitere {max(1, endpoint_count)} Ortsbeschriftungen nicht dargestellt."
        reserved_legend_lines = wrap_legend(base_legend) + (wrap_legend(reserved_hint) if endpoint_count else [])
        legend_bottom = 5.0
        label_bottom = legend_bottom + legend_descent + (len(reserved_legend_lines) - 1) * legend_line_height + legend_ascent + 4.0
        map_height = max(2 * pad + 1.0, self.height - label_bottom)
        if not points:
            canvas.setFillColor(colors.HexColor("#667085")); canvas.setFont("Helvetica", 10); canvas.drawCentredString(self.width / 2, self.height / 2, "Keine GPS-Strecke vorhanden" if self.language == "de" else "No GPS route available"); canvas.restoreState(); return
        min_lon, max_lon = min(p[0] for p in points), max(p[0] for p in points); min_lat, max_lat = min(p[1] for p in points), max(p[1] for p in points); lon_span = max(max_lon - min_lon, 1e-6); lat_span = max(max_lat - min_lat, 1e-6)
        scale = min((self.width - 2 * pad) / lon_span, (map_height - 2 * pad) / lat_span)
        ox = (self.width - lon_span * scale) / 2 - min_lon * scale; oy = label_bottom + (map_height - lat_span * scale) / 2 - min_lat * scale
        colors_list = ["#1976d2", "#d32f2f", "#388e3c", "#7b1fa2", "#f57c00", "#00796b"]
        for index, run in enumerate(valid_runs):
            segment_points = [(longitude * scale + ox, latitude * scale + oy) for longitude, latitude in run]
            if len(segment_points) < 2: continue
            path = canvas.beginPath(); path.moveTo(*segment_points[0]); [path.lineTo(*p) for p in segment_points[1:]]; canvas.setStrokeColor(colors.HexColor(colors_list[index % len(colors_list)])); canvas.setLineWidth(2.2); canvas.drawPath(path)
        # Keep endpoint names on the map itself.  They are already resolved by
        # the read-only report snapshot (manual/home/stay label or coordinates),
        # so the PDF renderer never performs geocoding or network access.
        endpoint_positions: list[tuple[int, int, float, float, str, str, str]] = []
        last_segment_index = len(self.segments) - 1
        for segment_index, segment in enumerate(self.segments):
            drive_id = _text(segment.get("drive_id"))
            labels = self.endpoint_labels.get(drive_id)
            if not labels:
                continue
            runs = []
            current = []
            for point in segment.get("points", []):
                try:
                    latitude, longitude = float(point.get("latitude")), float(point.get("longitude"))
                except (AttributeError, TypeError, ValueError):
                    if current:
                        runs.append(current); current = []
                    continue
                if isfinite(latitude) and isfinite(longitude) and -90 <= latitude <= 90 and -180 <= longitude <= 180:
                    current.append((longitude * scale + ox, latitude * scale + oy))
                elif current:
                    runs.append(current); current = []
            if current:
                runs.append(current)
            if not runs:
                continue
            endpoint_positions.extend([
                (0 if segment_index == 0 else 2, len(endpoint_positions), runs[0][0][0], runs[0][0][1], labels[0], "#2e7d32", "S"),
                (0 if segment_index == last_segment_index else 2, len(endpoint_positions) + 1, runs[-1][-1][0], runs[-1][-1][1], labels[1], "#c62828", "Z"),
            ])
        overnight_types = {"overnight", "campsite", "rv_site", "wild_camp"}
        for stop in self.stops:
            try:
                latitude, longitude = float(stop.get("latitude")), float(stop.get("longitude"))
            except (AttributeError, TypeError, ValueError):
                continue
            if not (isfinite(latitude) and isfinite(longitude) and -90 <= latitude <= 90 and -180 <= longitude <= 180):
                continue
            place_type = _text(stop.get("place_kind") or stop.get("place_type") or stop.get("stop_type"))
            if place_type not in overnight_types:
                continue
            endpoint_positions.append((1, len(endpoint_positions), longitude * scale + ox, latitude * scale + oy, _text(stop.get("name")), "#8e24aa", "Ü" if self.language == "de" else "O"))
        # Collapse roles that describe the same rendered location before label
        # placement.  The comparison is deliberately in rendered points: it
        # is bounded, deterministic, and avoids merging distinct nearby places
        # merely because their names happen to match.
        grouped_positions: list[dict[str, Any]] = []
        for priority, sequence, x, y, label, color, marker in sorted(endpoint_positions, key=lambda item: (item[0], item[1])):
            label = _text(label)
            if is_coordinate_label(label):
                label = ""
            match = next((group for group in grouped_positions if label and group["labels"] == [label] and (group["x"] - x) ** 2 + (group["y"] - y) ** 2 <= 1.5 ** 2), None)
            if match is None:
                grouped_positions.append({"priority": priority, "sequence": sequence, "x": x, "y": y, "labels": [label] if label else [], "color": color, "markers": [marker]})
                continue
            if label and label not in match["labels"]:
                match["labels"].append(label)
            if marker not in match["markers"]:
                match["markers"].append(marker)
            match["priority"] = min(match["priority"], priority)
        endpoint_positions = [
            (
                int(group["priority"]),
                int(group["sequence"]),
                float(group["x"]),
                float(group["y"]),
                " / ".join(group["labels"]),
                str(group["color"]),
                "/".join(group["markers"]),
            )
            for group in grouped_positions
        ]
        # Place labels in deterministic candidate slots.  This keeps labels
        # inside the map and avoids drawing endpoint/stay text on top of one
        # another without changing the stored coordinates.
        canvas.setFont("Helvetica", 6.5)
        occupied: list[tuple[float, float, float, float]] = []
        font_size, line_height, margin = 6.5, 7.0, 3.0
        # Helvetica's text is drawn from the baseline.  Keep the measured
        # ascent/descent explicit so the collision box matches the glyphs,
        # including the lower lines of a multiline label.
        font_ascent, font_descent = font_size * 0.8, font_size * 0.2
        skipped_labels = 0
        for _priority, _sequence, x, y, label, color, _marker in sorted(endpoint_positions, key=lambda item: (item[0], item[1])):
            label = _text(label)
            if not label or is_coordinate_label(label):
                continue
            lines = textwrap.wrap(label, width=30, break_long_words=True, break_on_hyphens=False) or [label]
            text_width = max(canvas.stringWidth(line, "Helvetica", 6.5) for line in lines)
            min_baseline = label_bottom + (len(lines) - 1) * line_height + font_descent
            max_baseline = self.height - margin - font_ascent
            text_x = text_y = 0.0
            placed = False
            for dx, dy in ((6, 5), (6, -10), (-text_width - 6, 5), (-text_width - 6, -10), (12, 16), (-text_width - 12, 16)):
                candidate_x = min(max(x + dx, margin), self.width - text_width - margin)
                candidate_y = min(max(y + dy, min_baseline), max_baseline)
                # ReportLab baselines advance downwards here.  The box is the
                # actual visual extent of those baselines, not a box above
                # the first baseline.
                box = (candidate_x, candidate_y - (len(lines) - 1) * line_height - font_descent, candidate_x + text_width, candidate_y + font_ascent)
                if not any(box[0] < other[2] and box[2] > other[0] and box[1] < other[3] and box[3] > other[1] for other in occupied):
                    text_x, text_y = candidate_x, candidate_y
                    occupied.append(box)
                    placed = True
                    break
            else:
                # Deterministic grid fallback for crowded marker clusters.
                # It still uses the same measured box and never leaves the
                # map when a wrapped label fits on the page.
                placed = False
                for grid_y in range(int(max_baseline), int(min_baseline) - 1, -8):
                    for grid_x in range(int(margin), max(int(self.width - text_width - margin), int(margin)) + 1, 8):
                        box = (grid_x, grid_y - (len(lines) - 1) * line_height - font_descent, grid_x + text_width, grid_y + font_ascent)
                        if not any(box[0] < other[2] and box[2] > other[0] and box[1] < other[3] and box[3] > other[1] for other in occupied):
                            text_x, text_y = grid_x, grid_y; occupied.append(box); placed = True; break
                    if placed:
                        break
            if not placed:
                skipped_labels += 1
                continue
            canvas.setFillColor(colors.HexColor(color))
            for line_index, line in enumerate(lines):
                canvas.drawString(text_x, text_y - line_index * line_height, line)
        for _priority, _sequence, x, y, _label, color, marker in endpoint_positions:
            canvas.setFillColor(colors.HexColor(color)); canvas.circle(x, y, 4, stroke=0, fill=1); canvas.setFillColor(colors.white); canvas.setFont("Helvetica-Bold", 6); canvas.drawCentredString(x, y - 2, marker)
        hint = f"Weitere {skipped_labels} Ortsbeschriftungen nicht dargestellt." if self.language == "de" else f"{skipped_labels} additional location labels not shown."
        legend_lines = wrap_legend(base_legend) + (wrap_legend(hint) if skipped_labels else [])
        canvas.setFillColor(colors.HexColor("#667085")); canvas.setFont("Helvetica", legend_font_size)
        legend_first_baseline = legend_bottom + legend_descent + (len(legend_lines) - 1) * legend_line_height
        for line_index, line in enumerate(legend_lines):
            canvas.drawString(legend_left, legend_first_baseline - line_index * legend_line_height, line)
        canvas.restoreState()


def _paragraph(value: Any, style: ParagraphStyle, fallback: str = "–") -> Paragraph:
    return Paragraph(_markup(value) or fallback, style)


def _table(rows: list[list[Flowable | str]], widths: list[float], *, header: bool = True) -> Table:
    table = Table(rows, colWidths=widths, repeatRows=1 if header else 0, hAlign="LEFT", splitByRow=1)
    style = [("VALIGN", (0, 0), (-1, -1), "TOP"), ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#d8dee8")), ("LEFTPADDING", (0, 0), (-1, -1), 5), ("RIGHTPADDING", (0, 0), (-1, -1), 5), ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5)]
    if header: style += [("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#e9eef5")), ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold")]
    for row in range(1 if header else 0, len(rows)):
        if row % 2: style.append(("BACKGROUND", (0, row), (-1, row), colors.HexColor("#f8fafc")))
    table.setStyle(TableStyle(style)); return table


def render_trip_report(report: dict[str, Any], *, language: str = "de", time_zone: str = "UTC") -> tuple[bytes, str]:
    """Render a validated, read-only trip snapshot as a printable A4 report."""
    language = "en" if language.lower().startswith("en") else "de"
    labels = {
        "de": {"report": "Reisebericht", "vehicle": "Fahrzeug", "period": "Reisezeitraum", "destination": "Reiseziel", "distance": "Gesamtkilometer", "drives": "Fahrten", "costs": "Gesamtkosten", "drive_list": "Fahrten", "interruptions": "Aufenthalte und Fahrtunterbrechungen", "start": "Start", "end": "Ende", "distance_short": "Entfernung", "duration": "Dauer", "source": "Herkunft", "route": "Strecke", "cost_summary": "Kosten nach Kategorien", "category": "Kategorie", "amount": "Betrag", "expenses": "Ausgaben", "description": "Beschreibung", "stops": "Orte und Bewertungen", "notes": "Reisenotizen", "name": "Name", "period_short": "Zeitraum", "type": "Kategorie", "rating": "Bewertung", "details": "Details", "unknown_date": "Ausgabendatum unbekannt", "time": "Uhrzeit", "map": "Reisekarte"},
        "en": {"report": "Travel report", "vehicle": "Vehicle", "period": "Travel period", "destination": "Destination", "distance": "Total distance", "drives": "Drives", "costs": "Total costs", "drive_list": "Drives", "interruptions": "Stays and drive interruptions", "start": "Start", "end": "End", "distance_short": "Distance", "duration": "Duration", "source": "Source", "route": "Route", "cost_summary": "Costs by category", "category": "Category", "amount": "Amount", "expenses": "Expenses", "description": "Description", "stops": "Places and ratings", "notes": "Trip notes", "name": "Name", "period_short": "Period", "type": "Category", "rating": "Rating", "details": "Details", "unknown_date": "Expense date unknown", "time": "Time", "map": "Travel map"},
    }[language]
    styles = getSampleStyleSheet(); body = ParagraphStyle("ReportBody", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.5, leading=10.5, spaceAfter=2); small = ParagraphStyle("ReportSmall", parent=body, fontSize=7.5, leading=9); date_style = ParagraphStyle("ReportDate", parent=body, leading=10); right = ParagraphStyle("ReportRight", parent=body, alignment=TA_RIGHT); heading = ParagraphStyle("ReportHeading", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=13, leading=16, textColor=colors.HexColor("#17324d"), spaceBefore=12, spaceAfter=7, keepWithNext=1); title = ParagraphStyle("ReportTitle", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=23, leading=27, textColor=colors.HexColor("#17324d"), alignment=TA_CENTER, spaceAfter=8)
    trip = report["trip"]; period = _period(trip, language, time_zone); now = datetime.now(_local_zone(time_zone)).strftime("%d.%m.%Y %H:%M" if language == "de" else "%m/%d/%Y %I:%M %p"); stream = BytesIO(); doc = _ReportDocTemplate(stream, created=now, language=language)
    story: list[Flowable] = [Paragraph(labels["report"], title), Paragraph(f"<b>{_markup(trip.get('title'))}</b>", body), Paragraph(f"{labels['vehicle']}: {_markup(report.get('vehicle_name'))} · {labels['period']}: {escape(period) or '–'}", body)]
    if _text(trip.get("destination")): story.append(Paragraph(f"{labels['destination']}: {_markup(trip.get('destination'))}", body))
    if _text(trip.get("description")): story += [Paragraph(labels["notes"], heading), Paragraph(_markup(trip.get("description")), body)]
    summary = report.get("expense_summary") or {}; currency = summary.get("currency") or "EUR"; distance = sum(float(item.get("distance_m") or 0) for item in report.get("drives", [])); total = ("Mehrere Währungen" if language == "de" else "Multiple currencies") if summary.get("mixed_currency") else _money(summary.get("total_minor"), currency, language)
    story += [_table([[labels["distance"], labels["drives"], labels["costs"]], [_km(distance, language), str(len(report.get("drives", []))), total]], [doc.width / 3] * 3), Spacer(1, 5)]
    drives = report.get("drives", [])
    endpoint_labels = {
        _text(drive.get("id")): (_text(drive.get("start_label")), _text(drive.get("end_label")))
        for drive in drives
        if _text(drive.get("id"))
    }
    route_segments = [segment for segment in (report.get("route_segments") or []) if segment.get("points")]
    story.append(PageBreak())
    story.append(KeepTogether([Paragraph(labels["map"], heading), _RouteMap(route_segments, width=doc.width, height=105 * mm, language=language, endpoint_labels=endpoint_labels, stops=report.get("stops") or [])]))
    if drives:
        rows = [[labels["start"], labels["end"], labels["distance_short"], labels["duration"], labels["source"], labels["route"]]]
        for drive in sorted(drives, key=lambda item: (item.get("started_at", ""), item.get("id", ""))):
            route = " → ".join(part for part in (_text(drive.get("start_label")), _text(drive.get("end_label"))) if part) or "–"; rows.append([_paragraph(_date_time(drive.get("started_at"), language, time_zone), date_style), _paragraph(_date_time(drive.get("ended_at"), language, time_zone), date_style), _paragraph(_km(drive.get("distance_m"), language), body), _paragraph(_duration(drive.get("duration_seconds"), language), body), _paragraph(_drive_source(drive.get("source"), language), small), _paragraph(route, small)])
        story.append(KeepTogether([Paragraph(labels["drive_list"], heading), _table(rows, [35 * mm, 35 * mm, 22 * mm, 21 * mm, 24 * mm, doc.width - 137 * mm])]))
    interruptions = report.get("interruptions") or []
    if interruptions:
        rows = [[labels["period_short"], labels["duration"], labels["type"], labels["details"]]]
        for item in sorted(interruptions, key=lambda value: (value.get("started_at", ""), value.get("id", ""))):
            status = _text(item.get("status")); place = _text(item.get("existing_place_name")) or _text(item.get("place_name")); rows.append([_paragraph(f"{_date_time(item.get('started_at'), language, time_zone)}\n{_date_time(item.get('ended_at'), language, time_zone)}", date_style), _paragraph(_duration(item.get("duration_seconds"), language), body), _paragraph(STATUS_LABELS[language].get(status, status or "–"), body), _paragraph(place, small)])
        story.append(KeepTogether([Paragraph(labels["interruptions"], heading), _table(rows, [48 * mm, 24 * mm, 38 * mm, doc.width - 110 * mm])]))
    by_category = summary.get("by_category") or {}
    if by_category:
        rows = [[labels["category"], labels["amount"]]]
        for category, amount in sorted(by_category.items()): rows.append([_paragraph(_category_label(category, language), body), Paragraph(_markup(_money(amount, currency, language)), right)])
        story.append(KeepTogether([Paragraph(labels["cost_summary"], heading), _table(rows, [doc.width * 0.65, doc.width * 0.35])]))
    expenses = report.get("expenses", [])
    if expenses:
        rows = [[labels["period_short"], labels["category"], labels["amount"], labels["description"]]]
        for expense in sorted(expenses, key=_expense_sort_key, reverse=True):
            note, place = _text(expense.get("note")), _text(expense.get("place_name")); note = f"{note} · {place}" if note and place else note or place
            fuel = _fuel_details(expense, language)
            if fuel:
                note = f"{fuel} · {note}" if note else fuel
            services = _service_labels(expense.get("services"), language)
            if services:
                note = f"{services} · {note}" if note else services
            actual_date = _date(expense.get("occurred_on"), language, time_zone) if expense.get("occurred_on") else labels["unknown_date"]
            actual_time = _expense_time(expense.get("occurred_time"), language)
            date_text = f"{actual_date}, {actual_time}" if actual_time else actual_date
            rows.append([_paragraph(date_text, date_style), _paragraph(_category_label(expense.get("category"), language), body), _paragraph(_money(expense.get("amount_minor"), expense.get("currency"), language), body), _paragraph(note, small)])
        story.append(KeepTogether([Paragraph(labels["expenses"], heading), _table(rows, [31 * mm, 32 * mm, 29 * mm, doc.width - 92 * mm])]))
    stops = report.get("stops", [])
    if stops:
        rows = [[labels["name"], labels["type"], labels["period_short"], labels["duration"], labels["rating"], labels["details"]]]
        for stop in sorted(stops, key=lambda item: (item.get("arrived_at") or item.get("occurred_at", ""), item.get("id", ""))):
            start, end = stop.get("arrived_at") or stop.get("occurred_at"), stop.get("departed_at"); period_value = f"{_date_time(start, language, time_zone)}\n{_date_time(end, language, time_zone)}" if end else _date_time(start, language, time_zone); rating = f"{stop['rating_overall']}/5" if stop.get("rating_overall") is not None else "–"; rows.append([_paragraph(stop.get("name"), body), _paragraph(_place_label(stop.get("place_type") or stop.get("stop_type"), language), body), _paragraph(period_value, date_style), _paragraph(_duration(stop.get("duration_seconds"), language), body), _paragraph(rating, body), _place_details(stop, small, language)])
        stop_table = _table(rows, [35 * mm, 31 * mm, 42 * mm, 22 * mm, 19 * mm, doc.width - 149 * mm])
        story.append(KeepTogether([Paragraph(labels["stops"], heading), stop_table]))
    doc.build(story); return stream.getvalue(), _safe_filename(_text(trip.get("title")), period)
