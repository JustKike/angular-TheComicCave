import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAddComponent } from './pages/user-add/user-add.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';
import { UsersListComponent } from './pages/users-list/users-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'add', component: UserAddComponent },
      { path: 'edit', component: UserEditComponent },
      { path: 'List', component: UsersListComponent },
      { path: '**', redirectTo: 'List' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
