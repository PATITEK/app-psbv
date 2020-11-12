import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'main',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth-manager/auth-manager.module').then( m => m.AuthManagerPageModule)
  },
  {
    path: 'user-info',
    loadChildren: () => import('./user-info/user-info.module').then( m => m.UserInfoModule)
  },
  {
    path: 'shopping-cart',
    loadChildren: () => import('./shopping-cart/shopping-cart.module').then( m => m.ShoppingCartModule)
  },
  {
    path: 'statusNoti',
    loadChildren: () => import('./@modular/page-noti/page-noti.module').then( m => m.PageNotiModule)
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'product-categories',
    loadChildren: () => import('./product-categories/product-categories.module').then( m => m.ProductCategoriesPageModule)
  },  {
    path: 'order-list',
    loadChildren: () => import('./order/order-list/order-list.module').then( m => m.OrderListPageModule)
  },
  {
    path: 'order-history',
    loadChildren: () => import('./order/order-history/order-history.module').then( m => m.OrderHistoryPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}