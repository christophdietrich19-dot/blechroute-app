import { mkdir, readFile, writeFile } from "node:fs/promises";
import { randomInt } from "node:crypto";
import path from "node:path";

const root = process.cwd();
const privateDir = path.join(root, ".private");
const outputDir = path.join(root, "outputs");
const jsonPath = path.join(privateDir, "tester-credentials.json");
const listPath = path.join(outputDir, "Tester-Zugangsliste.txt");
const force = process.argv.includes("--force");
const ownerPassword = String(process.env.BLECHROUTE_OWNER_PASSWORD || "");

if (!ownerPassword) {
  console.error("BLECHROUTE_OWNER_PASSWORD muss für den Haupttest gesetzt sein.");
  process.exit(1);
}

const words = [
  "Achse", "Asphalt", "Benzin", "Chrom", "Garage", "Kurve", "Motor",
  "Route", "Scheinwerfer", "Strasse", "Tacho", "Tour", "Werkstatt"
];

function createPassword() {
  const first = words[randomInt(words.length)];
  let second = words[randomInt(words.length)];
  while (second === first) second = words[randomInt(words.length)];
  return `${first}-${second}-${randomInt(1000, 10000)}!`;
}

async function alreadyExists() {
  try {
    await readFile(jsonPath, "utf8");
    return true;
  } catch {
    return false;
  }
}

if (!force && (await alreadyExists())) {
  console.error("Die Zugangsliste existiert bereits. Nutze --force nur für einen bewussten Austausch aller Passwörter.");
  process.exit(1);
}

const accounts = [
  {
    id: "tester",
    password: ownerPassword,
    label: "Christoph – Haupttest",
    apkName: "Blechroute-Christoph-Haupttest.apk"
  },
  ...Array.from({ length: 10 }, (_, index) => {
    const number = String(index + 1).padStart(2, "0");
    return {
      id: `Tester${number}`,
      password: createPassword(),
      label: `Tester ${number}`,
      apkName: `Blechroute-Tester${number}.apk`
    };
  })
];

const generatedAt = new Date().toISOString();
const payload = { generatedAt, version: "0.1.0-beta.6", accounts };
const lines = [
  "BLECHROUTE – VERTRAULICHE TESTZUGÄNGE",
  `Stand: ${generatedAt}`,
  "",
  "Die jeweilige APK und die Zugangsdaten erst nach schriftlicher Bestätigung der Testbedingungen weitergeben.",
  "Jede Person erhält ausschließlich ihre eigene APK. APK, Link, Code und Zugangsdaten dürfen nicht weitergegeben werden.",
  "",
  ...accounts.flatMap((account) => [
    account.label,
    `  APK: ${account.apkName}`,
    `  Benutzername: ${account.id}`,
    `  Passwort: ${account.password}`,
    ""
  ])
];

await mkdir(privateDir, { recursive: true });
await mkdir(outputDir, { recursive: true });
await writeFile(jsonPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
await writeFile(listPath, `${lines.join("\n")}\n`, "utf8");
console.log(`Zugangsdaten für ${accounts.length} Pakete wurden lokal erzeugt.`);
