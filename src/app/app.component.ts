import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { CartService } from './core/services/cart.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Softtek Shop';

  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);

  readonly user = this.authService.user;
  readonly totalItems = this.cartService.totalItems;

  ngOnInit(): void {
    this.authService.loadSession();
  }

  logout(): void {
    this.authService.logout();
  }
}
