"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Filter, X } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useMemo, Suspense, useEffect, useRef } from "react";

import FilterSidebar from "@/components/common/(FilterSidebar)/FilterSidebar";
import ProductGrid from "@/components/common/(ProductGrid)/ProductGrid";
import ProductsCards from "@/components/common/(ProductsCards)/ProductsCards";
import CatalogSearchBar from "@/components/common/(SearchBar)/CatalogSearchBar";
import SectionHeader from "@/components/common/(SectionHeader)/SectionHeader";
import ProductModal from "@/components/common/ProductModal/ProductModal";
import categoriesDataRaw from "@/data/categories.json";
import { useCatalogSearch } from "@/hooks/useCatalogSearch";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { Product } from "@/types/product";

import styles from "./page.module.css";

const categoriesData = categoriesDataRaw;

function CatalogoContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isMobile = useIsMobile(1366);

  const [isOpen, setIsOpen] = useState(false);

  // --- REF PARA SCROLL DEL GRID ---
  const gridRef = useRef<HTMLDivElement>(null);

  // --- ESTADO PARA EL MODAL ---
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
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

  const handleClearSearch = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("search");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const { results: filteredCategories } = useCatalogSearch(
    searchQuery,
    activeCategories,
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.contentLayoutFull}>
      <div className={styles.contentLayout}>
        {!isMobile && (
          <div
            className={`${styles.sidebarArea} transition-all duration-300 ease-in-out ${
              isOpen ? "w-[340px]" : "w-[80px]"
            }`}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="sidebar-open"
                  className="h-full min-h-0 flex flex-col"
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
                !isMobile && (
                  <motion.div
                    key="sidebar-closed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={styles.buttonCenterer}
                  >
                    <button
                      className={styles.sidebarToggleBtn}
                      onClick={() => setIsOpen(true)}
                    >
                      <Filter size={24} />
                    </button>
                  </motion.div>
                )
              )}
            </AnimatePresence>
          </div>
        )}

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

        <div className={styles.mainContent}>
          <button
            className={styles.mobileFilterBtn}
            onClick={() => setIsOpen(true)}
          >
            <Filter size={20} /> Filtrar Categorías
          </button>

          <ProductGrid
            ref={gridRef}
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
                        <AnimatePresence initial={false}>
                          {searchQuery && (
                            <motion.div
                              key="search-pill-static"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.8 }}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                              className={styles.searchBadge}
                            >
                              <span className={styles.miniName}>
                                Buscando: <strong>{`"${searchQuery}"`}</strong>
                              </span>
                              <button
                                onClick={handleClearSearch}
                                className={styles.closeBtnIcon}
                              >
                                <X size={12} />
                              </button>
                            </motion.div>
                          )}

                          {activeCategories.map((id) => {
                            const cat = categoriesData.find((c) => c.id === id);
                            if (!cat) return null;
                            return (
                              <motion.div
                                key={id}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
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
                                  className={styles.closeBtnIcon}
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
            {filteredCategories.length > 0 ? (
              <ProductsCards
                categories={filteredCategories}
                onProductClick={setSelectedProduct}
              />
            ) : (
              <motion.div
                key="empty-msg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={styles.emptyMessage}
              >
                No se encontraron productos que coincidan con tu búsqueda.
              </motion.div>
            )}
          </ProductGrid>
        </div>
      </div>

      <ProductModal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />
    </div>
  );
}

export default function CatalogoPage() {
  return (
    <main className={styles.pageWrapper}>
      <SectionHeader
        title="NUESTROS PRODUCTOS"
        color="black"
        className={styles.catalogHeaderMargin}
      />

      <Suspense fallback={<div>Cargando catálogo...</div>}>
        <CatalogoContent />
      </Suspense>
    </main>
  );
}
