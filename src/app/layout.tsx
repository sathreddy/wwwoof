import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif, Caveat } from "next/font/google";
import "./globals.css";

import Footer from "@/components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwriting",
  display: "swap",
});

export const metadata: Metadata = {
  title: "wwwoof — Find your forever dog in Bangalore",
  description:
    "Browse dogs available for adoption from shelters, rescue groups, and vet clinics across Bangalore. Find your perfect companion today.",
  keywords: ["dog adoption", "Bangalore", "rescue dogs", "adopt a dog", "India"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${instrumentSerif.variable} ${caveat.variable} min-h-screen antialiased`}>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
