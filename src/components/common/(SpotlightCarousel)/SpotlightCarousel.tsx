"use client";
import { useState } from "react";

import styles from "./SpotlightCarousel.module.css";

import SpotlightItem from "../(SpotlightItem)/SpotlightItem";

const items = [
  {
    title: "Picanha",
    description:
      "La picaña es un corte reconocido por su suavidad y su capa de grasa que aporta sabor y jugosidad durante la cocción. Ideal para parrilla o asado, ofrece una textura tierna y un perfil de sabor intenso, convirtiéndola en una opción destacada para preparaciones de alta calidad.",
    image: "/images/picanha.jpg",
  },
  {
    title: "Ribeye",
    description:
      "El ribeye es un corte proveniente de la sección alta del lomo de la res, caracterizado por su alto nivel de marmoleo natural. Esta infiltración de grasa intramuscular le aporta una textura jugosa, suave y un sabor profundo durante la cocción. Es altamente valorado para parrilla, sartén o sellado a alta temperatura debido a su equilibrio entre terneza y riqueza de sabor.",
    image: "/images/ribeye.jpg",
  },
  {
    title: "Pollo Entero",
    description:
      "El pollo entero es un corte versátil que permite múltiples métodos de cocción, como horno, parrilla o rostizado lento. Su estructura completa conserva la jugosidad en sus distintas piezas, combinando carne blanca y oscura en una sola preparación. Es una opción ideal para recetas familiares o porciones compartidas, con un perfil de sabor suave y adaptable a diferentes técnicas y marinados.",
    image: "/images/pollo.jpg",
  },
  {
    title: "Queso Maduro",
    description:
      "El queso maduro es un producto lácteo de textura firme que ha pasado por un proceso de curación controlada, lo que intensifica su sabor y complejidad aromática. Su perfil es más profundo y salino en comparación con quesos frescos, y su consistencia permite cortes limpios. Es ideal para tablas, acompañamientos o uso culinario en preparaciones que requieren mayor intensidad de sabor.",
    image: "/images/queso.jpg",
  },
];

const TRANSITION_TIME = 300;

const SpotlightCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(
    Math.floor(items.length / 2)
  );

  const [visible, setVisible] = useState(true);

  const changeItem = (newIndex: number) => {
    if (newIndex === activeIndex) return;

    setVisible(false);

    setTimeout(() => {
      setActiveIndex(newIndex);
      setVisible(true);
    }, TRANSITION_TIME);
  };

  const handlePrev = () => {
    changeItem(activeIndex - 1);
  };

  const handleNext = () => {
    changeItem(activeIndex + 1);
  };

  const activeItem = items[activeIndex];

  return (
    <div className={styles.spotlightCarousel}>
      <div
        className={`${styles.spotlightWrapper} ${
          visible ? styles.visible : styles.hidden
        }`}
      >
        <SpotlightItem
          key={activeIndex}
          title={activeItem.title}
          description={activeItem.description}
          image={activeItem.image}
        />
      </div>

      <div className={styles.spotlightCarouselControls}>
        <button
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className={styles.arrowButton}
        >
          ←
        </button>

        <button
          onClick={handleNext}
          disabled={activeIndex === items.length - 1}
          className={styles.arrowButton}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default SpotlightCarousel;