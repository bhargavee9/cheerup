import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import {User} from "./model/User";
import {Moment} from "./model/Moment";
import {catchError} from 'rxjs/operators';
import {ResponseMessage} from "./model/ResponseMessage";
@Injectable({
  providedIn: 'root'
})
export class HttpService{

  baseurl = 'https://cheerupbackend.herokuapp.com/';
  
 // baseurl = 'http://localhost:8080/';
  error = "";

  constructor(private http: HttpClient) { }

  httpheaders  =  new HttpHeaders({
                            'Content-Type': 'application/json'
                          });
    loginRequest(loginDetails:User):Observable<User> {
      this.error = "";
      return this.http.post<User>(this.baseurl+'login', loginDetails,{headers:this.httpheaders})
      .pipe(catchError((err: any) => { 
        return this.handleError(err); } ) );
    }

  signupRequest(loginDetails:User):Observable<ResponseMessage> {
      // Returning text object
      // return this.http.post(this.baseurl+'signup', this.login,{headers:this.httpheaders, responseType:'text'});
      this.error = "";
      return this.http.post<ResponseMessage>(this.baseurl+'signup', loginDetails,{headers:this.httpheaders})
      .pipe(catchError((err: any) => { 
        return this.handleError(err); } ) );
      }

    postMoment(username:string , moment:Moment){
      this.error = "";
      let url = this.baseurl +`${username}/moment`;
      return this.http.post<ResponseMessage>(url, moment,{headers:this.httpheaders})
      .pipe(catchError((err: any) => { 
        return this.handleError(err); } ) );

    }

    getMoment(username:string){
      this.error = "";
      let url = this.baseurl + `${username}/moment`;
      return this.http.get<Moment>(url)
      .pipe(catchError((err: any) => { 
        return this.handleError(err); } ) );

    }

    private  handleError(errorData : HttpErrorResponse){
       
       if(!(errorData.error instanceof ResponseMessage)){
          this.error = "Unknown error. Pls contact admin";
       }
       if(errorData.error.messageCode === "CHEERUP001")
        {
          this.error = "USER already exists. Pls try logging in. !";
        }
        if(errorData.error.messageCode === "CHEERUP002")
        {
          this.error = "Username/password invalid. Please signup if you are not registered yet !";
        }
        if(errorData.error.messageCode === "CHEERUP003")
        {
          this.error = "No moments to show. Pls enter a moment and try again !";
        }
        console.log(this.error);
        return throwError(errorData);
}
}
