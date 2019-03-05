import { CanLoad, CanActivate, Route, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from '../services/login.service';

@Injectable()
export class LoginGuard implements CanLoad, CanActivate  {

    constructor(private loginService: LoginService, private router: Router){}

    canLoad(route: Route): boolean{
        return this.checkLogin();
    }

    canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot): boolean{
        return this.checkLogin();
    }

    checkLogin():boolean{
        if(this.loginService.isLogged())
            return true;
        else{
            this.router.navigate(['/login']);
            return false;
        }
    }

}