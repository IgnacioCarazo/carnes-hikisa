"use client";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Importamos el router
import { useState, useRef, useLayoutEffect } from "react";

import categoriesData from "@/data/categories.json";
import { useIsMobile } from "@/hooks/useIsMobile";

import styles from "./CategoriesCarousel.module.css";

import CatCarouselCard from "../(CatCarouselCard)/CatCarouselCard";
import DotsCarousel from "../(DotsCarousel)/DotsCarousel";

const CategoriesCarousel = () => {
  const router = useRouter(); // Inicializamos el router para la navegación
  const isMobile = useIsMobile(480);

  // Inicializamos el índice en el medio
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.floor(categoriesData.length / 2),
  );

  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState<number | null>(null);

  const cardWidth = isMobile ? 180 : 280;
  const gap = isMobile ? 16 : 50;
  const step = cardWidth + gap;

  useLayoutEffect(() => {
    if (!viewportRef.current) return;
    const update = () => setViewportWidth(viewportRef.current!.offsetWidth);

    update();

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const currentWidth = viewportWidth || 1150;
  const translateX = -(activeIndex * step) + (currentWidth / 2 - cardWidth / 2);

  const handlePrev = () => setActiveIndex((prev) => Math.max(prev - 1, 0));
  const handleNext = () =>
    setActiveIndex((prev) => Math.min(prev + 1, categoriesData.length - 1));

  // LÓGICA DE NAVEGACIÓN:
  const handleCardClick = (index: number) => {
    if (index !== activeIndex) {
      // Si la tarjeta no es la activa, solo la centramos
      setActiveIndex(index);
    } else {
      // Si ya es la activa, navegamos al catálogo con el ID de la categoría
      const categoryId = categoriesData[index].id;
      router.push(`/catalogo?categories=${categoryId}`);
    }
  };

  return (
    <div className={styles.categoriesCarousel}>
      <div ref={viewportRef} className={styles.cardsHolderViewport}>
        <div
          className={styles.cardsHolder}
          style={{
            transform: `translateX(${translateX}px)`,
            transition:
              viewportWidth !== null
                ? "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
          }}
        >
          {categoriesData.map((category, i) => {
            const isActive = i === activeIndex;
            const distance = Math.abs(i - activeIndex);

            let stateClass = styles.categoriesCarouselCardFar;
            if (isActive) stateClass = styles.categoriesCarouselCardActive;
            else if (distance === 1)
              stateClass = styles.categoriesCarouselCardNear;

            return (
              <div
                key={category.id}
                className={`${styles.cardWrapper} ${stateClass}`}
                onClick={() => handleCardClick(i)}
                style={{
                  width: `${cardWidth}px`,
                  height: isMobile ? "300px" : "420px",
                  flexShrink: 0,
                  cursor: "pointer", // Siempre puntero para indicar interactividad
                }}
              >
                <CatCarouselCard
                  title={category.name}
                  image={category.imageCarousell}
                  isActive={isActive}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.categoriesCarouselControls}>
        <button
          className={styles.categoriesCarouselArrowButton}
          onClick={handlePrev}
          disabled={activeIndex === 0}
          style={{ opacity: activeIndex === 0 ? 0.3 : 1 }}
        >
          <Image
            src="/icons/chevron.svg"
            className={`${styles.arrowIcon} ${styles.left}`}
            alt="prev"
            width={40}
            height={40}
          />
        </button>

        <DotsCarousel
          total={categoriesData.length}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          variant="inline"
          theme="dark"
        />

        <button
          className={styles.categoriesCarouselArrowButton}
          onClick={handleNext}
          disabled={activeIndex === categoriesData.length - 1}
          style={{
            opacity: activeIndex === categoriesData.length - 1 ? 0.3 : 1,
          }}
        >
          <Image
            src="/icons/chevron.svg"
            className={`${styles.arrowIcon} ${styles.right}`}
            alt="next"
            width={40}
            height={40}
          />
        </button>
      </div>
    </div>
  );
};

export default CategoriesCarousel;
