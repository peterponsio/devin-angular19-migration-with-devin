import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthGuard } from '../../core/guards/auth.guard';

/**
 * CartModule — Angular 19 (ELIMINAR en Angular 21)
 *
 * Feature module con lazy loading para el carrito y checkout.
 * Checkout está protegido por AuthGuard (clase).
 *
 * OBJETIVO DE MIGRACIÓN (Angular 21):
 *   - Eliminar este módulo.
 *   - CartComponent y CheckoutComponent → standalone.
 *   - Rutas con loadComponent() y authGuard funcional:
 *
 *     {
 *       path: 'cart',
 *       children: [
 *         { path: '', loadComponent: () => import('./cart/cart.component').then(m => m.CartComponent) },
 *         { path: 'checkout', loadComponent: () => import('./checkout/checkout.component').then(m => m.CheckoutComponent), canActivate: [authGuard] },
 *       ]
 *     }
 */

const routes: Routes = [
  { path: '', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    CartComponent,     // MIGRAR → standalone: true
    CheckoutComponent, // MIGRAR → standalone: true
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class CartModule {}
