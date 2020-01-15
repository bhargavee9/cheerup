import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DisplayComponent} from './display/display.component';
import {EnterComponent} from './enter/enter.component';
import {SignupComponent} from './signup/signup.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"display", component:DisplayComponent},
  {path: "enter", component:EnterComponent},
  {path: "signup", component:SignupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
