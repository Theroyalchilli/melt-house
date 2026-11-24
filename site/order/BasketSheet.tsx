"use client";

import { useRef, useState } from "react";
import { ORDER, gbp } from "../menu";
import { orderCode, orderText, setQty, total, whatsappLink, type Line, type Service } from "./basket";

export type Sent = { code: string; text: string; link: string; name: string };

type Props = { lines: Line[]; onLines: (l: Line[]) => void; onSent: (s: Sent) => void };

/** The basket: change quantities, eat in or takeaway, name, a note, then send the order to the café on WhatsApp. */
export default function BasketSheet({ lines, onLines, onSent }: Props) {
  const [service, setService] = useState<Service>("Eat in");
  const [name, setName] = useState("");
  const [note, setNote] = useState("");
  const [tried, setTried] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const empty = lines.length === 0;
  const nameOk = name.trim().length > 0;

  const send = () => {
    setTried(true);
    if (!nameOk) nameRef.current?.focus();
    if (empty || !nameOk) return;
    const code = orderCode();
    const text = orderText(lines, { code, name: name.trim(), service, note });
    const link = whatsappLink(text);
    onSent({ code, text, link, name: name.trim() });
    window.location.href = link;
  };

  return (
    <div className="flex max-h-[inherit] flex-col">
      <div className="overflow-y-auto px-5 pt-6 pb-4 md:px-7">
        <h2 className="text-[22px] font-semibold">Your order</h2>

        {empty ? (
          <p className="mh-italic mt-4 text-[18px]">Nothing here yet. Tap + next to anything on the menu.</p>
        ) : (
          <ul className="mt-4 divide-y divide-line">
            {lines.map((l) => (
              <li key={l.key} className="flex items-start gap-3 py-3">
                <div className="min-w-0 flex-1">
                  <p className="font-medium leading-snug">
                    {l.name}
                    {l.size && <span className="text-muted"> · {l.size}</span>}
                  </p>
                  {l.details.length > 0 && <p className="mt-0.5 text-[13px] leading-snug text-muted">{l.details.join(" · ")}</p>}
                  <p className="tnum mt-1 text-[14px] font-semibold">{gbp(l.unit * l.qty)}</p>
                </div>
                <div className="mh-qty shrink-0">
                  <button type="button" aria-label={`One less ${l.name}`} className="mh-step" onClick={() => onLines(setQty(lines, l.key, l.qty - 1))}>
                    −
                  </button>
                  <span className="tnum w-5 text-center">{l.qty}</span>
                  <button type="button" aria-label={`One more ${l.name}`} className="mh-step" onClick={() => onLines(setQty(lines, l.key, l.qty + 1))}>
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {!empty && (
          <>
            <fieldset className="mt-5">
              <legend className="mh-kicker mb-2">How are you enjoying it?</legend>
              <div className="grid grid-cols-2 gap-2">
                {(["Eat in", "Takeaway"] as const).map((s) => (
                  <button key={s} type="button" aria-pressed={service === s} onClick={() => setService(s)} className="mh-chip justify-center">
                    {s}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="mt-5 block">
              <span className="mh-kicker">Your name</span>
              <input
                ref={nameRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="given-name"
                maxLength={40}
                placeholder="So we can call you"
                className="mh-input mt-2"
                aria-invalid={tried && !nameOk}
              />
              {tried && !nameOk && <span className="mt-1 block text-[13px] font-medium text-[#a3361f]">Please add your name.</span>}
            </label>

            <label className="mt-4 block">
              <span className="mh-kicker">Allergies or requests (optional)</span>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} maxLength={240} rows={2} placeholder="e.g. no nuts, extra hot" className="mh-input mt-2 resize-none" />
            </label>

            <p className="mh-allergy mt-4">{ORDER.allergyNote} Tell us about any allergy before you pay.</p>
          </>
        )}
      </div>

      {!empty && (
        <div className="mh-sheet-foot is-stack">
          <div className="flex items-baseline justify-between">
            <span className="text-muted">Total · pay at the counter</span>
            <span className="tnum text-[22px] font-semibold">{gbp(total(lines))}</span>
          </div>
          <button type="button" onClick={send} className="mh-btn mh-btn-wa">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden fill="currentColor">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
            </svg>
            Send order on WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}
