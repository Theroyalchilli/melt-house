import Lines from "./Lines";
import { brand, scan } from "../content";
import { qrSvg } from "../qr";

/** The QR moment: a cream table-tent card (gold double rule) with the real, scannable code (the same one printed in the café) next to three steps. */
export default function ScanToOrder() {
  const { svg } = qrSvg(scan.url, { logo: brand.heart });
  return (
    <section
      id="order"
      className="relative overflow-hidden bg-[var(--tan)] py-[clamp(90px,11vw,160px)]"
      data-record-label="Scan to order"
      data-record-time="1.5"
      data-record-hold="3"
    >
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_70%_at_30%_50%,rgba(255,244,228,0.75),transparent_70%)]" />
      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        {/* table tent */}
        <div data-reveal className="relative mx-auto w-full max-w-[400px]">
          <div className="relative rotate-[-3deg] rounded-[18px] bg-surface p-3 shadow-[0_50px_80px_-40px_rgba(46,27,18,0.6)] transition-transform duration-700 hover:rotate-0">
            <div className="rounded-[10px] border border-[#b5793a]/55 bg-[radial-gradient(70%_40%_at_50%_12%,rgba(255,206,140,0.45),transparent_70%)] px-7 pt-7 pb-8 text-center text-fg outline outline-1 -outline-offset-[6px] outline-[#b5793a]/25">
              <img src={brand.heart} alt="" className="heart-halo mx-auto h-12 w-auto" />
              <p className="mt-3 text-[15px] font-semibold tracking-[0.3em] uppercase">Melt House</p>
              <p className="serif-i mt-1 text-[19px] text-accent">Scan · Order · Enjoy</p>
              <div className="mx-auto mt-5 w-full max-w-[260px] overflow-hidden rounded-[12px] border border-line bg-[#fffaf3] p-2" dangerouslySetInnerHTML={{ __html: svg }} />
              <p className="mt-5 text-[12px] tracking-[0.12em] text-muted uppercase">Pay at the counter</p>
            </div>
          </div>
        </div>

        <div>
          <p className="eyebrow" data-reveal>
            {scan.kicker}
          </p>
          <div data-reveal>
            <Lines lines={scan.heading} className="mt-5 text-[clamp(46px,6vw,100px)] leading-[0.98]" />
          </div>
          <ol data-reveal="stagger" className="mt-10 grid gap-3">
            {scan.steps.map((s) => (
              <li key={s.n} className="flex items-start gap-5 rounded-[16px] bg-surface/75 p-5 backdrop-blur md:p-6">
                <span className="tnum font-display text-[28px] text-accent">{s.n}</span>
                <span>
                  <span className="block text-[18px] font-semibold">{s.title}</span>
                  <span className="mt-1 block text-[15px] leading-relaxed text-muted">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>
          <div data-reveal className="mt-9 flex flex-wrap items-center gap-4">
            <a href="/menu" className="btn btn-solid">
              Open the menu <span aria-hidden>→</span>
            </a>
            <span className="text-[14px] text-muted">On your phone already? Just tap.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
