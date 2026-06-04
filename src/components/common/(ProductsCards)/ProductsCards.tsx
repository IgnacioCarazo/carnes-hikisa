"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

import { Product } from "@/types/product";

import styles from "./ProductsCards.module.css";

interface Category {
  id: string;
  name: string;
  image: string;
  products: Product[];
}

interface ProductsCardsProps {
  categories: Category[];
  onProductClick: (product: Product) => void;
}

const ProductsCards: React.FC<ProductsCardsProps> = ({
  categories,
  onProductClick,
}) => {
  if (!categories) return null;

  // Aplanamos todos los productos con su respectivo índice global
  const allProducts = categories.flatMap((category) =>
    category.products.map((product) => ({ product, category })),
  );

  return (
    <>
      {allProducts.map(({ product, category }, globalIndex) => {
        const isPriority = globalIndex < 6; // Solo primeras 6 imágenes above-the-fold

        return (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
            transition={{
              type: "spring",
              stiffness: 80,
              damping: 20,
              mass: 1,
              delay: globalIndex * 0.03,
            }}
            className={styles.card}
            onClick={() => onProductClick(product)}
          >
            <div className={styles.imageContainer}>
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                className={styles.productImage}
                priority={isPriority}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
              />
            </div>

            <div className={styles.footer}>
              <div className={styles.info}>
                <h3 className={styles.title}>{product.name}</h3>
                <span className={styles.category}>{product.category}</span>
              </div>

              <button
                className={styles.viewButton}
                aria-label={`Ver ${product.category}`}
              >
                <Image
                  src={`/icons/categoryIcons/${category.image}`}
                  alt={category.name}
                  width={22}
                  height={22}
                  className={styles.buttonIcon}
                />
              </button>
            </div>
          </motion.div>
        );
      })}
    </>
  );
};

export default ProductsCards;
