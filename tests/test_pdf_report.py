import unittest

try:
    from reportlab.platypus import Paragraph, Table
    from custom_components.camper_travel_journal.pdf_report import _category_label, _date, _date_time, _duration, _place_label, _time, render_trip_report
except ModuleNotFoundError as error:  # pragma: no cover - CI installs manifest dependency
    if error.name != "reportlab":
        raise
    raise unittest.SkipTest("reportlab is installed by the integration test environment") from error


def _report(drives=2, expenses=2, stops=1):
    return {
        "vehicle_name": "Test-Wohnmobil",
        "trip": {
            "id": "trip-1",
            "title": "Bremen & Küste – Test",
            "start_date": "2026-10-13",
            "end_date": "2026-10-14",
        },
        "drives": [
            {
                "id": f"drive-{index}",
                "started_at": f"2026-10-13T0{8 + index}:00:00+00:00",
                "ended_at": f"2026-10-13T0{9 + index}:30:00+00:00",
                "distance_m": 12_345 + index * 1000,
                "duration_seconds": 5400,
                "start_label": "Bremen",
                "end_label": "Küste",
            }
            for index in range(drives)
        ],
        "expenses": [
            {"id": f"expense-{index}", "occurred_at": "2026-10-13T12:00:00+00:00", "category": "fuel", "amount_minor": 1234, "currency": "EUR", "note": "Maut & Verpflegung – Café"}
            for index in range(expenses)
        ],
        "expense_summary": {"total_minor": 2468, "currency": "EUR", "by_category": {"fuel": 2468}, "mixed_currency": False},
        "stops": [{"id": "stop-1", "occurred_at": "2026-10-13T15:00:00+00:00", "name": "Zwischenstopp", "description": "Notiz mit Umlaut: Fähre"} for _ in range(stops)],
    }


def test_report_contains_pdf_structure_and_localized_content():
    pdf, filename = render_trip_report(_report(), language="de")
    assert pdf.startswith(b"%PDF-")
    assert b"/Type /Page" in pdf
    assert filename == "Camper-Travel-Journal_Bremen_Küste_Test_2026.pdf".encode("latin-1").decode("latin-1")
    assert b"49.0" not in pdf


def test_empty_report_is_valid_and_multi_page_report_grows():
    empty, _ = render_trip_report(_report(drives=0, expenses=0, stops=0), language="en")
    large = _report(drives=70, expenses=90, stops=20)
    many, _ = render_trip_report(large, language="en")
    assert empty.startswith(b"%PDF-")
    assert many.startswith(b"%PDF-")
    assert many.count(b"/Type /Page") > empty.count(b"/Type /Page")


def test_report_uses_home_assistant_timezone_and_localized_categories():
    assert _date("2026-07-01T22:30:00+00:00", "de", "Europe/Berlin") == "02.07.2026"
    assert _time("2026-07-01T22:30:00+00:00", "de", "Europe/Berlin") == "00:30"
    assert _time("2026-01-01T23:30:00+00:00", "de", "Europe/Berlin") == "00:30"
    assert _category_label("fuel", "de") == "Kraftstoff"
    assert _category_label("other", "en") == "Other"
    assert _place_label("rv_site", "de") == "Wohnmobilstellplatz"
    assert _place_label("rv_site", "en") == "RV site"
    assert [_duration(value, "de") for value in (629, 630, 659, 660)] == ["10 min", "11 min", "11 min", "11 min"]
    assert _date_time("2026-10-13T12:30:00+00:00", "en") == "10/13/26 12:30 PM"


def test_report_accepts_overnight_places_ratings_and_linked_expenses():
    report = _report(drives=1, expenses=3, stops=8)
    for index, stop in enumerate(report["stops"]):
        stop.update({"place_type": "campsite" if index % 2 else "restaurant", "arrived_at": "2026-10-13T15:00:00+00:00", "departed_at": "2026-10-14T08:00:00+00:00", "duration_seconds": 61200, "rating_overall": 4 if index % 3 else None, "large_rv_access": 5, "space_maneuvering": 4, "facilities": None, "surroundings": 3})
    for expense in report["expenses"]:
        expense["place_name"] = "Campingplatz"; expense["place_id"] = "stop-1"
    german, _ = render_trip_report(report, language="de", time_zone="Europe/Berlin")
    english, _ = render_trip_report(report, language="en", time_zone="Europe/Berlin")
    assert german.startswith(b"%PDF-") and english.startswith(b"%PDF-")
    assert german.count(b"/Type /Page") >= 1 and english.count(b"/Type /Page") >= 1


def test_report_keeps_explicit_interruption_status_and_snapshot_unchanged():
    report = _report(drives=3, expenses=4, stops=1)
    report["interruptions"] = [
        {"id": "gap-1", "started_at": "2026-10-14T13:00:00+00:00", "ended_at": "2026-10-14T13:10:30+00:00", "duration_seconds": 630, "status": "pause"},
        {"id": "gap-2", "started_at": "2026-10-14T14:00:00+00:00", "ended_at": "2026-10-14T15:00:00+00:00", "duration_seconds": 3600, "status": "unassigned"},
    ]
    import copy
    before = copy.deepcopy(report)
    pdf, _ = render_trip_report(report, language="de")
    assert pdf.startswith(b"%PDF-")
    assert report == before


def test_expense_heading_keeps_table_start_together_and_long_tables_split(monkeypatch):
    import custom_components.camper_travel_journal.pdf_report as pdf_report

    captured = {}

    def capture_story(_document, story):
        captured["story"] = story

    monkeypatch.setattr(pdf_report._ReportDocTemplate, "build", capture_story)
    pdf_report.render_trip_report(_report(expenses=2), language="de")
    headings = [item for item in captured["story"] if isinstance(item, Paragraph) and item.getPlainText() == "Ausgaben"]
    assert len(headings) == 1
    assert headings[0].style.keepWithNext == 1
    expense_index = captured["story"].index(headings[0])
    assert isinstance(captured["story"][expense_index + 1], Table)
    assert captured["story"][expense_index + 1].repeatRows == 1

    monkeypatch.undo()
    short_de, _ = pdf_report.render_trip_report(_report(expenses=2), language="de")
    long_de, _ = pdf_report.render_trip_report(_report(expenses=90), language="de")
    short_en, _ = pdf_report.render_trip_report(_report(expenses=2), language="en")
    long_en, _ = pdf_report.render_trip_report(_report(expenses=90), language="en")
    assert long_de.count(b"/Type /Page") > short_de.count(b"/Type /Page")
    assert long_en.count(b"/Type /Page") > short_en.count(b"/Type /Page")
