import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../core/services/order.service';
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-admin-dashboard',
  template: `
    <div class="dashboard-container">
      <mat-card>
        <mat-card-title>Orders Overview</mat-card-title>
        <mat-card-content>
          <app-orders-chart [orders]="recentOrders"></app-orders-chart>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-title>Recent Orders</mat-card-title>
        <mat-card-content>
          <app-orders-table [orders]="recentOrders"></app-orders-table>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .dashboard-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      padding: 20px;
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  recentOrders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadRecentOrders();
  }

  private loadRecentOrders() {
    this.orderService.getOrders().subscribe(
      orders => this.recentOrders = orders,
      error => console.error('Error loading orders:', error)
    );
  }
}