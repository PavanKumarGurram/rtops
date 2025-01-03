import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';
import { NgChartsModule } from 'ng2-charts';

import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { InventoryManagerComponent } from './components/inventory-manager/inventory-manager.component';
import { SalesChartComponent } from './components/sales-chart/sales-chart.component';

import { adminRoutes } from './admin.routes';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    InventoryManagerComponent,
    SalesChartComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(adminRoutes),
    MaterialModule,
    SharedModule,
    NgChartsModule
  ]
})
export class AdminModule { }