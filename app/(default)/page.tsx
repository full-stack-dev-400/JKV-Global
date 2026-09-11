// app/page.tsx
export const metadata = {
  title: "Home",
  description: "Page description",
};

// Force this page to be statically generated (no SSR)
export const dynamic = "force-static";

import Hero from "@/components/home/hero";
import MarketUniverse from "@/components/home/MarketUniverse";
import MarqueeTicker from "@/components/home/MarqueeTicker";
import Features02 from "@/components/home/features-02";
import Features03 from "@/components/features-03";

import Features04 from "@/components/features-04";
// import Pricing from "./pricing-section";
import Testimonials from "@/components/testimonials";
import Cta from "@/components/cta";
import PricingBoxes from "@/components/home/PricingBoxes";
import Payment from "@/components/clients";
import ExpandCards from "@/components/home/ExpandCards";
import DiscoverOpportunities from "@/components/home/DiscoverOpportunities";
import { PlatformsTabs } from "@/components/VerticalTabs";
import EconomicCalendar from "@/components/home/EconomicCalendar";
import HowToRegister from "@/components/market/HowToRegister";
import BalanceGuard from "@/components/home/BalanceGuard";
import HowItWorks from "@/components/home/HowItWorks";
import TrustedBrokerSection from "@/components/TrustedBrokerSection";
import AccountTiers from "@/components/home/AccountTiers";

//  slider + product images
import ProductHeroSlider from "@/components/ProductHeroSlider";
import DeviceA from "@/public/images/Terminalmt5.webp";
import DeviceB from "@/public/images/CRM.webp";
import HoverGlowCard from "@/components/registrationsteps";
import ProductsShowcase from "@/components/home/ProductsShowcase";
import { FinalConversion } from "@/components/home/FinalConversion";

//  define slides once at module scope
const slides = [
  {
    id: "a",
    title: "JKV Global platforms",
    headline: "MetaTrader 5",
    copy: "Experience seamless trading with JKV Global’s MetaTrader 5 platform designed for speed, precision, and access to global markets.",
    img: DeviceA,
  },
  {
    id: "b",
    title: "JKV Global CRM",
    headline: "CRM",
    copy: "JKV Global CRM gives traders secure access to deposits, withdrawals, and account management everything in one simple dashboard.",
    img: DeviceB,
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <MarqueeTicker speedSeconds={58} />

      <ExpandCards />
      <MarketUniverse />
      <ProductsShowcase />
      <EconomicCalendar />
      <PlatformsTabs />
      {/* <PricingBoxes /> */}
      {/* <AccountTiers /> */}
      {/* <HoverGlowCard />  */}
      <HowToRegister />
      <Payment />
      {/* <DiscoverOpportunities /> */}
      <BalanceGuard />
      <HowItWorks />
      <FinalConversion />
      {/* <TrustedBrokerSection /> */}

      {/* <Features02 /> */}
      {/* <ProductHeroSlider slides={slides} autoPlayMs={6500} /> */}
      {/* <Features03 /> */}
      {/* <Features04 /> */}
      {/* <Pricing /> */}
      {/* <Testimonials /> */}
      {/* <Cta /> */}
    </>
  );
}
