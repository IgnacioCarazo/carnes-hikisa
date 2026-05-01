"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect, ChangeEvent } from "react";

import styles from "./CatalogSearchBar.module.css";

const CatalogSearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Valor actual en la URL
  const searchInUrl = searchParams.get("search") || "";

  // 2. Estado local para lo que el usuario escribe
  const [tempSearch, setTempSearch] = useState(searchInUrl);

  // 3. Estado para rastrear el último valor de la URL que vimos
  const [prevSearchInUrl, setPrevSearchInUrl] = useState(searchInUrl);

  if (searchInUrl !== prevSearchInUrl) {
    setPrevSearchInUrl(searchInUrl);
    setTempSearch(searchInUrl);
  }

  // 4. Efecto para actualizar la URL (Debounce)
  useEffect(() => {
    // Si el texto local es igual a lo que ya está en la URL, no hacemos nada
    if (tempSearch.trim() === searchInUrl) return;

    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (tempSearch.trim().length > 0) {
        params.set("search", tempSearch.trim());
      } else {
        params.delete("search");
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [tempSearch, pathname, router, searchInUrl, searchParams]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTempSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setTempSearch("");
  };

  return (
    <div className={styles.searchContainerDesktop}>
      <svg
        className={styles.searchIconDesktop}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input
        type="text"
        placeholder="Filtrar catálogo..."
        value={tempSearch}
        onChange={handleInputChange}
      />

      <AnimatePresence>
        {tempSearch.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={styles.clearButtonDesktop}
            onClick={handleClearSearch}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CatalogSearchBar;
