import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostResponse } from 'src/app/ObjectClass/object';
import { AnimationService } from 'src/app/service/animations/animation.service';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { SessionService } from 'src/app/service/session/session.service';

@Component({
  selector: 'app-forum-foryou',
  templateUrl: './forum-foryou.component.html',
  styleUrls: ['./forum-foryou.component.css']
})
export class ForumForyouComponent implements OnInit {
  questions!: PostResponse[];
  questionNews: PostResponse[] = [];
  currentPage: number = 1;
  pageSize: number = 3;
  
  constructor(private router: Router, private service: PublicserviceService, private dataService: DataService,
    private session: SessionService, private toastr: ToastrService,private animationService: AnimationService,
     ) {
    this.GetQuestions();
  }
  ngOnInit(){
    this.animationService.attachAnimationListener_btn2();
  }
  GetQuestions() {
    this.service.GetQuestionForYou().subscribe(
      (data: any) => {
        this.questions = data.resultObj;
        this.updatePagedQuestions()
      }, (error: any) => {
        this.toastr.error("Lỗi: "+ error);
      }
    )
  }
  redirectToQuestion( question: PostResponse) {
    this.dataService.changeIdQuestion(question.id);
    this.router.navigate(['/forum', question.subId]);
  }

  pageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.updatePagedQuestions();
  }
  updatePagedQuestions() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.questionNews = this.questions.slice(startIndex, endIndex);
  }
}
