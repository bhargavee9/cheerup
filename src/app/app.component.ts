import { Component } from '@angular/core';
import {AuthService} from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {
  title = 'cheerup';
  isauthenticated = false;
  constructor(private authService:AuthService, private router: Router){

  }
  ngOnInit(){
    console.log("ngon init appcomponent");
     this.authService.userSubject.subscribe(user=>{
     //  console.log("subscribed user "+user.username);
      this.isauthenticated = !!user;
      //console.log("authenticated " +this.isauthenticated);
     },
     err=>{
       console.log("error");
     });
  }

  logout(){
    this.authService.userSubject.next(null);
    this.isauthenticated = false;
    this.router.navigate(["/login"]);
  }
}
 