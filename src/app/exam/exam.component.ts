import { Component } from '@angular/core';
import { PublicserviceService } from '../service/publicservice.service';
import { MultipleChoiceResponseDto } from '../ObjectClass/object';
import { Router } from '@angular/router';
import { SessionService } from '../service/session/session.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent {
  keyWord!: string | null;
  exams!: MultipleChoiceResponseDto[];
  countResult!: number;

  constructor(private service: PublicserviceService, private router: Router,private session: SessionService ){
    this.keyWord = session.getKeyWordDocument();
    if(this.keyWord)
      this.search();
    else
      this.getExams();
  }


  search(){
    if(this.keyWord && this.keyWord.trim()){
      this.service.ExamSearch(this.keyWord).subscribe(
        (data: any)=>{
          if(data.isSuccessed){
            this.session.setKeyWordDocument(this.keyWord ?? '');
            this.exams = data.resultObj;
          }
        }
      )
    } else {
      this.getExams();
    }
  }
  getExams() {
    this.service.GetExam().subscribe(
      (result: any) => {
        this.exams = result.resultObj;
      },
      (error) => {
        console.error('Lỗi lấy danh sách:', error);
      }
    )
  }
  GetExamDetail(exam: MultipleChoiceResponseDto) {
    const examId = exam.id;
    this.router.navigate(['/exam', examId]);
  }
}
