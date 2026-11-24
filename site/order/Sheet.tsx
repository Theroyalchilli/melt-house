"use client";

import { useEffect, useRef } from "react";

/** Bottom sheet on phones, centred card on laptops. Escape / backdrop closes it; the page behind does not scroll. */
export default function Sheet({ open, onClose, label, children }: { open: boolean; onClose: () => void; label: string; children: React.ReactNode }) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    panel.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="mh-sheet-wrap" role="dialog" aria-modal="true" aria-label={label}>
      <button type="button" aria-label="Close" className="mh-sheet-backdrop" onClick={onClose} />
      <div ref={panel} tabIndex={-1} className="mh-sheet">
        <button type="button" aria-label="Close" onClick={onClose} className="mh-sheet-x">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden>
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}
