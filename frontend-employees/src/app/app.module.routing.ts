import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { NgModule } from '@angular/core';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { LoginGuard } from './security/LoginGuard';

const routes: Routes = [
    {path: '', component: IndexComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', loadChildren: './home/home.module#HomeModule', 
        canLoad: [LoginGuard],
        canActivate: [LoginGuard]
    },
    {path: 'employees', loadChildren: './employees/employees.module#EmployeesModule', 
        canLoad: [LoginGuard],
        canActivate: [LoginGuard]
    },
    {path: 'new-employee', loadChildren: './new-employee/new-employee.module#NewEmployeeModule', 
        canLoad: [LoginGuard],
        canActivate: [LoginGuard]
    },
    {path: 'employee-detail/:id', loadChildren: './employee-detail/employee-detail.module#EmployeeDetailModule', 
        canLoad: [LoginGuard],
        canActivate: [LoginGuard]
    },
    {path: 'statistics', loadChildren: './statistics/statistics.module#StatisticsModule', 
        canLoad: [LoginGuard],
        canActivate: [LoginGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule, CommonModule]
})
export class AppRoutingModule {}