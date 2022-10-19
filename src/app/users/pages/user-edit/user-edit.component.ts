import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
//componentes
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
//rutas
import { Router, ActivatedRoute } from '@angular/router';
import { FileI } from 'src/app/shared/interface/file.interface';
import { Usuario } from 'src/app/shared/interface/user.interface';
//services
import { InteractionService } from 'src/app/shared/providers/interaction.service';
import { LoginService } from 'src/app/shared/providers/login.service';
import { UsersService } from 'src/app/shared/providers/users.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  //spinner
  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'indeterminate';
  diameter = 50;
  value = 50;
  loading = false;

  // formuarlio de usuario formEdit
  // formRegister: FormGroup;
  formEdit: FormGroup;
  //imagen de usuario
  public image!: FileI;
  public currentImage: any;
  public defaultImage: string = './assets/img/watchmen-pin.png'
  public path: string = 'users';
  public editUser: any = {};
  elID: any;

  constructor(
    private fb: FormBuilder,
    public _us: UsersService,
    private _afs: AngularFirestore,
    public _interaction: InteractionService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.elID = this.activateRoute.snapshot.paramMap.get('id');
    console.log('Este es el id a editar', this.elID);
    this.formEdit = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl({ value: '', desabled: true }, Validators.required),
      password: null,
      birthDate: ['', Validators.required],
      status: 'default',
      photoURL: new FormControl(''),
      editDate: new Date()
    })
    this.currentImage = this.editUser.photoURL;
    this.getUser(this.elID);
  }

  ngOnInit(): void {

  }

  getUser(id: string) {
    this._us.getUsuario(this.path, this.elID).subscribe((item: any) => {
      if (!item) {
        console.log('No hay datos');
      } else {
        console.log('Checa estos datos: ', item);
        this.initValuesForm(item);
      }
    });
  }

  public initValuesForm(user: any): void {
    if (user.photoURL) {
      this.currentImage = user.photo
    }
    this.formEdit.patchValue({
      name: user.name,
      email: user.email,
      birthDate: user.birthDate,
    });
  }

  handleImage(image: FileI): void {
    this.image = image;
  }

  editar(user: any) {
    if (window.confirm("¿Esta seguro de EDITAR este registro?")) {
      this._us.editUser(this.elID, user).then(() => {
        var response = 'Usuario actualizado con exito';
        //animacion
        this.loading = true;
        setTimeout(() => {
          //redireccion a pagina principal
          this.router.navigate(['/usuarios']);
          //msj
          this._interaction.mensaje(response);
        }, 1500)
      })
        .catch(error => {
          console.log(error);
          this._interaction.mensajeError(error.message);
        });
    }
  }

  // register() {
  //   if (this.formRegister.valid) {
  //     //Si la hay mandamos los datos del registro a BD 'users'
  //     if (!this.UID) {
  //       return
  //     } else {
  //       const path = 'users';
  //       const id = this.UID;
  //       this.formRegister.value.uid = id;
  //       this.formRegister.value.password = null;
  //       this._us.createDoc(this.formRegister.value, path, id)
  //         .then(() => {
  //           var response = 'Datos de perfil registrados con exito';
  //           //animacion
  //           this.loading = true;
  //           setTimeout(() => {
  //             this.formRegister.reset();
  //             //redireccion a pagina principal
  //             this.router.navigate(['/comics']);
  //             //msj
  //             this._interaction.mensaje(response);
  //           }, 1500)
  //         })
  //         .catch(error => {
  //           console.log(error);
  //           this._interaction.mensajeError(error.message);
  //         });
  //     }
  //   }
  // }

}
