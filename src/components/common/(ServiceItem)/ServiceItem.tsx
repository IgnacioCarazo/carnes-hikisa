"use client";
import { useIsMobile } from "@/hooks/useIsMobile";

import styles from "./ServiceItem.module.css";

type ServiceItemProps = {
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
  icon?: string;
};

const ServiceItem = ({
  title,
  description,
  image,
  reverse = false,
  icon,
}: ServiceItemProps) => {
  const isMobile = useIsMobile(768);

  const imageNode = (
    <div
      className={styles.serviceItemImage}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  );

  const textNode = (
    <div className={styles.serviceItemTextContent}>
      <div className={styles.serviceItemTitleRow}>
        {icon && (
          <img
            src={icon}
            className={styles.serviceItemIcon}
            alt=""
          />
        )}

        <h2 className={styles.serviceItemTitle}>{title}</h2>
      </div>

      <p className={styles.serviceItemDescription}>
        {description}
      </p>
    </div>
  );

  return (
    <div
      className={styles.serviceItem}
      data-reverse={reverse}
    >
      {isMobile ? (
        <>
          {textNode}
          {imageNode}
        </>
      ) : (
        <>
          {imageNode}
          {textNode}
        </>
      )}
    </div>
  );
};

export default ServiceItem;