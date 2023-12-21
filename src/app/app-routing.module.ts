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
import { AuthGuard } from './service/guard/auth.guard';
import { PostdetailComponent } from './discover/postdetail/postdetail.component';
import { DiscoverComponent } from './discover/discover.component';
import { SearchpageComponent } from './discover/searchpage/searchpage.component';
import { MycategoryComponent } from './mycategory/mycategory.component';
import { MyquestionComponent } from './mycategory/myquestion/myquestion.component';
import { MydocumentComponent } from './mycategory/mydocument/mydocument.component';
import { MypostComponent } from './mycategory/mypost/mypost.component';
import { MypostsavedComponent } from './mycategory/mypostsaved/mypostsaved.component';
import { ForumComponent } from './forum/forum.component';
import { ForumForyouComponent } from './forum/forum-foryou/forum-foryou.component';
import { ForumTopComponent } from './forum/forum-top/forum-top.component';
import { ForumNewComponent } from './forum/forum-new/forum-new.component';
import { QuestionComponent } from './forum/question/question.component';
import { MyquestionsavedComponent } from './mycategory/myquestionsaved/myquestionsaved.component';
import { NewsComponent } from './news/news.component';
import { DocumentComponent } from './document/document.component';
import { DocumentdetailComponent } from './document/documentdetail/documentdetail.component';
import { SearchquestionComponent } from './forum/searchquestion/searchquestion.component';
import { MydocumentsavedComponent } from './mycategory/mydocumentsaved/mydocumentsaved.component';
import { ExamComponent } from './exam/exam.component';
import { ExamdetailComponent } from './exam/examdetail/examdetail.component';
import { MyexamComponent } from './mycategory/myexam/myexam.component';

const routes: Routes = [
  {path: 'home', component:HomeComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'login', component:LoginComponent},
  {path: 'discover', component:DiscoverComponent},
  {path: 'search-posts', component: SearchpageComponent},
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
  {path: 'mycategory', 
    component: MycategoryComponent, canActivate: [AuthGuard] ,
    children: [
      { path: '', redirectTo: 'post', pathMatch: 'full',},
      { path: 'post', component: MypostComponent },
      { path: 'question', component: MyquestionComponent },
      { path: 'questionsaved', component: MyquestionsavedComponent },
      { path: 'document', component: MydocumentComponent },
      { path: 'postsaved', component: MypostsavedComponent },
      { path: 'documentsaved', component: MydocumentsavedComponent },
      { path: 'exam', component: MyexamComponent },
    ]
  },
  {path: 'forum', 
    component:ForumComponent,
    children: [
      { path: '', redirectTo: 'foryou', pathMatch: 'full',},
      { path: 'foryou', component: ForumForyouComponent },
      { path: 'top', component: ForumTopComponent },
      { path: 'new', component: ForumNewComponent },

    ]
  },
  {path: 'searchquestion', component: SearchquestionComponent},
  {path: 'forum/:id', component: QuestionComponent},
  {path: 'news', component:NewsComponent},
  {path: 'document', component:DocumentComponent},
  {path: 'document/:documentId', component: DocumentdetailComponent},
  {path: 'exam', component:ExamComponent},
  {path: 'exam/:examId', component: ExamdetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true} ), HttpClientModule],
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
