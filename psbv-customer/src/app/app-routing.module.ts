import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // },

  
  // {
  //   path: '',
    
  //   loadChildren: () => import('./auth-manager/auth-manager.module').then( m => m.AuthManagerPageModule)
  // },
  {
    path: 'new-password',
    loadChildren: () => import('./auth-manager/new-password/new-password.module').then( m => m.NewPasswordPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}