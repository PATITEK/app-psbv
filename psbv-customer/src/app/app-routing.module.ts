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
    loadChildren: () => import('./account/user-info/user-info.module').then( m => m.UserInfoModule)
  },
  {
    path: 'password-change',
    loadChildren: () => import('./account/password-changed/password-changed.module').then( m =>m.PasswordChangedPageModule )
  },
  {
    path: 'order-history',
    loadChildren: () => import('./order/order-history/order-history.module').then( m => m.OrderHistoryPageModule)
  },
  {
    path: 'shopping-cart',
    loadChildren: () => import('./shopping-cart/shopping-cart.module').then( m => m.ShoppingCartModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./noti/notification/notification.module').then( m => m.NotificationPageModule)
  },
  {
    path: 'statusNoti',
    loadChildren: () => import('./@modular/page-noti/page-noti.module').then( m => m.PageNotiModule)
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth' },
 

 

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}