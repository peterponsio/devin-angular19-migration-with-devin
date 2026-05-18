import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cart, CartItem } from '../../models/cart.model';
import { Product } from '../../models/product.model';

/**
 * CartService — Angular 19 (patrón a MIGRAR en Angular 21)
 *
 * PROBLEMA:
 *   Usa BehaviorSubject + Observable para gestionar el estado del carrito.
 *   Requiere subscribe() y async pipe en los templates.
 *   Cada componente que consuma el estado debe manejar suscripciones.
 *
 * OBJETIVO DE MIGRACIÓN (Angular 21):
 *   - Reemplazar BehaviorSubject<Cart> con signal<Cart>()
 *   - Reemplazar computed observables con computed()
 *   - Eliminar .pipe(map(...)) y usar computed() directamente
 *   - Los templates acceden a cart() en lugar de cart$ | async
 *
 * Ejemplo de migración (NO aplicar todavía — es el ejercicio):
 *
 *   private cartSignal = signal<Cart>(EMPTY_CART);
 *   readonly cart      = this.cartSignal.asReadonly();
 *   readonly totalItems = computed(() => this.cartSignal().totalItems);
 *   readonly totalPrice = computed(() => this.cartSignal().totalPrice);
 */

const EMPTY_CART: Cart = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // ── Estado reactivo con BehaviorSubject (MIGRAR → signal) ──────────────────
  private cartSubject = new BehaviorSubject<Cart>(EMPTY_CART);

  // Observables públicos (MIGRAR → computed())
  readonly cart$: Observable<Cart> = this.cartSubject.asObservable();

  readonly totalItems$: Observable<number> = this.cart$.pipe(
    map(cart => cart.totalItems)
  );

  readonly totalPrice$: Observable<number> = this.cart$.pipe(
    map(cart => cart.totalPrice)
  );

  // ── Métodos de mutación ────────────────────────────────────────────────────

  addItem(product: Product, quantity: number = 1): void {
    const current = this.cartSubject.getValue();
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

    this.cartSubject.next(this.recalculate(newItems));
  }

  removeItem(productId: number): void {
    const current = this.cartSubject.getValue();
    const newItems = current.items.filter(
      item => item.product.id !== productId
    );
    this.cartSubject.next(this.recalculate(newItems));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    const current = this.cartSubject.getValue();
    const newItems = current.items.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    this.cartSubject.next(this.recalculate(newItems));
  }

  clearCart(): void {
    this.cartSubject.next(EMPTY_CART);
  }

  // ── Helpers privados ───────────────────────────────────────────────────────

  private recalculate(items: CartItem[]): Cart {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    return { items, totalItems, totalPrice };
  }
}
