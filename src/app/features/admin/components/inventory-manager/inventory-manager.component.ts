import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../core/services/product.service';
import { WebSocketService } from '../../../../core/services/websocket.service';
import { Product } from '../../../../models/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inventory-manager',
  template: `
    <div class="container">
      <h1>Inventory Management</h1>

      <mat-form-field>
        <mat-label>Filter</mat-label>
        <input matInput (keyup)="applyFilter($event)" placeholder="Search products...">
      </mat-form-field>

      <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef> Name </th>
          <td mat-cell *matCellDef="let product"> {{product.name}} </td>
        </ng-container>

        <ng-container matColumnDef="price">
          <th mat-header-cell *matHeaderCellDef> Price </th>
          <td mat-cell *matCellDef="let product"> {{product.price | currency}} </td>
        </ng-container>

        <ng-container matColumnDef="stockQuantity">
          <th mat-header-cell *matHeaderCellDef> Stock </th>
          <td mat-cell *matCellDef="let product"> 
            <mat-form-field class="stock-input">
              <input matInput type="number" [(ngModel)]="product.stockQuantity"
                     (blur)="updateStock(product)">
            </mat-form-field>
          </td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef> Status </th>
          <td mat-cell *matCellDef="let product">
            <mat-chip-list>
              <mat-chip [color]="getStockStatusColor(product.stockQuantity)" selected>
                {{getStockStatus(product.stockQuantity)}}
              </mat-chip>
            </mat-chip-list>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
    }
    .mat-form-field {
      width: 100%;
      margin-bottom: 20px;
    }
    .stock-input {
      width: 100px;
    }
    table {
      width: 100%;
    }
  `]
})
export class InventoryManagerComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'stockQuantity', 'status'];
  dataSource: MatTableDataSource<Product>;
  
  constructor(
    private productService: ProductService,
    private wsService: WebSocketService,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.loadProducts();
    this.setupWebSocket();
  }

  private loadProducts() {
    this.productService.getProducts().subscribe(
      products => this.dataSource.data = products,
      error => this.showError('Error loading products')
    );
  }

  private setupWebSocket() {
    this.wsService.connect(environment.wsUrl);
    this.wsService.onMessage().subscribe(message => {
      if (message.type === 'INVENTORY_UPDATE') {
        this.updateProductInTable(message.productId, message.newQuantity);
      }
    });
  }

  updateStock(product: Product) {
    this.productService.updateProduct(product.id, {
      stockQuantity: product.stockQuantity
    }).subscribe(
      () => this.showSuccess('Stock updated successfully'),
      error => this.showError('Error updating stock')
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getStockStatus(quantity: number): string {
    if (quantity === 0) return 'Out of Stock';
    if (quantity < 10) return 'Low Stock';
    return 'In Stock';
  }

  getStockStatusColor(quantity: number): string {
    if (quantity === 0) return 'warn';
    if (quantity < 10) return 'accent';
    return 'primary';
  }

  private updateProductInTable(productId: string, newQuantity: number) {
    const data = this.dataSource.data;
    const index = data.findIndex(p => p.id === productId);
    if (index !== -1) {
      data[index].stockQuantity = newQuantity;
      this.dataSource.data = [...data];
    }
  }

  private showSuccess(message: string) {
    this.snackBar.open(message, 'Close', { duration: 3000 });
  }

  private showError(message: string) {
    this.snackBar.open(message, 'Close', { 
      duration: 5000,
      panelClass: ['error-snackbar']
    });
  }
}