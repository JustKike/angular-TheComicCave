import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'comics',
    loadChildren: () => import('./comics/comics.module').then(m => m.ComicsModule),
    ...canActivate(() => redirectUnauthorizedTo(['/auth']))
  },
  {
    path: 'foro',
    loadChildren: () => import('./forum/forum.module').then(m => m.ForumModule),
    ...canActivate(() => redirectUnauthorizedTo(['/auth']))
  },
  {
    path: 'shared',
    loadChildren: () => import('./shared/shared.module').then(m => m.SharedModule),
    ...canActivate(() => redirectUnauthorizedTo(['/auth']))
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
