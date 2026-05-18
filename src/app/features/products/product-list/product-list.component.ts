import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { NotificationType } from '../../../shared/components/notification/notification.component';

/**
 * ProductListComponent — Angular 19 (MIGRAR en Angular 21)
 *
 * PROBLEMAS:
 *   1. Declarado en ProductsModule (no standalone)
 *   2. Template usa *ngFor y *ngIf (directivas estructurales v1)
 *   3. Gestión manual de suscripciones con takeUntil/Subject
 *
 * OBJETIVOS DE MIGRACIÓN (Angular 21):
 *   1. standalone: true
 *   2. Reemplazar *ngFor → @for, *ngIf → @if en el template
 *   3. Usar toSignal() para convertir Observables a señales
 *      y eliminar el patrón takeUntil
 */
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  standalone: false
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  isLoading = false;
  searchTerm = '';
  selectedCategory = '';
  errorMessage = '';

  notificationMessage = '';
  notificationType: NotificationType = 'success';

  private destroy$ = new Subject<void>(); // MIGRAR → eliminar con toSignal()

  readonly categories = [
    { value: '', label: 'Todas' },
    { value: 'electronica', label: 'Electrónica' },
    { value: 'ropa', label: 'Ropa' },
    { value: 'hogar', label: 'Hogar' },
    { value: 'deporte', label: 'Deporte' },
    { value: 'libros', label: 'Libros' },
  ];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

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
        error: (err) => {
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

  trackByProductId(index: number, product: Product): number {
    return product.id;
  }
}
