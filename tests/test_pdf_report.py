import unittest

try:
    from reportlab.platypus import KeepTogether, Paragraph, Table
    from custom_components.camper_travel_journal.pdf_report import _RouteMap, _category_label, _date, _date_time, _duration, _expense_time, _place_label, _time, render_trip_report
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


def test_report_includes_offline_route_map_from_real_track_points(monkeypatch):
    import custom_components.camper_travel_journal.pdf_report as pdf_report
    captured = {}
    monkeypatch.setattr(pdf_report._ReportDocTemplate, "build", lambda _document, story: captured.setdefault("story", story))
    report = _report(drives=1, expenses=0, stops=0)
    report["route_segments"] = [{"drive_id": "drive-0", "points": [
        {"latitude": 49.29419, "longitude": 7.05182},
        {"latitude": 53.06452, "longitude": 8.82002},
    ]}]
    render_trip_report(report, language="de")
    assert any(isinstance(item, KeepTogether) and any(isinstance(child, _RouteMap) for child in item._content) for item in captured["story"])


def test_report_passes_drive_endpoint_labels_to_offline_route_map(monkeypatch):
    import custom_components.camper_travel_journal.pdf_report as pdf_report

    captured = {}
    monkeypatch.setattr(pdf_report._ReportDocTemplate, "build", lambda _document, story: captured.setdefault("story", story))
    report = _report(drives=1, expenses=0, stops=0)
    report["route_segments"] = [{"drive_id": "drive-0", "points": [{"latitude": 53.0, "longitude": 8.0}, {"latitude": 53.1, "longitude": 8.1}]}]
    pdf_report.render_trip_report(report, language="de")
    route_map = next(child for item in captured["story"] if isinstance(item, KeepTogether) for child in item._content if isinstance(child, _RouteMap))
    assert route_map.endpoint_labels == {"drive-0": ("Bremen", "Küste")}


def test_report_passes_only_overnight_stops_to_route_map(monkeypatch):
    import custom_components.camper_travel_journal.pdf_report as pdf_report

    captured = {}
    monkeypatch.setattr(pdf_report._ReportDocTemplate, "build", lambda _document, story: captured.setdefault("story", story))
    report = _report(drives=1, expenses=0, stops=0)
    report["route_segments"] = [{"drive_id": "drive-0", "points": [{"latitude": 53.0, "longitude": 8.0}, {"latitude": 53.1, "longitude": 8.1}]}]
    report["stops"] = [
        {"name": "Reisemobilstellplatz am Kuhhirten", "place_type": "rv_site", "latitude": 53.05, "longitude": 8.81},
        {"name": "Restaurant", "place_type": "restaurant", "latitude": 53.04, "longitude": 8.80},
        {"name": "Ungültig", "place_type": "campsite", "latitude": 91, "longitude": 8},
    ]
    pdf_report.render_trip_report(report, language="de")
    route_map = next(child for item in captured["story"] if isinstance(item, KeepTogether) for child in item._content if isinstance(child, _RouteMap))
    assert [stop["name"] for stop in route_map.stops if stop.get("place_type") == "rv_site"] == ["Reisemobilstellplatz am Kuhhirten"]


def test_route_map_draws_valid_overnight_marker_and_skips_invalid_marker():
    from io import BytesIO
    from reportlab.pdfgen.canvas import Canvas

    route_map = _RouteMap(
        [{"drive_id": "d1", "points": [{"latitude": 53.0, "longitude": 8.0}, {"latitude": 53.1, "longitude": 8.1}]}],
        width=200, height=120, language="de", endpoint_labels={"d1": ("Bremen", "Ziel")},
        stops=[
            {"name": "Reisemobilstellplatz am Kuhhirten", "place_type": "rv_site", "latitude": 53.05, "longitude": 8.05},
            {"name": "Ungültig", "place_type": "rv_site", "latitude": 91, "longitude": 8},
        ],
    )
    canvas = Canvas(BytesIO())
    labels = []
    original_draw_string = canvas.drawString
    canvas.drawString = lambda x, y, value: (labels.append(value), original_draw_string(x, y, value))[1]
    route_map.canv = canvas
    route_map.draw()
    assert "Reisemobilstellplatz am Kuhhirten" == " ".join(labels[2:4])
    assert "Ungültig" not in labels
    assert "S = Start, Z = Ziel, Ü = Übernachtungsplatz" in labels


def test_route_map_multiline_label_geometry_stays_inside_map_and_does_not_overlap():
    from io import BytesIO
    from reportlab.pdfgen.canvas import Canvas
    import textwrap

    route_map = _RouteMap(
        [{"drive_id": "d1", "points": [
            {"latitude": 53.0, "longitude": 8.0},
            {"latitude": 53.1, "longitude": 8.1},
        ]}],
        width=200,
        height=120,
        language="de",
        endpoint_labels={"d1": ("Sehr langer Startort mit einer mehrzeiligen Ortsbezeichnung", "Sehr langer Zielort mit einer mehrzeiligen Ortsbezeichnung")},
        stops=[
            {"name": "Reisemobilstellplatz am Kuhhirten in Bremen mit langem Namen", "place_type": "rv_site", "latitude": 53.05, "longitude": 8.05},
        ],
    )
    canvas = Canvas(BytesIO())
    drawn = []
    original_draw_string = canvas.drawString
    canvas.drawString = lambda x, y, value: (drawn.append((x, y, value)), original_draw_string(x, y, value))[1]
    route_map.canv = canvas
    route_map.draw()

    label_texts = {
        "Sehr langer Startort mit einer mehrzeiligen Ortsbezeichnung",
        "Sehr langer Zielort mit einer mehrzeiligen Ortsbezeichnung",
        "Reisemobilstellplatz am Kuhhirten in Bremen mit langem Namen",
    }
    wrapped = [
        line
        for text in label_texts
        for line in textwrap.wrap(text, width=30, break_long_words=True, break_on_hyphens=False)
    ]
    label_calls = [call for call in drawn if call[2] in wrapped]
    assert label_calls
    ascent, descent, line_height = 6.5 * 0.8, 6.5 * 0.2, 7.0
    boxes = []
    for x, y, text in label_calls:
        box = (x, y - descent, x + canvas.stringWidth(text, "Helvetica", 6.5), y + ascent)
        assert 0 <= box[0] <= box[2] <= route_map.width
        assert 0 <= box[1] <= box[3] <= route_map.height
        boxes.append(box)
    for index, left in enumerate(boxes):
        for right in boxes[index + 1:]:
            assert not (left[0] < right[2] and left[2] > right[0] and left[1] < right[3] and left[3] > right[1])


def test_route_map_keeps_coordinate_fallback_labels_unrendered():
    from io import BytesIO
    from reportlab.pdfgen.canvas import Canvas

    route_map = _RouteMap(
        [{"drive_id": "d1", "points": [
            {"latitude": 49.0, "longitude": 7.0},
            {"latitude": 53.0, "longitude": 8.0},
        ]}],
        width=200,
        height=120,
        language="en",
        endpoint_labels={"d1": ("49.00000, 7.00000", "53.00000, 8.00000")},
    )
    canvas = Canvas(BytesIO())
    labels = []
    original_draw_string = canvas.drawString
    canvas.drawString = lambda x, y, value: (labels.append(value), original_draw_string(x, y, value))[1]
    route_map.canv = canvas
    route_map.draw()
    assert "49.00000, 7.00000" not in labels
    assert "53.00000, 8.00000" not in labels
    assert "S = start, Z = destination, O = overnight place" in labels


def test_route_map_drops_unplaceable_labels_without_origin_stack_and_is_deterministic():
    from io import BytesIO
    from reportlab.pdfgen.canvas import Canvas

    def draw_labels(drive_count, language):
        segments = []
        endpoint_labels = {}
        for index in range(drive_count):
            drive_id = f"drive-{index}"
            segments.append({"drive_id": drive_id, "points": [{"latitude": 53.0, "longitude": 8.0}, {"latitude": 53.0, "longitude": 8.0}]})
            endpoint_labels[drive_id] = (f"Start {index} mit langem Ortsnamen", f"Ziel {index} mit langem Ortsnamen")
        canvas = Canvas(BytesIO())
        calls = []
        original_draw_string = canvas.drawString
        canvas.drawString = lambda x, y, value: (calls.append((x, y, value)), original_draw_string(x, y, value))[1]
        route_map = _RouteMap(segments, width=200, height=120, language=language, endpoint_labels=endpoint_labels)
        route_map.canv = canvas
        route_map.draw()
        return calls

    for language, hint in (("de", "Ortsbeschriftungen nicht dargestellt."), ("en", "additional location labels not shown.")):
        for drive_count in (20, 40):
            first, second = draw_labels(drive_count, language), draw_labels(drive_count, language)
            assert first == second
            assert any(hint in value for _x, _y, value in first)
            assert not any(x == 0 and y == 0 for x, y, value in first if hint not in value)
            assert any(value == "Start 0 mit langem Ortsnamen" for _x, _y, value in first)
            assert all(y >= 18 for _x, y, value in first if hint not in value)


def test_route_map_prioritizes_trip_endpoints_and_overnight_labels_when_crowded():
    from io import BytesIO
    from reportlab.pdfgen.canvas import Canvas

    segments = []
    endpoint_labels = {}
    for index in range(20):
        drive_id = f"drive-{index}"
        segments.append({"drive_id": drive_id, "points": [{"latitude": 53.0, "longitude": 8.0}, {"latitude": 53.0, "longitude": 8.0}]})
        endpoint_labels[drive_id] = (f"Start {index}", f"Ziel {index}")
    canvas = Canvas(BytesIO())
    labels = []
    original_draw_string = canvas.drawString
    canvas.drawString = lambda x, y, value: (labels.append(value), original_draw_string(x, y, value))[1]
    route_map = _RouteMap(
        segments,
        width=200,
        height=120,
        language="de",
        endpoint_labels=endpoint_labels,
        stops=[{"name": "Übernachtungsplatz", "place_type": "rv_site", "latitude": 53.0, "longitude": 8.0}],
    )
    route_map.canv = canvas
    route_map.draw()
    assert "Start 0" in labels
    assert "Ziel 19" in labels
    assert "Übernachtungsplatz" in labels


def test_report_skips_invalid_route_points_without_losing_valid_segments():
    report = _report(drives=1, expenses=0, stops=0)
    report["route_segments"] = [
        {"drive_id": "drive-0", "points": [
            {"latitude": 49.0, "longitude": 7.0},
            {"latitude": "not-a-number", "longitude": 8.0},
            {"latitude": 53.0, "longitude": 8.0},
            {"latitude": 91.0, "longitude": 8.0},
            {"latitude": 53.1, "longitude": 8.1},
        ]},
        {"drive_id": "bad", "points": [{"latitude": None, "longitude": 8.0}, {"latitude": 53.2, "longitude": float("inf")}]},
    ]
    pdf, _ = render_trip_report(report, language="de")
    assert pdf.startswith(b"%PDF-")


def test_route_map_does_not_connect_across_invalid_points():
    from io import BytesIO
    from reportlab.pdfgen.canvas import Canvas

    route_map = _RouteMap([{"points": [
        {"latitude": 50.0, "longitude": 7.0},
        {"latitude": "NaN", "longitude": 8.0},
        {"latitude": 51.0, "longitude": 8.0},
        {"latitude": 52.0, "longitude": 9.0},
    ]}], width=200, height=120, language="en")
    canvas = Canvas(BytesIO())
    drawn_paths = []
    original_draw_path = canvas.drawPath
    canvas.drawPath = lambda path, *args, **kwargs: (drawn_paths.append(path), original_draw_path(path, *args, **kwargs))[1]
    route_map.canv = canvas
    route_map.draw()
    assert len(drawn_paths) == 1


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


def test_expense_wall_clock_time_never_shifts_with_home_assistant_timezone():
    assert _expense_time("12:00", "de") == "12:00"
    assert _expense_time("12:00", "de") == _expense_time("12:00", "de")
    assert _expense_time("23:30", "en") == "11:30 PM"
    assert _expense_time(None, "de") == ""


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
    sections = [
        item for item in captured["story"]
        if isinstance(item, KeepTogether)
        and any(isinstance(child, Paragraph) and child.getPlainText() == "Ausgaben" for child in item._content)
    ]
    assert len(sections) == 1
    expense_table = next(child for child in sections[0]._content if isinstance(child, Table))
    assert expense_table.repeatRows == 1

    monkeypatch.undo()
    short_de, _ = pdf_report.render_trip_report(_report(expenses=2), language="de")
    long_de, _ = pdf_report.render_trip_report(_report(expenses=90), language="de")
    short_en, _ = pdf_report.render_trip_report(_report(expenses=2), language="en")
    long_en, _ = pdf_report.render_trip_report(_report(expenses=90), language="en")
    assert long_de.count(b"/Type /Page") > short_de.count(b"/Type /Page")
    assert long_en.count(b"/Type /Page") > short_en.count(b"/Type /Page")


def test_expense_heading_is_part_of_rendered_layout_for_short_and_long_tables():
    """The rendered heading shares a page with its table, including a tight break."""
    import custom_components.camper_travel_journal.pdf_report as pdf_report

    events = []
    original_paragraph, original_table, original_doc = pdf_report.Paragraph, pdf_report.Table, pdf_report._ReportDocTemplate

    class TrackingParagraph(original_paragraph):
        def drawOn(self, canvas, x, y, _sW=0):
            if self.getPlainText() in {"Ausgaben", "Expenses"}:
                events.append(("heading", self.getPlainText(), canvas.getPageNumber()))
            return super().drawOn(canvas, x, y, _sW)

    class TrackingTable(original_table):
        def drawOn(self, canvas, x, y, _sW=0):
            header = tuple(str(value) for value in self._cellvalues[0]) if self._cellvalues else ()
            if header in {
                ("Zeitraum", "Kategorie", "Betrag", "Beschreibung"),
                ("Period", "Category", "Amount", "Description"),
            }:
                events.append(("table", header[0], canvas.getPageNumber()))
            return super().drawOn(canvas, x, y, _sW)

    class TrackingDoc(original_doc):
        def build(self, story):
            from reportlab.pdfgen.canvas import Canvas
            return super().build(story, canvasmaker=Canvas)

    pdf_report.Paragraph, pdf_report.Table, pdf_report._ReportDocTemplate = TrackingParagraph, TrackingTable, TrackingDoc
    try:
        render_trip_report(_report(drives=2, expenses=2, stops=1), language="de")
    finally:
        pdf_report.Paragraph, pdf_report.Table, pdf_report._ReportDocTemplate = original_paragraph, original_table, original_doc
    heading_pages = [page for kind, _label, page in events if kind == "heading"]
    table_pages = [page for kind, _label, page in events if kind == "table"]
    assert heading_pages and table_pages
    assert heading_pages[0] == table_pages[0]

    short_de, _ = render_trip_report(_report(drives=2, expenses=2, stops=1), language="de")
    long_de, _ = render_trip_report(_report(drives=2, expenses=90, stops=1), language="de")
    short_en, _ = render_trip_report(_report(drives=2, expenses=2, stops=1), language="en")
    long_en, _ = render_trip_report(_report(drives=2, expenses=90, stops=1), language="en")
    assert short_de.count(b"/Type /Page") >= 2
    assert short_en.count(b"/Type /Page") >= 2
    assert long_de.count(b"/Type /Page") > short_de.count(b"/Type /Page")
    assert long_en.count(b"/Type /Page") > short_en.count(b"/Type /Page")


def test_report_uses_actual_expense_date_and_marks_legacy_date_unknown():
    import custom_components.camper_travel_journal.pdf_report as pdf_report

    report = _report(drives=0, expenses=2, stops=0)
    report["expenses"][0].update(occurred_on="2026-01-02", occurred_time="07:15")
    report["expenses"][1].pop("occurred_at", None)
    captured = {}
    original = pdf_report._ReportDocTemplate.build
    pdf_report._ReportDocTemplate.build = lambda _document, story: captured.setdefault("story", story)
    try:
        pdf_report.render_trip_report(report, language="de", time_zone="Europe/Berlin")
    finally:
        pdf_report._ReportDocTemplate.build = original
    texts = []
    def collect(items):
        for item in items:
            if isinstance(item, KeepTogether):
                yield from collect(item._content)
            else:
                yield item

    for item in collect(captured["story"]):
        if hasattr(item, "getPlainText"):
            texts.append(item.getPlainText())
        if isinstance(item, Table):
            texts.extend(cell.getPlainText() for row in item._cellvalues for cell in row if hasattr(cell, "getPlainText"))
    assert "02.01.2026, 07:15" in texts
    assert "Ausgabendatum unbekannt" in texts
