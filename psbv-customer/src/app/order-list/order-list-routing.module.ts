import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderListPage } from './order-list.page';

const routes: Routes = [
  {
    path: '',
    component: OrderListPage,
  },
  {
    path: 'order-status-detail',
    loadChildren: () => import('./order-status-detail/order-status-detail.module').then( m => m.OrderStatusDetailPageModule)
  },
  {
    path: 'detail-order',
    loadChildren: () => import('./detail-order/detail-order.module').then( m => m.DetailOrderPageModule)
  },
  {
    path: 'order-detail',
    loadChildren: () => import('./order-detail/order-detail.module').then( m => m.OrderDetailPageModule)
  },
  {
    path: 'order-detail-history',
    loadChildren: () => import('./order-detail-history/order-detail-history.module').then( m => m.OrderDetailHistoryPageModule)
  }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderListPageRoutingModule { }
