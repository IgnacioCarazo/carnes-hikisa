import React from "react"; // Asegúrate de importar React

import styles from "./ProductGrid.module.css";

type ProductGridProps = {
  children: React.ReactNode;
  // Cambiamos 'string' por 'React.ReactNode' para que acepte texto, componentes o JSX
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
