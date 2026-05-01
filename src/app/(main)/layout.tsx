import "./globals.css";

import type { Metadata } from "next";
import { Inter, Be_Vietnam_Pro } from "next/font/google";
import { Suspense } from "react"; // 1. Importar Suspense

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
        {/* 2. Envolver Navbar porque suele manejar la búsqueda/URL */}
        <Suspense fallback={<div style={{ height: "80px" }} />}>
          <Navbar />
        </Suspense>

        <main className="main-content">{children}</main>

        {/* 3. Envolver FloatingActions por si acaso dependen de la URL */}
        <div className="floating-actions-wrapper">
          <Suspense fallback={null}>
            <FloatingActions />
          </Suspense>
        </div>

        <ConditionalFooter />
      </body>
    </html>
  );
}
