import { Component, OnInit } from '@angular/core';
import { AuthService, User } from './core/services/auth.service';
import { CartService } from './core/services/cart.service';
import { Observable } from 'rxjs';

/**
 * AppComponent — Angular 19 (MIGRAR en Angular 21)
 *
 * PROBLEMAS:
 *   1. Declarado en AppModule (no standalone)
 *   2. Template usa *ngIf para mostrar/ocultar navbar elements
 *   3. Consume Observables con async pipe
 *
 * OBJETIVOS DE MIGRACIÓN (Angular 21):
 *   1. standalone: true
 *   2. *ngIf → @if en el template
 *   3. Usar toSignal() para user$ y totalItems$
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false
})
export class AppComponent implements OnInit {
  title = 'Softtek Shop';

  // Observables — MIGRAR → toSignal(authService.user$)
  user$: Observable<User | null>;
  totalItems$: Observable<number>;

  constructor(
    private authService: AuthService,
    private cartService: CartService
  ) {
    this.user$ = this.authService.user$;
    this.totalItems$ = this.cartService.totalItems$;
  }

  ngOnInit(): void {
    this.authService.loadSession();
  }

  logout(): void {
    this.authService.logout();
  }
}
