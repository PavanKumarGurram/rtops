import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { SharedModule } from '../../shared/shared.module';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { OrderTrackingComponent } from './order-tracking/order-tracking.component';

import { customerRoutes } from './customer.routes';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    CartComponent,
    OrderTrackingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(customerRoutes),
    MaterialModule,
    SharedModule
  ]
})
export class CustomerModule { }