"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import asImg from "@/public/images/registerrightimg.webp";
import styles from "./HowToRegister.module.css";

/* ---------------- ROLLING NUMBER (UNCHANGED) ---------------- */

const RollingNumber = ({
  initial,
  minStep = 20,
  maxStep = 30,
  activeMs = 2600,
  pauseMs = 1500,
}: {
  initial: number;
  minStep?: number;
  maxStep?: number;
  activeMs?: number;
  pauseMs?: number;
}) => {
  const [value, setValue] = useState(initial);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    let timeoutId: NodeJS.Timeout | null = null;

    const randStep = () =>
      Math.floor(Math.random() * (maxStep - minStep + 1)) + minStep;

    const startPhase = () => {
      intervalId = setInterval(() => {
        setValue((prev) => prev + randStep());
      }, 180);

      timeoutId = setTimeout(() => {
        if (intervalId) clearInterval(intervalId);

        timeoutId = setTimeout(() => {
          startPhase();
        }, pauseMs);
      }, activeMs);
    };

    startPhase();

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [activeMs, pauseMs, maxStep, minStep]);

  return <span>{value.toLocaleString()}</span>;
};

/* ---------------- MAIN SECTION ---------------- */

export default function HowToRegister() {
  const steps = [
    {
      id: 1,
      title: "Register",
      text: "Sign up with your email and instantly access a free demo account.",
    },
    {
      id: 2,
      title: "Answer",
      text: "Complete a quick suitability check so we can ensure our products are right for you.",
    },
    {
      id: 3,
      title: "Verify",
      text: "Secure your account with a simple verification process. Your safety always comes first.",
    },
    {
      id: 4,
      title: "Fund",
      text: "All set. Add funds and start trading global markets with confidence.",
    },
  ];

  return (
    <section className={`section ${styles.section}`}>
      <div className={`container ${styles.inner}`}>
        {/* LEFT */}
        <div className={styles.content}>
          <h2 className={`title ${styles.title}`}>Ready to trade smarter?</h2>

          <p className={`text ${styles.lead}`}>
            Move to JKV Global and become part of a global community of active
            traders. Apply in minutes with a fast, streamlined onboarding
            experience.
          </p>

          <div className={styles.steps}>
            {steps.map((s) => (
              <div className={styles.step} key={s.id}>
                <div className={styles.stepNumber}>{s.id}</div>

                <div className={styles.stepBody}>
                  <h4 className={styles.stepTitle}>{s.title}</h4>

                  <p className={styles.stepText}>{s.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* use GLOBAL .button */}
          <a href="/register" className={`button ${styles.cta}`}>
            Open Your Account
          </a>
        </div>

        {/* RIGHT */}
        <div className={styles.imageWrapper}>
          <Image
            src={asImg}
            alt="JKV Global onboarding"
            className={styles.image}
            fill
            priority
          />

          {/* ===== STEP 1 – REGISTER ===== */}
          <div className={`${styles.statCard} ${styles.card1}`}>
            <div className={styles.stepCardHeader}>Step 1</div>

            <svg
              className={styles.stepIconSvg}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="3" ry="3" />

              <path d="M7 8l2 2l4 -4" />
              <path d="M7 12l2 2l4 -4" />
              <path d="M7 16l2 2l4 -4" />
            </svg>

            <div className={styles.stepCardTitle}>Register</div>
          </div>

          {/* ===== STEP 2 – ANSWER ===== */}
          <div className={`${styles.statCard} ${styles.card2}`}>
            <div className={styles.stepCardHeader}>Step 2</div>

            <svg
              className={styles.stepIconSvg}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect x="3" y="6" width="18" height="12" rx="2" ry="2" />

              <rect x="7" y="11" width="10" height="2" rx="1" ry="1" />
            </svg>

            <div className={styles.stepCardTitle}>Answer</div>
          </div>

          {/* ===== STEP 3 – VERIFY ===== */}
          <div className={`${styles.statCard} ${styles.card3}`}>
            <div className={styles.stepCardHeader}>Step 3</div>

            <svg
              className={styles.stepIconSvg}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 3l8 4v5c0 5-3 9-8 10c-5 -1 -8 -5 -8 -10v-5z" />

              <path d="M9 12l2 2l4 -4" />
            </svg>

            <div className={styles.stepCardTitle}>Verify</div>
          </div>

          {/* ===== STEP 4 – FUND ===== */}
          <div className={`${styles.statCard} ${styles.card4}`}>
            <div className={styles.stepCardHeader}>Step 4</div>

            <svg
              className={styles.stepIconSvg}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <rect x="3" y="6" width="18" height="12" rx="2" ry="2" />

              <path d="M7 10l2 2l4 -4" />
              <path d="M7 14l2 2l4 -4" />
            </svg>

            <div className={styles.stepCardTitle}>Fund</div>
          </div>
        </div>
      </div>
    </section>
  );
}
