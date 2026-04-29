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
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

interface Category {
  id: string;
  name: string;
  image: string;
}

const FilterSidebar = ({
  isOpen,
  setIsOpen,
  activeCategory,
  onCategoryChange,
}: FilterSidebarProps) => {
  const typedCategories = categoriesData as Category[];

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
          {/* El innerContainer siempre mide 320px, así el contenido no se deforma */}
          <div className={styles.innerContainer}>
            <div className={styles.sidebarHeader}>
              <div className={styles.titleGroup}>
                <h3 className={styles.titleText}>Categorías</h3>
                <Filter size={20} strokeWidth={2.5} />
              </div>
              <button
                className={styles.closeBtn}
                onClick={() => setIsOpen(false)}
              >
                <ChevronLeft size={24} />
              </button>
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
                  isActive={activeCategory === cat.id}
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
