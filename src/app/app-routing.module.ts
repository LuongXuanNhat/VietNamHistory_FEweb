import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './account/account/register/register.component';
import { LoginComponent } from './account/account/login/login.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './service/auth/auth.interceptor';
import { AccountComponent } from './account/account/account.component';
import { UpdateuserinforComponent } from './account/updateuserinfor/updateuserinfor.component';
import { UpdateaccountComponent } from './account/updateaccount/updateaccount.component';
import { IntroduceComponent } from './account/introduce/introduce.component';
import { ChangeemailComponent } from './account/updateaccount/changeemail/changeemail.component';
import { ChangepasswordComponent } from './account/updateaccount/changepassword/changepassword.component';
import { AuthGuard } from './guard/auth.guard';
import { PostdetailComponent } from './discover/postdetail/postdetail.component';
import { DiscoverComponent } from './discover/discover.component';
import { SearchpageComponent } from './discover/searchpage/searchpage.component';
import { MycategoryComponent } from './mycategory/mycategory.component';
import { MyquestionComponent } from './mycategory/myquestion/myquestion.component';
import { MydocumentComponent } from './mycategory/mydocument/mydocument.component';
import { MypostComponent } from './mycategory/mypost/mypost.component';
import { MypostsavedComponent } from './mycategory/mypostsaved/mypostsaved.component';
import { ForumComponent } from './forum/forum.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'login', component:LoginComponent},
  {path: 'discover', component:DiscoverComponent},
  {path: 'discover/:postId', component: PostdetailComponent},
  {
    path: 'account',
    component: AccountComponent, canActivate: [AuthGuard] ,
    children: [
      { path: '', redirectTo: 'updateuserinfor', pathMatch: 'full',},
      { path: 'updateuserinfor', component: UpdateuserinforComponent },
      { path: 'updateaccount', component: UpdateaccountComponent },
      { path: 'introduce', component: IntroduceComponent },
      { path: 'changeemail', component: ChangeemailComponent },
      { path: 'changepassword', component: ChangepasswordComponent },
    ]
  },
  {path: 'search-posts', component: SearchpageComponent},
  {path: 'mycategory', 
    component: MycategoryComponent, canActivate: [AuthGuard] ,
    children: [
      { path: '', redirectTo: 'post', pathMatch: 'full',},
      { path: 'post', component: MypostComponent },
      { path: 'question', component: MyquestionComponent },
      { path: 'document', component: MydocumentComponent },
      { path: 'postsaved', component: MypostsavedComponent },
      // { path: 'exercise', component: UpdateuserinforComponent },
    ]
  },
  {path: 'forum', component:ForumComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes), HttpClientModule],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AppRoutingModule { }
