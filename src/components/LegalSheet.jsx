import { useState } from "react";
import { PUBLIC_CONFIG } from "../config/publicConfig";
import { TESTER_CONFIG, TEST_TERMS_VERSION } from "../config/testerConfig";

const tabs = [
  ["imprint", "Impressum"],
  ["privacy", "Datenschutz"],
  ["rules", "Regeln"],
  ["test", "Testbedingungen"]
];

export default function LegalSheet({ initialTab = "imprint", onClose }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  return (
    <div className="create-overlay form-overlay legal-overlay" role="presentation" onClick={onClose}>
      <section
        className="entry-form legal-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Rechtliche Informationen"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sheet-handle" />
        <p className="section-label">Blechroute · Testversion</p>
        <h2>Rechtliches &amp; Regeln</h2>

        <nav className="legal-tabs" aria-label="Rechtliche Bereiche">
          {tabs.map(([id, label]) => (
            <button
              className={activeTab === id ? "active" : ""}
              type="button"
              onClick={() => setActiveTab(id)}
              key={id}
            >
              {label}
            </button>
          ))}
        </nav>

        {activeTab === "imprint" && (
          <div className="legal-copy">
            <h3>Impressum</h3>
            <p>Angaben gemäß § 5 DDG</p>
            <p>
              <strong>{PUBLIC_CONFIG.operator.name}</strong><br />
              {PUBLIC_CONFIG.operator.addressLines.map((line) => (
                <span key={line}>{line}<br /></span>
              ))}
            </p>
            <h3>Kontakt</h3>
            <p>
              E-Mail: <a href={`mailto:${PUBLIC_CONFIG.operator.email}`}>
                {PUBLIC_CONFIG.operator.email}
              </a>
            </p>
            <h3>Redaktionell verantwortlich</h3>
            <p>Christoph Dietrich, Anschrift wie oben, gemäß § 18 Abs. 2 MStV.</p>
            <h3>Zweck der Testversion</h3>
            <p>
              Blechroute ist eine derzeit nicht öffentliche Testanwendung für ein
              künftiges soziales Roadbook rund um Fahrzeuge, Touren und Momente.
              Über diese Testversion werden keine kostenpflichtigen Leistungen
              angeboten und keine Verträge abgeschlossen.
            </p>
          </div>
        )}

        {activeTab === "privacy" && (
          <div className="legal-copy">
            <h3>Datenschutzhinweise zur lokalen Beta</h3>
            <p>Stand: {PUBLIC_CONFIG.privacyReviewDate}</p>
            <p>
              Verantwortlicher im Sinne der Datenschutz-Grundverordnung ist
              {" "}<strong>{PUBLIC_CONFIG.operator.name}</strong>, {PUBLIC_CONFIG.operator.address}.
              Kontakt: <a href={`mailto:${PUBLIC_CONFIG.operator.email}`}>{PUBLIC_CONFIG.operator.email}</a>.
              Ein Datenschutzbeauftragter ist für diese Testphase nicht bestellt.
            </p>
            <h3>Welche Daten verarbeitet werden</h3>
            <p>
              Die Beta speichert lokal: Anmelde- und Sitzungsangaben, Zeitpunkt und
              Version der Bestätigung, Profilangaben, Fahrzeuge, Bilder, Touren,
              Beiträge, Likes, Kommentare, Demo-Nachrichten, Blockierungen und
              Meldungen. Ein Blechroute-Benutzerkonto auf einem Server existiert
              in dieser Testphase noch nicht.
            </p>
            <h3>Zwecke und Rechtsgrundlagen</h3>
            <p>
              Die Daten werden verarbeitet, um den geschlossenen Betatest und die
              ausdrücklich angeforderten lokalen App-Funktionen bereitzustellen
              (Art. 6 Abs. 1 Buchst. b DSGVO). Sicherheits- und Fehlerhinweise werden
              zur Stabilisierung und Absicherung der Testversion verarbeitet
              (Art. 6 Abs. 1 Buchst. f DSGVO). Das berechtigte Interesse liegt in
              einem sicheren, nachvollziehbaren Testbetrieb.
            </p>
            <h3>Speicherung auf dem Gerät</h3>
            <p>
              App-Inhalte liegen in IndexedDB beziehungsweise im lokalen
              Browser-Speicher des Geräts. Der Zugriff ist für die vom Nutzer
              angeforderten Funktionen erforderlich (§ 25 Abs. 2 Nr. 2 TDDDG).
              Blechroute setzt in der Beta keine Werbe- oder Analyse-Tracker ein.
            </p>
            <h3>Fotos, Kamera und Orte</h3>
            <p>
              Der Nutzer kann Bilder aus der Mediathek auswählen oder über die
              Kamerafunktion aufnehmen. Vor der lokalen Speicherung werden sie
              verkleinert und als JPEG neu kodiert; eingebettete EXIF- und GPS-Daten
              werden dabei entfernt. Die Beta fragt den Gerätestandort nicht ab.
              Orts- und Regionsangaben werden ausschließlich manuell eingetragen.
            </p>
            <h3>Webhosting und Empfänger</h3>
            <p>
              Die APK verarbeitet App-Inhalte lokal. Die Web-Testversion wird über
              GitHub Pages bereitgestellt. Beim Abruf können GitHub als Hostinganbieter
              sowie beteiligte Netzdienste Verbindungsdaten wie IP-Adresse, Zeitpunkt
              und angeforderte Datei zu Sicherheits- und Betriebszwecken verarbeiten.
              Dabei kann eine Verarbeitung in den USA stattfinden. Es gilt ergänzend
              die <a href="https://docs.github.com/de/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noreferrer">Datenschutzerklärung von GitHub</a>.
            </p>
            <h3>Fehlermeldungen</h3>
            <p>
              „Fehler melden“ öffnet das E-Mail-Programm mit App-Version,
              Geräte-/Browserkennung und leeren Feldern für Beschreibung und
              Schritte. Screenshots werden nur manuell angehängt. Erst beim
              eigenständigen Absenden gehen diese Angaben an {TESTER_CONFIG.supportEmail};
              dabei verarbeiten die beteiligten E-Mail-Anbieter die Nachricht.
            </p>
            <h3>Speicherdauer und Kontrolle</h3>
            <p>
              Lokale Daten bleiben bis zur Löschung in der App, dem Löschen des
              Browser-Speichers oder der Deinstallation erhalten. „Lokale Daten
              vollständig löschen“ entfernt App-Änderungen, Sitzung und lokale
              Bestätigung und meldet den Nutzer ab. E-Mails werden nur so lange
              aufbewahrt, wie dies zur Bearbeitung des Tests, zur Sicherheit oder
              aufgrund gesetzlicher Pflichten erforderlich ist.
            </p>
            <h3>Rechte</h3>
            <p>
              Betroffene haben nach Maßgabe der DSGVO Rechte auf Auskunft,
              Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und
              Widerspruch. Rein lokal gespeicherte Inhalte sind für den Betreiber
              technisch nicht einsehbar; sie können direkt in der App exportiert
              oder gelöscht werden. Es findet keine automatisierte Entscheidung
              und kein Profiling statt. Die Beta ist für Personen ab 16 Jahren
              vorgesehen.
            </p>
            <h3>Beschwerderecht</h3>
            <p>
              Zuständige Aufsichtsbehörde ist die Sächsische Datenschutz- und
              Transparenzbeauftragte, Maternistraße 17, 01067 Dresden,
              {" "}<a href="mailto:post@sdtb.sachsen.de">post@sdtb.sachsen.de</a>,
              {" "}<a href="https://www.datenschutz.sachsen.de" target="_blank" rel="noreferrer">www.datenschutz.sachsen.de</a>.
              Vor einem öffentlichen Serverbetrieb werden diese Hinweise an die
              tatsächliche Infrastruktur und Datenverarbeitung angepasst.
            </p>
          </div>
        )}

        {activeTab === "rules" && (
          <div className="legal-copy">
            <h3>Community-Regeln</h3>
            <ol>
              <li>Keine rassistischen, antisemitischen, extremistischen, diskriminierenden oder menschenverachtenden Inhalte.</li>
              <li>Keine Bedrohungen, Beleidigungen, Belästigung, sexualisierte Gewalt oder Aufrufe zu Gewalt.</li>
              <li>Keine illegalen Straßenrennen, gefährlichen Fahrmanöver oder Verabredungen zu Straftaten.</li>
              <li>Nur eigene oder nachweislich erlaubte Fotos, Texte und Markeninhalte veröffentlichen.</li>
              <li>Keine privaten Adressen, Kennzeichen oder exakten sensiblen Standorte Dritter teilen.</li>
              <li>Keine sexualisierten Inhalte mit Minderjährigen, kein Doxxing und keine Darstellung von Ausbeutung.</li>
              <li>Keine Täuschung, Spam, Schadsoftware, unerlaubte Werbung oder Identitätsmissbrauch.</li>
            </ol>
            <h3>Moderation</h3>
            <p>
              Verstöße können zur Entfernung von Inhalten, Verwarnung, zeitweisen
              Sperre oder dauerhaften Sperre führen. Schwere oder offensichtlich
              rechtswidrige Inhalte können ohne vorherige Verwarnung gesperrt und
              im erforderlichen Umfang an zuständige Stellen weitergegeben werden.
            </p>
          </div>
        )}

        {activeTab === "test" && (
          <div className="legal-copy">
            <h3>Test- und Vertraulichkeitsbedingungen</h3>
            <p>Version {TEST_TERMS_VERSION}</p>
            <ol>
              <li>Die APK, Zugangsdaten, Testlinks und Installationsdateien dürfen nicht an Dritte weitergegeben werden.</li>
              <li>Quellcode, technische Abläufe, interne Texte und nicht veröffentlichte Funktionen bleiben vertraulich.</li>
              <li>Screenshots sind ausschließlich zur direkten Fehlerdokumentation gegenüber Christoph Dietrich erlaubt.</li>
              <li>Screenshots, Videos, Bildschirmaufnahmen und sonstige Testinhalte dürfen nicht veröffentlicht oder an andere Personen gesendet werden.</li>
              <li>Die persönliche Testerkennung darf nicht von anderen Personen verwendet werden.</li>
              <li>Bei Ende des Tests sind APK, Zugangsdaten und zugehörige Dateien zu löschen.</li>
              <li>Sicherheitslücken werden ausschließlich an {TESTER_CONFIG.supportEmail} gemeldet und nicht ausgenutzt oder veröffentlicht.</li>
              <li>Die Testversion kann Fehler enthalten und lokale Daten verlieren; wichtige Inhalte sind separat zu sichern.</li>
              <li>Blechroute ist kein Navigations- oder Fahrsicherheitssystem und darf während der Fahrt nicht bedient werden.</li>
              <li>Der Test ist ab 16 Jahren vorgesehen. Zugänge können bei Missbrauch jederzeit gesperrt oder zurückgezogen werden.</li>
            </ol>
            <p>
              Zugangsdaten werden erst ausgegeben, nachdem diese Bedingungen per
              E-Mail an {TESTER_CONFIG.supportEmail} ausdrücklich bestätigt wurden.
              Die zusätzliche Bestätigung in der App wird mit Zeitpunkt und
              Bedingungsversion ausschließlich lokal gespeichert.
            </p>
          </div>
        )}

        <button className="close-sheet" type="button" onClick={onClose}>Schließen</button>
      </section>
    </div>
  );
}
