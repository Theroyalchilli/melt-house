import Lines from "./Lines";
import { offers } from "../content";
import { gbp } from "../menu";

/** Combos + Melt House Specials as two gold double-ruled chocolate panels, the same as the printed menu. */
export default function Offers() {
  const { combos, specials } = offers;
  return (
    <section
      id="offers"
      className="relative py-[clamp(90px,11vw,160px)]"
      data-record-label="Offers"
      data-record-time="1.5"
      data-record-hold="2.5"
    >
      <div className="container-x">
        <div className="text-center">
          <p className="eyebrow" data-reveal>
            {offers.kicker}
          </p>
          <div data-reveal>
            <Lines lines={offers.heading} className="mt-5 text-[clamp(44px,5.6vw,92px)] leading-[1]" />
          </div>
        </div>

        <div data-reveal="stagger" className="mx-auto mt-14 grid max-w-[1100px] gap-6 md:mt-20 lg:grid-cols-2 lg:gap-8">
          <article className="gold-panel px-7 py-10 md:px-12 md:py-12">
            <header className="text-center">
              <h3 className="text-[clamp(26px,2.4vw,34px)] font-semibold">{combos.title}</h3>
              <p className="serif-i mt-1 text-[20px] text-[var(--gold-soft)]">{combos.sub}</p>
            </header>
            <ul className="mt-8">
              {combos.items.map((c) => (
                <li key={c.name} className="flex items-baseline py-2.5 text-[17px]">
                  <span>{c.name}</span>
                  <span className="leader" />
                  <span className="tnum text-[19px] font-semibold text-[var(--gold)]">{gbp(c.price)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 border-t border-[var(--gold)]/25 pt-5 text-center text-[13px] leading-relaxed text-[#e8d3bb]">{combos.note}</p>
          </article>

          <article className="gold-panel px-7 py-10 md:px-12 md:py-12">
            <header className="text-center">
              <h3 className="text-[clamp(26px,2.4vw,34px)] font-semibold">{specials.title}</h3>
              <p className="serif-i mt-1 text-[20px] text-[var(--gold-soft)]">{specials.sub}</p>
            </header>
            <div className="mt-8 flex justify-end gap-2 text-[12px] font-semibold tracking-[0.18em] text-[var(--gold)] uppercase">
              <span className="w-16 text-right">Med</span>
              <span className="w-16 text-right">Large</span>
            </div>
            <ul>
              {specials.items.map((c) => (
                <li key={c.name} className="flex items-baseline py-2.5 text-[17px]">
                  <span>{c.name}</span>
                  <span className="leader" />
                  <span className="tnum w-16 text-right text-[19px] font-semibold text-[var(--gold)]">{gbp(c.m)}</span>
                  <span className="tnum w-16 text-right text-[19px] font-semibold text-[var(--gold)]">{gbp(c.l)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 border-t border-[var(--gold)]/25 pt-5 text-center text-[13px] leading-relaxed text-[#e8d3bb]">House favourites, brewed the Melt House way.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
