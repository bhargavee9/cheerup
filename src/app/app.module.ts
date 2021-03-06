import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EnterComponent } from './enter/enter.component';
import { DisplayComponent } from './display/display.component';
import { SignupComponent } from './signup/signup.component';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { DisplayallComponent } from './displayall/displayall.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EnterComponent,
    DisplayComponent,
    SignupComponent,
    DisplayallComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AuthService,HttpService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
