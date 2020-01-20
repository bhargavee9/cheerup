import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Moment} from '../model/Moment';
import { HttpService } from '../http.service';
import { AuthService } from '../auth.service';
import { User } from '../model/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: []
})
export class DisplayComponent implements OnInit {

  user:User;
  status:String = "";
  feeling:String = "";
  description:String="";
  constructor(public authService:AuthService, public httpService: HttpService, public router:Router) { }

  ngOnInit() {
    console.log("Enter component ngOnInit");
    this.authService.userSubject.subscribe(user=>{
       this.user = user;
    });

  }
  remind(){
    status = "";
    this.httpService.getMoment(this.user.username).subscribe(
      data=>{
         this.feeling= data.feeling;
         this.description = data.description;
        },
      err=>{
          this.status =err.error.message;
          if(this.status){
            this.status = "Unknown error while retrieving data !Try again later"
          }
     }) 


  }
}
