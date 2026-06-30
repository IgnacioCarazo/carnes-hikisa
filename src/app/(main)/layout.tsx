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
  title: {
    default: "Carnes Hikisa | Carnicería de Calidad en Costa Rica",
    template: "%s | Carnes Hikisa",
  },
  description:
    "Carnes de res, cerdo, pollo, embutidos, lácteos y más. Calidad premium con entrega a domicilio en Costa Rica. Visite nuestro catálogo en línea.",
  openGraph: {
    title: "Carnes Hikisa | Carnicería de Calidad en Costa Rica",
    description:
      "Carnes de res, cerdo, pollo, embutidos, lácteos y más. Calidad premium con entrega a domicilio en Costa Rica.",
    url: "https://carnes-hikisa.vercel.app",
    siteName: "Carnes Hikisa",
    locale: "es_CR",
    type: "website",
    images: [
      {
        url: "/images/seo-preview-placeholder.webp",
        width: 1200,
        height: 630,
        alt: "Carnes Hikisa - Carnicería de Calidad en Costa Rica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Carnes Hikisa | Carnicería de Calidad en Costa Rica",
    description:
      "Carnes de res, cerdo, pollo, embutidos, lácteos y más. Calidad premium con entrega a domicilio en Costa Rica.",
    images: [
      {
        url: "/images/seo-preview-placeholder.webp",
        alt: "Carnes Hikisa - Carnicería de Calidad en Costa Rica",
      },
    ],
  },
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

        <Suspense fallback={<div style={{ height: "65px" }} />}>
          <Navbar />
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
          </main>
          <ConditionalFooter />
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
