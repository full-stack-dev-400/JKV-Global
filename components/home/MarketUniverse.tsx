"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

import styles from "./MarketUniverse.module.css";

const marketNodes = [
  { label: "EUR/USD", className: styles.nodeTop },
  { label: "XAU/USD", className: styles.nodeRightTop },
  { label: "NASDAQ", className: styles.nodeRightBottom },
  { label: "GBP/USD", className: styles.nodeBottom },
  { label: "BTC/USD", className: styles.nodeLeftBottom },
  { label: "US OIL", className: styles.nodeLeftTop },
];

const cards = [
  {
    id: "01",
    eyebrow: "GLOBAL ACCESS",
    title: "Markets",
    description:
      "Explore forex, metals and CFD markets through one connected trading environment.",
    className: styles.cardMarkets,
  },
  {
    id: "02",
    eyebrow: "TRADING YOUR WAY",
    title: "Accounts",
    description:
      "Choose between Business, Prime, Pro and ECN account structures built around different trading needs.",
    className: styles.cardAccounts,
  },
  {
    id: "03",
    eyebrow: "META TRADER 5",
    title: "Platform",
    description:
      "Stay connected to global markets across desktop, web and mobile through MetaTrader 5.",
    className: styles.cardPlatform,
  },
  {
    id: "04",
    eyebrow: "BUILT AROUND TRUST",
    title: "Confidence",
    description:
      "Clear trading conditions, regulatory information and client fund safeguards where they matter.",
    className: styles.cardConfidence,
  },
];

export default function MarketUniverse() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.45,
  });

  // Intro heading
  const introOpacity = useTransform(
    smoothProgress,
    [0, 0.06, 0.22, 0.31],
    [0, 1, 1, 0],
  );

  const introBlur = useTransform(
    smoothProgress,
    [0, 0.08, 0.18],
    ["18px", "6px", "0px"],
  );

  const introScale = useTransform(
    smoothProgress,
    [0, 0.2, 0.32],
    [1.2, 1, 0.84],
  );

  const introY = useTransform(
    smoothProgress,
    [0, 0.22, 0.32],
    ["12vh", "0vh", "-16vh"],
  );

  // Market universe
  const universeOpacity = useTransform(
    smoothProgress,
    [0.16, 0.3, 0.82, 0.94],
    [0, 1, 1, 0],
  );

  const universeScale = useTransform(
    smoothProgress,
    [0.15, 0.35, 0.82, 0.94],
    [0.65, 1, 1, 1.08],
  );

  const universeRotate = useTransform(smoothProgress, [0.22, 0.82], [-8, 9]);

  // Cards
  const cardOneOpacity = useTransform(smoothProgress, [0.28, 0.36], [0, 1]);

  const cardOneX = useTransform(smoothProgress, [0.28, 0.38], [-90, 0]);

  const cardTwoOpacity = useTransform(smoothProgress, [0.37, 0.45], [0, 1]);

  const cardTwoX = useTransform(smoothProgress, [0.37, 0.47], [90, 0]);

  const cardThreeOpacity = useTransform(smoothProgress, [0.47, 0.56], [0, 1]);

  const cardThreeX = useTransform(smoothProgress, [0.47, 0.58], [-90, 0]);

  const cardFourOpacity = useTransform(smoothProgress, [0.56, 0.65], [0, 1]);

  const cardFourX = useTransform(smoothProgress, [0.56, 0.67], [90, 0]);

  // Final message
  const finalOpacity = useTransform(smoothProgress, [0.81, 0.91, 1], [0, 1, 1]);

  const finalY = useTransform(smoothProgress, [0.81, 0.94], [80, 0]);

  const universeExitY = useTransform(smoothProgress, [0.82, 1], [0, -130]);

  const cardMotion = [
    { opacity: cardOneOpacity, x: cardOneX },
    { opacity: cardTwoOpacity, x: cardTwoX },
    { opacity: cardThreeOpacity, x: cardThreeX },
    { opacity: cardFourOpacity, x: cardFourX },
  ];

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.sticky}>
        <div className={styles.grid} />
        <div className={styles.noise} />

        {/* INTRO */}
        <motion.div
          className={styles.intro}
          style={{
            opacity: introOpacity,
            scale: introScale,
            y: introY,
            filter: useTransform(introBlur, (value) => `blur(${value})`),
          }}
        >
          <span className={styles.kicker}>
            JKV GLOBAL / GLOBAL MARKET ACCESS
          </span>

          <h2>
            <span>ONE MARKET.</span>
            <span className={styles.outlined}>EVERY OPPORTUNITY.</span>
          </h2>

          <p>
            Move from market discovery to execution through one connected
            trading experience.
          </p>
        </motion.div>

        {/* MAIN UNIVERSE */}
        <motion.div
          className={styles.universeScene}
          style={{
            opacity: universeOpacity,
            scale: universeScale,
            y: universeExitY,
          }}
        >
          <div className={styles.sectionLabel}>
            <span>JKV GLOBAL</span>
            <span>THE TRADING ENVIRONMENT</span>
          </div>

          <div className={styles.cards}>
            {cards.map((card, index) => (
              <motion.article
                key={card.id}
                className={`${styles.card} ${card.className}`}
                style={cardMotion[index]}
              >
                <div className={styles.cardTop}>
                  <span>{card.id}</span>

                  <div className={styles.cardIcon}>
                    <span />
                  </div>
                </div>

                <div>
                  <span className={styles.cardEyebrow}>{card.eyebrow}</span>

                  <h3>{card.title}</h3>

                  <p>{card.description}</p>
                </div>

                <div className={styles.cardBottom}>
                  <span>EXPLORE</span>
                  <span>↗</span>
                </div>
              </motion.article>
            ))}
          </div>

          {/* CENTER MARKET ENGINE */}
          <div className={styles.engineWrap}>
            <motion.div
              className={styles.engine}
              style={{ rotate: universeRotate }}
            >
              <div className={styles.glow} />

              <div className={styles.orbitLarge} />
              <div className={styles.orbitMedium} />
              <div className={styles.orbitSmall} />

              <div className={styles.crossHorizontal} />
              <div className={styles.crossVertical} />

              {marketNodes.map((node) => (
                <div
                  key={node.label}
                  className={`${styles.marketNode} ${node.className}`}
                >
                  <span className={styles.nodeDot} />
                  <span>{node.label}</span>
                </div>
              ))}

              <div className={styles.engineCenter}>
                <div className={styles.logoMark}>JKV</div>

                <span>GLOBAL</span>
                <strong>MARKETS</strong>

                <div className={styles.liveIndicator}>
                  <span />
                  LIVE ENVIRONMENT
                </div>
              </div>
            </motion.div>
          </div>

          <div className={styles.coordinates}>
            <span>FOREX</span>
            <span>METALS</span>
            <span>CFDs</span>
            <span>MT5</span>
          </div>
        </motion.div>

        {/* END MESSAGE */}
        <motion.div
          className={styles.finalMessage}
          style={{
            opacity: finalOpacity,
            y: finalY,
          }}
        >
          <span className={styles.finalKicker}>FROM INSIGHT TO EXECUTION</span>

          <h2>
            Built to keep you
            <br />
            <span>closer to the market.</span>
          </h2>

          <p>
            Explore global markets, choose the trading environment that fits you
            and access JKV Global wherever you trade.
          </p>

          <div className={styles.actions}>
            <a href="/instruments" className={styles.primaryButton}>
              Explore Markets
              <span>↗</span>
            </a>

            <a href="#" className={styles.secondaryButton}>
              Open Account
            </a>
          </div>
        </motion.div>

        <div className={styles.progress}>
          <motion.div
            className={styles.progressInner}
            style={{ scaleX: smoothProgress }}
          />
        </div>
      </div>
    </section>
  );
}
