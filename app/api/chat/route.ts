// app/api/chat/route.ts

import { NextResponse } from "next/server";
import { z } from "zod";

import { searchMdx } from "@/lib/chat/search";

export const runtime = "nodejs";

/* =========================================================
   REQUEST VALIDATION
========================================================= */

const BodySchema = z.object({
  message: z.string().trim().min(1).max(800),
});

/* =========================================================
   TRADING / INVESTMENT ADVICE GUARDRAILS
========================================================= */

function isRiskyQuery(text: string) {
  const q = text.toLowerCase().trim();

  const riskyPhrases = [
    "what should i invest",
    "what should i buy",
    "what should i sell",
    "should i buy",
    "should i sell",
    "guaranteed profit",
    "guaranteed return",
    "profit guarantee",
    "trading signal",
    "give me a signal",
    "best leverage",
    "recommend a trade",
    "recommend a pair",
    "which pair should i trade",
    "which stock should i buy",
    "which forex pair should i buy",
  ];

  return riskyPhrases.some((phrase) => q.includes(phrase));
}

/* =========================================================
   CHAT API
========================================================= */

export async function POST(req: Request) {
  try {
    const json = await req.json();

    const { message } = BodySchema.parse(json);

    /* =======================================================
       GUARDRAILS
    ======================================================= */

    if (isRiskyQuery(message)) {
      return NextResponse.json({
        reply:
          "I can’t provide investment advice, trading signals, personalized trade recommendations, or guarantee trading outcomes. I can help you with official JKV Global information about account types, MetaTrader 5, instruments, deposits, withdrawals, regulation, policies, trading conditions, and risk disclosures.",
        sources: [],
      });
    }

    /* =======================================================
       SEARCH APPROVED MDX CONTENT
    ======================================================= */

    const hits = searchMdx(message, 5);

    /* =======================================================
       NOTHING FOUND
    ======================================================= */

    if (!hits.length) {
      return NextResponse.json({
        reply:
          "I couldn’t find that information in the available JKV Global website content. Try asking about account types, MetaTrader 5, trading instruments, deposits, withdrawals, regulation, fees, or support.",
        sources: [],
      });
    }

    const top = hits[0];

    /* =======================================================
       RESPONSE

       Important:
       We do not invent information here.
       The response comes directly from indexed website content.
    ======================================================= */

    const reply = [
      "Here’s what I found in JKV Global’s official website content:",
      "",
      `**${top.title}**`,
      top.heading ? `Section: ${top.heading}` : "",
      "",
      top.snippet,
    ]
      .filter(Boolean)
      .join("\n");

    /* =======================================================
       RETURN RESPONSE + SOURCES
    ======================================================= */

    return NextResponse.json({
      reply,

      sources: hits.map((hit) => ({
        title: hit.title,

        url: hit.url,

        heading: hit.heading,

        snippet: hit.snippet,
      })),
    });
  } catch (err) {
    console.error("JKV GLOBAL CHAT API ERROR:", err);

    /*
     * Zod validation errors and malformed
     * JSON requests are intentionally
     * returned as a safe generic message.
     */

    return NextResponse.json(
      {
        reply:
          "Something went wrong while processing your message. Please try again.",
        sources: [],
      },
      {
        status: 400,
      },
    );
  }
}
