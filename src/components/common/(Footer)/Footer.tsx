"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


// Iconos locales
import iconFb from "@/assets/icons/Facebook.webp";
import iconIg from "@/assets/icons/Instagram.webp";
import iconTk from "@/assets/icons/Tiktok.webp";
import iconWa from "@/assets/icons/Whatsapp.webp";
import logoHikisa from "@/assets/imgs/CarnesHikisa_RB.webp";


import styles from "./Footer.module.css";


const Footer = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    // Solo permitimos toggle en móvil (el CSS se encarga de la visibilidad)
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Marca */}
        <div className={styles.brandCol}>
          <div className={styles.logoWrapper}>
            <Image
              src={logoHikisa}
              alt="Carnes Hikisa"
              width={160}
              height={60}
              priority
            />
          </div>
          <p className={styles.description}>
            Calidad premium en cortes de carne. Distribución enfocada en
            frescura y excelencia en cada proceso, desde Cartago para todo el
            país.
          </p>
        </div>

        {/* Contáctenos */}
        <div
          className={`${styles.column} ${openSection === "contacto" ? styles.isOpen : ""}`}
        >
          <h3 onClick={() => toggleSection("contacto")}>
            CONTÁCTENOS <span className={styles.arrow}>▼</span>
          </h3>
          <div className={styles.content}>
            <p>
              <strong>Teléfono</strong>
            </p>
            <p>+506 2553-0564</p>
            <p>
              <strong>Correo</strong>
            </p>
            <p>corporacionhikisa@gmail.com</p>
            <p>
              <strong>Horario</strong>
            </p>
            <p>Lun-Vie: 6am - 4pm / Sáb: 6am - 2:30pm</p>
          </div>
        </div>

        {/* Menú - Ahora en Inter */}
        <div
          className={`${styles.column} ${openSection === "paginas" ? styles.isOpen : ""}`}
        >
          <h3 onClick={() => toggleSection("paginas")}>
            MENÚ <span className={styles.arrow}>▼</span>
          </h3>
          <div className={styles.content}>
            <Link href="/catalogo" className={styles.footerLink}>
              Catálogo
            </Link>
            <Link href="/contactos" className={styles.footerLink}>
              Contactos
            </Link>
          </div>
        </div>

        {/* Ubicación e Iconos */}
        <div className={styles.locationCol}>
          <h3>NUESTRA SEDE</h3>
          <div className={styles.mapWrapper}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.505697669467!2d-83.9213123!3d9.8500271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa128f3fd95c615%3A0x5212700689559d1e!2sDistribuidora%20Carnes%20Hikisa!5e0!3m2!1ses-419!2scr!4v1712950000000!5m2!1ses-419!2scr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
            ></iframe>
          </div>
          <div className={styles.addressLink}>
            <span>📍</span>
            <a
              href="https://maps.app.goo.gl/3Xp8qXmR8uLd2G8A9"
              target="_blank"
              rel="noreferrer"
            >
              Barrio Nazareth, Cartago
            </a>
          </div>
          <div className={styles.socials}>
            <a href="https://www.facebook.com/carneshikisa/?locale=es_LA" className={styles.socialIcon}>
              <Image src={iconFb} alt="FB" width={20} height={20} />
            </a>
            <a href="https://www.instagram.com/carnes_hikisa?fbclid=IwY2xjawRMHi5leHRuA2FlbQIxMABicmlkETE4ekRHaW9uaVhxNkZEWktzc3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHhmAlIvr2sud8VijMHWk6EPOm5CQu8dHL_owwfyj45klDWGxSvKN9l5-qoyy_aem_5eMV1pYQrtSXElK-ci0kGA" className={styles.socialIcon}>
              <Image src={iconIg} alt="IG" width={20} height={20} />
            </a>
            <a href="https://wa.me/50625530564" className={styles.socialIcon}>
              <Image src={iconWa} alt="WA" width={20} height={20} />
            </a>
            <a href="https://www.tiktok.com/@carnes.hikisa" className={styles.socialIcon}>
              <Image src={iconTk} alt="TK" width={20} height={20} />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>© 2026 CARNES HIKISA. TODOS LOS DERECHOS RESERVADOS.</p>
      </div>
    </footer>
  );
};

export default Footer;
