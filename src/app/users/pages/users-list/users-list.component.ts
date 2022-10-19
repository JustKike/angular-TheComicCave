import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/shared/providers/users.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { CustomerI } from 'src/app/shared/interface/customer.interface';
import { Router } from '@angular/router';
import { InteractionService } from 'src/app/shared/providers/interaction.service';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'birthDate', 'photoURL', 'status', 'uid', 'editDate', 'actions'];
  dataSource = new MatTableDataSource();
  userEditInfo: any = {};


  @ViewChild(MatSort)
  sort: MatSort = new MatSort;

  public defaultPhoto = './assets/img/usuario.png';
  public usuarios: any = {};
  //spinner
  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'indeterminate';
  diameter = 50;
  value = 50;
  loading = false;

  constructor(
    public _us: UsersService,
    public _interaction: InteractionService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this._us.getAllusers().subscribe(res =>
      this.dataSource.data = res
    );
  }
  //para sortear los datos
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  //input de filtrado por parametros
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //editar elemento de la coleccion users
  onEdit(id: string) {
    //iniciar animacion loading
    this.loading = true;
    setTimeout(() => {
      this.router.navigate([`/usuarios/edit/${id}`]);
    }, 1500)
    console.log(id);
  }

  //eliminar elemento de la coleccion users
  onDelete(id: string) {
    if (window.confirm("¿Esta seguro de BORRAR este registro?")) {
      this._us.deleteUser(id);
    }
  }


}
