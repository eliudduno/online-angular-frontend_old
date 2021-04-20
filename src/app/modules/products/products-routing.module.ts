import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductCreationComponent } from './admin/product-creation/product-creation.component';
import { ProductEditionComponent } from './admin/product-edition/product-edition.component';
import { ProductListComponent } from './admin/product-list/product-list.component';

const routes: Routes = [
  //**Definiendo rutas */
  {
    path: 'product-list',
    component: ProductListComponent
  },
  {
    path: 'product-creation',
    component: ProductCreationComponent
  },
  {
    path: 'product-edition/:id',
    component: ProductEditionComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
