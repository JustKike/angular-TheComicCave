import { Component, OnInit } from '@angular/core';

// providers
import { LoginService } from 'src/app/shared/providers/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  public usuario: any = {};
  public datos: any;

  constructor(public _lc: LoginService) {
    this._lc.auth.authState.subscribe(user => {
      console.log('Estado del usuario:', user);
      if (!user) {
        return;
      }
      this.getUserName(user.displayName, user.email);
      this.getUserPhoto(user.photoURL);

    });
  }

  ngOnInit(): void { }

  getUserPhoto(photo: any) {
    if (photo == null) {
      return this.usuario.url = './assets/img/watchmen-pin.png';
    } else {
      return this.usuario.url = this._lc.usuario.photo;
    }
  }

  getUserName(name: any, email: any) {
    if (name == null) {
      this.datos = email;
    } else {
      this.datos = name;
    }
  }

}
