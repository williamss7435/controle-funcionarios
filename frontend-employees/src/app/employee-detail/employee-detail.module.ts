import { NgModule } from '@angular/core';
import { EmployeeDetailComponent } from './employee-detail.component';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const ROUTE: Routes = [
    {path: '', component: EmployeeDetailComponent}
];

@NgModule({
    declarations: [EmployeeDetailComponent],
    imports: [CommonModule, RouterModule.forChild(ROUTE)]
})
export class EmployeeDetailModule{}