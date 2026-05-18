import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { Cart } from '../../../models/cart.model';

type CheckoutStep = 'form' | 'confirm' | 'success';

/**
 * CheckoutComponent — Angular 19 (MIGRAR en Angular 21)
 *
 * PROBLEMAS:
 *   1. Declarado en CartModule (no standalone)
 *   2. Template usa múltiples *ngIf para gestionar pasos del wizard
 *   3. Suscripción a cart$ con subscribe()
 *
 * OBJETIVOS DE MIGRACIÓN (Angular 21):
 *   1. standalone: true
 *   2. currentStep y cart como signals
 *   3. *ngIf múltiples → @if / @else en el template
 */
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  standalone: false
})
export class CheckoutComponent implements OnInit {
  cart: Cart | null = null;
  currentStep: CheckoutStep = 'form';
  isProcessing = false;
  orderId = '';

  checkoutForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required, Validators.minLength(10)]],
      city: ['', Validators.required],
      postalCode: ['', [Validators.required, Validators.pattern(/^\d{5}$/)]],
      paymentMethod: ['card', Validators.required],
    });
  }

  ngOnInit(): void {
    // Suscripción explícita — MIGRAR → toSignal()
    this.cartService.cart$.subscribe(cart => {
      this.cart = cart;
      // Pre-rellenar email del usuario logueado
      const user = this.authService.currentUser;
      if (user) {
        this.checkoutForm.patchValue({ name: user.name, email: user.email });
      }
    });
  }

  get isCartEmpty(): boolean {
    return !this.cart || this.cart.items.length === 0;
  }

  submitOrder(): void {
    if (this.checkoutForm.invalid) return;
    this.currentStep = 'confirm';
  }

  confirmOrder(): void {
    this.isProcessing = true;

    // Simula llamada a API
    setTimeout(() => {
      this.orderId = `ORD-${Date.now()}`;
      this.cartService.clearCart();
      this.currentStep = 'success';
      this.isProcessing = false;
    }, 1500);
  }

  cancelConfirm(): void {
    this.currentStep = 'form';
  }

  continueShopping(): void {
    this.router.navigate(['/products']);
  }
}
