import { Component } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-cart',
  template: `
    <div class="cart-container">
      <h2>Shopping Cart</h2>
      
      <div *ngIf="items.length === 0" class="empty-cart">
        Your cart is empty
      </div>

      <mat-list *ngIf="items.length > 0">
        <mat-list-item *ngFor="let item of items">
          <img matListAvatar [src]="item.product.imageUrl" [alt]="item.product.name">
          <h3 matLine>{{item.product.name}}</h3>
          <p matLine>
            {{item.quantity}} x {{item.product.price | currency}}
            = {{item.quantity * item.product.price | currency}}
          </p>
          <button mat-icon-button (click)="removeItem(item.product)">
            <mat-icon>delete</mat-icon>
          </button>
        </mat-list-item>
      </mat-list>

      <div class="cart-summary" *ngIf="items.length > 0">
        <h3>Total: {{total | currency}}</h3>
        <button mat-raised-button color="primary" (click)="checkout()">
          Proceed to Checkout
        </button>
      </div>
    </div>
  `,
  styles: [`
    .cart-container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .empty-cart {
      text-align: center;
      padding: 40px;
      color: #666;
    }
    .cart-summary {
      margin-top: 20px;
      text-align: right;
    }
  `]
})
export class CartComponent {
  constructor(private cartService: CartService) {}

  get items() {
    return this.cartService.getItems();
  }

  get total() {
    return this.cartService.getTotal();
  }

  removeItem(product: Product) {
    this.cartService.removeItem(product);
  }

  checkout() {
    // Implement checkout logic
  }
}