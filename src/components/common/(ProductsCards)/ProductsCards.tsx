import { Eye } from "lucide-react";
import React from "react";

import styles from "./ProductsCards.module.css";

interface Product {
  id: number | string;
  name: string;
  category: string;
  image: string;
}

interface ProductsCardsProps {
  products: Product[];
}

const ProductsCards: React.FC<ProductsCardsProps> = ({ products }) => {
  return (
    <>
      {" "}
      {products.map((product) => (
        <div key={product.id} className={styles.card}>
          <div className={styles.imageContainer}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
            />
          </div>

          <div className={styles.footer}>
            <div className={styles.info}>
              <h3 className={styles.title}>{product.name}</h3>
              <span className={styles.category}>{product.category}</span>
            </div>

            <button className={styles.viewButton} aria-label="Ver producto">
              <Eye size={18} color="white" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductsCards;
