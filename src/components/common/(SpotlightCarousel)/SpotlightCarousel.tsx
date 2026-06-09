"use client";
import { useRouter } from "next/navigation";
import { useRef, useState, useMemo, useCallback } from "react";

import categoriesDataRaw from "@/data/categories.json";

import styles from "./SpotlightCarousel.module.css";

import DotsCarousel from "../(DotsCarousel)/DotsCarousel";
import SpotlightItem from "../(SpotlightItem)/SpotlightItem";

// Definimos interfaces para mantener el tipado limpio
interface Product {
  id: string | number;
  name: string;
  description: string;
  image: string;
}

interface Category {
  id: string;
  products: Product[];
}

const categoriesData = categoriesDataRaw as Category[];

const SPOTLIGHT_PRODUCTS: Record<string, string[]> = {
  res: ["res-33", "res-35", "res-32"],
  cerdo: ["cerdo-20", "cerdo-22", "cerdo-4"],
  pollo: ["pollo-10", "pollo-12", "pollo-15"],
  mar: ["mar-1", "mar-6", "mar-7"],
  embutidos: ["embutidos-1", "embutidos-8", "embutidos-10"],
  paqueteria: ["paqueteria-1", "paqueteria-10", "paqueteria-13"],
  lacteos: ["lacteos-1", "lacteos-4", "lacteos-5"],
  carnitas: ["carnitas-2", "carnitas-3", "carnitas-6"],
};

const TRANSITION_TIME = 300;

const SpotlightCarousel = () => {
  const router = useRouter();

  const items = useMemo(() => {
    const extracted: {
      title: string;
      description: string;
      image: string;
      categoryId: string;
    }[] = [];

    categoriesData.forEach((category) => {
      const spotlightIds = SPOTLIGHT_PRODUCTS[category.id] || [];

      spotlightIds.forEach((productId) => {
        const product = category.products.find((p) => p.id === productId);

        if (!product) {
          console.warn(
            `Producto ${productId} no encontrado en categoría ${category.id}`,
          );
          return;
        }

        extracted.push({
          title: product.name,
          description: product.description,
          image: product.image,
          categoryId: category.id,
        });
      });
    });

    return extracted;
  }, []);

  const [activeIndex, setActiveIndex] = useState(
    items.length > 0 ? Math.floor(items.length / 2) : 0,
  );
  const [visible, setVisible] = useState(true);

  // --- NAVEGACIÓN AL CATÁLOGO ---
  const handleViewProduct = useCallback(() => {
    const activeItem = items[activeIndex];
    if (!activeItem) return;

    // Usamos 'search' para que el catálogo filtre por nombre (Fuse.js)
    // y 'categories' para activar el filtro de categoría en el sidebar.
    const query = new URLSearchParams({
      search: activeItem.title,
    });

    console.log("Navegando a catálogo con query:", query.toString());

    router.push(`/catalogo?${query.toString()}`);
  }, [activeIndex, items, router]);

  // --- LÓGICA DE CARROUSEL (SWIPE & CAMBIO) ---
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const MIN_SWIPE = 50;

  const handleTouchStart = (e: React.TouchEvent) =>
    (touchStartX.current = e.touches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) =>
    (touchEndX.current = e.touches[0].clientX);
  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
    if (Math.abs(distance) < MIN_SWIPE) return;
    distance > 0 ? handleNext() : handlePrev();
  };

  const changeItem = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= items.length || newIndex === activeIndex)
      return;
    setVisible(false);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setVisible(true);
    }, TRANSITION_TIME);
  };

  const handlePrev = () => changeItem(activeIndex - 1);
  const handleNext = () => changeItem(activeIndex + 1);

  if (items.length === 0) return null;

  const activeItem = items[activeIndex];

  return (
    <div className={styles.spotlightCarousel}>
      {/* BOTÓN PREV */}
      <button
        onClick={handlePrev}
        disabled={activeIndex === 0}
        className={styles.arrowButton}
      >
        <img
          src="/icons/chevron.svg"
          className={`${styles.arrowIcon} ${styles.left}`}
          alt="prev"
        />
      </button>

      {/* CONTENIDO DEL SPOTLIGHT */}
      <div
        className={`${styles.spotlightWrapper} ${visible ? styles.visible : styles.hidden}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <SpotlightItem
          key={activeIndex}
          title={activeItem.title}
          description={activeItem.description}
          image={activeItem.image}
          // Pasamos la función al componente hijo
          onButtonClick={handleViewProduct}
        />
      </div>

      {/* BOTÓN NEXT */}
      <button
        onClick={handleNext}
        disabled={activeIndex === items.length - 1}
        className={styles.arrowButton}
      >
        <img
          src="/icons/chevron.svg"
          className={`${styles.arrowIcon} ${styles.right}`}
          alt="next"
        />
      </button>

      {/* INDICADORES (DOTS) */}
      <DotsCarousel
        total={items.length}
        activeIndex={activeIndex}
        onChange={changeItem}
        variant="overlay"
        theme="light"
      />
    </div>
  );
};

export default SpotlightCarousel;
