// Melt House: Late-night desserts, gelato and coffee in Hounslow
// All text + data for Melt House. Prices in GBP.

export const STUDIO = "Melt House";

/** Colour palette for Melt House - warm luxury caramel & chocolate */
export const FLAVOUR = {
  caramel: "#d98f5c",
  chocolate: "#6b3a2a",
  strawberry: "#d4584f",
  vanilla: "#f1bf8d",
  coffee: "#8b6f47",
  pistachio: "#a8b88f",
  blueberry: "#5b4a7d",
};

export type PhotoSlot = { photo?: string; tone: string; hint: string };

export const nav = {
  logo: "Melt House",
  links: [
    { label: "Desserts", href: "#flavours" },
    { label: "Build a treat", href: "#build" },
    { label: "Menu", href: "#treats" },
    { label: "Visit", href: "#parlours" },
  ],
  cta: { label: "Order", href: "#build" },
};

export const hero = {
  word: "MELT",
  pill: { label: "Late-night favourite", value: "Salted Caramel Cheesecake" },
  heading: ["Made for Hounslow's", "*sweet* cravings."],
  text: "Hand-crafted desserts, premium gelato and artisan coffee. Open late, always fresh, always indulgent.",
  ctas: [
    { label: "Explore menu", href: "#treats" },
    { label: "Order now", href: "#build" },
  ],
  cone: "/images/melt/cone-hero.webp",
  toppings: [
    { src: "/images/melt/topping-strawberry.webp", alt: "", className: "left-[2%] top-[33%] w-[clamp(70px,10vw,170px)] rotate-[-12deg] md:left-[6%] md:top-[22%]", depth: 0.35 },
    { src: "/images/melt/topping-pistachio.webp", alt: "", className: "right-[4%] top-[30%] w-[clamp(56px,7vw,120px)] rotate-[10deg] md:right-[9%] md:top-[18%]", depth: 0.55 },
    { src: "/images/melt/topping-waffle.webp", alt: "", className: "right-[3%] top-[54%] w-[clamp(60px,8vw,140px)] rotate-[18deg] md:top-auto md:right-[4%] md:bottom-[30%]", depth: 0.25 },
    { src: "/images/melt/topping-chocolate.webp", alt: "", className: "left-[5%] top-[57%] w-[clamp(50px,6vw,110px)] rotate-[-20deg] md:top-auto md:left-[12%] md:bottom-[34%]", depth: 0.45 },
  ],
};

export const wave = {
  top: ["Salted Caramel", "Brownie Melt", "Hazelnut Mocha", "Strawberry Bliss", "Belgian Cocoa", "Premium Gelato"],
  bottom: ["Hand-crafted daily", "Premium quality", "Made in Hounslow", "Late-night hours"],
};

export type Flavour = {
  id: string;
  name: string;
  note: string;
  price: number;
  tag?: string;
  fill: string;
  ink: string;
  image: string;
};

export const flavours: Flavour[] = [
  { id: "caramel", name: "Salted Caramel Cheesecake", note: "Silky vanilla bean cheesecake with salted caramel finish", price: 8.50, tag: "Bestseller", fill: FLAVOUR.caramel, ink: "#ffffff", image: "/images/melt/scoop-pistachio.webp" },
  { id: "brownie", name: "Brownie Sundae Melt", note: "Warm chocolate brownie, vanilla gelato, hot fudge drizzle", price: 9.00, tag: "Late-night pick", fill: FLAVOUR.chocolate, ink: "#ffffff", image: "/images/melt/scoop-cocoa.webp" },
  { id: "strawberry", name: "Strawberry Cream", note: "Fresh berries with homemade jam ripple", price: 7.80, tag: "Fresh daily", fill: FLAVOUR.strawberry, ink: "#ffffff", image: "/images/melt/scoop-strawberry.webp" },
  { id: "coffee", name: "Hazelnut Mocha", note: "Dark chocolate mocha with hazelnut and creamy cocoa foam", price: 4.70, tag: "Coffee lover", fill: FLAVOUR.coffee, ink: "#ffffff", image: "/images/melt/scoop-coffee.webp" },
  { id: "cocoa", name: "Belgian Cocoa", note: "70% dark chocolate with fudgy chunks", price: 8.00, tag: "Premium", fill: FLAVOUR.chocolate, ink: "#ffffff", image: "/images/melt/scoop-mango.webp" },
  { id: "vanilla", name: "Vanilla Gelato", note: "Classic creamy indulgence", price: 7.50, tag: "Timeless", fill: FLAVOUR.vanilla, ink: "#2b1233", image: "/images/melt/scoop-meetha.webp" },
];

export const shelf = {
  eyebrow: "Today's selection",
  heading: ["Today's", "*scoops*"],
  text: "Six premium flavours on rotation. Fresh gelato and desserts made daily.",
  unit: "/ scoop",
};

const byId = (id: string) => flavours.find((f) => f.id === id)!;

export const builder = {
  eyebrow: "Build your treat",
  heading: ["Create your", "*perfect* treat"],
  text: "Pick three scoops or build your own dessert. Premium ingredients, always fresh.",
  cone: "/images/melt/cone-empty.webp",
  coneLine: { name: "Waffle cone", price: "Free" },
  scoops: [byId("caramel"), byId("coffee"), byId("cocoa")],
  tints: ["#1c1512", "#d98f5c", "#8b6f47", "#6b3a2a"],
  cta: "Add to order",
};

export const slow = {
  eyebrow: "How we craft it",
  heading: ["Made the", "*right* way"],
  text: "No shortcuts. Premium ingredients, hand-crafted daily, fresh every scoop.",
  frames: "/frames/melt-pour",
  alt: "Premium dessert being crafted with care",
  panel: "linear-gradient(180deg, #d98f5c, #8b6f47)",
  focus: [
    [0, 0.74],
    [0.33, 0.66],
    [0.66, 0.57],
    [1, 0.52],
  ] as [number, number][],
  captions: [
    { title: "Premium milk", text: "fresh every morning", at: 0.1, pos: "md:left-[4%] md:bottom-[24%]", fill: "#ffffff" },
    { title: "Hand-crafted", text: "small batches only", at: 0.35, pos: "md:left-[13%] md:bottom-[6%]", fill: FLAVOUR.caramel },
    { title: "Fresh daily", text: "never pre-made", at: 0.6, pos: "md:left-[21%] md:bottom-[33%]", fill: FLAVOUR.vanilla },
  ],
};

export const treats = {
  eyebrow: "The menu",
  heading: ["Pick a", "*treat*"],
  items: [
    { name: "Desserts", count: "6 signatures", tone: FLAVOUR.strawberry, hint: "Cheesecake slice", photo: "/images/melt/cat-scoops.webp" },
    { name: "Coffee", count: "8 choices", tone: FLAVOUR.coffee, hint: "Coffee cup", photo: "/images/melt/cat-shake.webp" },
    { name: "Gelato scoops", count: "Premium flavours", tone: FLAVOUR.vanilla, hint: "Gelato cone", photo: "/images/melt/cat-sundae.webp" },
    { name: "Sundaes", count: "Indulgent options", tone: FLAVOUR.caramel, hint: "Sundae glass", photo: "/images/melt/cat-tub.webp" },
    { name: "Shakes", count: "Creamy & rich", tone: FLAVOUR.chocolate, hint: "Milkshake", photo: "/images/melt/cat-shake.webp" },
    { name: "Specials", count: "Limited edition", tone: FLAVOUR.blueberry, hint: "Seasonal treat", photo: "/images/melt/cat-cake.webp" },
  ],
};

export const deals = {
  eyebrow: "Sweet deals",
  heading: ["Treat", "*yourself*"],
  text: "Special offers for dessert lovers and late-night cravings.",
  items: [
    { id: "family", title: "Sweet evening trio", text: "Three premium treats. Perfect for sharing or indulging.", price: "£19.99", was: "£24.50", badge: "Weekdays", tone: FLAVOUR.caramel, hint: "Perfect trio" },
    { id: "date", title: "Date night for two", text: "Two signature desserts, one premium coffee each.", price: "£15.99", badge: "After 7 PM", tone: FLAVOUR.strawberry, hint: "Romantic evening" },
    { id: "happy", title: "Happy hour", text: "Second gelato scoop free. Every day 4–6 PM.", price: "4–6 PM", badge: "Daily", tone: FLAVOUR.coffee, hint: "Perfect timing" },
    { id: "late", title: "Late-night craving", text: "Any dessert with hot drink. Open till 11:30 PM.", price: "from £8.99", badge: "Every night", tone: FLAVOUR.chocolate, hint: "Sweet escape" },
  ],
};

export const notes = {
  eyebrow: "Customer love",
  heading: ["Sticky *fingers*,", "happy hearts"],
  items: [
    { name: "Sarah & friends", where: "Hounslow", text: "Best dessert spot in town. Coming back tomorrow!", rating: 5, tone: FLAVOUR.caramel, hint: "Friends enjoying", photo: "/images/melt/note-friends.webp" },
    { name: "Marcus, age 8", where: "Hounslow", text: "The brownie sundae is AMAZING. Can we go again?", rating: 5, tone: FLAVOUR.chocolate, hint: "Happy child", photo: "/images/melt/note-kid.webp" },
    { name: "Priya & Dev", where: "Hounslow", text: "Our new Friday date night spot. Stunning desserts and late hours.", rating: 5, tone: FLAVOUR.strawberry, hint: "Couple enjoying", photo: "/images/melt/note-couple.webp" },
    { name: "The Patels", where: "Hounslow", text: "Late-night indulgence after work. Perfection.", rating: 5, tone: FLAVOUR.vanilla, hint: "Family enjoying", photo: "/images/melt/note-family.webp" },
  ],
};

export const parlours = {
  eyebrow: "Visit us",
  heading: ["Come by", "*and* indulge"],
  text: "One premium location in Hounslow. Late-night hours. Walk in anytime.",
  photo: { photo: "/images/melt/parlour.webp", tone: FLAVOUR.caramel, hint: "Melt House interior" },
  items: [
    { name: "Hounslow", note: "45 Kingsley Rd, TW3 1PA", hours: "10:00 AM – 11:30 PM", late: "Late-night desserts daily" },
  ],
};

export const footer = {
  word: "MELT HOUSE",
  newsletter: {
    title: "Get special offers first",
    text: "One email with new desserts and late-night deals.",
    placeholder: "you@email.com",
  },
  columns: [
    { title: "Eat", links: ["Desserts", "Coffee", "Gelato", "Sundaes"] },
    { title: "Visit", links: ["Hounslow", "Hours", "Directions"] },
    { title: "Connect", links: ["Instagram @melthouse", "WhatsApp Order", "Call 07824 063148"] },
  ],
  note: `Melt House. Late-night desserts, gelato and coffee. 45 Kingsley Rd, Hounslow TW3 1PA. 07824 063148 • adapasuresh26@gmail.com`,
};
