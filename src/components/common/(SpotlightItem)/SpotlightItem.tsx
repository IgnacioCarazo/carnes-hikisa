"use client";
import { useIsMobile } from "@/hooks/useIsMobile";

import styles from "./SpotlightItem.module.css";

type SpotlightItemProps = {
  title: string;
  description: string;
  image: string;
  onButtonClick?: () => void;
};

const SpotlightItem = ({
  title,
  description,
  image,
  onButtonClick,
}: SpotlightItemProps) => {
  const isMobile = useIsMobile();

  const imageNode = (
    <div
      className={styles.spotlightItemImage}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );

  const textNode = (
    <div className={styles.spotlightItemTextContent}>
      <h2 className={styles.spotlightItemTitle}>{title}</h2>

      <p className={styles.spotlightItemDescription}>{description}</p>
    </div>
  );

  const textLinkNode = (
    <div className={styles.spotlightItemTextContent}>
      <h2 className={styles.spotlightItemTitle}>{title}</h2>

      <p className={styles.spotlightItemDescription}>{description}</p>
      <button onClick={onButtonClick} className={styles.spotlightItemButton}>
        Ver producto en la galería
      </button>
    </div>
  );

  const linkNode = (
    <div className={styles.spotlightItemTextContent}>
      <button onClick={onButtonClick} className={styles.spotlightItemButton}>
        Ver producto en la galería
      </button>
    </div>
  );

  return (
    <div className={styles.spotlightItem}>
      {isMobile ? (
        <>
          {textNode}
          {imageNode}
          {linkNode}
        </>
      ) : (
        <>
          {imageNode}
          {textLinkNode}
        </>
      )}
    </div>
  );
};

export default SpotlightItem;
