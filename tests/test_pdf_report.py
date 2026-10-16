import unittest

try:
    from custom_components.camper_travel_journal.pdf_report import _category_label, _date, _time, render_trip_report
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
