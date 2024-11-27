import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";

const defaultFont = Inter({
  variable: "--font-inter",
  display: "swap",
  style: "normal",
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Radio Hackernews",
  description: "Audio Recap of Top Hackernews Stories - Open Source Project by Upstash",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${defaultFont.variable} antialiased`}>
      {children}
      <Footer />
      </body>
    </html>
  );
}
