import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Pöppel Workwear Management - Digitale Effizienz trifft auf 100 Jahre Erfahrung",
  description: "Wir beenden den Verwaltungs-Irrsinn. Workwear Management neu gedacht mit digitaler Effizienz und 100 Jahren textiler Erfahrung.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
