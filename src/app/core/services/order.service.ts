import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Order, OrderStatus } from '../../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private api: ApiService) {}

  getOrders(): Observable<Order[]> {
    return this.api.get<Order[]>('/orders');
  }

  getOrder(id: string): Observable<Order> {
    return this.api.get<Order>(`/orders/${id}`);
  }

  createOrder(order: Partial<Order>): Observable<Order> {
    return this.api.post<Order>('/orders', order);
  }

  updateOrderStatus(id: string, status: OrderStatus): Observable<Order> {
    return this.api.put<Order>(`/orders/${id}/status`, { status });
  }
}