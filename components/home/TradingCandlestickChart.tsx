"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import {
  CandlestickSeries,
  ColorType,
  createChart,
  type CandlestickData,
  type IChartApi,
  type UTCTimestamp,
} from "lightweight-charts";

import type { MarketCandle } from "@/types/chart";

type Props = {
  candles: MarketCandle[];
};

export function TradingCandlestickChart({ candles }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { resolvedTheme } = useTheme();

  const dark = resolvedTheme === "dark";

  useEffect(() => {
    const container = containerRef.current;

    if (!container || candles.length === 0) {
      return;
    }

    let chart: IChartApi | null = createChart(container, {
      width: container.clientWidth,
      height: container.clientHeight,

      layout: {
        background: {
          type: ColorType.Solid,
          color: "transparent",
        },

        textColor: "rgba(255,255,255,0.18)",

        fontSize: 10,
      },

      grid: {
        vertLines: {
          color: "rgba(255,255,255,0.035)",
        },

        horzLines: {
          color: "rgba(255,255,255,0.035)",
        },
      },

      rightPriceScale: {
        borderColor: "rgba(255,255,255,0.06)",
      },

      timeScale: {
        borderColor: "rgba(255,255,255,0.06)",

        timeVisible: true,
        secondsVisible: false,
      },

      crosshair: {
        vertLine: {
          color: "rgba(32,201,151,0.2)",
        },

        horzLine: {
          color: "rgba(32,201,151,0.2)",
        },
      },
    });

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "#20C997",
      wickUpColor: "#20C997",

      downColor: "#e45161",
      wickDownColor: "#e45161",

      borderVisible: false,

      priceLineVisible: false,
    });

    const chartData: CandlestickData[] = candles.map((candle) => ({
      time: candle.time as UTCTimestamp,

      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
    }));

    series.setData(chartData);

    chart.timeScale().fitContent();

    const observer = new ResizeObserver(() => {
      if (!chart) return;

      chart.applyOptions({
        width: container.clientWidth,
        height: container.clientHeight,
      });
    });

    observer.observe(container);

    return () => {
      observer.disconnect();

      chart?.remove();

      chart = null;
    };
  }, [candles, dark]);

  return <div ref={containerRef} className="h-full w-full" />;
}
