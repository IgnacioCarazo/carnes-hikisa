import React from "react";

import styles from "./ProductGrid.module.css";

type ProductGridProps = {
  children: React.ReactNode;
  categoryTitle: React.ReactNode;
};

const ProductGrid = ({ children, categoryTitle }: ProductGridProps) => {
  return (
    <section className={styles.gridContainer}>
      <div className={styles.categoryTitle}>{categoryTitle}</div>
      <div className={styles.grid}>{children}</div>
    </section>
  );
};

export default ProductGrid;
