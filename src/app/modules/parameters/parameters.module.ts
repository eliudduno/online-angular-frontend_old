import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametersRoutingModule } from './parameters-routing.module';
import { BrandCreationComponent } from './brand/brand-creation/brand-creation.component';
import { BrandListComponent } from './brand/brand-list/brand-list.component';
import { BrandEditionComponent } from './brand/brand-edition/brand-edition.component';
import { CategoryCreationComponent } from './category/category-creation/category-creation.component';
import { CategoryEditionComponent } from './category/category-edition/category-edition.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryRemoveComponent } from './category/category-remove/category-remove.component';


@NgModule({
  declarations: [
    CategoryCreationComponent,
    CategoryEditionComponent,
    CategoryListComponent,
    CategoryRemoveComponent,
    BrandCreationComponent,
    BrandListComponent,
    BrandEditionComponent],
  imports: [
    CommonModule,
    ParametersRoutingModule
  ]
})
export class ParametersModule { }
