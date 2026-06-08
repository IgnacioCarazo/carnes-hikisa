import { Suspense } from "react"; // 1. Importar Suspense de React

import CategoriesCarousel from "@/components/common/(CategoriesCarousel)/CategoriesCarousel";
import FadeSeparator from "@/components/common/(FadeSeparator)/FadeSeparator";
import LandingVideo from "@/components/common/(LandingVideo)/LandingVideo";
import SectionHeader from "@/components/common/(SectionHeader)/SectionHeader";
import ServicesSection from "@/components/common/(ServicesSection)/ServicesSection";
import SpotlightCarousel from "@/components/common/(SpotlightCarousel)/SpotlightCarousel";

export default function Home() {
  return (
    /* 2. Envolver todo el contenido que pueda contener hooks de búsqueda */
    <Suspense fallback={<div>Cargando...</div>}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <LandingVideo src="/video/landing.webm" />
        <SectionHeader
          title="Productos"
          description="Descubra nuestra amplia variedad de productos. Desde carnes frescas y cortes seleccionados hasta lácteos, embutidos y pescado, cada opción cumple con estándares de calidad y frescura para su mesa."
          color="black"
        />
        <CategoriesCarousel />
        <SectionHeader title="Nuestra Selección" color="black" />
        <SpotlightCarousel />
        <FadeSeparator height={100} />
        <SectionHeader title="¿Cómo nos destacamos?" color="black" />
        <ServicesSection />
      </div>
    </Suspense>
  );
}
