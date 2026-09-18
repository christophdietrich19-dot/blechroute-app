export const PUBLIC_CONFIG = Object.freeze({
  appName: "Blechroute",
  releaseLabel: "Vertrauliche lokale Testversion",
  version: "22",
  backendEnabled: false,
  analyticsEnabled: false,
  preciseLocationEnabled: false,
  operator: Object.freeze({
    name: "Christoph Dietrich",
    address: "c/o Autorenglück #11958, Albert-Einstein-Str. 47, 02977 Hoyerswerda, Deutschland",
    addressLines: Object.freeze([
      "c/o Autorenglück #11958",
      "Albert-Einstein-Str. 47",
      "02977 Hoyerswerda",
      "Deutschland"
    ]),
    email: "kontakt@christoph-it.de"
  }),
  privacyReviewDate: "18. September 2026"
});

export function getMissingPublicFields() {
  const fields = [
    ["Betreibername", PUBLIC_CONFIG.operator.name],
    ["ladungsfähige Anschrift", PUBLIC_CONFIG.operator.address],
    ["Kontakt-E-Mail", PUBLIC_CONFIG.operator.email],
    ["Datum der Datenschutzprüfung", PUBLIC_CONFIG.privacyReviewDate]
  ];

  return fields.filter(([, value]) => !String(value || "").trim()).map(([label]) => label);
}

export function isPublicReleaseConfigured() {
  return getMissingPublicFields().length === 0 && PUBLIC_CONFIG.backendEnabled;
}
