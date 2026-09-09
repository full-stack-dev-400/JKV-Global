"use client";

import styles from "./HowItWorks.module.css";
import OnboardingDashboard from "@/components/metals/OnboardingDashboard";

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        {/* =================== Heading =================== */}
        <header className={styles.header}>
          <h2 className={`title ${styles.heading}`}>How It Works</h2>

          <p className={styles.kicker}>
            Getting Started with Stonefort Securities
          </p>

          <p className={styles.subtitle}>
            Follow our simple, step-by-step guide; create your account and begin
            trading in just 4 easy steps.
          </p>
        </header>

        {/* =================== Video Box =================== */}
        <div className={styles.videoBox}>
          <div className={styles.videoPlaceholder}>
            <OnboardingDashboard />
          </div>
        </div>

        {/* =================== Buttons =================== */}
        <div className={styles.actions}>
          <a href="/register" className="button">
            Open an Account
          </a>

          <a href="/trade" className={styles.secondaryBtn}>
            Trade Now
          </a>
        </div>
      </div>
    </section>
  );
}
