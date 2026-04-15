"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import logoHikisa from "@/assets/imgs/CarnesHikisa_RB.webp";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar-links"]}>
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

      <div className={styles["navbar-logo"]}>
        <Link href="/">
          <Image
            src={logoHikisa}
            alt="Carnes Hikisa"
            width={250}
            height={100}
            style={{ height: "auto", width: "250px" }}
            priority
          />
        </Link>
      </div>

      <div className={styles["navbar-search"]}>
        <div className={styles["search-container"]}>
          <span className={styles["search-icon"]}>🔍</span>
          <input type="text" placeholder="Buscar producto..." />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
