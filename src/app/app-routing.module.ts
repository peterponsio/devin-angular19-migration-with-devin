import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/**
 * AppRoutingModule — Angular 19 (MIGRAR en Angular 21)
 *
 * Configuración de rutas mediante RouterModule.forRoot().
 * Las feature modules se cargan con lazy loading via loadChildren.
 *
 * OBJETIVO DE MIGRACIÓN (Angular 21):
 *   - Eliminar este módulo.
 *   - Crear src/app/app.routes.ts con un array Routes exportado.
 *   - En main.ts usar provideRouter(routes):
 *
 *   // app.routes.ts
 *   export const routes: Routes = [
 *     { path: '', redirectTo: '/products', pathMatch: 'full' },
 *     {
 *       path: 'products',
 *       loadChildren: () =>
 *         import('./features/products/products.routes')
 *           .then(m => m.productsRoutes)
 *     },
 *     ...
 *   ];
 *
 *   // main.ts
 *   bootstrapApplication(AppComponent, {
 *     providers: [provideRouter(routes)]
 *   });
 */
const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./features/products/products.module').then(
        m => m.ProductsModule
      ),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./features/cart/cart.module').then(m => m.CartModule),
  },
  {
    path: '**',
    redirectTo: '/products',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
