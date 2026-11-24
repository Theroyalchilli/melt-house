import { readFileSync } from "node:fs";
import { join } from "node:path";
import { qrSvg } from "@/site/qr";
import { ORDER } from "@/site/menu";

// The café’s ONE QR code as a standalone SVG file (heart embedded as PNG, so it works anywhere: printers, Canva, Word).
// npm run print saves it to print/menu-qr.svg + .png.
export const dynamic = "force-static";

export function GET() {
  const heart = readFileSync(join(process.cwd(), "public/images/melt/brand/heart-cutout.png")).toString("base64");
  const { svg } = qrSvg(ORDER.menuUrl, { logo: `data:image/png;base64,${heart}` });
  return new Response(svg, { headers: { "Content-Type": "image/svg+xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
