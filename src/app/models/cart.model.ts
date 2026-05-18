import { Product } from './product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  customerName: string;
  customerEmail: string;
  address: string;
  createdAt: Date;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
}
