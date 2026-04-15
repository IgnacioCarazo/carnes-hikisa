"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

import iconWaVerde from "@/assets/icons/WhatsappVerde.webp";
import { SOCIAL_LINKS } from "@/constants/links";

import styles from "./FloatingActions.module.css";

const FloatingActions = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.scrollTop} ${showScrollTop ? styles.visible : ""}`}
        onClick={scrollToTop}
        aria-label="Volver arriba"
      >
        <span className={styles.arrow}>▲</span>
        <span className={styles.textArriba}>ARRIBA</span>
      </button>

      <a
        href={SOCIAL_LINKS.whatsapp}
        target="_blank"
        rel="noreferrer"
        className={styles.whatsappBtn}
      >
        <div className={styles.tooltip}>¿En qué podemos ayudarte?</div>
        <Image src={iconWaVerde} alt="WhatsApp" width={60} height={60} />
      </a>
    </div>
  );
};

export default FloatingActions;
