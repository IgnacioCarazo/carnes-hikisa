"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useRef } from "react";

import iconMenu from "@/assets/icons/Hamburger-Menu.webp";
import logoHikisa from "@/assets/imgs/CarnesHikisa_RB.webp";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Sincronización de estado sin useEffect para evitar renders en cascada
  const currentSearch = searchParams.get("search") || "";
  const [tempSearch, setTempSearch] = useState(currentSearch);
  const [prevSearch, setPrevSearch] = useState(currentSearch);

  if (currentSearch !== prevSearch) {
    setPrevSearch(currentSearch);
    setTempSearch(currentSearch);
  }

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const executeSearch = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
    }
    router.push(`/catalogo?${params.toString()}`);
    setIsSearchOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") executeSearch(tempSearch);
  };

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <button
            className={styles.hamburger}
            onClick={() => setIsOpen(!isOpen)}
          >
            <Image src={iconMenu} alt="Menu" width={28} height={28} />
          </button>
          <div className={`${styles.navbarLinks} ${isOpen ? styles.show : ""}`}>
            <Link
              href="/catalogo"
              className={pathname.includes("/catalogo") ? styles.active : ""}
            >
              Catálogo
            </Link>
            <Link
              href="/contactos"
              className={pathname === "/contactos" ? styles.active : ""}
            >
              Contactos
            </Link>
          </div>
        </div>

        <div className={styles.navbarLogo}>
          <Link href="/">
            <Image
              src={logoHikisa}
              alt="Logo"
              width={160}
              height={60}
              className={styles.logoImg}
              priority
            />
          </Link>
        </div>

        <div className={styles.navRight}>
          <button
            className={styles.searchButtonMobile}
            onClick={() => setIsSearchOpen(true)}
          >
            <svg
              className={styles.searchIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          <div className={styles.searchContainerDesktop}>
            <input
              type="text"
              placeholder="Buscar..."
              value={tempSearch}
              onChange={(e) => setTempSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </nav>

      <div
        className={`${styles.searchPanelMobile} ${isSearchOpen ? styles.showPanel : ""}`}
      >
        <div className={styles.searchPanelHeader}>
          <input
            ref={searchInputRef}
            type="text"
            placeholder="¿Qué corte buscas?"
            value={tempSearch}
            onChange={(e) => setTempSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className={styles.closePanel}
            onClick={() => setIsSearchOpen(false)}
          >
            CANCELAR
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
