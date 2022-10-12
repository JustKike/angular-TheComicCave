import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//rutas hijas
import { AuthRoutingModule } from './auth-routing.module';

//modulos compartidos
import { SharedModule } from '../shared/shared.module';

//componentes
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  declarations: [
    RegistroComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule
  ]
})
export class AuthModule { }
