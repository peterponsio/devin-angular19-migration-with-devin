import { Component, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

/**
 * NotificationComponent — Angular 19 (MIGRAR → standalone + @switch en Angular 21)
 *
 * PROBLEMA 1 (estructura): Declarado en SharedModule, no es standalone.
 * PROBLEMA 2 (template): Usa *ngSwitch / *ngSwitchCase para determinar el icono.
 *
 * OBJETIVO DE MIGRACIÓN (Angular 21):
 *   1. standalone: true
 *   2. Reemplazar *ngSwitch por @switch en el template
 *
 *   @switch (type) {
 *     @case ('success') { <span>✅</span> }
 *     @case ('error')   { <span>❌</span> }
 *     @case ('warning') { <span>⚠️</span> }
 *     @default          { <span>ℹ️</span> }
 *   }
 */
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  standalone: false
})
export class NotificationComponent implements OnChanges, OnDestroy {
  @Input() message = '';
  @Input() type: NotificationType = 'info';
  @Input() duration = 3000; // ms, 0 = permanente

  visible = false;
  private timer: ReturnType<typeof setTimeout> | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message'] && this.message) {
      this.show();
    }
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

  show(): void {
    this.visible = true;
    this.clearTimer();
    if (this.duration > 0) {
      this.timer = setTimeout(() => (this.visible = false), this.duration);
    }
  }

  dismiss(): void {
    this.visible = false;
    this.clearTimer();
  }

  private clearTimer(): void {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
}
