import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { IndexComponent } from './index/index.component';
import { AppRoutingModule } from './app.module.routing';
import { LoginComponent } from './login/login.component';
import { CommonModule} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { EmployeesService } from './services/employees.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginGuard } from './security/LoginGuard';
import { LoginService } from './services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    IndexComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [EmployeesService, LoginService, LoginGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
