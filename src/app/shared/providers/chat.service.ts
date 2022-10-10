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

  constructor(
    private afs: AngularFirestore,
    private _lc: LoginService
  ) { }

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

  agregarMsj(texto: string) {
    let mensaje: Mensaje = {
      nombre: this._lc.usuario.nombre,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this._lc.usuario.uid,
      photo: this._lc.usuario.photo
    }
    return this.itemsCollection.add(mensaje);
  }

}
