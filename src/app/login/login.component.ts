import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  disableloginButton = false;
  constructor(public authService: AuthService) { }
  
  ngOnInit() {

  }

  onSubmit(loginform:NgForm){
    this.disableloginButton = true;
    console.log("login form submitted");
    const username = loginform.value.username;
    const password = loginform.value.password;
    this.authService.loginRequest({"username":username, "password":password});
    if(this.authService.loginError){
      this.disableloginButton = false;
    }
    }
}
