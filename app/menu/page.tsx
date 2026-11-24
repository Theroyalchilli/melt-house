import type { Metadata, Viewport } from "next";
import MenuApp from "@/site/order/MenuApp";
import "@/site/order/order.css";

// The page the café's single QR code opens (https://www.melthouse.co.uk/menu).
// No engine here (no loader, smooth scroll or animations): it must open instantly on a phone.
export const metadata: Metadata = {
  title: "Menu & Order — Melt House",
  description: "Browse the Melt House menu and send your order to the counter on WhatsApp. Café, desserts, drinks and treats in Hounslow.",
};

export const viewport: Viewport = {
  themeColor: "#e4cbae",
};

export default function MenuPage() {
  return <MenuApp />;
}
