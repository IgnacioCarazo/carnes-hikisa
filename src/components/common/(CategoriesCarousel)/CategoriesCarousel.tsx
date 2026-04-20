"use client";
import { useState, useRef, useLayoutEffect } from "react";

import { useIsMobile } from "@/hooks/useIsMobile";

import styles from "./CategoriesCarousel.module.css";

import CatCarouselCard from "../(CatCarouselCard)/CatCarouselCard";

const CategoriesCarousel = () => {
  const cards = [1, 2, 3, 4, 5, 6, 7];

  const isMobile = useIsMobile(480);

  const [activeIndex, setActiveIndex] = useState(
    Math.floor(cards.length / 2)
  );

  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);

  const cardWidth = isMobile ? 180 : 280;
  const gap = isMobile ? 16 : 50;
  const step = cardWidth + gap;

  useLayoutEffect(() => {
    if (!viewportRef.current) return;

    const update = () => {
      setViewportWidth(viewportRef.current!.offsetWidth);
    };

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  const translateX =
    -(activeIndex * step) +
    (viewportWidth / 2 - cardWidth / 2);

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      Math.min(prev + 1, cards.length - 1)
    );
  };

  return (
    <div className={styles.categoriesCarousel}>
      <div
        ref={viewportRef}
        className={styles.cardsHolderViewport}
      >
        <div
          className={styles.cardsHolder}
          style={{
            transform: `translateX(${translateX}px)`,
          }}
        >
          {cards.map((num, i) => {
            const distance = Math.abs(i - activeIndex);

            let stateClass =
              styles.categoriesCarouselCardFar;

            if (distance === 0) {
              stateClass =
                styles.categoriesCarouselCardActive;
            } else if (distance === 1) {
              stateClass =
                styles.categoriesCarouselCardNear;
            }

            return (
              <div
                key={num}
                className={`${styles.cardWrapper} ${stateClass}`}
              >
                <CatCarouselCard number={num} />
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.categoriesCarouselControls}>
        <button
          className={styles.categoriesCarouselArrowButton}
          onClick={handlePrev}
        >
          ←
        </button>

        <button
          className={styles.categoriesCarouselArrowButton}
          onClick={handleNext}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default CategoriesCarousel;