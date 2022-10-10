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

  constructor(public _lc: LoginService) { }

  ngOnInit(): void {
  }

}
