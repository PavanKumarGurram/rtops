import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { WebSocketService } from '../../../core/services/websocket.service';
import { Product } from '../../../models/product.model';

@Component({
  selector: 'app-product-list',
  template: `
    <div class="container">
      <h1>Products</h1>
      
      <div class="product-grid">
        <mat-card *ngFor="let product of products" class="product-card">
          <img mat-card-image [src]="product.imageUrl" [alt]="product.name">
          <mat-card-content>
            <h2>{{product.name}}</h2>
            <p>{{product.description}}</p>
            <div class="price-stock">
              <span class="price">{{product.price | currency}}</span>
              <span class="stock" [class.low-stock]="product.stockQuantity < 10">
                {{product.stockQuantity}} in stock
              </span>
            </div>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" 
                    [disabled]="product.stockQuantity === 0"
                    (click)="addToCart(product)">
              Add to Cart
            </button>
            <button mat-button [routerLink]="['/product', product.id]">
              Details
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
      padding: 20px 0;
    }
    .product-card {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .price-stock {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 10px;
    }
    .price {
      font-size: 1.2em;
      font-weight: bold;
      color: #2196F3;
    }
    .stock {
      font-size: 0.9em;
      color: #4CAF50;
    }
    .low-stock {
      color: #f44336;
    }
    mat-card-actions {
      margin-top: auto;
      padding: 16px;
    }
  `]
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private wsService: WebSocketService
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.setupWebSocket();
  }

  private loadProducts() {
    this.productService.getProducts().subscribe(
      products => this.products = products,
      error => console.error('Error loading products:', error)
    );
  }

  private setupWebSocket() {
    this.wsService.connect(environment.wsUrl);
    this.wsService.onMessage().subscribe(message => {
      if (message.type === 'INVENTORY_UPDATE') {
        this.updateProductStock(message.productId, message.newQuantity);
      }
    });
  }

  private updateProductStock(productId: string, newQuantity: number) {
    const product = this.products.find(p => p.id === productId);
    if (product) {
      product.stockQuantity = newQuantity;
    }
  }

  addToCart(product: Product) {
    // Implementation will be added in the cart service
  }
}