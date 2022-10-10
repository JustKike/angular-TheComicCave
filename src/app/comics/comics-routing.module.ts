import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { ComicComponent } from './pages/comic/comic.component';
import { EditarComponent } from './pages/editar/editar.component';
import { ListarComponent } from './pages/listar/listar.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'agregar', component: AgregarComponent },
      { path: 'editar', component: EditarComponent },
      { path: 'listar', component: ListarComponent },
      { path: 'comic', component: ComicComponent },
      { path: '**', redirectTo: 'listar' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComicsRoutingModule { }
