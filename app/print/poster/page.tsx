import type { Metadata } from "next";
import { Poster } from "@/site/print/PrintPieces";
import "@/site/print/print.css";

// A5 counter / window poster (148 × 210 mm).
export const metadata: Metadata = { title: "Counter poster (A5) — Melt House", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <div className="print-root">
      <style>{`@page { size: A5; margin: 0 } @media print { html, body { background: #f5ebe0 !important } }`}</style>
      <div className="sheet" style={{ width: "148mm" }}>
        <Poster />
      </div>
    </div>
  );
}
