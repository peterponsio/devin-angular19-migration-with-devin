import { Injectable, signal, computed } from '@angular/core';
import { Cart, CartItem } from '../../models/cart.model';
import { Product } from '../../models/product.model';

const EMPTY_CART: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly cartSignal = signal<Cart>(EMPTY_CART);

  readonly cart = this.cartSignal.asReadonly();
  readonly totalItems = computed(() => this.cartSignal().totalItems);
  readonly totalPrice = computed(() => this.cartSignal().totalPrice);

  addItem(product: Product, quantity: number = 1): void {
    const current = this.cartSignal();
    const existingIndex = current.items.findIndex(
      item => item.product.id === product.id
    );

    let newItems: CartItem[];

    if (existingIndex >= 0) {
      newItems = current.items.map((item, idx) =>
        idx === existingIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      newItems = [...current.items, { product, quantity }];
    }

    this.cartSignal.set(this.recalculate(newItems));
  }

  removeItem(productId: number): void {
    const current = this.cartSignal();
    const newItems = current.items.filter(
      item => item.product.id !== productId
    );
    this.cartSignal.set(this.recalculate(newItems));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    const current = this.cartSignal();
    const newItems = current.items.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    this.cartSignal.set(this.recalculate(newItems));
  }

  clearCart(): void {
    this.cartSignal.set(EMPTY_CART);
  }

  private recalculate(items: CartItem[]): Cart {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    return { items, totalItems, totalPrice };
  }
}
