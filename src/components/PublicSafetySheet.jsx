import { useState } from "react";
import { PUBLIC_CONFIG, getMissingPublicFields } from "../config/publicConfig";

const tabs = [
  ["status", "Status"],
  ["privacy", "Datenschutz"],
  ["rules", "Regeln"],
  ["data", "Deine Daten"]
];

export default function PublicSafetySheet({
  appState,
  onClose,
  onExportData,
  onClearPersonalData,
  onUnblockProfile,
  onClearReports
}) {
  const [activeTab, setActiveTab] = useState("status");
  const [confirmClear, setConfirmClear] = useState(false);
  const missingFields = getMissingPublicFields();
  const blockedProfiles = appState.blockedProfiles || [];
  const reports = appState.reports || [];

  return (
    <div className="create-overlay form-overlay public-safety-overlay" role="presentation" onClick={onClose}>
      <section
        className="entry-form public-safety-sheet"
        role="dialog"
        aria-modal="true"
        aria-label="Sicherheit und Datenschutz"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="sheet-handle" />
        <p className="section-label">Public Beta</p>
        <h2>Sicherheit &amp; Datenschutz</h2>
        <p>Technischer Stand der lokalen Demo und deine Kontrollmöglichkeiten.</p>

        <nav className="public-tabs" aria-label="Informationsbereiche">
          {tabs.map(([id, label]) => (
            <button
              className={activeTab === id ? "active" : ""}
              type="button"
              aria-current={activeTab === id ? "page" : undefined}
              onClick={() => setActiveTab(id)}
              key={id}
            >
              {label}
            </button>
          ))}
        </nav>

        {activeTab === "status" && (
          <div className="public-panel">
            <article className="public-status-card warning">
              <span>Noch nicht öffentlich freigabefertig</span>
              <strong>{missingFields.length + 1} offene Pflichtpunkte</strong>
              <p>
                Backend sowie {missingFields.join(", ")} fehlen noch. Die App
                bleibt deshalb ehrlich als lokale Demo gekennzeichnet.
              </p>
            </article>

            <article className="public-notice-card">
              <strong>Aktueller Betriebsmodus</strong>
              <p>{PUBLIC_CONFIG.releaseLabel}</p>
              <ul>
                <li>keine echten Benutzerkonten</li>
                <li>keine Übertragung an Blechroute-Server</li>
                <li>keine Analyse- oder Werbetracker</li>
                <li>keine Standortabfrage</li>
              </ul>
            </article>

            <article className="public-notice-card">
              <strong>Anbieterangaben</strong>
              <dl>
                <div><dt>Name</dt><dd>{PUBLIC_CONFIG.operator.name || "Noch einzutragen"}</dd></div>
                <div><dt>Anschrift</dt><dd>{PUBLIC_CONFIG.operator.address || "Noch einzutragen"}</dd></div>
                <div><dt>E-Mail</dt><dd>{PUBLIC_CONFIG.operator.email || "Noch einzutragen"}</dd></div>
              </dl>
              <small>
                Diese Angaben werden zentral in `src/config/publicConfig.js` gepflegt
                und müssen vor der echten Veröffentlichung geprüft werden.
              </small>
            </article>
          </div>
        )}

        {activeTab === "privacy" && (
          <div className="public-panel">
            <article className="public-notice-card">
              <strong>Technische Datenschutzinformation</strong>
              <p>
                Profiländerungen, Roadbook-Einträge, Likes, Kommentare,
                Blockierungen und Meldungen werden ausschließlich im lokalen
                Speicher dieses Browsers abgelegt.
              </p>
              <p>
                Die aktuelle Demo setzt keine Analyse- oder Werbetracker ein,
                fragt keinen Gerätestandort ab und lädt keine eigenen Fotos auf
                einen Server hoch.
              </p>
            </article>

            <article className="public-notice-card">
              <strong>Wichtig für die spätere Community</strong>
              <p>
                Vor echten Uploads müssen Bildmetadaten einschließlich möglicher
                GPS-Daten entfernt, Dateitypen geprüft und Sichtbarkeiten serverseitig
                durchgesetzt werden.
              </p>
            </article>
          </div>
        )}

        {activeTab === "rules" && (
          <div className="public-panel">
            <article className="public-notice-card">
              <strong>Community-Grundregeln</strong>
              <ol>
                <li>Respektvoll bleiben; keine Beleidigungen oder Belästigung.</li>
                <li>Nur eigene oder ausdrücklich erlaubte Bilder veröffentlichen.</li>
                <li>Keine privaten Adressen oder exakten sensiblen Standorte teilen.</li>
                <li>Keine gefährlichen Fahrmanöver verherrlichen oder organisieren.</li>
                <li>Werbung, Spam und irreführende Inhalte bleiben draußen.</li>
              </ol>
            </article>
            <article className="public-notice-card">
              <strong>Melden und Blockieren</strong>
              <p>
                Community-Profile und fremde Beiträge lassen sich bereits lokal
                melden oder ausblenden. Die spätere Serverversion muss Meldungen
                an eine echte Moderationsoberfläche übergeben.
              </p>
            </article>
          </div>
        )}

        {activeTab === "data" && (
          <div className="public-panel">
            <article className="public-notice-card">
              <strong>Lokale Datenkopie</strong>
              <p>
                Exportiere den vollständigen lokalen Teststand einschließlich
                lokaler Sitzungs- und Bestätigungsangaben als lesbare JSON-Datei.
              </p>
              <button className="public-action-button" type="button" onClick={onExportData}>
                Lokale Daten exportieren
              </button>
            </article>

            <article className="public-notice-card">
              <strong>Blockierte Profile</strong>
              {blockedProfiles.length ? (
                <div className="blocked-list">
                  {blockedProfiles.map((profile) => (
                    <button type="button" onClick={() => onUnblockProfile(profile.key)} key={profile.key}>
                      {profile.label} wieder anzeigen
                    </button>
                  ))}
                </div>
              ) : <p>Keine Profile blockiert.</p>}
            </article>

            <article className="public-notice-card">
              <strong>Lokale Meldungen</strong>
              <p>{reports.length} Meldungen sind nur in diesem Browser vorgemerkt.</p>
              {reports.length > 0 && (
                <button className="public-action-button secondary" type="button" onClick={onClearReports}>
                  Lokale Meldeliste leeren
                </button>
              )}
            </article>

            <article className="public-notice-card danger-zone">
              <strong>Persönliche Änderungen löschen</strong>
              <p>
                Entfernt Profiländerungen, eigene Einträge, Kommentare,
                Blockierungen, Meldungen, Sitzung und lokale Bestätigung aus
                diesem Browser. Anschließend wirst du abgemeldet. Der Demo-Stand
                erscheint erst nach einer erneuten Anmeldung und Bestätigung.
              </p>
              <button
                className="public-action-button danger"
                type="button"
                onClick={() => {
                  if (!confirmClear) {
                    setConfirmClear(true);
                    return;
                  }
                  onClearPersonalData();
                }}
              >
                {confirmClear ? "Löschen jetzt bestätigen" : "Persönliche Änderungen löschen"}
              </button>
              {confirmClear && (
                <button className="public-cancel-link" type="button" onClick={() => setConfirmClear(false)}>
                  Abbrechen
                </button>
              )}
            </article>
          </div>
        )}

        <button className="close-sheet" type="button" onClick={onClose}>Schließen</button>
      </section>
    </div>
  );
}
