"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

import iconMenu from "@/assets/icons/Hamburger-Menu.webp";
import logoHikisa from "@/assets/imgs/CarnesHikisa_RB.webp";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

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
              className={pathname === "/catalogo" ? styles.active : ""}
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
          {/* Lupa para abrir el panel en móvil */}
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
            <input type="text" placeholder="Buscar..." />
          </div>
        </div>
      </nav>

      <div
        className={`${styles.searchPanelMobile} ${isSearchOpen ? styles.showPanel : ""}`}
      >
        <div className={styles.searchPanelHeader}>
          <div className={styles.searchField}>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="¿Qué corte buscas?"
            />
          </div>
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
