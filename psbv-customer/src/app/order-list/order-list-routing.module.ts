import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderListPage } from './order-list.page';

const routes: Routes = [
  {
    path: '',
    component: OrderListPage,
    children: [

    {
      path: 'tabs',
      loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
    },
    {
      path: 'order-status',
      loadChildren: () => import('./order-status/order-status.module').then( m => m.OrderStatusPageModule)
    },
  
  ]
  }]
  

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderListPageRoutingModule {}
