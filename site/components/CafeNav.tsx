"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { onReveal } from "./CafeLoader";
import { brand, nav } from "../content";
import { ORDER } from "../menu";

/** Full-width bar: transparent over the light hero, a frosted cream bar once you scroll. Brown text, chocolate "Order now" → /menu. */
export default function CafeNav() {
  const ref = useRef<HTMLElement>(null);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const off = onReveal(() => {
      if (!prefersReducedMotion()) gsap.from(ref.current, { y: -30, opacity: 0, duration: 0.9, delay: 0.25, ease: "power3.out" });
    });
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.75);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      off();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
  }, [open]);

  return (
    <>
      <header
        ref={ref}
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500 ${
          solid ? "bg-[color-mix(in_srgb,var(--bg)_92%,transparent)] text-fg shadow-[0_1px_0_var(--line)] backdrop-blur-md" : "text-fg"
        }`}
      >
        <div className="container-x flex h-[72px] items-center gap-6 md:h-[84px]">
          <a href="#" aria-label="Melt House, home" className="flex items-center gap-3">
            <img src={brand.heart} alt="" width={40} height={44} className="h-9 w-auto sm:h-10" />
            <span className="flex flex-col leading-none">
              <span className="text-[15px] font-semibold tracking-[0.16em] whitespace-nowrap uppercase sm:text-[17px] sm:tracking-[0.18em]">Melt House</span>
            </span>
          </a>
          <nav className="ml-auto hidden items-center gap-9 lg:flex">
            {nav.links.map((l) => (
              <a key={l.label} href={l.href} className="group relative text-[14px] font-medium tracking-[0.04em]">
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2 lg:ml-4">
            <a href={nav.cta.href} className={`btn !px-4 !py-2.5 text-[14px] whitespace-nowrap sm:!px-5 sm:!py-3 btn-solid`}>
              <span className="sm:hidden">Order</span>
              <span className="max-sm:hidden">{nav.cta.label}</span>
              <span aria-hidden>→</span>
            </a>
            <button type="button" onClick={() => setOpen(true)} aria-label="Open menu" className="grid h-11 w-11 place-items-center rounded-full lg:hidden">
              <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden>
                <path d="M4 8h16M4 16h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="sign-wall fixed inset-0 z-[70] flex flex-col text-fg">
          <div className="flex items-center justify-between px-5 pt-4">
            <img src={brand.heart} alt="" className="heart-halo h-10 w-auto" />
            <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-11 w-11 place-items-center rounded-full border border-[var(--text)]/20 bg-surface/60">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
            {nav.links.map((l) => (
              <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="font-display py-1 text-[clamp(40px,11vw,64px)]">
                {l.label}
              </a>
            ))}
            <a href={nav.cta.href} className="btn btn-solid mt-8 self-start">
              Order from the menu →
            </a>
          </nav>
          <p className="px-6 pb-8 text-[13px] leading-relaxed text-muted">
            {ORDER.hours}
            <br />
            {ORDER.address}
          </p>
        </div>
      )}
    </>
  );
}
