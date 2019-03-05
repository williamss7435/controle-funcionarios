import { NgModule } from "@angular/core";
import { EmployeeComponent } from './employee/employee.component';
import { EmployeesComponent } from './employees.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

const ROUTES: Routes = [
  {path: '', component: EmployeesComponent}
]

@NgModule({
  declarations: [EmployeesComponent, EmployeeComponent],
  imports: [RouterModule.forChild(ROUTES), CommonModule],
})
export class EmployeesModule{}