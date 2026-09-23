# Blechroute: Stand und nächste Ausbauschritte

Stand: lokale Beta. Die App besitzt noch keine echten, gemeinsam genutzten Konten. Demo-Profile und Demo-Chats sind Beispieldaten auf dem jeweiligen Gerät.

## Bestandsaufnahme

| Bereich | Heute tatsächlich nutzbar | Für mehrere Personen noch nötig |
| --- | --- | --- |
| Zugang | persönliche Beta-Zugänge je APK bzw. Web-Testzugang | serverseitige Konten, Registrierung, Passwortwechsel, Sitzungen |
| Feed und Momente | lokale Einträge, Fotos, Kommentare, Likes, Merken, Repost | gemeinsamer Feed, Rechteprüfung, Synchronisierung |
| Garage und Profil | lokal anlegen und bearbeiten | Kontozuordnung, Sichtbarkeit, geräteübergreifende Daten |
| Folgen und Blockieren | lokale Einstellungen | gemeinsame Beziehungen und serverseitig durchgesetzte Sperren |
| Nachrichten | lokale Demo-Unterhaltungen | Zustellung, Gesprächsteilnehmer, Echtzeit und Push |
| Meldungen | lokale Vormerkung | Eingang beim Moderationsteam, Entscheidungen und Einsprüche |
| Datenexport und Löschung | lokaler Export und lokale Löschung | serverseitiger Export, Löschung und Aufbewahrungsregeln |

## In dieser Etappe vorbereitet

- Zentrales Gateway für Laden, Speichern und Löschen des lokalen Zustands. Schreibvorgänge werden geordnet abgeschlossen.
- Gemeinsame Normalisierung des App-Datensatzes als Ausgangspunkt für spätere Migrationen.
- API-Transport mit HTTPS-Pflicht und strukturierten Fehlern; er wird erst mit einem eingerichteten Server verwendet.
- Likes und Folgen bleiben beim Seitenwechsel und nach einem Neustart erhalten.
- Eigene neue Kommentare lassen sich lokal bearbeiten und löschen; Demo-Kommentare anderer Personen bleiben unverändert.
- Neue Chat-Nachrichten tragen eine eigene Absenderkennung, damit ein später geänderter Profilname die Zuordnung nicht verliert.
- Ein fehlgeschlagener lokaler Speichervorgang wird in der Oberfläche angezeigt.
- Blockierte Demo-Profile werden in Feed, Momenten, Merkliste, Chats und beim Weiterleiten ausgeblendet.

## Reihenfolge für den weiteren Ausbau ohne Server

1. Profile und Privatsphäre: Sichtbarkeit und Bearbeitung auf allen relevanten Ansichten prüfen, Demo-Identitäten konsequent kennzeichnen.
2. Beiträge und Medien: Erstellen, Bearbeiten, Löschen, Kamera, Galerie, Bildgröße und Offline-Verhalten auf Geräten prüfen.
3. Community: Kommentare, Folgen, Blockieren, Merken, Teilen und Reposts in jedem Einstiegspunkt durchspielen.
4. Nachrichten und Moderation: lokale Abläufe vervollständigen und Zustände für Zustellung, Fehler, Sperre und Meldung vorbereiten.
5. Rechtliches und Qualität: konkrete Dienste in Datenschutztexten ergänzen, Barrierefreiheit und Geräteprüfung, danach externe rechtliche Prüfung vor öffentlicher Freigabe.

Die Demo-Daten dürfen bei einem späteren Serveranschluss nicht automatisch als echte Beiträge anderer Personen übernommen werden. Eine Übernahme eigener lokaler Inhalte benötigt einen ausdrücklich angebotenen Import mit Vorschau und Bestätigung.
