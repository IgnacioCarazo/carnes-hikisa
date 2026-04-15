import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
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

        <main>{children}</main>

      </body>
    </html>
  );
}
