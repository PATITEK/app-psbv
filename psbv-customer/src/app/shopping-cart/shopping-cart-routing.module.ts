import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingCartComponent } from './shopping-cart.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingCartComponent,
  },  {
    path: 'cart-detail',
    loadChildren: () => import('./cart-detail/cart-detail.module').then( m => m.CartDetailPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingCartRoutingModule { }
