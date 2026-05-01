"use client";

import { motion, AnimatePresence } from "framer-motion";
import Fuse from "fuse.js";
import { Filter, X } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useMemo, Suspense, useEffect } from "react";

import FilterSidebar from "@/components/common/(FilterSidebar)/FilterSidebar";
import ProductGrid from "@/components/common/(ProductGrid)/ProductGrid";
import ProductsCards from "@/components/common/(ProductsCards)/ProductsCards";
import CatalogSearchBar from "@/components/common/(SearchBar)/CatalogSearchBar";
import SectionHeader from "@/components/common/(SectionHeader)/SectionHeader";
import categoriesDataRaw from "@/data/categories.json";
import { useIsMobile } from "@/hooks/useIsMobile";

import styles from "./page.module.css";

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
  "image-white": string;
  imageCarousell?: string;
  products: Product[];
}

const categoriesData = categoriesDataRaw as Category[];

function CatalogoContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile();

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

  const filteredCategories = useMemo(() => {
    if (!searchQuery && activeCategories.length === 0) return categoriesData;
    return categoriesData
      .map((cat) => {
        if (activeCategories.length > 0 && !activeCategories.includes(cat.id))
          return null;
        if (!searchQuery) return cat;
        const fuse = new Fuse(cat.products, { keys: ["name"], threshold: 0.3 });
        const searchResults = fuse.search(searchQuery).map((r) => r.item);
        return searchResults.length > 0
          ? { ...cat, products: searchResults }
          : null;
      })
      .filter((cat): cat is Category => cat !== null);
  }, [activeCategories, searchQuery]);

  return (
    <main className={styles.pageWrapper}>
      <SectionHeader title="NUESTROS PRODUCTOS" color="black" />

      <div className={styles.contentLayout}>
        {/* SIDEBAR DESKTOP */}
        {!isMobile && (
          <motion.div
            className={styles.sidebarArea}
            animate={{ width: isOpen ? "340px" : "80px" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="sidebar"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
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
                <div className={styles.buttonCenterer}>
                  <button
                    className={styles.sidebarToggleBtn}
                    onClick={() => setIsOpen(true)}
                  >
                    <Filter size={24} />
                  </button>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* MODAL CENTRADO MOBILE */}
        {isMobile && (
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.div
                  className={styles.backdrop}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsOpen(false)}
                />
                <motion.div
                  className={styles.mobileDrawer}
                  initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
                  animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
                  exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-40%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                >
                  <FilterSidebar
                    isOpen={true}
                    setIsOpen={setIsOpen}
                    activeCategories={activeCategories}
                    onCategoryChange={handleCategoryChange}
                    onClearFilters={handleClearFilters}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        )}

        <motion.div layout className={styles.mainContent}>
          {isMobile && (
            <button
              className={styles.mobileFilterBtn}
              onClick={() => setIsOpen(true)}
            >
              <Filter size={20} /> Filtrar Categorías
            </button>
          )}

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
                      <div className={styles.filterCardsContainer}>
                        <AnimatePresence>
                          {activeCategories.map((id) => {
                            const cat = categoriesData.find((c) => c.id === id);
                            if (!cat) return null;
                            return (
                              <motion.div
                                key={id}
                                layout
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
                <div className={styles.emptyMessage}>
                  No se encontraron resultados.
                </div>
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
    <Suspense fallback={<div>Cargando...</div>}>
      <CatalogoContent />
    </Suspense>
  );
}
