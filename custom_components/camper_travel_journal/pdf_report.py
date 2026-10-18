"""Private, in-memory PDF travel-report rendering."""

from __future__ import annotations

from datetime import datetime
from io import BytesIO
import re
from typing import Any
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Flowable,
    Frame,
    KeepTogether,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)


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
    if parsed is None:
        return None
    if parsed.tzinfo is None:
        return parsed
    return parsed.astimezone(_local_zone(time_zone))


def _date(value: str | None, language: str, time_zone: str = "UTC") -> str:
    if value and re.fullmatch(r"\d{4}-\d{2}-\d{2}", value):
        parsed = _dt(value)
    else:
        parsed = _localized_datetime(value, time_zone)
    if parsed is None and value:
        return value[:10]
    if parsed is None:
        return ""
    if language == "de":
        return parsed.strftime("%d.%m.%Y")
    return parsed.strftime("%m/%d/%Y")


def _time(value: str | None, language: str, time_zone: str = "UTC") -> str:
    parsed = _localized_datetime(value, time_zone)
    if parsed is None:
        return ""
    return parsed.strftime("%H:%M" if language == "de" else "%I:%M %p")


def _period(trip: dict[str, Any], language: str, time_zone: str = "UTC") -> str:
    start = trip.get("start_date") or trip.get("started_at")
    end = trip.get("end_date") or trip.get("ended_at")
    first = _date(start, language, time_zone)
    second = _date(end, language, time_zone)
    if first and second and first != second:
        return f"{first} – {second}"
    return first or second


def _km(distance_m: float | int | None, language: str) -> str:
    value = float(distance_m or 0) / 1000
    return f"{value:,.1f} km".replace(",", "X").replace(".", ",").replace("X", ".") if language == "de" else f"{value:,.1f} km"


def _duration(seconds: int | float | None, language: str) -> str:
    minutes = max(0, round(float(seconds or 0) / 60))
    hours, rest = divmod(minutes, 60)
    if language == "de":
        return f"{hours} h {rest} min" if hours else f"{rest} min"
    return f"{hours} h {rest} min" if hours else f"{rest} min"


def _money(minor: int | None, currency: str | None, language: str) -> str:
    value = (minor or 0) / 100
    symbol = currency or "EUR"
    if language == "de":
        return f"{value:,.2f} {symbol}".replace(",", "X").replace(".", ",").replace("X", ".")
    return f"{symbol} {value:,.2f}"


def _text(value: Any) -> str:
    return "" if value is None else str(value).strip()


def _markup(value: Any) -> str:
    return escape(_text(value))


def _category_label(category: Any, language: str) -> str:
    labels = {
        "de": {"camping": "Camping", "fuel": "Kraftstoff", "toll": "Maut", "parking": "Parkgebühren", "food": "Verpflegung", "activities": "Aktivitäten", "ferry": "Fähre", "other": "Sonstiges"},
        "en": {"camping": "Camping", "fuel": "Fuel", "toll": "Toll", "parking": "Parking", "food": "Food", "activities": "Activities", "ferry": "Ferry", "other": "Other"},
    }
    value = _text(category)
    return labels[language].get(value, value)


def _drive_source(source: Any, language: str) -> str:
    labels = {"de": {"gps": "GPS-erkannt", "gpx": "GPX-importiert", "manual": "Manuell"}, "en": {"gps": "GPS detected", "gpx": "GPX imported", "manual": "Manual"}}
    return labels[language].get(_text(source), _text(source) or "–")


def _safe_filename(title: str, period: str) -> str:
    suffix = ""
    years = re.findall(r"\d{4}", period)
    if years:
        suffix = f"_{years[0]}"
    clean = re.sub(r"[^A-Za-z0-9ÄÖÜäöüß_-]+", "_", title, flags=re.UNICODE).strip("_") or "Reise"
    return f"Camper-Travel-Journal_{clean}{suffix}.pdf"


class _ReportDocTemplate(BaseDocTemplate):
    def __init__(self, stream, *, created: str, language: str):
        super().__init__(stream, pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm, topMargin=18 * mm, bottomMargin=17 * mm)
        self.created = created
        self.language = language
        frame = Frame(self.leftMargin, self.bottomMargin, self.width, self.height, id="normal")
        self.addPageTemplates([PageTemplate(id="report", frames=[frame], onPage=self._footer)])

    def _footer(self, canvas, document):
        canvas.saveState()
        canvas.setStrokeColor(colors.HexColor("#d8dee8"))
        canvas.line(self.leftMargin, 12 * mm, A4[0] - self.rightMargin, 12 * mm)
        canvas.setFont("Helvetica", 8)
        canvas.setFillColor(colors.HexColor("#667085"))
        label = "Erstellt" if self.language == "de" else "Created"
        canvas.drawString(self.leftMargin, 8 * mm, f"{label}: {self.created}")
        page = "Seite" if self.language == "de" else "Page"
        canvas.drawRightString(A4[0] - self.rightMargin, 8 * mm, f"{page} {document.page}")
        canvas.restoreState()


def _table(rows: list[list[Flowable | str]], widths: list[float], *, header: bool = True) -> Table:
    table = Table(rows, colWidths=widths, repeatRows=1 if header else 0, hAlign="LEFT")
    style = [
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#d8dee8")),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]
    if header:
        style += [("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#e9eef5")), ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold")]
    for row in range(1 if header else 0, len(rows)):
        if row % 2:
            style.append(("BACKGROUND", (0, row), (-1, row), colors.HexColor("#f8fafc")))
    table.setStyle(TableStyle(style))
    return table


def render_trip_report(report: dict[str, Any], *, language: str = "de", time_zone: str = "UTC") -> tuple[bytes, str]:
    """Render one validated trip snapshot without writing it to disk."""
    language = "en" if language.lower().startswith("en") else "de"
    labels = {
        "de": {"report": "Reisebericht", "vehicle": "Fahrzeug", "period": "Reisezeitraum", "distance": "Gesamtkilometer", "drives": "Fahrten", "costs": "Gesamtkosten", "drive_list": "Fahrten", "interruptions": "Fahrtunterbrechungen", "date": "Datum", "time": "Uhrzeit", "end_date": "Enddatum", "end_time": "Endzeit", "source": "Herkunft", "distance_short": "Entfernung", "duration": "Dauer", "route": "Strecke", "cost_summary": "Kosten nach Kategorien", "category": "Kategorie", "amount": "Betrag", "expenses": "Ausgaben", "description": "Beschreibung", "stops": "Orte und Zwischenstopps", "notes": "Reisenotizen", "name": "Name", "note": "Notiz", "type": "Typ", "rating": "Bewertung", "none": "Keine Einträge gespeichert."},
        "en": {"report": "Travel report", "vehicle": "Vehicle", "period": "Travel period", "distance": "Total distance", "drives": "Drives", "costs": "Total costs", "drive_list": "Drives", "interruptions": "Drive interruptions", "date": "Date", "time": "Time", "end_date": "End date", "end_time": "End time", "source": "Source", "distance_short": "Distance", "duration": "Duration", "route": "Route", "cost_summary": "Costs by category", "category": "Category", "amount": "Amount", "expenses": "Expenses", "description": "Description", "stops": "Places and stops", "notes": "Trip notes", "name": "Name", "note": "Note", "type": "Type", "rating": "Rating", "none": "No entries saved."},
    }[language]
    styles = getSampleStyleSheet()
    body = ParagraphStyle("ReportBody", parent=styles["BodyText"], fontName="Helvetica", fontSize=9, leading=12, spaceAfter=3)
    heading = ParagraphStyle("ReportHeading", parent=styles["Heading2"], fontName="Helvetica-Bold", fontSize=13, leading=16, textColor=colors.HexColor("#17324d"), spaceBefore=12, spaceAfter=7)
    title = ParagraphStyle("ReportTitle", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=23, leading=27, textColor=colors.HexColor("#17324d"), alignment=TA_CENTER, spaceAfter=8)
    small = ParagraphStyle("ReportSmall", parent=body, fontSize=8, leading=10)
    right = ParagraphStyle("ReportRight", parent=body, alignment=TA_RIGHT)
    trip = report["trip"]
    period = _period(trip, language, time_zone)
    now = datetime.now(_local_zone(time_zone)).strftime("%d.%m.%Y %H:%M" if language == "de" else "%m/%d/%Y %I:%M %p")
    stream = BytesIO()
    doc = _ReportDocTemplate(stream, created=now, language=language)
    story: list[Flowable] = [Paragraph(labels["report"], title), Paragraph(f"<b>{_markup(trip.get('title'))}</b>", body)]
    story.append(Paragraph(f"{labels['vehicle']}: {_markup(report.get('vehicle_name'))} · {labels['period']}: {escape(period) or '–'}", body))
    if _text(trip.get("destination")):
        story.append(Paragraph(f"{_markup(trip.get('destination'))}", body))
    if _text(trip.get("description")):
        story.append(KeepTogether([Paragraph(labels["notes"], heading), Paragraph(_markup(trip.get("description")), body)]))
    summary = report.get("expense_summary") or {}
    total_minor = summary.get("total_minor")
    currency = summary.get("currency") or "EUR"
    total_distance = sum(float(item.get("distance_m") or 0) for item in report.get("drives", []))
    metrics = [[labels["distance"], labels["drives"], labels["costs"]], [_km(total_distance, language), str(len(report.get("drives", []))), _money(total_minor, currency, language) if not summary.get("mixed_currency") else ("Mehrere Währungen" if language == "de" else "Multiple currencies")]]
    story += [_table(metrics, [doc.width / 3] * 3), Spacer(1, 5)]
    drives = report.get("drives", [])
    if drives:
        story.append(Paragraph(labels["drive_list"], heading))
        rows = [[labels["date"], labels["time"], labels["end_date"], labels["end_time"], labels["distance_short"], labels["duration"], labels["source"], labels["route"]]]
        for drive in sorted(drives, key=lambda item: (item.get("started_at", ""), item.get("id", ""))):
            route = " → ".join(part for part in (_text(drive.get("start_label")), _text(drive.get("end_label"))) if part) or "–"
            rows.append([_date(drive.get("started_at"), language, time_zone), _time(drive.get("started_at"), language, time_zone), _date(drive.get("ended_at"), language, time_zone) or "–", _time(drive.get("ended_at"), language, time_zone) or "–", _km(drive.get("distance_m"), language), _duration(drive.get("duration_seconds"), language), _drive_source(drive.get("source"), language), Paragraph(_markup(route), small)])
        story.append(_table(rows, [18 * mm, 15 * mm, 18 * mm, 15 * mm, 20 * mm, 18 * mm, 20 * mm, doc.width - 124 * mm]))
    interruptions = report.get("interruptions") or []
    if interruptions:
        story.append(Paragraph(labels["interruptions"], heading))
        rows = [[labels["date"], labels["time"], labels["end_date"], labels["end_time"], labels["duration"], labels["type"]]]
        status_labels = {"unassigned": "Nicht zugeordnet", "stop": "Zwischenstopp", "overnight": "Übernachtungsplatz", "pause": "Fahrtpause", "ignored": "Ignoriert"}
        for interruption in sorted(interruptions, key=lambda item: (item.get("started_at", ""), item.get("id", ""))):
            status = _text(interruption.get("status"))
            rows.append([_date(interruption.get("started_at"), language, time_zone), _time(interruption.get("started_at"), language, time_zone), _date(interruption.get("ended_at"), language, time_zone), _time(interruption.get("ended_at"), language, time_zone), _duration(interruption.get("duration_seconds"), language), status_labels.get(status, status or "–")])
        story.append(_table(rows, [22 * mm, 18 * mm, 22 * mm, 18 * mm, 25 * mm, doc.width - 105 * mm]))
    by_category = summary.get("by_category") or {}
    if by_category:
        story.append(Paragraph(labels["cost_summary"], heading))
        rows = [[labels["category"], labels["amount"]]]
        for category, amount in sorted(by_category.items()):
            rows.append([Paragraph(_markup(_category_label(category, language)), body), Paragraph(_money(amount, currency, language), right)])
        story.append(_table(rows, [doc.width * 0.65, doc.width * 0.35]))
    expenses = report.get("expenses", [])
    if expenses:
        story.append(Paragraph(labels["expenses"], heading))
        rows = [[labels["date"], labels["category"], labels["amount"], labels["description"]]]
        for expense in sorted(expenses, key=lambda item: (item.get("occurred_at", ""), item.get("id", ""))):
            note = _text(expense.get("note"))
            if _text(expense.get("place_name")):
                note = f"{note} · {expense['place_name']}" if note else str(expense["place_name"])
            rows.append([_date(expense.get("occurred_at"), language, time_zone), _markup(_category_label(expense.get("category"), language)), _money(expense.get("amount_minor"), expense.get("currency"), language), Paragraph(_markup(note) or "–", small)])
        story.append(_table(rows, [25 * mm, 32 * mm, 29 * mm, doc.width - 86 * mm]))
    stops = report.get("stops", [])
    if stops:
        story.append(Paragraph(labels["stops"], heading))
        rows = [[labels["date"], labels["name"], labels["type"], labels["duration"], labels["rating"], labels["note"]]]
        for stop in sorted(stops, key=lambda item: (item.get("occurred_at", ""), item.get("id", ""))):
            rating = f"{stop['rating_overall']}/5" if stop.get("rating_overall") else "–"
            rows.append([_date(stop.get("occurred_at"), language, time_zone), Paragraph(_markup(stop.get("name")) or "–", body), _markup(stop.get("place_type") or stop.get("stop_type")), _duration(stop.get("duration_seconds"), language), rating, Paragraph(_markup(stop.get("description")) or "–", small)])
        story.append(_table(rows, [22 * mm, 31 * mm, 25 * mm, 22 * mm, 18 * mm, doc.width - 118 * mm]))
    doc.build(story)
    return stream.getvalue(), _safe_filename(_text(trip.get("title")), period)
