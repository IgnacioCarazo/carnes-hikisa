import Fuse from "fuse.js";
import { useMemo } from "react";

import categoriesDataRaw from "@/data/categories.json";
import { Product, Category } from "@/types/product";

const categoriesData = categoriesDataRaw as Category[];

/**
 * Producto extendido SOLO para búsqueda
 */
type ProductIndexed = Product & {
  categoryId: string;
  categoryName: string;
};

function buildExtendedQuery(query: string) {
  const terms = query.trim().toLowerCase().split(" ").filter(Boolean);
  return terms.map((t) => `'${t}`).join(" ");
}

export function useCatalogSearch(
  searchQuery: string,
  activeCategories: string[],
) {
  /**
   * Indexación de productos con metadata de categoría
   */
  const allProducts = useMemo<ProductIndexed[]>(() => {
    return categoriesData.flatMap((cat) =>
      cat.products.map((p) => ({
        ...p,
        categoryId: cat.id,
        categoryName: cat.name,
      })),
    );
  }, []);

  /**
   * Índice Fuse único
   */
  const fuse = useMemo(() => {
    return new Fuse<ProductIndexed>(allProducts, {
      keys: ["name", "categoryName"],
      threshold: 0.3,
      useExtendedSearch: true,
    });
  }, [allProducts]);

  /**
   * Pipeline de búsqueda + filtros
   */
  return useMemo(() => {
    const hasSearch = searchQuery.trim().length > 0;
    const hasFilters = activeCategories.length > 0;

    let results: ProductIndexed[] = allProducts;

    // 1. SEARCH GLOBAL
    if (hasSearch) {
      const extended = buildExtendedQuery(searchQuery);
      results = fuse.search(extended).map((r) => r.item);
    }

    // 2. FILTRO DE CATEGORÍAS
    if (hasFilters) {
      results = results.filter((p) => activeCategories.includes(p.categoryId));
    }

    // 3. RE-GROUP POR CATEGORÍA (UI STRUCTURE)
    const grouped: Category[] = categoriesData
      .map((cat) => ({
        ...cat,
        products: results.filter((p) => p.categoryId === cat.id),
      }))
      .filter((cat) => cat.products.length > 0);

    return grouped;
  }, [searchQuery, activeCategories, fuse, allProducts]);
}
