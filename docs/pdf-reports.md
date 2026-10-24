# PDF-Reiseberichte

Berichtzeitstempel werden in der konfigurierten Home-Assistant-Zeitzone
angezeigt. Gespeicherte UTC-Zeitstempel bleiben unverändert; nur die Anzeige
wird lokalisiert, einschließlich Sommer- und Winterzeit. Kostenkategorien
werden in die Sprache des Berichts übersetzt. Optionale Kostenbemerkungen werden
als sicherer, umbruchfähiger Text in Deutsch und Englisch ausgegeben; die
Eingabe ist auf 2.000 Zeichen begrenzt.

Seit Beta.9 werden Start-/Ende-Zeitpunkte je Datensatz als kompakte,
umbruchfähige Datum-/Zeit-Zellen ausgegeben. Ortskategorien werden zentral für
den PDF-Export lokalisiert; beispielsweise wird `rv_site` als
„Wohnmobilstellplatz“ (Deutsch) beziehungsweise „RV site“ (Englisch)
dargestellt. Dauerwerte werden mit einer Half-up-Regel auf die nächste Minute
gerundet, ohne die gespeicherten Sekunden zu verändern. Synthetische
Beispielberichte liegen unter `docs/examples/pdf-beta9/`.

## Technische Entscheidung

Beta 6 verwendet ReportLab 5.0.1 serverseitig über den authentifizierten Home-Assistant-WebSocket.

| Option | Bewertung |
| --- | --- |
| ReportLab | BSD-lizenziert, Python-only-Wheel, direkte A4-/Tabellen-/Seitenumbruchkontrolle und geringer Laufzeitumfang. |
| WeasyPrint | Gute HTML/CSS-Ausgabe, aber zusätzliche Pango-/Systemabhängigkeiten und eine größere Ressourcen-/Sicherheitsfläche beim Rendern externer Inhalte. |
| Browserseitig | Keine neue Python-Abhängigkeit, aber abhängig von Browser-Print/PDF-Unterstützung und für große Berichte weniger einheitlich. |

Quellen: [ReportLab Lizenz und Installation](https://docs.reportlab.com/developerfaqs/), [ReportLab PDF Toolkit](https://docs.reportlab.com/reportlab/userguide/ch1_intro/), [WeasyPrint Systemabhängigkeiten](https://doc.courtbouillon.org/weasyprint/stable/first_steps.html).

## Datenschutz

- Der Export ist ein authentifizierter WebSocket-Befehl und prüft Fahrzeug- und Reisezuordnung.
- Das PDF wird ausschließlich im Arbeitsspeicher erzeugt und als Base64-Antwort an den authentifizierten Browser geliefert.
- Es wird keine öffentliche Download-URL angelegt und keine PDF-Datei dauerhaft gespeichert.
- Kartenbilder und GPS-Koordinaten sind absichtlich nicht Bestandteil des Berichts.
- Fehlerantworten und Diagnosen enthalten keine Reiseinhalte.
