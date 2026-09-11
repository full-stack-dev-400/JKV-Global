import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

type TwelveDataValue = {
  datetime: string;
  open: string;
  high: string;
  low: string;
  close: string;
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const symbol = searchParams.get("symbol") || "EUR/USD";
    const interval = searchParams.get("interval") || "1h";

    const apiKey = process.env.TWELVE_DATA_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        {
          error: "TWELVE_DATA_API_KEY is not configured.",
        },
        {
          status: 500,
        },
      );
    }

    const params = new URLSearchParams({
      symbol,
      interval,
      outputsize: "120",
      timezone: "UTC",
      apikey: apiKey,
    });

    const url = `https://api.twelvedata.com/time_series?${params.toString()}`;

    const response = await fetch(url, {
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Failed to retrieve market history.",
        },
        {
          status: response.status,
        },
      );
    }

    const data = await response.json();

    if (data.status === "error") {
      console.error("Twelve Data error:", data);

      return NextResponse.json(
        {
          error: data.message || "Market data provider returned an error.",
        },
        {
          status: 502,
        },
      );
    }

    const values: TwelveDataValue[] = Array.isArray(data.values)
      ? data.values
      : [];

    const candles = values
      .map((item) => ({
        time: Math.floor(new Date(`${item.datetime} UTC`).getTime() / 1000),

        open: Number(item.open),
        high: Number(item.high),
        low: Number(item.low),
        close: Number(item.close),
      }))
      .filter(
        (candle) =>
          Number.isFinite(candle.time) &&
          Number.isFinite(candle.open) &&
          Number.isFinite(candle.high) &&
          Number.isFinite(candle.low) &&
          Number.isFinite(candle.close),
      )
      .sort((a, b) => a.time - b.time);

    return NextResponse.json({
      symbol,
      interval,
      candles,
    });
  } catch (error) {
    console.error("MARKET HISTORY API ERROR:", error);

    return NextResponse.json(
      {
        error: "Unable to load market history.",
      },
      {
        status: 500,
      },
    );
  }
}
