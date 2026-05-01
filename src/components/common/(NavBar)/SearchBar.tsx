"use client";
import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";
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

  // 1. Aplanamos los productos una sola vez
  const allProducts = useMemo(() => {
    return menuData.flatMap((cat: Category) =>
      cat.products.map((p) => ({
        ...p,
        categoryIcon: cat.image,
        categoryName: cat.name,
      })),
    ) as Product[];
  }, []);

  // 2. Configuración estricta de Fuse.js
  const fuse = useMemo(() => {
    return new Fuse(allProducts, {
      keys: [
        { name: "name", weight: 0.95 }, // Prioridad máxima al nombre
        { name: "categoryName", weight: 0.05 }, // Peso mínimo a la categoría para evitar falsos positivos
      ],
      threshold: 0.2, // Muy estricto (0.0 es match exacto)
      location: 0, // El match debe estar al inicio
      distance: 0, // No permite que el match esté lejos del inicio
      minMatchCharLength: 2,
      ignoreLocation: false, // Importante para que "res" no coincida con "fresco"
    });
  }, [allProducts]);

  // 3. Lógica de búsqueda con Debounce y Filtro de Seguridad
  useEffect(() => {
    const query = tempSearch.trim().toLowerCase();

    const delayDebounceFn = setTimeout(() => {
      if (query.length < 2) {
        setResults([]);
        setIsLoading(false);
      } else {
        // Ejecutar búsqueda fuzzy
        let fuzzyResults = fuse.search(query).map((r) => r.item);

        // Filtro de seguridad para palabras cortas (ej. "res")
        // Si la búsqueda es corta, forzamos que el texto esté incluido literalmente
        if (query.length <= 3) {
          fuzzyResults = fuzzyResults.filter(
            (item) =>
              item.name.toLowerCase().includes(query) ||
              item.categoryName.toLowerCase().includes(query),
          );
        }

        setResults(fuzzyResults.slice(0, 4));
        setIsLoading(false);
      }
    }, 350);

    return () => clearTimeout(delayDebounceFn);
  }, [tempSearch, fuse]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTempSearch(value);
    if (value.trim().length >= 2) setIsLoading(true);
    else {
      setIsLoading(false);
      setResults([]);
    }
  };

  const handleClearSearch = () => {
    setTempSearch("");
    setResults([]);
    setIsLoading(false);
    searchInputRef.current?.focus();
  };

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
          {results.map((product) => (
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
