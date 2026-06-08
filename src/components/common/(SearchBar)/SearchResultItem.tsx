import Image from "next/image";

import { Product } from "@/types/product";

import styles from "./SearchResultItem.module.css";

interface Props {
  product: Product;
  onClick: (name: string) => void;
}

const SearchResultItem = ({ product, onClick }: Props) => (
  <div className={styles.miniCard} onClick={() => onClick(product.name)}>
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
  </div>
);

export default SearchResultItem;
