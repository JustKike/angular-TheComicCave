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
import { CustomerI } from '../interface/customer.interface';
import { Router } from '@angular/router';

export interface CustomerID extends CustomerI { id: string; }

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  // traer todos los usuarios de la coleccion usuarios
  private customerCollection!: AngularFirestoreCollection<CustomerI>;
  customers: Observable<CustomerID[]>;

  private itemDoc!: AngularFirestoreDocument<any>;
  private path = 'users';

  items!: Observable<any>;
  private itemsCollection!: AngularFirestoreCollection<any>;
  private filePath!: string;
  public datos: any;
  public usuarios: any = {};
  public allusers: any = {};

  constructor(
    public auth: AngularFireAuth,
    private _afs: AngularFirestore,
    private _storage: AngularFireStorage,
    private _is: InteractionService,
    public _interaction: InteractionService,
    private router: Router
  ) {
    // traer todos los usuarios de la coleccion usuarios
    this.customerCollection = _afs.collection<CustomerI>(this.path);
    this.customers = this.customerCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as CustomerI;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  //crear la coleccion users
  createDoc(data: any, path: string, id: string) {
    this.itemsCollection = this._afs.collection<any>(path);
    return this.itemsCollection.doc(id).set(data);
  }
  //traer el uid del usuario logeado
  async getUID() {
    const user = await this.auth.currentUser;
    return user?.uid
  }
  //perfil
  displayProfile(path: any, UID: any) {
    this.usuarios = this._afs.collection(`${path}`).doc(`${UID}`).valueChanges();
    return this.usuarios;
  }

  //preguardado del perfil de usuario auth con imagen
  preSaveUserProfile(user: Usuario, image: FileI) {
    this.uploadImage(user, image);
  }
  //subir imagen de usuario en el storage
  private uploadImage(user: Usuario, image: FileI): void {
    this.filePath = `avatar/${image.name}`;
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
  //guardar el perfil del user auth
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

  //trae a todos los usuarios de la coleccion users
  getAllusers() {
    return this.customers;
  }
  //devolver un usuario de la coleccion users
  getUsuario(path: any, UID: any) {
    return this._afs.collection(`${path}`).doc(`${UID}`).valueChanges();
  }

  editUser(id: string, user: CustomerI) {
    // console.log('este es el id a editar el correcto: ', id);
    return this.customerCollection.doc(id).update(user);
  }

  deleteUser(id: string) {
    if (id) {
      const msj = 'Registro eliminado con exito!';
      this._is.mensaje(msj);
    }
    return this.customerCollection.doc(id).delete();
  }

}
