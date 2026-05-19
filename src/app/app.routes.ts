import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/products/product-list/product-list.component').then(
            m => m.ProductListComponent
          ),
      },
      {
        path: ':id',
        loadComponent: () =>
          import('./features/products/product-detail/product-detail.component').then(
            m => m.ProductDetailComponent
          ),
      },
    ],
  },
  {
    path: 'cart',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/cart/cart/cart.component').then(
            m => m.CartComponent
          ),
      },
      {
        path: 'checkout',
        loadComponent: () =>
          import('./features/cart/checkout/checkout.component').then(
            m => m.CheckoutComponent
          ),
        canActivate: [authGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/products',
  },
];
