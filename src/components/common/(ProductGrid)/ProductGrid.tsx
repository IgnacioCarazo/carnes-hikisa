import styles from "./ProductGrid.module.css";

type ProductGridProps = {
  children: React.ReactNode;
  categoryTitle: string;
};

const ProductGrid = ({ children, categoryTitle }: ProductGridProps) => {
  return (
    <section className={styles.gridContainer}>
      <h2 className={styles.categoryTitle}>{categoryTitle}</h2>
      <div className={styles.grid}>{children}</div>
    </section>
  );
};

export default ProductGrid;
