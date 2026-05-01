"use client";

import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";
import { Filter, X } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useMemo, Suspense } from "react";

import FilterSidebar from "@/components/common/(FilterSidebar)/FilterSidebar";
import ProductGrid from "@/components/common/(ProductGrid)/ProductGrid";
import ProductsCards from "@/components/common/(ProductsCards)/ProductsCards";
import CatalogSearchBar from "@/components/common/(SearchBar)/CatalogSearchBar";
import SectionHeader from "@/components/common/(SectionHeader)/SectionHeader";
import categoriesDataRaw from "@/data/categories.json";

import styles from "./page.module.css";

// Interfaces de datos
export interface Product {
  id: string | number;
  name: string;
  description: string;
  category: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  "image-white": string; // Se quitó el "?" para coincidir con lo que esperan tus componentes hijos
  imageCarousell?: string;
  products: Product[];
}

const categoriesData = categoriesDataRaw as Category[];

function CatalogoContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(true);

  // 1. Obtener filtros de la URL
  const activeCategories = useMemo(() => {
    const params = searchParams.get("categories");
    return params ? params.split(",") : [];
  }, [searchParams]);

  const searchQuery = useMemo(
    () => searchParams.get("search") || "",
    [searchParams],
  );

  // 2. Sincronizar cambios con la URL
  const updateURL = (newCategories: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newCategories.length > 0) {
      params.set("categories", newCategories.join(","));
    } else {
      params.delete("categories");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleCategoryChange = (id: string) => {
    const next = activeCategories.includes(id)
      ? activeCategories.filter((c) => c !== id)
      : [...activeCategories, id];
    updateURL(next);
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("categories");
    params.delete("search");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // 3. Lógica de filtrado combinada (Categoría + Fuse.js)
  const filteredCategories = useMemo(() => {
    if (!searchQuery && activeCategories.length === 0) return categoriesData;

    return categoriesData
      .map((cat) => {
        // Filtrar por categoría seleccionada
        if (activeCategories.length > 0 && !activeCategories.includes(cat.id)) {
          return null;
        }

        // Si no hay búsqueda de texto, devolvemos la categoría completa
        if (!searchQuery) return cat;

        // Búsqueda Fuzzy dentro de los productos de la categoría
        const fuse = new Fuse(cat.products, {
          keys: ["name"],
          threshold: 0.3,
        });

        const searchResults = fuse.search(searchQuery).map((r) => r.item);

        if (searchResults.length > 0) {
          return { ...cat, products: searchResults };
        }
        return null;
      })
      .filter((cat): cat is Category => cat !== null);
  }, [activeCategories, searchQuery]);

  return (
    <main className={styles.pageWrapper}>
      <SectionHeader
        title="NUESTROS PRODUCTOS"
        description="Explore nuestra selección de cortes premium y productos frescos."
        color="black"
      />

      <div className={styles.contentLayout}>
        {/* Lado Izquierdo: Sidebar Animado */}
        <motion.div
          className={styles.sidebarArea}
          animate={{ width: isOpen ? "340px" : "80px" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="sidebar"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <FilterSidebar
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                  activeCategories={activeCategories}
                  onCategoryChange={handleCategoryChange}
                  onClearFilters={handleClearFilters}
                />
              </motion.div>
            ) : (
              <motion.div
                key="toggle"
                className={styles.buttonCenterer}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <button
                  className={styles.sidebarToggleBtn}
                  onClick={() => setIsOpen(true)}
                >
                  <Filter size={24} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Lado Derecho: Contenido Principal */}
        <motion.div layout className={styles.mainContent}>
          <ProductGrid
            categoryTitle={
              <div className={styles.filterHeaderWrapper}>
                <div className={styles.leftFilterContent}>
                  {activeCategories.length > 0 || searchQuery ? (
                    <>
                      <button
                        className={styles.removeAllBadge}
                        onClick={handleClearFilters}
                      >
                        Limpiar todo
                      </button>
                      {searchQuery && (
                        <div className={styles.searchTermBadge}>
                          Buscando:{" "}
                          <span className={styles.highlightText}>
                            &quot;{searchQuery}&quot;
                          </span>
                        </div>
                      )}
                      <div className={styles.filterCardsContainer}>
                        <AnimatePresence>
                          {activeCategories.map((id) => {
                            const cat = categoriesData.find((c) => c.id === id);
                            if (!cat) return null;
                            return (
                              <motion.div
                                key={id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className={styles.miniCategoryCard}
                              >
                                <Image
                                  src={`/icons/categoryIcons/${cat.image}`}
                                  alt={cat.name}
                                  width={18}
                                  height={18}
                                />
                                <span className={styles.miniName}>
                                  {cat.name}
                                </span>
                                <button
                                  onClick={() => handleCategoryChange(id)}
                                >
                                  <X size={12} />
                                </button>
                              </motion.div>
                            );
                          })}
                        </AnimatePresence>
                      </div>
                    </>
                  ) : (
                    <span className={styles.allProductsText}>
                      Todos los productos
                    </span>
                  )}
                </div>
                <div className={styles.rightSearchContainer}>
                  <CatalogSearchBar />
                </div>
              </div>
            }
          >
            <AnimatePresence mode="popLayout">
              {filteredCategories.length > 0 ? (
                <ProductsCards key="list" categories={filteredCategories} />
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={styles.emptyMessage}
                >
                  <p>
                    No se encontraron cortes que coincidan con tu selección.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </ProductGrid>
        </motion.div>
      </div>
    </main>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense
      fallback={
        <div className={styles.loading}>
          Cargando catálogo de Carnes Hikisa...
        </div>
      }
    >
      <CatalogoContent />
    </Suspense>
  );
}
