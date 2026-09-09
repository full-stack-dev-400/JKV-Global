// components/EconomicCalendar.tsx

"use client";

import { useEffect, useRef } from "react";

export default function EconomicCalendar() {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!widgetRef.current) return;

    // Prevent duplicate TradingView widgets during re-renders
    widgetRef.current.innerHTML = "";

    const widgetContainer = document.createElement("div");
    widgetContainer.className = "tradingview-widget-container";
    widgetContainer.style.width = "100%";
    widgetContainer.style.height = "100%";

    const widget = document.createElement("div");
    widget.className = "tradingview-widget-container__widget";
    widget.style.width = "100%";
    widget.style.height = "100%";

    const script = document.createElement("script");

    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-events.js";

    script.type = "text/javascript";
    script.async = true;

    script.innerHTML = JSON.stringify({
      colorTheme: "light",
      isTransparent: false,
      locale: "en",

      // Major global economies relevant to forex traders
      countryFilter: "us,eu,gb,jp,ca,au,nz,ch,cn",

      // Show low, medium and high impact events
      importanceFilter: "-1,0,1",

      width: "100%",
      height: "100%",
    });

    widgetContainer.appendChild(widget);
    widgetContainer.appendChild(script);

    widgetRef.current.appendChild(widgetContainer);

    return () => {
      if (widgetRef.current) {
        widgetRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-20">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(32,201,151,0.28) 0%, rgba(32,201,151,0.08) 42%, transparent 72%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <div className="mx-auto max-w-4xl text-center">
          <div
            className="mx-auto mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em]"
            style={{
              color: "#064F49",
              borderColor: "rgba(32, 201, 151, 0.35)",
              background: "rgba(32, 201, 151, 0.08)",
            }}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{
                background: "#20C997",
                boxShadow: "0 0 0 4px rgba(32,201,151,0.12)",
              }}
            />
            Market Events
          </div>

          <h2 className="flex items-center justify-center gap-3 text-4xl font-bold tracking-tight text-[#111827] md:text-6xl">
            <svg
              width="42"
              height="42"
              viewBox="0 0 24 24"
              className="hidden shrink-0 md:block"
              aria-hidden="true"
              style={{ fill: "#20C997" }}
            >
              <path
                d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0
                1.1.9 2 2 2h14c1.1 0 2-.9
                2-2V6c0-1.1-.9-2-2-2zM5 20V9h14v11H5z"
              />
            </svg>
            Economic Calendar
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-[#6B7280] md:text-lg">
            Track important economic announcements, central-bank decisions,
            employment reports and other scheduled events that may affect global
            financial markets.
          </p>
        </div>

        {/* Calendar Card */}
        <div className="mt-10 overflow-hidden rounded-[24px] border border-[#DDE8E4] bg-white shadow-[0_24px_70px_rgba(6,79,73,0.10)]">
          {/* Top Bar */}
          <div className="flex flex-col gap-3 border-b border-[#E5E7EB] px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-7">
            <div>
              <div className="text-sm font-semibold text-[#111827]">
                Global Economic Events
              </div>

              <div className="mt-1 text-xs text-[#6B7280]">
                Live calendar data provided by TradingView
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-[#064F49]">
              <span
                className="h-2 w-2 rounded-full"
                style={{
                  background: "#20C997",
                  boxShadow: "0 0 0 4px rgba(32,201,151,0.12)",
                }}
              />
              Live Market Calendar
            </div>
          </div>

          {/* TradingView Widget */}
          <div ref={widgetRef} className="h-[720px] w-full md:h-[820px]" />
        </div>

        {/* Bottom Info */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <InfoCard
            title="Economic Releases"
            text="Follow scheduled macroeconomic data including inflation, GDP and employment releases."
          />

          <InfoCard
            title="Central Banks"
            text="Stay aware of interest-rate decisions and policy announcements from major central banks."
          />

          <InfoCard
            title="Event Importance"
            text="Use TradingView impact levels to identify potentially significant market events."
          />
        </div>

        <p className="mx-auto mt-7 max-w-4xl text-center text-xs leading-5 text-[#9CA3AF]">
          Economic calendar information is provided for informational purposes
          only and should not be considered investment advice. Market conditions
          can change rapidly.
        </p>
      </div>
    </section>
  );
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-[#DDE8E4] bg-white p-5 shadow-[0_10px_35px_rgba(6,79,73,0.06)]">
      <div className="mb-3 flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ background: "#20C997" }}
        />

        <h3 className="text-sm font-semibold text-[#111827]">{title}</h3>
      </div>

      <p className="text-sm leading-6 text-[#6B7280]">{text}</p>
    </div>
  );
}
