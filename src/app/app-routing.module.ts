import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DisplayComponent} from './display/display.component';
import {EnterComponent} from './enter/enter.component';
import {SignupComponent} from './signup/signup.component';
import {AuthGuard} from './auth.guard';
const routes: Routes = [

  {path:"login", component:LoginComponent},
  {path:"display", canActivate:[AuthGuard] ,component:DisplayComponent},
  {path: "enter", canActivate:[AuthGuard],component:EnterComponent},
  {path: "signup", component:SignupComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
