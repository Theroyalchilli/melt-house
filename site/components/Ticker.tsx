import { ticker } from "../content";

/** A thin chocolate band: favourites drift past in gold, separated by small drip hearts. */
export default function Ticker() {
  const row = [...ticker, ...ticker];
  return (
    <div className="relative overflow-hidden bg-[var(--cocoa)] py-5 text-[#f5ebe0] md:py-6" aria-label={ticker.join(", ")}>
      <div className="ticker-track flex w-max items-center" aria-hidden>
        {[0, 1].map((k) => (
          <div key={k} className="flex items-center">
            {row.map((t, i) => (
              <span key={`${k}-${i}`} className="flex items-center">
                <span className={`px-7 whitespace-nowrap md:px-10 ${i % 2 ? "serif-i text-[clamp(22px,2.4vw,34px)] text-[var(--gold-soft)]" : "text-[clamp(15px,1.5vw,20px)] font-medium tracking-[0.22em] uppercase"}`}>{t}</span>
                <svg viewBox="0 0 20 22" className="h-4 w-4 shrink-0 text-[var(--gold)]" aria-hidden>
                  <path d="M10 20s-8-5.2-8-11A4.5 4.5 0 0 1 10 6a4.5 4.5 0 0 1 8 3c0 5.8-8 11-8 11Z" fill="currentColor" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
