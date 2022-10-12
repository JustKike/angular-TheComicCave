import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';

// providers
import { LoginService } from 'src/app/shared/providers/login.service';
import { InteractionService } from 'src/app/shared/providers/interaction.service';

//interfaces
import { Usuario } from 'src/app/shared/interface/user.interface';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formRegister: FormGroup;
  uploadPercent!: Observable<number>;
  downloadURL!: Observable<string>;

  public image!: string;

  //spinner
  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'indeterminate';
  diameter = 50;
  value = 50;
  loading = false;

  constructor(
    private fb: FormBuilder,
    public _lc: LoginService,
    public _interaction: InteractionService,
    private storage: AngularFireStorage,
    private router: Router
  ) {
    this.formRegister = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      birthDate: ['', Validators.required],
      status: 'default',
      photo: null
    })
  }

  ngOnInit(): void {
  }

  register() {
    if (this.formRegister.valid) {
      // envio de datos para el registro
      this._lc.register(this.formRegister)
        .then(res => {
          //Preguntamos si hay una respuesta
          if (!res) {
            return;
          } else {
            //Si la hay mandamos los datos del registro a BD 'users'
            const path = 'users';
            if (!res.user?.email && !res.user?.uid) {
              return;
            } else {
              const id = res.user.uid;
              this.formRegister.value.uid = id;
              this.formRegister.value.password = null;
              this._lc.createDoc(this.formRegister.value, path, id)
                .then(() => {
                  console.log('Datos de perfil registrados');
                })
                .catch(error => {
                  console.log(error);
                  this._interaction.mensajeError(error.message);
                });
            }
          }
          //msj
          var response = 'Correo registrado con exito: ' + this.formRegister.value.email;
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
          this.formRegister.reset();
          console.log(error);
          this._interaction.mensajeError(error.message);
        });
    } else {
      //Mostramos un msj de error
      this.error();
      this.formRegister.reset();
    }
  }

  error() {
    this._interaction.mensajeError('Usuario o Contraseña registrados invalidos!');
  }

}
