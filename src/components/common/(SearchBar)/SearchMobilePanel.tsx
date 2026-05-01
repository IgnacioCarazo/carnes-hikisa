import { Product } from "@/types/product";

import SearchInput from "./SearchInput";
import styles from "./SearchMobilePanel.module.css";
import SearchResultItem from "./SearchResultItem";

interface Props {
  isOpen: boolean;
  value: string;
  results: Product[];
  onClose: () => void;
  onChange: (val: string) => void;
  onClear: () => void;
  onSelect: (name: string) => void;
}

const SearchMobilePanel = ({
  isOpen,
  value,
  results,
  onClose,
  onChange,
  onClear,
  onSelect,
}: Props) => (
  <div
    className={`${styles.searchPanelMobile} ${isOpen ? styles.showPanel : ""}`}
  >
    <div className={styles.searchPanelHeader}>
      <SearchInput
        isMobile
        value={value}
        onChange={onChange}
        onClear={onClear}
        placeholder="¿Qué corte buscas?"
      />
      <button className={styles.closePanel} onClick={onClose}>
        CANCELAR
      </button>
    </div>
    <div className={styles.searchPanelContent}>
      {results.map((p) => (
        <SearchResultItem key={p.id} product={p} onClick={onSelect} />
      ))}
    </div>
  </div>
);

export default SearchMobilePanel;
