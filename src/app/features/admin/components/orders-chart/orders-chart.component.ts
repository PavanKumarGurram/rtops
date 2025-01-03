import { Component, Input, OnChanges } from '@angular/core';
import { Order } from '../../../../models/order.model';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-orders-chart',
  template: `
    <canvas #chartCanvas></canvas>
  `
})
export class OrdersChartComponent implements OnChanges {
  @Input() orders: Order[] = [];

  ngOnChanges() {
    this.updateChart();
  }

  private updateChart() {
    // Implementation of chart update logic using Chart.js
  }
}