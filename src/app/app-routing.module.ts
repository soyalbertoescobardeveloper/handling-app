import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'operation/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./view-operation/view-operation.module').then( m => m.ViewOperationModule)
  },
  
  { path: 'datail-pax/:id', 
  canActivate: [AuthGuard],
  loadChildren: () => import('./detail-pax/detail-pax.module').then(m => m.DetailPaxModule) 
  },

  { path: 'datail-crew/:id', 
  canActivate: [AuthGuard],
  loadChildren: () => import('./detail-crew/detail-crew.module').then(m => m.DetailCrewModule) 
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
