import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { Order } from '../../../../models/order.model';

@Component({
  selector: 'app-sales-chart',
  template: `
    <div class="chart-container">
      <canvas baseChart
        [data]="chartData"
        [options]="chartOptions"
        [type]="'line'">
      </canvas>
    </div>
  `,
  styles: [`
    .chart-container {
      height: 300px;
      margin: 20px 0;
    }
  `]
})
export class SalesChartComponent implements OnChanges {
  @Input() orders: Order[] = [];

  chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Daily Sales',
      fill: false,
      tension: 0.1,
      borderColor: 'rgb(75, 192, 192)',
      backgroundColor: 'rgba(75, 192, 192, 0.5)'
    }]
  };

  chartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['orders']) {
      this.updateChart();
    }
  }

  private updateChart() {
    const dailySales = this.calculateDailySales();
    
    this.chartData.labels = Array.from(dailySales.keys());
    this.chartData.datasets[0].data = Array.from(dailySales.values());
  }

  private calculateDailySales(): Map<string, number> {
    const salesMap = new Map<string, number>();
    
    this.orders.forEach(order => {
      const date = new Date(order.createdAt).toLocaleDateString();
      salesMap.set(date, (salesMap.get(date) || 0) + order.totalAmount);
    });

    return new Map([...salesMap.entries()].sort());
  }
}