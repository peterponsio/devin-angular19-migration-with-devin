import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

/**
 * AuthService — Angular 19 (patrón a MIGRAR en Angular 21)
 *
 * PROBLEMA:
 *   Usa BehaviorSubject para el estado de autenticación.
 *   Expone Observables que los consumidores deben suscribir.
 *
 * OBJETIVO DE MIGRACIÓN (Angular 21):
 *   - private userSignal = signal<User | null>(null)
 *   - readonly user      = this.userSignal.asReadonly()
 *   - readonly isLoggedIn = computed(() => this.userSignal() !== null)
 *   - readonly userName   = computed(() => this.userSignal()?.name ?? '')
 */

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // ── Estado reactivo con BehaviorSubject (MIGRAR → signal) ──────────────────
  private userSubject = new BehaviorSubject<User | null>(null);

  // Observables públicos (MIGRAR → computed())
  readonly user$: Observable<User | null> = this.userSubject.asObservable();

  readonly isLoggedIn$: Observable<boolean> = new BehaviorSubject<boolean>(
    false
  );

  get isLoggedIn(): boolean {
    return this.userSubject.getValue() !== null;
  }

  get currentUser(): User | null {
    return this.userSubject.getValue();
  }

  // ── Métodos de autenticación ───────────────────────────────────────────────

  login(credentials: LoginCredentials): Observable<User> {
    // Mock: cualquier email/password funciona para pruebas
    const mockUser: User = {
      id: 1,
      name: credentials.email.split('@')[0],
      email: credentials.email,
      role: credentials.email.includes('admin') ? 'admin' : 'customer',
    };

    return of(mockUser).pipe(
      delay(500),
      tap(user => this.userSubject.next(user))
    );
  }

  logout(): void {
    this.userSubject.next(null);
  }

  // Simula carga de sesión desde localStorage
  loadSession(): void {
    const savedUser = localStorage.getItem('softtek_user');
    if (savedUser) {
      try {
        this.userSubject.next(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('softtek_user');
      }
    }
  }
}
