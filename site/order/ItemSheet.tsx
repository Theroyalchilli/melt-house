"use client";

import { useState } from "react";
import { gbp, fullName, type Category, type Item } from "../menu";
import type { Line } from "./basket";

type Props = { item: Item; cat: Category; size?: "Medium" | "Large"; onAdd: (line: Line) => void };

/** Everything needed to add one item: size, required choices (one option, or N flavours), optional extras, quantity. */
export default function ItemSheet({ item, cat, size: startSize, onAdd }: Props) {
  const sized = item.m !== undefined;
  const [size, setSize] = useState<"Medium" | "Large">(startSize ?? "Medium");
  // one-pick choices: chosen option · pick-N choices: a count per option
  const [one, setOne] = useState<Record<string, string>>(() =>
    Object.fromEntries((item.choices ?? []).filter((c) => !c.pick && c.default).map((c) => [c.id, c.default!])),
  );
  const [many, setMany] = useState<Record<string, Record<string, number>>>({});
  const [extras, setExtras] = useState<Record<string, string | true>>({});
  const [qty, setQty] = useState(1);

  const base = sized ? (size === "Large" ? item.l ?? item.m! : item.m!) : item.price!;
  const extraSum = (item.extras ?? []).reduce((s, e) => s + (extras[e.id] ? e.price : 0), 0);
  const unit = Math.round((base + extraSum) * 100) / 100;

  const picked = (id: string) => Object.values(many[id] ?? {}).reduce((s, n) => s + n, 0);
  const missing = (item.choices ?? []).find((c) => (c.pick ? picked(c.id) < c.pick : !one[c.id]));

  const add = () => {
    if (missing) return;
    const details: string[] = [];
    for (const c of item.choices ?? []) {
      if (c.pick) {
        const list = Object.entries(many[c.id] ?? {})
          .filter(([, n]) => n > 0)
          .map(([o, n]) => (n > 1 ? `${n}× ${o}` : o));
        details.push(list.join(", "));
      } else details.push(one[c.id]);
    }
    for (const e of item.extras ?? []) {
      const v = extras[e.id];
      if (v) details.push(`+ ${e.label}${typeof v === "string" ? `: ${v}` : ""}`);
    }
    const sz = sized && item.l !== null ? size : undefined;
    onAdd({ key: [item.id, sz, ...details].join("|"), name: fullName(item, cat), size: sz, details, unit, qty });
  };

  return (
    <div className="flex max-h-[inherit] flex-col">
      <div className="overflow-y-auto px-5 pt-6 pb-4 md:px-7">
        <div className="flex items-start gap-4">
          {(item.image ?? cat.image) && <img src={item.image ?? cat.image} alt="" width={64} height={64} className="mh-round h-16 w-16 shrink-0" />}
          <div>
            <p className="mh-kicker">{cat.name}</p>
            <h2 className="mt-1 text-[22px] leading-tight font-semibold">{fullName(item, cat)}</h2>
            {item.desc && <p className="mh-italic mt-1 text-[17px] leading-snug">{item.desc}</p>}
          </div>
        </div>

        {sized && item.l !== null && (
          <fieldset className="mt-6">
            <legend className="mh-kicker mb-2">Size</legend>
            <div className="grid grid-cols-2 gap-2">
              {(["Medium", "Large"] as const).map((s) => (
                <button key={s} type="button" aria-pressed={size === s} onClick={() => setSize(s)} className="mh-chip justify-between">
                  <span>{s}</span>
                  <span className="tnum">{gbp(s === "Large" ? item.l! : item.m!)}</span>
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {(item.choices ?? []).map((c) =>
          c.pick ? (
            <fieldset key={c.id} className="mt-6">
              <legend className="mh-kicker mb-2">
                {c.label} <span className="normal-case tracking-normal">
                  ({picked(c.id)} of {c.pick})
                </span>
              </legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {c.options.map((o) => {
                  const n = many[c.id]?.[o] ?? 0;
                  const full = picked(c.id) >= c.pick!;
                  const set = (v: number) => setMany((m) => ({ ...m, [c.id]: { ...m[c.id], [o]: v } }));
                  if (c.pick === 1)
                    return (
                      <button key={o} type="button" aria-pressed={n > 0} onClick={() => setMany((m) => ({ ...m, [c.id]: { [o]: 1 } }))} className="mh-chip">
                        {o}
                      </button>
                    );
                  return (
                    <div key={o} className="mh-chip justify-between" aria-pressed={n > 0}>
                      <span>{o}</span>
                      <span className="flex items-center gap-1">
                        <button type="button" aria-label={`Fewer ${o}`} className="mh-step" disabled={n === 0} onClick={() => set(n - 1)}>
                          −
                        </button>
                        <span className="tnum w-5 text-center">{n}</span>
                        <button type="button" aria-label={`More ${o}`} className="mh-step" disabled={full} onClick={() => set(n + 1)}>
                          +
                        </button>
                      </span>
                    </div>
                  );
                })}
              </div>
            </fieldset>
          ) : (
            <fieldset key={c.id} className="mt-6">
              <legend className="mh-kicker mb-2">{c.label}</legend>
              <div className="grid gap-2 sm:grid-cols-2">
                {c.options.map((o) => (
                  <button key={o} type="button" aria-pressed={one[c.id] === o} onClick={() => setOne((s) => ({ ...s, [c.id]: o }))} className="mh-chip">
                    {o}
                  </button>
                ))}
              </div>
            </fieldset>
          ),
        )}

        {item.extras && (
          <fieldset className="mt-6">
            <legend className="mh-kicker mb-2">Extras (optional)</legend>
            <div className="grid gap-2">
              {item.extras.map((e) => {
                const v = extras[e.id];
                return (
                  <div key={e.id}>
                    <button
                      type="button"
                      aria-pressed={!!v}
                      onClick={() =>
                        setExtras((s) => {
                          const next = { ...s };
                          if (v) delete next[e.id];
                          else next[e.id] = e.options ? e.options[0] : true;
                          return next;
                        })
                      }
                      className="mh-chip w-full justify-between"
                    >
                      <span>{e.label}</span>
                      <span className="tnum">+{gbp(e.price)}</span>
                    </button>
                    {v && e.options && (
                      <div className="mt-2 flex flex-wrap gap-2 pl-3">
                        {e.options.map((o) => (
                          <button key={o} type="button" aria-pressed={v === o} onClick={() => setExtras((s) => ({ ...s, [e.id]: o }))} className="mh-chip mh-chip-sm">
                            {o}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </fieldset>
        )}
        {cat.note && !item.choices?.some((c) => c.pick) && <p className="mh-italic mt-5 text-[16px]">{cat.note}</p>}
      </div>

      <div className="mh-sheet-foot">
        <div className="mh-qty" aria-label="Quantity">
          <button type="button" aria-label="One less" className="mh-step" disabled={qty <= 1} onClick={() => setQty(qty - 1)}>
            −
          </button>
          <span className="tnum w-6 text-center font-semibold">{qty}</span>
          <button type="button" aria-label="One more" className="mh-step" onClick={() => setQty(qty + 1)}>
            +
          </button>
        </div>
        <button type="button" onClick={add} disabled={!!missing} className="mh-btn flex-1">
          {missing ? `Choose ${missing.pick && missing.pick > 1 ? "flavours" : missing.label.toLowerCase()}` : `Add · ${gbp(unit * qty)}`}
        </button>
      </div>
    </div>
  );
}
