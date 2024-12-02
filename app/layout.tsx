import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer";
import { Providers } from "./store/Providers";

const defaultFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Radio Hackernews",
  description:
    "Audio Recap of Top Hackernews Stories - Open Source Project by Upstash",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${defaultFont.variable}`}>
      <body className="antialiased text-sm md:text-base">
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
