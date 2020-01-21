import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { User } from './model/User';
import {ResponseMessage} from './model/ResponseMessage';
import { throwError , Subject, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubject = new BehaviorSubject<User>(null);
  signupComplete = false;
  signUpErrorMessage = "";
  loginError = "";
  constructor(private httpService: HttpService, private router:Router) 
  {
    
  }

  ngOnInit(){
    this.signupComplete = false;

  }

  loginRequest(loginUser:User){
    this.httpService.loginRequest(loginUser).subscribe(data=>{
       this.loginError = "";
       const user = {username:data.username, password: data.password};
       this.userSubject.next(user);
       console.log(user.username);
       this.router.navigate(['/enter']);
    },
    err=>{
      console.log("this.httpservice.error");
      console.log(this.httpService.error);
      this.loginError = this.httpService.error;
      console.log(this.loginError);
    })


    } 

    
  signupRequest(signUpUser:User){
    this.loginError = "";
    this.signUpErrorMessage= "";
    this.httpService.signupRequest(signUpUser).subscribe(
      data=>{
         this.signupComplete = true;
         this.router.navigate(['/login']);
        },
      err=>{
          this.signUpErrorMessage = this.httpService.error;
          console.log(this.signUpErrorMessage);

     })
}
}


