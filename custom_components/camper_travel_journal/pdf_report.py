"""Private, in-memory PDF travel-report rendering."""

from __future__ import annotations

from datetime import datetime
from io import BytesIO
import re
from typing import Any
from urllib.parse import urlsplit
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import BaseDocTemplate, Flowable, Frame, KeepTogether, PageTemplate, Paragraph, Spacer, Table, TableStyle

PLACE_LABELS = {
    "de": {"campsite": "Campingplatz", "rv_site": "Wohnmobilstellplatz", "wild_camp": "Freistehplatz", "overnight": "Übernachtungsplatz", "parking": "Parkplatz", "restaurant": "Restaurant", "fuel_stop": "Tankstelle", "fuel": "Kraftstoff", "attraction": "Sehenswürdigkeit", "ferry": "Fähre", "other": "Sonstiger Ort"},
    "en": {"campsite": "Campsite", "rv_site": "RV site", "wild_camp": "Wild camping", "overnight": "Overnight place", "parking": "Parking", "restaurant": "Restaurant", "fuel_stop": "Fuel station", "fuel": "Fuel", "attraction": "Attraction", "ferry": "Ferry", "other": "Other place"},
}
COST_LABELS = {
    "de": {"camping": "Camping", "fuel": "Kraftstoff", "toll": "Maut", "parking": "Parkgebühren", "food": "Verpflegung", "activities": "Aktivitäten", "ferry": "Fähre", "other": "Sonstiges"},
    "en": {"camping": "Camping", "fuel": "Fuel", "toll": "Toll", "parking": "Parking", "food": "Food", "activities": "Activities", "ferry": "Ferry", "other": "Other"},
}
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


def _text(value: Any) -> str:
    return "" if value is None else str(value).strip()


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
        "de": {"report": "Reisebericht", "vehicle": "Fahrzeug", "period": "Reisezeitraum", "destination": "Reiseziel", "distance": "Gesamtkilometer", "drives": "Fahrten", "costs": "Gesamtkosten", "drive_list": "Fahrten", "interruptions": "Aufenthalte und Fahrtunterbrechungen", "start": "Start", "end": "Ende", "distance_short": "Entfernung", "duration": "Dauer", "source": "Herkunft", "route": "Strecke", "cost_summary": "Kosten nach Kategorien", "category": "Kategorie", "amount": "Betrag", "expenses": "Ausgaben", "description": "Beschreibung", "stops": "Orte und Bewertungen", "notes": "Reisenotizen", "name": "Name", "period_short": "Zeitraum", "type": "Kategorie", "rating": "Bewertung", "details": "Details", "unknown_date": "Ausgabendatum unbekannt", "time": "Uhrzeit"},
        "en": {"report": "Travel report", "vehicle": "Vehicle", "period": "Travel period", "destination": "Destination", "distance": "Total distance", "drives": "Drives", "costs": "Total costs", "drive_list": "Drives", "interruptions": "Stays and drive interruptions", "start": "Start", "end": "End", "distance_short": "Distance", "duration": "Duration", "source": "Source", "route": "Route", "cost_summary": "Costs by category", "category": "Category", "amount": "Amount", "expenses": "Expenses", "description": "Description", "stops": "Places and ratings", "notes": "Trip notes", "name": "Name", "period_short": "Period", "type": "Category", "rating": "Rating", "details": "Details", "unknown_date": "Expense date unknown", "time": "Time"},
    }[language]
    styles = getSampleStyleSheet(); body = ParagraphStyle("ReportBody", parent=styles["BodyText"], fontName="Helvetica", fontSize=8.5, leading=10.5, spaceAfter=2); small = ParagraphStyle("ReportSmall", parent=body, fontSize=7.5, leading=9); date_style = ParagraphStyle("ReportDate", parent=body, leading=10); right = ParagraphStyle("ReportRight", parent=body, alignment=TA_RIGHT); heading = ParagraphStyle("ReportHeading", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=13, leading=16, textColor=colors.HexColor("#17324d"), spaceBefore=12, spaceAfter=7, keepWithNext=1); title = ParagraphStyle("ReportTitle", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=23, leading=27, textColor=colors.HexColor("#17324d"), alignment=TA_CENTER, spaceAfter=8)
    trip = report["trip"]; period = _period(trip, language, time_zone); now = datetime.now(_local_zone(time_zone)).strftime("%d.%m.%Y %H:%M" if language == "de" else "%m/%d/%Y %I:%M %p"); stream = BytesIO(); doc = _ReportDocTemplate(stream, created=now, language=language)
    story: list[Flowable] = [Paragraph(labels["report"], title), Paragraph(f"<b>{_markup(trip.get('title'))}</b>", body), Paragraph(f"{labels['vehicle']}: {_markup(report.get('vehicle_name'))} · {labels['period']}: {escape(period) or '–'}", body)]
    if _text(trip.get("destination")): story.append(Paragraph(f"{labels['destination']}: {_markup(trip.get('destination'))}", body))
    if _text(trip.get("description")): story += [Paragraph(labels["notes"], heading), Paragraph(_markup(trip.get("description")), body)]
    summary = report.get("expense_summary") or {}; currency = summary.get("currency") or "EUR"; distance = sum(float(item.get("distance_m") or 0) for item in report.get("drives", [])); total = ("Mehrere Währungen" if language == "de" else "Multiple currencies") if summary.get("mixed_currency") else _money(summary.get("total_minor"), currency, language)
    story += [_table([[labels["distance"], labels["drives"], labels["costs"]], [_km(distance, language), str(len(report.get("drives", []))), total]], [doc.width / 3] * 3), Spacer(1, 5)]
    drives = report.get("drives", [])
    if drives:
        story.append(Paragraph(labels["drive_list"], heading)); rows = [[labels["start"], labels["end"], labels["distance_short"], labels["duration"], labels["source"], labels["route"]]]
        for drive in sorted(drives, key=lambda item: (item.get("started_at", ""), item.get("id", ""))):
            route = " → ".join(part for part in (_text(drive.get("start_label")), _text(drive.get("end_label"))) if part) or "–"; rows.append([_paragraph(_date_time(drive.get("started_at"), language, time_zone), date_style), _paragraph(_date_time(drive.get("ended_at"), language, time_zone), date_style), _paragraph(_km(drive.get("distance_m"), language), body), _paragraph(_duration(drive.get("duration_seconds"), language), body), _paragraph(_drive_source(drive.get("source"), language), small), _paragraph(route, small)])
        story.append(_table(rows, [35 * mm, 35 * mm, 22 * mm, 21 * mm, 24 * mm, doc.width - 137 * mm]))
    interruptions = report.get("interruptions") or []
    if interruptions:
        story.append(Paragraph(labels["interruptions"], heading)); rows = [[labels["period_short"], labels["duration"], labels["type"], labels["details"]]]
        for item in sorted(interruptions, key=lambda value: (value.get("started_at", ""), value.get("id", ""))):
            status = _text(item.get("status")); place = _text(item.get("existing_place_name")) or _text(item.get("place_name")); rows.append([_paragraph(f"{_date_time(item.get('started_at'), language, time_zone)}\n{_date_time(item.get('ended_at'), language, time_zone)}", date_style), _paragraph(_duration(item.get("duration_seconds"), language), body), _paragraph(STATUS_LABELS[language].get(status, status or "–"), body), _paragraph(place, small)])
        story.append(_table(rows, [48 * mm, 24 * mm, 38 * mm, doc.width - 110 * mm]))
    by_category = summary.get("by_category") or {}
    if by_category:
        rows = [[labels["category"], labels["amount"]]]
        for category, amount in sorted(by_category.items()): rows.append([_paragraph(_category_label(category, language), body), Paragraph(_markup(_money(amount, currency, language)), right)])
        story.append(KeepTogether([Paragraph(labels["cost_summary"], heading), _table(rows, [doc.width * 0.65, doc.width * 0.35])]))
    expenses = report.get("expenses", [])
    if expenses:
        story.append(Paragraph(labels["expenses"], heading)); rows = [[labels["period_short"], labels["category"], labels["amount"], labels["description"]]]
        for expense in sorted(expenses, key=lambda item: (item.get("occurred_on") or item.get("created_at") or "", item.get("id", ""))):
            note, place = _text(expense.get("note")), _text(expense.get("place_name")); note = f"{note} · {place}" if note and place else note or place
            actual_date = _date(expense.get("occurred_on"), language, time_zone) if expense.get("occurred_on") else labels["unknown_date"]
            actual_time = _time(f"2000-01-01T{expense['occurred_time']}:00+00:00", language, time_zone) if expense.get("occurred_time") else ""
            date_text = f"{actual_date}, {actual_time}" if actual_time else actual_date
            rows.append([_paragraph(date_text, date_style), _paragraph(_category_label(expense.get("category"), language), body), _paragraph(_money(expense.get("amount_minor"), expense.get("currency"), language), body), _paragraph(note, small)])
        story.append(_table(rows, [31 * mm, 32 * mm, 29 * mm, doc.width - 92 * mm]))
    stops = report.get("stops", [])
    if stops:
        rows = [[labels["name"], labels["type"], labels["period_short"], labels["duration"], labels["rating"], labels["details"]]]
        for stop in sorted(stops, key=lambda item: (item.get("arrived_at") or item.get("occurred_at", ""), item.get("id", ""))):
            start, end = stop.get("arrived_at") or stop.get("occurred_at"), stop.get("departed_at"); period_value = f"{_date_time(start, language, time_zone)}\n{_date_time(end, language, time_zone)}" if end else _date_time(start, language, time_zone); rating = f"{stop['rating_overall']}/5" if stop.get("rating_overall") is not None else "–"; rows.append([_paragraph(stop.get("name"), body), _paragraph(_place_label(stop.get("place_type") or stop.get("stop_type"), language), body), _paragraph(period_value, date_style), _paragraph(_duration(stop.get("duration_seconds"), language), body), _paragraph(rating, body), _place_details(stop, small, language)])
        stop_table = _table(rows, [35 * mm, 31 * mm, 42 * mm, 22 * mm, 19 * mm, doc.width - 149 * mm])
        story.append(KeepTogether([Paragraph(labels["stops"], heading), stop_table]))
    doc.build(story); return stream.getvalue(), _safe_filename(_text(trip.get("title")), period)
