import { Component, OnInit, Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

@Injectable()
export class NavbarComponent implements OnInit {

  logged: boolean = false;

  constructor(private login: LoginService, private router: Router) { }

  ngOnInit() {
  }

  isLogged():boolean{
    return this.login.isLogged();
  }

  getName():string {
    return this.login.getname();
  }

  logoff(){
    this.login.logoff();
    this.router.navigate(['/']);
  }

}
