"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";

// Ajusta esta ruta a donde tengas tu page.tsx o donde definiste la interfaz Product

import { Product } from "@/types/product";

import styles from "./ProductModal.module.css";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null; // Agregamos el producto aquí
}

const ProductModal = ({ isOpen, onClose, product }: ProductModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Si no hay producto, no renderizamos nada dentro de AnimatePresence
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={styles.overlay}>
          <motion.div
            className={styles.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className={styles.modalContent}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <button className={styles.closeButton} onClick={onClose}>
              <X size={20} color="#fff" />
            </button>

            {/* --- ESTRUCTURA --- */}
            <div className={styles.contentLayout}>
              <div className={styles.modalImage}>
                <Image src={product.image} alt={product.name} fill />
              </div>
              <div className={styles.modalTextContent}>
                <h2>{product.name}</h2>
                <p>{product.description}</p>
              </div>
            </div>
            {/* ----------------- */}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
