import { Injectable, signal, computed } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

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
  private readonly userSignal = signal<User | null>(null);

  readonly user = this.userSignal.asReadonly();
  readonly isLoggedIn = computed(() => this.userSignal() !== null);
  readonly userName = computed(() => this.userSignal()?.name ?? '');

  get currentUser(): User | null {
    return this.userSignal();
  }

  login(credentials: LoginCredentials): Observable<User> {
    const mockUser: User = {
      id: 1,
      name: credentials.email.split('@')[0],
      email: credentials.email,
      role: credentials.email.includes('admin') ? 'admin' : 'customer',
    };

    return of(mockUser).pipe(
      delay(500),
      tap(user => this.userSignal.set(user))
    );
  }

  logout(): void {
    this.userSignal.set(null);
  }

  loadSession(): void {
    const savedUser = localStorage.getItem('softtek_user');
    if (savedUser) {
      try {
        this.userSignal.set(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('softtek_user');
      }
    }
  }
}
