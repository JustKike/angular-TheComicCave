import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { SharedModule } from '../shared/shared.module';

//componentes
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
    ProfilesRoutingModule,
    SharedModule
  ]
})
export class ProfilesModule { }
