"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Suspense } from "react";

import iconFb from "@/assets/icons/Facebook.webp";
import iconIg from "@/assets/icons/Instagram.webp";
import iconTk from "@/assets/icons/Tiktok.webp";
import iconWa from "@/assets/icons/Whatsapp.webp";
import logoHikisa from "@/assets/imgs/CarnesHikisa_RB.webp";
import SectionHeader from "@/components/common/(SectionHeader)/SectionHeader";
import { SOCIAL_LINKS } from "@/constants/links";

import styles from "./page.module.css";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

function ContactContent() {
  return (
    <main className={styles.pageWrapper}>
      <SectionHeader
        title="¿Cómo y donde puede ponerse en contacto con nosotros?"
        color="black"
      />

      <motion.div
        className={styles.contentLayout}
        variants={container}
        initial="hidden"
        animate="show"
      >
        <div className={styles.group}>
          {/* IZQUIERDA */}
          <motion.div className={styles.content} variants={item}>
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
          </motion.div>

          {/* DERECHA */}
          <motion.div className={styles.rightColumn} variants={item}>
            <div className={styles.mapWrapper}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.505697669467!2d-83.9213123!3d9.8500271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa128f3fd95c615%3A0x5212700689559d1e!2sDistribuidora%20Carnes%20Hikisa!5e0!3m2!1ses-419!2scr!4v1712950000000!5m2!1ses-419!2scr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
            </div>

            <div className={styles.socials}>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer">
                <Image src={iconFb} alt="FB" width={20} height={20} />
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer">
                <Image src={iconIg} alt="IG" width={20} height={20} />
              </a>
              <a href={SOCIAL_LINKS.whatsapp} target="_blank" rel="noreferrer">
                <Image src={iconWa} alt="WA" width={20} height={20} />
              </a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noreferrer">
                <Image src={iconTk} alt="TK" width={20} height={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* LOGO */}
        <motion.div
          className={styles.logoWrapper}
          animate={{ opacity: 0.07, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image src={logoHikisa} alt="Hikisa" className={styles.logoDesktop} />

          <Image
            src="/icons/cow-head.jpg"
            alt="Hikisa"
            className={styles.logoMobile}
            width={500}
            height={300}
          />
        </motion.div>
      </motion.div>
    </main>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div>Cargando contacto...</div>}>
      <ContactContent />
    </Suspense>
  );
}
