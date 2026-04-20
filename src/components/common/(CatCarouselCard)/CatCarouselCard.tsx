"use client";
import styles from "./CatCarouselCard.module.css";

type CatCarouselCardProps = {
  number: number;
};

const CatCarouselCard = ({ number }: CatCarouselCardProps) => {
  return (
    <div className={styles.catCarouselCard}>
      {number}
    </div>
  );
};

export default CatCarouselCard;