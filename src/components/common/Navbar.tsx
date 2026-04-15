"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react"; 

import iconMenu from "@/assets/icons//Hamburger-Menu.webp";
import logoHikisa from "@/assets/imgs/CarnesHikisa_RB.webp";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false); // Estado para mobile

  return (
    <nav className={styles.navbar}>
      {/* Botón Hamburguesa - Solo visible en mobile */}
      <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
        <Image src={iconMenu} alt="Menu" width={30} height={30} />
      </button>

      <div className={`${styles["navbar-links"]} ${isOpen ? styles.show : ""}`}>
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

      <div className={styles["navbar-logo"]}>
        <Link href="/">
          <Image
            src={logoHikisa}
            alt="Carnes Hikisa"
            width={200} 
            height={80}
            className={styles.logoImg}
            priority
          />
        </Link>
      </div>

      <div className={styles["navbar-search"]}>
        <div className={styles["search-container"]}>
          <span className={styles["search-icon"]}>🔍</span>
          <input type="text" placeholder="Buscar..." />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;