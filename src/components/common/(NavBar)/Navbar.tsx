"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import iconMenu from "@/assets/icons/Hamburger-Menu.webp";
import logoHikisa from "@/assets/imgs/CarnesHikisa_RB.webp";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          <Image src={iconMenu} alt="Menu" width={28} height={28} />
        </button>

        <div className={`${styles.navbarLinks} ${isOpen ? styles.show : ""}`}>
          <Link
            href="/catalogo"
            className={pathname === "/catalogo" ? styles.active : ""}
            onClick={() => setIsOpen(false)}
          >
            Catálogo
          </Link>
          <Link
            href="/contactos"
            className={pathname === "/contactos" ? styles.active : ""}
            onClick={() => setIsOpen(false)}
          >
            Contactos
          </Link>
        </div>
      </div>

      <div className={styles.navbarLogo}>
        <Link href="/">
          <Image
            src={logoHikisa}
            alt="Carnes Hikisa"
            width={180}
            height={70}
            className={styles.logoImg}
            priority
          />
        </Link>
      </div>

      <div className={styles.navRight}>
        <div className={styles.searchContainer}>
          <svg
            className={styles.searchIcon}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input type="text" placeholder="Buscar producto..." />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
