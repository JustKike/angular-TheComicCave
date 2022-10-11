import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { InteractionService } from 'src/app/shared/providers/interaction.service';
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
    public _lc: LoginService,
    public _interaction: InteractionService,
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
          var response = 'Correo registrado con exito: ' + this.formRegister.value.email;
          this.loading = true;
          setTimeout(() => {
            this.formRegister.reset();
            this.router.navigate(['/comics']);
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
