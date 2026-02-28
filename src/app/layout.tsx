import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#fdfaf5] antialiased font-[Nunito,system-ui,sans-serif]">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
