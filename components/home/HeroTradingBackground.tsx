"use client";

import { useEffect, useState } from "react";

import { TradingCandlestickChart } from "./TradingCandlestickChart";

import type { MarketCandle } from "@/types/chart";

import styles from "./Hero.module.css";

export default function HeroTradingBackground() {
  const [candles, setCandles] = useState<MarketCandle[]>([]);

  useEffect(() => {
    let mounted = true;

    async function loadCandles() {
      try {
        const response = await fetch(
          "/api/market-history?symbol=EUR/USD&interval=1h",
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error("Failed to load market candles");
        }

        const data = await response.json();

        /*
          Supports a few possible API response shapes:

          { candles: [...] }

          OR

          { values: [...] }

          OR

          [...]
        */

        const rawCandles = data.candles ?? data.values ?? data.data ?? data;

        if (!Array.isArray(rawCandles)) {
          return;
        }

        const formatted: MarketCandle[] = rawCandles
          .map((item: any) => ({
            time: normalizeTime(item.time ?? item.datetime),
            open: Number(item.open),
            high: Number(item.high),
            low: Number(item.low),
            close: Number(item.close),
          }))
          .filter(
            (item: MarketCandle) =>
              Number.isFinite(item.time) &&
              Number.isFinite(item.open) &&
              Number.isFinite(item.high) &&
              Number.isFinite(item.low) &&
              Number.isFinite(item.close),
          )
          .sort((a: MarketCandle, b: MarketCandle) => a.time - b.time);

        if (mounted) {
          setCandles(formatted);
        }
      } catch (error) {
        console.error("Hero candle data error:", error);
      }
    }

    loadCandles();

    return () => {
      mounted = false;
    };
  }, []);

  if (candles.length === 0) {
    return null;
  }

  return (
    <div className={styles.heroTradingChart} aria-hidden="true">
      <TradingCandlestickChart candles={candles} />

      <div className={styles.chartGlassOverlay} />

      <div className={styles.chartEdgeFade} />
    </div>
  );
}

function normalizeTime(value: unknown): number {
  if (typeof value === "number") {
    /*
      If milliseconds were received, convert to seconds.
    */
    return value > 10_000_000_000
      ? Math.floor(value / 1000)
      : Math.floor(value);
  }

  if (typeof value === "string") {
    const numeric = Number(value);

    if (Number.isFinite(numeric)) {
      return numeric > 10_000_000_000
        ? Math.floor(numeric / 1000)
        : Math.floor(numeric);
    }

    const parsed = Date.parse(value);

    if (!Number.isNaN(parsed)) {
      return Math.floor(parsed / 1000);
    }
  }

  return 0;
}
