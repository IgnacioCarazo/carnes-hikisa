import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Be_Vietnam_Pro } from "next/font/google";

import "./globals.css";

import FloatingActions from "@/components/common/(FloatingActions)/FloatingActions";
import ConditionalFooter from "@/components/common/(Footer)/ConditionalFooter";
import Navbar from "@/components/common/(NavBar)/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
        className={`layout-container ${inter.variable} ${beVietnam.variable}`}
      >
        <Navbar />

        <main className="main-content">{children}</main>

        <div className="floating-actions-wrapper">
          <FloatingActions />
        </div>

        <ConditionalFooter />
      </body>
    </html>
  );
}
