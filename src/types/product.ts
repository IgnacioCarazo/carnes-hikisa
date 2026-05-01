export interface Product {
  id: string | number;
  name: string;
  description: string;
  category: string;
  image: string;
  categoryName: string; 
  categoryIcon?: string; 
}
export interface Product {
  id: string | number;
  name: string;
  description: string;
  category: string;
  image: string;
  categoryName: string; 
}

export interface Category {
  id: string;
  name: string;
  image: string;
  "image-white"?: string;
  products: Omit<Product, "categoryName">[]; 
}