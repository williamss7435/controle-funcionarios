import { NgModule } from "@angular/core";
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

const ROUTES: Routes = [
    {path: '', component: HomeComponent}
]

@NgModule({
    declarations: [HomeComponent],
    imports: [RouterModule.forChild(ROUTES), CommonModule]
})
export class HomeModule{}