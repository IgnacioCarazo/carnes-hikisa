import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import Footer from "../components/common/(Footer)/Footer"; 
import Navbar from "../components/common/Navbar";


const myCustomFont = localFont({
  src: "../assets/fonts/Bernard_MT_Condensed_Regular.ttf",
  variable: "--font-custom",
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
      <body className={`${myCustomFont.variable} ${myCustomFont.className}`}>
        <Navbar />

        <main style={{ minHeight: "calc(100vh - var(--nav-height) - 300px)" }}>
          {children}
        </main>

        <Footer /> 
      </body>
    </html>
  );
}