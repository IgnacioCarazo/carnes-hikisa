"use client";

import styles from "./CategoryCard.module.css";

interface CategoryCardProps {
  name: string;
  icon: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const CategoryCard = ({ name, icon, isActive, onClick }: CategoryCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`${styles.card} ${isActive ? styles.active : ""}`}
    >
      <div className={styles.iconContainer}>{icon}</div>
      <span className={styles.name}>{name}</span>
    </div>
  );
};

export default CategoryCard;
