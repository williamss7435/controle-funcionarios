import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeesService } from '../services/employees.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
})
export class NewEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  loading: boolean = false;

  constructor( private fb: FormBuilder, private emplooyeesService: EmployeesService, private router: Router) { }

  ngOnInit() {

    this.employeeForm = new FormGroup({
      name: this.fb.control('', [Validators.required, Validators.minLength(4)]),
      rg: this.fb.control('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      cpf: this.fb.control('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      office: this.fb.control('', [Validators.required, Validators.minLength(4)]),
      sector: this.fb.control('', [Validators.required, Validators.minLength(4)]),
      salary: this.fb.control('', [Validators.required, Validators.minLength(4)]),
      gender: this.fb.control('', [Validators.required]),
      maritalStatus: this.fb.control('', [Validators.required]),
      english: this.fb.control('', [Validators.required]),
      schooling: this.fb.control('', [Validators.required]),
      cnh: this.fb.control('', [Validators.required]),
      birth: this.fb.control('', [Validators.required]),
    });

  }

  onSubmit(){
    this.employeeForm.get("cnh").setValue((this.employeeForm.get("cnh").value == "1")  ? true : false);
    
    this.emplooyeesService.save(this.employeeForm.value).subscribe(results => {
      
      this.router.navigate(["/employees"]);
      this.employeeForm.reset();

    }, error => {
      console.log(error);
    });
  }

  get f(){
    return this.employeeForm.controls;
  }

  onlyNumber(event: any, target: HTMLInputElement){
    if(event.key.length == 1 && isNaN(event.key)){
      this.employeeForm.get(target.attributes.getNamedItem('formcontrolname').value).setValue(target.value.slice(0, -1));
    }
  }
}
