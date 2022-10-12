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
  public userInfo: any = {};

  constructor(public _lc: LoginService) {
    this._lc.auth.authState.subscribe(user => {
      console.log('Estado del usuario:', user);
      if (!user) {
        return;
      }
      this.userInfo.name = user.displayName;
      this.userInfo.email = user.email;
      this.userInfo.photo = user.photoURL;
    });
  }

  ngOnInit(): void { }

}
