import Lines from "./Lines";
import { chai } from "../content";
import { gbp } from "../menu";

/** Hot drinks on light paper: two gold-ringed medallions with rising steam, and a MED / LARGE price card (cream, gold double rule) like the printed menu. */
export default function ChaiBand() {
  return (
    <section
      className="relative overflow-hidden bg-bg py-[clamp(90px,11vw,160px)] text-fg"
      data-record-label="Chai"
      data-record-time="1.5"
      data-record-hold="2.5"
    >
      <div aria-hidden className="absolute top-[-20%] right-[-10%] h-[80vh] w-[80vh] rounded-full bg-[radial-gradient(circle,rgba(255,206,140,0.45),transparent_62%)]" />
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <div>
          <p className="eyebrow" data-reveal>
            {chai.kicker}
          </p>
          <div data-reveal>
            <Lines lines={chai.heading} className="mt-5 text-[clamp(42px,5.4vw,88px)] leading-[1.02]" />
          </div>
          <p data-reveal className="mt-6 max-w-[440px] text-[17px] leading-relaxed text-muted">
            {chai.text}
          </p>

          <div data-reveal className="cream-card mt-10 max-w-[500px] p-6 md:p-8">
            <div className="flex justify-end gap-2 pb-2 text-[12px] font-semibold tracking-[0.18em] text-accent uppercase">
              <span className="w-16 text-right">Med</span>
              <span className="w-16 text-right">Large</span>
            </div>
            <ul>
              {chai.list.map((d) => (
                <li key={d.name} className="flex items-baseline py-2 text-[16px]">
                  <span>{d.name}</span>
                  <span className="leader" />
                  <span className="tnum w-16 text-right font-semibold text-accent">{gbp(d.m)}</span>
                  <span className="tnum w-16 text-right font-semibold text-accent">{d.l ? gbp(d.l) : "—"}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[460px]">
          {/* steam */}
          <svg aria-hidden viewBox="0 0 120 160" className="absolute top-[-4%] left-[22%] z-[3] h-[34%] text-[#b5793a]/45">
            {[20, 55, 90].map((x, i) => (
              <path key={x} d={`M${x} 150 C ${x - 18} 115, ${x + 18} 95, ${x} 60 S ${x + 14} 20, ${x} 5`} fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" className="steam" style={{ animationDelay: `${i * 0.9}s` }} />
            ))}
          </svg>
          <div className="absolute top-[12%] left-0 h-[62%] w-[62%] rounded-full bg-surface p-[7px] shadow-[0_0_0_1px_#c9965c,0_40px_70px_-34px_rgba(59,36,24,0.55)]" data-parallax="0.08">
            <img src={chai.images[0]} alt="Masala chai in a glass with spices" className="h-full w-full rounded-full object-cover" />
          </div>
          <div className="absolute right-0 bottom-[4%] z-[2] h-[50%] w-[50%] rounded-full bg-surface p-[7px] shadow-[0_0_0_1px_#c9965c,0_40px_70px_-34px_rgba(59,36,24,0.55)]" data-parallax="-0.06">
            <img src={chai.images[1]} alt="Latte with latte art" className="h-full w-full rounded-full object-cover" />
          </div>
          <span className="serif-i absolute right-[6%] top-[14%] z-[3] rotate-[8deg] text-[clamp(22px,2.2vw,30px)] text-accent">brewed slow</span>
        </div>
      </div>
    </section>
  );
}
