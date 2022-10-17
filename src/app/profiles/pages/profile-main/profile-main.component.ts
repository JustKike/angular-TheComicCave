import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/providers/users.service';
import { LoginService } from '../../../shared/providers/login.service';
//interfaces
import { Usuario } from 'src/app/shared/interface/user.interface';
import { FileI } from 'src/app/shared/interface/file.interface';


@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['./profile-main.component.css']
})
export class ProfileMainComponent implements OnInit {

  form!: FormGroup;
  //imagen de usuario
  public image!: FileI;
  public currentImage: string = './assets/img/watchmen-pin.png';
  public usuario: any = {};
  public UID: any;
  public load = true;

  constructor(
    private fb: FormBuilder,
    public _us: UsersService,
    public _lc: LoginService,
    private router: Router
  ) {
    this.form = this.fb.group({
      displayName: new FormControl('', Validators.required),
      email: new FormControl({ value: '', desabled: true }, Validators.required),
      photoURL: new FormControl('')
    })
  }

  ngOnInit(): void {
    this._lc.auth.authState.subscribe(user => {
      console.log('Estado de autenticacion: ', user);
      this.getUID();
    })
    //this.initValuesForm(user);
    this._lc.userData$.subscribe((user: any) => {
      if (!user) {
        return;
      }
      this.initValuesForm(user);
    });
  }

  getUID() {
    this._us.getUID()
      .then((response) => {
        this.UID = response;
        this.getInfoUser();
      }).catch((error) => {
        console.log('No existe UID', error);
      })
  }

  getInfoUser() {
    const path = 'users';
    const id = this.UID;
    this._us.displayProfile(path, id).subscribe((item: any) => {
      this.usuario = item;
      console.log(this.usuario);
    });
  }

  onSaveUser(user: Usuario): void {
    this._us.preSaveUserProfile(user, this.image);
  }

  private initValuesForm(user: Usuario): void {
    if (user.photoURL) {
      this.currentImage = user.photoURL
    }
    this.form.patchValue({
      displayName: user.displayName,
      email: user.email

    });
  }

  handleImage(image: FileI): void {
    this.image = image;
  }

}
