"use client";

import categoriesDataRaw from "@/data/categories.json";
import { Category } from "@/types/product";

import styles from "./FilterSidebar.module.css";
import FilterSidebarHeader from "./FilterSidebarHeader";
import FilterSidebarList from "./FilterSidebarList";

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
  setIsOpen,
}: FilterSidebarProps) => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.innerContainer}>
        <FilterSidebarHeader onClose={() => setIsOpen(false)} />

        <FilterSidebarList
          categories={categoriesData}
          activeCategories={activeCategories}
          onCategoryChange={onCategoryChange}
        />
      </div>
    </aside>
  );
};

export default FilterSidebar;
