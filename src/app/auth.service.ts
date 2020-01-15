import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { User } from './model/User';
import { throwError , Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubject = new Subject<User>();
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
      console.log(err.error);
      this.loginError = err.error.message;
      console.log(this.loginError);
    })


    } 

    
  signupRequest(signUpUser:User){
    this.signUpErrorMessage= "";
    this.httpService.signupRequest(signUpUser).subscribe(
      data=>{
         this.signupComplete = true;
         this.router.navigate(['/login']);
        },
      err=>{
          this.signUpErrorMessage =err.error.message;
          console.log(this.signUpErrorMessage);

     })
}
}


