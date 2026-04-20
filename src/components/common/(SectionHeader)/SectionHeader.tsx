"use client";

import styles from "./SectionHeader.module.css";

type SectionHeaderProps = {
  title: string;
  description?: string;
  color?: string;
};

const SectionHeader = ({ title, description, color }: SectionHeaderProps) => {
  return (
    <div className={styles.sectionHeader}>
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