import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductCreationComponent } from './admin/product-creation/product-creation.component';
import { ProductEditionComponent } from './admin/product-edition/product-edition.component';
import { ProductListComponent } from './admin/product-list/product-list.component';
import { ProductListHomeComponent } from './public/product-list-home/product-list-home.component';
import { ProductDetailsComponent } from './public/product-details/product-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [ProductCreationComponent, ProductEditionComponent, ProductListComponent, ProductListHomeComponent, ProductDetailsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule, 
    NgxSpinnerModule
  ]
})
export class ProductsModule { }
