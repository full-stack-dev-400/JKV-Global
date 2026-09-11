"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import styles from "./ExpandCards.module.css";

export type ExpandItem = {
  id: string | number;
  image: string;
  number?: string;
  title: string;
  body?: React.ReactNode;
};

export default function ExpandCards({
  items = demoItems,
  height = 520,
}: {
  items?: ExpandItem[];
  height?: number;
}) {
  const [active, setActive] = useState<number | null>(null);
  const [locked, setLocked] = useState<number | null>(null);

  const rootRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  /* Mobile slider helpers */
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  const [mobileIndex, setMobileIndex] = useState(0);

  const isMobileRef = useRef(false);
  const isInteractingRef = useRef(false);

  const resumeTimerRef = useRef<number | null>(null);
  const autoTimerRef = useRef<number | null>(null);
  const scrollRafRef = useRef<number | null>(null);

  /* Build expandable grid */
  const template = useMemo(() => {
    const idx = locked ?? active;

    if (idx == null) {
      return Array(items.length).fill("1fr").join(" ");
    }

    return Array(items.length)
      .fill("1fr")
      .map((_, i) => (i === idx ? "3fr" : "1fr"))
      .join(" ");
  }, [active, locked, items.length]);

  /* Section height */
  useEffect(() => {
    if (rootRef.current) {
      rootRef.current.style.setProperty("--ec-height", `${height}px`);
    }
  }, [height]);

  /* Grid template */
  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.style.setProperty("--ec-template", template);
    }
  }, [template]);

  /* Detect mobile */
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");

    const update = () => {
      isMobileRef.current = mq.matches;

      if (mq.matches) {
        setMobileIndex(0);
      }
    };

    update();

    mq.addEventListener?.("change", update);

    return () => {
      mq.removeEventListener?.("change", update);
    };
  }, []);

  /* Active mobile slide */
  useEffect(() => {
    const grid = gridRef.current;

    if (!grid) return;

    const onScroll = () => {
      if (!isMobileRef.current) return;

      if (scrollRafRef.current) {
        cancelAnimationFrame(scrollRafRef.current);
      }

      scrollRafRef.current = requestAnimationFrame(() => {
        const cards = cardRefs.current.filter(Boolean) as HTMLElement[];

        if (!cards.length) return;

        const viewportCenter = grid.scrollLeft + grid.clientWidth / 2;

        let bestIdx = 0;
        let bestDist = Number.POSITIVE_INFINITY;

        for (let i = 0; i < cards.length; i++) {
          const el = cards[i];

          const elCenter = el.offsetLeft + el.clientWidth / 2;

          const dist = Math.abs(elCenter - viewportCenter);

          if (dist < bestDist) {
            bestDist = dist;
            bestIdx = i;
          }
        }

        setMobileIndex(bestIdx);
      });
    };

    grid.addEventListener("scroll", onScroll, {
      passive: true,
    });

    return () => {
      grid.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToIndex = (idx: number, behavior: ScrollBehavior = "smooth") => {
    const grid = gridRef.current;
    const el = cardRefs.current[idx];

    if (!grid || !el) return;

    grid.scrollTo({
      left: el.offsetLeft,
      behavior,
    });

    setMobileIndex(idx);
  };

  const pauseAuto = () => {
    isInteractingRef.current = true;

    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = null;
  };

  const resumeAutoSoon = () => {
    if (resumeTimerRef.current) {
      window.clearTimeout(resumeTimerRef.current);
    }

    resumeTimerRef.current = window.setTimeout(() => {
      isInteractingRef.current = false;
    }, 1200);
  };

  /* Mobile auto-slider */
  useEffect(() => {
    const grid = gridRef.current;

    if (!grid) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const clearAuto = () => {
      if (autoTimerRef.current) {
        window.clearInterval(autoTimerRef.current);
      }

      autoTimerRef.current = null;
    };

    const setupAuto = () => {
      clearAuto();

      if (!isMobileRef.current) return;
      if (reduced) return;

      autoTimerRef.current = window.setInterval(() => {
        if (!isMobileRef.current) return;

        if (isInteractingRef.current) {
          return;
        }

        setMobileIndex((prev) => {
          const next = (prev + 1) % items.length;

          scrollToIndex(next, next === 0 ? "auto" : "smooth");

          return next;
        });
      }, 3200);
    };

    setupAuto();

    const onEnter = () => pauseAuto();

    const onLeave = () => resumeAutoSoon();

    const onDown = () => pauseAuto();

    const onUp = () => resumeAutoSoon();

    grid.addEventListener("mouseenter", onEnter);

    grid.addEventListener("mouseleave", onLeave);

    grid.addEventListener("pointerdown", onDown);

    window.addEventListener("pointerup", onUp);

    window.addEventListener("touchend", onUp, {
      passive: true,
    });

    const mq = window.matchMedia("(max-width: 767px)");

    const onMQ = () => setupAuto();

    mq.addEventListener?.("change", onMQ);

    return () => {
      clearAuto();

      if (resumeTimerRef.current) {
        window.clearTimeout(resumeTimerRef.current);
      }

      grid.removeEventListener("mouseenter", onEnter);

      grid.removeEventListener("mouseleave", onLeave);

      grid.removeEventListener("pointerdown", onDown);

      window.removeEventListener("pointerup", onUp);

      window.removeEventListener("touchend", onUp as any);

      mq.removeEventListener?.("change", onMQ);
    };
  }, [items.length]);

  return (
    <section ref={rootRef} className={`section ${styles.section}`}>
      <div className={`container ${styles.container}`}>
        <header className={styles.header} data-aos="fade-down">
          <h2 className={`heading ${styles.heading}`}>
            <span className={styles.headingLine1}>Why Traders Choose</span>

            <br />

            <span className={styles.headingLine2}>JKV Global</span>
          </h2>

          <p className={`text ${styles.subtext}`}>
            Trade with a broker focused on regulatory oversight, segregated
            client funds, transparent pricing and practical access to global
            markets through MetaTrader 5.
          </p>
        </header>
      </div>

      <div className={styles.stage} onMouseLeave={() => setActive(null)}>
        <div
          ref={gridRef}
          className={styles.grid}
          onMouseLeave={() => setActive(null)}
        >
          {items.map((item, i) => {
            const isActive = (locked ?? active) === i;

            return (
              <article
                key={item.id}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                id={`ec-${i}`}
                className={`${styles.card} ${isActive ? styles.isActive : ""}`}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setLocked((v) => (v === i ? null : i));

                    e.preventDefault();
                  }

                  if (e.key === "Escape") {
                    setLocked(null);
                  }
                }}
                onClick={() => {
                  if (isMobileRef.current) {
                    scrollToIndex(i, "smooth");

                    return;
                  }

                  setLocked((v) => (v === i ? null : i));
                }}
                aria-expanded={isActive}
              >
                <div
                  aria-hidden
                  className={styles.bg}
                  style={{
                    backgroundImage: `url(${item.image})`,
                  }}
                />

                <div className={styles.numberWrap}>
                  <span className={styles.number}>
                    {item.number ?? String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className={styles.content}>
                  <h3 className={styles.cardTitle}>{item.title}</h3>

                  {item.body && (
                    <div className={styles.cardBody}>{item.body}</div>
                  )}
                </div>

                <div className={styles.ctaWrap}>
                  <a href="#" className={styles.cta}>
                    Open Account
                    <span className={styles.ctaArrow}>→</span>
                  </a>
                </div>

                {i < items.length - 1 && (
                  <div className={styles.divider} aria-hidden="true" />
                )}
              </article>
            );
          })}
        </div>

        {/* Mobile pagination */}
        <div className={styles.dots} aria-label="Cards navigation">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.dot} ${
                mobileIndex === i ? styles.dotActive : ""
              }`}
              onClick={() => scrollToIndex(i, "smooth")}
              aria-label={`Go to card ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   JKV GLOBAL ITEMS
========================================================= */

const demoItems: ExpandItem[] = [
  {
    id: 1,
    image: "/images/InstantWithdrawal.webp",
    number: "01",
    title: "Clear Withdrawal Process",
    body: (
      <>
        JKV Global states that withdrawals can be processed within 24–72 hours
        after the relevant verification and withdrawal process is completed.
      </>
    ),
  },

  {
    id: 2,
    image: "/images/jkvsheild.webp",
    number: "02",
    title: "Segregated Client Funds",
    body: (
      <>
        Client money is held separately from company funds with banking
        institutions, supporting clear fund-segregation practices.
      </>
    ),
  },

  {
    id: 3,
    image: "/images/cardpartners.webp",
    number: "03",
    title: "Regulated by FSC Mauritius",
    body: (
      <>
        JKV Global identifies the Financial Services Commission of Mauritius as
        its regulator under licence number GB23201820.
      </>
    ),
  },

  {
    id: 4,
    image: "/images/fast-execution.webp",
    number: "04",
    title: "MetaTrader 5 Access",
    body: (
      <>
        Access MetaTrader 5 across Android, iOS, Desktop and Web and stay
        connected to global markets across supported devices.
      </>
    ),
  },

  {
    id: 5,
    image: "/images/high-leverage.webp",
    number: "05",
    title: "Leverage Up to 1:400",
    body: (
      <>
        JKV Global&apos;s homepage account specifications show leverage of up to
        1:400 across its Business, Prime, Pro and ECN account types.
      </>
    ),
  },

  {
    id: 6,
    image: "/images/negativeBalance.webp",
    number: "06",
    title: "Negative Balance Protection",
    body: (
      <>
        JKV Global highlights negative-balance protection among the
        risk-management tools available to help manage leveraged trading risk.
      </>
    ),
  },
];
