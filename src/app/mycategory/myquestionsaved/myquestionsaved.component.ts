import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { PostResponse } from 'src/app/ObjectClass/object';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { SessionService } from 'src/app/service/session/session.service';

@Component({
  selector: 'app-myquestionsaved',
  templateUrl: './myquestionsaved.component.html',
  styleUrls: ['./myquestionsaved.component.css']
})
export class MyquestionsavedComponent {
  userId: string ;
  questions: PostResponse[] = [];

  constructor(private router: Router, private service: PublicserviceService, private dataService: DataService,
    private session: SessionService, private toastr: ToastrService,private dialog: MatDialog){
      this.userId = session.getUserId() ?? '';
      this.GetMyQuestion();
  }
  GetMyQuestion(){
    this.service.GetMyQuestionSaved().subscribe(
      (data: any) => {
        this.questions = data.resultObj;
        this.ConvertDate();
      }
    ),
    (error: any) => {
      console.log(error);
    }
  }
  ConvertDate() {
    this.questions.forEach(element => {
      if(element){
        const parsedDate = parseISO(element.createdAt);
        const parsedDate2 = parseISO(element.updatedAt ?? "");

        if (!isNaN(parsedDate.getTime())) {
          element.createdAt = format(parsedDate, 'dd-MM-yyyy');
        }
        if (!isNaN(parsedDate2.getTime())) {
          element.updatedAt = format(parsedDate2, 'dd-MM-yyyy');
        }
      }
    });
  }
  postDetail(question: PostResponse) {
    const questionId = question.subId;
    this.router.navigate(['/forum', questionId]);
  }
  IsSave(question:PostResponse, event: Event){
    const formData = new FormData();
    formData.append('QuestionId', question.id);
    formData.append('UserId', this.session.getUserId() ?? '');
    this.service.SaveOrUnSaveQuestion(formData).subscribe(
      (data: any) => {
        this.GetMyQuestion();
      }
    )
  }
}
