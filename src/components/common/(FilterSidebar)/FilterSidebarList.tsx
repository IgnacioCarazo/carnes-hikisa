import { Category } from "@/app/(main)/catalogo/page";
import CategoryCard from "@/components/common/(CategoryCards)/CategoryCard";

import FilterCategoryIcon from "./FilterCategoryIcon";
import styles from "./FilterSidebar.module.css";

interface ListProps {
  categories: Category[];
  activeCategories: string[];
  onCategoryChange: (id: string) => void;
}

const FilterSidebarList = ({
  categories,
  activeCategories,
  onCategoryChange,
}: ListProps) => (
  <nav className={styles.filterContent}>
    {categories.map((cat) => (
      <CategoryCard
        key={cat.id}
        name={cat.name}
        isActive={activeCategories.includes(cat.id)}
        onClick={() => onCategoryChange(cat.id)}
        icon={<FilterCategoryIcon src={cat.image} alt={cat.name} />}
      />
    ))}
  </nav>
);

export default FilterSidebarList;
