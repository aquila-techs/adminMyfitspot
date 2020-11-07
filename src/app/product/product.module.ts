import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { ProductRoutingModule } from './product-routing.module';
import { AddProductComponent } from './add-product/add-product.component';


@NgModule({
  declarations: [AddProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    NgbModule,
    PerfectScrollbarModule
  ]
})
export class ProductModule { }
