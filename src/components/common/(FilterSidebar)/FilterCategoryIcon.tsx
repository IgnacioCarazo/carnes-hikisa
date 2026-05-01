import Image from "next/image";

import styles from "./FilterSidebar.module.css";

interface IconProps {
  src: string;
  alt: string;
}

const FilterCategoryIcon = ({ src, alt }: IconProps) => (
  <div className={styles.iconWrapper}>
    <Image
      src={`/icons/categoryIcons/${src}`}
      alt={alt}
      width={30}
      height={30}
    />
  </div>
);

export default FilterCategoryIcon;
