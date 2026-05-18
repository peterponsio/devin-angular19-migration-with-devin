import { Pipe, PipeTransform } from '@angular/core';

/**
 * CurrencyEurPipe — Formatea un número como precio en euros.
 *
 * Uso en template: {{ product.price | currencyEur }}
 * Resultado:       "1.299,99 €"
 *
 * Este pipe NO necesita migración de estructura en Angular 21,
 * pero sí debe ser standalone para usarse sin SharedModule.
 *
 * OBJETIVO DE MIGRACIÓN (Angular 21):
 *   Añadir standalone: true y eliminar de SharedModule:
 *
 *   @Pipe({ name: 'currencyEur', standalone: true })
 *   export class CurrencyEurPipe implements PipeTransform { ... }
 */
@Pipe({
  name: 'currencyEur',
  standalone: false
})
export class CurrencyEurPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined) return '—';

    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }
}
