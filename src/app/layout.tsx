import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-brand",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AIRNAL — AI That Turns Ideas Into Reality",
  description: "AIRNAL is an AI technology company building intelligent products and AI-powered solutions.",
  openGraph: {
    title: "AIRNAL — AI That Turns Ideas Into Reality",
    description: "AIRNAL is an AI technology company building intelligent products and AI-powered solutions.",
    url: "https://airnal.in",
    siteName: "AIRNAL",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased selection:bg-brand-accent selection:text-brand-bg`}>
      <body className="min-h-screen flex flex-col bg-brand-bg text-brand-text font-sans">
        {children}
      </body>
    </html>
  );
}
