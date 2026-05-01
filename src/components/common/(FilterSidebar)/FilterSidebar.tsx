"use client";

import { Filter, X } from "lucide-react";
import Image from "next/image";

import { Category } from "@/app/(main)/catalogo/page";
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

const categoriesData = categoriesDataRaw as Category[];

const FilterSidebar = ({
  activeCategories,
  onCategoryChange,
  onClearFilters,
  setIsOpen,
}: FilterSidebarProps) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.innerContainer}>
        <div className={styles.sidebarHeader}>
          <div className={styles.titleGroup}>
            <h3 className={styles.titleText}>Categorías</h3>
            <Filter size={20} strokeWidth={2.5} />
          </div>
          <div className={styles.headerActions}>
            <button
              className={styles.closeBtn}
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
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
                    width={30}
                    height={30}
                  />
                </div>
              }
              isActive={activeCategories.includes(cat.id)}
              onClick={() => onCategoryChange(cat.id)}
            />
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default FilterSidebar;
