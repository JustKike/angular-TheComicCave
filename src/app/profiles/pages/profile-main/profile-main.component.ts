import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/providers/users.service';
import { LoginService } from '../../../shared/providers/login.service';
//interfaces
import { Usuario } from 'src/app/shared/interface/user.interface';
import { FileI } from 'src/app/shared/interface/file.interface';
import { InteractionService } from 'src/app/shared/providers/interaction.service';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.css']
})
export class ProfileMainComponent implements OnInit {
  // formuarlio de perfil
  form!: FormGroup;
  // formuarlio de usuario
  formRegister: FormGroup;
  //imagen de usuario
  public image!: FileI;
  public currentImage: string = './assets/img/watchmen-pin.png';
  public usuario: any = {};
  public UID: any;
  public load = true;
  public registro: boolean = true;

  //spinner
  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'indeterminate';
  diameter = 50;
  value = 50;
  loading = false;

  constructor(
    private fb: FormBuilder,
    public _us: UsersService,
    public _lc: LoginService,
    public _interaction: InteractionService,
    private router: Router
  ) {
    this.form = this.fb.group({
      displayName: new FormControl('', Validators.required),
      email: new FormControl({ value: '', desabled: true }, Validators.required),
      photoURL: new FormControl('')
    });
    this.formRegister = this.fb.group({
      name: new FormControl('', Validators.required),
      email: new FormControl({ value: '', desabled: true }, Validators.required),
      password: null,
      birthDate: ['', Validators.required],
      status: 'default',
      photoURL: new FormControl(''),
      createDate: new Date(),
      editDate: new Date()
    })
  }

  ngOnInit(): void {
    this._lc.auth.authState.subscribe(user => {
      console.log('Estado de autenticacion: ', user);
      this.getUID();
    })
    //this.initValuesForm(user);
    this._lc.userData$.subscribe((user: any) => {
      if (!user) {
        return;
      }
      this.initValuesForm(user);
    });
  }

  getUID() {
    this._us.getUID()
      .then((response) => {
        this.UID = response;
        this.checkUserI();
      }).catch((error) => {
        console.log('No existe UID', error);
      })
  }

  checkUserI() {
    const path = 'users';
    const id = this.UID;
    if (!this.UID) {
      return;
    } else {
      this._us.displayProfile(path, id).subscribe((item: any) => {
        if (!item) {
          //si es usuario logeado con otro proveedor y no esta registrado en la BD
          this.registro = false;
          var response = 'Termina de registrar tus datos!';
          //msj
          this._interaction.mensaje(response);
        } else {
          this.usuario = item;
        }
      });
    }
  }

  onSaveUser(user: Usuario): void {
    this._us.preSaveUserProfile(user, this.image);
    var response = 'Perfil actualizado con exito';
    //animacion
    this.loading = true;
    setTimeout(() => {
      this.form.reset();
      //redireccion a pagina principal
      this.router.navigate(['/comics']);
      //msj
      this._interaction.mensaje(response);
    }, 1500)
  }

  private initValuesForm(user: Usuario): void {
    if (user.photoURL) {
      this.currentImage = user.photoURL
    }
    this.form.patchValue({
      displayName: user.displayName,
      email: user.email

    });
    this.formRegister.patchValue({
      name: user.displayName,
      email: user.email

    });
  }

  handleImage(image: FileI): void {
    this.image = image;
  }
  //registrar datos de los usuarios logeados con otro proveedor (google, facebook)
  register() {
    if (this.formRegister.valid) {
      //Si la hay mandamos los datos del registro a BD 'users'
      if (!this.UID) {
        return
      } else {
        const path = 'users';
        const id = this.UID;
        this.formRegister.value.uid = id;
        this.formRegister.value.password = null;
        this._us.createDoc(this.formRegister.value, path, id)
          .then(() => {
            var response = 'Datos de perfil registrados con exito';
            //animacion
            this.loading = true;
            setTimeout(() => {
              this.formRegister.reset();
              //redireccion a pagina principal
              this.router.navigate(['/comics']);
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
  }

}
