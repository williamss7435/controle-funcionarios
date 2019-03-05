import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { EmployeesService } from '../services/employees.service';
import { Employee } from '../employees/employee.model';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html'
})
export class EmployeeDetailComponent implements OnInit {

  constructor(private activetedRoute: ActivatedRoute, private employeesService: EmployeesService) { }
  employee: Employee;
  age: number;
  ngOnInit() {
    let id = this.activetedRoute.snapshot.params.id;
    this.searchEmployee(id);
  }

  searchEmployee(id){

    this.employeesService.search(id, 'id').subscribe(results => {
       this.employee = results[0];
       this.age = new Date().getFullYear() - new Date(results[0].birth.toString()).getFullYear();
    });

  }

  demiss(id){

    if(confirm("Tem Certeza Que Deseja Demitir o Funcionario?")){

      this.employeesService.demiss(id).subscribe(results => {
        this.employee.isActive = false;
      }, error => {
        console.log(error);
      })

    }

  }

}
