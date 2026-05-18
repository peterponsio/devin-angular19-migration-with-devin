import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * LoadingSpinnerComponent — Angular 19 (MIGRAR → standalone en Angular 21)
 *
 * OBJETIVO DE MIGRACIÓN:
 *   @Component({ standalone: true, imports: [CommonModule], ... })
 *   Eliminar de SharedModule.declarations y SharedModule.exports
 */
@Component({
  selector: 'app-loading-spinner',
  template: `
    <div class="spinner-overlay" *ngIf="visible">
      <div class="spinner"></div>
      <p *ngIf="message" class="spinner-message">{{ message }}</p>
    </div>
  `,
  styles: [`
    .spinner-message {
      margin-top: 1rem;
      color: #1A4A8C;
      font-weight: 600;
    }
  `],
  standalone: false
})
export class LoadingSpinnerComponent {
  @Input() visible = false;
  @Input() message = '';
}
