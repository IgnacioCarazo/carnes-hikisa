"use client";

import { motion, AnimatePresence } from "framer-motion";
// Cambiamos ChevronLeft por X
import { Filter, X } from "lucide-react"; 
import Image from "next/image";

import CategoryCard from "@/components/common/(CategoryCards)/CategoryCard";
import categoriesDataRaw from "@/data/categories.json";

import styles from "./FilterSidebar.module.css";

interface FilterSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeCategories: string[];
  onCategoryChange: (id: string) => void;
  onClearFilters: () => void;
}

interface Category {
  id: string;
  name: string;
  image: string;
}

const categoriesData = categoriesDataRaw as Category[];

const FilterSidebar = ({
  isOpen,
  setIsOpen,
  activeCategories,
  onCategoryChange,
  onClearFilters,
}: FilterSidebarProps) => {
  const hasActiveFilters = activeCategories.length > 0;

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.aside
          key="sidebar"
          // Ajuste de animación para que en móvil ocupe toda la pantalla
          initial={{ x: "-100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className={styles.sidebar}
        >
          <div className={styles.innerContainer}>
            <div className={styles.sidebarHeader}>
              <div className={styles.titleGroup}>
                <h3 className={styles.titleText}>Categorías</h3>
                <Filter size={20} strokeWidth={2.5} />
              </div>

              <div className={styles.headerActions}>
                {hasActiveFilters && (
                  <button
                    className={styles.clearAllBtn}
                    onClick={onClearFilters}
                  >
                    Limpiar
                  </button>
                )}
                {/* Botón de cierre mejorado */}
                <button
                  className={styles.closeBtn}
                  onClick={() => setIsOpen(false)}
                  aria-label="Cerrar filtros"
                >
                  <X size={28} />
                </button>
              </div>
            </div>

            <nav className={styles.filterContent}>
              {categoriesData.map((cat) => (
                <CategoryCard
                  key={cat.id}
                  name={cat.name}
                  icon={
                    <div className={styles.iconWrapper}>
                      <Image
                        src={`/icons/categoryIcons/${cat.image}`}
                        alt={cat.name}
                        width={35}
                        height={35}
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  }
                  isActive={activeCategories.includes(cat.id)}
                  onClick={() => onCategoryChange(cat.id)}
                />
              ))}
            </nav>

            {/* Botón opcional de ver resultados al final en móvil */}
            <button 
              className={styles.viewResultsBtn}
              onClick={() => setIsOpen(false)}
            >
              Ver Resultados
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default FilterSidebar;