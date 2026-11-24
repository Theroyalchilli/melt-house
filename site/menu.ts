// The Melt House menu: the ONE place prices live. The /menu ordering page and the homepage both read from here.
// Source: MeltHouse-Menu-OneSheet.pdf (Nov 2026). Prices in GBP.

export const ORDER = {
  /** WhatsApp number that receives orders, digits only with country code (wa.me format). */
  whatsapp: "447837052783",
  whatsappDisplay: "+44 7837 052783",
  /** The one URL the QR code opens. */
  menuUrl: "https://www.melthouse.co.uk/menu",
  hours: "Open daily · 12 pm – 12 am",
  /** Same hours as numbers (24 h, UK time) for the live "Open now" badge. Not yet confirmed by the café. */
  openHour: 12,
  closeHour: 24,
  address: "45 Kingsley Road · Hounslow TW3 1PA",
  email: "admin@melthouse.co.uk",
  allergyNote: "Please speak to our team about allergens before ordering.",
};

/** A choice the guest must make (one option, or `pick` options, e.g. scoop flavours). */
export type Choice = { id: string; label: string; options: string[]; pick?: number; repeat?: boolean; default?: string };
/** Paid extras the guest can tick. `options` = which one (e.g. which sauce). */
export type Extra = { id: string; label: string; price: number; options?: string[] };

export type Item = {
  id: string;
  name: string;
  desc?: string;
  /** single price, or medium/large */
  price?: number;
  m?: number;
  l?: number | null; // null = no large ("—" on the menu)
  signature?: boolean;
  choices?: Choice[];
  extras?: Extra[];
};

export type Category = {
  id: string;
  name: string;
  blurb: string;
  image?: string;
  sizes?: boolean; // shows MED / LARGE columns
  note?: string;
  panel?: boolean; // dark-brown feature panel (combos, specials)
  items: Item[];
};

export type Section = { id: string; name: string; image: string; categories: Category[] };

const img = (n: string) => `/images/melt/menu/${n}.webp`;

const SHOT: Choice = { id: "shot", label: "Shot", options: ["Single shot", "Double shot"], default: "Single shot" };
const STANDARD_DRINKS = ["Americano (M)", "Cappuccino (M)", "Latte (M)", "Flat White", "Tea (Regular)", "Kadak Chai", "Masala Chai", "Hot Chocolate"];
const GELATO = ["Madagascar vanilla", "Belgian chocolate", "Strawberry", "Mango", "Pistachio", "Cookies & cream"];
const GELATO_EXTRAS: Extra[] = [
  { id: "sauce", label: "Extra sauce", price: 0.5, options: ["Chocolate", "Caramel", "Strawberry"] },
  { id: "topping", label: "Nuts or biscuit topping", price: 0.75, options: ["Pistachio", "Almond", "Biscoff"] },
];
const BOOSTS: Extra[] = [
  { id: "ginger", label: "Ginger", price: 0.5 },
  { id: "turmeric", label: "Turmeric", price: 0.75 },
  { id: "lemon", label: "Lemon", price: 0.4 },
  { id: "lime", label: "Lime", price: 0.4 },
  { id: "mint", label: "Mint", price: 0.4 },
  { id: "protein", label: "Protein", price: 1.95 },
];
const SYRUP: Extra[] = [{ id: "syrup", label: "Add a syrup", price: 0.45, options: ["Caramel", "Hazelnut", "Pistachio", "Coconut", "Vanilla"] }];
const scoops = (n: number): Choice[] => [{ id: "flavours", label: n === 1 ? "Flavour" : `Choose ${n} flavours`, options: GELATO, pick: n, repeat: true }];

export const menu: Section[] = [
  {
    id: "savouries",
    name: "Savouries",
    image: img("savouries"),
    categories: [
      {
        id: "toasties",
        name: "Toasties",
        blurb: "Golden toasted sandwiches with delicious fillings",
        image: img("toasties"),
        items: [
          { id: "butter-toastie", name: "Butter Toastie", price: 2.95 },
          { id: "nutella-toastie", name: "Nutella Toastie", price: 3.45 },
          { id: "mascarpone-toastie", name: "Mascarpone Toastie", price: 3.75 },
          { id: "chilli-cheese-toastie", name: "Chilli Cheese Toastie", price: 4.25 },
          { id: "avocado-toastie", name: "Avocado Toastie", price: 4.25 },
        ],
      },
      {
        id: "sandwiches",
        name: "Sandwiches",
        blurb: "Freshly made, served with a side salad",
        image: img("sandwiches"),
        items: [
          { id: "tomato-avocado-mozzarella", name: "Tomato, Avocado & Mozzarella", price: 5.95 },
          { id: "paneer-bhurji-sandwich", name: "Paneer Bhurji Sandwich", price: 5.95 },
          { id: "croissant-sandwich", name: "Croissant Sandwich", price: 6.25 },
        ],
      },
      {
        id: "wraps",
        name: "Wraps",
        blurb: "Soft tortillas with fresh, flavourful fillings",
        image: img("wraps"),
        items: [
          { id: "paneer-tikka-wrap", name: "Paneer Tikka Wrap", price: 5.95 },
          { id: "falafel-wrap", name: "Falafel Wrap", price: 5.75 },
          { id: "hummus-avocado-wrap", name: "Hummus & Avocado Wrap", price: 5.75 },
        ],
      },
      {
        id: "panini",
        name: "Panini",
        blurb: "Pressed, grilled panini with indulgent fillings",
        image: img("panini"),
        items: [
          { id: "mushroom-spinach-melt", name: "Mushroom & Spinach Melt", price: 6.25 },
          { id: "mozzarella-cheese-pesto", name: "Mozzarella, Cheese & Pesto", price: 6.25 },
        ],
      },
      {
        id: "combos",
        name: "Combo Offers",
        blurb: "With any standard drink",
        panel: true,
        note: "Standard drinks: Americano (M) · Cappuccino (M) · Latte (M) · Flat White · Tea (Regular) · Kadak Chai · Masala Chai · Hot Chocolate",
        items: [
          { id: "toastie-combo", name: "Toastie Combo", price: 6.45, choices: [{ id: "food", label: "Toastie", options: ["Butter Toastie", "Nutella Toastie", "Mascarpone Toastie", "Chilli Cheese Toastie", "Avocado Toastie"] }, { id: "drink", label: "Drink", options: STANDARD_DRINKS }] },
          { id: "sandwich-combo", name: "Sandwich Combo", price: 6.95, choices: [{ id: "food", label: "Sandwich", options: ["Tomato, Avocado & Mozzarella", "Paneer Bhurji Sandwich", "Croissant Sandwich"] }, { id: "drink", label: "Drink", options: STANDARD_DRINKS }] },
          { id: "wrap-combo", name: "Wrap Combo", price: 6.95, choices: [{ id: "food", label: "Wrap", options: ["Paneer Tikka Wrap", "Falafel Wrap", "Hummus & Avocado Wrap"] }, { id: "drink", label: "Drink", options: STANDARD_DRINKS }] },
          { id: "panini-combo", name: "Panini Combo", price: 7.45, choices: [{ id: "food", label: "Panini", options: ["Mushroom & Spinach Melt", "Mozzarella, Cheese & Pesto"] }, { id: "drink", label: "Drink", options: STANDARD_DRINKS }] },
        ],
      },
    ],
  },
  {
    id: "bakery",
    name: "Bakery & Gelato",
    image: img("gelato"),
    categories: [
      {
        id: "croissants",
        name: "Croissants",
        blurb: "Fresh, flaky and buttery",
        image: img("croissants"),
        items: [
          { id: "butter-croissant", name: "Classic Butter Croissant", price: 2.5 },
          { id: "almond-croissant", name: "Almond Croissant", price: 3.5 },
          { id: "brownie-croissant", name: "Chocolate Brownie Croissant", price: 3.75 },
          { id: "pistachio-croissant", name: "Pistachio Croissant", price: 3.95 },
        ],
      },
      {
        id: "bakery-treats",
        name: "Bakery & Treats",
        blurb: "Muffins, pastries and sweet bakes",
        image: img("bakery"),
        items: [
          { id: "cinnamon-roll", name: "Cinnamon Roll", price: 3.75 },
          { id: "choc-chip-muffin", name: "Chocolate Chip Muffin", price: 3.25 },
          { id: "blueberry-muffin", name: "Blueberry Muffin", price: 3.25 },
          { id: "red-velvet-muffin", name: "Red Velvet Muffin", price: 3.25 },
          { id: "pain-au-chocolat", name: "Pain au Chocolat", price: 2.95 },
          { id: "danish-pastry", name: "Danish Pastry", price: 3.25 },
          { id: "scone", name: "Scone with Jam & Cream", desc: "Seasonal", price: 3.25 },
          { id: "cookies", name: "Cookies", desc: "Choc chip or oat & raisin", price: 1.95, choices: [{ id: "cookie", label: "Cookie", options: ["Choc chip", "Oat & raisin"] }] },
        ],
      },
      {
        id: "gelato",
        name: "Ice Cream & Gelato",
        blurb: "Creamy, premium scoops",
        image: img("gelato"),
        note: "Madagascar vanilla · Belgian chocolate · Strawberry · Mango · Pistachio · Cookies & cream",
        items: [
          { id: "one-scoop", name: "One Scoop", price: 2.45, choices: scoops(1), extras: GELATO_EXTRAS },
          { id: "two-scoops", name: "Two Scoops", price: 3.95, choices: scoops(2), extras: GELATO_EXTRAS },
          { id: "three-scoops", name: "Three Scoops", price: 5.45, choices: scoops(3), extras: GELATO_EXTRAS },
          { id: "six-scoop-platter", name: "Six-Scoop Sharing Platter", price: 9.95, choices: scoops(6), extras: GELATO_EXTRAS },
        ],
      },
      {
        id: "shots",
        name: "Juice Boosts & Shots",
        blurb: "Boosts can be added to any juice or smoothie",
        items: [
          { id: "ginger-shot", name: "Ginger Shot", price: 1.95 },
          { id: "turmeric-shot", name: "Turmeric Shot", price: 2.25 },
          { id: "glt-shot", name: "Ginger, Lemon & Turmeric Shot", price: 2.75 },
        ],
      },
    ],
  },
  {
    id: "desserts",
    name: "Desserts",
    image: img("desserts"),
    categories: [
      {
        id: "crepes",
        name: "Crêpes",
        blurb: "Light, delicate crêpes with delicious fillings",
        image: img("crepes"),
        items: [
          { id: "nutella-crepe", name: "Classic Nutella Crêpe", desc: "Nutella and chocolate drizzle", price: 7.45 },
          { id: "strawberry-banana-crepe", name: "Strawberry & Banana Crêpe", desc: "Fresh strawberries, banana and Belgian chocolate sauce", price: 7.95 },
          { id: "biscoff-crepe", name: "Lotus Biscoff Crêpe", desc: "Biscoff spread, biscuit crumble and caramel drizzle", price: 8.45 },
          { id: "pistachio-crepe", name: "Pistachio Dream Crêpe", desc: "Pistachio cream, white chocolate and crushed pistachios", price: 8.95 },
        ],
      },
      {
        id: "waffles",
        name: "Belgian Waffles",
        blurb: "Golden and fluffy",
        image: img("waffles"),
        items: [
          { id: "classic-waffle", name: "Classic Belgian Waffle", desc: "Maple-style syrup and a dusting of icing sugar", price: 6.95 },
          { id: "nutella-banana-waffle", name: "Nutella & Banana Waffle", desc: "Banana slices, Nutella and Belgian chocolate drizzle", price: 8.45 },
          { id: "biscoff-waffle", name: "Lotus Biscoff Waffle", desc: "Warm Biscoff spread, biscuit pieces and caramel sauce", price: 8.95 },
          { id: "kunafa-waffle", name: "Pistachio Kunafa Waffle", desc: "Our signature: pistachio cream, crispy kunafa, white chocolate and crushed pistachios", price: 9.95, signature: true },
        ],
      },
      {
        id: "pancakes",
        name: "Pancakes",
        blurb: "Fluffy pancakes, freshly made to order",
        image: img("pancakes"),
        items: [
          { id: "maple-pancakes", name: "Classic Maple Pancakes", desc: "With maple-style syrup", price: 5.45 },
          { id: "nutella-banana-pancakes", name: "Nutella & Banana Pancakes", desc: "Nutella, banana and chocolate drizzle", price: 6.45 },
          { id: "strawberry-white-choc-pancakes", name: "Strawberry & White Chocolate", desc: "Fresh strawberries and white chocolate", price: 6.95 },
          { id: "biscoff-pancakes", name: "Lotus Biscoff Pancakes", desc: "Biscoff spread, crumbs and caramel", price: 6.95 },
        ],
      },
      {
        id: "cakes",
        name: "Cakes & Cheesecakes",
        blurb: "Cakes, cheesecakes and house specials",
        image: img("cakes"),
        items: [
          { id: "belgian-chocolate-cake", name: "Belgian Chocolate Cake", desc: "Rich chocolate sponge with chocolate ganache", price: 4.75 },
          { id: "red-velvet-cake", name: "Red Velvet Cake", desc: "Soft sponge with cream cheese frosting", price: 4.45 },
          { id: "biscoff-cheesecake", name: "Lotus Biscoff Cheesecake", desc: "Creamy cheesecake, Biscoff spread and biscuit crumbs", price: 4.95 },
          { id: "carrot-cake", name: "Carrot Cake", desc: "Moist spiced cake with walnuts and cream cheese frosting", price: 4.75 },
          { id: "kunafa-cake", name: "Kunafa Cake", desc: "Crispy kunafa, creamy filling and pistachios", price: 5.25 },
          { id: "special-cake", name: "Melt House Special Cake", desc: "Our signature layered cake with chocolate, caramel and hazelnut", price: 5.45, signature: true },
        ],
      },
    ],
  },
  {
    id: "hot",
    name: "Hot Drinks",
    image: img("hot-drinks"),
    categories: [
      {
        id: "coffee",
        name: "Coffee",
        blurb: "Barista-brewed, rich and smooth",
        image: img("coffee"),
        sizes: true,
        note: "Single or double shot available",
        items: [
          { id: "espresso", name: "Espresso", m: 1.95, l: 2.95, choices: [SHOT] },
          { id: "americano", name: "Americano", m: 2.75, l: 3.45, choices: [SHOT] },
          { id: "cortado", name: "Cortado", m: 1.95, l: 2.95, choices: [SHOT] },
          { id: "cappuccino", name: "Cappuccino", m: 3.25, l: 3.75, choices: [SHOT] },
          { id: "latte", name: "Latte", m: 3.25, l: 3.75, choices: [SHOT] },
          { id: "flat-white", name: "Flat White", m: 3.45, l: null, choices: [SHOT] },
          { id: "mocha", name: "Mocha", m: 3.65, l: 4.15, choices: [SHOT] },
          { id: "kadak-coffee", name: "Kadak Coffee", m: 2.95, l: 3.45 },
        ],
      },
      {
        id: "chai",
        name: "Signature Chai",
        blurb: "Authentic, aromatic chai blends",
        image: img("chai"),
        sizes: true,
        note: "Other flavours available, please ask",
        items: [
          { id: "kadak-chai", name: "Kadak Chai", m: 2.45, l: 2.95 },
          { id: "masala-chai", name: "Masala Chai", m: 2.45, l: 2.95 },
          { id: "kashmiri-chai", name: "Kashmiri Chai", m: 3.95, l: 4.55 },
          { id: "chai-latte", name: "Chai Latte", m: 3.25, l: 3.75 },
        ],
      },
      {
        id: "teas",
        name: "Premium Teas",
        blurb: "A curated selection of fine teas",
        image: img("teas"),
        sizes: true,
        items: [
          { id: "english-breakfast", name: "English Breakfast", m: 2.95, l: 3.45 },
          { id: "earl-grey", name: "Earl Grey", m: 2.95, l: 3.45 },
          { id: "green-tea", name: "Green Tea", m: 2.95, l: 3.45 },
          { id: "jasmine-tea", name: "Jasmine Tea", m: 2.95, l: 3.45 },
          { id: "peppermint-tea", name: "Peppermint Tea", m: 2.95, l: 3.45 },
          { id: "lemon-ginger-tea", name: "Lemon & Ginger", m: 2.95, l: 3.45 },
        ],
      },
      {
        id: "hot-chocolate",
        name: "Hot Chocolate",
        blurb: "Rich, creamy and indulgent",
        image: img("hot-chocolate"),
        items: [{ id: "hot-chocolate", name: "Classic Hot Chocolate", price: 3.95, extras: SYRUP }],
      },
      {
        id: "specials",
        name: "Melt House Specials",
        blurb: "House favourites · Medium / Large",
        panel: true,
        sizes: true,
        items: [
          { id: "turmeric-latte", name: "Turmeric Latte", m: 4.25, l: 4.75, signature: true },
          { id: "special-chai-latte", name: "Chai Latte", m: 3.25, l: 3.75 },
          { id: "special-kadak-chai", name: "Kadak Chai", m: 2.45, l: 2.95 },
          { id: "special-kadak-coffee", name: "Kadak Coffee", m: 2.95, l: 3.45 },
        ],
      },
    ],
  },
  {
    id: "cold",
    name: "Cold Drinks",
    image: img("cold-drinks"),
    categories: [
      {
        id: "juices",
        name: "Fresh Juices",
        blurb: "Freshly pressed and made to order",
        image: img("juices"),
        items: [
          { id: "orange", name: "Pure Orange", price: 4.45, extras: BOOSTS },
          { id: "sugarcane", name: "Fresh Sugarcane", price: 5.45, extras: BOOSTS },
          { id: "pineapple", name: "Tropical Pineapple", price: 4.95, extras: BOOSTS },
          { id: "abc", name: "ABC", desc: "Apple, beetroot and carrot", price: 5.45, extras: BOOSTS },
          { id: "green-refresh", name: "Green Refresh", desc: "Green apple, cucumber, mint and lime", price: 5.45, extras: BOOSTS },
          { id: "ruby", name: "Melt House Ruby", desc: "Watermelon, strawberry and mint", price: 5.45, extras: BOOSTS, signature: true },
        ],
      },
      {
        id: "smoothies",
        name: "Smoothies",
        blurb: "Creamy fruit blends",
        image: img("smoothies"),
        items: [
          { id: "strawberry-smoothie", name: "Strawberry", price: 5.45, extras: BOOSTS },
          { id: "mango-smoothie", name: "Mango", price: 5.45, extras: BOOSTS },
          { id: "banana-smoothie", name: "Banana", price: 5.25, extras: BOOSTS },
          { id: "berry-blast", name: "Berry Blast", price: 5.95, extras: BOOSTS },
          { id: "tropical-smoothie", name: "Tropical", desc: "Mango, pineapple and banana", price: 5.95, extras: BOOSTS },
          { id: "green-smoothie", name: "Green", desc: "Apple, spinach, mint and banana", price: 5.95, extras: BOOSTS },
        ],
      },
      {
        id: "milkshakes",
        name: "Thick Milkshakes",
        blurb: "Rich, dessert-style shakes",
        image: img("milkshakes"),
        items: [
          { id: "vanilla-shake", name: "Vanilla", price: 5.75 },
          { id: "chocolate-shake", name: "Chocolate", price: 5.75 },
          { id: "strawberry-shake", name: "Strawberry", price: 5.75 },
          { id: "oreo-shake", name: "Oreo", price: 6.25 },
          { id: "biscoff-shake", name: "Lotus Biscoff", price: 6.25 },
          { id: "pistachio-shake", name: "Pistachio", price: 6.5 },
        ],
      },
      {
        id: "frappes",
        name: "Frappés",
        blurb: "Chilled, blended, café-style",
        image: img("frappes"),
        items: [
          { id: "coffee-frappe", name: "Coffee", price: 5.75 },
          { id: "mocha-frappe", name: "Mocha", price: 5.95 },
          { id: "vanilla-frappe", name: "Vanilla", price: 5.75 },
          { id: "caramel-frappe", name: "Caramel", price: 5.95 },
          { id: "chocolate-frappe", name: "Chocolate", price: 5.95 },
          { id: "cookies-cream-frappe", name: "Cookies & Cream", price: 6.25 },
        ],
      },
    ],
  },
];

/** Name for the order message: "Strawberry" alone is ambiguous, so drinks listed by flavour get their kind added. */
const KIND: Record<string, string> = { smoothies: "Smoothie", milkshakes: "Milkshake", frappes: "Frappé" };
export const fullName = (item: Item, cat: Category) =>
  cat.id === "gelato" ? `Gelato: ${item.name}` : KIND[cat.id] ? `${item.name} ${KIND[cat.id]}` : item.name;

export const gbp = (n: number) => `£${n.toFixed(2)}`;
