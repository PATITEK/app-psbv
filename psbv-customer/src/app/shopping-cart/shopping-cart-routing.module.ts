import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingCartPage } from './shopping-cart.page';

const routes: Routes = [
  {
    path: '',
    component: ShoppingCartPage
  },  {
    path: 'cart-detail',
    loadChildren: () => import('./cart-detail/cart-detail.module').then( m => m.CartDetailPageModule)
  },
  {
    path: 'selected-products',
    loadChildren: () => import('./selected-products/selected-products.module').then( m => m.SelectedProductsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingCartPageRoutingModule {}
