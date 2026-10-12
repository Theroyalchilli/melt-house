// All text + data for Melt House. Prices in GBP.
// Photos: `photo` is empty until the real image is in public/images/melt/; the <Photo> placeholder shows `tone` + `hint` meanwhile.

export const STUDIO = "Melt House";

/** Flavour fills (never used for buttons: the UI accent is always strawberry). */
export const FLAVOUR = {
  pistachio: "#bfe3a6",
  mango: "#ffcf4d",
  strawberry: "#ffc2d4",
  coffee: "#ecd3b4",
  cocoa: "#6b3a2a",
  meetha: "#ffe2ad",
  blueberry: "#a9bfff",
};

export type PhotoSlot = { photo?: string; tone: string; hint: string };

export const nav = {
  logo: "Melt House",
  links: [
    { label: "Flavours", href: "#flavours" },
    { label: "Cafe menu", href: "#menu" },
    { label: "Deals", href: "#deals" },
    { label: "Parlours", href: "#parlours" },
  ],
  cta: { label: "Order", href: "#build" },
};

export const hero = {
  word: "MELT",
  pill: { label: "Flavour of the week", value: "Salted Caramel Cheesecake" },
  heading: ["Late-night desserts", "*&* gelato"],
  text: "Hand-crafted desserts, premium gelato and artisan coffee. Open late, always fresh, always indulgent.",
  ctas: [
    { label: "Explore menu", href: "#menu" },
    { label: "Visit us", href: "#parlours" },
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
  ink: string; // text colour on the fill
  image: string;
};

export const flavours: Flavour[] = [
  { id: "pistachio", name: "Salted Caramel Cheesecake", note: "Silky vanilla bean cheesecake with salted caramel finish", price: 4.25, tag: "Bestseller", fill: FLAVOUR.pistachio, ink: "#2b1233", image: "/images/melt/scoop-pistachio.webp" },
  { id: "mango", name: "Brownie Sundae Melt", note: "Warm chocolate brownie, vanilla gelato, hot fudge drizzle", price: 4.50, tag: "Late-night pick", fill: FLAVOUR.mango, ink: "#2b1233", image: "/images/melt/scoop-mango.webp" },
  { id: "strawberry", name: "Strawberry Cream", note: "Fresh berries with homemade jam ripple", price: 3.90, tag: "Fresh daily", fill: FLAVOUR.strawberry, ink: "#2b1233", image: "/images/melt/scoop-strawberry.webp" },
  { id: "coffee", name: "Hazelnut Mocha", note: "Dark chocolate mocha with hazelnut and creamy cocoa foam", price: 2.35, tag: "Coffee lover", fill: FLAVOUR.coffee, ink: "#2b1233", image: "/images/melt/scoop-coffee.webp" },
  { id: "cocoa", name: "Belgian Cocoa", note: "70% dark chocolate with fudgy chunks", price: 4.00, tag: "Premium", fill: FLAVOUR.cocoa, ink: "#fff1e6", image: "/images/melt/scoop-cocoa.webp" },
  { id: "meetha", name: "Vanilla Gelato", note: "Classic creamy indulgence", price: 3.75, tag: "Timeless", fill: FLAVOUR.meetha, ink: "#2b1233", image: "/images/melt/scoop-meetha.webp" },
];

export const shelf = {
  eyebrow: "Today's counter",
  heading: ["Today's", "*scoops*"],
  text: "Six flavours on the counter today. Fresh gelato and desserts made daily.",
  unit: "/ scoop",
};

const byId = (id: string) => flavours.find((f) => f.id === id)!;

export const builder = {
  eyebrow: "Build your cone",
  heading: ["Build your", "*cone*"],
  text: "Pick three scoops. We stack them on a waffle cone baked the same morning.",
  cone: "/images/melt/cone-empty.webp",
  coneLine: { name: "Waffle cone", price: "Free" },
  scoops: [byId("pistachio"), byId("mango"), byId("cocoa")],
  tints: ["#fff1f4", "#e9f5e0", "#fff2c9", "#f6e3d8"], // empty cone, then one per scoop
  cta: "Add to order",
};

export const slow = {
  eyebrow: "How it's made",
  heading: ["Made the", "*slow* way"],
  text: "Fresh desserts, premium gelato and artisan coffee—made to order and served late at Melt House.",
  frames: "/frames/melt-pour",
  alt: "Warm chocolate poured over a vanilla scoop, topped with pistachios",
  panel: "linear-gradient(180deg, #e2c4c6, #ebd7dd)", // the video's own background, so the panel and the video blend
  // [scroll progress, scoop centre as a fraction of the frame width]: the crop follows the scoop as the camera pushes in
  focus: [
    [0, 0.74],
    [0.33, 0.66],
    [0.66, 0.57],
    [1, 0.52],
  ] as [number, number][],
  // stickers stay on the pink left side (desktop) / in a row above the video (phone), never over the scoop
  captions: [
    { title: "Fresh milk", text: "every single morning", at: 0.1, pos: "md:left-[4%] md:bottom-[24%]", fill: "#ffffff" },
    { title: "40 minutes", text: "of slow churning", at: 0.35, pos: "md:left-[13%] md:bottom-[6%]", fill: FLAVOUR.mango },
    { title: "20 litres", text: "max per batch", at: 0.6, pos: "md:left-[21%] md:bottom-[33%]", fill: FLAVOUR.pistachio },
  ],
};

export type CafeItem = { name: string; note?: string; tag?: string };
export type CafeCategory = { id: string; name: string; note?: string; tone: string; items: CafeItem[] };

export const cafeMenu = {
  eyebrow: "Melt Cafe · Hounslow",
  heading: ["The cafe", "*menu*"],
  text: "Toasties, sandwiches, wraps and bowls, made fresh all day.",
  categories: [
    {
      id: "toasties",
      name: "Toasties",
      tone: FLAVOUR.meetha,
      items: [
        { name: "Melted Butter Bun & Jam", tag: "Signature" },
        { name: "Butter Toast" },
        { name: "Nutella Toast" },
        { name: "Mascarpone Toast" },
        { name: "Chilli Cheese Toast" },
        { name: "Garlic Bread" },
      ],
    },
    {
      id: "sandwiches",
      name: "Sandwiches",
      tone: FLAVOUR.pistachio,
      items: [
        { name: "Mediterranean Sandwich" },
        { name: "Tomato, Avocado & Mozzarella" },
        { name: "Katsu Soya Chop Sandwich" },
        { name: "Bombay Sandwich" },
        { name: "Murukku Sandwich" },
        { name: "Croissant Sandwich" },
        { name: "Paneer Khurchan Sandwich" },
      ],
    },
    {
      id: "tacos",
      name: "Tacos & quesadilla",
      tone: FLAVOUR.mango,
      items: [
        { name: "Paneer Bhurji Taco" },
        { name: "Crispy Mushroom & Corn Taco" },
        { name: "Tofu Quesadilla" },
      ],
    },
    {
      id: "wraps",
      name: "Wraps",
      tone: FLAVOUR.strawberry,
      items: [
        { name: "Teriyaki Soya Chop & Cheese Wrap", note: "Teriyaki soya chop, onion, purple slaw, lettuce, mint mayo" },
        { name: "Paneer Tikka Wrap", note: "Paneer tikka, purple slaw, lettuce, mint mayo" },
        { name: "Veg Maggi Burrito Wrap" },
        { name: "Jackfruit & Mushroom Fajita Wrap" },
        { name: "BBQ Crispy Tofu Wrap" },
        { name: "Lebanese Wrap" },
        { name: "Falafel Wrap" },
      ],
    },
    {
      id: "panini",
      name: "Panini",
      tone: FLAVOUR.coffee,
      items: [
        { name: "Mushroom & Spinach Melt Panini", note: "Mushroom, spinach and cheese, served with fries" },
        { name: "Caprese Melt Panini" },
      ],
    },
    {
      id: "soups",
      name: "Soups",
      tone: FLAVOUR.mango,
      items: [{ name: "Veg Broth with Barley" }, { name: "Roasted Garlic Tomato Soup" }],
    },
    {
      id: "bowls",
      name: "Smoothie bowls",
      note: "Served with banana, mixed berry compote, fresh berries and basil seeds.",
      tone: FLAVOUR.blueberry,
      items: [{ name: "Green Goddess Bowl" }, { name: "Mixed Berries Smoothie Bowl" }, { name: "Tropical Smoothie Bowl" }],
    },
    {
      id: "mocktails",
      name: "Mocktails",
      tone: FLAVOUR.strawberry,
      items: [{ name: "Passion Colada" }, { name: "Cherry Cola Fizz" }],
    },
  ] as CafeCategory[],
};

export const treats = {
  eyebrow: "The menu",
  heading: ["Pick a", "*treat*"],
  items: [
    { name: "Scoops", count: "6 flavours", tone: FLAVOUR.strawberry, hint: "Scoops in a cup", photo: "/images/melt/cat-scoops.webp" },
    { name: "Sundaes", count: "6 sundaes", tone: FLAVOUR.mango, hint: "Sundae glass", photo: "/images/melt/cat-sundae.webp" },
    { name: "Kulfi", count: "On a stick", tone: FLAVOUR.mango, hint: "Kulfi on a plate", photo: "/images/melt/cat-kulfi.webp" },
    { name: "Thick shakes", count: "6 shakes", tone: FLAVOUR.meetha, hint: "Milkshake", photo: "/images/melt/cat-shake.webp" },
    { name: "Family tubs", count: "500 ml · 1 L", tone: FLAVOUR.pistachio, hint: "Tub, top-down", photo: "/images/melt/cat-tub.webp" },
    { name: "Ice-cream cakes", count: "Order 24 h ahead", tone: FLAVOUR.blueberry, hint: "Ice-cream cake", photo: "/images/melt/cat-cake.webp" },
  ],
};

export const deals = {
  eyebrow: "Sweet deals",
  heading: ["Treat", "*everyone*"],
  text: "Something for dessert lovers and late-night cravings. At Melt House.",
  items: [
    { id: "family", title: "Family tub night", text: "4 tubs of 500 ml, any flavours. Enough for everyone (maybe).", price: "£19.99", was: "£24.50", badge: "Weekdays", tone: FLAVOUR.pistachio, hint: "Perfect trio", photo: "/images/melt/deal-family.webp" },
    { id: "date", title: "Date-night sundae for two", text: "Two spoons, three scoops, warm brownie, hot fudge.", price: "£15.99", badge: "After 7 PM", tone: FLAVOUR.strawberry, hint: "Sundae for two", photo: "/images/melt/deal-date.webp" },
    { id: "happy", title: "Happy hour", text: "Second scoop free. Every day 4–6 PM.", price: "4–6 PM", badge: "Daily", tone: FLAVOUR.cocoa, hint: "" },
    { id: "late", title: "Late-night craving", text: "Any dessert with hot drink. Open till 11:30 PM.", price: "from £8.99", badge: "Every night", tone: FLAVOUR.blueberry, hint: "" },
  ],
};

export const notes = {
  eyebrow: "Love notes",
  heading: ["Sticky *fingers*,", "happy hearts"],
  items: [
    { name: "Ananya & friends", where: "Hounslow", text: "We came for one scoop. We left with a tub each.", rating: 5, tone: FLAVOUR.mango, hint: "Friends with cones", photo: "/images/melt/note-friends.webp", tilt: -4 },
    { name: "Meher, age 7", where: "Hounslow", text: "Strawberry is the best colour AND the best flavour.", rating: 5, tone: FLAVOUR.strawberry, hint: "Kid with a scoop", photo: "/images/melt/note-kid.webp", tilt: 3 },
    { name: "Rahul & Sana", where: "Hounslow", text: "Our Friday date is now a Melt House date.", rating: 5, tone: FLAVOUR.coffee, hint: "Couple at night", photo: "/images/melt/note-couple.webp", tilt: -3 },
    { name: "The Reddys", where: "Hounslow", text: "Late-night indulgence after work. Perfection.", rating: 5, tone: FLAVOUR.pistachio, hint: "Family on a bench", photo: "/images/melt/note-family.webp", tilt: 4 },
  ],
};

export const parlours = {
  eyebrow: "Our parlours",
  heading: ["Come say", "*hi*"],
  text: "One premium location in Hounslow. Walk in anytime.",
  photo: { photo: "/images/melt/parlour.webp", tone: FLAVOUR.pistachio, hint: "Parlour interior" },
  items: [
    { name: "Hounslow", note: "45 Kingsley Rd, TW3 1PA", hours: "10:00 AM – 11:30 PM", late: "Late-night desserts daily" },
  ],
};

export const footer = {
  word: "MELT HOUSE",
  newsletter: {
    title: "Get the new flavour first",
    text: "One email when a new flavour hits the counter. That's it.",
    placeholder: "you@email.com",
  },
  columns: [
    { title: "Eat", links: ["Flavours", "Sundaes", "Coffee", "Shakes"] },
    { title: "Visit", links: ["Hounslow", "Hours", "Directions"] },
    { title: "Hello", links: ["Instagram @melthouse", "WhatsApp Order", "Call 07824 063148"] },
  ],
  note: `Melt House is a design concept; flavours and prices are samples.`,
};
