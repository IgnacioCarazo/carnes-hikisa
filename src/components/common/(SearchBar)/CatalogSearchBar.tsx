"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

import SearchInput from "./SearchInput";

const CatalogSearchBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const externalSearch = searchParams.get("search") || "";
  const [tempSearch, setTempSearch] = useState(externalSearch);
  const [prevExternalSearch, setPrevExternalSearch] = useState(externalSearch);

  if (externalSearch !== prevExternalSearch) {
    setPrevExternalSearch(externalSearch);
    setTempSearch(externalSearch);
  }

  const lastPushedSearch = useRef(externalSearch);

  useEffect(() => {
    if (tempSearch === lastPushedSearch.current) return;

    const delayDebounceFn = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (tempSearch.trim()) params.set("search", tempSearch);
      else params.delete("search");

      const newQuery = params.toString();
      if (newQuery !== searchParams.toString()) {
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
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          (e.target as HTMLInputElement).blur();
        }
      }}
      placeholder="Filtrar catálogo..."
    />
  );
};

export default CatalogSearchBar;
