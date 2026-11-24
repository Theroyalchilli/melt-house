"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import Lines from "./Lines";
import { brand, footer } from "../content";
import { ORDER } from "../menu";

// cream drips hanging into the chocolate: x centre, half width, length (viewBox 1440 × 150)
const DRIPS = [
  [70, 22, 70], [190, 16, 46], [300, 26, 108], [430, 14, 40], [540, 20, 84], [680, 30, 128], [800, 15, 52],
  [905, 22, 92], [1030, 17, 58], [1150, 28, 118], [1270, 16, 50], [1380, 22, 86],
];
const drip = ([x, w, len]: number[]) =>
  `M${x - w * 1.6} 0 C${x - w * 0.9} 0 ${x - w} ${len * 0.35} ${x - w} ${len - w} A${w} ${w} 0 0 0 ${x + w} ${len - w} C${x + w} ${len * 0.35} ${x + w * 0.9} 0 ${x + w * 1.6} 0 Z`;

/** Live "open now" badge from UK time (hours in ORDER). Rendered after mount so server and client HTML match. */
function useOpenStatus() {
  const [status, setStatus] = useState<{ open: boolean; text: string } | null>(null);
  useEffect(() => {
    const tick = () => {
      const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", hour: "numeric", minute: "numeric", hour12: false }).formatToParts(new Date());
      const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0) % 24;
      const open = h >= ORDER.openHour && h < ORDER.closeHour;
      const fmt = (x: number) => (x % 24 === 0 ? "midnight" : x === 12 ? "12 pm" : x > 12 ? `${x - 12} pm` : `${x} am`);
      setStatus(open ? { open, text: `Open now · until ${fmt(ORDER.closeHour)}` } : { open, text: `Closed · opens at ${fmt(ORDER.openHour)}` });
    };
    tick();
    const t = setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, []);
  return status;
}

/** Closing scene: cream melts into chocolate, a last invitation with a live open/closed card, four info columns,
 *  and a giant MELT ♥ HOUSE that fills with gold as the page reaches its end. */
export default function CafeFooter() {
  const root = useRef<HTMLElement>(null);
  const status = useOpenStatus();

  useEffect(() => {
    if (prefersReducedMotion() || document.documentElement.classList.contains("is-static")) return;
    const el = root.current!;
    const q = gsap.utils.selector(el);
    const ctx = gsap.context(() => {
      // drips stretch as the footer comes up
      gsap.fromTo(q("[data-drip]"), { scaleY: 0.35 }, { scaleY: 1, ease: "none", stagger: { each: 0.04, from: "random" }, scrollTrigger: { trigger: el, start: "top bottom", end: "top 25%", scrub: 0.6 } });
      // the gold fills the wordmark left to right over the last stretch of the page
      gsap.fromTo(q("[data-fill]"), { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", ease: "none", scrollTrigger: { trigger: q("[data-word]")[0], start: "top bottom", end: "bottom bottom", scrub: 0.6 } });
    }, el);
    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.6 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const col = "text-[12px] font-semibold tracking-[0.28em] text-[var(--gold)] uppercase";
  const link = "group inline-flex items-center text-[15px] text-[#f5ebe0]/85 transition-colors hover:text-[#fff]";
  const dash = <span aria-hidden className="h-px w-0 bg-[var(--gold)] transition-all duration-300 group-hover:mr-2 group-hover:w-4" />;

  return (
    <footer
      ref={root}
      className="on-dark relative overflow-hidden bg-[var(--cocoa)] text-[#f5ebe0]"
      data-record-label="Footer"
      data-record-time="1.5"
      data-record-hold="2.5"
      data-record-align="bottom"
    >
      {/* cream melting into the chocolate */}
      <svg aria-hidden viewBox="0 0 1440 150" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-[clamp(60px,10vw,150px)] w-full text-bg">
        <rect width="1440" height="2" fill="currentColor" />
        {DRIPS.map((d, i) => (
          <path key={i} data-drip d={drip(d)} fill="currentColor" style={{ transformBox: "fill-box", transformOrigin: "50% 0%" }} />
        ))}
      </svg>

      {/* warm light pools */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute top-[18%] left-[-12%] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,rgba(224,173,102,0.16),transparent_65%)]" />
        <div className="absolute right-[-15%] bottom-[-25%] h-[90vh] w-[90vh] rounded-full bg-[radial-gradient(circle,rgba(224,173,102,0.2),transparent_62%)]" />
      </div>

      <div className="container-x relative pt-[clamp(120px,15vw,220px)]">
        {/* 1 · the last invitation */}
        <div className="grid items-end gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
          <div>
            <p className="eyebrow">Come in, sit down</p>
            <Lines lines={["Your table", "is *waiting*."]} className="mt-5 text-[clamp(46px,6.6vw,112px)] leading-[0.98]" />
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="/menu" className="btn btn-gold">
                Order from the menu <span aria-hidden>→</span>
              </a>
              <a href={footer.mapUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Get directions <span aria-hidden>↗</span>
              </a>
            </div>
          </div>

          {/* live open / closed card */}
          <div className="relative rounded-[22px] border border-[var(--gold)]/35 bg-white/[0.04] p-7 backdrop-blur-sm md:p-8">
            <div className="flex items-center justify-between gap-4">
              <span className={col}>Today</span>
              <span className={`inline-flex min-h-[30px] items-center gap-2 rounded-full px-3 text-[12.5px] font-medium transition-opacity duration-500 ${status ? "opacity-100" : "opacity-0"} ${status?.open ? "bg-[#7fd18b]/15 text-[#a6e5ae]" : "bg-white/10 text-[#e8d3bb]"}`}>
                <span className={`h-2 w-2 rounded-full ${status?.open ? "animate-pulse bg-[#7fd18b]" : "bg-[#e8d3bb]/60"}`} />
                {status?.text ?? "…"}
              </span>
            </div>
            <p className="mt-5 flex items-baseline gap-3 font-semibold">
              <span className="text-[clamp(34px,3.4vw,46px)] leading-none">12 pm</span>
              <span className="serif-i text-[24px] text-[var(--gold-soft)]">to</span>
              <span className="text-[clamp(34px,3.4vw,46px)] leading-none">12 am</span>
            </p>
            <p className="mt-3 text-[14px] text-[#e8d3bb]">Every day · late-night desserts &amp; chai</p>
            <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5 text-[14px]">
              <img src={brand.heart} alt="" className="heart-lit h-7 w-auto" />
              <span className="text-[#e8d3bb]">{ORDER.address}</span>
            </div>
          </div>
        </div>

        {/* 2 · four columns */}
        <div className="mt-[clamp(70px,8vw,120px)] grid gap-12 border-t border-white/12 pt-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.8fr_1fr_1fr] lg:gap-10">
          <div className="max-w-[340px]">
            <a href="#" className="flex items-center gap-3" aria-label="Melt House, back to top">
              <img src={brand.heart} alt="" className="heart-lit h-11 w-auto" />
              <span className="flex flex-col leading-none">
                <span className="text-[18px] font-semibold tracking-[0.2em] uppercase">Melt House</span>
                <span className="mt-1.5 text-[12px] tracking-[0.16em] text-[var(--gold)] uppercase">{brand.tagline}</span>
              </span>
            </a>
            <p className="serif-i mt-6 text-[20px] leading-snug text-[#e8d3bb]">{footer.story}</p>
          </div>

          <nav aria-label="Footer">
            <p className={col}>Explore</p>
            <ul className="mt-5 grid gap-3">
              {footer.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className={link}>
                    {dash}
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className={col}>Visit</p>
            <address className="mt-5 text-[15px] leading-relaxed text-[#f5ebe0]/85 not-italic">
              45 Kingsley Road
              <br />
              Hounslow TW3 1PA
            </address>
            <a href={footer.mapUrl} target="_blank" rel="noopener noreferrer" className={`${link} mt-4`}>
              {dash}
              Open in Maps ↗
            </a>
          </div>

          <div>
            <p className={col}>Contact</p>
            <ul className="mt-5 grid gap-3">
              <li>
                <a href={`mailto:${ORDER.email}`} className={link}>
                  {dash}
                  {ORDER.email}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/${ORDER.whatsapp}`} target="_blank" rel="noopener noreferrer" className={link}>
                  {dash}
                  WhatsApp {ORDER.whatsappDisplay}
                </a>
              </li>
              <li>
                <a href="/" className={link}>
                  {dash}
                  melthouse.co.uk
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 3 · the giant wordmark: outline underneath, gold fill sweeps across on scroll */}
      <div data-word className="relative mt-[clamp(60px,8vw,110px)] px-[clamp(12px,2vw,32px)]" aria-label="Melt House">
        <div aria-hidden className="relative mx-auto flex w-full items-center justify-center gap-[1.6vw] text-[12.6vw] leading-[0.82] font-bold tracking-[-0.03em] whitespace-nowrap select-none">
          <span className="relative">
            <span className="text-transparent [-webkit-text-stroke:1px_rgba(224,173,102,0.35)]">MELT</span>
            <span data-fill className="absolute inset-0 bg-[linear-gradient(100deg,#f6dcb1_0%,#e0ad66_45%,#b97c3e_100%)] bg-clip-text text-transparent">
              MELT
            </span>
          </span>
          <img src={brand.heart} alt="" className="heart-lit heart-breathe h-[0.72em] w-auto translate-y-[0.04em]" />
          <span className="relative">
            <span className="text-transparent [-webkit-text-stroke:1px_rgba(224,173,102,0.35)]">HOUSE</span>
            <span data-fill className="absolute inset-0 bg-[linear-gradient(100deg,#f6dcb1_0%,#e0ad66_45%,#b97c3e_100%)] bg-clip-text text-transparent">
              HOUSE
            </span>
          </span>
        </div>
      </div>

      {/* 4 · bottom bar */}
      <div className="container-x relative mt-8 flex flex-col gap-4 border-t border-white/10 py-6 text-[12.5px] text-[#cdb79f] md:flex-row md:items-center md:justify-between">
        <span>{footer.note}</span>
        <span>{footer.copyright}</span>
        <button type="button" onClick={toTop} className="group inline-flex items-center gap-2 self-start font-medium text-[#f5ebe0] md:self-auto">
          Back to top
          <span className="grid h-8 w-8 place-items-center rounded-full border border-white/25 transition-transform group-hover:-translate-y-1">↑</span>
        </button>
      </div>
    </footer>
  );
}
