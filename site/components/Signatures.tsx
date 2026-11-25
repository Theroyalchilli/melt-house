import Lines from "./Lines";
import { signatures } from "../content";
import { gbp } from "../menu";

/** House signatures: five HD photo cards (4:5 photo, note pill, name, italic line, price, order arrow), gently staggered. Phone: swipe row. */
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

        <ul data-reveal="stagger" className="no-bar -mx-4 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mt-16 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0">
          {signatures.items.map((s, i) => (
            <li
              key={s.id}
              className={`group relative flex w-[74vw] max-w-[310px] shrink-0 snap-center flex-col overflow-hidden rounded-[22px] border border-line bg-surface transition-[transform,box-shadow] duration-500 hover:-translate-y-2 hover:shadow-[0_34px_60px_-30px_rgba(59,36,24,0.5)] lg:w-auto lg:max-w-none ${
                i % 2 ? "lg:mt-12" : ""
              }`}
            >
              {/* HD photo, with the note as a pill on top */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <img src={s.image} alt={s.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.07]" />
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[rgba(46,27,18,0.35)] to-transparent" />
                <span className="absolute top-3 left-3 rounded-full bg-surface/90 px-3 py-1.5 text-[12px] font-semibold tracking-[0.14em] text-accent uppercase backdrop-blur">{s.note}</span>
              </div>
              <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
                <h3 className="text-[18px] leading-snug font-semibold">{s.name}</h3>
                {s.desc && <p className="serif-i mt-1.5 line-clamp-2 text-[16px] leading-snug text-muted">{s.desc.replace(/^Our signature: (.)/, (_, c: string) => c.toUpperCase())}</p>}
                <div className="mt-auto flex items-center justify-between pt-4">
                  <span className="tnum text-[20px] font-semibold">
                    {s.sized && <span className="mr-1 text-[12px] font-medium text-muted">from</span>}
                    {gbp(s.price)}
                  </span>
                  <a href="/menu" aria-label={`Order ${s.name}`} className="grid h-10 w-10 place-items-center rounded-full bg-[var(--cocoa-2)] text-[18px] text-white transition-transform group-hover:rotate-[-45deg]">
                    →
                  </a>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
