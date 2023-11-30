import { Component, OnInit } from '@angular/core';
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
  constructor(private router: Router, private service: PublicserviceService, private dataService: DataService,
    private session: SessionService, private toastr: ToastrService,private animationService: AnimationService,
     ) {
    this.GetQuestion();
  }
  ngOnInit(){
    this.animationService.attachAnimationListener_btn2();
  }
  GetQuestion() {
    this.service.GetQuestionForYou().subscribe(
      (data: any) => {
        this.questions = data.resultObj;
        console.log(this.questions);
      }, (error: any) => {
        this.toastr.error("Lỗi: "+ error);
      }
    )
  }
  redirectToQuestion( question: PostResponse) {
    this.dataService.changeIdQuestion(question.id);
    this.router.navigate(['/forum', question.subId]);
  }
}
