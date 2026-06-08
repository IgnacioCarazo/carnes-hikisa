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
  <div className={styles.searchResultsDropdown}>
    {isLoading && <div className={styles.searchStatus}>Buscando...</div>}
    {!isLoading && isNoResults && (
      <div className={styles.searchStatus}>
        No se encontraron productos que coincidan con tu búsqueda.
      </div>
    )}
    {!isLoading &&
      results.map((p) => (
        <SearchResultItem key={p.id} product={p} onClick={onSelect} />
      ))}
  </div>
);

export default SearchDropdown;
