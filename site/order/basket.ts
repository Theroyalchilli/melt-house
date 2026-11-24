// Basket state for the /menu ordering page: lines, totals, saving to the phone, and the WhatsApp message.
import { ORDER, gbp } from "../menu";

export type Line = {
  key: string; // same item + same options = same line (quantity goes up)
  name: string;
  size?: "Medium" | "Large";
  details: string[]; // chosen options + extras, in plain words
  unit: number; // price of one, extras included
  qty: number;
};

export type Service = "Eat in" | "Takeaway";

const STORE = "melthouse-basket-v1";

export function loadBasket(): Line[] {
  try {
    const raw = localStorage.getItem(STORE);
    const v = raw ? JSON.parse(raw) : [];
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export function saveBasket(lines: Line[]) {
  try {
    localStorage.setItem(STORE, JSON.stringify(lines));
  } catch {
    /* private mode: the basket still works for this visit */
  }
}

export const total = (lines: Line[]) => Math.round(lines.reduce((s, l) => s + l.unit * l.qty, 0) * 100) / 100;
export const count = (lines: Line[]) => lines.reduce((s, l) => s + l.qty, 0);

export function addLine(lines: Line[], line: Line): Line[] {
  const found = lines.find((l) => l.key === line.key);
  if (found) return lines.map((l) => (l.key === line.key ? { ...l, qty: l.qty + line.qty } : l));
  return [...lines, line];
}

export function setQty(lines: Line[], key: string, qty: number): Line[] {
  return qty <= 0 ? lines.filter((l) => l.key !== key) : lines.map((l) => (l.key === key ? { ...l, qty } : l));
}

/** Short code staff can call out, e.g. "MH-4821". */
export const orderCode = () => `MH-${Math.floor(1000 + Math.random() * 9000)}`;

export function orderText(lines: Line[], o: { code: string; name: string; service: Service; note: string }) {
  const rows = lines.map((l) => {
    const title = `${l.qty} × ${l.name}${l.size ? ` (${l.size})` : ""}`;
    const extra = l.details.length ? `\n    ${l.details.join(" · ")}` : "";
    return `• ${title}  ${gbp(l.unit * l.qty)}${extra}`;
  });
  return [
    `MELT HOUSE ORDER ${o.code}`,
    `${o.service} · ${o.name}`,
    "",
    ...rows,
    "",
    `TOTAL ${gbp(total(lines))}`,
    o.note.trim() ? `Note: ${o.note.trim()}` : "",
    "Pay at the counter",
  ]
    .filter((r, i, a) => !(r === "" && a[i - 1] === ""))
    .join("\n")
    .trim();
}

export const whatsappLink = (text: string) => `https://wa.me/${ORDER.whatsapp}?text=${encodeURIComponent(text)}`;
