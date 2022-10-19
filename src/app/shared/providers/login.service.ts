import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import firebase from 'firebase/compat/app';

//modelo
import { Usuario } from 'src/app/shared/interface/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public users: any[] = [];
  public usuario: any = {};
  public data!: any;
  public userData$: Observable<any>;


  constructor(
    public auth: AngularFireAuth,
    private ngZone: NgZone,
    private router: Router,
  ) {
    this.data = this.auth.authState;
    this.userData$ = this.data;
    this.auth.onAuthStateChanged(user => {
      if (!user) {
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
      this.usuario.photo = user.photoURL;
      this.usuario.email = user.email;
    });
  }

  register(datos: any) {
    const email = datos.value.email;
    const password = datos.value.password;
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  loginWithFirebaseAuth({ email, password }: any) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  login(proveedor: string) {
    if (proveedor === 'google') {
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((response) => {
        this.router.navigate(['/comics']);
      }).catch((error) => {
        console.log('Error al enviar', error);
      });
    } else {
      this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider()).then((response) => {
        this.router.navigate(['/comics']);
      }).catch((error) => {
        console.log('Error al enviar', error);
      });
    }
  }

  logout() {
    this.usuario = {};
    this.auth.signOut();
    this.router.navigate(['/login']);
  }

  checkLogin() {
    this.auth.user.subscribe(user => {
      if (user) {
        this.ngZone.run(() => {
          this.router.navigate(['/comics']);
        })
      }
    })
  }

}
