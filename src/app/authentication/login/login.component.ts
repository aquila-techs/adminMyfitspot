import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  body = {email: '',password: ''} 

  constructor(private authSer: AuthenticationService,private router:Router) { }
  
  login() {
    if (this.body.email && this.body.password) {
      this.authSer.login(this.body).subscribe(res => {
        console.log(res);
        if (res.success == true) {
          localStorage.setItem('fat', res.token);
          this.router.navigate(['/']);          
        }

      })
    }
  }




}
