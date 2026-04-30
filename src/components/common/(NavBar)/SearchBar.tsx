"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef, useMemo, ChangeEvent } from "react";

import menuDataRaw from "@/data/categories.json";

import styles from "./SearchBar.module.css";

interface Product {
  id: string | number;
  name: string;
  description: string;
  category: string;
  image: string;
  categoryIcon: string;
  categoryName: string;
}

interface Category {
  id: string;
  name: string;
  image: string;
  "image-white": string;
  products: {
    id: string | number;
    name: string;
    description: string;
    category: string;
    image: string;
  }[];
}

const menuData = menuDataRaw as Category[];

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [tempSearch, setTempSearch] = useState(
    searchParams.get("search") || "",
  );
  const searchInputRef = useRef<HTMLInputElement>(null);

  const allProducts = useMemo(() => {
    return menuData.flatMap((cat: Category) =>
      cat.products.map((p) => ({
        ...p,
        categoryIcon: cat.image,
        categoryName: cat.name,
      })),
    ) as Product[];
  }, []);

  useEffect(() => {
    const query = tempSearch.trim().toLowerCase();

    const delayDebounceFn = setTimeout(() => {
      if (query.length < 2) {
        setResults([]);
        setIsLoading(false);
      } else {
        const filtered = allProducts
          .filter(
            (p) =>
              p.name.toLowerCase().includes(query) ||
              p.description.toLowerCase().includes(query),
          )
          .slice(0, 4);

        setResults(filtered);
        setIsLoading(false);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [tempSearch, allProducts]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTempSearch(value);

    if (value.trim().length >= 2) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setResults([]);
    }
  };

  const handleClearSearch = () => {
    setTempSearch("");
    setResults([]);
    setIsLoading(false);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const executeSearch = (name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", name);
    router.push(`/catalogo?${params.toString()}`);
    setIsSearchOpen(false);
    setResults([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tempSearch.trim().length > 0) {
      executeSearch(tempSearch);
    }
  };

  const isNoResults =
    tempSearch.trim().length >= 2 && !isLoading && results.length === 0;

  return (
    <>
      {/* Botón Móvil */}
      <button
        className={styles.searchButtonMobile}
        onClick={() => setIsSearchOpen(true)}
      >
        <svg
          className={styles.searchIcon}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>

      {/* Contenedor Escritorio */}
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
          placeholder="Buscar cortes..."
          value={tempSearch}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
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

        <AnimatePresence>
          {(results.length > 0 || isLoading || isNoResults) && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={styles.searchResultsDropdown}
            >
              {isLoading && results.length === 0 ? (
                <div className={styles.searchStatus}>Buscando...</div>
              ) : isNoResults ? (
                <div className={styles.searchStatus}>
                  No encontramos nada para &quot;{tempSearch}&quot;
                </div>
              ) : (
                results.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={styles.miniCard}
                    onClick={() => executeSearch(product.name)}
                  >
                    <div className={styles.miniImageContainer}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className={styles.miniProductImage}
                      />
                    </div>
                    <div className={styles.miniFooter}>
                      <div className={styles.miniInfo}>
                        <h3 className={styles.miniTitle}>{product.name}</h3>
                        <span className={styles.miniCategory}>
                          {product.categoryName}
                        </span>
                      </div>
                      <div className={styles.miniViewButton}>
                        <Image
                          src={`/icons/categoryIcons/${product.categoryIcon}`}
                          alt="icon"
                          width={14}
                          height={14}
                          style={{ filter: "brightness(0)" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* PANEL MÓVIL */}
      <div
        className={`${styles.searchPanelMobile} ${isSearchOpen ? styles.showPanel : ""}`}
      >
        <div className={styles.searchPanelHeader}>
          <div className={styles.searchField}>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="¿Qué corte buscas?"
              value={tempSearch}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            {tempSearch.length > 0 && (
              <button
                className={styles.clearButtonMobile}
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
              </button>
            )}
          </div>
          <button
            className={styles.closePanel}
            onClick={() => setIsSearchOpen(false)}
          >
            CANCELAR
          </button>
        </div>
        <div className={styles.searchPanelContent}>
          {isLoading && results.length === 0 && (
            <p className={styles.searchStatus}>Buscando productos...</p>
          )}
          {isNoResults && (
            <p className={styles.searchStatus}>
              No encontramos nada para &quot;{tempSearch}&quot;
            </p>
          )}
          {results.length > 0 &&
            !isNoResults &&
            results.map((product) => (
              <div
                key={product.id}
                className={styles.miniCard}
                onClick={() => executeSearch(product.name)}
              >
                <div className={styles.miniImageContainer}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className={styles.miniProductImage}
                  />
                </div>
                <div className={styles.miniFooter}>
                  <div className={styles.miniInfo}>
                    <h3 className={styles.miniTitle}>{product.name}</h3>
                    <span className={styles.miniCategory}>
                      {product.categoryName}
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default SearchBar;
