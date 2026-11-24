"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { atFromUrl, waitForClock } from "@/lib/atTime";

// Fixed-length loader (meta.loader = false switches the engine one off). With &at=HH:MM:SS it holds its
// first frame until that time while every image preloads (docs/RECORDING.md).

const GLOW = 1.5; // the sign "switches on": heart glows in, name and line appear
const LIFT = 0.8; // the dark wall lifts away
export const LOADER_SECONDS = GLOW + LIFT;

let revealed = false;
/** Run once the loader has lifted (immediately with ?static=1 / reduced motion). */
export function onReveal(fn: () => void) {
  if (revealed) {
    fn();
    return () => {};
  }
  const h = () => fn();
  window.addEventListener("melt:reveal", h, { once: true });
  return () => window.removeEventListener("melt:reveal", h);
}
function reveal() {
  if (revealed) return;
  revealed = true;
  window.dispatchEvent(new Event("melt:reveal"));
}

const loadImage = (src: string) =>
  new Promise<void>((done) => {
    const img = new Image();
    img.onload = img.onerror = () => done();
    img.src = src;
  });
async function preloadAll() {
  const urls = [...new Set(Array.from(document.images).map((i) => i.currentSrc || i.src).filter(Boolean))];
  await Promise.all([...urls.map(loadImage), document.fonts.ready]);
}

/** The backlit sign switching on: the drip heart flickers into a warm glow, MELT HOUSE spaces out, then the wall lifts. */
export default function CafeLoader({ heart }: { heart: string }) {
  const root = useRef<HTMLDivElement>(null);
  const heartEl = useRef<HTMLImageElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("static")) document.documentElement.classList.add("is-static");
    if (prefersReducedMotion() || document.documentElement.classList.contains("is-static")) {
      setGone(true);
      reveal();
      return;
    }
    window.scrollTo(0, 0);
    window.__lenis?.stop();

    const target = atFromUrl();
    let ready = !target;
    let cancelClock = () => {};
    if (target) preloadAll().then(() => (ready = true));

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: !!target });
      tl.fromTo(heartEl.current, { opacity: 0, scale: 0.94, filter: "brightness(0.4) drop-shadow(0 0 0 rgba(255,180,95,0))" }, { opacity: 1, scale: 1, filter: "brightness(1) drop-shadow(0 0 36px rgba(255,180,95,0.7))", duration: 0.9, ease: "power2.out" }, 0.05)
        .fromTo(heartEl.current, { opacity: 1 }, { opacity: 0.55, duration: 0.06, yoyo: true, repeat: 3, ease: "none" }, 0.25) // the neon flicker
        .fromTo(word.current, { letterSpacing: "0.05em", opacity: 0 }, { letterSpacing: "0.32em", opacity: 1, duration: 0.9, ease: "power3.out" }, 0.45)
        .fromTo(line.current, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power3.inOut" }, 0.7)
        .add(() => {
          if (ready) return;
          tl.pause();
          const wait = () => (ready ? tl.play() : requestAnimationFrame(wait));
          wait();
        }, GLOW - 0.05)
        .to(root.current, { yPercent: -100, duration: LIFT, ease: "power3.inOut" }, GLOW)
        .add(() => {
          window.__lenis?.start();
          reveal();
        }, GLOW + LIFT * 0.3)
        .add(() => setGone(true), LOADER_SECONDS);

      if (target) cancelClock = waitForClock(target, () => tl.play(0));
    });
    return () => {
      cancelClock();
      ctx.revert();
    };
  }, []);

  if (gone) return null;
  return (
    <div ref={root} aria-hidden className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-7 bg-[var(--cocoa)]">
      <div className="absolute inset-0 bg-[radial-gradient(50%_45%_at_50%_45%,rgba(224,173,102,0.18),transparent_70%)]" />
      <img ref={heartEl} src={heart} alt="" className="relative h-[24vh] w-auto" style={{ opacity: 0 }} />
      <div className="relative flex flex-col items-center gap-3">
        <div ref={word} className="pl-[0.32em] text-[clamp(20px,2.4vw,30px)] font-semibold text-[#f5ebe0] uppercase" style={{ opacity: 0, letterSpacing: "0.32em" }}>
          Melt House
        </div>
        <div ref={line} className="h-px w-[220px] origin-center bg-[var(--gold)]" style={{ transform: "scaleX(0)" }} />
        <div className="text-[12px] font-medium tracking-[0.34em] text-[var(--gold)] uppercase">Café · Desserts · Drinks · Treats</div>
      </div>
    </div>
  );
}
