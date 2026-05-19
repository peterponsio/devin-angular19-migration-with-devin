import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    @if (visible) {
      <div class="spinner-overlay">
        <div class="spinner"></div>
        @if (message) {
          <p class="spinner-message">{{ message }}</p>
        }
      </div>
    }
  `,
  styles: [`
    .spinner-message {
      margin-top: 1rem;
      color: #1A4A8C;
      font-weight: 600;
    }
  `],
})
export class LoadingSpinnerComponent {
  @Input() visible = false;
  @Input() message = '';
}
