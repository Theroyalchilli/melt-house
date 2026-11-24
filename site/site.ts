import type { SiteMeta, Theme } from "@/lib/site";

// Settings for THIS site: Melt House, café · desserts · drinks · treats in Hounslow. Direction: site/DESIGN.md.

export const meta: SiteMeta = {
  name: "Melt House",
  title: "Melt House — Café · Desserts · Drinks · Treats",
  description: "Café, desserts, drinks and treats in Hounslow: crêpes, Belgian waffles, signature chai, gelato and fresh juices. Freshly made. Beautifully served.",
  loaderText: "MELT HOUSE",
  loader: false, // site/components/CafeLoader.tsx replaces the engine loader
  // ?record=1 uses the section timeline (data-record-* on the sections, docs/RECORDING.md): 37.5 s + the 2.3 s loader ≈ 40 s.
  // duration is only the fallback for constant-speed mode.
  record: { duration: 37 },
};

export const theme: Theme = {
  bg: "#f5ebe0", // cream paper (menu sheet)
  surface: "#fffaf3",
  text: "#3b2418", // chocolate
  muted: "#75553f", // 5.7:1 on bg
  accent: "#8a5a2b", // caramel, darkened so text and white-on-accent pass 4.5:1
  accentText: "#ffffff",
  line: "#e2cfba",
  fontDisplay: "'Poppins', system-ui, sans-serif",
  fontBody: "'Poppins', system-ui, sans-serif",
  radius: 14,
  uppercaseHeadings: false,
  heroText: "#3b2418",
};
