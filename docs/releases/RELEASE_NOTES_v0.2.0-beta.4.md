# Camper Travel Journal v0.2.0-beta.4

## Options-Lebenszyklus

Beta 4 behebt die laufende Aktualisierung der CARTO-Konfiguration:

- leere Passwortfelder überschreiben vorhandene Schlüssel nicht;
- Schlüssel können weiterhin ersetzt oder explizit entfernt werden;
- bestehende Integrationsoptionen bleiben erhalten;
- ein Config-Entry-Options-Update lädt genau die betroffene Integration neu;
- der Listener wird beim Unload entfernt und nicht dupliziert.

Die Änderung enthält keine produktiven Home-Assistant-, Datenbank-, Dashboard- oder VM-Anpassungen. API-Schlüssel werden weder geloggt noch in Diagnosen oder Testartefakten ausgegeben.
