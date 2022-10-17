import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// providers
import { LoginService } from 'src/app/shared/providers/login.service';
import { InteractionService } from 'src/app/shared/providers/interaction.service';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

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
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this._lc.checkLogin();
  }

  initSesion() {
    // Nos aseguramos que el formulario es valido
    if (this.form.valid) {
      //enviamos los datos del formulario al servicio de login con fire Auth
      this._lc.loginWithFirebaseAuth(this.form.value)
        // Gestionamos la promesa
        .then(() => {
          //animacion y redireccion al contenido
          var response = 'Bienvenido ' + this.form.value.email;
          this.loading = true;
          setTimeout(() => {
            this.form.reset();
            this.router.navigate(['/comics']);
            this._interaction.mensaje(response);
          }, 1500)
        })
        .catch(error => {
          this.form.reset();
          console.log(error);
          this._interaction.mensajeError(error.message);
        });
    } else {
      //Mostramos un msj de error si el formualario no es valido
      console.log("Todos los campos deben estar registrados");
      this.error();
      this.form.reset();
    }
  }

  error() {
    this._interaction.mensajeError('Usuario o Contraseña ingresados invalidos!');
  }

  ingresar(proveedor: string) {
    this._lc.login(proveedor);
  }

}
