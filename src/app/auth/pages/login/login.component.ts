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
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  initSesion() {
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;

    if (usuario == 'jcervantes' && password == 'j12345') {
      console.log("Bienvenido Usuario: ", usuario);
      this.fakeloading();
    } else {
      //Mostramos un msj de error
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

  fakeloading() {
    this.loading = true;
    setTimeout(() => {
      this.form.reset();
      this.router.navigate(['/comics']);
    }, 1500)
  }

}
