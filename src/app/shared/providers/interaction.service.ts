import { Injectable } from '@angular/core';

//modulo
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  constructor(private _snackBar: MatSnackBar) { }

  mensajeError(msj: any) {
    this._snackBar.open(msj, 'cerrar', {
      duration: 6000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['warning']
    })
  }

  mensaje(msj: any) {
    this._snackBar.open(msj, 'cerrar', {
      duration: 6000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: ['primary']
    })
  }

}



