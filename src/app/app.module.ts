import { NgModule } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
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
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { IntroduceComponent } from './account/introduce/introduce.component';
import { IndexComponent } from './home/index/index.component';
import { AccountComponent } from './account/account/account.component';
import { ForgetpassComponent } from './account/forgetpass/forgetpass.component';
import { CategoryComponent } from './account/category/category.component';
import { UpdateuserinforComponent } from './account/updateuserinfor/updateuserinfor.component';
import { UpdateaccountComponent } from './account/updateaccount/updateaccount.component';
import { DiscoverComponent } from './discover/discover.component';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { ChangeemailComponent } from './account/updateaccount/changeemail/changeemail.component';
import { ChangepasswordComponent } from './account/updateaccount/changepassword/changepassword.component';
import { SessionService } from './service/session/session.service';
import { CreatepostComponent } from './discover/createpost/createpost.component';
import { DatePipe } from '@angular/common';
import { PostdetailComponent } from './discover/postdetail/postdetail.component';
import { CardpostmoreComponent } from './discover/cardpostmore/cardpostmore.component';
import { InteractComponent } from './discover/interact/interact.component';
import { ReportpostComponent } from './discover/reportpost/reportpost.component';
import { ChatComponent } from './discover/chat/chat.component';
import { UpdatepostComponent } from './discover/updatepost/updatepost.component';
import { HammerGestureConfigComponent } from './hammer-gesture-config/hammer-gesture-config.component';
import { HammerModule, HammerGestureConfig  } from '@angular/platform-browser';


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
    UpdateaccountComponent,
    DiscoverComponent,
    ChangeemailComponent,
    ChangepasswordComponent,
    CreatepostComponent,
    PostdetailComponent,
    CardpostmoreComponent,
    InteractComponent,
    ReportpostComponent,
    ChatComponent,
    UpdatepostComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'custom-toast', 
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
    HammerModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    SessionService,
    [DatePipe],
    HammerGestureConfig,
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
