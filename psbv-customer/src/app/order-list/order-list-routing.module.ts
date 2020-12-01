import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderListPage } from './order-list.page';

const routes: Routes = [
  {
    path: '',
    component: OrderListPage,
    children: [
      {
        path: 'history',
        loadChildren: () => import('../order-list/order-history/order-history.module').then(m => m.OrderHistoryPageModule)
      },
      {
        path: 'order-status',
        loadChildren: () => import('../order-list/order-status/order-status.module').then(m => m.OrderStatusPageModule)
      },
      {
        path: '',
        redirectTo: '/main/order-list/order-status',
        pathMatch: 'full'
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderListPageRoutingModule {}
