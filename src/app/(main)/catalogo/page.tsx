"use client";

import { Filter } from "lucide-react";
import { useState } from "react";

import FilterSidebar from "@/components/common/(FilterSidebar)/FilterSidebar";
import ProductGrid from "@/components/common/(ProductGrid)/ProductGrid";
import ProductsCards from "@/components/common/(ProductsCards)/ProductsCards";
import SectionHeader from "@/components/common/(SectionHeader)/SectionHeader";
import categoriesData from "@/data/categories.json";

import styles from "./page.module.css";

export default function CatalogoPage() {
  const [isOpen, setIsOpen] = useState(false);

  const [activeCategory, setActiveCategory] = useState("res");

  const activeCategoryData = categoriesData.find(
    (cat) => cat.id === activeCategory,
  );

  const filteredProducts = activeCategoryData?.products || [];

  return (
    <main className={styles.pageWrapper}>
      <SectionHeader
        title="NUESTROS PRODUCTOS"
        description="Explore nuestra selección de cortes premium, cuidadosamente seleccionados para brindarle la mejor calidad y frescura. Desde Carnes Hikisa, Costa Rica, hasta su mesa."
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
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        <div className={styles.mainContent}>
          {/* 4. Usamos el título dinámico y renderizamos las cards filtradas */}
          <ProductGrid categoryTitle={activeCategoryData?.name || "Productos"}>
            {filteredProducts.length > 0 ? (
              <ProductsCards products={filteredProducts} />
            ) : (
              <p className={styles.emptyMessage}>
                No hay productos en esta categoría.
              </p>
            )}
          </ProductGrid>
        </div>
      </div>
    </main>
  );
}
