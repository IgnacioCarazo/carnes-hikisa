"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import iconMenu from "@/assets/icons/Hamburger-Menu.webp";
import logoHikisa from "@/assets/imgs/CarnesHikisa_RB.webp";

import styles from "./Navbar.module.css";

import SearchBar from "../(SearchBar)/SearchBar";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isCatalogoPage = pathname.includes("/catalogo");

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Overlay para cerrar el menú al hacer clic fuera en móviles */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.overlayShow : ""}`}
        onClick={closeMenu}
      />

      <nav className={styles.navbar}>
        <div className={styles.navLeft}>
          <button
            className={styles.hamburger}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            <Image src={iconMenu} alt="Menu" width={28} height={28} />
          </button>

          <div className={`${styles.navbarLinks} ${isOpen ? styles.show : ""}`}>
            <Link
              href="/catalogo"
              className={pathname.includes("/catalogo") ? styles.active : ""}
              onClick={closeMenu}
            >
              Catálogo
            </Link>
            <Link
              href="/contactos"
              className={pathname === "/contactos" ? styles.active : ""}
              onClick={closeMenu}
            >
              Contactos
            </Link>
          </div>
        </div>

        <div className={styles.navbarLogo}>
          <Link href="/" onClick={closeMenu}>
            <Image
              src={logoHikisa}
              alt="Logo Hikisa"
              width={170}
              height={52}
              className={styles.logoImg}
              priority
            />
          </Link>
        </div>

        <div className={styles.navRight}>
          {!isCatalogoPage && <SearchBar />}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
