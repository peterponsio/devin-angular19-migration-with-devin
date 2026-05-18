export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string;
  rating: number;
  reviews: number;
}

export type ProductCategory = 'electronica' | 'ropa' | 'hogar' | 'deporte' | 'libros';

export interface ProductFilter {
  category?: ProductCategory;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}
