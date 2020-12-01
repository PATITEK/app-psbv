import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderStatusPage } from './order-status.page';

const routes: Routes = [
  {
    path: '',
    component: OrderStatusPage
  },
  {
    path: 'order-status-detail',
    loadChildren: () => import('./order-status-detail/order-status-detail.module').then( m => m.OrderStatusDetailPageModule)
  },
  {
    path: 'shipping',
    loadChildren: () => import('./shipping/shipping.module').then( m => m.ShippingPageModule)
  },
  {
    path: 'detail-order',
    loadChildren: () => import('./detail-order/detail-order.module').then( m => m.DetailOrderPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderStatusPageRoutingModule {}
