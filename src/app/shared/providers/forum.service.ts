import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { PostInt } from '../interface/post.interface';

@Injectable({
  providedIn: 'root'
})
export class ForumService {
  postCollection!: AngularFirestoreCollection<PostInt>;
  postDoc!: AngularFirestoreDocument<PostInt>;



  constructor(
    private _afs: AngularFirestore
  ) {
    this.postCollection = this._afs.collection('posts', ref =>
      ref.orderBy('published', 'desc')
    );
  }

  getPosts() {
    return this.postCollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as PostInt;
        const id = a.payload.doc.id;
        return { id, ...data }
      })
    }));
  }

  getPostData(id: string) {
    this.postDoc = this._afs.doc<PostInt>(`posts/${id}`);
    return this.postDoc.valueChanges();
  }

}
