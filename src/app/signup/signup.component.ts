import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: []
})
export class SignupComponent implements OnInit {

  constructor(public authService: AuthService) { }
  errorMessage:String = "abc";
  error = false;
  ngOnInit() {

  }

onSubmit(signupform: NgForm){
    const user = {username: signupform.value.username, password: signupform.value.password};
    this.authService.signupRequest(user);
    this.errorMessage = "error";
    this.error = true;

}
}
