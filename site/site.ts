import type { SiteMeta, Theme } from "@/lib/site";

// Melt House: Late-night desserts, gelato and coffee in Hounslow
// Premium dark luxury theme with warm caramel accents

export const meta: SiteMeta = {
  name: "Melt House",
  title: "Melt House — Late-night desserts & coffee",
  description: "Premium hand-crafted desserts, gelato and artisan coffee in Hounslow. Open late for sweet cravings. 45 Kingsley Rd.",
  loaderText: "MELT HOUSE",
  loader: false,
  record: { duration: 40 },
};

export const theme: Theme = {
  bg: "#120d0b",
  surface: "#1c1512",
  text: "#f7f0eb",
  muted: "#d3b9a8",
  accent: "#d98f5c",
  accentText: "#ffffff",
  line: "rgba(255, 255, 255, 0.12)",
  fontDisplay: "'Cormorant Garamond', serif",
  fontBody: "'Manrope', sans-serif",
  radius: 999,
  uppercaseHeadings: false,
  heroText: "#f7f0eb",
};
