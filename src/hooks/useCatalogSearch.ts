import { useDeferredValue, useMemo } from "react";

import categoriesDataRaw from "@/data/categories.json";
import { searchProducts } from "@/lib/search";
import { Category } from "@/types/product";

const categoriesData = categoriesDataRaw as Category[];

export function useCatalogSearch(
  searchQuery: string,
  activeCategories: string[],
) {
  const deferredQuery = useDeferredValue(searchQuery);
  const isSearchStale = searchQuery !== deferredQuery;

  const results = useMemo(() => {
    const hasSearch = deferredQuery.trim().length > 0;
    const hasFilters = activeCategories.length > 0;

    let results: (Category["products"][number] & {
      categoryId: string;
      categoryName: string;
    })[] = [];

    // 1. SEARCH GLOBAL (usa searchProducts con tolerancia)
    if (hasSearch) {
      results = searchProducts(deferredQuery);
    } else {
      // Sin búsqueda, mostrar todos los productos
      results = categoriesData.flatMap((cat) =>
        cat.products.map((p) => ({
          ...p,
          image: p.image,
          categoryId: cat.id,
          categoryName: cat.name,
        })),
      );
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
  }, [deferredQuery, activeCategories]);

  return { results, isSearchStale };
}
