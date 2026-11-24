import type { Metadata } from "next";
import { TableCard } from "@/site/print/PrintPieces";
import "@/site/print/print.css";

// Four A6 table cards on one A4 sheet, with dashed cut lines: print at home at 100 % ("actual size") and cut.
export const metadata: Metadata = { title: "Table cards, 4 on A4 — Melt House", robots: { index: false, follow: false } };

export default function Page() {
  return (
    <div className="print-root">
      <style>{`@page { size: A4; margin: 0 }`}</style>
      <div className="sheet pc-a4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i}>
            <TableCard />
          </div>
        ))}
      </div>
    </div>
  );
}
