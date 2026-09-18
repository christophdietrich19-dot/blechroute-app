import { useState } from "react";
import { credentialsMatch } from "../config/testerConfig";
import { hasAcceptedTerms } from "../utils/session";
import LegalSheet from "./LegalSheet";

export default function AuthGate({ onAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(() => hasAcceptedTerms());
  const [legalTab, setLegalTab] = useState(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!accepted) {
      setError("Bitte bestätige zuerst die Testbedingungen und Community-Regeln.");
      return;
    }

    setSubmitting(true);
    const matches = await credentialsMatch(username, password);
    setSubmitting(false);

    if (!matches) {
      setError("Benutzername oder Passwort ist nicht richtig.");
      return;
    }

    onAuthenticated();
  }

  function showComingSoon(label) {
    setNotice(`${label} wird mit dem späteren Blechroute-Server freigeschaltet.`);
  }

  return (
    <div className="auth-page">
      <main className="auth-card" aria-labelledby="auth-title">
        <div className="auth-brand">
          <img src={`${import.meta.env.BASE_URL}app-icon-v22.png`} alt="" />
          <p className="section-label">Vertrauliche Beta</p>
          <h1 id="auth-title">Blechroute</h1>
          <p className="auth-tagline">
            <span>Dein Roadbook. Deine Fahrzeuge.</span>
            <span>Deine Geschichten.</span>
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Benutzername
            <input
              value={username}
              autoComplete="username"
              autoCapitalize="none"
              spellCheck="false"
              onChange={(event) => setUsername(event.target.value)}
            />
          </label>
          <label>
            Passwort
            <input
              value={password}
              type="password"
              autoComplete="current-password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <label className="auth-consent">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(event) => setAccepted(event.target.checked)}
            />
            <span>
              Ich akzeptiere die <button type="button" onClick={() => setLegalTab("test")}>Testbedingungen</button> und
              {" "}<button type="button" onClick={() => setLegalTab("rules")}>Community-Regeln</button>.
              Die <button type="button" onClick={() => setLegalTab("privacy")}>Datenschutzhinweise</button> habe ich zur Kenntnis genommen.
            </span>
          </label>

          {error && <p className="auth-error" role="alert">{error}</p>}
          {notice && <p className="auth-notice" role="status">{notice}</p>}

          <button className="auth-submit" type="submit" disabled={submitting}>
            {submitting ? "Zugang wird geprüft…" : "Anmelden"}
          </button>
        </form>

        <div className="auth-secondary-actions">
          <button type="button" onClick={() => showComingSoon("Registrierung")}>Registrieren</button>
          <button type="button" onClick={() => showComingSoon("Passwort zurücksetzen")}>Passwort vergessen</button>
        </div>

        <article className="auth-demo-hint">
          <strong>Zugang nur nach Freigabe</strong>
          <span>Deine persönlichen Zugangsdaten erhältst du erst nach schriftlicher Bestätigung.</span>
          <small>APK, Zugangsdaten und Testlinks dürfen nicht weitergegeben werden.</small>
        </article>

        <footer className="auth-footer">
          <button type="button" onClick={() => setLegalTab("imprint")}>Impressum</button>
          <button type="button" onClick={() => setLegalTab("privacy")}>Datenschutz</button>
        </footer>
      </main>

      {legalTab && <LegalSheet initialTab={legalTab} onClose={() => setLegalTab(null)} />}
    </div>
  );
}
