import { Component, OnInit, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { AuthService } from '../../../core/services/auth.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { CurrencyEurPipe } from '../../../shared/pipes/currency-eur.pipe';

type CheckoutStep = 'form' | 'confirm' | 'success';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, LoadingSpinnerComponent, CurrencyEurPipe],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {
  currentStep: CheckoutStep = 'form';
  isProcessing = false;
  orderId = '';

  checkoutForm: FormGroup;

  private readonly fb = inject(FormBuilder);
  private readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly cart = this.cartService.cart;

  constructor() {
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
    const user = this.authService.currentUser;
    if (user) {
      this.checkoutForm.patchValue({ name: user.name, email: user.email });
    }
  }

  get isCartEmpty(): boolean {
    return this.cart().items.length === 0;
  }

  submitOrder(): void {
    if (this.checkoutForm.invalid) return;
    this.currentStep = 'confirm';
  }

  confirmOrder(): void {
    this.isProcessing = true;

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
