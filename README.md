# Blechroute

Private Beta der Blechroute-Web- und Android-App. Die aktuelle Version ist eine lokale Testfassung ohne produktives Backend.

## Entwicklung

Voraussetzungen: Node.js 22 oder neuer. Android-Builds benötigen zusätzlich JDK 21 und das Android SDK.

```text
npm ci
npm run dev
```

Produktions-Build der Web-App:

```text
npm run build
```

Für eine zugangsgeschützte Testfassung werden ausschließlich ein zufälliges Salz und ein PBKDF2-Prüfwert während des Builds gesetzt: `VITE_TEST_CREDENTIALS_SALT` und `VITE_TEST_CREDENTIALS_HASH`. Benutzername und Passwort werden nicht in die App geschrieben und in der Oberfläche weder vorgeschlagen noch angezeigt. Echte Zugangsdaten gehören weder in Git noch in eine eingecheckte `.env`-Datei.

Android-Projekt synchronisieren und Debug-APK bauen:

```text
npm run build:android:web
npm run android:debug
```

## Testzugänge

Zugangsdaten, personalisierte APKs, Build-Ausgaben und lokale Testdaten werden absichtlich nicht im Repository gespeichert. Sie liegen ausschließlich in den ignorierten Verzeichnissen `.private/` und `outputs/`.

## Aktueller Beta-Stand

- Lederoberfläche für Smartphone und Desktop-Geräteansicht
- lokaler Test-Login mit Zustimmung zu Testbedingungen, Community-Regeln und Datenschutz
- Kamera- und Galerieauswahl mit lokaler Bildverarbeitung und Entfernung von EXIF-/GPS-Daten
- Feed, Garage, Momente, Profile, Entdecken, Nachrichten, Teilen und Repost als lokale Demo
- lokale Speicherung auf dem jeweiligen Gerät
- Android 9 (API 28) oder neuer, Hochformat auf Smartphones

Echte Konten, serverseitige Zugriffskontrolle, Synchronisierung, Push-Nachrichten und öffentliche Community-Funktionen folgen erst mit dem späteren Backend.
