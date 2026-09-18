import {
  PUBLIC_CONFIG,
  getMissingPublicFields
} from "../src/config/publicConfig.js";

const blockers = getMissingPublicFields();

if (!PUBLIC_CONFIG.backendEnabled) {
  blockers.push("Backend für Konten, Rechte, Daten und Moderation");
}

if (blockers.length > 0) {
  console.error("Blechroute ist noch nicht für eine offene öffentliche Community freigegeben.");
  for (const blocker of blockers) {
    console.error(`- ${blocker}`);
  }
  process.exitCode = 1;
} else {
  console.log("Die konfigurierbaren Public-Release-Prüfpunkte sind erfüllt.");
}
