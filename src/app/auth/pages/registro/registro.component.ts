import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/providers/login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  formRegister!: FormGroup;

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
    this.formRegister = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
  }

  register() {
    if (this.formRegister.valid) {
      console.log("Usuario Registrado: ", this.formRegister);
      // envio de datos para el registro
      this._lc.register(this.formRegister.value)
        .then(() => {
          //animacion y redireccion al login
          this.loading = true;
          setTimeout(() => {
            this.formRegister.reset();
            this.router.navigate(['/login']);
          }, 1500)
        })
        .catch(error => console.log(error));
    } else {
      //Mostramos un msj de error
      this.error();
      this.formRegister.reset();
    }
  }

  error() {
    this._snackBar.open('Usuario o Contraseña ingresados invalidos!', 'cerrar', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    })
  }

}
