"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

import SearchInput from "./SearchInput";

const CatalogSearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Obtenemos el valor actual de la URL
  const externalSearch = searchParams.get("search") || "";

  // 2. Estados locales
  const [tempSearch, setTempSearch] = useState(externalSearch);
  const [prevExternalSearch, setPrevExternalSearch] = useState(externalSearch);

  // 3. LA CLAVE: Ajuste de estado durante el render (Patrón oficial de React)
  // Si la URL cambió externamente, forzamos la actualización del estado local aquí mismo.
  if (externalSearch !== prevExternalSearch) {
    setPrevExternalSearch(externalSearch);
    setTempSearch(externalSearch);
  }

  // Referencia para evitar bucles con el router
  const lastPushedSearch = useRef(externalSearch);

  // 4. Efecto de Debounce para actualizar la URL
  useEffect(() => {
    if (tempSearch === lastPushedSearch.current) return;

    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (tempSearch.trim()) {
        params.set("search", tempSearch);
      } else {
        params.delete("search");
      }

      const newQuery = params.toString();
      const currentQuery = searchParams.toString();

      if (newQuery !== currentQuery) {
        lastPushedSearch.current = tempSearch;
        router.replace(`${pathname}?${newQuery}`, { scroll: false });
      }
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [tempSearch, pathname, router, searchParams]);

  return (
    <SearchInput
      value={tempSearch}
      onChange={(val) => setTempSearch(val)}
      onClear={() => setTempSearch("")}
      placeholder="Filtrar catálogo..."
    />
  );
};

export default CatalogSearchBar;
