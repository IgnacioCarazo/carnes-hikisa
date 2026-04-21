"use client";
import styles from "./DotsCarousel.module.css";

type Props = {
  total: number;
  activeIndex: number;
  onChange: (index: number) => void;
  visibleCount?: number;
  variant?: "overlay" | "inline";
  theme?: "light" | "dark";
};

const DOT_SIZE = 10;
const GAP = 10;
const STEP = DOT_SIZE + GAP;

export default function DotsCarousel({
  total,
  activeIndex,
  onChange,
  visibleCount = 5,
  variant = "overlay",
  theme = "light",
}: Props) {
  const half = Math.floor(visibleCount / 2);

  const getCenterIndex = () => {
    if (activeIndex <= half) return half;
    if (activeIndex >= total - half - 1) return total - half - 1;
    return activeIndex;
  };

  const centerIndex = getCenterIndex();

  const translateX =
    -(centerIndex * STEP - (visibleCount * STEP) / 2 + STEP / 2);

  return (
    <div
      className={`${styles.dotsContainer} ${
        variant === "inline" ? styles.inline : styles.overlay
      }`}
      style={{ width: `${visibleCount * STEP - GAP}px` }}
    >
      <div
        className={styles.dotsTrack}
        style={{ transform: `translateX(${translateX}px)` }}
      >
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            onClick={() => onChange(index)}
            className={`${styles.dot} ${
              index === activeIndex ? styles.activeDot : ""
            } ${theme === "dark" ? styles.dark : styles.light}`}
          />
        ))}
      </div>
    </div>
  );
}