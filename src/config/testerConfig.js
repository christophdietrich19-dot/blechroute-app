const configuredSalt = String(import.meta.env.VITE_TEST_CREDENTIALS_SALT || "").trim();
const configuredHash = String(import.meta.env.VITE_TEST_CREDENTIALS_HASH || "").trim().toLowerCase();
const HASH_ITERATIONS = 150000;

export const TEST_TERMS_VERSION = "2026-09-18.2";

export const TESTER_CONFIG = Object.freeze({
  credentialSalt: configuredSalt,
  credentialHash: configuredHash,
  credentialsConfigured: /^[0-9a-f]{32}$/.test(configuredSalt) && /^[0-9a-f]{64}$/.test(configuredHash),
  supportEmail: "kontakt@christoph-it.de",
  releaseName: "Vertrauliche Testversion",
  version: "0.1.0-beta.8"
});

function hexToBytes(value) {
  return new Uint8Array(value.match(/.{2}/g).map((pair) => Number.parseInt(pair, 16)));
}

function bytesToHex(value) {
  return Array.from(new Uint8Array(value), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function constantTimeEqual(left, right) {
  if (left.length !== right.length) return false;
  let difference = 0;
  for (let index = 0; index < left.length; index += 1) {
    difference |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }
  return difference === 0;
}

export async function credentialsMatch(username, password) {
  if (!TESTER_CONFIG.credentialsConfigured || !globalThis.crypto?.subtle) return false;

  try {
    const encoder = new TextEncoder();
    const credentialMaterial = `${String(username || "").trim().toLowerCase()}\u0000${String(password || "")}`;
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(credentialMaterial),
      "PBKDF2",
      false,
      ["deriveBits"]
    );
    const derived = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        hash: "SHA-256",
        salt: hexToBytes(TESTER_CONFIG.credentialSalt),
        iterations: HASH_ITERATIONS
      },
      key,
      256
    );

    return constantTimeEqual(bytesToHex(derived), TESTER_CONFIG.credentialHash);
  } catch {
    return false;
  }
}
