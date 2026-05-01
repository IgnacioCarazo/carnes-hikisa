import { Filter, X } from "lucide-react";

import styles from "./FilterSidebar.module.css";

interface HeaderProps {
  onClose: () => void;
}

const FilterSidebarHeader = ({ onClose }: HeaderProps) => (
  <div className={styles.sidebarHeader}>
    <div className={styles.titleGroup}>
      <h3 className={styles.titleText}>Categorías</h3>
      <Filter size={20} strokeWidth={2.5} />
    </div>
    <button
      className={styles.closeBtn}
      onClick={onClose}
      aria-label="Cerrar filtros"
    >
      <X size={24} />
    </button>
  </div>
);

export default FilterSidebarHeader;
