// All homepage text for Melt House. Prices come from site/menu.ts (the one place prices live).
import { ORDER, menu, photo, type Item } from "./menu";

const find = (id: string): Item => {
  for (const s of menu) for (const c of s.categories) for (const i of c.items) if (i.id === id) return i;
  throw new Error(`menu item not found: ${id}`);
};
const priceOf = (i: Item) => i.price ?? i.m!;
const img = photo;

export const brand = {
  heart: "/images/melt/brand/heart-cutout.webp",
  sign: "/images/melt/brand/wordmark-sign.webp",
  tagline: "Café · Desserts · Drinks · Treats",
};

export const nav = {
  links: [
    { label: "Signatures", href: "#signatures" },
    { label: "Menu", href: "#menu" },
    { label: "Offers", href: "#offers" },
    { label: "Visit", href: "#visit" },
  ],
  cta: { label: "Order now", href: "/menu" },
};

export const hero = {
  kicker: "Hounslow · Open till midnight",
  lines: ["Freshly made.", "*Beautifully* served.", "Simply indulgent."],
  text: "Crêpes, Belgian waffles, signature chai and premium gelato. Order from your phone, pay at the counter.",
  ctas: [
    { label: "Order from the menu", href: "/menu" },
    { label: "Find us", href: "#visit" },
  ],
  arches: [
    { src: img("savouries"), alt: "Toasties, wraps and panini" },
    { src: img("hot-drinks"), alt: "Coffee, chai and tea" },
    { src: img("desserts"), alt: "Waffles, crêpes and cakes" },
    { src: img("cold-drinks"), alt: "Shakes, smoothies and juices" },
  ],
};

export const ticker = ["Pistachio Kunafa Waffle", "Kashmiri Chai", "Lotus Biscoff Crêpe", "Fresh Sugarcane", "Belgian Gelato", "Masala Chai", "Melt House Ruby", "Oreo Shake"];

const sig = (id: string, image: string, note: string) => {
  const i = find(id);
  return { id, name: i.name, desc: i.desc ?? "", price: priceOf(i), sized: i.m !== undefined, image, note };
};
export const signatures = {
  kicker: "House signatures",
  heading: ["The ones people", "come *back* for"],
  items: [
    sig("kunafa-waffle", img("kunafa-waffle"), "Our signature"),
    sig("biscoff-crepe", img("biscoff-crepe"), "Most loved"),
    sig("kashmiri-chai", img("kashmiri-chai"), "Pink & creamy"),
    sig("special-cake", img("special-cake"), "Chef’s layer cake"),
    sig("ruby", img("ruby-juice"), "Fresh pressed"),
  ],
};

const fromPrice = (sectionId: string) => {
  const s = menu.find((x) => x.id === sectionId)!;
  return Math.min(...s.categories.flatMap((c) => c.items.map(priceOf)));
};
const countOf = (sectionId: string) => menu.find((x) => x.id === sectionId)!.categories.reduce((n, c) => n + c.items.length, 0);
export const menuIndex = {
  kicker: "The menu",
  heading: ["Five ways", "to *melt*"],
  sections: [
    { id: "savouries", name: "Savouries", line: "Toasties · Sandwiches · Wraps · Panini · Combos", image: img("savouries") },
    { id: "bakery", name: "Bakery & Gelato", line: "Croissants · Muffins · Cinnamon rolls · Gelato", image: img("bakery") },
    { id: "desserts", name: "Desserts", line: "Crêpes · Belgian waffles · Pancakes · Cakes", image: img("desserts") },
    { id: "hot", name: "Hot Drinks", line: "Coffee · Signature chai · Premium teas", image: img("hot-drinks") },
    { id: "cold", name: "Cold Drinks", line: "Fresh juices · Smoothies · Shakes · Frappés", image: img("cold-drinks") },
  ].map((s) => ({ ...s, from: fromPrice(s.id), count: countOf(s.id) })),
};

export const gelato = {
  kicker: "Ice cream & gelato",
  heading: ["Six flavours.", "*Your* scoops."],
  text: "Creamy, premium scoops. Finish with chocolate, caramel or strawberry sauce, and a crunch of pistachio, almond or Biscoff.",
  flavours: ["Madagascar vanilla", "Belgian chocolate", "Strawberry", "Mango", "Pistachio", "Cookies & cream"],
  scoops: [
    { src: "/images/melt/scoop-strawberry.webp", alt: "Strawberry scoop" },
    { src: "/images/melt/scoop-pistachio.webp", alt: "Pistachio scoop" },
    { src: "/images/melt/scoop-cocoa.webp", alt: "Belgian chocolate scoop" },
    { src: "/images/melt/scoop-mango.webp", alt: "Mango scoop" },
    { src: "/images/melt/scoop-meetha.webp", alt: "Vanilla scoop" },
  ],
  prices: [
    { label: "One scoop", price: find("one-scoop").price! },
    { label: "Two scoops", price: find("two-scoops").price! },
    { label: "Three scoops", price: find("three-scoops").price! },
    { label: "Sharing platter · 6", price: find("six-scoop-platter").price! },
  ],
};

export const chai = {
  kicker: "Hot drinks",
  heading: ["Kadak, masala,", "*Kashmiri*."],
  text: "Authentic, aromatic chai blends brewed the slow way, next to barista coffee and fine teas. Medium or large.",
  list: ["kadak-chai", "masala-chai", "kashmiri-chai", "chai-latte", "turmeric-latte", "latte"].map((id) => {
    const i = find(id);
    return { name: i.name, m: i.m!, l: i.l ?? null };
  }),
  images: [img("kashmiri-chai"), img("latte")],
};

const combosCat = menu[0].categories.find((c) => c.id === "combos")!;
const specialsCat = menu[3].categories.find((c) => c.id === "specials")!;
export const offers = {
  kicker: "Offers",
  heading: ["Better", "*together*"],
  combos: { title: combosCat.name, sub: combosCat.blurb, items: combosCat.items.map((i) => ({ name: i.name, price: i.price! })), note: combosCat.note! },
  specials: { title: specialsCat.name, sub: specialsCat.blurb, items: specialsCat.items.map((i) => ({ name: i.name, m: i.m!, l: i.l! })) },
};

export const scan = {
  kicker: "Order at your table",
  heading: ["Scan. Pick.", "*Send.*"],
  steps: [
    { n: "01", title: "Scan the code", text: "On your table, the counter or the window." },
    { n: "02", title: "Pick your treats", text: "Sizes, flavours and extras, just how you like them." },
    { n: "03", title: "Send on WhatsApp", text: "Your order lands at the counter. Pay when it’s ready." },
  ],
  url: ORDER.menuUrl,
};

export const visit = {
  kicker: "Visit us",
  heading: ["Open late,", "every *day*"],
  address: ORDER.address,
  hours: ORDER.hours,
  email: ORDER.email,
  mapUrl: "https://www.google.com/maps/search/?api=1&query=45+Kingsley+Road+Hounslow+TW3+1PA",
};

export const footer = {
  links: [
    { label: "Order online", href: "/menu" },
    { label: "Signatures", href: "#signatures" },
    { label: "Menu", href: "#menu" },
    { label: "Offers", href: "#offers" },
    { label: "Visit", href: "#visit" },
  ],
  story: "A Hounslow café for crêpes, Belgian waffles, signature chai and premium gelato. Freshly made, beautifully served, open late.",
  mapUrl: "https://www.google.com/maps/search/?api=1&query=45+Kingsley+Road+Hounslow+TW3+1PA",
  note: ORDER.allergyNote,
  copyright: `© ${new Date().getFullYear()} Melt House · Hounslow`,
};
