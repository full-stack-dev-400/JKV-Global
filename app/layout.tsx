import "./css/style.css";
import "./css/global.css";

import { ThemeProvider } from "@/components/theme/ThemeProvider";
import ChatWidget from "@/components/chat/ChatWidget";

import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "JKV Global",
  description:
    "JKV Global provides access to global financial markets through professional trading platforms and account services.",

  icons: {
    icon: "/JKVFevicon.ico",
    shortcut: "/JKVFevicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <ThemeProvider>
          {children}

          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
