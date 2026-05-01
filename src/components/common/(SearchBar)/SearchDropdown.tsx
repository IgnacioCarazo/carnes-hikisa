import { motion } from "framer-motion";

import SearchResultItem from "@/components/common/(SearchBar)/SearchResultItem";
import { Product } from "@/types/product";

import styles from "./SearchDropdown.module.css";

interface Props {
  results: Product[];
  isLoading: boolean;
  isNoResults: boolean;
  onSelect: (name: string) => void;
}

const SearchDropdown = ({
  results,
  isLoading,
  isNoResults,
  onSelect,
}: Props) => (
  <motion.div
    initial={{ opacity: 0, y: 10, scale: 0.98 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: 10, scale: 0.98 }}
    className={styles.searchResultsDropdown}
  >
    {isLoading && <div className={styles.searchStatus}>Buscando...</div>}
    {!isLoading && isNoResults && (
      <div className={styles.searchStatus}>No hay resultados</div>
    )}
    {!isLoading &&
      results.map((p, i) => (
        <SearchResultItem key={p.id} product={p} index={i} onClick={onSelect} />
      ))}
  </motion.div>
);

export default SearchDropdown;
