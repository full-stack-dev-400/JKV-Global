// components/VerticalTabs.tsx

"use client";

import {
  useId,
  useState,
  useRef,
  type KeyboardEvent,
  type ReactNode,
  type CSSProperties,
} from "react";

import Image, { type StaticImageData } from "next/image";
import styles from "./VerticalTabs.module.css";

// Existing image files
import Terminal from "@/public/images/Terminalmt5.webp";
import MobilePreview from "@/public/images/jkvmobile.webp";
import clientportal from "@/public/images/jkv-client-portal.webp";
import JKVweb from "@/public/images/sfx-web.webp";
import JKVmob from "@/public/images/jkvmobileimg.webp";

type TabItem = {
  id: string;
  label: string;
  title: string;
  description: string;
  media?: ReactNode;
  ctaHref?: string;
  ctaLabel?: string;
};

type Props = {
  items: TabItem[];

  /** Optional: override brand accent. Defaults to CSS var(--brand) */
  accent?: string;

  className?: string;

  headingTitle?: ReactNode;

  headingText?: string;
};

/** Helper: image fills the whole box like background-cover */
function FitImage({
  src,
  alt,
}: {
  src: StaticImageData | string;
  alt: string;
}) {
  return (
    <div className={styles.fitMedia}>
      <Image
        src={src}
        alt={alt}
        fill
        className={styles.fitImg}
        sizes="(min-width: 1280px) 900px, (min-width: 768px) 700px, 100vw"
        priority={false}
      />
    </div>
  );
}

export default function VerticalTabs({
  items,
  accent = "var(--brand)",
  className = "",
  headingTitle,
  headingText,
}: Props) {
  const [active, setActive] = useState(0);

  const listRef = useRef<HTMLDivElement>(null);

  const baseId = useId();

  const tabIds = items.map((_, i) => `${baseId}-${i}`);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (!listRef.current) return;

    const buttons = Array.from(
      listRef.current.querySelectorAll<HTMLButtonElement>("[role='tab']"),
    );

    if (!buttons.length) return;

    const focusAt = (i: number) => {
      const next = (i + buttons.length) % buttons.length;

      buttons[next]?.focus();

      setActive(next);
    };

    switch (e.key) {
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();

        focusAt(idx - 1);

        break;

      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();

        focusAt(idx + 1);

        break;

      case "Home":
        e.preventDefault();

        focusAt(0);

        break;

      case "End":
        e.preventDefault();

        focusAt(buttons.length - 1);

        break;
    }
  };

  return (
    <section
      className={`section ${styles.section} ${className}`}
      style={
        {
          "--vt-accent": accent,
        } as CSSProperties
      }
    >
      <div className={`container ${styles.container}`}>
        {/* Heading */}
        {(headingTitle || headingText) && (
          <header className={styles.header}>
            {headingTitle && (
              <h2 className={`heading ${styles.heading}`}>{headingTitle}</h2>
            )}

            {headingText && (
              <p className={`text ${styles.subtext}`}>{headingText}</p>
            )}
          </header>
        )}

        {/* Main wrapper */}
        <div className={styles.shell}>
          {/* Left rail */}
          <aside className={styles.rail}>
            <span className={styles.railGlowTop} aria-hidden="true" />

            <span className={styles.railGlowBottom} aria-hidden="true" />

            <div
              ref={listRef}
              role="tablist"
              aria-orientation="vertical"
              className={styles.tabList}
            >
              {items.map((tab, i) => {
                const selected = i === active;

                return (
                  <button
                    key={tab.id}
                    id={`tab-${tabIds[i]}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls={`panel-${tabIds[i]}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className={`${styles.tabBtn} ${
                      selected ? styles.tabBtnActive : ""
                    }`}
                  >
                    <span className={styles.tabLabel}>{tab.label}</span>

                    <span
                      className={`${styles.tabArrow} ${
                        selected ? styles.tabArrowActive : ""
                      }`}
                      aria-hidden="true"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 12h12"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />

                        <path
                          d="M13 6l6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Right content */}
          <div className={styles.panelWrap}>
            <div className={styles.panelInner}>
              {items.map((tab, i) => {
                const selected = i === active;

                return (
                  <div
                    key={tab.id}
                    id={`panel-${tabIds[i]}`}
                    role="tabpanel"
                    aria-labelledby={`tab-${tabIds[i]}`}
                    hidden={!selected}
                    className={styles.panel}
                  >
                    <div className={styles.panelText}>
                      <h3 className={styles.panelTitle}>{tab.title}</h3>

                      <p className={styles.panelDesc}>{tab.description}</p>
                    </div>

                    {tab.media ? (
                      <div className={styles.mediaCard}>{tab.media}</div>
                    ) : null}

                    {tab.ctaHref && tab.ctaLabel ? (
                      <div className={styles.ctaRow}>
                        <a
                          href={tab.ctaHref}
                          className={`button ${styles.ctaBtn}`}
                        >
                          {tab.ctaLabel}

                          <span className={styles.ctaIcon} aria-hidden="true">
                            →
                          </span>
                        </a>
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   JKV GLOBAL PLATFORM TABS
========================================================= */

export function PlatformsTabs() {
  return (
    <VerticalTabs
      headingTitle={
        <>
          Trade With JKV Global{" "}
          <span className={styles.headingAccent}>Anywhere, Anytime.</span>
        </>
      }
      headingText="Stay connected to global markets across desktop, mobile and web with MetaTrader 5 and JKV Global platform access designed to keep your trading account within reach across supported devices."
      items={[
        {
          id: "mt5Desktop",

          label: "MT5 Desktop",

          title: "MetaTrader 5 Desktop",

          description:
            "Access MetaTrader 5 from your desktop with advanced charting, market analysis, flexible order management and multi-asset trading functionality.",

          media: (
            <FitImage
              src={Terminal}
              alt="JKV Global MetaTrader 5 Desktop preview"
            />
          ),

          ctaHref: "#",

          ctaLabel: "Open MT5",
        },

        {
          id: "mt5Mobile",

          label: "MT5 Mobile",

          title: "MetaTrader 5 Mobile",

          description:
            "Stay connected to the markets from supported Android and iOS devices. Monitor prices, review charts and manage trading activity while away from your desktop.",

          media: (
            <FitImage
              src={MobilePreview}
              alt="JKV Global MetaTrader 5 mobile preview"
            />
          ),

          ctaHref: "#",

          ctaLabel: "Open MT5",
        },

        {
          id: "clientPortal",

          label: "Client Portal",

          title: "JKV Global Client Portal",

          description:
            "Access your JKV Global client area for account services, platform access and supported account-management functions through one dedicated portal.",

          media: (
            <FitImage
              src={clientportal}
              alt="JKV Global Client Portal preview"
            />
          ),

          ctaHref: "#",

          ctaLabel: "Client Login",
        },

        {
          id: "JKVMobile",

          label: "JKV Trade Mobile",

          title: "JKV Trade Mobile",

          description:
            "Stay connected to global markets through the JKV mobile trading experience and access your trading environment from supported mobile devices wherever you are.",

          media: <FitImage src={JKVmob} alt="JKV Trade Mobile preview" />,

          ctaHref: "#",

          ctaLabel: "JKV Trade Mobile",
        },

        {
          id: "JKVWeb",

          label: "JKV Web",

          title: "JKV Web",

          description:
            "Access your trading environment through a supported web browser and stay connected to global markets without relying on a dedicated desktop installation.",

          media: (
            <FitImage src={JKVweb} alt="JKV Web trading platform preview" />
          ),

          ctaHref: "#",

          ctaLabel: "JKV Web",
        },
      ]}
    />
  );
}
