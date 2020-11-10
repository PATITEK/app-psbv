import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ProductInfoPage } from './product-info/product-info.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'product-info',
    loadChildren: () => import('./product-info/product-info.module').then(m => m.ProductInfoPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
