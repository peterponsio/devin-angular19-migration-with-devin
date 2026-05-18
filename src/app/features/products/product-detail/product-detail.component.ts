import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';

type StockStatus = 'available' | 'low' | 'out';

/**
 * ProductDetailComponent — Angular 19 (MIGRAR en Angular 21)
 *
 * PROBLEMAS:
 *   1. Declarado en ProductsModule (no standalone)
 *   2. Template usa *ngIf y *ngSwitch
 *
 * OBJETIVOS DE MIGRACIÓN (Angular 21):
 *   1. standalone: true
 *   2. *ngIf   → @if
 *   3. *ngSwitch → @switch
 */
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  standalone: false
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  isLoading = true;
  notFound = false;
  quantity = 1;
  addedToCart = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const id = Number(params.get('id'));
          return this.productService.getProductById(id);
        })
      )
      .subscribe({
        next: (product) => {
          this.isLoading = false;
          if (!product) {
            this.notFound = true;
          } else {
            this.product = product;
          }
        },
        error: () => {
          this.isLoading = false;
          this.notFound = true;
        },
      });
  }

  get stockStatus(): StockStatus {
    if (!this.product) return 'out';
    if (this.product.stock === 0) return 'out';
    if (this.product.stock <= 5) return 'low';
    return 'available';
  }

  get stockLabel(): string {
    if (!this.product) return '';
    if (this.product.stock === 0) return 'Sin stock';
    if (this.product.stock <= 5) return `Solo quedan ${this.product.stock} unidades`;
    return 'En stock';
  }

  addToCart(): void {
    if (!this.product || this.product.stock === 0) return;
    this.cartService.addItem(this.product, this.quantity);
    this.addedToCart = true;
    setTimeout(() => (this.addedToCart = false), 2000);
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
