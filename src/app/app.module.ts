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
import { ReportpostComponent } from './discover/reportpost/reportpost.component';
import { ChatComponent } from './discover/chat/chat.component';
import { UpdatepostComponent } from './discover/updatepost/updatepost.component';
import { HammerModule, HammerGestureConfig  } from '@angular/platform-browser';
import { OverlayModule, ScrollStrategyOptions } from '@angular/cdk/overlay';
import { SearchpageComponent } from './discover/searchpage/searchpage.component';
import { ClipboardModule } from 'ngx-clipboard';
import { MycategoryComponent } from './mycategory/mycategory.component';
import { MypostComponent } from './mycategory/mypost/mypost.component';
import { MydocumentComponent } from './mycategory/mydocument/mydocument.component';
import { MyquestionComponent } from './mycategory/myquestion/myquestion.component';
import { MypostsavedComponent } from './mycategory/mypostsaved/mypostsaved.component';
import { ForumComponent } from './forum/forum.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { 	IgxCarouselModule,	IgxSliderModule } from "igniteui-angular";
import { FooterComponent } from './home/footer/footer.component';
import { ScrollDirective } from './service/scroll.directive';
import { ForumForyouComponent } from './forum/forum-foryou/forum-foryou.component';
import { ForumTopComponent } from './forum/forum-top/forum-top.component';
import { ForumNewComponent } from './forum/forum-new/forum-new.component';
import { ForumCreateComponent } from './forum/forum-create/forum-create.component';
import { QuestionComponent } from './forum/question/question.component';
import { DocumentComponent } from './document/document.component';
import { ForumUpdateComponent } from './forum/forum-update/forum-update.component';
import { QuestionReportComponent } from './forum/questionreport/questionreport.component';


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
    ReportpostComponent,
    ChatComponent,
    UpdatepostComponent,
    SearchpageComponent,
    MycategoryComponent,
    MypostComponent,
    MydocumentComponent,
    MyquestionComponent,
    MypostsavedComponent,
    ForumComponent,
    CarouselComponent,
    FooterComponent,
    ScrollDirective,
    ForumForyouComponent,
    ForumTopComponent,
    ForumNewComponent,
    ForumCreateComponent,
    QuestionComponent,
    DocumentComponent,
    ForumUpdateComponent,
    QuestionComponent,
    QuestionReportComponent ,
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
        allowedDomains: ['https://localhost:7138', 'https://vuanhpham25-001-site1.gtempurl.com'],
      },
    }),
    HammerModule,
    OverlayModule,
    ClipboardModule,
    ReactiveFormsModule,
    IgxCarouselModule,
	  IgxSliderModule,

  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},
    SessionService,
    [DatePipe],
    { provide: HAMMER_GESTURE_CONFIG, useClass: HammerGestureConfig },
    { provide: ScrollStrategyOptions, useClass: ScrollStrategyOptions },
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
