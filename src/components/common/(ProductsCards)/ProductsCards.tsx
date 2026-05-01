"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

import styles from "./ProductsCards.module.css";

interface Product {
  id: number | string;
  name: string;
  category: string;
  image: string;
}

interface Category {
  id: string;
  name: string;
  image: string;
  "image-white": string;
  products: Product[];
}

interface ProductsCardsProps {
  categories: Category[];
}

const ProductsCards: React.FC<ProductsCardsProps> = ({ categories }) => {
  if (!categories) return null;

  return (
    <>
      {categories.map((category) =>
        category.products.map(
          (
            product,
            index, // Agregamos 'index' para el stagger
          ) => (
            <motion.div
              key={product.id}
              layout
              // Reducimos el scale inicial para que no "brinque" tanto
              initial={{ opacity: 0, scale: 0.98, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98, transition: { duration: 0.2 } }}
              transition={{
                type: "spring",
                stiffness: 80, 
                damping: 20, 
                mass: 1,
                delay: index * 0.03,
              }}
              className={styles.card}
            >
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
          ),
        ),
      )}
    </>
  );
};

export default ProductsCards;
