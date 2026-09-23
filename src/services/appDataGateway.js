import { clearStoredState, loadStoredState, saveStoredState } from "../utils/storage";

// Alle Zugriffe auf den lokalen App-Zustand laufen durch dieses Gateway.
// Ein späterer Serveradapter kann dieselben Methoden anbieten, ohne dass die
// Oberfläche die Speichertechnik kennen muss.
export function createLocalAppDataGateway() {
  let pending = Promise.resolve();

  function enqueue(operation) {
    const result = pending.then(operation);
    pending = result.catch(() => {});
    return result;
  }

  return Object.freeze({
    mode: "local",
    capabilities: Object.freeze({
      sharedAccounts: false,
      crossDeviceSync: false,
      remoteMessaging: false,
      pushNotifications: false
    }),
    async load() {
      await pending;
      return loadStoredState();
    },
    save(state) {
      return enqueue(() => saveStoredState(state));
    },
    clear() {
      return enqueue(() => clearStoredState());
    }
  });
}
