import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderStatusDetailPage } from './order-status-detail.page';

const routes: Routes = [
  {
    path: '',
    component: OrderStatusDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrderStatusDetailPageRoutingModule {}
