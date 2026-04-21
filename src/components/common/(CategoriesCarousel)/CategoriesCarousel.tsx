"use client";
import Image from "next/image";
import { useState, useRef, useLayoutEffect } from "react";

import { useIsMobile } from "@/hooks/useIsMobile";

import styles from "./CategoriesCarousel.module.css";

import CatCarouselCard from "../(CatCarouselCard)/CatCarouselCard";
import DotsCarousel from "../(DotsCarousel)/DotsCarousel";

const CategoriesCarousel = () => {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8];
  const isMobile = useIsMobile(480);
  const [activeIndex, setActiveIndex] = useState(3);
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
    setActiveIndex((prev) => Math.min(prev + 1, cards.length - 1));

  const handleCardClick = (index: number) => {
    if (index !== activeIndex) setActiveIndex(index);
  };

  return (
    <div className={styles.categoriesCarousel}>
      <div ref={viewportRef} className={styles.cardsHolderViewport}>
        <div
          className={styles.cardsHolder}
          style={{
            transform: `translateX(${translateX}px)`,
            transition:
              viewportWidth === null
                ? "none"
                : "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        >
          {cards.map((num, i) => {
            const isActive = i === activeIndex;
            const distance = Math.abs(i - activeIndex);

            let stateClass = styles.categoriesCarouselCardFar;
            if (isActive) stateClass = styles.categoriesCarouselCardActive;
            else if (distance === 1)
              stateClass = styles.categoriesCarouselCardNear;

            return (
              <div
                key={num}
                className={`${styles.cardWrapper} ${stateClass}`}
                onClick={() => handleCardClick(i)}
                style={{
                  width: `${cardWidth}px`,
                  height: isMobile ? "300px" : "420px",
                  flexShrink: 0,
                  cursor: isActive ? "default" : "pointer",
                }}
              >
                <CatCarouselCard number={num} isActive={isActive} />
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
          <Image
            src="/icons/chevron.svg"
            className={`${styles.arrowIcon} ${styles.left}`}
            alt="prev"
            width={40}
            height={40}
          />
        </button>

        <DotsCarousel
          total={cards.length}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          variant="inline"
          theme="dark"
        />

        <button
          className={styles.categoriesCarouselArrowButton}
          onClick={handleNext}
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
