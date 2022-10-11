import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public usuario: any = {};

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
  ) {
    this.auth.authState.subscribe(user => {
      console.log('Estado del usuario:', user);
      if (!user) {
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
      this.usuario.photo = user.photoURL;
      this.usuario.email = user.email;
    });
  }

  register({ email, password }: any) {
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

}
