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
      <head>
        <link
          rel="preload"
          href="https://res.cloudinary.com/dfh4b2nlw/video/upload/v1780978885/landing_onrao2.webm"
          as="video"
          type="video/webm"
        />
      </head>
      <body
        className={`layout-container ${inter.variable} ${beVietnam.variable}`}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100dvh",
          overflow: "hidden",
          margin: 0,
        }}
      >
        {/* 2. Envolver Navbar porque suele manejar la búsqueda/URL */}

        <Navbar />
        <Suspense fallback={<div style={{ height: "65px" }} />}>
          <main
            className="main-content"
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              width: "100%",
              minHeight: 0,
              overflow: "hidden auto",
            }}
          >
            {children}
            <ConditionalFooter />
          </main>
        </Suspense>

        {/* 3. Envolver FloatingActions por si acaso dependen de la URL */}
        <div className="floating-actions-wrapper">
          <Suspense fallback={null}>
            <FloatingActions />
          </Suspense>
        </div>
      </body>
    </html>
  );
}
