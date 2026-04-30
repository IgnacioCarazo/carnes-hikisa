"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Filter, ChevronLeft } from "lucide-react";
import Image from "next/image";

import CategoryCard from "@/components/common/(CategoryCards)/CategoryCard";
import categoriesData from "@/data/categories.json";

import styles from "./FilterSidebar.module.css";

interface FilterSidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeCategories: string[];
  onCategoryChange: (id: string) => void; // Agregada de nuevo
  onClearFilters: () => void; // Agregada de nuevo
}

interface Category {
  id: string;
  name: string;
  image: string;
}

const FilterSidebar = ({
  isOpen,
  setIsOpen,
  activeCategories,
  onCategoryChange,
  onClearFilters,
}: FilterSidebarProps) => {
  const typedCategories = categoriesData as Category[];
  const hasActiveFilters = activeCategories.length > 0;

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.aside
          key="sidebar"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 320, opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
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
                <button
                  className={styles.closeBtn}
                  onClick={() => setIsOpen(false)}
                >
                  <ChevronLeft size={24} />
                </button>
              </div>
            </div>

            <nav className={styles.filterContent}>
              {typedCategories.map((cat) => (
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
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default FilterSidebar;
