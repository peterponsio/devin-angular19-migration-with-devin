import { Component, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

@Component({
  selector: 'app-notification',
  standalone: true,
  templateUrl: './notification.component.html',
})
export class NotificationComponent implements OnChanges, OnDestroy {
  @Input() message = '';
  @Input() type: NotificationType = 'info';
  @Input() duration = 3000;

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
