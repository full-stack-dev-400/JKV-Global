"use client";

import Link from "next/link";
import { useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/* =========================================================
   TYPES
========================================================= */

type Service = {
  number: string;
  command: string;
  title: string;
  description: string;
  href: string;
  icon: string[];
};

/* =========================================================
   JKV CONTENT
========================================================= */

const services: Service[] = [
  {
    number: "01",
    command: "markets.connect()",
    title: "Global Markets",
    description:
      "Access forex, metals and CFD markets including commodities, shares and indices through one connected trading environment.",
    href: "/markets",
    icon: ["M4 18V9", "M10 18V5", "M16 18v-7", "M22 18H2", "M4 9l6-4 6 6 6-7"],
  },

  {
    number: "02",
    command: "account.select()",
    title: "Account Types",
    description:
      "Choose between Business, Prime, Pro and ECN accounts with different spread and commission structures and leverage up to 1:400.",
    href: "/trading-account",
    icon: ["M5 4h14v16H5z", "M8 8h8", "M8 12h8", "M8 16h5"],
  },

  {
    number: "03",
    command: "mt5.launch()",
    title: "MetaTrader 5",
    description:
      "Trade through MetaTrader 5 across Android, iOS, desktop and web with charting, market analysis and flexible order management.",
    href: "/platforms/metatrader5",
    icon: [
      "M4 5.5h16v13H4z",
      "M4 9h16",
      "M7 7.2h.01",
      "M9.5 7.2h.01",
      "M12 7.2h.01",
    ],
  },

  {
    number: "04",
    command: "social.follow()",
    title: "Social Trading",
    description:
      "Explore trading providers, compare performance and risk metrics and configure how strategies are followed through JKV Global.",
    href: "/social-trading",
    icon: [
      "M7 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
      "M17 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
      "M2 20c.5-4 2.5-6 5-6s4.5 2 5 6",
      "M12 20c.5-3 2.2-5 5-5s4.5 2 5 5",
    ],
  },

  {
    number: "05",
    command: "trust.verify()",
    title: "Regulation & Trust",
    description:
      "JKV Global presents regulatory oversight, segregated client funds and transparent pricing as core parts of its client experience.",
    href: "/about",
    icon: [
      "M12 3 20 6v5c0 5-3.4 8.4-8 10-4.6-1.6-8-5-8-10V6l8-3Z",
      "m9 12 2 2 4-5",
    ],
  },

  {
    number: "06",
    command: "support.connect()",
    title: "Client Support",
    description:
      "Get support through the account journey including setup, verification, platform access, funding questions and general assistance.",
    href: "/contact",
    icon: [
      "M4 13v-2a8 8 0 0 1 16 0v2",
      "M4 13h3v6H5a1 1 0 0 1-1-1v-5Z",
      "M20 13h-3v6h2a1 1 0 0 0 1-1v-5Z",
      "M17 19c0 1.1-.9 2-2 2h-3",
    ],
  },
];

const headingCharacters = Array.from("WHY JKV GLOBAL");

/* =========================================================
   ARROW ICON
========================================================= */

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" className="h-4 w-4">
      <path
        d="M4 16 16 4M7 4h9v9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   SERVICE ICON
========================================================= */

function ServiceIcon({ paths }: { paths: string[] }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-8 w-8">
      {paths.map((path, index) => (
        <path
          key={`${path}-${index}`}
          data-icon-path
          d={path}
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}

/* =========================================================
   SERVICE CARD
========================================================= */

function ServiceCard({
  service,
  mobile = false,
}: {
  service: Service;
  mobile?: boolean;
}) {
  return (
    <article
      data-desktop-service-card={mobile ? undefined : ""}
      className={
        mobile
          ? "group border-t border-white/15 py-8"
          : `
              group absolute left-1/2 top-1/2
              w-[clamp(290px,25vw,410px)]
              overflow-hidden rounded-[1.25rem]
              border border-white/15
              bg-[#111317]/90
              p-6 text-[#f4f2ea]
              opacity-0 shadow-2xl
              backdrop-blur-xl
              will-change-transform
            `
      }
    >
      <div className="flex items-start justify-between gap-6">
        <div
          className="
            flex h-12 w-12 items-center justify-center
            rounded-full border border-[#20C997]/40
            text-[#20C997]
          "
        >
          <ServiceIcon paths={service.icon} />
        </div>

        <span className="font-mono text-[10px] tracking-[0.16em] text-white/35">
          {service.number}
        </span>
      </div>

      <p className="mt-8 font-mono text-[9px] uppercase tracking-[0.18em] text-[#20C997]">
        $ {service.command}
      </p>

      <h3 className="mt-3 text-2xl font-medium tracking-[-0.045em] sm:text-3xl">
        {service.title}
      </h3>

      <p className="mt-4 max-w-sm text-sm leading-6 text-white/55">
        {service.description}
      </p>

      <Link
        href={service.href}
        className="
          mt-7 flex items-center justify-between
          border-t border-white/15 pt-4
          font-mono text-[9px] uppercase
          tracking-[0.15em]
          transition-colors duration-300
          group-hover:text-[#20C997]
        "
      >
        Explore
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          <ArrowIcon />
        </span>
      </Link>
    </article>
  );
}

/* =========================================================
   JKV GLOBAL MARKET GLOBE

   Replaces the old terminal / software machine.
========================================================= */

function JKVMarketGlobe() {
  return (
    <div className="pointer-events-none absolute inset-0">
      {/* Main ambient green glow */}

      <div
        data-core-glow
        className="
          absolute inset-[4%]
          rounded-full blur-[80px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(32,201,151,0.25) 0%, rgba(32,201,151,0.09) 42%, transparent 72%)",
        }}
      />

      {/* =====================================================
          OUTER TECHNICAL ORBIT
      ===================================================== */}

      <div
        data-core-ring-one
        className="
          absolute inset-[1%]
          rounded-full
          border border-dashed border-[#20C997]/20
          will-change-transform
        "
      >
        {/* Moving-looking orbital point */}

        <span
          className="
            absolute bottom-[11%] left-[13%]
            h-3 w-3 rounded-full
            bg-[#20C997]
            shadow-[0_0_12px_rgba(32,201,151,1),0_0_28px_rgba(32,201,151,0.7)]
            animate-pulse
          "
        />
      </div>

      {/* =====================================================
          SECOND OUTER ORBIT
      ===================================================== */}

      <div
        data-core-ring-two
        className="
          absolute inset-[8%]
          rounded-full
          border border-[#20C997]/25
          will-change-transform
        "
      >
        <span
          className="
            absolute right-[7%] top-[28%]
            h-1.5 w-1.5
            rounded-full
            bg-[#20C997]
            shadow-[0_0_10px_rgba(32,201,151,0.9)]
          "
        />
      </div>

      {/* =====================================================
          THIRD RING
      ===================================================== */}

      <div
        data-core-ring-three
        className="
          absolute inset-[16%]
          rounded-full
          border border-[#20C997]/15
          will-change-transform
        "
      />

      {/* =====================================================
          SPHERICAL GLOBE
      ===================================================== */}

      <div
        className="
          absolute inset-[10%]
          overflow-hidden
          rounded-full
          border border-[#20C997]/45
          shadow-[0_0_50px_rgba(32,201,151,0.14),inset_0_0_55px_rgba(32,201,151,0.08)]
        "
        style={{
          background:
            "radial-gradient(circle at 42% 40%, rgba(32,201,151,0.22) 0%, rgba(6,79,73,0.16) 38%, rgba(1,18,15,0.5) 72%, rgba(1,9,8,0.8) 100%)",
        }}
      >
        {/* Internal glow */}

        <div
          className="
            absolute left-1/2 top-1/2
            h-[58%] w-[58%]
            -translate-x-1/2 -translate-y-1/2
            rounded-full blur-[34px]
          "
          style={{
            background: "rgba(32,201,151,0.18)",
          }}
        />

        {/* =====================================================
            ROTATING GLOBE GRID
        ===================================================== */}

        <div
          className="
            absolute inset-[2%]
            rounded-full
            animate-[spin_32s_linear_infinite]
            motion-reduce:animate-none
          "
        >
          {/* Longitude 1 */}

          <div
            className="
              absolute left-1/2 top-[2%]
              h-[96%] w-[72%]
              -translate-x-1/2
              rounded-[50%]
              border border-[#20C997]/20
            "
          />

          {/* Longitude 2 */}

          <div
            className="
              absolute left-1/2 top-[2%]
              h-[96%] w-[42%]
              -translate-x-1/2
              rounded-[50%]
              border border-[#20C997]/20
            "
          />

          {/* Longitude 3 */}

          <div
            className="
              absolute left-1/2 top-[2%]
              h-[96%] w-[20%]
              -translate-x-1/2
              rounded-[50%]
              border border-[#20C997]/15
            "
          />

          {/* Horizontal latitude */}

          <div
            className="
              absolute left-[3%] top-1/2
              h-[42%] w-[94%]
              -translate-y-1/2
              rounded-[50%]
              border border-[#20C997]/20
            "
          />

          {/* Upper latitude */}

          <div
            className="
              absolute left-[7%] top-[21%]
              h-[28%] w-[86%]
              rounded-[50%]
              border border-[#20C997]/15
            "
          />

          {/* Lower latitude */}

          <div
            className="
              absolute bottom-[20%] left-[7%]
              h-[28%] w-[86%]
              rounded-[50%]
              border border-[#20C997]/15
            "
          />

          {/* Diagonal global orbit 1 */}

          <div
            className="
              absolute left-[-4%] top-[34%]
              h-[34%] w-[108%]
              rotate-[19deg]
              rounded-[50%]
              border border-[#20C997]/20
            "
          />

          {/* Diagonal global orbit 2 */}

          <div
            className="
              absolute left-[-4%] top-[34%]
              h-[34%] w-[108%]
              -rotate-[23deg]
              rounded-[50%]
              border border-[#20C997]/20
            "
          />

          {/* Vertical axis */}

          <div
            className="
              absolute left-1/2 top-[3%]
              h-[94%] w-px
              -translate-x-1/2
              bg-[#20C997]/10
            "
          />

          {/* Horizontal axis */}

          <div
            className="
              absolute left-[3%] top-1/2
              h-px w-[94%]
              -translate-y-1/2
              bg-[#20C997]/10
            "
          />
        </div>

        {/* =====================================================
            GLASS REFLECTION
        ===================================================== */}

        <div
          className="
            absolute left-[15%] top-[7%]
            h-[34%] w-[50%]
            -rotate-[25deg]
            rounded-full
            blur-[5px]
          "
          style={{
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.08), transparent 72%)",
          }}
        />

        {/* =====================================================
            CENTER JKV MARK
        ===================================================== */}

        <div
          className="
            absolute left-1/2 top-1/2 z-20
            flex h-[108px] w-[108px]
            -translate-x-1/2 -translate-y-1/2
            flex-col items-center justify-center
            rounded-full
            border border-[#20C997]/20
            bg-[#020b09]/95
            shadow-[0_0_35px_rgba(32,201,151,0.25)]
            backdrop-blur-xl
            xl:h-[118px] xl:w-[118px]
          "
        >
          <strong
            className="
              text-[25px]
              font-semibold
              tracking-[-0.05em]
              text-[#20C997]
            "
          >
            JKV
          </strong>

          <span
            className="
              mt-1
              font-mono
              text-[7px]
              uppercase
              tracking-[0.26em]
              text-white/35
            "
          >
            Global
          </span>
        </div>
      </div>

      {/* =====================================================
          MARKET LABELS
      ===================================================== */}

      <span
        className="
          absolute left-1/2 top-[-1%]
          -translate-x-1/2
          font-mono text-[8px]
          uppercase tracking-[0.16em]
          text-white/25
        "
      >
        Metals
      </span>

      <span
        className="
          absolute left-[2%] top-1/2
          -translate-y-1/2
          font-mono text-[8px]
          uppercase tracking-[0.16em]
          text-white/25
        "
      >
        Forex
      </span>

      <span
        className="
          absolute right-[2%] top-1/2
          -translate-y-1/2
          font-mono text-[8px]
          uppercase tracking-[0.16em]
          text-white/25
        "
      >
        CFDs
      </span>

      {/* =====================================================
          GLOBAL MARKETS STATUS
      ===================================================== */}

      <div
        className="
          absolute bottom-[1%] left-1/2
          flex -translate-x-1/2
          items-center gap-3
          whitespace-nowrap
          font-mono text-[8px]
          uppercase tracking-[0.15em]
          text-white/30
        "
      >
        <span
          className="
            h-1.5 w-1.5
            rounded-full
            bg-[#20C997]
            shadow-[0_0_10px_rgba(32,201,151,0.85)]
            animate-pulse
          "
        />
        Global Markets
      </div>
    </div>
  );
}

/* =========================================================
   MAIN SERVICES SEQUENCE
========================================================= */

export function ServicesSequence() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const media = gsap.matchMedia();

      media.add(
        "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
        () => {
          const characters = gsap.utils.toArray<HTMLElement>(
            "[data-service-character]",
          );

          const cards = gsap.utils.toArray<HTMLElement>(
            "[data-desktop-service-card]",
          );

          const iconPaths =
            gsap.utils.toArray<SVGPathElement>("[data-icon-path]");

          const stripes = gsap.utils.toArray<HTMLElement>(
            "[data-transition-stripe]",
          );

          const firstRing = section.querySelector<HTMLElement>(
            "[data-core-ring-one]",
          );

          const secondRing = section.querySelector<HTMLElement>(
            "[data-core-ring-two]",
          );

          const thirdRing = section.querySelector<HTMLElement>(
            "[data-core-ring-three]",
          );

          const core = section.querySelector<HTMLElement>(
            "[data-service-core]",
          );

          const coreGlow =
            section.querySelector<HTMLElement>("[data-core-glow]");

          const progress = section.querySelector<HTMLElement>(
            "[data-section-progress]",
          );

          const darkInterface = section.querySelector<HTMLElement>(
            "[data-dark-interface]",
          );

          const outro = section.querySelector<HTMLElement>(
            "[data-services-outro]",
          );

          /* ===================================================
             INITIAL STATES
          =================================================== */

          gsap.set(characters, {
            opacity: 0,
            y: 70,
            filter: "blur(18px)",
          });

          gsap.set(cards, {
            xPercent: -50,
            yPercent: -50,
            opacity: 0,
            scale: 0.86,
          });

          gsap.set(iconPaths, {
            strokeDasharray: 100,
            strokeDashoffset: 100,
          });

          gsap.set(stripes, {
            scaleY: 0,
            transformOrigin: "bottom center",
          });

          gsap.set(progress, {
            scaleY: 0,
            transformOrigin: "top center",
          });

          gsap.set(outro, {
            opacity: 0,
            y: 50,
          });

          /* ===================================================
             TIMELINE
          =================================================== */

          const timeline = gsap.timeline({
            defaults: {
              ease: "none",
            },

            scrollTrigger: {
              id: "jkv-market-sequence",

              trigger: section,

              start: "top top",

              end: "+=5200",

              pin: true,

              scrub: 1,

              anticipatePin: 1,

              invalidateOnRefresh: true,
            },
          });

          /* ===================================================
             STAGE 1
             Heading + globe enter
          =================================================== */

          timeline
            .to(
              progress,
              {
                scaleY: 1,
                duration: 7.4,
              },
              0,
            )

            .to(
              characters,
              {
                opacity: 1,

                y: 0,

                filter: "blur(0px)",

                duration: 0.8,

                stagger: {
                  each: 0.035,
                  from: "start",
                },

                ease: "power3.out",
              },
              0,
            )

            .fromTo(
              core,
              {
                opacity: 0,

                scale: 0.55,

                rotation: -12,
              },
              {
                opacity: 1,

                scale: 1,

                rotation: 0,

                duration: 1,

                ease: "power3.out",
              },
              0.25,
            )

            .fromTo(
              coreGlow,
              {
                opacity: 0,

                scale: 0.4,
              },
              {
                opacity: 0.9,

                scale: 1,

                duration: 1.2,

                ease: "power2.out",
              },
              0.4,
            )

            .to(
              firstRing,
              {
                rotation: 160,

                duration: 2.2,
              },
              0.25,
            )

            .to(
              secondRing,
              {
                rotation: -210,

                duration: 2.2,
              },
              0.25,
            )

            .to(
              thirdRing,
              {
                rotation: 250,

                duration: 2.2,
              },
              0.25,
            );

          /* ===================================================
             STAGE 2
             WHY JKV GLOBAL text fragments
          =================================================== */

          timeline.to(
            characters,
            {
              x: (index) => {
                const distanceFromCenter = index - (characters.length - 1) / 2;

                return distanceFromCenter * 42 + gsap.utils.random(-150, 150);
              },

              y: () => gsap.utils.random(-260, 260),

              rotation: () => gsap.utils.random(-100, 100),

              scale: () => gsap.utils.random(0.55, 1.25),

              opacity: 0,

              filter: "blur(10px)",

              duration: 1,

              stagger: {
                amount: 0.3,
                from: "random",
              },

              ease: "power2.in",
            },

            1.8,
          );

          /* ===================================================
             STAGE 3
             JKV feature cards
          =================================================== */

          cards.forEach((card, index) => {
            const pairIndex = Math.floor(index / 2);

            const isLeft = index % 2 === 0;

            const direction = isLeft ? -1 : 1;

            const pairStart = 2.35 + pairIndex * 1.05;

            const cardPaths =
              card.querySelectorAll<SVGPathElement>("[data-icon-path]");

            timeline

              /* Card enters */

              .fromTo(
                card,
                {
                  x: () => direction * Math.min(window.innerWidth * 0.44, 720),

                  y: () => window.innerHeight * 0.58,

                  rotation: direction * 5,

                  scale: 0.84,

                  opacity: 0,
                },
                {
                  x: () => direction * Math.min(window.innerWidth * 0.23, 390),

                  y: () =>
                    pairIndex === 1
                      ? window.innerHeight * 0.05
                      : window.innerHeight * 0.14,

                  rotation: 0,

                  scale: 1,

                  opacity: 1,

                  duration: 0.58,

                  ease: "power2.out",
                },

                pairStart,
              )

              /* Icon draw */

              .to(
                cardPaths,
                {
                  strokeDashoffset: 0,

                  duration: 0.5,

                  stagger: 0.04,

                  ease: "power2.out",
                },

                pairStart + 0.18,
              )

              /* Card exits */

              .to(
                card,
                {
                  x: () => direction * Math.min(window.innerWidth * 0.31, 520),

                  y: () => -window.innerHeight * 0.65,

                  rotation: direction * -3,

                  scale: 0.9,

                  opacity: 0,

                  duration: 1.15,

                  ease: "power1.in",
                },

                pairStart + 0.7,
              );
          });

          /* ===================================================
             STAGE 4
             Globe powers down
          =================================================== */

          timeline
            .to(
              core,
              {
                scale: 0.72,

                rotation: 12,

                opacity: 0,

                duration: 0.75,

                ease: "power2.in",
              },

              5.2,
            )

            .to(
              coreGlow,
              {
                scale: 1.5,

                opacity: 0,

                duration: 0.65,
              },

              5.15,
            )

            .to(
              darkInterface,
              {
                opacity: 0.25,

                duration: 0.7,
              },

              5.35,
            );

          /* ===================================================
             STAGE 5
             Light transition
          =================================================== */

          timeline

            .to(
              stripes,
              {
                scaleY: 1,

                duration: 0.85,

                stagger: {
                  each: 0.06,

                  from: "start",
                },

                ease: "power3.inOut",
              },

              5.55,
            )

            .to(
              outro,
              {
                opacity: 1,

                y: 0,

                duration: 0.7,

                ease: "power3.out",
              },

              6.25,
            );

          document.fonts?.ready.then(() => {
            ScrollTrigger.refresh();
          });

          return () => {
            timeline.scrollTrigger?.kill();

            timeline.kill();
          };
        },
      );

      return () => {
        media.revert();
      };
    },

    {
      scope: sectionRef,
    },
  );

  return (
    <section
      ref={sectionRef}
      id="why-jkv"
      className="
        relative isolate overflow-hidden
        bg-[#06110f] text-[#f4f7f5]
        lg:h-[100svh]
      "
    >
      {/* =====================================================
          MOBILE
      ===================================================== */}

      <div className="px-6 py-24 sm:px-10 lg:hidden">
        <div
          className="
            font-mono text-[10px]
            uppercase tracking-[0.2em]
            text-[#20C997]
          "
        >
          JKV GLOBAL / TRADING ENVIRONMENT
        </div>

        <h2
          className="
            mt-6
            text-[clamp(3.5rem,15vw,6rem)]
            font-medium
            leading-[0.87]
            tracking-[-0.07em]
          "
        >
          Trade with
          <br />
          JKV Global
        </h2>

        <p className="mt-7 max-w-md text-sm leading-6 text-white/55">
          Explore global markets, choose your account and access the technology,
          support and information designed around your trading journey.
        </p>

        <div className="mt-16">
          {services.map((service) => (
            <ServiceCard key={service.number} service={service} mobile />
          ))}
        </div>

        <Link
          href="/instruments"
          className="
            mt-12 flex w-fit items-center
            gap-12 border-b border-white/40
            pb-3 font-mono text-[10px]
            uppercase tracking-[0.16em]
          "
        >
          Explore markets
          <ArrowIcon />
        </Link>
      </div>

      {/* =====================================================
          DESKTOP
      ===================================================== */}

      <div data-dark-interface className="absolute inset-0 hidden lg:block">
        {/* ===================================================
            TECHNICAL BACKGROUND
        =================================================== */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-0
            opacity-40

            [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)]
            [background-size:72px_72px]
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute left-1/2 top-0
            h-full w-px
            bg-white/10
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute left-0 top-1/2
            h-px w-full
            bg-white/10
          "
        />

        {/* ===================================================
            TOP METADATA
        =================================================== */}

        <div className="absolute left-8 top-7 z-20 flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-[#20C997]" />

          <span
            className="
              font-mono text-[9px]
              uppercase tracking-[0.2em]
              text-white/45
            "
          >
            JKV GLOBAL / MARKET SYSTEM
          </span>
        </div>

        <div
          className="
            absolute right-8 top-7 z-20
            font-mono text-[9px]
            uppercase tracking-[0.2em]
            text-white/35
          "
        >
          STATUS: GLOBAL ACCESS
        </div>

        {/* ===================================================
            LARGE TITLE
        =================================================== */}

        <h2 className="sr-only">Why JKV Global</h2>

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute inset-x-0
            top-[12vh] z-10
            flex justify-center
            whitespace-nowrap
          "
        >
          <div
            className="
              flex
              text-[clamp(5rem,11vw,13rem)]
              font-medium
              leading-none
              tracking-[-0.075em]
            "
          >
            {headingCharacters.map((character, index) => (
              <span
                key={`${character}-${index}`}
                data-service-character
                className="
                    inline-block
                    will-change-transform
                  "
              >
                {character === " " ? "\u00A0" : character}
              </span>
            ))}
          </div>
        </div>

        {/* ===================================================
            CENTER GLOBE
        =================================================== */}

        <div
          data-service-core
          className="
            absolute left-1/2 top-[56%]
            z-10

            aspect-square
            w-[clamp(360px,32vw,560px)]

            -translate-x-1/2
            -translate-y-1/2

            will-change-transform
          "
        >
          <JKVMarketGlobe />
        </div>

        {/* ===================================================
            MOVING CARDS
        =================================================== */}

        <div className="absolute inset-0 z-20">
          {services.map((service) => (
            <ServiceCard key={service.number} service={service} />
          ))}
        </div>

        {/* ===================================================
            BOTTOM INFORMATION
        =================================================== */}

        <div
          className="
            absolute bottom-7 left-8 z-20
            font-mono text-[8px]
            uppercase tracking-[0.18em]
            text-white/30
          "
        >
          Scroll to explore JKV Global
        </div>

        <div
          className="
            absolute bottom-7 right-8 z-20
            font-mono text-[8px]
            uppercase tracking-[0.18em]
            text-white/30
          "
        >
          JKV-MKT / 001
        </div>

        {/* ===================================================
            PROGRESS BAR
        =================================================== */}

        <div
          className="
            absolute bottom-10 right-4
            top-10 z-30
            w-px bg-white/10
          "
        >
          <div
            data-section-progress
            className="
              h-full w-full
              bg-[#20C997]
            "
          />
        </div>
      </div>

      {/* =====================================================
          LIGHT TRANSITION STRIPES
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-40
          hidden grid-cols-6
          lg:grid
        "
      >
        {Array.from({
          length: 6,
        }).map((_, index) => (
          <span
            key={index}
            data-transition-stripe
            className="h-full bg-[#EAFBF6]"
          />
        ))}
      </div>

      {/* =====================================================
          FINAL LIGHT SCREEN
      ===================================================== */}

      <div
        data-services-outro
        className="
          pointer-events-none
          absolute inset-0 z-50

          hidden
          items-center justify-center

          px-12
          text-[#07110f]

          lg:flex
        "
      >
        <div className="max-w-6xl text-center">
          <p
            className="
              font-mono text-[10px]
              uppercase tracking-[0.22em]
              text-black/40
            "
          >
            Markets / Accounts / MT5 / Support
          </p>

          <p
            className="
              mt-7
              text-[clamp(4rem,8vw,10rem)]
              font-medium
              leading-[0.84]
              tracking-[-0.075em]
            "
          >
            Your trading journey.
            <br />
            <span className="text-[#20C997]">Connected.</span>
          </p>

          <p
            className="
              mx-auto mt-8 max-w-2xl
              text-base leading-7
              text-black/55
            "
          >
            From account setup to global market access, JKV Global brings the
            trading journey into one connected experience.
          </p>
        </div>
      </div>
    </section>
  );
}
