import { STORAGE_KEY } from "../data/demoData";

export function makeId() {
  return Date.now() + Math.floor(Math.random() * 9999);
}

export function getTodayLabel() {
  return new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "short"
  }).format(new Date());
}

export function loadStoredState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return null;
    }

    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function saveStoredState(appState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch {
    // In der Beta bewusst still.
    // Später können wir hier eine Fehlermeldung anzeigen.
  }
}

export function clearStoredState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // In der Beta bewusst still.
  }
}