import Lines from "./Lines";
import { gelato } from "../content";
import { gbp } from "../menu";

const DOT: Record<string, string> = {
  "Madagascar vanilla": "#f3e2b8",
  "Belgian chocolate": "#5a3322",
  Strawberry: "#f19ab0",
  Mango: "#f8be3c",
  Pistachio: "#a9cf8a",
  "Cookies & cream": "#d9d2c8",
};

// five scoops in a loose pyramid; each drifts at its own scroll speed
const PLACE = [
  { cls: "left-[2%] bottom-[4%] w-[40%]", depth: "0.06" },
  { cls: "left-[31%] bottom-[0%] w-[40%] z-[2]", depth: "0.1" },
  { cls: "right-[0%] bottom-[5%] w-[38%]", depth: "0.05" },
  { cls: "left-[15%] bottom-[33%] w-[37%] z-[1]", depth: "0.16" },
  { cls: "right-[13%] bottom-[35%] w-[36%]", depth: "0.2" },
];

/** Gelato on a warm tan wall: a pyramid of scoops on the left, flavours + a printed-menu price list on the right. */
export default function GelatoBar() {
  return (
    <section
      className="relative overflow-hidden bg-[var(--paper-2)] py-[clamp(90px,11vw,160px)]"
      data-record-label="Gelato"
      data-record-time="1.5"
      data-record-hold="2.5"
    >
      <div aria-hidden className="absolute top-1/2 left-[-10%] h-[80vh] w-[80vh] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.7),transparent_65%)]" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative mx-auto aspect-square w-full max-w-[560px]">
          {gelato.scoops.map((s, i) => (
            <div key={s.src} className={`absolute ${PLACE[i].cls}`} data-parallax={PLACE[i].depth}>
              <img src={s.src} alt={s.alt} className="w-full drop-shadow-[0_26px_26px_rgba(59,36,24,0.28)]" />
            </div>
          ))}
        </div>

        <div>
          <p className="eyebrow" data-reveal>
            {gelato.kicker}
          </p>
          <div data-reveal>
            <Lines lines={gelato.heading} className="mt-5 text-[clamp(42px,5.2vw,84px)] leading-[1.02]" />
          </div>
          <p data-reveal className="mt-6 max-w-[460px] text-[17px] leading-relaxed text-muted">
            {gelato.text}
          </p>
          <ul data-reveal="stagger" className="mt-8 flex flex-wrap gap-2">
            {gelato.flavours.map((f) => (
              <li key={f} className="flex items-center gap-2 rounded-full border border-[var(--text)]/15 bg-surface/70 py-2 pr-4 pl-2.5 text-[14px] font-medium">
                <span className="h-4 w-4 rounded-full shadow-[inset_0_-2px_0_rgba(0,0,0,0.12)]" style={{ background: DOT[f] }} />
                {f}
              </li>
            ))}
          </ul>
          <ul data-reveal="stagger" className="mt-10 max-w-[480px]">
            {gelato.prices.map((p) => (
              <li key={p.label} className="flex items-baseline py-2.5 text-[17px]">
                <span className="font-medium">{p.label}</span>
                <span className="leader" />
                <span className="tnum font-semibold">{gbp(p.price)}</span>
              </li>
            ))}
          </ul>
          <a href="/menu#bakery" data-reveal className="btn btn-solid mt-9">
            Choose your scoops <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
