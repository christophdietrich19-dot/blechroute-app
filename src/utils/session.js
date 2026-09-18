import { TEST_TERMS_VERSION } from "../config/testerConfig";

const SESSION_KEY = "blechroute-session-v22";
const TERMS_KEY = "blechroute-terms-v22";

export function loadSession() {
  try {
    const value = JSON.parse(localStorage.getItem(SESSION_KEY) || "null");
    return value?.authenticated === true ? value : null;
  } catch {
    return null;
  }
}
export function saveSession() {
  const session = {
    authenticated: true,
    role: "user",
    loggedInAt: new Date().toISOString()
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function clearTermsAcceptance() {
  localStorage.removeItem(TERMS_KEY);
}

export function clearAllLocalAccessData() {
  clearSession();
  clearTermsAcceptance();
}

export function getLocalAccessMetadata() {
  const session = loadSession();

  try {
    const terms = JSON.parse(localStorage.getItem(TERMS_KEY) || "null");
    return {
      session: session
        ? { role: session.role, loggedInAt: session.loggedInAt }
        : null,
      terms: terms
        ? { version: terms.version, acceptedAt: terms.acceptedAt }
        : null
    };
  } catch {
    return { session: null, terms: null };
  }
}

export function hasAcceptedTerms() {
  try {
    const value = JSON.parse(localStorage.getItem(TERMS_KEY) || "null");
    return value?.version === TEST_TERMS_VERSION;
  } catch {
    return false;
  }
}

export function acceptTerms() {
  localStorage.setItem(
    TERMS_KEY,
    JSON.stringify({
      version: TEST_TERMS_VERSION,
      acceptedAt: new Date().toISOString()
    })
  );
}
