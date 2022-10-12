import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfileAddComponent } from './pages/profile-add/profile-add.component';
import { ProfileEditComponent } from './pages/profile-edit/profile-edit.component';
import { ProfileMainComponent } from './pages/profile-main/profile-main.component';


@NgModule({
  declarations: [
    ProfileAddComponent,
    ProfileEditComponent,
    ProfileMainComponent
  ],
  imports: [
    CommonModule,
    ProfilesRoutingModule
  ]
})
export class ProfilesModule { }
