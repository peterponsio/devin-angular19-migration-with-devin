import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { NotificationType, NotificationComponent } from '../../../shared/components/notification/notification.component';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { CurrencyEurPipe } from '../../../shared/pipes/currency-eur.pipe';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FormsModule, RouterModule, NotificationComponent, LoadingSpinnerComponent, CurrencyEurPipe],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  isLoading = false;
  searchTerm = '';
  selectedCategory = '';
  errorMessage = '';

  notificationMessage = '';
  notificationType: NotificationType = 'success';

  private destroy$ = new Subject<void>();

  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

  readonly categories = [
    { value: '', label: 'Todas' },
    { value: 'electronica', label: 'Electrónica' },
    { value: 'ropa', label: 'Ropa' },
    { value: 'hogar', label: 'Hogar' },
    { value: 'deporte', label: 'Deporte' },
    { value: 'libros', label: 'Libros' },
  ];

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.productService
      .getProducts({
        search: this.searchTerm || undefined,
        category: this.selectedCategory as any || undefined,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (products) => {
          this.products = products;
          this.isLoading = false;
        },
        error: () => {
          this.errorMessage = 'Error al cargar productos. Inténtalo de nuevo.';
          this.isLoading = false;
        },
      });
  }

  onSearch(): void {
    this.loadProducts();
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.loadProducts();
  }

  addToCart(product: Product): void {
    if (product.stock === 0) return;

    this.cartService.addItem(product, 1);
    this.notificationMessage = `"${product.name}" añadido al carrito`;
    this.notificationType = 'success';
  }
}
