import { readFile, mkdir, writeFile } from "node:fs/promises";

// Keep the approved JPEG byte-for-byte: only its white export perimeter is
// clipped. No recolouring, resampling or regeneration of the brand artwork.
const source = await readFile(new URL("../public/design-v31/br-hauptlogo.jpg", import.meta.url));
const output = new URL("../public/design-v35/", import.meta.url);
await mkdir(output, { recursive: true });

function brandSvg(background = "") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1254" height="1254" viewBox="0 0 1254 1254">
  <defs><clipPath id="leather-edge"><rect x="10" y="10" width="1234" height="1234" rx="180"/></clipPath></defs>
${background ? `  <rect width="1254" height="1254" fill="${background}"/>` : ""}
  <image width="1254" height="1254" clip-path="url(#leather-edge)" href="data:image/jpeg;base64,${source.toString("base64")}"/>
</svg>\n`;
}

await writeFile(new URL("br-hauptlogo.svg", output), brandSvg());
// An opaque dark backing prevents launcher/browser icon masks from adding a
// white plate outside the rounded leather edge. The artwork stays identical.
await writeFile(new URL("app-icon.svg", output), brandSvg("#1b100a"));
console.log("Built logo and app icon with the original, unchanged brand artwork.");
