import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Product } from '../../../models/product.model';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { CurrencyEurPipe } from '../../../shared/pipes/currency-eur.pipe';

type StockStatus = 'available' | 'low' | 'out';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [FormsModule, RouterModule, LoadingSpinnerComponent, CurrencyEurPipe],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  product: Product | null = null;
  isLoading = true;
  notFound = false;
  quantity = 1;
  addedToCart = false;

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);
  private readonly cartService = inject(CartService);

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
