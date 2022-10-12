import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { Mensaje } from '../interface/mensaje.interface';

// provider login
import { LoginService } from './login.service';



@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private itemsCollection!: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario: any = {};
  public nombre: any;

  constructor(
    private afs: AngularFirestore,
    private _lc: LoginService
  ) {
    this._lc.auth.authState.subscribe(user => {
      if (!user) {
        return;
      }
      this.userInfo(user);
    });
  }

  cargarMsj() {
    this.itemsCollection = this.afs.collection<Mensaje>('chats',
      ref => ref.orderBy('fecha', 'desc').limit(10));
    return this.itemsCollection.valueChanges()
      .pipe(map((mensajes: Mensaje[]) => {
        console.log(mensajes);
        this.chats = [];
        for (let mensaje of mensajes) {
          this.chats.unshift(mensaje);
        }
        return this.chats;
      }));
  }
  //guardar nombre o email en bd chat
  userInfo(user: any) {
    if (user?.displayName) {
      this.nombre = user.displayName;
    } else {
      this.nombre = user.email;
    }
  }

  agregarMsj(texto: string) {
    console.log("esta es la informacion: ", this.nombre);
    let mensaje: Mensaje = {
      nombre: this._lc.usuario.nombre || this._lc.usuario.email,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this._lc.usuario.uid,
      photo: this._lc.usuario.photo || null
    }
    return this.itemsCollection.add(mensaje);
  }

}
