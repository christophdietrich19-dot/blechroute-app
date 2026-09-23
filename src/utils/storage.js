import { STORAGE_KEY } from "../data/demoData";
import { normalizeAppState } from "../data/appSchema";

const DB_NAME = "blechroute-local-beta";
const DB_VERSION = 1;
const STORE_NAME = "app-state";

export function makeId() {
  return Date.now() + Math.floor(Math.random() * 9999);
}

export function getTodayLabel() {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "short"
  }).format(new Date());
}

function openDatabase() {
  return new Promise((resolve, reject) => {
    if (!("indexedDB" in window)) {
      reject(new Error("IndexedDB wird nicht unterstützt."));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE_NAME)) {
        request.result.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
  });
}

async function databaseOperation(mode, operation) {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(STORE_NAME, mode);
    const store = transaction.objectStore(STORE_NAME);
    const request = operation(store);
    let result;
    request.onsuccess = () => { result = request.result; };
    transaction.oncomplete = () => {
      database.close();
      resolve(result);
    };
    transaction.onabort = () => {
      database.close();
      reject(transaction.error || new Error("Speichervorgang abgebrochen."));
    };
    transaction.onerror = () => {
      database.close();
      reject(transaction.error || new Error("Speichervorgang fehlgeschlagen."));
    };
  });
}

export async function loadStoredState() {
  try {
    const stored = await databaseOperation("readonly", (store) => store.get(STORAGE_KEY));
    const normalized = normalizeAppState(stored);
    if (normalized) return normalized;
  } catch {
    // Fallback und Migration aus älteren LocalStorage-Versionen.
  }

  try {
    const legacy = localStorage.getItem(STORAGE_KEY);
    if (!legacy) return null;
    const normalized = normalizeAppState(JSON.parse(legacy));
    if (normalized) await saveStoredState(normalized);
    return normalized;
  } catch {
    return null;
  }
}

export async function saveStoredState(appState) {
  try {
    await databaseOperation("readwrite", (store) => store.put(appState, STORAGE_KEY));
    return true;
  } catch {
    try {
      const serialized = JSON.stringify(appState);
      if (serialized.length > 4_500_000) return false;
      localStorage.setItem(STORAGE_KEY, serialized);
      return true;
    } catch {
      return false;
    }
  }
}

export async function clearStoredState() {
  let databaseCleared = !("indexedDB" in window);
  try {
    await databaseOperation("readwrite", (store) => store.delete(STORAGE_KEY));
    databaseCleared = true;
  } catch {
    // Ein Fehlschlag der Datenbank darf nicht als vollständige Löschung gelten.
  }

  let legacyCleared = false;
  try {
    localStorage.removeItem(STORAGE_KEY);
    legacyCleared = true;
  } catch {
    // Beide Speicherorte werden unabhängig voneinander versucht.
  }

  return databaseCleared && legacyCleared;
}

export async function requestPersistentStorage() {
  try {
    if (navigator.storage?.persist) return await navigator.storage.persist();
  } catch {
    return false;
  }
  return false;
}
