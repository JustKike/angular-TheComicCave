import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, map, Observable } from 'rxjs';
import { doc, getDoc } from "firebase/firestore";
import { getAuth, updateProfile } from "firebase/auth";
import { Usuario } from '../interface/user.interface';
import { InteractionService } from './interaction.service';
import { FileI } from '../interface/file.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private itemDoc!: AngularFirestoreDocument<any>;
  items!: Observable<any>;
  private itemsCollection!: AngularFirestoreCollection<any>;
  private filePath!: string;
  public datos: any;
  public usuarios: any = {};

  constructor(
    public auth: AngularFireAuth,
    private _afs: AngularFirestore,
    private _storage: AngularFireStorage,
    private _is: InteractionService
  ) {
  }

  createDoc(data: any, path: string, id: string) {
    this.itemsCollection = this._afs.collection<any>(path);
    return this.itemsCollection.doc(id).set(data);
  }

  async getUID() {
    const user = await this.auth.currentUser;
    return user?.uid
  }

  displayProfile(path: any, UID: any) {
    this.itemDoc = this._afs.doc<any>(`users/${UID}`);
    this.datos = this.itemDoc.valueChanges();
    return this.datos;
  }

  getUsers(path: any) {
    this.usuarios = this._afs.collection(path).snapshotChanges()
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      })));
    return this.usuarios;
  }

  preSaveUserProfile(user: Usuario, image: FileI) {
    this.uploadImage(user, image);
  }

  private uploadImage(user: Usuario, image: FileI): void {
    this.filePath = `images/${image.name}`;
    const fileRef = this._storage.ref(this.filePath);
    const task = this._storage.upload(this.filePath, image);
    task.snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(urlImage => {
            user.photoURL = urlImage;
            this.saveUserProfile(user);
          })
        })
      ).subscribe();
  }

  private saveUserProfile(user: Usuario) {
    if (user) {
      this.auth.currentUser.then((usuario) => {
        if (usuario) {
          usuario.updateProfile({
            displayName: user.displayName,
            photoURL: user.photoURL
          }).then((success) => {
            const msj = 'Usuario Actualizado: ' + user.displayName;
            this._is.mensaje(msj);
          }).catch((error) => {
            this._is.mensajeError(error);
          });
        }
      });
    }
  }

}
