import type { Metadata } from "next";
import { TableCard } from "@/site/print/PrintPieces";
import "@/site/print/print.css";

// A6 table card (105 × 148 mm). Print from the browser or run `npm run print` for the PDF.
export const metadata: Metadata = { title: "Table card (A6) — Melt House", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <div className="print-root">
      <style>{`@page { size: 105mm 148mm; margin: 0 } @media print { html, body { background: #efe0cc !important } }`}</style>
      <div className="sheet" style={{ width: "105mm" }}>
        <TableCard />
      </div>
    </div>
  );
}
