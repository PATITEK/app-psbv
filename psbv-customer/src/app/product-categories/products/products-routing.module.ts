import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

<<<<<<< HEAD:psbv-customer/src/app/product-categories/product-categories-routing.module.ts
import { ProductCategoriesPage } from './product-categories.page';
=======
import { ProductsPage } from './products.page';
>>>>>>> FEmimi:psbv-customer/src/app/product-categories/products/products-routing.module.ts

const routes: Routes = [
  {
    path: '',
<<<<<<< HEAD:psbv-customer/src/app/product-categories/product-categories-routing.module.ts
    component: ProductCategoriesPage
=======
    component: ProductsPage
>>>>>>> FEmimi:psbv-customer/src/app/product-categories/products/products-routing.module.ts
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
<<<<<<< HEAD:psbv-customer/src/app/product-categories/product-categories-routing.module.ts
export class ProductCategoriesPageRoutingModule {}
=======
export class ProductsPageRoutingModule {}
>>>>>>> FEmimi:psbv-customer/src/app/product-categories/products/products-routing.module.ts
