import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostResponse } from 'src/app/ObjectClass/object';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { SessionService } from 'src/app/service/session/session.service';

@Component({
  selector: 'app-forum-foryou',
  templateUrl: './forum-foryou.component.html',
  styleUrls: ['./forum-foryou.component.css']
})
export class ForumForyouComponent {
  questions!: PostResponse[];
  constructor(private router: Router, private service: PublicserviceService, private dataService: DataService,
    private session: SessionService, private toastr: ToastrService) {
    this.GetQuestion();
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
