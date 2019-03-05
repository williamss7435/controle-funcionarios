import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Employee } from '../employees/employee.model';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';


@Injectable()
export class EmployeesService{


    constructor(
        private http: HttpClient,
        private loginService: LoginService
    ){}
    
    search(search: string, field?: string): Observable<Employee[]>{
        
        return this.http.post<Employee[]>("http://localhost:3000/search-employees", {
            search: search,
            field
        }, {
            headers: this.getAuthorization()
        });

    }

    save(employee: Employee){

        return this.http.put("http://localhost:3000/employees",{
            employee
        },{
            headers: this.getAuthorization()
        });

    }

    demiss(id){

        return this.http.delete(`http://localhost:3000/employees/${id}`, {
            headers: this.getAuthorization()
        });

    }

    statistics(type = ''){
        let header = new HttpHeaders();
        header = header.set("Authorization", this.loginService.token);

        return this.http.post('http://localhost:3000/statistics', {type}, {
            headers: this.getAuthorization()
        });
    }

    getAuthorization(): HttpHeaders{
        let header = new HttpHeaders();
        return header = header.set("Authorization", this.loginService.token);
    }

}