"use client";

import { useEffect, useRef, useState } from "react";
import { prefersReducedMotion } from "@/lib/gsap";
import Lines from "./Lines";
import { menuIndex } from "../content";
import { gbp } from "../menu";

const STEP = 1900;

/** Editorial index of the five menu sections: big names with a hairline between, "from £" prices, and an arched photo that follows
 *  the hovered row. Steps through the rows by itself while on screen (filming); a hover takes over. Each row opens /menu at that section. */
export default function MenuIndex() {
  const root = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const list = menuIndex.sections;

  useEffect(() => {
    if (!auto || prefersReducedMotion()) return;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.35 });
    io.observe(root.current!);
    const t = setInterval(() => visible && setI((n) => (n + 1) % list.length), STEP);
    return () => {
      clearInterval(t);
      io.disconnect();
    };
  }, [auto, list.length]);

  return (
    <section
      ref={root}
      id="menu"
      className="relative py-[clamp(90px,11vw,170px)]"
      data-record-label="Menu index (hold)"
      data-record-time="1.5"
      data-record-hold="4"
      data-record-align="center"
    >
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow" data-reveal>
            {menuIndex.kicker}
          </p>
          <div data-reveal>
            <Lines lines={menuIndex.heading} className="mt-5 text-[clamp(44px,5.6vw,92px)] leading-[1]" />
          </div>
          {/* the arch that follows the active row */}
          <div data-reveal className="arch arch-line relative mt-10 hidden aspect-[4/5] w-full max-w-[300px] bg-[var(--cocoa)] lg:block">
            {list.map((s, n) => (
              <img
                key={s.id}
                src={s.image}
                alt=""
                className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-out ${n === i ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
              />
            ))}
            <span className="absolute bottom-5 left-1/2 z-[3] -translate-x-1/2 rounded-full bg-[var(--cocoa)]/85 px-4 py-1.5 text-[12px] font-medium tracking-[0.16em] whitespace-nowrap text-[#f5ebe0] uppercase backdrop-blur">
              {list[i].count} on the menu
            </span>
          </div>
        </div>

        <ol className="border-t border-[var(--text)]/15" onMouseLeave={() => setAuto(true)}>
          {list.map((s, n) => {
            const on = n === i;
            return (
              <li key={s.id} className="border-b border-[var(--text)]/15">
                <a
                  href={`/menu#${s.id}`}
                  onMouseEnter={() => {
                    setAuto(false);
                    setI(n);
                  }}
                  onFocus={() => setI(n)}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-4 py-6 md:gap-x-8 md:py-8"
                >
                  <span className={`tnum self-start pt-2 text-[13px] font-medium transition-colors ${on ? "text-accent" : "text-muted"}`}>0{n + 1}</span>
                  <span className="min-w-0">
                    <span className={`font-display block text-[clamp(30px,3.9vw,60px)] leading-[1.02] transition-[color,transform] duration-500 ${on ? "translate-x-2 text-fg" : "text-fg/45"}`}>
                      {s.name}
                    </span>
                    <span className={`serif-i mt-2 block text-[clamp(16px,1.3vw,19px)] transition-colors duration-500 ${on ? "text-muted" : "text-muted/70"}`}>{s.line}</span>
                  </span>
                  <span className="flex items-center gap-4">
                    <span className="hidden text-right sm:block">
                      <span className="block text-[12px] tracking-[0.16em] text-muted uppercase">from</span>
                      <span className="tnum text-[18px] font-semibold">{gbp(s.from)}</span>
                    </span>
                    <span
                      className={`grid h-12 w-12 place-items-center rounded-full border transition-all duration-500 ${
                        on ? "border-transparent bg-[var(--cocoa-2)] text-white" : "border-[var(--text)]/20"
                      }`}
                    >
                      <span aria-hidden className={`transition-transform duration-500 ${on ? "-rotate-45" : ""}`}>
                        →
                      </span>
                    </span>
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
