import DripEdge from "./DripEdge";
import Heading from "./Heading";
import Photo from "./Photo";
import type { MenuItem } from "../content";

type MenuData = { eyebrow: string; heading: string[]; text: string; unit: string; items: MenuItem[] };

/** MenuMenu → the same rounded-card grid used for Coffee, Sundaes and Shakes: a photo band up top (placeholder until real shots are in), name, note and price below. */
export default function MenuMenu({
  id,
  data,
  band,
  edge,
  layout,
}: {
  id: string;
  data: MenuData;
  band?: string;
  edge: string;
  layout: 0 | 1 | 2;
}) {
  return (
    <section
      id={id}
      className="relative z-[1] pt-[clamp(110px,13vw,200px)] pb-[clamp(80px,10vw,150px)]"
      style={band ? { background: band } : undefined}
      data-record-label={`${data.eyebrow} (hold)`}
      data-record-time="1.5"
      data-record-hold="1.5"
      data-record-align="center"
    >
      <DripEdge color={edge} layout={layout} />
      <div className="container-x">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">{data.eyebrow}</p>
            <Heading lines={data.heading} className="mt-5 text-[clamp(48px,6vw,104px)]" />
          </div>
          <p className="max-w-[340px] text-[17px] leading-relaxed text-muted">{data.text}</p>
        </div>

        <div data-reveal="stagger" className="mt-12 grid grid-cols-2 gap-x-3 gap-y-5 md:mt-16 lg:grid-cols-3 lg:gap-7">
          {data.items.map((m) => (
            <article key={m.id} className="flex flex-col overflow-hidden rounded-[28px] bg-white shadow-[var(--soft-shadow)] transition-transform duration-500 hover:-translate-y-2">
              <div className="aspect-[4/3] overflow-hidden">
                <Photo tone={m.tone} hint={m.hint} alt={m.name} />
              </div>
              <div className="flex flex-1 flex-col p-5 md:p-6">
                {m.tag && <span className="tag self-start">{m.tag}</span>}
                <h3 className="font-display mt-3 text-[clamp(20px,2vw,28px)]">{m.name}</h3>
                <p className="mt-2 text-[14px] leading-snug text-muted md:text-[15px]">{m.note}</p>
                <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                  <span className="tnum font-display text-[22px] text-accent">
                    £{m.price.toFixed(2)} <span className="font-body text-[13px] font-bold text-muted">{data.unit}</span>
                  </span>
                  <button aria-label={`Add ${m.name}`} className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent text-[22px] leading-none font-bold text-white shadow-[0_4px_0_var(--accent-deep)] transition-transform hover:translate-y-[2px]">
                    +
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
