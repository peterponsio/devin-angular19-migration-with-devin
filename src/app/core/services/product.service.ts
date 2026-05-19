import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product, ProductFilter } from '../../models/product.model';
import { environment } from '../../../environments/environment';

const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Laptop Pro 15"',
    description: 'Portátil de alto rendimiento con procesador Intel i7, 16GB RAM y SSD 512GB.',
    price: 1299.99,
    category: 'electronica',
    stock: 5,
    imageUrl: '',
    rating: 4.7,
    reviews: 128,
  },
  {
    id: 2,
    name: 'Auriculares Bluetooth',
    description: 'Cancelación de ruido activa, 30h de batería, sonido Hi-Fi.',
    price: 149.99,
    category: 'electronica',
    stock: 20,
    imageUrl: '',
    rating: 4.5,
    reviews: 342,
  },
  {
    id: 3,
    name: 'Zapatillas Running X1',
    description: 'Suela de carbono, cushioning premium, ideal para maratón.',
    price: 89.95,
    category: 'deporte',
    stock: 0,
    imageUrl: '',
    rating: 4.8,
    reviews: 75,
  },
  {
    id: 4,
    name: 'Clean Code - Robert C. Martin',
    description: 'El libro de referencia para escribir código limpio y mantenible.',
    price: 34.99,
    category: 'libros',
    stock: 50,
    imageUrl: '',
    rating: 4.9,
    reviews: 2100,
  },
  {
    id: 5,
    name: 'Smart TV 55" 4K',
    description: 'Panel OLED, HDR10+, 120Hz, compatible con Google TV.',
    price: 799.00,
    category: 'electronica',
    stock: 3,
    imageUrl: '',
    rating: 4.6,
    reviews: 89,
  },
  {
    id: 6,
    name: 'Camiseta Softtek',
    description: 'Camiseta corporativa 100% algodón orgánico, varios colores.',
    price: 24.99,
    category: 'ropa',
    stock: 100,
    imageUrl: '',
    rating: 4.2,
    reviews: 34,
  },
];

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly apiUrl = `${environment.apiUrl}/products`;
  private readonly http = inject(HttpClient);

  getProducts(filter?: ProductFilter): Observable<Product[]> {
    let products = [...MOCK_PRODUCTS];

    if (filter?.category) {
      products = products.filter(p => p.category === filter.category);
    }
    if (filter?.search) {
      const term = filter.search.toLowerCase();
      products = products.filter(
        p => p.name.toLowerCase().includes(term) ||
             p.description.toLowerCase().includes(term)
      );
    }
    if (filter?.minPrice !== undefined) {
      products = products.filter(p => p.price >= filter.minPrice!);
    }
    if (filter?.maxPrice !== undefined) {
      products = products.filter(p => p.price <= filter.maxPrice!);
    }

    return of(products).pipe(delay(400));
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = MOCK_PRODUCTS.find(p => p.id === id);
    return of(product).pipe(delay(300));
  }
}
