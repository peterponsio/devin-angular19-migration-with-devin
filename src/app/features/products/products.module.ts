import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

/**
 * ProductsModule — Angular 19 (ELIMINAR en Angular 21)
 *
 * Feature module que agrupa la funcionalidad del catálogo de productos.
 * Se carga de forma lazy desde el AppRoutingModule.
 *
 * OBJETIVO DE MIGRACIÓN (Angular 21):
 *   - Eliminar este módulo.
 *   - Convertir ProductListComponent y ProductDetailComponent en standalone.
 *   - Definir rutas directamente con loadComponent() en app.routes.ts:
 *
 *     {
 *       path: 'products',
 *       children: [
 *         {
 *           path: '',
 *           loadComponent: () =>
 *             import('./features/products/product-list/product-list.component')
 *               .then(m => m.ProductListComponent)
 *         },
 *         {
 *           path: ':id',
 *           loadComponent: () =>
 *             import('./features/products/product-detail/product-detail.component')
 *               .then(m => m.ProductDetailComponent)
 *         },
 *       ]
 *     }
 */

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: ':id', component: ProductDetailComponent },
];

@NgModule({
  declarations: [
    ProductListComponent,   // MIGRAR → standalone: true
    ProductDetailComponent, // MIGRAR → standalone: true
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ],
})
export class ProductsModule {}
