"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

import { searchProducts } from "@/lib/search";
import { Product } from "@/types/product";

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
  const externalSearch = searchParams.get("search") || "";
  const [tempSearch, setTempSearch] = useState(externalSearch);
  const lastPushedSearchRef = useRef(externalSearch);

  useEffect(() => {
    if (
      externalSearch !== tempSearch &&
      externalSearch !== lastPushedSearchRef.current
    ) {
      setTempSearch(externalSearch);
      lastPushedSearchRef.current = externalSearch;
    }
  }, [externalSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const query = tempSearch.trim();
      if (query.length < 2) {
        setResults([]);
        setIsLoading(false);
      } else {
        // Usa searchProducts con tolerancia a tipeos
        const matched = searchProducts(query, 4);
        setResults(matched);
        setIsLoading(false);
        setIsDropdownOpen(true);
      }
    }, 350);
    return () => clearTimeout(delayDebounceFn);
  }, [tempSearch]);

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
