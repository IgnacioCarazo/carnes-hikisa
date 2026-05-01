"use client";
import { motion, AnimatePresence } from "framer-motion";

import styles from "./SearchInput.module.css";

interface Props {
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  isMobile?: boolean;
}

const SearchInput = ({
  value,
  onChange,
  onClear,
  onKeyDown,
  placeholder,
  isMobile,
}: Props) => (
  <div
    className={isMobile ? styles.searchField : styles.searchContainerDesktop}
  >
    {!isMobile && (
      <svg
        className={styles.searchIconDesktop}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    )}
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      enterKeyHint="search" // Cambia el icono del teclado a una lupa
    />
    <AnimatePresence>
      {value.length > 0 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className={
            isMobile ? styles.clearButtonMobile : styles.clearButtonDesktop
          }
          onClick={(e) => {
            e.preventDefault(); // Evita cualquier acción por defecto
            onClear();
          }}
          type="button" // CRÍTICO: Evita que el botón cierre el teclado accidentalmente
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  </div>
);

export default SearchInput;
