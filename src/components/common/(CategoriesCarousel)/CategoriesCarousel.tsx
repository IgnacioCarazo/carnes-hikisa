"use client";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useCallback } from "react";

import categoriesData from "@/data/categories.json";
import { useIsMobile } from "@/hooks/useIsMobile";

import styles from "./CategoriesCarousel.module.css";

import CatCarouselCard from "../(CatCarouselCard)/CatCarouselCard";
import DotsCarousel from "../(DotsCarousel)/DotsCarousel";

// Calculamos el índice del medio (ej. si son 5, será el 2)
const MIDDLE_INDEX = Math.floor(categoriesData.length / 2);

const CategoriesCarousel = () => {
  const router = useRouter();
  const isMobile = useIsMobile(480);
  const totalItems = categoriesData.length;

  // El estado inicial ahora es el del medio
  const [activeIndex, setActiveIndex] = useState(MIDDLE_INDEX);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    duration: 30,
    startIndex: MIDDLE_INDEX, // Esto le dice a Embla que abra en esa posición
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSelect = useCallback((api: any) => {
    setActiveIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (i: number) => emblaApi?.scrollTo(i),
    [emblaApi],
  );

  return (
    <div className={styles.categoriesCarousel}>
      <div className={styles.emblaViewport} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {categoriesData.map((category, i) => {
            const diff = Math.abs(i - activeIndex);
            const distance = Math.min(diff, totalItems - diff);

            const isActive = i === activeIndex;
            const isNear = distance === 1;

            return (
              <div
                key={category.id}
                className={styles.emblaSlide}
                style={{
                  flex: `0 0 ${isMobile ? "200px" : "330px"}`,
                }}
              >
                <div
                  className={`${styles.cardAnimator} ${
                    isActive
                      ? styles.isActive
                      : isNear
                        ? styles.isNear
                        : styles.isFar
                  }`}
                  onClick={() =>
                    isActive
                      ? router.push(`/catalogo?categories=${category.id}`)
                      : scrollTo(i)
                  }
                >
                  <CatCarouselCard
                    title={category.name}
                    image={category.imageCarousell}
                    isActive={isActive}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.controls}>
        <button
          onClick={() => emblaApi?.scrollPrev()}
          className={styles.arrowBtn}
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
          total={totalItems}
          activeIndex={activeIndex}
          onChange={scrollTo}
          variant="inline"
          theme="dark"
          loop={true}
        />

        <button
          onClick={() => emblaApi?.scrollNext()}
          className={styles.arrowBtn}
        >
          <Image
            src="/icons/chevron.svg"
            className={styles.arrowIcon}
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
