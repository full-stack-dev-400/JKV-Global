"use client";

import { useEffect, useRef, useState, type ElementType } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Headphones,
  Layers3,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

type Feature = {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: ElementType;
  visual: "conditions" | "platforms" | "intelligence" | "trust" | "support";
};

const features: Feature[] = [
  {
    number: "01",
    eyebrow: "Trading Conditions",
    title: "Understand the structure before you trade.",
    description:
      "Keep spreads, commissions, leverage, swaps and other relevant conditions close to the trading decision. Clear information matters more than headline claims.",
    icon: SlidersHorizontal,
    visual: "conditions",
  },
  {
    number: "02",
    eyebrow: "Platform Choice",
    title: "Trade in the environment that fits your workflow.",
    description:
      "Choose between MetaTrader 4, MetaTrader 5 and the JKV App according to the tools, devices and trading workflow you prefer.",
    icon: Layers3,
    visual: "platforms",
  },
  {
    number: "03",
    eyebrow: "Market Intelligence",
    title: "Research the market before execution.",
    description:
      "Bring market analysis, economic events, Trading Central, Acuity and other research tools into the decision-making process.",
    icon: BarChart3,
    visual: "intelligence",
  },
  {
    number: "04",
    eyebrow: "Trust & Transparency",
    title: "Important information should never be hidden.",
    description:
      "Regulatory entities, legal documents, client-fund information and jurisdiction-specific disclosures should remain easy to review.",
    icon: ShieldCheck,
    visual: "trust",
  },
  {
    number: "05",
    eyebrow: "Client Support",
    title: "Reach the right support when you need it.",
    description:
      "Account, platform, funding and general support routes should be clear so clients can reach the appropriate team without unnecessary friction.",
    icon: Headphones,
    visual: "support",
  },
];

/* =========================================================
   PANEL VISUALS
   ========================================================= */

function ConditionsVisual() {
  return (
    <div className="relative flex h-full min-h-[320px] items-center justify-center">
      <div className="w-full max-w-[420px] rounded-[26px] border border-[var(--border)] bg-[var(--surface-translucent)] p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
              Trading structure
            </p>

            <p className="mt-2 font-display text-xl font-semibold text-[var(--foreground)]">
              Conditions
            </p>
          </div>

          <SlidersHorizontal size={20} className="text-[var(--brand)]" />
        </div>

        <div className="mt-8 space-y-6">
          {[
            ["Spread", "Visible"],
            ["Commission", "Clear"],
            ["Leverage", "By jurisdiction"],
            ["Swap", "Specified"],
          ].map(([label, value], index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.08,
                duration: 0.45,
              }}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--muted)]">{label}</span>

                <span className="font-semibold text-[var(--foreground)]">
                  {value}
                </span>
              </div>

              <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-[var(--surface-3)]">
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.15 + index * 0.08,
                  }}
                  style={{
                    transformOrigin: "left",
                  }}
                  className="h-full w-[75%] rounded-full bg-[var(--brand)]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlatformsVisual() {
  return (
    <div className="relative flex h-full min-h-[320px] items-center justify-center">
      <div className="relative w-full max-w-[450px]">
        <div className="rounded-[26px] border border-[var(--border)] bg-[var(--surface-translucent)] p-5 backdrop-blur-xl">
          <div className="flex gap-2">
            {["MT4", "MT5", "JKV APP"].map((item, index) => (
              <div
                key={item}
                className={`rounded-full px-4 py-2 text-[10px] font-bold tracking-[0.1em] ${
                  index === 1
                    ? "bg-[var(--brand)] text-[var(--brand-contrast)]"
                    : "border border-[var(--border)] text-[var(--muted)]"
                }`}
              >
                {item}
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[20px] border border-[var(--border)] bg-[var(--surface-1)] p-5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--brand)]" />

              <span className="text-[10px] uppercase tracking-[0.16em] text-[var(--muted)]">
                Trading workspace
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {[82, 58, 72, 46].map((width, index) => (
                <motion.div
                  key={width}
                  initial={{ width: 0 }}
                  whileInView={{
                    width: `${width}%`,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.1,
                  }}
                  className="h-2 rounded-full bg-[var(--brand)] opacity-70"
                />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-8 -right-5 w-[120px] rounded-[20px] border border-[var(--border)] bg-[var(--surface-1)] p-4 shadow-xl"
        >
          <p className="text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]">
            Device
          </p>

          <p className="mt-1 font-display text-sm font-semibold">Mobile</p>
        </motion.div>
      </div>
    </div>
  );
}

function IntelligenceVisual() {
  return (
    <div className="flex h-full min-h-[320px] items-center justify-center">
      <div className="w-full max-w-[440px] rounded-[26px] border border-[var(--border)] bg-[var(--surface-translucent)] p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
            Market intelligence
          </p>

          <span className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.12em] text-[var(--muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
            Research
          </span>
        </div>

        <div className="mt-8 flex h-[150px] items-end gap-2">
          {[35, 56, 43, 74, 62, 88, 70, 96].map((height, index) => (
            <motion.div
              key={`${height}-${index}`}
              initial={{
                height: "5%",
              }}
              whileInView={{
                height: `${height}%`,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: index * 0.05,
              }}
              className="flex-1 rounded-t-md bg-[var(--brand)] opacity-70"
            />
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2">
          {["Calendar", "Acuity", "Central"].map((item) => (
            <div
              key={item}
              className="rounded-xl border border-[var(--border)] px-3 py-3 text-center text-[10px] font-semibold text-[var(--foreground-soft)]"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TrustVisual() {
  return (
    <div className="relative flex h-full min-h-[320px] items-center justify-center">
      <div className="relative flex h-[270px] w-[270px] items-center justify-center rounded-full border border-[var(--border)]">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-[18px] rounded-full border border-dashed border-[var(--hero-orbit)]"
        />

        <div className="absolute inset-[52px] rounded-full border border-[var(--border)] bg-[var(--surface-translucent)] backdrop-blur-xl" />

        <ShieldCheck size={46} className="relative z-10 text-[var(--brand)]" />

        {["Legal", "Entity", "Funds"].map((item, index) => {
          const positions = [
            "-top-4 left-1/2 -translate-x-1/2",
            "bottom-6 -left-12",
            "bottom-6 -right-12",
          ];

          return (
            <div
              key={item}
              className={`absolute rounded-full border border-[var(--border)] bg-[var(--surface-1)] px-4 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[var(--muted)] ${positions[index]}`}
            >
              {item}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SupportVisual() {
  return (
    <div className="flex h-full min-h-[320px] items-center justify-center">
      <div className="w-full max-w-[440px] space-y-3">
        {[
          ["Account assistance", "Support"],
          ["Platform support", "Technical"],
          ["Funding questions", "Payments"],
          ["General enquiries", "Client team"],
        ].map(([label, type], index) => (
          <motion.div
            key={label}
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
              delay: index * 0.08,
            }}
            className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface-translucent)] px-5 py-4 backdrop-blur-xl"
          >
            <div>
              <p className="text-sm font-semibold text-[var(--foreground)]">
                {label}
              </p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">
                {type}
              </p>
            </div>

            <ArrowRight size={15} className="text-[var(--brand)]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FeatureVisual({ type }: { type: Feature["visual"] }) {
  switch (type) {
    case "conditions":
      return <ConditionsVisual />;

    case "platforms":
      return <PlatformsVisual />;

    case "intelligence":
      return <IntelligenceVisual />;

    case "trust":
      return <TrustVisual />;

    case "support":
      return <SupportVisual />;
  }
}

/* =========================================================
   FEATURE SLIDE
   ========================================================= */

function FeatureSlide({ feature }: { feature: Feature }) {
  const Icon = feature.icon;

  return (
    <article className="relative h-full w-[72vw] min-w-[900px] max-w-[1120px] shrink-0 overflow-hidden rounded-[34px] border border-[var(--border)] bg-[var(--surface-1)]">
      <div className="why-scroll-grid pointer-events-none absolute inset-0 opacity-40" />

      <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[var(--brand-glow)] blur-[130px]" />

      <div className="relative z-10 grid h-full grid-cols-[0.9fr_1.1fr]">
        {/* Content */}

        <div className="flex flex-col justify-between border-r border-[var(--border)] p-10 xl:p-12">
          <div className="flex items-start justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface-translucent)]">
              <Icon size={21} className="text-[var(--brand)]" />
            </div>

            <span className="font-display text-[12px] font-semibold tracking-[0.18em] text-[var(--muted)]">
              JKV / {feature.number}
            </span>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand)]">
              {feature.eyebrow}
            </p>

            <h3 className="mt-5 max-w-[520px] font-display text-[clamp(2.6rem,4vw,4.8rem)] font-medium leading-[0.95] tracking-[-0.06em] text-[var(--foreground)]">
              {feature.title}
            </h3>

            <p className="mt-6 max-w-[500px] text-[15px] leading-7 text-[var(--muted)]">
              {feature.description}
            </p>
          </div>
        </div>

        {/* Visual */}

        <div className="p-8 xl:p-10">
          <FeatureVisual type={feature.visual} />
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   DESKTOP HORIZONTAL SCROLL
   ========================================================= */

function DesktopWhyJKV() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const viewportRef = useRef<HTMLDivElement | null>(null);

  const trackRef = useRef<HTMLDivElement | null>(null);

  const [travelDistance, setTravelDistance] = useState(0);

  const [sectionHeight, setSectionHeight] = useState("420vh");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) {
      return;
    }

    let frame = 0;

    const measure = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        const travel = Math.max(track.scrollWidth - viewport.clientWidth, 0);

        const stickyHeight = viewport.clientHeight;

        setTravelDistance(travel);

        setSectionHeight(`${travel + stickyHeight}px`);
      });
    };

    const resizeObserver = new ResizeObserver(measure);

    resizeObserver.observe(viewport);
    resizeObserver.observe(track);

    measure();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
    };
  }, []);

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -travelDistance]);

  const x = useSpring(rawX, {
    stiffness: 110,
    damping: 28,
    mass: 0.45,
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      style={{
        height: sectionHeight,
      }}
      className="relative hidden bg-[var(--background-secondary)] lg:block"
    >
      <div
        ref={viewportRef}
        className="sticky top-[84px] h-[calc(100svh-84px)] overflow-hidden"
      >
        {/* Background */}

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-10 h-[480px] w-[480px] rounded-full bg-[var(--teal-glow)] blur-[160px]" />

          <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-[var(--brand-glow)] blur-[170px]" />
        </div>

        {/* Top progress */}

        <div className="absolute left-0 right-0 top-0 z-30 h-px bg-[var(--border)]">
          <motion.div
            style={{
              width: progressWidth,
            }}
            className="h-full bg-[var(--brand)]"
          />
        </div>

        {/* Track */}

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="relative z-10 flex h-full w-max items-stretch gap-6 py-9 pl-[max(24px,calc((100vw-1440px)/2+24px))] pr-10"
        >
          {/* Intro slide */}

          <div className="flex h-full w-[38vw] min-w-[500px] max-w-[620px] shrink-0 flex-col justify-between border-r border-[var(--border)] pr-14">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[var(--brand)]" />

                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--muted)]">
                  JKV / Why trade with us
                </p>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[var(--brand)]">
                Why JKV Global
              </p>

              <h2 className="mt-6 font-display text-[clamp(3.8rem,6vw,7rem)] font-medium leading-[0.88] tracking-[-0.075em] text-[var(--foreground)]">
                Built around
                <span className="block text-[var(--brand)]">the trading</span>
                experience.
              </h2>

              <p className="mt-8 max-w-[490px] text-[16px] leading-7 text-[var(--muted)]">
                Evaluate the things that matter: trading conditions, platform
                choice, market research, support and transparent company
                information.
              </p>
            </div>

            <div className="flex items-end justify-between">
              <Link
                href="/en/about/why-jkv"
                className="group inline-flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.13em] text-[var(--foreground)]"
              >
                Why JKV
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>

              <div className="text-right">
                <p className="text-[9px] uppercase tracking-[0.15em] text-[var(--muted)]">
                  Scroll
                </p>

                <p className="mt-1 font-display text-lg text-[var(--foreground)]">
                  ↓
                </p>
              </div>
            </div>
          </div>

          {features.map((feature) => (
            <FeatureSlide key={feature.number} feature={feature} />
          ))}

          {/* End slide */}

          <div className="flex h-full w-[42vw] min-w-[570px] max-w-[700px] shrink-0 flex-col justify-between rounded-[34px] bg-[var(--brand)] p-12 text-[var(--brand-contrast)]">
            <ShieldCheck size={38} />

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] opacity-70">
                Make an informed decision
              </p>

              <h3 className="mt-5 font-display text-[clamp(3rem,5vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.07em]">
                Trust should be visible before you open an account.
              </h3>
            </div>

            <Link
              href="/en/about/regulatory-supervision"
              className="group flex items-center justify-between border-t border-current/20 pt-6 text-sm font-bold"
            >
              Regulatory information
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </motion.div>

        {/* Bottom counter */}

        <div className="pointer-events-none absolute bottom-5 left-0 right-0 z-20">
          <div className="container-shell flex items-center justify-between">
            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
              Scroll to explore
            </span>

            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">
              01 — 05
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   MOBILE VERSION
   ========================================================= */

function MobileWhyJKV() {
  return (
    <section className="relative overflow-hidden bg-[var(--background-secondary)] py-24 lg:hidden">
      <div className="container-shell">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--brand)]">
          Why JKV Global
        </p>

        <h2 className="mt-5 font-display text-[clamp(3rem,14vw,5rem)] font-medium leading-[0.92] tracking-[-0.07em] text-[var(--foreground)]">
          Built around the
          <span className="block text-[var(--brand)]">trading experience.</span>
        </h2>

        <p className="mt-6 text-[15px] leading-7 text-[var(--muted)]">
          Trading conditions, platform choice, market intelligence, transparent
          information and support brought into one experience.
        </p>

        <div className="mt-12 space-y-5">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.number}
                initial={{
                  opacity: 0,
                  y: 30,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                className="overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--surface-1)]"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)]">
                      <Icon size={19} className="text-[var(--brand)]" />
                    </div>

                    <span className="text-[10px] text-[var(--muted)]">
                      {feature.number}
                    </span>
                  </div>

                  <p className="mt-8 text-[9px] font-bold uppercase tracking-[0.18em] text-[var(--brand)]">
                    {feature.eyebrow}
                  </p>

                  <h3 className="mt-4 font-display text-[2.1rem] font-medium leading-[1] tracking-[-0.055em]">
                    {feature.title}
                  </h3>

                  <p className="mt-5 text-sm leading-6 text-[var(--muted)]">
                    {feature.description}
                  </p>
                </div>

                <div className="border-t border-[var(--border)] p-5">
                  <FeatureVisual type={feature.visual} />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   WHY JKV
   ========================================================= */

export function WhyJKV() {
  return (
    <>
      <DesktopWhyJKV />
      <MobileWhyJKV />
    </>
  );
}
