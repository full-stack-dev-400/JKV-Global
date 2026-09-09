import "./css/style.css";
import "./css/global.css";

import { ThemeProvider } from "@/components/theme/ThemeProvider";
// import ChatWidget from "@/components/chat/ChatWidget";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "JKV Global",
  description:
    "JKV Global provides access to global financial markets through professional trading platforms and account services.",
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

          {/* <ChatWidget /> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
