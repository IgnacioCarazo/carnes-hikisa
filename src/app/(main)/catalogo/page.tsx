"use client";

import { Filter } from "lucide-react";
import { useState } from "react";

import FilterSidebar from "@/components/common/(FilterSidebar)/FilterSidebar";
import ProductGrid from "@/components/common/(ProductGrid)/ProductGrid";
import SectionHeader from "@/components/common/(SectionHeader)/SectionHeader";

import styles from "./page.module.css";

export default function CatalogoPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main className={styles.pageWrapper}>
      <SectionHeader
        title="NUESTROS PRODUCTOS"
        description="Explore nuestra selección de cortes premium, cuidadosamente seleccionados para brindarle la mejor calidad y frescura. Desde Carnes Hikisa, Costa Rica, hasta su mesa."
        color="black"
      />

      <div className={styles.contentLayout}>
        {/* Lado Izquierdo: Sidebar o Botón de apertura */}
        <div className={styles.sidebarArea}>
          {!isOpen && (
            <button
              className={styles.sidebarToggleBtn}
              onClick={() => setIsOpen(true)}
            >
              <Filter size={20} />
            </button>
          )}
          <FilterSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>

        {/* Lado Derecho: Contenido de Productos */}
        <div className={styles.mainContent}>
          <ProductGrid categoryTitle="Carnes de Res">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className={styles.productCardPlaceholder} />
            ))}
          </ProductGrid>
        </div>
      </div>
    </main>
  );
}
