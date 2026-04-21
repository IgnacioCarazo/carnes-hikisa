"use client";
import { useRef, useState } from "react";

import styles from "./SpotlightCarousel.module.css";

import DotsCarousel from "../(DotsCarousel)/DotsCarousel";
import SpotlightItem from "../(SpotlightItem)/SpotlightItem";

type Item = {
  title: string;
  description: string;
  image: string;
};

// The description should be between 380–400 characters, especially on mobile
const items: Item[] = [
  {
    title: "Picanha",
    description:
      "La picaña es un corte de res reconocido por su suavidad y por su característica capa de grasa externa, la cual aporta jugosidad y potencia el sabor durante la cocción. Al asarse o sellarse, mantiene una textura tierna y un perfil intenso y equilibrado. Es especialmente valorada para parrilla por su capacidad de conservar humedad y ofrecer resultados consistentes en preparaciones de alta calidad.",
    image: "/images/picanha.jpg",
  },
  {
    title: "Ribeye",
    description:
      "El ribeye proviene de la sección alta del lomo de la res y se distingue por su alto nivel de marmoleo intramuscular. Esta distribución de grasa se funde durante la cocción, generando una textura jugosa y un sabor profundo. Es un corte versátil que responde bien a parrilla, sartén o sellado a alta temperatura, manteniendo un balance entre terneza y riqueza que lo hace uno de los más apreciados.",
    image: "/images/ribeye.jpg",
  },
  {
    title: "Pollo Entero",
    description:
      "El pollo entero es una opción versátil que permite diversas técnicas de cocción como horno, parrilla o rostizado lento. Su estructura completa ayuda a conservar la jugosidad en cada una de sus partes, integrando carne blanca y oscura en una sola preparación. Ofrece un sabor suave que se adapta fácilmente a marinados y especias, siendo adecuado para recetas familiares y presentaciones compartidas.",
    image: "/images/pollo.jpg",
  },
  {
    title: "Queso Maduro",
    description:
      "El queso maduro es un producto lácteo de textura firme sometido a un proceso de curación controlada que intensifica su sabor y complejidad aromática. A diferencia de los quesos frescos, presenta un perfil más profundo y ligeramente salino. Su consistencia permite cortes definidos, lo que lo hace adecuado para tablas, acompañamientos o preparaciones que requieren mayor intensidad de sabor.",
    image: "/images/queso.jpg",
  },
  {
    title: "Picanha",
    description:
      "La picaña es un corte de res reconocido por su suavidad y por su característica capa de grasa externa, la cual aporta jugosidad y potencia el sabor durante la cocción. Al asarse o sellarse, mantiene una textura tierna y un perfil intenso y equilibrado. Es especialmente valorada para parrilla por su capacidad de conservar humedad y ofrecer resultados consistentes en preparaciones de alta calidad.",
    image: "/images/picanha.jpg",
  },
  {
    title: "Ribeye",
    description:
      "El ribeye proviene de la sección alta del lomo de la res y se distingue por su alto nivel de marmoleo intramuscular. Esta distribución de grasa se funde durante la cocción, generando una textura jugosa y un sabor profundo. Es un corte versátil que responde bien a parrilla, sartén o sellado a alta temperatura, manteniendo un balance entre terneza y riqueza que lo hace uno de los más apreciados.",
    image: "/images/ribeye.jpg",
  },
  {
    title: "Pollo Entero",
    description:
      "El pollo entero es una opción versátil que permite diversas técnicas de cocción como horno, parrilla o rostizado lento. Su estructura completa ayuda a conservar la jugosidad en cada una de sus partes, integrando carne blanca y oscura en una sola preparación. Ofrece un sabor suave que se adapta fácilmente a marinados y especias, siendo adecuado para recetas familiares y presentaciones compartidas.",
    image: "/images/pollo.jpg",
  },
  {
    title: "Queso Maduro",
    description:
      "El queso maduro es un producto lácteo de textura firme sometido a un proceso de curación controlada que intensifica su sabor y complejidad aromática. A diferencia de los quesos frescos, presenta un perfil más profundo y ligeramente salino. Su consistencia permite cortes definidos, lo que lo hace adecuado para tablas, acompañamientos o preparaciones que requieren mayor intensidad de sabor.",
    image: "/images/queso.jpg",
  },
  {
    title: "Picanha",
    description:
      "La picaña es un corte de res reconocido por su suavidad y por su característica capa de grasa externa, la cual aporta jugosidad y potencia el sabor durante la cocción. Al asarse o sellarse, mantiene una textura tierna y un perfil intenso y equilibrado. Es especialmente valorada para parrilla por su capacidad de conservar humedad y ofrecer resultados consistentes en preparaciones de alta calidad.",
    image: "/images/picanha.jpg",
  },
  {
    title: "Ribeye",
    description:
      "El ribeye proviene de la sección alta del lomo de la res y se distingue por su alto nivel de marmoleo intramuscular. Esta distribución de grasa se funde durante la cocción, generando una textura jugosa y un sabor profundo. Es un corte versátil que responde bien a parrilla, sartén o sellado a alta temperatura, manteniendo un balance entre terneza y riqueza que lo hace uno de los más apreciados.",
    image: "/images/ribeye.jpg",
  },
  {
    title: "Pollo Entero",
    description:
      "El pollo entero es una opción versátil que permite diversas técnicas de cocción como horno, parrilla o rostizado lento. Su estructura completa ayuda a conservar la jugosidad en cada una de sus partes, integrando carne blanca y oscura en una sola preparación. Ofrece un sabor suave que se adapta fácilmente a marinados y especias, siendo adecuado para recetas familiares y presentaciones compartidas.",
    image: "/images/pollo.jpg",
  },
  {
    title: "Queso Maduro",
    description:
      "El queso maduro es un producto lácteo de textura firme sometido a un proceso de curación controlada que intensifica su sabor y complejidad aromática. A diferencia de los quesos frescos, presenta un perfil más profundo y ligeramente salino. Su consistencia permite cortes definidos, lo que lo hace adecuado para tablas, acompañamientos o preparaciones que requieren mayor intensidad de sabor.",
    image: "/images/queso.jpg",
  },
];

const TRANSITION_TIME = 300;

const SpotlightCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(
    Math.floor(items.length / 2)
  );
  const [visible, setVisible] = useState(true);

  // --- SWIPE ---
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const MIN_SWIPE = 50;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    if (Math.abs(distance) < MIN_SWIPE) return;

    if (distance > 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };

  const changeItem = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= items.length) return;
    if (newIndex === activeIndex) return;

    setVisible(false);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setVisible(true);
    }, TRANSITION_TIME);
  };

  const handlePrev = () => changeItem(activeIndex - 1);
  const handleNext = () => changeItem(activeIndex + 1);

  const activeItem = items[activeIndex];

  const DOT_SIZE = 10;
  const GAP = 10;
  const STEP = DOT_SIZE + GAP;
  const VISIBLE = 5;

  const getTranslateX = () => {
    const total = items.length;
    const half = Math.floor(VISIBLE / 2);

    let centerIndex = activeIndex;

    if (activeIndex <= half) {
      centerIndex = half;
    } else if (activeIndex >= total - half - 1) {
      centerIndex = total - half - 1;
    }

    return -(centerIndex * STEP - (VISIBLE * STEP) / 2 + STEP / 2);
  };

  return (
    <div className={styles.spotlightCarousel}>
      {/* LEFT */}
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

      {/* CONTENT */}
      <div
        className={`${styles.spotlightWrapper} ${
          visible ? styles.visible : styles.hidden
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <SpotlightItem
          key={activeIndex}
          title={activeItem.title}
          description={activeItem.description}
          image={activeItem.image}
        />
      </div>

      {/* RIGHT */}
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

      {/* DOTS */}
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