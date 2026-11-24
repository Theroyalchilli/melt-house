# Design direction: Melt House café (rebrand, Nov 2026)

**Brief:** Melt House is now a café, not only an ice-cream parlour: café · desserts · drinks · treats at 45 Kingsley Road, Hounslow TW3 1PA. This is the real business site (www.melthouse.co.uk), so it carries real prices and contact details and **no "concept website" note**. Source of truth for the menu: `MeltHouse-Menu-OneSheet.pdf` → `site/menu.ts`.

**The idea in one line:** *a warm, lit-up café sign on a cream wall.* Cream paper, chocolate ink, caramel-gold glow, thin double rules, arched photo frames, dark-brown feature panels. It should feel like the printed menu sheet and the drip-heart sign.

## Choices

| | Choice | Why |
|---|---|---|
| Look | Warm café luxe: cream paper, thin rules, arched photos, dark-brown panels | Matches the new printed menu and the backlit sign |
| Palette | bg `#f5ebe0` · surface `#fffaf3` · text `#3b2418` (chocolate) · muted `#75553f` · accent `#8a5a2b` (caramel) · gold `#e0ad66` (only on dark brown) · sign tan `#e4cbae` | Taken from the sign and menu sheet. Accent darkened from the sheet's `#b5793a` so text passes 4.5:1 (checked: muted 5.7, accent 5.0, white-on-accent 5.9, gold-on-cocoa 7.1) |
| Type pair | **Poppins** (headings + UI, like the sign's lettering) + **Cormorant Garamond italic** (descriptions, like the menu sheet) | One clean geometric sans, one elegant italic. Same as the print, so the QR page feels like the paper menu |
| Logos | `public/images/melt/brand/`: `wordmark-sign.webp` (the framed sign, used in headers), `heart-cutout.webp` (transparent drip heart: hero, nav, QR centre, loader), `app/icon.png`, `app/apple-icon.png` | The café's own logo files |
| Ordering | **One QR code → `/menu`**, basket → **WhatsApp** to +44 7837 052783, pay at the counter. No tables: guest picks *Eat in / Takeaway* and gives a name | Option B: real ordering feel, no payments, no fees, no server |

## Homepage (built, Round 2)

Night-café hero → cream page → chocolate bands, so the page alternates dark / light like the café at night.

| # | Section | What it does |
|---|---|---|
| — | **Loader** `CafeLoader` | Dark wall; the drip heart flickers on like a neon sign, MELT HOUSE spaces out, gold line draws, the wall lifts (2.3 s, supports `&at=`) |
| — | **Nav** `CafeNav` | Transparent over the hero (lit heart, cream text, gold "Order now"), cream bar after the hero. Phone: chocolate full-screen menu |
| 1 | **Hero** `CafeHero` | "Freshly made. *Beautifully* served. Simply indulgent." beside the big backlit heart (breathing glow, floats). Four arched photos sit half on the dark wall, half on the cream page |
| 2 | **Signatures** `Signatures` | Five paper cards with gold-ringed photo medallions, note, price, order arrow. Phone: swipe row |
| 3 | **Ticker** `Ticker` | Chocolate band, favourites drifting in caps + gold italic, drip-heart separators |
| 4 | **Five ways to melt** `MenuIndex` | Editorial index of the 5 menu sections with "from £" prices; an arch photo follows the active row; steps by itself on screen (filming); each row opens /menu at that section |
| 5 | **Gelato** `GelatoBar` | Tan wall, pyramid of five scoop cut-outs (parallax), flavour chips, printed-menu price list with dotted leaders |
| 6 | **Chai** `ChaiBand` | Chocolate band, gold-ringed chai + latte medallions with rising steam, MED / LARGE price card |
| 7 | **Offers** `Offers` | Combos + Melt House Specials as gold double-ruled chocolate panels (same as the print) |
| 8 | **Scan to order** `ScanToOrder` | A tilted table-tent card with the real QR (tested: decodes at 600 / 300 / 160 px) + 3 steps |
| 9 | **Visit** `VisitUs` | The lit sign, address / hours / email rows, directions + order buttons |
| 10 | **Footer** `CafeFooter` | Breathing heart, giant spaced MELT HOUSE, links, contact, allergy note. No "concept" note (real business) |

## /menu (built, Round 1)

Phone-first page with no engine (no loader, smooth scroll or animations), so it opens instantly from the QR.

- Header: chocolate panel with the lit drip heart, MELT HOUSE, tagline, hours pill (`12 pm – 12 am`, not yet confirmed).
- House favourites swipe row; each section opens with a chocolate banner + arch photo; pill tabs with thumbnails; dotted leaders to the price.
- Laptop (≥1024 px): the order sits in a sticky panel beside the menu.
- Sticky search + 5 section tabs (Savouries · Bakery & Gelato · Desserts · Hot Drinks · Cold Drinks).
- Category headers with round photos cropped from the menu sheet (`public/images/melt/menu/`).
- Rows: **+** adds straight away; M/L price buttons add that size; items with choices open a sheet (gelato flavours ×N, combo food + drink, cookie type, extras: sauces, toppings, syrups, juice boosts, single/double shot).
- Combos and Melt House Specials are dark-brown panels with gold prices, like the print.
- Basket saved on the phone (localStorage). Send opens WhatsApp with a neat order + code `MH-1234`; a "show this at the counter" screen covers guests without WhatsApp.
- Allergens: notice at the top and in the basket, plus a free-text "Allergies or requests" box. **No allergen chart yet**: add one when the café has it.

## Assets that would lift it further

The food photos are cropped from the menu PDF, so they are small (75–430 px). The design uses them at near their real size (medallions, small arches). Sharper photos would let the hero and signature cards go bigger. Wanted, all in one warm golden café grade, **at least 1600 px**:
`warm golden café light, dark chocolate-brown background, shallow depth of field, steam, glossy, photorealistic, no text, no logos`
1. Pistachio Kunafa Waffle (hero dish) · 2. Lotus Biscoff Crêpe · 3. Kashmiri Chai in a glass · 4. Melt House Special Cake slice · 5. Melt House Ruby juice · 6. a three-scoop gelato bowl · 7. the café interior at night with the lit sign.

## Still to do (Round 3)

- QR print files: `menu-qr.svg` / `.png`, A6 table card, A5 counter poster.
- Real-phone test: scan from paper, send one order to the café WhatsApp.
- Allergen chart when the café has one.
