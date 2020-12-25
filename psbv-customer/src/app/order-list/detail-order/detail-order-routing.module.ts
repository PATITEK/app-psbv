import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetailOrderPage } from './detail-order.page';

const routes: Routes = [
  {
    path: '',
    component: DetailOrderPage
  },
  {
    path: 'detail-component',
    loadChildren: () => import('./detail-component/detail-component.module').then( m => m.DetailComponentPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailOrderPageRoutingModule {}
