import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileAddComponent } from './pages/profile-add/profile-add.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { ProfileMainComponent } from './pages/profile-main/profile-main.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'add', component: ProfileAddComponent },
      { path: 'edit', component: ProfileEditComponent },
      { path: 'view', component: ProfileMainComponent },
      { path: '**', redirectTo: 'view' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule { }
