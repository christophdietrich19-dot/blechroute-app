import { STORAGE_KEY } from "../data/demoData";

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

function normalizeState(parsed) {
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;

  return {
    ...parsed,
    followingHandles: Array.isArray(parsed.followingHandles) ? parsed.followingHandles : [],
    followingVehicleIds: Array.isArray(parsed.followingVehicleIds) ? parsed.followingVehicleIds : [],
    blockedProfiles: Array.isArray(parsed.blockedProfiles) ? parsed.blockedProfiles : [],
    reports: Array.isArray(parsed.reports) ? parsed.reports : [],
    reposts: Array.isArray(parsed.reposts) ? parsed.reposts : [],
    savedEntryIds: Array.isArray(parsed.savedEntryIds) ? parsed.savedEntryIds : [],
    notifications: Array.isArray(parsed.notifications) ? parsed.notifications : [],
    conversations: Array.isArray(parsed.conversations) ? parsed.conversations : [],
    vehicles: Array.isArray(parsed.vehicles) ? parsed.vehicles : [],
    entries: Array.isArray(parsed.entries) ? parsed.entries : [],
    spots: Array.isArray(parsed.spots) ? parsed.spots : [],
    polaroids: Array.isArray(parsed.polaroids) ? parsed.polaroids : []
  };
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
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    transaction.oncomplete = () => database.close();
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function loadStoredState() {
  try {
    const stored = await databaseOperation("readonly", (store) => store.get(STORAGE_KEY));
    const normalized = normalizeState(stored);
    if (normalized) return normalized;
  } catch {
    // Fallback und Migration aus älteren LocalStorage-Versionen.
  }

  try {
    const legacy = localStorage.getItem(STORAGE_KEY);
    if (!legacy) return null;
    const normalized = normalizeState(JSON.parse(legacy));
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
  try {
    await databaseOperation("readwrite", (store) => store.delete(STORAGE_KEY));
  } catch {
    // LocalStorage wird unabhängig davon ebenfalls bereinigt.
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    return false;
  }

  return true;
}

export async function requestPersistentStorage() {
  try {
    if (navigator.storage?.persist) return await navigator.storage.persist();
  } catch {
    return false;
  }
  return false;
}
