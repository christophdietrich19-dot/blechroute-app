# Entwurf für den späteren Blechroute-Server

Dieser Vertrag beschreibt die benötigten Vorgänge. Er aktiviert keinen Server und enthält keine Zugangsdaten.

## Grundregeln

- Alle Datensätze erhalten dauerhafte, undurchsichtige String-IDs. Anzeigenamen und `@`-Namen sind keine Berechtigungsmerkmale.
- Der Server entscheidet bei jeder Änderung, ob die angemeldete Person Eigentümer oder dazu berechtigt ist. Eine ausgeblendete Taste in der App ersetzt diese Prüfung nicht.
- Listen werden seitenweise geladen. Mutationen liefern den aktuellen gespeicherten Datensatz zurück.
- Fotos werden getrennt vom JSON-Datensatz übertragen; die App sendet verarbeitete Bilder ohne Standortmetadaten.
- Die App zeigt Lade-, Fehler- und Wiederholungszustände. Wiederholte Schreibanfragen benötigen einen Idempotenzschlüssel.
- Sitzungen werden über sichere, kurzlebige Anmeldemechanismen verwaltet. Das Beta-Passwortverfahren wird nicht übernommen.

## Vorgesehene Ressourcen

| Ressource | Benötigte Vorgänge |
| --- | --- |
| `/v1/session` | anmelden, Sitzungsstatus laden, abmelden |
| `/v1/accounts` | registrieren, E-Mail bestätigen, Passwort zurücksetzen, Konto schließen |
| `/v1/me` | eigenes Profil und Einstellungen lesen/ändern, Datenexport anfordern |
| `/v1/profiles/{id}` | sichtbares Profil laden, folgen, entfolgen, blockieren |
| `/v1/vehicles` | eigene Fahrzeuge anlegen, lesen, ändern, löschen |
| `/v1/entries` | Feed seitenweise lesen, eigene Beiträge anlegen, ändern, löschen |
| `/v1/entries/{id}/likes` | Like setzen und entfernen |
| `/v1/entries/{id}/comments` | Kommentare lesen und schreiben, eigene Kommentare ändern/löschen |
| `/v1/entries/{id}/saves` | Beitrag merken und entfernen |
| `/v1/entries/{id}/reposts` | Repost anlegen und zurücknehmen |
| `/v1/media` | Upload vorbereiten, Datei übertragen, Status prüfen, eigene Datei löschen |
| `/v1/conversations` | Gespräche lesen und beginnen, Nachrichten seitenweise laden und senden |
| `/v1/notifications` | Aktivitäten lesen und als gelesen markieren |
| `/v1/reports` | Beitrag, Profil, Kommentar oder Nachricht melden und eigenen Status lesen |

Für ein Backend werden außerdem klare Fehlercodes (`unauthorized`, `forbidden`, `not_found`, `validation_error`, `rate_limited`, `unavailable`) und Zeitstempel in UTC benötigt. Der genaue Vertrag wird vor der Serverimplementierung mit den tatsächlichen Betriebs- und Datenschutzentscheidungen abgeglichen.
