"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ORDER, gbp, menu, fullName, type Category, type Item } from "../menu";
import { addLine, count, loadBasket, saveBasket, total, type Line } from "./basket";
import Sheet from "./Sheet";
import ItemSheet from "./ItemSheet";
import BasketSheet, { type Sent } from "./BasketSheet";

type Open = { item: Item; cat: Category; size?: "Medium" | "Large" } | null;

const HEART = "/images/melt/brand/heart-cutout.webp";
/** Opens the sheet only when the guest has something to decide (flavours, combo picks, extras). */
const needsSheet = (item: Item) => !!item.extras || (item.choices ?? []).some((c) => c.pick || !c.default);
const defaults = (item: Item) => (item.choices ?? []).map((c) => c.default!).filter(Boolean);
const lookup = (id: string) => {
  for (const s of menu) for (const c of s.categories) for (const i of c.items) if (i.id === id) return { item: i, cat: c };
  throw new Error(id);
};
const FAVOURITES = ["kunafa-waffle", "biscoff-crepe", "kashmiri-chai", "special-cake", "ruby", "pistachio-shake", "cinnamon-roll"].map(lookup);
const SECTION_LINE: Record<string, string> = {
  savouries: "Toasties, sandwiches, wraps & panini",
  bakery: "Croissants, bakes & premium gelato",
  desserts: "Crêpes, waffles, pancakes & cakes",
  hot: "Coffee, signature chai & fine teas",
  cold: "Juices, smoothies, shakes & frappés",
};

/** /menu: the page the café QR code opens. Phone first; on laptops the order sits in a panel beside the menu. */
export default function MenuApp() {
  const [lines, setLines] = useState<Line[]>([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState<Open>(null);
  const [basketOpen, setBasketOpen] = useState(false);
  const [sent, setSent] = useState<Sent | null>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(menu[0].id);
  const [toast, setToast] = useState("");
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const barRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setLines(loadBasket());
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) saveBasket(lines);
  }, [lines, ready]);

  // which section is under the sticky bar
  useEffect(() => {
    const onScroll = () => {
      const y = (barRef.current?.getBoundingClientRect().bottom ?? 0) + 40;
      let cur = menu[0].id;
      for (const s of menu) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= y) cur = s.id;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // keep the active tab visible in the sideways-scrolling tab row (scroll the row only, never the page)
  useEffect(() => {
    const row = tabsRef.current;
    const tab = row?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (row && tab) row.scrollTo({ left: tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  const add = useCallback((line: Line) => {
    setLines((l) => addLine(l, line));
    setOpen(null);
    setToast(`Added · ${line.qty > 1 ? `${line.qty} × ` : ""}${line.name}${line.size ? ` (${line.size})` : ""}`);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 1800);
  }, []);

  const quickAdd = (item: Item, cat: Category, size?: "Medium" | "Large") => {
    const sz = item.m !== undefined && item.l !== null ? size ?? "Medium" : undefined;
    const unit = item.m !== undefined ? (sz === "Large" ? item.l! : item.m) : item.price!;
    const details = defaults(item);
    add({ key: [item.id, sz, ...details].join("|"), name: fullName(item, cat), size: sz, details, unit, qty: 1 });
  };
  /** favourites: sized drinks open the sheet so the guest picks M or L */
  const tap = (item: Item, cat: Category) => (needsSheet(item) || item.m !== undefined ? setOpen({ item, cat }) : quickAdd(item, cat));

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return null;
    const seen = new Set<string>(); // the Specials panel repeats a few chai/coffee items: list each once
    return menu.flatMap((s) =>
      s.categories.flatMap((c) =>
        c.items
          .filter((i) => `${i.name} ${i.desc ?? ""} ${c.name} ${s.name}`.toLowerCase().includes(q))
          .filter((i) => !seen.has(fullName(i, c)) && !!seen.add(fullName(i, c)))
          .map((i) => ({ item: i, cat: c })),
      ),
    );
  }, [query]);

  // searching from halfway down the page: bring the results to the top of the screen
  const searching = !!results;
  useEffect(() => {
    if (!searching) return;
    const top = document.querySelector<HTMLElement>(".mh-head")?.offsetHeight ?? 0;
    if (window.scrollY > top) window.scrollTo({ top });
  }, [searching]);

  const n = count(lines);

  const row = (item: Item, cat: Category) => {
    const sized = item.m !== undefined;
    const sheet = needsSheet(item);
    return (
      <li key={item.id} className="mh-row">
        <button type="button" className="mh-row-main" onClick={() => setOpen({ item, cat })}>
          <span className="mh-row-name">
            {results ? fullName(item, cat) : item.name}
            {item.signature && <span className="mh-sig">Signature</span>}
          </span>
          {item.desc && <span className="mh-row-desc">{item.desc}</span>}
        </button>
        <span className="mh-leader" aria-hidden />
        {sized ? (
          <span className="mh-sizes">
            {(["Medium", "Large"] as const).map((s) => {
              const p = s === "Large" ? item.l : item.m;
              if (p === null || p === undefined)
                return (
                  <span key={s} className="mh-size-none" aria-hidden>
                    —
                  </span>
                );
              return (
                <button
                  key={s}
                  type="button"
                  aria-label={`Add ${item.name}, ${s}, ${gbp(p)}`}
                  className="mh-size"
                  onClick={() => (sheet ? setOpen({ item, cat, size: s }) : quickAdd(item, cat, s))}
                >
                  <span className="tnum">{gbp(p)}</span>
                </button>
              );
            })}
          </span>
        ) : (
          <span className="flex shrink-0 items-center gap-3">
            <span className="tnum mh-price">{gbp(item.price!)}</span>
            <button type="button" aria-label={`Add ${item.name}`} className="mh-add" onClick={() => (sheet ? setOpen({ item, cat }) : quickAdd(item, cat))}>
              <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden>
                <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              </svg>
            </button>
          </span>
        )}
      </li>
    );
  };

  const category = (cat: Category) => (
    <div key={cat.id} id={`c-${cat.id}`} className={cat.panel ? "mh-panel" : "mh-cat"}>
      <div className={`flex items-center gap-4 ${cat.panel ? "justify-center text-center" : ""}`}>
        {cat.image && <img src={cat.image} alt="" width={64} height={64} loading="lazy" className="mh-round h-16 w-16 shrink-0" />}
        <div className="min-w-0">
          <h3 className="mh-cat-name">{cat.name}</h3>
          <p className="mh-italic text-[17px] leading-snug">{cat.blurb}</p>
        </div>
      </div>
      {cat.sizes && (
        <div className="mh-size-head" aria-hidden>
          <span>Med</span>
          <span>Large</span>
        </div>
      )}
      <ul className={cat.sizes ? "" : "mt-3"}>{cat.items.map((i) => row(i, cat))}</ul>
      {cat.id === "shots" && <p className="mh-italic mt-3 text-[16px]">Boost any juice or smoothie: ginger +£0.50 · turmeric +£0.75 · lemon, lime or mint +£0.40 · protein +£1.95</p>}
      {cat.note && !cat.panel && <p className="mh-italic mt-3 text-[16px]">{cat.note}</p>}
      {cat.note && cat.panel && <p className="mh-panel-note">{cat.note}</p>}
    </div>
  );

  const basket = (
    <BasketSheet
      lines={lines}
      onLines={setLines}
      onSent={(s) => {
        setSent(s);
        setBasketOpen(false);
      }}
    />
  );

  return (
    <div className="mh-menu">
      <header className="mh-head">
        <div className="mh-head-glow" aria-hidden />
        <a href="/" className="relative mx-auto flex w-fit flex-col items-center" aria-label="Melt House home">
          <img src={HEART} alt="" width={529} height={580} className="mh-heart" />
          <span className="mt-4 pl-[0.34em] text-[22px] font-semibold tracking-[0.34em] text-[#f5ebe0] uppercase md:text-[26px]">Melt House</span>
          <span className="mt-2 text-[12px] font-medium tracking-[0.34em] text-[var(--gold)] uppercase">Café · Desserts · Drinks · Treats</span>
        </a>
        <p className="mh-italic relative mt-5 text-center text-[20px] !text-[#e8d3bb]">Freshly made. Beautifully served. Simply indulgent.</p>
        <div className="relative mt-5 flex flex-wrap items-center justify-center gap-2 text-[12.5px] text-[#f5ebe0]">
          <span className="mh-pill">
            <span className="mh-live" />
            {ORDER.hours}
          </span>
          <span className="mh-pill">Order here · pay at the counter</span>
        </div>
      </header>

      <div className="mh-layout">
        <div className="min-w-0">
          <div ref={barRef} className="mh-bar">
            <div className="mh-search">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
                <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search: pistachio, chai, waffle…" aria-label="Search the menu" type="search" />
            </div>
            {!results && (
              <nav ref={tabsRef} aria-label="Menu sections" className="mh-tabs no-bar">
                {menu.map((s) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    data-tab={s.id}
                    aria-current={active === s.id ? "true" : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    <img src={s.image} alt="" width={26} height={26} />
                    {s.name}
                  </a>
                ))}
              </nav>
            )}
          </div>

          <main className="pb-36 lg:pb-16">
            {results ? (
              <section className="mt-6">
                <p className="mh-kicker px-4 md:px-0">
                  {results.length} {results.length === 1 ? "match" : "matches"} for “{query.trim()}”
                </p>
                {results.length > 0 ? (
                  <ul className="mh-cat mt-2">{results.map(({ item, cat }) => row(item, cat))}</ul>
                ) : (
                  <p className="mh-italic mt-4 px-4 text-[18px] md:px-0">Nothing found. Try “chai”, “crêpe” or “mango”.</p>
                )}
              </section>
            ) : (
              <>
                <section className="mh-favs" aria-label="House favourites">
                  <div className="flex items-baseline justify-between px-4 md:px-0">
                    <h2 className="mh-fav-title">
                      House <span className="mh-italic">favourites</span>
                    </h2>
                    <span className="text-[12px] text-muted lg:hidden">Swipe →</span>
                  </div>
                  <ul className="mh-fav-row no-bar">
                    {FAVOURITES.map(({ item, cat }) => (
                      <li key={item.id}>
                        <button type="button" className="mh-fav" onClick={() => tap(item, cat)} aria-label={`Add ${fullName(item, cat)}`}>
                          <img src={cat.image} alt="" width={96} height={96} loading="lazy" className="mh-round mx-auto h-[88px] w-[88px]" />
                          <span className="mt-3 block text-[14px] leading-tight font-semibold">{fullName(item, cat)}</span>
                          <span className="mt-auto flex items-center justify-between gap-1 pt-3">
                            <span className="tnum text-[14px] font-semibold">
                              {item.m !== undefined && <span className="mr-1 text-[12px] font-medium text-muted">from</span>}
                              {gbp(item.price ?? item.m!)}
                            </span>
                            <span className="mh-fav-plus" aria-hidden>
                              +
                            </span>
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </section>
                <p className="mh-allergy mx-4 md:mx-0">{ORDER.allergyNote}</p>

                {menu.map((s, k) => (
                  <section key={s.id} id={s.id} className="mh-section">
                    <div className="mh-opener">
                      <div className="relative z-[1] min-w-0">
                        <span className="tnum text-[12px] font-medium tracking-[0.2em] text-[var(--gold)]">
                          0{k + 1} / 0{menu.length}
                        </span>
                        <h2 className="mt-1 text-[clamp(26px,6.4vw,38px)] leading-[1.02] font-semibold">{s.name}</h2>
                        <p className="mh-italic mt-1 text-[17px] !text-[#e8d3bb]">{SECTION_LINE[s.id]}</p>
                      </div>
                      <div className="mh-opener-img">
                        <img src={s.image} alt="" loading="lazy" />
                      </div>
                    </div>
                    {s.categories.map(category)}
                  </section>
                ))}
              </>
            )}
            <footer className="mt-16 px-4 text-center text-[13px] leading-relaxed text-muted md:px-0">
              <img src={HEART} alt="" width={40} height={44} className="mx-auto mb-3 h-11 w-auto" />
              {ORDER.address}
              <br />
              {ORDER.hours} · {ORDER.email}
              <br />
              <a href="/" className="mt-3 inline-block underline underline-offset-4">
                melthouse.co.uk
              </a>
            </footer>
          </main>
        </div>

        {/* laptop: the order stays in a panel beside the menu */}
        <aside className="mh-aside" aria-label="Your order">
          {ready && basket}
        </aside>
      </div>

      <div className={`mh-toast ${toast ? "is-on" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>

      {ready && n > 0 && !basketOpen && !sent && (
        <button
          type="button"
          className="mh-basket-bar"
          onClick={() => {
            setToast("");
            setBasketOpen(true);
          }}
        >
          <span className="mh-count tnum">{n}</span>
          <span className="flex-1 text-left">View order</span>
          <span className="tnum">{gbp(total(lines))}</span>
        </button>
      )}

      <Sheet open={!!open} onClose={() => setOpen(null)} label={open ? open.item.name : "Item"}>
        {open && <ItemSheet key={`${open.item.id}-${open.size}`} item={open.item} cat={open.cat} size={open.size} onAdd={add} />}
      </Sheet>

      <Sheet open={basketOpen && !sent} onClose={() => setBasketOpen(false)} label="Your order">
        {basket}
      </Sheet>

      <Sheet open={!!sent} onClose={() => setSent(null)} label="Order sent">
        {sent && (
          <div className="overflow-y-auto px-5 pt-7 pb-6 md:px-7">
            <img src={HEART} alt="" width={60} height={66} className="h-16 w-auto" />
            <p className="mh-kicker mt-4">Order {sent.code}</p>
            <h2 className="mt-1 text-[24px] leading-tight font-semibold">Thank you, {sent.name}!</h2>
            <p className="mt-3 leading-relaxed">
              WhatsApp opens with your order ready. <strong>Press send</strong>, then pay at the counter. We&rsquo;ll call your name.
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-muted">No WhatsApp? Just show this screen at the counter.</p>
            <pre className="mh-receipt">{sent.text}</pre>
            <div className="mt-5 grid gap-2">
              <a href={sent.link} className="mh-btn mh-btn-wa">
                Open WhatsApp again
              </a>
              <button
                type="button"
                className="mh-btn mh-btn-ghost"
                onClick={() => {
                  setLines([]);
                  setSent(null);
                }}
              >
                Start a new order
              </button>
            </div>
          </div>
        )}
      </Sheet>
    </div>
  );
}
