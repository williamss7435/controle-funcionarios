import { Component, OnInit } from '@angular/core';
import { Employee } from './employee.model';
import { EmployeesService } from '../services/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];

  constructor(
    private employeesService: EmployeesService
  ) {

  }

  ngOnInit() {
  }

  searchEmployees(search){
    this.employeesService.search(search.value).subscribe(
      results => {
        search.value = "";
        this.employees = results;
      }
    );
    
  }

}
