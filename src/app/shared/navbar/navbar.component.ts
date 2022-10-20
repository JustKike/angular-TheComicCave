import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

// providers
import { LoginService } from 'src/app/shared/providers/login.service';
import { UsersService } from '../providers/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  public path: string = 'users';
  public usuario: any = {};
  public datos: any;
  public userInfo: any = {};
  elID: any;
  public userStatus: any = null;

  constructor(
    public _lc: LoginService,
    public _us: UsersService
  ) {
    this._lc.auth.onAuthStateChanged((user) => {
      if (!user) {
        return;
      }
      console.log('Estado del usuario:', user);
      this.userInfo.name = user.displayName;
      this.userInfo.email = user.email;
      this.userInfo.photo = user.photoURL;
      this.getStatus(user.uid);
    });

  }

  ngOnInit(): void { }

  getStatus(id: any) {
    this._us.getUsuario(this.path, id).subscribe((item: any) => {
      if (!item) {
        console.log('No hay datos!!!');
      } else {
        this.userStatus = item.status;
        console.log('Estatus del usuario -> ', this.userStatus);
      }
    });
  }


}
