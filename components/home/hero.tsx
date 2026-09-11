import Image, { type StaticImageData } from "next/image";
import styles from "./Hero.module.css";

import FlagMauritius from "@/public/images/flags/mauritius.png";

export default function Hero() {
  return (
    <section className={`section ${styles.hero}`}>
      {/* =====================================================
          VIDEO BACKGROUND
      ===================================================== */}
      <div className={styles.bg} aria-hidden="true">
        <video
          className={styles.bgVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/home-hero.webp"
        >
          <source src="/videos/home-hero.webm" type="video/webm" />
          <source src="/videos/home-hero.mp4" type="video/mp4" />
        </video>

        <div className={styles.bgOverlay} />
      </div>

      {/* =====================================================
          HERO CONTENT
      ===================================================== */}
      <div className={`container ${styles.container}`}>
        <div className={styles.top}>
          {/* Badge */}
          <div className={styles.badgeRow} data-aos="fade-down">
            <span className={`badge ${styles.badgeLink}`}>
              Trade Global Markets With JKV Global
            </span>
          </div>

          {/* Heading */}
          <h1
            className={`heading ${styles.title}`}
            data-aos="fade-down"
            data-aos-delay="100"
          >
            Your Forex Journey.
            <br />
            <span className={styles.highlight}>Simplified For Success.</span>
          </h1>

          {/* Description */}
          <p
            className={`text ${styles.desc}`}
            data-aos="fade-down"
            data-aos-delay="200"
          >
            From opening your account and completing verification to accessing
            MetaTrader 5 and global markets, JKV Global keeps your trading
            journey clear, supported and straightforward.
          </p>

          {/* Buttons */}
          <div
            className={styles.ctaRow}
            data-aos="fade-down"
            data-aos-delay="400"
          >
            <a
              className={`button ${styles.ctaBtn} ${styles.primaryBtn}`}
              href="#0"
            >
              Open Account
              <ArrowIcon />
            </a>

            <a
              className={`button ${styles.ctaBtn} ${styles.secondaryBtn}`}
              href="#0"
            >
              Try Demo
            </a>
          </div>
        </div>

        {/* =====================================================
            REGULATION
        ===================================================== */}
        <div className={styles.regRow} data-aos="fade-up" data-aos-delay="500">
          <RegBox
            label="FSC Mauritius"
            licence="GB23201820"
            flag={FlagMauritius}
          />
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg
      className={styles.ctaArrow}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 10H16M11 5L16 10L11 15"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RegBox({
  label,
  licence,
  flag,
}: {
  label: string;
  licence: string;
  flag: StaticImageData;
}) {
  return (
    <div className={`glass ${styles.regBox}`}>
      <div className={styles.flagWrap}>
        <Image
          src={flag}
          alt="Mauritius flag"
          width={22}
          height={22}
          className={styles.regFlag}
        />
      </div>

      <div className={styles.regContent}>
        <span className={styles.regSmall}>Regulated by</span>

        <span className={styles.regLabel}>{label}</span>

        <span className={styles.regLicence}>Licence {licence}</span>
      </div>

      <span className={styles.statusDot} aria-hidden="true" />
      <span className={styles.regSheen} aria-hidden="true" />
    </div>
  );
}
