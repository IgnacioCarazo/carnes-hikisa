import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Be_Vietnam_Pro } from "next/font/google";
import localFont from "next/font/local";

import "./globals.css";
import FloatingActions from "../components/common/(FloatingActions)/FloatingActions";
import Footer from "../components/common/(Footer)/Footer";
import Navbar from "../components/common/(NavBar)/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const bernard = localFont({
  src: "../assets/fonts/Bernard_MT_Condensed_Regular.ttf",
  variable: "--font-bernard",
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], 
  variable: "--font-be-vietnam",
});

export const metadata: Metadata = {
  title: "Carnes Hikisa - Catálogo",
  description: "Calidad premium en cortes de carne",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${bernard.variable} ${inter.variable} ${beVietnam.variable}`}
      >
        <Navbar />
        <main style={{ minHeight: "calc(100vh - var(--nav-height) - 400px)" }}>
          {children}
        </main>
        <FloatingActions />
        <Footer />
      </body>
    </html>
  );
}
