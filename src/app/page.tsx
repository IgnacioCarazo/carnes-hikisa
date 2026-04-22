import CategoriesCarousel from "@/components/common/(CategoriesCarousel)/CategoriesCarousel";
import FadeSeparator from "@/components/common/(FadeSeparator)/FadeSeparator";
import LandingVideo from "@/components/common/(LandingVideo)/LandingVideo";
import SectionHeader from "@/components/common/(SectionHeader)/SectionHeader";
import ServicesSection from "@/components/common/(ServicesSection)/ServicesSection";
import SimpleVideo from "@/components/common/(SimpleVideo)/SimpleVideo";
import SpotlightCarousel from "@/components/common/(SpotlightCarousel)/SpotlightCarousel";

export default function Home() {
  return (
    <div>
      <LandingVideo src="/video/landing.mp4" />
      <SectionHeader
        title="Todo lo que ofrecemos"
        description="Descubra nuestra amplia variedad de productos. Desde carnes frescas y cortes seleccionados hasta lácteos, embutidos y pescado, cada opción cumple con estándares de calidad y frescura para su mesa."
        color="black"
      />
      <CategoriesCarousel />
      <SectionHeader title="Nuestra Selección" color="black" />
      <SpotlightCarousel />
      <FadeSeparator height={100} />
      <SectionHeader title="¿Cómo nos destacamos?" color="black" />
      <ServicesSection />
      <SimpleVideo src="/video/landing.mp4" />
    </div>
  );
}
