import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService, User } from './core/services/auth.service';
import { CartService } from './core/services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Softtek Shop';

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
