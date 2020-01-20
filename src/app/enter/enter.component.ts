import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Moment} from '../model/Moment';
import { HttpService } from '../http.service';
import { AuthService } from '../auth.service';
import { User } from '../model/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: []
})
export class EnterComponent implements OnInit {
 // username:string = "topvalue";
  user:User;
  status = "";
  constructor(public authService:AuthService, public httpService: HttpService, public router:Router) { }

  ngOnInit() {
    console.log("Enter component ngOnInit");
    this.authService.userSubject.subscribe(user=>{

     //  console.log("**************"+user.username);
     this.user = user;
       console.log(this);
    });

  }


  onSubmit(enterForm:NgForm){
    status = "";
    const feeling = enterForm.value.selectedfeeling;
    const comment = enterForm.value.comment;
    let moment:Moment = new Moment();
    moment.feeling = feeling;
    moment.description = comment;
    this.httpService.postMoment(this.user.username,moment).subscribe(
      data=>{
         enterForm.reset();
         status = "This moment is saved ! ";
         this.router.navigate(['/enter']);
        },
      err=>{
          this.status =err.error.message;
          if(this.status){
            this.status = "Unknown error while saving data !Try again later"
          }
     })

  }
}
