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

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
          <Image src={iconMenu} alt="Menu" width={28} height={28} />
        </button>

        <div className={`${styles.navbarLinks} ${isOpen ? styles.show : ""}`}>
          <Link
            href="/catalogo"
            className={pathname.includes("/catalogo") ? styles.active : ""}
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
        <Link href="/" onClick={() => setIsOpen(false)}>
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

      <div className={styles.navRight}>{!isCatalogoPage && <SearchBar />}</div>
    </nav>
  );
};

export default Navbar;
