import CafeLoader from "./components/CafeLoader";
import CafeNav from "./components/CafeNav";
import CafeHero from "./components/CafeHero";
import Signatures from "./components/Signatures";
import Ticker from "./components/Ticker";
import MenuIndex from "./components/MenuIndex";
import GelatoBar from "./components/GelatoBar";
import ChaiBand from "./components/ChaiBand";
import Offers from "./components/Offers";
import ScanToOrder from "./components/ScanToOrder";
import VisitUs from "./components/VisitUs";
import CafeFooter from "./components/CafeFooter";
import { brand } from "./content";

/** Melt House café homepage. Direction: site/DESIGN.md. Ordering lives at /menu (app/menu). */
export default function Page() {
  return (
    <>
      {/* never restore the old scroll position on reload · ?record=1: hide the mouse arrow from the very first frame */}
      <script
        dangerouslySetInnerHTML={{
          __html: `history.scrollRestoration="manual";if(/[?&]record/.test(location.search)){var s=document.createElement("style");s.textContent="*,*::before,*::after{cursor:none!important}html{scrollbar-width:none}html::-webkit-scrollbar{display:none}";document.head.appendChild(s)}`,
        }}
      />
      <CafeLoader heart={brand.heart} />
      <CafeNav />
      <main className="relative z-[1] overflow-x-clip">
        <CafeHero />
        <Signatures />
        <Ticker />
        <MenuIndex />
        <GelatoBar />
        <ChaiBand />
        <Offers />
        <ScanToOrder />
        <VisitUs />
      </main>
      <CafeFooter />
    </>
  );
}
