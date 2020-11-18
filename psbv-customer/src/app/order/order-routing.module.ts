import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'order-list', 
    loadChildren: () => import('./order-list/order-list.module').then(m => m.OrderListPageModule),
  },
  {
    path: 'order-history', 
    loadChildren: () => import('./order-history/order-history.module').then(m => m.OrderHistoryPageModule),
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderPageRoutingModule {
  
}
