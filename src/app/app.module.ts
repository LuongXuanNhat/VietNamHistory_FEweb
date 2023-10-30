import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from 'src/material.module';
import { ReactiveFormsModule} from '@angular/forms'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './account/account/register/register.component';
import { LoginComponent } from './account/account/login/login.component';
import { HomeComponent } from './home/home.component';
import { JwtModule } from '@auth0/angular-jwt';
import { IntroduceComponent } from './account/introduce/introduce.component';
import { IndexComponent } from './home/index/index.component';
import { AccountComponent } from './account/account/account.component';
import { ForgetpassComponent } from './account/forgetpass/forgetpass.component';
import { CategoryComponent } from './account/category/category.component';
import { UpdateuserinforComponent } from './account/updateuserinfor/updateuserinfor.component';
import { ChangeemailComponent } from './account/changeemail/changeemail.component';
import { ChangepasswordComponent } from './account/changepassword/changepassword.component';
import { UpdateaccountComponent } from './account/updateaccount/updateaccount.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    IntroduceComponent,
    IndexComponent,
    AccountComponent,
    ForgetpassComponent,
    CategoryComponent,
    UpdateuserinforComponent,
    ChangeemailComponent,
    ChangepasswordComponent,
    UpdateaccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right', 
      preventDuplicates: true, 
      closeButton: true, 
    }),
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return sessionStorage.getItem('access_token');
        },
        allowedDomains: ['https://localhost:7138'],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
