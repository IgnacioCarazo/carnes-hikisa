export interface Product {
  id: string | number;
  name: string;
  description: string;
  category: string;
  image: string;
  categoryName: string;
  categoryIcon?: string;
}
export interface Category {
  id: string;
  name: string;
  image: string;
  imageCarousell?: string;
  products: Product[];
}
