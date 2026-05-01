"use client";

import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";
import { Filter, X } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useMemo, Suspense } from "react";

import FilterSidebar from "@/components/common/(FilterSidebar)/FilterSidebar";
import CatalogSearchBar from "@/components/common/(NavBar)/CatalogSearchBar";
import ProductGrid from "@/components/common/(ProductGrid)/ProductGrid";
import ProductsCards from "@/components/common/(ProductsCards)/ProductsCards";
import SectionHeader from "@/components/common/(SectionHeader)/SectionHeader";
import categoriesDataRaw from "@/data/categories.json";

import styles from "./page.module.css";

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  "image-white": string;
  imageCarousell: string;
  products: Product[];
}

const categoriesData = categoriesDataRaw as Category[];

function CatalogoContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const activeCategories = useMemo(() => {
    const params = searchParams.get("categories");
    return params ? params.split(",") : [];
  }, [searchParams]);

  const searchQuery = useMemo(
    () => searchParams.get("search") || "",
    [searchParams],
  );

  const updateURL = (newCategories: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newCategories.length > 0)
      params.set("categories", newCategories.join(","));
    else params.delete("categories");
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

  // --- LÓGICA DE FUSE.JS ---
  const filteredCategories = useMemo(() => {
        if (!searchQuery && activeCategories.length === 0) return categoriesData;

    return categoriesData
      .map((cat) => {
        // Si hay categorías activas y esta no lo es, la descartamos
        if (activeCategories.length > 0 && !activeCategories.includes(cat.id)) {
          return null;
        }

        // Si no hay búsqueda pero la categoría está activa, devolver categoría completa
        if (!searchQuery) return cat;

        // Configurar Fuse para los productos de esta categoría
        const fuse = new Fuse(cat.products, {
          keys: ["name"],
          threshold: 0.3, // 0 es exacto, 1 es cualquier cosa. 0.3 es ideal.
          ignoreLocation: true,
          useExtendedSearch: true,
        });

        const searchResults = fuse.search(searchQuery).map((r) => r.item);

        // Si la categoría misma coincide con el nombre buscado, mostrar todos sus productos
        const categoryMatch =
          new Fuse([cat], { keys: ["name"], threshold: 0.3 }).search(
            searchQuery,
          ).length > 0;

        if (categoryMatch || searchResults.length > 0) {
          return {
            ...cat,
            products:
              categoryMatch && searchResults.length === 0
                ? cat.products
                : searchResults,
          };
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
        <div className={styles.sidebarArea}>
          {!isOpen && (
            <button
              className={styles.sidebarToggleBtn}
              onClick={() => setIsOpen(true)}
            >
              <Filter size={20} />
            </button>
          )}
          <FilterSidebar
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            activeCategories={activeCategories}
            onCategoryChange={handleCategoryChange}
            onClearFilters={handleClearFilters}
          />
        </div>
        <div className={styles.mainContent}>
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
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className={styles.miniCategoryCard}
                              >
                                <div className={styles.miniIconContainer}>
                                  <Image
                                    src={`/icons/categoryIcons/${cat.image}`}
                                    alt={cat.name}
                                    width={20}
                                    height={20}
                                  />
                                </div>
                                <span className={styles.miniName}>
                                  {cat.name}
                                </span>
                                <button
                                  className={styles.miniRemoveBtn}
                                  onClick={() => handleCategoryChange(id)}
                                >
                                  <X size={10} strokeWidth={4} />
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
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={styles.emptyMessage}
                >
                  No se encontraron productos que coincidan con tu búsqueda.
                </motion.p>
              )}
            </AnimatePresence>
          </ProductGrid>
        </div>
      </div>
    </main>
  );
}

export default function CatalogoPage() {
  return (
    <Suspense fallback={<div>Cargando catálogo...</div>}>
      <CatalogoContent />
    </Suspense>
  );
}
