// Branded, STATIC QR code for the one café menu link. Error correction H (30%) so the heart in the middle never stops it scanning.
// Pure data → SVG markup; used by the homepage "Scan to order" section and the print files.
import QRCode from "qrcode";

export type QrSvg = { size: number; svg: string };

/** Returns an SVG string: softly rounded modules (tested: tiny round dots stop some readers decoding), rounded finder eyes, a clear centre for the logo, and a 4-module quiet zone. */
export function qrSvg(url: string, o: { ink?: string; paper?: string; logo?: string; logoScale?: number } = {}): QrSvg {
  const ink = o.ink ?? "#2e1b12";
  const paper = o.paper ?? "#fffaf3";
  const qr = QRCode.create(url, { errorCorrectionLevel: "H" });
  const n = qr.modules.size;
  const at = (x: number, y: number) => qr.modules.get(y, x) === 1;
  const q = 4; // quiet zone
  const size = n + q * 2;

  const finder = (x: number, y: number) => x < 7 && y < 7 ? true : x >= n - 7 && y < 7 ? true : x < 7 && y >= n - 7;
  // centre hole for the logo (~22% of the code, well inside what level H can lose)
  const hole = Math.round(n * (o.logoScale ?? 0.22));
  const h0 = Math.floor((n - hole) / 2);
  const inHole = (x: number, y: number) => o.logo && x >= h0 - 1 && x < h0 + hole + 1 && y >= h0 - 1 && y < h0 + hole + 1;

  let dots = "";
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      if (!at(x, y) || finder(x, y) || inHole(x, y)) continue;
      dots += `<rect x="${x + q + 0.04}" y="${y + q + 0.04}" width="0.92" height="0.92" rx="0.3"/>`;
    }

  const eye = (x: number, y: number) =>
    `<rect x="${x + q + 0.5}" y="${y + q + 0.5}" width="6" height="6" rx="1.2" fill="none" stroke="${ink}" stroke-width="1"/>` +
    `<rect x="${x + q + 2}" y="${y + q + 2}" width="3" height="3" rx="0.6" fill="${ink}"/>`;

  const logo = o.logo
    ? `<rect x="${h0 + q - 0.5}" y="${h0 + q - 0.5}" width="${hole + 1}" height="${hole + 1}" rx="${(hole + 1) / 2}" fill="${paper}"/>` +
      `<image href="${o.logo}" x="${h0 + q + 0.6}" y="${h0 + q + 0.4}" width="${hole - 1.2}" height="${hole - 1.2}" preserveAspectRatio="xMidYMid meet"/>`
    : "";

  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" shape-rendering="geometricPrecision" role="img" aria-label="QR code: ${url}">` +
    `<rect width="${size}" height="${size}" fill="${paper}"/>` +
    `<g fill="${ink}">${dots}</g>${eye(0, 0)}${eye(n - 7, 0)}${eye(0, n - 7)}${logo}</svg>`;
  return { size, svg };
}
