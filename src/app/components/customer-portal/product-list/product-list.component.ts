import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-list',
  template: `
    <div class="product-grid">
      <mat-card *ngFor="let product of products" class="product-card">
        <mat-card-header>
          <mat-card-title>{{product.name}}</mat-card-title>
        </mat-card-header>
        <img mat-card-image [src]="product.imageUrl" [alt]="product.name">
        <mat-card-content>
          <p>{{product.description}}</p>
          <p class="price">{{product.price | currency}}</p>
          <p class="stock" [class.low-stock]="product.stockQuantity < 10">
            Stock: {{product.stockQuantity}}
          </p>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="addToCart(product)">
            Add to Cart
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      padding: 20px;
    }
    .product-card {
      max-width: 300px;
    }
    .low-stock {
      color: red;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  ngOnInit() {
    // TODO: Implement product loading
  }

  addToCart(product: Product) {
    // TODO: Implement add to cart
  }
}