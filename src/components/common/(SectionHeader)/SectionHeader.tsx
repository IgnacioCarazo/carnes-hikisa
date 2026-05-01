"use client";

import styles from "./SectionHeader.module.css";

type SectionHeaderProps = {
  title: string;
  description?: string;
  color?: string;
  className?: string; // 1. Tienes que decirle a TypeScript que acepte esta prop
};

// 2. Extraer 'className' de las props
const SectionHeader = ({
  title,
  description,
  color,
  className,
}: SectionHeaderProps) => {
  return (
    <div className={`${styles.sectionHeader} ${className ? className : ""}`}>
      <h2
        className={styles.sectionHeaderTitle}
        style={{ color: color ?? "white" }}
      >
        {title}
      </h2>

      {description && (
        <p
          className={styles.sectionHeaderDescription}
          style={{ color: color ? color : "rgba(255,255,255,0.85)" }}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
