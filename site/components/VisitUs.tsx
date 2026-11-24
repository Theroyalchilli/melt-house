import Lines from "./Lines";
import { brand, visit } from "../content";

/** Visit: the lit sign on the left, address / hours / email as three hairline rows on the right. */
export default function VisitUs() {
  return (
    <section
      id="visit"
      className="relative py-[clamp(90px,11vw,160px)]"
      data-record-label="Visit"
      data-record-time="1.5"
      data-record-hold="2.5"
    >
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <div data-reveal className="relative">
          <div className="absolute -inset-6 rounded-[28px] bg-[radial-gradient(60%_60%_at_50%_50%,rgba(255,190,110,0.35),transparent_70%)]" />
          <img src={brand.sign} alt="Melt House sign: café, desserts, drinks, treats" width={1200} height={360} className="relative w-full rounded-[10px] shadow-[0_40px_70px_-40px_rgba(46,27,18,0.6)]" />
        </div>
        <div>
          <p className="eyebrow" data-reveal>
            {visit.kicker}
          </p>
          <div data-reveal>
            <Lines lines={visit.heading} className="mt-5 text-[clamp(44px,5.4vw,88px)] leading-[1]" />
          </div>
          <dl data-reveal="stagger" className="mt-10 border-t border-[var(--text)]/15">
            {[
              { k: "Find us", v: visit.address },
              { k: "Hours", v: visit.hours },
              { k: "Email", v: visit.email, href: `mailto:${visit.email}` },
            ].map((r) => (
              <div key={r.k} className="grid grid-cols-[110px_1fr] items-baseline gap-4 border-b border-[var(--text)]/15 py-5 md:grid-cols-[140px_1fr]">
                <dt className="text-[12px] font-semibold tracking-[0.2em] text-accent uppercase">{r.k}</dt>
                <dd className="text-[clamp(17px,1.4vw,20px)] font-medium">{r.href ? <a href={r.href} className="underline-offset-4 hover:underline">{r.v}</a> : r.v}</dd>
              </div>
            ))}
          </dl>
          <div data-reveal className="mt-9 flex flex-wrap gap-3">
            <a href={visit.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
              Get directions <span aria-hidden>↗</span>
            </a>
            <a href="/menu" className="btn btn-outline">
              Order ahead
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
