import { NgModule } from "@angular/core";
import { NewEmployeeComponent } from './new-employee.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const ROUTES: Routes = [
    {path: '', component: NewEmployeeComponent}
]

@NgModule({
    declarations: [NewEmployeeComponent],
    imports: [RouterModule.forChild(ROUTES), FormsModule, ReactiveFormsModule, CommonModule]
})
export class NewEmployeeModule {}