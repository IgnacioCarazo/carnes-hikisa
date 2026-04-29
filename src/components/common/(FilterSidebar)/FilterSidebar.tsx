"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import CategoryCard from "@/components/common/(CategoryCards)/CategoryCard";
import categoriesData from "@/data/categories.json";

import styles from "./FilterSidebar.module.css";

interface FilterSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const FilterSidebar = ({ isOpen, setIsOpen }: FilterSidebarProps) => {
  const [activeCategory, setActiveCategory] = useState("res");

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.aside
          key="sidebar"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 300, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className={styles.sidebar}
        >
          {/* El innerContainer tiene un ancho fijo para que el contenido no se "apriete" al animar */}
          <div className={styles.innerContainer}>
            <div className={styles.sidebarHeader}>
              <div className={styles.titleGroup}>
                <h3 className={styles.titleText}>Categorías</h3>
                <Filter size={20} strokeWidth={2.5} />
              </div>
              <button
                className={styles.closeBtn}
                onClick={() => setIsOpen(false)}
                aria-label="Cerrar filtros"
              >
                <ChevronLeft size={24} />
              </button>
            </div>

            <nav className={styles.filterContent}>
              {categoriesData.map((cat, index) => {
                const imagePath = `/icons/categoryIcons/${cat.image}`;

                return (
                  <CategoryCard
                    key={cat.id}
                    index={index}
                    name={cat.name}
                    icon={
                      <div className={styles.iconWrapper}>
                        <Image
                          src={imagePath}
                          alt={cat.name}
                          width={45}
                          height={45}
                          style={{ objectFit: "contain" }}
                          onError={() =>
                            console.error(`Error cargando: ${imagePath}`)
                          }
                        />
                      </div>
                    }
                    isActive={activeCategory === cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                  />
                );
              })}
            </nav>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default FilterSidebar;