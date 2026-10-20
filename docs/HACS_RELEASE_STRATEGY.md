# HACS- und Release-Strategie

Dieses Dokument beschreibt die unterstützte Beta-/Stable-Veröffentlichung und
die Grenzen der HACS-Versionsanzeige. Es gilt für das Repository
`balronu/ha-camper-travel-journal`.

## Aktueller Stable-Stand

`v0.3.2` ist der veröffentlichte Stable-Release auf Main-Commit
`11a98f966110d2e70aeb5181b66bc4d97c373623`. Der unveränderliche Tag bleibt
bestehen; v0.3.0 und v0.3.1 bleiben als historische Stable-Releases erhalten.
Das Repository ist für HACS als benutzerdefiniertes Repository vorgesehen und
behauptet keine Aufnahme in den offiziellen HACS-Standardkatalog. Für Updates
von v0.3.0 oder v0.3.1 gelten die Hinweise in
[upgrade-v0.3.0.md](upgrade-v0.3.0.md).

## Befund für Beta 9

Am 15.10.2026 wurden HACS `2.0.5`, Home Assistant Core `2026.10.1` und der
Release-Stand `v0.1.0-beta.9` geprüft.

HACS verwendet für ein Repository zwei getrennte Datenquellen:

1. GitHub-Release-Objekte liefern die Releases und Pre-Releases.
2. Der Repository-Stand liefert Default-Branch und Commit.

In HACS 2.0.5 sind die entscheidenden internen Felder `show_beta`,
`published_tags`, `selected_tag`, `installed_version`, `installed_commit`,
`last_version` und `last_commit`. Die HACS-WebSocket-Info liefert diese Werte
teilweise, sie sind aber **keine Attribute der Home-Assistant-Update-Entität**.
Die Entität exponiert stattdessen insbesondere `installed_version`,
`latest_version` und `release_url`.

Bei Beta 9 war `installed_version = v0.1.0-beta.9`, während die Entität
`latest_version = 093b493` meldete. Das ist die HACS-Logik für deaktivierte
Pre-Releases: Wenn `show_beta` aus ist und kein Stable-Release existiert,
fällt die Anzeige auf `last_commit` des Default-Branches zurück. Der Vergleich
der unterschiedlichen Darstellungen (`v0.1.0-beta.9` gegen `093b493`) erzeugt
den scheinbaren Update-Hinweis, obwohl beide auf denselben Commit zeigen.

Das ist kein Fehler in `hacs.json`, kein neuer Code-Stand und kein Anlass für
einen künstlichen Commit.

## Unterstützter Nutzer-Fix für den scheinbaren Update-Hinweis

1. In HACS beim Repository **Pre-Release** aktivieren.
2. Die Repository-Informationen aktualisieren.
3. Als konkrete Version `v0.1.0-beta.9` auswählen, nicht `main`.
4. Den HACS-/Home-Assistant-Status neu laden; falls erforderlich Home
   Assistant neu starten.

Danach werden `latest_version` und `installed_version` beide als Beta-Tag
bewertet. HACS-interne Speicherdateien dürfen dafür nicht editiert werden.
Wenn die Pre-Release-Auswahl deaktiviert wird, ist der Commit-Hinweis bei einer
reinen Pre-Release-Historie eine bekannte Einschränkung der HACS-Version.

## Alte Pre-Releases

HACS 2.0.5 lädt die GitHub-Releases und nimmt bis zu 30 Einträge auf. Bei
aktivierter Pre-Release-Auswahl erscheinen deshalb alle vorhandenen Beta-
Release-Objekte, hier `v0.1.0-beta.1` bis `v0.1.0-beta.9`. `hacs.json` bietet
keinen Repository-seitigen Filter "nur aktuelles Pre-Release".

Eine mögliche spätere Bereinigung wäre:

- GitHub-Release-Objekte `v0.1.0-beta.1` bis `v0.1.0-beta.8` löschen,
- die zugehörigen Git-Tags unverändert behalten,
- Git-Historie und direkte Rollback-Referenzen damit erhalten.

Das ist eine externe, irreversible GitHub-Änderung und wird in der Beta-Phase
nicht automatisch ausgeführt. Die ausdrückliche Freigabe muss die acht
konkreten Release-Objekte nennen. Ohne Release-Objekt stehen die Tags weiterhin
im Git-Repository, werden aber nicht mehr als normale HACS-Release-Auswahl aus
der GitHub-Releases-Liste angeboten. Ein Tag darf weder gelöscht noch
verschoben werden.

## Release-Ablauf

### Beta

- Version in Manifest, Python, Frontend-Dokumentation und Tests synchron halten.
- Einen neuen, unveränderlichen SemVer-Prerelease-Tag verwenden.
- Vor dem Tag den vollständigen CI-Lauf abwarten.
- Den aktuellen Beta-Tag in der README dokumentieren.
- Keine Stable-Version und keine künstlichen Commit-Sprünge veröffentlichen.

### Stable

Für die Stable-Veröffentlichung müssen `v0.3.2`, Release-Notes,
HACS-Versionsanzeige, Bundle-Version und Tag konsistent sein. Nach der
Veröffentlichung bleibt der Stable-Tag unverändert; die Beta-Tags bleiben als
historische Rollback-Referenzen bestehen. Vor der Veröffentlichung ist der
Status ausdrücklich als vorbereitet, nicht als veröffentlicht zu kennzeichnen.

### Rollback

Rollback erfolgt durch Auswahl eines vorhandenen unveränderten Tags in HACS.
Tags werden nicht überschrieben. Das Löschen eines GitHub-Release-Objekts ist
nicht dasselbe wie das Löschen des Tags und darf nur nach Freigabe erfolgen.

## Branding-Pfade

Das Repository enthält aktuell nur:

| Datei | Ergebnis |
| --- | --- |
| `custom_components/camper_travel_journal/brand/icon.png` | vorhanden, PNG, 256 × 256, SHA-256 `866edfd4208662a4be43ba2728b0258912f2bf326e7507115d695a1112d439e0` |
| `brand/icon@2x.png` | nicht vorhanden |
| `brand/logo.png` | nicht vorhanden |
| `brand/logo@2x.png` | nicht vorhanden |

Für Home Assistant 2026.3+ ist das lokale `brand/`-Verzeichnis der unterstützte
Weg. Die Bildanforderung wird ohne Manifest-Feld erfüllt. Home Assistant
liefert das Bild intern über den authentifizierten Endpunkt
`/api/brands/integration/camper_travel_journal/icon.png`.

Die HACS-Update-Entität verwendet dagegen in HACS 2.0.5 fest
`https://brands.home-assistant.io/_/camper_travel_journal/icon.png`. Der `/_/`
Pfad liefert bei fehlender öffentlicher Brands-Datei absichtlich einen
Platzhalter mit HTTP 200; der direkte Pfad ohne `/_/` liefert hier HTTP 404.
Das erklärt `icon not available`, obwohl das lokale Home-Assistant-Branding
korrekt vorhanden ist. Eine zusätzliche `icon`-Manifestangabe oder eine
Änderung am WebSocket-/Netzwerkcode behebt diesen HACS-CDN-Pfad nicht.

Das offizielle `home-assistant/brands`-Repository akzeptiert nach der aktuellen
Brands-Proxy-Ankündigung keine neuen Custom-Integration-PRs mehr. Eine solche
Einreichung wird daher nicht vorbereitet oder abgesendet. Die lokale Datei ist
die unterstützte Lösung; ein HACS-Platzhalter ist davon unabhängig.

## Freigaben und unveränderliche Historie

- Löschen, Verschieben oder Überschreiben irgendeines Git-Tags.
- Einreichen eines PR im offiziellen Brands-Repository.
- Veröffentlichung einer neuen Beta oder eines neuen Stable-Releases.
- Änderungen an HACS-internen Speicherdateien, Home Assistant, VM 104,
  Datenbank, Reisen, Dashboard, Proxy oder Netzwerk.

## Quellen

- [HACS 2.0.5 Repository- und Update-Logik](https://github.com/hacs/integration/tree/2.0.5/custom_components/hacs)
- [Home Assistant: lokale Brand-Bilder und Brands Proxy API](https://developers.home-assistant.io/blog/2026/02/24/brands-proxy-api/)
- [Home Assistant Brands README und Bildanforderungen](https://github.com/home-assistant/brands#readme)
- [Aktuelle Releases](https://github.com/balronu/ha-camper-travel-journal/releases)
