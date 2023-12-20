import { Component } from '@angular/core';
import { PublicserviceService } from '../service/publicservice.service';
import { MultipleChoiceResponseDto } from '../ObjectClass/object';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.css']
})
export class ExamComponent {
  keyWord!: string | null;
  exams!: MultipleChoiceResponseDto[];
  countResult!: number;

  constructor(private service: PublicserviceService, private router: Router, ){
    this.getExams();
  }


  search(){
    if(this.keyWord?.trim()){
      this.service.ExamSearch(this.keyWord).subscribe(
        (data: any)=>{
          if(data.isSuccessed){
            this.exams = data.resultObj;
            this.countResult = this.exams.length;
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
