"use client";

import { motion, type Variants } from "framer-motion";
import React from "react";

type ProductGridProps = {
  children: React.ReactNode;
  categoryTitle: React.ReactNode;
};

/* ------------------------------------------------------------------ */
/*  Variantes de stagger: definidas FUERA del componente para evitar  */
/*  recreación en cada render. El contenedor padre controla el flujo  */
/*  de tiempo de todas las tarjetas hijas.                            */
/* ------------------------------------------------------------------ */
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

const ProductGrid = ({ children, categoryTitle }: ProductGridProps) => {
  return (
    <section className="w-full h-full flex flex-col max-md:overflow-visible overflow-hidden">
      <div className="flex-shrink-0 mb-2 w-full">{categoryTitle}</div>
      {/*
        Grid responsivo nativo con Tailwind.
        - 2 columnas en mobile
        - 3 columnas en md (768px+)
        - 4 columnas en lg (1024px+)
        - 5 columnas en xl (1280px+)
        En mobile (max-md): overflow-visible para que el scroll lo maneje el layout.
        En desktop: overflow-y-auto para scroll interno.
        will-change-transform delega a la GPU.
      */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full flex-1 max-md:overflow-visible overflow-y-auto pb-20 md:pr-2.5 auto-rows-min content-start will-change-transform"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {children}
      </motion.div>
    </section>
  );
};

export default ProductGrid;
