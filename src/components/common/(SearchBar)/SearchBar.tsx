"use client";
import Fuse from "fuse.js";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useMemo } from "react";

import menuDataRaw from "@/data/categories.json";
import { buildExtendedQuery } from "@/lib/search";
import { Product, Category } from "@/types/product";

import styles from "./SearchBar.module.css";
import SearchDropdown from "./SearchDropdown";
import SearchInput from "./SearchInput";
import SearchMobilePanel from "./SearchMobilePanel";
import SearchTriggerMobile from "./SearchTriggerMobile";
const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tempSearch, setTempSearch] = useState(
    searchParams.get("search") || "",
  );

  const [results, setResults] = useState<Product[]>([]);

  const allProducts = useMemo<Product[]>(() => {
    const data = menuDataRaw as Category[];
    return data.flatMap((cat: Category) =>
      cat.products.map((p) => ({
        ...p,
        image: p.image,
        categoryName: cat.name,
      })),
    );
  }, []);

  const fuse = useMemo(
    () =>
      new Fuse<Product>(allProducts, {
        keys: ["name", "categoryName"],
        threshold: 0.3,
        useExtendedSearch: true,
      }),
    [allProducts],
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const query = tempSearch.trim();
      if (query.length < 2) {
        setResults([]);
        setIsLoading(false);
      } else {
        const extended = buildExtendedQuery(query);
        const fuzzyResults = fuse.search(extended).map((r) => r.item);
        setResults(fuzzyResults.slice(0, 4));
        setIsLoading(false);
        setIsDropdownOpen(true);
      }
    }, 350);
    return () => clearTimeout(delayDebounceFn);
  }, [tempSearch, fuse]);

  const executeSearch = (name: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("search", name);
    router.push(`/catalogo?${params.toString()}`);
    setIsSearchOpen(false);
  };

  return (
    <>
      <SearchTriggerMobile onClick={() => setIsSearchOpen(true)} />

      <div className={styles.searchContainerDesktop}>
        <SearchInput
          value={tempSearch}
          onChange={(val) => {
            setTempSearch(val);
          }}
          onClear={() => {
            setTempSearch("");
            setResults([]);
            setIsDropdownOpen(false);
          }}
          onKeyDown={(e) => e.key === "Enter" && executeSearch(tempSearch)}
          placeholder="Buscar cortes..."
        />
        {isDropdownOpen && (
          <>
            <div
              className={styles.searchOverlay}
              onClick={() => {
                setIsDropdownOpen(false);
                setTempSearch("");
                setResults([]);
              }}
            />
            <SearchDropdown
              results={results}
              isLoading={isLoading}
              isNoResults={results.length === 0}
              onSelect={(name) => {
                executeSearch(name);
                setIsDropdownOpen(false);
              }}
            />
          </>
        )}
      </div>

      <SearchMobilePanel
        isOpen={isSearchOpen}
        value={tempSearch}
        results={results}
        onClose={() => setIsSearchOpen(false)}
        onChange={(val) => setTempSearch(val)}
        onClear={() => setTempSearch("")}
        onSelect={executeSearch}
      />
    </>
  );
};

export default SearchBar;
