import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../../models/product.model';

interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);

  getItems(): CartItem[] {
    return this.items;
  }

  addItem(product: Product): void {
    const existingItem = this.items.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.items.push({ product, quantity: 1 });
    }
    
    this.cartSubject.next([...this.items]);
  }

  removeItem(product: Product): void {
    const index = this.items.findIndex(item => item.product.id === product.id);
    if (index > -1) {
      this.items.splice(index, 1);
      this.cartSubject.next([...this.items]);
    }
  }

  getTotal(): number {
    return this.items.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0);
  }

  clearCart(): void {
    this.items = [];
    this.cartSubject.next([]);
  }

  getCartUpdates(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }
}