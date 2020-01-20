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
  
  //baseurl = 'http://localhost:8080/';


  constructor(private http: HttpClient) { }

  httpheaders  =  new HttpHeaders({
                            'Content-Type': 'application/json'
                          });
    loginRequest(loginDetails:User):Observable<User> {
      return this.http.post<User>(this.baseurl+'login', loginDetails,{headers:this.httpheaders})
      .pipe(catchError(this.handleError));
    }

  signupRequest(loginDetails:User):Observable<ResponseMessage> {
      // Returning text object
      // return this.http.post(this.baseurl+'signup', this.login,{headers:this.httpheaders, responseType:'text'});
      return this.http.post<ResponseMessage>(this.baseurl+'signup', loginDetails,{headers:this.httpheaders})
                      .pipe(catchError(this.handleError));
      }

    private  handleError(errorData : HttpErrorResponse){
               return throwError(errorData);
      }

    postMoment(username:string , moment:Moment){
      let url = this.baseurl +`${username}/moment`;
      return this.http.post<ResponseMessage>(url, moment,{headers:this.httpheaders})
      .pipe(catchError(this.handleError));

    }

    getMoment(username:string){
      let url = this.baseurl + `${username}/moment`;
      return this.http.get<Moment>(url)
      .pipe(catchError(this.handleError));

    }
}
