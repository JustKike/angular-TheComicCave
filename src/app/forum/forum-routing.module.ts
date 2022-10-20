import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarComponent } from './pages/editar/editar.component';
import { ListarComponent } from './pages/listar/listar.component';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { TemaComponent } from './pages/tema/tema.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'nuevo-tema', component: NuevoComponent },
      { path: 'editar-tema/:id', component: EditarComponent },
      { path: 'listar-temas', component: ListarComponent },
      { path: 'post/:id', component: TemaComponent },
      { path: '**', redirectTo: 'listar-temas', pathMatch: 'full' },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForumRoutingModule { }
