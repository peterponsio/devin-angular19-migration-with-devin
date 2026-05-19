import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyEur',
  standalone: true,
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
