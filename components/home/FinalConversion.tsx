"use client";

import Link from "next/link";
import { ArrowRight, Check, MousePointer2, ShieldCheck } from "lucide-react";

import { motion } from "motion/react";
import { useState } from "react";
import Image from "next/image";

type ConversionMode = "demo" | "live";

type ConversionPanelProps = {
  mode: ConversionMode;
  active: boolean;
  onActivate: () => void;
};

/* =========================================================
   DEMO VISUAL
========================================================= */

function DemoVisual() {
  return (
    <div className="relative flex h-full min-h-[430px] items-center justify-center overflow-hidden">
      {/* Soft atmosphere */}
      <div className="pointer-events-none absolute h-[360px] w-[360px] rounded-full bg-white/[0.035] blur-[80px]" />

      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [-1.2, 0.6, -1.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 h-[410px] w-[290px] md:h-[460px] md:w-[325px] xl:h-[500px] xl:w-[350px]"
      >
        <Image
          src="/images/demo-account-mockup.webp"
          alt="JKV Global demo trading account mobile interface"
          fill
          sizes="(max-width: 1024px) 280px, 350px"
          className="object-contain drop-shadow-[0_35px_55px_rgba(0,0,0,0.45)]"
        />
      </motion.div>

      {/* Label */}
      <motion.div
        animate={{
          y: [0, 7, 0],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[8%] left-[4%] z-20 rounded-xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-xl"
      >
        <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/50">
          Practice First
        </p>

        <p className="mt-1 text-[12px] font-semibold text-white">
          Demo Trading Environment
        </p>
      </motion.div>
    </div>
  );
}

/* =========================================================
   LIVE VISUAL
========================================================= */

function LiveVisual() {
  return (
    <div className="relative flex h-full min-h-[430px] items-center justify-center overflow-hidden">
      {/* JKV Glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.18, 0.3, 0.18],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute h-[400px] w-[400px] rounded-full bg-[var(--brand)] opacity-20 blur-[120px]"
      />

      {/* Phone */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0.8, -0.5, 0.8],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative z-10 h-[420px] w-[300px] md:h-[470px] md:w-[335px] xl:h-[510px] xl:w-[360px]"
      >
        <Image
          src="/images/live-account-mockup.webp"
          alt="JKV Global live trading account mobile interface"
          fill
          sizes="(max-width: 1024px) 290px, 360px"
          className="object-contain drop-shadow-[0_35px_65px_rgba(0,0,0,0.55)]"
        />
      </motion.div>

      {/* Label */}
      <motion.div
        animate={{
          y: [0, 7, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[8%] right-[4%] z-20 rounded-xl border border-[var(--brand)] bg-black/35 px-4 py-3 backdrop-blur-xl"
      >
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--brand)] opacity-40" />

            <span className="relative h-2 w-2 rounded-full bg-[var(--brand)]" />
          </span>

          <p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-white/50">
            Live Account
          </p>
        </div>

        <p className="mt-1 text-[12px] font-semibold text-white">
          Move Into Execution
        </p>
      </motion.div>
    </div>
  );
}

/* =========================================================
   PANEL
========================================================= */

function ConversionPanel({ mode, active, onActivate }: ConversionPanelProps) {
  const isLive = mode === "live";

  const features = isLive
    ? ["Choose your account", "Complete verification", "Fund when ready"]
    : [
        "Explore the platform",
        "Follow market movement",
        "Build familiarity first",
      ];

  return (
    <motion.article
      layout
      onMouseEnter={onActivate}
      onClick={onActivate}
      transition={{
        layout: {
          type: "spring",
          stiffness: 180,
          damping: 26,
        },
      }}
      className={`relative min-h-[620px] cursor-pointer overflow-hidden ${
        active ? "lg:flex-[1.55]" : "lg:flex-[0.8]"
      } ${isLive ? "bg-[#07110f]" : "bg-[#0b1714]"}`}
    >
      {/* Background Grid */}
      <div className="conversion-grid pointer-events-none absolute inset-0 opacity-30" />

      {/* Glow */}
      <motion.div
        animate={{
          opacity: active ? 1 : 0.25,
          scale: active ? 1 : 0.85,
        }}
        transition={{
          duration: 0.55,
        }}
        className={`pointer-events-none absolute h-[520px] w-[520px] rounded-full blur-[160px] ${
          isLive
            ? "-right-44 top-0 bg-[var(--brand)] opacity-20"
            : "-left-44 bottom-0 bg-[var(--brand-deep)] opacity-20"
        }`}
      />

      {/* Active Top Line */}
      {active && (
        <motion.div
          layoutId="conversion-active-line"
          className="absolute left-0 right-0 top-0 z-30 h-[3px] bg-[var(--brand)]"
        />
      )}

      <div className="relative z-10 grid min-h-[620px] lg:grid-cols-[0.92fr_1.08fr]">
        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="flex flex-col justify-center p-8 md:p-10 lg:p-12 xl:p-14">
          {/* Label */}
          <div className="flex items-center gap-3">
            <span
              className={`h-2 w-2 rounded-full ${
                isLive ? "bg-[var(--brand)]" : "bg-white/45"
              }`}
            />

            <p
              className={`text-[11px] font-bold uppercase tracking-[0.16em] ${
                isLive ? "text-[var(--brand)]" : "text-white/55"
              }`}
            >
              {isLive ? "Live Account" : "Demo Account"}
            </p>
          </div>

          {/* Heading */}
          <motion.h3
            layout="position"
            className="mt-6 max-w-[640px] text-[clamp(2rem,3vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.035em] text-white"
          >
            {isLive
              ? "Ready to move from research to execution?"
              : "Want to practise before going live?"}
          </motion.h3>

          {/* Description */}
          <motion.p
            animate={{
              opacity: active ? 1 : 0.55,
            }}
            className="mt-6 max-w-[560px] text-[16px] leading-[1.65] text-white/70"
          >
            {isLive
              ? "Open a live account when you are ready to move into the account, verification and funding process."
              : "Use a demo environment to explore the platform and build familiarity with market access before deciding whether to open a live account."}
          </motion.p>

          {/* Features */}
          <motion.div
            animate={{
              opacity: active ? 1 : 0.5,
            }}
            className="mt-8 space-y-3"
          >
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--brand)]/30 bg-[var(--brand)]/10">
                  <Check size={12} className="text-[var(--brand)]" />
                </span>

                <span className="text-[14px] font-medium text-white/75">
                  {feature}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <div className="mt-9">
            <Link
              href={isLive ? "/en/open-account" : "/en/open-demo"}
              onClick={(event) => event.stopPropagation()}
              className={`inline-flex min-w-[190px] items-center justify-center gap-3 rounded-full px-7 py-4 text-[14px] font-semibold no-underline transition-all duration-300 hover:-translate-y-1 ${
                isLive
                  ? "border border-[var(--brand)] bg-[var(--brand)] text-white hover:border-[var(--brand-hover)] hover:bg-[var(--brand-hover)]"
                  : "border border-white/30 bg-white/10 text-white backdrop-blur-md hover:border-[var(--brand)] hover:bg-[var(--brand)]"
              }`}
            >
              {isLive ? "Open Account" : "Try Demo"}

              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* =====================================================
            VISUAL
        ===================================================== */}

        <motion.div
          animate={{
            opacity: active ? 1 : 0.28,
            scale: active ? 1 : 0.88,
            x: active ? 0 : isLive ? 24 : -24,
          }}
          transition={{
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="hidden lg:block"
        >
          {isLive ? <LiveVisual /> : <DemoVisual />}
        </motion.div>
      </div>

      {/* Ghost Label */}
      <div className="pointer-events-none absolute bottom-[-4%] right-[2%] select-none text-[clamp(7rem,13vw,14rem)] font-bold leading-none tracking-[-0.08em] text-white opacity-[0.025]">
        {isLive ? "LIVE" : "DEMO"}
      </div>
    </motion.article>
  );
}

/* =========================================================
   FINAL CONVERSION
========================================================= */

export function FinalConversion() {
  const [activeMode, setActiveMode] = useState<ConversionMode>("live");

  return (
    <section className="section relative overflow-hidden bg-[var(--bg)]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="conversion-section-grid absolute inset-0 opacity-20" />

        <div className="absolute -left-44 top-0 h-[460px] w-[460px] rounded-full bg-[var(--brand)] opacity-[0.08] blur-[170px]" />
      </div>

      <div className="container relative z-10">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="text-center">
          {/* Kicker */}
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="mb-4 flex items-center justify-center gap-2"
          >
            <MousePointer2 size={16} className="text-[var(--brand)]" />

            <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--brand)]">
              Your Next Move
            </p>
          </motion.div>

          {/* Main heading */}
          <motion.h2
            initial={{
              opacity: 0,
              y: 28,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="heading m-0"
          >
            Practise First.{" "}
            <span className="text-[var(--brand)]">Or Go Live.</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{
              opacity: 0,
              y: 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="text mx-auto mt-5 max-w-[760px]"
          >
            Start in a demo environment or move into the live account-opening
            process when you are ready.
          </motion.p>

          {/* Risk note */}
          <motion.div
            initial={{
              opacity: 0,
              y: 12,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            className="mx-auto mt-5 flex max-w-[680px] items-start justify-center gap-3"
          >
            <ShieldCheck
              size={18}
              className="mt-1 shrink-0 text-[var(--brand)]"
            />

            <p className="text-[13px] leading-6 text-[var(--text-body)]">
              Leveraged trading involves risk. Review the relevant account
              conditions and risk information before opening or funding a live
              account.
            </p>
          </motion.div>
        </header>

        {/* =====================================================
            SPLIT EXPERIENCE
        ===================================================== */}

        <div className="mt-12 overflow-hidden rounded-[32px] border border-[rgba(32,201,151,0.14)] shadow-[0_24px_70px_rgba(0,0,0,0.15)]">
          <div className="flex flex-col lg:flex-row">
            <ConversionPanel
              mode="demo"
              active={activeMode === "demo"}
              onActivate={() => setActiveMode("demo")}
            />

            <div className="h-px bg-white/10 lg:h-auto lg:w-px" />

            <ConversionPanel
              mode="live"
              active={activeMode === "live"}
              onActivate={() => setActiveMode("live")}
            />
          </div>
        </div>

        {/* =====================================================
            CHOICE LABEL
        ===================================================== */}

        <div className="mt-5 flex flex-col justify-between gap-4 px-1 sm:flex-row sm:items-center">
          <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--text-body)]">
            Choose how you want to begin
          </p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setActiveMode("demo")}
              className={`text-[12px] font-bold uppercase tracking-[0.1em] transition-colors ${
                activeMode === "demo"
                  ? "text-[var(--brand)]"
                  : "text-[var(--text-body)]"
              }`}
            >
              Demo
            </button>

            <span className="h-px w-10 bg-[var(--border)]" />

            <button
              type="button"
              onClick={() => setActiveMode("live")}
              className={`text-[12px] font-bold uppercase tracking-[0.1em] transition-colors ${
                activeMode === "live"
                  ? "text-[var(--brand)]"
                  : "text-[var(--text-body)]"
              }`}
            >
              Live
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
