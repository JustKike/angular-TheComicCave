import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modulos compartidos
import { SharedModule } from '../shared/shared.module';


//rutas
import { ComicsRoutingModule } from './comics-routing.module';

//componentes
import { AgregarComponent } from './pages/agregar/agregar.component';
import { EditarComponent } from './pages/editar/editar.component';
import { ListarComponent } from './pages/listar/listar.component';
import { ComicComponent } from './pages/comic/comic.component';
import { MainComponent } from './pages/main/main.component';


@NgModule({
  declarations: [
    AgregarComponent,
    EditarComponent,
    ListarComponent,
    ComicComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    ComicsRoutingModule,
    SharedModule
  ]
})
export class ComicsModule { }
