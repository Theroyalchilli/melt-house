"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import DripEdge from "./DripEdge";
import Heading from "./Heading";
import { cafeMenu } from "../content";

const INTERVAL = 2600;

/** CafeMenu → one menu board: category pills on top, the open category in a flavour-coloured rounded panel. Steps through the categories by itself while on screen (for filming); a click takes over. */
export default function CafeMenu() {
  const { categories } = cafeMenu;
  const root = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto || prefersReducedMotion()) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.4 });
    io.observe(root.current!);
    const t = setInterval(() => visible && setI((cur) => (cur + 1) % categories.length), INTERVAL);
    return () => {
      clearInterval(t);
      io.disconnect();
    };
  }, [auto, categories.length]);

  const cat = categories[i];

  return (
    <section
      ref={root}
      id="menu"
      className="relative z-[1] bg-surface pt-[clamp(110px,13vw,200px)] pb-[clamp(80px,10vw,150px)]"
      data-record-label="Cafe menu (hold)"
      data-record-time="1.5"
      data-record-hold="6"
      data-record-align="center"
    >
      <DripEdge color="var(--strawberry)" layout={0} />
      <div className="container-x">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">{cafeMenu.eyebrow}</p>
            <Heading lines={cafeMenu.heading} className="mt-5 text-[clamp(48px,6vw,104px)]" />
          </div>
          <p className="max-w-[340px] text-[17px] leading-relaxed text-muted">{cafeMenu.text}</p>
        </div>

        <div role="tablist" aria-label="Menu categories" className="no-bar -mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:mt-14 md:flex-wrap md:px-0">
          {categories.map((c, n) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={n === i}
              onClick={() => {
                setAuto(false);
                setI(n);
              }}
              className={`shrink-0 rounded-full px-5 py-2.5 text-[15px] font-extrabold whitespace-nowrap transition-colors duration-300 ${
                n === i ? "bg-accent text-white" : "bg-bg text-fg hover:bg-[var(--strawberry)]"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* every category sits in the same grid cell, so the panel always keeps the tallest one's height and the page never jumps */}
        <div role="tabpanel" className="mt-6 grid rounded-[36px] p-6 transition-colors duration-500 md:p-12" style={{ backgroundColor: cat.tone }}>
          {categories.map((c, n) => {
            const on = n === i;
            return (
              <div
                key={c.id}
                aria-hidden={!on}
                className={`grid gap-6 [grid-area:1/1] md:grid-cols-[0.8fr_1.2fr] md:gap-10 ${on ? "" : "invisible"}`}
              >
                <div className={`flex flex-col ${on ? "menu-in" : "max-md:hidden"}`}>
                  <span className="tnum font-display text-[15px] text-fg/60">
                    {String(n + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}
                  </span>
                  <h3 className="font-display mt-3 text-[clamp(34px,4.6vw,76px)] leading-[0.95]">{c.name}</h3>
                  <p className="mt-4 text-[15px] font-bold text-fg/70">{c.items.length} on the menu</p>
                  {c.note && <p className="mt-4 hidden max-w-[320px] text-[16px] leading-relaxed text-fg/80 md:block">{c.note}</p>}
                </div>

                <ul className="grid content-start gap-3 sm:grid-cols-2">
                  {c.items.map((m, k) => (
                    <li
                      key={m.name}
                      className={`flex flex-col justify-center rounded-[22px] bg-white px-5 py-4 shadow-[var(--soft-shadow)] ${on ? "menu-in" : ""}`}
                      style={{ animationDelay: `${k * 60}ms` }}
                    >
                      {m.tag && <span className="tag mb-2 self-start !bg-[var(--strawberry)]">{m.tag}</span>}
                      <span className="font-display text-[clamp(18px,1.5vw,22px)] leading-tight">{m.name}</span>
                      {m.note && <span className="mt-1.5 text-[14px] leading-snug text-muted">{m.note}</span>}
                    </li>
                  ))}
                  {c.note && <li className="px-1 pt-1 text-[15px] leading-relaxed text-fg/80 sm:col-span-2 md:hidden">{c.note}</li>}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
