import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import StructuredData from "@/components/StructuredData";
import Journey from "@/components/journey/Journey";
import IntroStrip from "@/components/home/IntroStrip";
import Capabilities from "@/components/home/Capabilities";
import CaseStudyRows from "@/components/home/CaseStudyRows";
import Products from "@/components/home/Products";
import Founder from "@/components/home/Founder";
import Faq from "@/components/home/Faq";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
  return (
    <main id="top">
      <StructuredData />
      <SiteNav variant="home" />

      {/* 3D scroll journey (chapters 0–4) */}
      <Journey />

      {/* Light sheet: the site opens into daylight, sliding over the 3D world */}
      <div className="relative z-10 mt-[6vh] overflow-hidden rounded-t-sheet bg-sheet">
        <IntroStrip />
        <Capabilities />
        <CaseStudyRows />
        <Products />
        <Founder />
        <Faq />
        <ContactSection />
        <SiteFooter base="" />
      </div>
    </main>
  );
}
