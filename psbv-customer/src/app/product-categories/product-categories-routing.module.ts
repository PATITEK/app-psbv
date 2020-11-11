<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductCategoriesPage } from './product-categories.page';

const routes: Routes = [
  {
    path: '',
    component: ProductCategoriesPage
  },  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductCategoriesPageRoutingModule {}
=======
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

<<<<<<< HEAD:psbv-customer/src/app/product-categories/products/products-routing.module.ts
import { ProductsPage } from './products.page';
=======
import { ProductCategoriesPage } from './product-categories.page';
>>>>>>> b137da8560b48fcfadbbf54f4f091a6594a76fb3:psbv-customer/src/app/product-categories/product-categories-routing.module.ts

const routes: Routes = [
  {
    path: '',
<<<<<<< HEAD:psbv-customer/src/app/product-categories/products/products-routing.module.ts
    component: ProductsPage
=======
    component: ProductCategoriesPage
>>>>>>> b137da8560b48fcfadbbf54f4f091a6594a76fb3:psbv-customer/src/app/product-categories/product-categories-routing.module.ts
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
<<<<<<< HEAD:psbv-customer/src/app/product-categories/products/products-routing.module.ts
export class ProductsPageRoutingModule {}
=======
export class ProductCategoriesPageRoutingModule {}
>>>>>>> b137da8560b48fcfadbbf54f4f091a6594a76fb3:psbv-customer/src/app/product-categories/product-categories-routing.module.ts
>>>>>>> b137da8560b48fcfadbbf54f4f091a6594a76fb3
