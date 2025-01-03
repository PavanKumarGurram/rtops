import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private api: ApiService) {}

  getProducts(): Observable<Product[]> {
    return this.api.get<Product[]>('/products');
  }

  getProduct(id: string): Observable<Product> {
    return this.api.get<Product>(`/products/${id}`);
  }

  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    return this.api.put<Product>(`/products/${id}`, product);
  }
}