import { motion } from "framer-motion";
import Image from "next/image";

import { Product } from "@/types/product";

import styles from "./SearchResultItem.module.css";

interface Props {
  product: Product;
  onClick: (name: string) => void;
  index?: number;
}

const SearchResultItem = ({ product, onClick, index = 0 }: Props) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 }}
    className={styles.miniCard}
    onClick={() => onClick(product.name)}
  >
    <div className={styles.miniImageContainer}>
      <Image
        src={product.image}
        alt={product.name}
        width={55}
        height={55}
        className={styles.miniProductImage}
        sizes="55px"
        loading="lazy"
      />
    </div>

    <div className={styles.miniInfo}>
      <h3 className={styles.miniTitle}>{product.name}</h3>
      <span className={styles.miniCategory}>{product.categoryName}</span>
    </div>
  </motion.div>
);

export default SearchResultItem;
