import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    HttpClientModule
  ]
})
export class CoreModule { }