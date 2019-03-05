import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

@Injectable()
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      user: this.fb.control('', [Validators.required,Validators.minLength(1)]),
      password: this.fb.control('', [Validators.required,Validators.minLength(1)])
    });

  }

  onSubmit(){
    this.loginService.login(this.loginForm.value.user, this.loginForm.value.password).subscribe(a => {
      this.router.navigate(['/home']);
    }, error => {
      console.log("erro");
    });
  }

  f(){
    return this.loginForm.controls;
  }

}
