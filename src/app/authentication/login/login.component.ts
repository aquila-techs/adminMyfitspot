import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  body = { email: '', password: '' }
  loginForm: FormGroup;
  alertError: { type: string; msg: string; display: boolean } = { type: '', msg: '', display: false };
  constructor(
    private authSer: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    console.log('init login page');
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
    console.log(this.loginForm.value);
  }

  get f() {
    return this.loginForm.controls;
  }

  login() {
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
      this.alertError = { type: 'danger', msg: 'Please enter proper values for mandatory fields', display: true };
      return;
    }
    this.alertError.display = false;
    if (this.body.email && this.body.password) {
      this.authSer.login(this.body).subscribe(res => {
        console.log(res);
        if (res.success == true) {
          localStorage.setItem('fat', res.token);
          this.router.navigate(['/']);
        }
      }, err => {
        console.log(err.error.message);
        this.alertError = { type: 'danger', msg: `${err.error.message}`, display: true };
      })
    }
  }
}
