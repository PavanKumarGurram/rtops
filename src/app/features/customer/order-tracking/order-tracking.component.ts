import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../core/services/order.service';
import { WebSocketService } from '../../../core/services/websocket.service';
import { Order, OrderStatus } from '../../../models/order.model';

@Component({
  selector: 'app-order-tracking',
  template: `
    <div class="container" *ngIf="order">
      <mat-card>
        <mat-card-title>Order #{{order.id}}</mat-card-title>
        <mat-card-content>
          <div class="tracking-status">
            <mat-horizontal-stepper [selectedIndex]="getStatusIndex()">
              <mat-step>
                <ng-template matStepLabel>Order Placed</ng-template>
                <p *ngIf="order.status === 'PENDING'">Processing your order...</p>
              </mat-step>
              <mat-step>
                <ng-template matStepLabel>Confirmed</ng-template>
                <p *ngIf="order.status === 'CONFIRMED'">Order has been confirmed!</p>
              </mat-step>
              <mat-step>
                <ng-template matStepLabel>Shipped</ng-template>
                <p *ngIf="order.status === 'SHIPPED'">Your order is on its way!</p>
              </mat-step>
              <mat-step>
                <ng-template matStepLabel>Delivered</ng-template>
                <p *ngIf="order.status === 'DELIVERED'">Order has been delivered!</p>
              </mat-step>
            </mat-horizontal-stepper>
          </div>

          <div class="order-details">
            <h3>Order Items</h3>
            <mat-list>
              <mat-list-item *ngFor="let item of order.items">
                <span>{{item.productName}}</span>
                <span class="spacer"></span>
                <span>{{item.quantity}} x {{item.price | currency}}</span>
              </mat-list-item>
            </mat-list>

            <div class="total">
              <h3>Total: {{order.totalAmount | currency}}</h3>
            </div>
          </div>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      max-width: 800px;
      margin: 0 auto;
    }
    .tracking-status {
      margin: 20px 0;
    }
    .order-details {
      margin-top: 30px;
    }
    .spacer {
      flex: 1;
    }
    .total {
      margin-top: 20px;
      text-align: right;
    }
  `]
})
export class OrderTrackingComponent implements OnInit {
  order: Order | null = null;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private wsService: WebSocketService
  ) {}

  ngOnInit() {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.loadOrder(orderId);
      this.setupWebSocket(orderId);
    }
  }

  private loadOrder(orderId: string) {
    this.orderService.getOrder(orderId).subscribe(
      order => this.order = order,
      error => console.error('Error loading order:', error)
    );
  }

  private setupWebSocket(orderId: string) {
    this.wsService.connect(environment.wsUrl);
    this.wsService.onMessage().subscribe(message => {
      if (message.type === 'ORDER_UPDATE' && message.orderId === orderId) {
        this.order = { ...this.order, ...message.updates };
      }
    });
  }

  getStatusIndex(): number {
    if (!this.order) return 0;
    const statusMap: Record<OrderStatus, number> = {
      'PENDING': 0,
      'CONFIRMED': 1,
      'SHIPPED': 2,
      'DELIVERED': 3,
      'CANCELLED': 0
    };
    return statusMap[this.order.status];
  }
}