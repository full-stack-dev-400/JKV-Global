"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./ChatWidget.module.css";

type Source = {
  title: string;
  url?: string;
  heading?: string;
  snippet?: string;
};

type ApiResponse = {
  reply: string;
  sources?: Source[];
};

type Msg = {
  role: "user" | "bot";
  text: string;
  sources?: Source[];
};

export default function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "bot",
      text: "Hi! Welcome to JKV Global. Ask me about our account types, trading platforms, markets, deposits, withdrawals, regulation, or other information available on our official website.",
    },
  ]);

  const listRef = useRef<HTMLDivElement | null>(null);

  const canSend = useMemo(
    () => input.trim().length > 0 && !loading,
    [input, loading],
  );

  /* =========================================================
     MOUNT
  ========================================================= */

  useEffect(() => {
    setMounted(true);
  }, []);

  /* =========================================================
     AUTO SCROLL
  ========================================================= */

  useEffect(() => {
    if (!open) return;

    requestAnimationFrame(() => {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }, [open, msgs.length]);

  /* =========================================================
     SEND MESSAGE
  ========================================================= */

  async function send() {
    const message = input.trim();

    if (!message || loading) return;

    setInput("");
    setLoading(true);

    setMsgs((prev) => [
      ...prev,
      {
        role: "user",
        text: message,
      },
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message,
        }),
      });

      const data = (await res.json()) as ApiResponse;

      if (!res.ok) {
        throw new Error(data?.reply || "Request failed");
      }

      setMsgs((prev) => [
        ...prev,

        {
          role: "bot",

          text:
            data.reply ||
            "I couldn’t find that information in the JKV Global website content.",

          sources: data.sources || [],
        },
      ]);
    } catch {
      setMsgs((prev) => [
        ...prev,

        {
          role: "bot",
          text: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  /* =========================================================
     KEYBOARD
  ========================================================= */

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      send();
    }

    if (e.key === "Escape") {
      setOpen(false);
    }
  }

  if (!mounted) return null;

  /* =========================================================
     CHATBOT UI
  ========================================================= */

  const ui = (
    <div className={styles.wrap} data-open={open ? "1" : "0"}>
      {/* =====================================================
          CHAT PANEL
      ===================================================== */}

      <div
        id="jkv-chat-panel"
        className={styles.panel}
        role="dialog"
        aria-label="JKV Global Help"
      >
        {/* ===================================================
            HEADER
        =================================================== */}

        <div className={styles.header}>
          <div className={styles.titleBlock}>
            <div className={styles.title}>
              <span className={styles.dot} aria-hidden="true" />
              JKV Global Help
            </div>

            <div className={styles.sub}>
              Answers based on official JKV Global website content
            </div>
          </div>

          <button
            type="button"
            className={styles.close}
            onClick={() => setOpen(false)}
            aria-label="Close JKV Global chat"
            style={{
              pointerEvents: "auto",
            }}
          >
            ×
          </button>
        </div>

        {/* ===================================================
            MESSAGES
        =================================================== */}

        <div className={styles.list} ref={listRef}>
          {msgs.map((m, idx) => (
            <div
              key={idx}
              className={`${styles.msg} ${
                m.role === "user" ? styles.user : styles.bot
              }`}
            >
              <div className={styles.bubble}>
                <pre className={styles.text}>{m.text}</pre>

                {/* ===========================================
                    SOURCES
                =========================================== */}

                {m.role === "bot" && m.sources && m.sources.length > 0 && (
                  <div className={styles.sources}>
                    <div className={styles.sourcesTitle}>Sources</div>

                    <ul className={styles.sourcesList}>
                      {m.sources.slice(0, 4).map((s, i) => (
                        <li key={i} className={styles.sourceItem}>
                          {s.url ? (
                            <a className={styles.sourceLink} href={s.url}>
                              {s.title}
                            </a>
                          ) : (
                            <span className={styles.sourcePlain}>
                              {s.title}
                            </span>
                          )}

                          {s.heading ? (
                            <span className={styles.sourceMeta}>
                              {" "}
                              — {s.heading}
                            </span>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* =================================================
              TYPING INDICATOR
          ================================================= */}

          {loading && (
            <div className={`${styles.msg} ${styles.bot}`}>
              <div className={styles.bubble}>
                <div className={styles.typing}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ===================================================
            INPUT FOOTER
        =================================================== */}

        <div className={styles.footer}>
          <input
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ask about accounts, MT5, markets, deposits, withdrawals..."
            disabled={loading}
            aria-label="Ask JKV Global"
          />

          <button
            type="button"
            className={styles.send}
            onClick={send}
            disabled={!canSend}
          >
            Send
          </button>
        </div>
      </div>

      {/* =====================================================
          SVG FILTER FOR FAB
      ===================================================== */}

      <svg className={styles.fabSvg} aria-hidden="true">
        <filter
          id="jkv-fab-wobble"
          x="-35%"
          y="-35%"
          width="170%"
          height="170%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed="8"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="2.8s"
              values="0.65;1.05;0.65"
              repeatCount="indefinite"
            />
          </feTurbulence>

          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="18"
            xChannelSelector="R"
            yChannelSelector="G"
          >
            <animate
              attributeName="scale"
              dur="2.8s"
              values="12;22;12"
              repeatCount="indefinite"
            />
          </feDisplacementMap>
        </filter>
      </svg>

      {/* =====================================================
          FLOATING CHAT BUTTON
      ===================================================== */}

      <button
        type="button"
        className={styles.fab}
        data-open={open ? "1" : "0"}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="jkv-chat-panel"
        aria-label={open ? "Close JKV Global chat" : "Open JKV Global chat"}
        style={{
          pointerEvents: "auto",
        }}
      >
        {/* ===================================================
            WAVY RING
        =================================================== */}

        <svg
          className={styles.fabRingSvg}
          viewBox="0 0 100 100"
          aria-hidden="true"
        >
          <defs>
            {/* ===============================================
                WAVY FILTER
            =============================================== */}

            <filter
              id="jkvWavyStroke"
              x="-40%"
              y="-40%"
              width="180%"
              height="180%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.012"
                numOctaves="2"
                seed="9"
                result="noise"
              >
                <animate
                  attributeName="baseFrequency"
                  dur="2.4s"
                  values="0.010;0.016;0.010"
                  repeatCount="indefinite"
                />
              </feTurbulence>

              <feDisplacementMap
                in="SourceGraphic"
                in2="noise"
                scale="18"
                xChannelSelector="R"
                yChannelSelector="G"
              >
                <animate
                  attributeName="scale"
                  dur="2.4s"
                  values="14;22;14"
                  repeatCount="indefinite"
                />
              </feDisplacementMap>
            </filter>

            {/* ===============================================
                GLOW FILTER
            =============================================== */}

            <filter id="jkvGlow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="1.2" result="blur" />

              <feMerge>
                <feMergeNode in="blur" />

                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* ===============================================
                JKV GLOBAL GRADIENT
            =============================================== */}

            <radialGradient id="jkvGrad" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#7EF5D2" />

              <stop offset="45%" stopColor="#20C997" />

              <stop offset="80%" stopColor="#064F49" />

              <stop offset="100%" stopColor="#F59A0A" />
            </radialGradient>
          </defs>

          {/* ===============================================
              MAIN ANIMATED RING
          =============================================== */}

          <g filter="url(#jkvWavyStroke)">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 50 50"
              to="360 50 50"
              dur="3.2s"
              repeatCount="indefinite"
            />

            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="url(#jkvGrad)"
              strokeWidth="10"
              strokeLinecap="round"
            />
          </g>

          {/* ===============================================
              OUTER GLOW
          =============================================== */}

          <g filter="url(#jkvGlow)" opacity="0.75">
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="none"
              stroke="rgba(32, 201, 151, 0.55)"
              strokeWidth="10"
            />
          </g>
        </svg>

        {/* ===================================================
            INNER BUTTON
        =================================================== */}

        <span className={styles.fabCore} aria-hidden="true">
          <span className={styles.fabText}>{open ? "×" : "Hi"}</span>
        </span>
      </button>
    </div>
  );

  return createPortal(ui, document.body);
}
