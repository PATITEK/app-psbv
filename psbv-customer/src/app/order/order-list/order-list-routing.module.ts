import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderListPage } from './order-list.page';

const routes: Routes = [
  {
    path: '',
    component: OrderListPage
  },  {
    path: 'order-status',
    loadChildren: () => import('./order-status/order-status.module').then( m => m.OrderStatusPageModule)
  },
  {
    path: 'shipping',
    loadChildren: () => import('./shipping/shipping.module').then( m => m.ShippingPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderListPageRoutingModule {}
