import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/providers/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  public usuarios: any = {};

  constructor(
    public _us: UsersService,
  ) {
    const path = 'users';
    this._us.getUsers(path).subscribe((item: any) => {
      this.usuarios = item;
      console.log(this.usuarios);
    });
  }

  ngOnInit(): void {
  }

}
