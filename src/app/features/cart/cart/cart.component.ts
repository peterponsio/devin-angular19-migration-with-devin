import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Cart } from '../../../models/cart.model';
import { CartService } from '../../../core/services/cart.service';

/**
 * CartComponent — Angular 19 (MIGRAR en Angular 21)
 *
 * PROBLEMAS:
 *   1. Declarado en CartModule (no standalone)
 *   2. Template usa *ngFor y *ngIf + async pipe
 *   3. Suscripción manual con takeUntil
 *
 * OBJETIVOS DE MIGRACIÓN (Angular 21):
 *   1. standalone: true
 *   2. Usar toSignal(cartService.cart$) para acceder al estado
 *   3. *ngFor → @for, *ngIf → @if en el template
 *   4. Eliminar el patrón takeUntil/destroy$
 */
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  standalone: false
})
export class CartComponent implements OnInit, OnDestroy {
  cart: Cart | null = null;
  private destroy$ = new Subject<void>(); // MIGRAR → eliminar con toSignal()

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // Suscripción explícita — MIGRAR → toSignal()
    this.cartService.cart$
      .pipe(takeUntil(this.destroy$))
      .subscribe(cart => (this.cart = cart));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  removeItem(productId: number): void {
    this.cartService.removeItem(productId);
  }

  updateQuantity(productId: number, event: Event): void {
    const qty = Number((event.target as HTMLInputElement).value);
    this.cartService.updateQuantity(productId, qty);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }

  trackByProductId(_index: number, item: any): number {
    return item.product.id;
  }
}
