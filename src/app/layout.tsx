import type { Metadata } from "next";
import { Inter } from "next/font/google"; 
import localFont from "next/font/local";

import "./globals.css";
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
        className={`${bernard.variable} ${inter.variable} ${inter.className}`}
      >
        <Navbar />
        <main style={{ minHeight: "calc(100vh - var(--nav-height) - 400px)" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
