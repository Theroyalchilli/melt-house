import Lines from "./Lines";
import { signatures } from "../content";
import { gbp } from "../menu";

/** House signatures: five paper cards, each with a round gold-ringed photo medallion (like the printed menu), a note, price and a link to order. Phone: swipe row. */
export default function Signatures() {
  return (
    <section
      id="signatures"
      className="relative pt-[clamp(110px,17vw,230px)] pb-[clamp(80px,9vw,140px)]"
      data-record-label="Signatures"
      data-record-time="1.5"
      data-record-hold="2.5"
    >
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow" data-reveal>
              {signatures.kicker}
            </p>
            <div data-reveal>
              <Lines lines={signatures.heading} className="mt-5 text-[clamp(40px,5.2vw,84px)] leading-[1.02]" />
            </div>
          </div>
          <a href="/menu" data-reveal className="group inline-flex items-center gap-2 self-start text-[15px] font-medium md:self-auto">
            <span className="border-b border-current pb-0.5">See the full menu</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        <ul data-reveal="stagger" className="no-bar -mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pt-14 pb-4 md:mt-16 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0">
          {signatures.items.map((s, i) => (
            <li
              key={s.id}
              className={`group relative w-[72vw] max-w-[300px] shrink-0 snap-center rounded-[22px] border border-line bg-surface px-6 pt-[86px] pb-6 text-center transition-[transform,box-shadow] duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-30px_rgba(59,36,24,0.45)] lg:w-auto lg:max-w-none ${
                i % 2 ? "lg:mt-10" : ""
              }`}
            >
              <div className="absolute -top-14 left-1/2 h-[136px] w-[136px] -translate-x-1/2 rounded-full bg-surface p-[5px] shadow-[0_0_0_1px_var(--gold),0_18px_30px_-16px_rgba(59,36,24,0.5)]">
                <img src={s.image} alt={s.name} className="h-full w-full rounded-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <p className="text-[12px] font-semibold tracking-[0.24em] text-accent uppercase">{s.note}</p>
              <h3 className="mt-2.5 text-[19px] leading-snug font-semibold">{s.name}</h3>
              {s.desc && <p className="serif-i mt-2 line-clamp-3 text-[16.5px] leading-snug text-muted">{s.desc.replace(/^Our signature: (.)/, (_, c: string) => c.toUpperCase())}</p>}
              <div className="mt-5 flex items-center justify-between border-t border-dashed border-line pt-4">
                <span className="tnum text-[20px] font-semibold">
                  {s.sized && <span className="mr-1 text-[12px] font-medium text-muted">from</span>}
                  {gbp(s.price)}
                </span>
                <a href="/menu" aria-label={`Order ${s.name}`} className="grid h-10 w-10 place-items-center rounded-full bg-[var(--cocoa-2)] text-[18px] text-white transition-transform group-hover:rotate-[-45deg]">
                  →
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
