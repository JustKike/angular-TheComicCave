import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './pages/users-list/users-list.component';
import { UserAddComponent } from './pages/user-add/user-add.component';
import { UserEditComponent } from './pages/user-edit/user-edit.component';


@NgModule({
  declarations: [
    UsersListComponent,
    UserAddComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
