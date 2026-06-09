"use client";

import { motion, type Variants } from "framer-motion";
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

/* ------------------------------------------------------------------ */
/*  Variantes de cada tarjeta individual (cardVariants).              */
/*  DEFINIDAS FUERA del componente: no se recrean en cada render.     */
/*  El stagger lo controla el padre (ProductGrid) con staggerChildren.*/
/*  Solo animamos propiedades ligeras (opacity, y, scale) con spring  */
/*  elástico suave para evitar recálculos de layout pesados.          */
/* ------------------------------------------------------------------ */
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.93,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 130,
      damping: 13,
      mass: 0.8,
    },
  },
};

/* ------------------------------------------------------------------ */
/*  Componente                                                        */
/* ------------------------------------------------------------------ */
const ProductsCards: React.FC<ProductsCardsProps> = ({
  categories,
  onProductClick,
}) => {
  if (!categories) return null;

  // Aplanamos todos los productos con su respectiva categoría
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
            variants={cardVariants}
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
                <span className={styles.category}>{category.name}</span>
              </div>

              <button
                className={styles.viewButton}
                aria-label={`Ver ${category.name}`}
              >
                <Image
                  src={`/icons/categoryIcons/${category.image}`}
                  alt={category.name}
                  width={22}
                  height={22}
                  className={styles.buttonIcon}
                  loading="eager"
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
