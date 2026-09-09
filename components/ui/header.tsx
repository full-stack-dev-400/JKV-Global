"use client";

import Logo from "./logo";
import MobileMenu from "./mobile-menu";
import MegaMenu from "../MegaMenu";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function Header() {
  return (
    <header className="absolute z-30 w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Branding */}
          <div className="flex-1">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="relative hidden lg:flex lg:grow lg:justify-center">
            <ul className="flex items-center space-x-6">
              {/* =====================================================
                  MARKET
              ===================================================== */}

              <MegaMenu
                label="Market"
                group={{
                  title: "Market",
                  description:
                    "Explore global markets with professional trading access and advanced trading tools.",
                  button: "Learn More",
                  href: "#",
                  columns: [
                    {
                      heading: "Markets",
                      items: [
                        {
                          label: "Forex CFD",
                          href: "#",
                        },
                        {
                          label: "Indices CFD",
                          href: "#",
                        },
                        {
                          label: "Commodity CFD",
                          href: "#",
                        },
                        {
                          label: "Stock CFD",
                          href: "#",
                        },
                        {
                          label: "Crypto CFD",
                          href: "#",
                        },
                      ],
                    },

                    {
                      heading: "Trading Conditions",
                      items: [
                        {
                          label: "Spreads & Fees",
                          href: "#",
                        },
                        {
                          label: "Execution Speed",
                          href: "#",
                        },
                        {
                          label: "Market Hours",
                          href: "#",
                        },
                      ],
                    },
                  ],
                }}
              />

              {/* =====================================================
                  PLATFORM
              ===================================================== */}

              <MegaMenu
                label="Platform"
                group={{
                  title: "Platform",
                  description:
                    "Trade seamlessly with JKV Global using professional trading platforms across supported devices.",
                  button: "Learn More",
                  href: "#",
                  columns: [
                    {
                      heading: "Trading Platform",
                      items: [
                        {
                          label: "MetaTrader 5",
                          href: "#",
                        },
                        {
                          label: "JKV Trade Mobile",
                          href: "#",
                        },
                        {
                          label: "JKV Web",
                          href: "#",
                        },
                      ],
                    },

                    {
                      heading: "Trading Tools",
                      items: [
                        {
                          label: "Auto Chartist",
                          href: "#",
                        },
                        {
                          label: "Copy Trade",
                          href: "#",
                        },
                        {
                          label: "VPS Hosting",
                          href: "#",
                        },
                        {
                          label: "Calculator",
                          href: "#",
                        },
                      ],
                    },
                  ],
                }}
              />

              {/* =====================================================
                  TRADING
              ===================================================== */}

              <MegaMenu
                label="Trading"
                group={{
                  title: "Trading",
                  description:
                    "Explore JKV Global account options and trading services.",
                  button: "Learn More",
                  href: "#",
                  columns: [
                    {
                      heading: "Account Types",
                      items: [
                        {
                          label: "JKV Global Accounts",
                          href: "#",
                        },
                        {
                          label: "Business",
                          href: "#",
                        },
                        {
                          label: "Prime",
                          href: "#",
                        },
                        {
                          label: "Pro",
                          href: "#",
                        },
                        {
                          label: "ECN",
                          href: "#",
                        },
                        {
                          label: "Demo",
                          href: "#",
                        },
                        {
                          label: "PAMM",
                          href: "#",
                        },
                      ],
                    },

                    {
                      heading: "Extras",
                      items: [
                        {
                          label: "Fund Your Account",
                          href: "#",
                        },
                        {
                          label: "Negative Balance Guard",
                          href: "#",
                        },
                        {
                          label: "Trading Fees & Conditions",
                          href: "#",
                        },
                      ],
                    },
                  ],
                }}
              />

              {/* =====================================================
                  ACADEMY
              ===================================================== */}

              <MegaMenu
                label="Academy"
                group={{
                  title: "Academy",
                  description:
                    "Build your market knowledge with educational resources and trading content.",
                  button: "Explore Academy",
                  href: "#",
                  columns: [
                    {
                      heading: "Learning",
                      items: [
                        {
                          label: "Overview",
                          href: "#",
                        },
                        {
                          label: "Articles",
                          href: "#",
                        },
                        {
                          label: "E-Book",
                          href: "#",
                        },
                        {
                          label: "Trading Terms",
                          href: "#",
                        },
                        {
                          label: "Blogs",
                          href: "#",
                        },
                        {
                          label: "Glossary",
                          href: "#",
                        },
                      ],
                    },
                  ],
                }}
              />

              {/* =====================================================
                  COMPANY
              ===================================================== */}

              <MegaMenu
                label="Company"
                group={{
                  title: "Company",
                  description:
                    "Learn more about JKV Global, regulatory information and client support.",
                  button: "About Us",
                  href: "#",
                  columns: [
                    {
                      heading: "About",
                      items: [
                        {
                          label: "About Us",
                          href: "#",
                        },
                        {
                          label: "Regulatory Supervision",
                          href: "#",
                        },
                        {
                          label: "Legal Documents",
                          href: "#",
                        },
                        {
                          label: "Contact Us",
                          href: "#",
                        },
                        {
                          label: "Privacy Policy",
                          href: "#",
                        },
                      ],
                    },
                  ],
                }}
              />

              {/* =====================================================
                  PROMOTIONS
              ===================================================== */}

              <MegaMenu
                label="Promotions"
                group={{
                  title: "Promotions",
                  description:
                    "Explore available JKV Global campaigns and client offers.",
                  button: "View Promotions",
                  href: "#",
                  columns: [
                    {
                      heading: "Offers",
                      items: [
                        {
                          label: "Bonus",
                          href: "#",
                        },
                        {
                          label: "Loyalty Program",
                          href: "#",
                        },
                      ],
                    },
                  ],
                }}
              />
            </ul>
          </nav>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
