import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {tap} from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {

    name: string = null;
    token: string = null;

    constructor(private http: HttpClient){}

    login(user, password): Observable<any>{

        return this.http.post<any>('http://localhost:3000/login', {
            login: user,
            password
        }).pipe(
            tap(loginAcess => {
               if(!loginAcess.error){
                   this.name = loginAcess.name;
                   this.token = loginAcess.token;
               } 
            })
        );

    }

    isLogged(): boolean{
        return !(this.name == null && this.token == null);
    }

    logoff(): void{
        this.name = null;
        this.token = null;
    }
    
    getname(){
        return this.name;
    }
}   