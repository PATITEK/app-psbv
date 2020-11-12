import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';


const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'product-info',
    loadChildren: () => import('./product-info/product-info.module').then(m => m.ProductInfoPageModule)
  },
  {
    path: 'user-info',
    loadChildren: () => import('../account/user-info/user-info.module').then(m => m.UserInfoModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
