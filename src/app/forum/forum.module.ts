import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modulos compartidos
import { SharedModule } from '../shared/shared.module';

import { ForumRoutingModule } from './forum-routing.module';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { EditarComponent } from './pages/editar/editar.component';
import { ListarComponent } from './pages/listar/listar.component';
import { TemaComponent } from './pages/tema/tema.component';


@NgModule({
  declarations: [
    NuevoComponent,
    EditarComponent,
    ListarComponent,
    TemaComponent
  ],
  imports: [
    CommonModule,
    ForumRoutingModule,
    SharedModule
  ]
})
export class ForumModule { }
