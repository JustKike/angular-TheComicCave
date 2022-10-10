import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// providers
import { LoginService } from 'src/app/shared/providers/login.service';


import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _snackBar: MatSnackBar,
    public _lc: LoginService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  initSesion() {
    // Nos aseguramos que el formulario es valido
    if (this.form.valid) {
      //enviamos los datos del formulario al servicio de login con fire Auth
      this._lc.loginWithFirebaseAuth(this.form.value)
        // Gestionamos la promesa
        .then(() => {
          //animacion y redireccion al contenido
          this.loading = true;
          setTimeout(() => {
            this.form.reset();
            this.router.navigate(['/comics']);
          }, 1500)
        })
        .catch(error => {
          this.form.reset();
          console.log(error);
        });
    } else {
      //Mostramos un msj de error si el formualario no es valido
      console.log("Todos los campos deben estar registrados");
      this.error();
      this.form.reset();
    }
  }

  error() {
    this._snackBar.open('Usuario o Contraseña ingresados invalidos!', 'cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

  ingresar(proveedor: string) {
    this._lc.login(proveedor);
  }

}
