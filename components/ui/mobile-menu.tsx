"use client";

import { useState, useRef, useEffect } from "react";

type SubMenuItem = {
  label: string;
};

type SubMenuSection = {
  title: string;
  items: SubMenuItem[];
};

type MobileMenuGroup = {
  label: string;
  sections: SubMenuSection[];
};

const menuData: MobileMenuGroup[] = [
  {
    label: "Market",
    sections: [
      {
        title: "Markets",
        items: [
          { label: "Forex CFD" },
          { label: "Indices CFD" },
          { label: "Metal CFD" },
          { label: "Stock CFD" },
          { label: "Commodity CFD" },
          { label: "Crypto CFD" },
        ],
      },
    ],
  },

  {
    label: "Platform",
    sections: [
      {
        title: "Trading Platform",
        items: [
          { label: "MetaTrader 5" },
          { label: "MetaTrader Web" },
          { label: "SFX Mobile App" },
          { label: "SFX Web" },
        ],
      },

      {
        title: "Trading Tools",
        items: [
          { label: "Auto Chartist" },
          { label: "Copy Trade" },
          { label: "VPS Hosting" },
          { label: "Calculator" },
        ],
      },
    ],
  },

  {
    label: "Trading",
    sections: [
      {
        title: "Account Types",
        items: [
          { label: "Stonefort Accounts" },
          { label: "Starter" },
          { label: "Advance" },
          { label: "Elite" },
          { label: "Demo" },
          { label: "PAMM" },
        ],
      },

      {
        title: "Extras",
        items: [
          { label: "Fund Your Account" },
          { label: "Negative Balance Guard" },
          { label: "Trading Fees & Conditions" },
        ],
      },
    ],
  },

  {
    label: "Academy",
    sections: [
      {
        title: "Learning",
        items: [
          { label: "Overview" },
          { label: "Articles" },
          { label: "E-Book" },
          { label: "Trading Terms" },
          { label: "Blogs" },
          { label: "Glossary" },
        ],
      },
    ],
  },

  {
    label: "Company",
    sections: [
      {
        title: "About",
        items: [
          { label: "About Us" },
          { label: "Regulatory Supervision" },
          { label: "Legal Documents" },
          { label: "Contact Us" },
          { label: "Privacy Policy" },
        ],
      },
    ],
  },

  {
    label: "Promotions",
    sections: [
      {
        title: "Offers",
        items: [{ label: "Bonus" }, { label: "Loyalty Program" }],
      },
    ],
  },
];

export default function MobileMenu() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const [openGroupIndex, setOpenGroupIndex] = useState<number | null>(null);

  const trigger = useRef<HTMLButtonElement>(null);

  const mobileNav = useRef<HTMLDivElement>(null);

  /* =========================================================
     CLOSE MENU ON OUTSIDE CLICK
  ========================================================= */

  useEffect(() => {
    const clickHandler = (event: MouseEvent) => {
      if (!mobileNav.current || !trigger.current || !mobileNavOpen) {
        return;
      }

      if (
        mobileNav.current.contains(event.target as Node) ||
        trigger.current.contains(event.target as Node)
      ) {
        return;
      }

      setMobileNavOpen(false);
      setOpenGroupIndex(null);
    };

    document.addEventListener("click", clickHandler);

    return () => document.removeEventListener("click", clickHandler);
  }, [mobileNavOpen]);

  /* =========================================================
     CLOSE MENU ON ESC
  ========================================================= */

  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (mobileNavOpen && event.key === "Escape") {
        setMobileNavOpen(false);
        setOpenGroupIndex(null);
      }
    };

    document.addEventListener("keydown", keyHandler);

    return () => document.removeEventListener("keydown", keyHandler);
  }, [mobileNavOpen]);

  /* =========================================================
     LOCK BODY SCROLL
  ========================================================= */

  useEffect(() => {
    const header = document.querySelector("header");

    if (mobileNavOpen) {
      document.body.classList.add("mobile-menu-open");

      header?.classList.add("header-fixed");
    } else {
      document.body.classList.remove("mobile-menu-open");

      header?.classList.remove("header-fixed");
    }

    return () => {
      document.body.classList.remove("mobile-menu-open");

      header?.classList.remove("header-fixed");
    };
  }, [mobileNavOpen]);

  /* =========================================================
     TOGGLE GROUP
  ========================================================= */

  const toggleGroup = (index: number) => {
    setOpenGroupIndex(openGroupIndex === index ? null : index);
  };

  return (
    <div className="lg:hidden flex items-center ml-4 relative">
      {/* =====================================================
          HAMBURGER BUTTON
      ===================================================== */}

      <button
        ref={trigger}
        type="button"
        className="group inline-flex w-8 h-8 text-slate-300 hover:text-white items-center justify-center transition"
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => {
          setMobileNavOpen(!mobileNavOpen);

          if (mobileNavOpen) {
            setOpenGroupIndex(null);
          }
        }}
      >
        <span className="sr-only">Menu</span>

        <svg
          className="w-4 h-4 fill-current pointer-events-none"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] -translate-y-[5px] group-aria-expanded:rotate-[315deg] group-aria-expanded:translate-y-0"
            y="7"
            width="16"
            height="2"
            rx="1"
          />

          <rect
            className="origin-center group-aria-expanded:rotate-45 transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)]"
            y="7"
            width="16"
            height="2"
            rx="1"
          />

          <rect
            className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] translate-y-[5px] group-aria-expanded:rotate-[135deg] group-aria-expanded:translate-y-0"
            y="7"
            width="16"
            height="2"
            rx="1"
          />
        </svg>
      </button>

      {/* =====================================================
          MOBILE NAV
      ===================================================== */}

      <nav
        id="mobile-nav"
        ref={mobileNav}
        className={`fixed top-16 left-0 right-0 bg-[#f3f3f3] shadow-xl rounded-b-lg z-[99999] px-6 overflow-hidden transition-all duration-300 ease-in-out ${
          mobileNavOpen
            ? "opacity-100 max-h-screen py-6 pointer-events-auto"
            : "opacity-0 max-h-0 py-0 pointer-events-none"
        }`}
      >
        <ul className="max-w-[1240px] mx-auto space-y-4">
          {menuData.map((group, index) => (
            <li
              key={group.label}
              className="border-b border-slate-300/40 last:border-none"
            >
              {/* =================================================
                    MAIN MENU GROUP
                ================================================= */}

              <button
                type="button"
                onClick={() => toggleGroup(index)}
                className="w-full flex justify-between items-center py-3 text-left font-semibold text-[#1c3328] hover:text-[#4D6E55] transition"
                aria-expanded={openGroupIndex === index}
              >
                {group.label}

                <svg
                  className={`w-5 h-5 ml-2 transition-transform ${
                    openGroupIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="#4D6E55"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* =================================================
                    SUBMENU
                ================================================= */}

              <div
                className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
                  openGroupIndex === index ? "max-h-[1000px]" : "max-h-0"
                }`}
              >
                {group.sections.map((section) => (
                  <div key={section.title} className="pt-2 pl-4">
                    <h4 className="font-semibold text-[#4D6E55] mb-1">
                      {section.title}
                    </h4>

                    <ul className="space-y-1">
                      {section.items.map((item) => (
                        <li key={item.label}>
                          <span
                            className="
                                    block
                                    text-[#1c3328]
                                    py-1
                                    cursor-default
                                  "
                          >
                            {item.label}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
