"use client";

import { useMemo, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ProductsShowcase.module.css";

import BgWaves from "@/public/images/white-futuristic-building-line-texture-texture-3d-rendering.jpg";

import ForexArrows from "@/public/images/forex.png";
import CFDVisual from "@/public/images/_image (1).webp";
import CommoditiesCorn from "@/public/images/_image (2).webp";
import MetalsBars from "@/public/images/_image (3).webp";
import IndicesVisual from "@/public/images/_image (4).webp";
import StocksLogos from "@/public/images/_image (5).webp";

import DiscoverBG from "@/public/images/dicoverbg.webp";

import IconForex from "@/public/images/forex.webp";
import IconCFDs from "@/public/images/_image (1).webp";
import IconCommodities from "@/public/images/_image (2).webp";
import IconIndices from "@/public/images/_image (4).webp";
import IconMetals from "@/public/images/_image (3).webp";
import IconStocks from "@/public/images/_image (5).webp";

type Tab = {
  key: string;
  title: string;
  img: StaticImageData;
  icon: StaticImageData;
  blurb: string;
};

const TABS: Tab[] = [
  {
    key: "forex",
    title: "Forex",
    img: ForexArrows,
    icon: IconForex,
    blurb:
      "Access the global foreign exchange market and trade currency pairs through JKV Global with competitive trading conditions, MetaTrader 5 and practical market support.",
  },
  {
    key: "cfds",
    title: "CFDs",
    img: CFDVisual,
    icon: IconCFDs,
    blurb:
      "CFDs allow traders to take a position on market price movements without owning the underlying asset. JKV Global provides CFD access across supported markets including forex, commodities, shares and indices.",
  },
  {
    key: "commodities",
    title: "Commodities",
    img: CommoditiesCorn,
    icon: IconCommodities,
    blurb:
      "Follow price movements across supported commodity markets through CFDs and use MetaTrader 5 tools to monitor market conditions and manage positions.",
  },
  {
    key: "indices",
    title: "Indices",
    img: IndicesVisual,
    icon: IconIndices,
    blurb:
      "Trade supported index CFDs and gain exposure to broader market movements through a single instrument without directly owning the underlying components.",
  },
  {
    key: "metals",
    title: "Metals",
    img: MetalsBars,
    icon: IconMetals,
    blurb:
      "Access precious metals markets through JKV Global and follow instruments such as gold and other supported metals with competitive trading conditions and advanced platform tools.",
  },
  {
    key: "shares",
    title: "Shares",
    img: StocksLogos,
    icon: IconStocks,
    blurb:
      "Trade supported share CFDs and take a position on the price movements of listed companies without directly owning the underlying shares.",
  },
];

export default function ProductsShowcase() {
  const [idx, setIdx] = useState(0);

  const active = TABS[idx];

  const go = (dir: 1 | -1) => {
    setIdx((i) => (i + dir + TABS.length) % TABS.length);
  };

  const variants = useMemo(
    () => ({
      in: {
        opacity: 0,
        x: 80,
        filter: "blur(6px)",
      } as any,

      center: {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
      } as any,

      out: {
        opacity: 0,
        x: -80,
        filter: "blur(6px)",
      } as any,
    }),
    [],
  );

  return (
    <section className={`section ${styles.section}`}>
      {/* Background waves */}
      <div className={styles.bgWaves} aria-hidden="true">
        <Image
          src={BgWaves}
          alt=""
          fill
          sizes="100vw"
          className={styles.bgWavesImg}
          priority
        />
      </div>

      {/* Decorative curved background */}
      <div className={styles.discoverWrap} aria-hidden="true">
        <div className={styles.discoverInner}>
          <Image
            src={DiscoverBG}
            alt=""
            fill
            className={styles.discoverImg}
            sizes="320px"
          />
        </div>
      </div>

      <div className={`container ${styles.container}`}>
        {/* Heading */}
        <header className={styles.header}>
          <h2 className={`heading ${styles.heading}`}>
            Explore Our{" "}
            <span className={styles.headingAccent}>Trading Instruments</span>
          </h2>

          <p className={`text ${styles.lead}`}>
            Access a broad range of global markets with JKV Global. Explore
            forex, metals and CFDs across commodities, shares and indices
            through MetaTrader 5 and supported account types.
          </p>
        </header>

        {/* Tabs */}
        <div
          className={styles.tabs}
          role="tablist"
          aria-label="Trading instruments"
        >
          {TABS.map((tab, i) => {
            const isActive = i === idx;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setIdx(i)}
                className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                role="tab"
                aria-selected={isActive}
              >
                <Image
                  src={tab.icon}
                  alt=""
                  width={22}
                  height={22}
                  className={styles.tabIcon}
                />

                <span className={styles.tabText}>{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.grid}>
            {/* Image */}
            <div className={styles.mediaCol}>
              <div className={styles.mediaFrame}>
                <div className={styles.radial} aria-hidden="true" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${active.key}-img`}
                    className={styles.mediaMotion}
                    initial={{
                      opacity: 0,
                      x: 80,
                      scale: 0.96,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      x: -80,
                      scale: 0.96,
                    }}
                    transition={{
                      duration: 0.45,
                    }}
                  >
                    <Image
                      src={active.img}
                      alt={`${active.title} trading`}
                      fill
                      className={styles.mediaImg}
                      sizes="(min-width:1536px) 620px, (min-width:1280px) 560px, (min-width:1024px) 520px, 70vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Text */}
            <div className={styles.textCol}>
              <AnimatePresence mode="wait">
                <motion.h3
                  key={`${active.key}-title`}
                  className={styles.title}
                  initial="in"
                  animate="center"
                  exit="out"
                  variants={variants}
                  transition={{
                    duration: 0.45,
                  }}
                >
                  {active.title}
                </motion.h3>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                  key={`${active.key}-text`}
                  className={styles.blurb}
                  initial="in"
                  animate="center"
                  exit="out"
                  variants={variants}
                  transition={{
                    duration: 0.45,
                    delay: 0.05,
                  }}
                >
                  {active.blurb}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* Previous */}
          <button
            type="button"
            aria-label="Previous instrument"
            onClick={() => go(-1)}
            className={styles.prev}
          >
            ‹
          </button>

          {/* Next */}
          <button
            type="button"
            aria-label="Next instrument"
            onClick={() => go(1)}
            className={styles.next}
          >
            ›
          </button>
        </div>

        {/* CTA */}
        <div className={styles.ctaRow}>
          <a href="/register" className={`button ${styles.ctaBtn}`}>
            Open Account
            <span className={styles.ctaArrow}>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
