import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NotificationComponent } from './components/notification/notification.component';
import { CurrencyEurPipe } from './pipes/currency-eur.pipe';

/**
 * SharedModule — Angular 19 (ELIMINAR en Angular 21)
 *
 * Patrón clásico: módulo que agrupa componentes, directivas y pipes
 * reutilizables. Se importa en cada FeatureModule que los necesite.
 *
 * PROBLEMA:
 *   - Obliga a importar el módulo completo aunque solo se use un componente.
 *   - Crea acoplamiento entre features a través del módulo compartido.
 *   - Dificulta el tree-shaking.
 *
 * OBJETIVO DE MIGRACIÓN (Angular 21):
 *   - Eliminar SharedModule.
 *   - Hacer cada componente/pipe standalone: true.
 *   - Cada componente importa directamente lo que necesita:
 *
 *     @Component({
 *       standalone: true,
 *       imports: [CommonModule, CurrencyEurPipe, LoadingSpinnerComponent],
 *       ...
 *     })
 */
@NgModule({
  declarations: [
    LoadingSpinnerComponent,  // MIGRAR → standalone: true
    NotificationComponent,    // MIGRAR → standalone: true + @switch
    CurrencyEurPipe,          // MIGRAR → standalone: true
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    // Componentes y pipes reutilizables
    LoadingSpinnerComponent,
    NotificationComponent,
    CurrencyEurPipe,
    // Módulos Angular reutilizables
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule {}
