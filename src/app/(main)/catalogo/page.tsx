"use client";

import { Filter, X } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useMemo, Suspense } from "react";

import FilterSidebar from "@/components/common/(FilterSidebar)/FilterSidebar";
import ProductGrid from "@/components/common/(ProductGrid)/ProductGrid";
import ProductsCards from "@/components/common/(ProductsCards)/ProductsCards";
import SectionHeader from "@/components/common/(SectionHeader)/SectionHeader";
import categoriesData from "@/data/categories.json";

import styles from "./page.module.css";

function CatalogoContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);

  // 1. Obtener categorías activas desde la URL
  const activeCategories = useMemo(() => {
    const params = searchParams.get("categories");
    return params ? params.split(",") : [];
  }, [searchParams]);

  // 2. Función única para actualizar la URL
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
    const nextCategories = activeCategories.includes(id)
      ? activeCategories.filter((catId) => catId !== id)
      : [...activeCategories, id];
    updateURL(nextCategories);
  };

  const handleClearFilters = () => {
    updateURL([]);
  };

  // 3. Filtrado de datos para el grid
  const filteredCategories = useMemo(() => {
    if (activeCategories.length === 0) return categoriesData;
    return categoriesData.filter((cat) => activeCategories.includes(cat.id));
  }, [activeCategories]);

  const renderActiveFilterCards = () => {
    if (activeCategories.length === 0) {
      return (
        <div className={styles.filterHeaderWrapper}>
          <span className={styles.allProductsText}>Todos los productos</span>
        </div>
      );
    }

    return (
      <div className={styles.filterHeaderWrapper}>
        <button className={styles.removeAllBadge} onClick={handleClearFilters}>
          Limpiar todo
        </button>

        <div className={styles.filterCardsContainer}>
          {activeCategories.map((catId) => {
            const category = categoriesData.find((c) => c.id === catId);
            if (!category) return null;

            return (
              <div key={catId} className={styles.miniCategoryCard}>
                <div className={styles.miniIconContainer}>
                  <Image
                    src={`/icons/categoryIcons/${category.image}`}
                    alt={category.name}
                    width={20}
                    height={20}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <span className={styles.miniName}>{category.name}</span>
                <button
                  className={styles.miniRemoveBtn}
                  onClick={() => handleCategoryChange(catId)}
                >
                  <X size={10} strokeWidth={4} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <main className={styles.pageWrapper}>
      <SectionHeader
        title="NUESTROS PRODUCTOS"
        description="Explore nuestra selección de cortes premium y productos frescos de alta calidad."
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
          <ProductGrid categoryTitle={renderActiveFilterCards()}>
            {filteredCategories.length > 0 ? (
              <ProductsCards categories={filteredCategories} />
            ) : (
              <p className={styles.emptyMessage}>
                No hay productos disponibles en esta selección.
              </p>
            )}
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
