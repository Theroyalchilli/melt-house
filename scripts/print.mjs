// npm run print [-- http://localhost:3000]
// Saves the café's QR code and print PDFs into print/:
//   menu-qr.svg · menu-qr.png (2400 px) · table-card-a6.pdf · table-cards-4-on-a4.pdf · counter-poster-a5.pdf
// Needs the site running (npm run dev, or npm run build && npm start) and Chrome or Edge installed.
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import sharp from "sharp";

const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const out = resolve("print");
mkdirSync(out, { recursive: true });

const browsers = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const browser = browsers.find((p) => existsSync(p));

// 1 · the QR code itself
const res = await fetch(`${base}/print/qr.svg`).catch(() => null);
if (!res?.ok) {
  console.error(`✗ Could not reach ${base}/print/qr.svg. Start the site first (npm run dev), or pass its URL: npm run print -- http://localhost:3001`);
  process.exit(1);
}
const svg = await res.text();
writeFileSync(join(out, "menu-qr.svg"), svg);
await sharp(Buffer.from(svg), { density: 1200 }).resize(2400, 2400).png().toFile(join(out, "menu-qr.png"));
console.log("✓ print/menu-qr.svg");
console.log("✓ print/menu-qr.png (2400 × 2400 px)");

// 2 · the PDFs
if (!browser) {
  console.warn("! Chrome / Edge not found: open the /print/* pages and use Print → Save as PDF (margins: none, background graphics: on).");
  process.exit(0);
}
const pdfs = [
  ["table-card", "table-card-a6.pdf"],
  ["table-cards-a4", "table-cards-4-on-a4.pdf"],
  ["poster", "counter-poster-a5.pdf"],
];
for (const [page, file] of pdfs) {
  execFileSync(browser, ["--headless=new", "--disable-gpu", "--no-pdf-header-footer", "--virtual-time-budget=8000", `--print-to-pdf=${join(out, file)}`, `${base}/print/${page}`], { stdio: "ignore" });
  console.log(`✓ print/${file}`);
}
console.log(`\nQR opens: ${svg.match(/QR code: ([^"]+)/)?.[1] ?? "?"}`);
