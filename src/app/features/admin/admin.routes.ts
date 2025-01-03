import { Routes } from '@angular/router';
import { AdminDashboardComponent } from './dashboard/dashboard.component';
import { InventoryManagerComponent } from './components/inventory-manager/inventory-manager.component';

export const adminRoutes: Routes = [
  { path: '', component: AdminDashboardComponent },
  { path: 'inventory', component: InventoryManagerComponent }
];