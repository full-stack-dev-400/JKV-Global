// components/home/BalanceGuard.tsx
import Image from "next/image";
import styles from "./BalanceGuard.module.css";

import BalanceGuardImg from "@/public/images/balance-guard.webp";

export default function BalanceGuard() {
  return (
    <section className={`${styles.section} section`} aria-label="Balance Guard">
      {/* Dark background strip */}
      <div className={styles.bg} aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={styles.grid}>
          {/* Left */}
          <div className={styles.content}>
            <p className={styles.kicker}>Protection</p>

            <h2 className={`title ${styles.heading}`}>
              JKV Global Balance Guard
            </h2>

            <p className={`text ${styles.desc}`}>
              Your JKV Global account includes{" "}
              <span className={styles.highlight}>
                free Negative Balance Protection
              </span>
              , ensuring your losses never exceed your deposited funds.
            </p>

            <a href="#" className={`button ${styles.cta}`}>
              Learn More
            </a>
          </div>

          {/* Right */}
          <div className={styles.visual}>
            <div className={styles.glow} aria-hidden="true" />

            <div className={styles.imageWrap}>
              <Image
                src={BalanceGuardImg}
                alt="JKV Global Balance Guard – Negative Balance Protection"
                className={styles.image}
                priority
              />
              <div className={styles.baseGlow} aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
