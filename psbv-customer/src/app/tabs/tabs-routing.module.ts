import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'product-categories',
        loadChildren: () => import('../product-categories/product-categories.module').then(m => m.ProductCategoriesPageModule)
      },
      {
        path: 'shopping-cart',
        loadChildren: () => import('../shopping-cart/shopping-cart.module').then(m => m.ShoppingCartPageModule)
      },
      {
        path: 'order-list',
        loadChildren: () => import('../order/order-list/order-list.module').then(m => m.OrderListPageModule)
      },
      {
        path: '',
        redirectTo: '/main',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
