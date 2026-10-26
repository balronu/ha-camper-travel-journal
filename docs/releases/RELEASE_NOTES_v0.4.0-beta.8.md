# Camper Travel Journal v0.4.0-beta.8

## Deutsch

### UI-Feinschliff

- Verbrauchsdiagnosen werden zentral übersetzt. `gps_distance_is_estimated` erscheint als „Hinweis: Fahrstrecke anhand von GPS-Daten geschätzt“; interne Codes werden nicht angezeigt.
- GPS-Abdeckung, fehlende geeignete Fahrten, unplausible Kilometerstände und unbekannte Diagnosecodes haben verständliche deutsche und englische Fallback-Texte.
- Ein gültiges geschätztes Ergebnis verwendet „Hinweis“ statt „Grund“.
- Tankbuch-Aktionen sind auf schmalen Displays responsiv angeordnet: Bearbeiten bleibt die primäre Aktion, Verknüpfung lösen sekundär, Löschen destruktiv aber zurückhaltend.
- Touchflächen bleiben mindestens 44 px hoch; lange Bemerkungen und Aktionsbeschriftungen dürfen umbrechen, ohne horizontalen Überlauf.

### Kompatibilität und Grenzen

- Der Beta-7-Verbrauchsfall bleibt unverändert: 42,420 l, 380,0 GPS-km, 11,16 l/100 km, Qualität geschätzt, Webasto-Verbrauch unbekannt.
- Keine SQLite-Migration, keine Änderung bestehender Formeln oder produktiver Daten.
- v0.3.13 bleibt Stable. Dies ist ein GitHub-Pre-Release.
- Der Stable-Readiness-Audit nach dieser Beta ist ausschließlich prüfend; es wird kein Stable-Release automatisch veröffentlicht.
- Echte WebKit-/Safari-Ausführung wird nur als bestanden berichtet, wenn sie tatsächlich ausgeführt wurde.

## English

### UI polish

- Consumption diagnostics are translated centrally. `gps_distance_is_estimated` appears as “Note: Distance estimated from GPS data”; internal codes are never shown.
- GPS coverage, missing suitable drives, implausible odometers and unknown diagnostic codes have clear German and English fallback text.
- A valid estimated result uses “Note” instead of “Reason”.
- Tankbook actions use a responsive narrow-screen layout: Edit remains primary, unlink secondary, and Delete destructive but visually restrained.
- Touch targets remain at least 44 px high; long notes and action labels may wrap without horizontal overflow.

### Compatibility and limits

- The Beta-7 consumption case remains unchanged: 42.420 l, 380.0 GPS km, 11.16 l/100 km, estimated quality, heating consumption unknown.
- No SQLite migration, formula change or productive-data change is included.
- v0.3.13 remains Stable. This is a GitHub pre-release.
- The Stable Readiness audit after this beta is read-only; no Stable release is automatically published.
- Real WebKit/Safari execution is reported as passed only when actually executed.
