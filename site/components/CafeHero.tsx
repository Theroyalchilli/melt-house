"use client";

import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { onReveal } from "./CafeLoader";
import Lines from "./Lines";
import { brand, hero } from "../content";
import { ORDER } from "../menu";

/** The sign wall: cream-to-tan with a warm glow, the chocolate drip heart with its golden halo, a three-line promise, and four arched photos stepping into the page. */
export default function CafeHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const off = onReveal(() => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(el);
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(q("[data-h-line] > span"), { yPercent: 110, duration: 1.1, stagger: 0.12 }, 0)
        .from(q("[data-h-fade]"), { y: 18, opacity: 0, duration: 0.9, stagger: 0.08 }, 0.35)
        .from(q("[data-h-heart]"), { scale: 0.9, opacity: 0, duration: 1.4, ease: "power2.out" }, 0.1)
        .from(q("[data-h-arch]"), { yPercent: 40, opacity: 0, duration: 1.1, stagger: 0.09 }, 0.45);
    });
    return off;
  }, []);

  return (
    <section
      ref={root}
      className="sign-wall relative text-fg"
      data-record-label="Hero"
      data-record-time="0"
      data-record-hold="3.5"
    >

      <div className="container-x relative grid min-h-[100svh] items-center gap-8 pt-28 pb-[clamp(140px,15vw,220px)] lg:grid-cols-[1.45fr_0.55fr] lg:pt-24">
        <div className="relative z-[1] max-lg:order-2">
          <p data-h-fade className="eyebrow">
            {hero.kicker}
          </p>
          <div className="mt-6 overflow-hidden" data-h-line>
            <Lines as="h1" lines={hero.lines} className="text-[clamp(38px,5.4vw,88px)] leading-[1.02] [&>span]:pb-[0.06em]" />
          </div>
          <p data-h-fade className="mt-7 max-w-[470px] text-[clamp(16px,1.25vw,18px)] leading-relaxed text-muted">
            {hero.text}
          </p>
          <div data-h-fade className="mt-9 flex flex-wrap gap-3">
            <a href={hero.ctas[0].href} className="btn btn-solid">
              {hero.ctas[0].label} <span aria-hidden>→</span>
            </a>
            <a href={hero.ctas[1].href} className="btn btn-outline">
              {hero.ctas[1].label}
            </a>
          </div>
          <p data-h-fade className="mt-9 flex items-center gap-3 text-[13px] font-medium tracking-[0.06em] text-muted">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3f9a52] opacity-50" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#3f9a52]" />
            </span>
            {ORDER.hours}
          </p>
        </div>

        <div className="relative flex justify-center max-lg:order-1 max-lg:pt-2" data-parallax="-0.12">
          <div data-h-heart className="float-y">
            <img src={brand.heart} alt="Melt House drip heart" width={529} height={580} className="heart-halo halo-breathe h-auto w-[clamp(170px,24vw,400px)]" />
          </div>
        </div>
      </div>

      {/* four arches: half on the sign wall, half on the cream page below */}
      <div className="container-x absolute inset-x-0 bottom-0 z-[2] translate-y-1/2">
        {/* HD photos (1000 px), so the arches can be generous */}
        <div className="mx-auto grid max-w-[1160px] grid-cols-4 items-end gap-[clamp(8px,1.6vw,24px)]">
          {hero.arches.map((a, i) => (
            <div key={a.src} data-h-arch className={`arch arch-line aspect-[4/5] shadow-[0_30px_60px_-28px_rgba(59,36,24,0.55)] ${i % 2 ? "lg:-translate-y-8" : ""}`}>
              <img src={a.src} alt={a.alt} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
