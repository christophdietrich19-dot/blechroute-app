import { useRef, useState } from "react";
import { credentialsMatch } from "../config/testerConfig";
import { hasAcceptedTerms } from "../utils/session";
import LegalSheet from "./LegalSheet";
import StitchedBorder from "./StitchedBorder";

export default function AuthGate({ onAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [accepted, setAccepted] = useState(() => hasAcceptedTerms());
  const [legalTab, setLegalTab] = useState(null);
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const noticeRef = useRef(null);

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
    setNotice(label === "Registrierung"
      ? "Registrierung bald verfügbar. Während der Testphase vergibt Christoph die Zugangsdaten persönlich – nach Bestätigung der Testbedingungen und Community-Regeln."
      : "Passwort zurücksetzen wird erst nach der Testphase verfügbar. Deine Zugangsdaten erhältst du während der Beta persönlich von Christoph – nach Bestätigung der Testbedingungen und Community-Regeln.");
    requestAnimationFrame(() => noticeRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }));
  }

  return (
    <div className="auth-page">
      <main className="auth-card" aria-labelledby="auth-title">
        <div className="auth-brand">
          <div className="auth-polaroid" aria-hidden="true">
            <img src={`${import.meta.env.BASE_URL}bmw_am_see_im_goldenen_licht.png`} alt="" />
          </div>
          <div className="auth-wordmark">
            <img src={`${import.meta.env.BASE_URL}design-v31/br-hauptlogo.jpg`} alt="" />
            <div><p className="section-label">Vertrauliche Beta</p><h1 id="auth-title">Blechroute</h1></div>
          </div>
          <p className="auth-tagline">Autos. Straßen. Geschichten.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <StitchedBorder />
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
          <div className="auth-password-group">
            <label htmlFor="auth-password">Passwort</label>
            <div className="auth-password-field">
              <input
                id="auth-password"
                value={password}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                onChange={(event) => setPassword(event.target.value)}
              />
              <button
                type="button"
                className="auth-password-toggle"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Passwort verbergen" : "Passwort anzeigen"}
                aria-pressed={showPassword}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M2.5 12s3.5-5.5 9.5-5.5 9.5 5.5 9.5 5.5-3.5 5.5-9.5 5.5S2.5 12 2.5 12Z" />
                  <circle cx="12" cy="12" r="2.6" />
                  {!showPassword && <path d="M4 20 20 4" />}
                </svg>
              </button>
            </div>
          </div>

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
          <button className="auth-submit" type="submit" disabled={submitting}>
            <StitchedBorder />
            {submitting ? "Zugang wird geprüft…" : "Anmelden"}
          </button>
        </form>

        <div className="auth-social-future" aria-label="Weitere Anmeldewege in Vorbereitung">
          <span>Später auch mit</span>
          <div>
            <button type="button" disabled aria-label="Mit Google anmelden – bald verfügbar">Google <small>Bald verfügbar</small></button>
            <button type="button" disabled aria-label="Mit Apple anmelden – bald verfügbar">Apple <small>Bald verfügbar</small></button>
          </div>
        </div>

        <div className="auth-secondary-actions">
          <button type="button" onClick={() => showComingSoon("Registrierung")}>Registrieren</button>
          <button type="button" onClick={() => showComingSoon("Passwort zurücksetzen")}>Passwort vergessen</button>
        </div>
        {notice && (
          <div ref={noticeRef} className="auth-notice" role="status">
            <p>{notice}</p>
            <div className="auth-notice-links">
              <button type="button" onClick={() => setLegalTab("test")}>Testbedingungen lesen</button>
              <button type="button" onClick={() => setLegalTab("rules")}>Community-Regeln lesen</button>
            </div>
          </div>
        )}

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
