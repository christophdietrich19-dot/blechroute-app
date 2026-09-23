import { copyFile, mkdir, readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { pbkdf2Sync, randomBytes } from "node:crypto";
import path from "node:path";

const root = process.cwd();
const credentialsPath = path.join(root, ".private", "tester-credentials.json");
const apkOutputDir = path.join(root, "outputs", "release-v28", "apk");
const sourceApk = path.join(root, "android", "app", "build", "outputs", "apk", "debug", "app-debug.apk");
const isWindows = process.platform === "win32";
const gradleCommand = process.env.BLECHROUTE_GRADLE_BIN || (isWindows ? "gradlew.bat" : "./gradlew");

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: options.cwd || root,
    env: options.env || process.env,
    encoding: "utf8",
    stdio: "inherit",
    shell: options.shell || false
  });
  if (result.error) throw result.error;
  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(" ")} ist mit Code ${result.status} fehlgeschlagen.`);
  }
}

const credentials = JSON.parse(await readFile(credentialsPath, "utf8"));
if (!Array.isArray(credentials.accounts) || credentials.accounts.length === 0) {
  throw new Error("Keine Testkonten in .private/tester-credentials.json gefunden.");
}

await mkdir(apkOutputDir, { recursive: true });

for (const [index, account] of credentials.accounts.entries()) {
  console.log(`\n[${index + 1}/${credentials.accounts.length}] Baue ${account.label} ...`);
  const credentialSalt = randomBytes(16).toString("hex");
  const credentialMaterial = `${account.id.trim().toLowerCase()}\u0000${account.password}`;
  const credentialHash = pbkdf2Sync(
    credentialMaterial,
    Buffer.from(credentialSalt, "hex"),
    150000,
    32,
    "sha256"
  ).toString("hex");
  const env = {
    ...process.env,
    VITE_PLATFORM: "android",
    VITE_TEST_CREDENTIALS_SALT: credentialSalt,
    VITE_TEST_CREDENTIALS_HASH: credentialHash
  };
  run(process.execPath, [path.join(root, "node_modules", "vite", "bin", "vite.js"), "build", "--configLoader", "runner", "--logLevel", "error"], { env });
  run(process.execPath, [path.join(root, "node_modules", "@capacitor", "cli", "bin", "capacitor"), "sync", "android"], { env });
  run(gradleCommand, ["assembleDebug", "--no-daemon", "--console=plain", "--quiet"], {
    cwd: path.join(root, "android"),
    env,
    shell: isWindows
  });
  await copyFile(sourceApk, path.join(apkOutputDir, account.apkName));
}

console.log(`\nFertig: ${credentials.accounts.length} APKs in outputs/release-v28/apk.`);
