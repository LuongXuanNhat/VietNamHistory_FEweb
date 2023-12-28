import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { ExamHistoryResponseDto, MultipleChoiceResponseDto } from 'src/app/ObjectClass/object';
import { Constant } from 'src/app/service/constant';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { SessionService } from 'src/app/service/session/session.service';

@Component({
  selector: 'app-myexamhistory',
  templateUrl: './myexamhistory.component.html',
  styleUrls: ['./myexamhistory.component.css']
})
export class MyexamhistoryComponent {
  examhistories!: ExamHistoryResponseDto[];
  dataSource = new MatTableDataSource<ExamHistoryResponseDto>([]);
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['title', 'numberQuiz', 'Scores','CompletionTime','StarDate'];
  userId: string;

  constructor(private service: PublicserviceService,private session: SessionService,private router: Router,
    ){
    this.userId = session.getUserId() ?? '';
    this.GetMyExamHistory();
    this.dataSource.sort = this.sort;
  }
  GetMyExamHistory() {
    this.service.GetMyExamHistory().subscribe(
      (data: any) => {
        this.examhistories = data.resultObj;
        this.ConvertDate();
        this.dataSource = new MatTableDataSource(this.examhistories);
        this.dataSource.sort = this.sort;
      }
    ),
    (error: any) => {
      console.log(error);
    }
  }
  ConvertDate() {
    this.examhistories.forEach(element => {
      if(element){
        const parsedDate = parseISO(element.starDate ?? '');
        if (!isNaN(parsedDate.getTime())) {
          element.starDate = format(parsedDate, 'dd-MM-yyyy');
        }
      }
    });
  }
  ExamDetail(exam: MultipleChoiceResponseDto) {
    const questionId = exam.id;
    this.router.navigate(['/exam', questionId]);
  }
  isCheckAdmin(){
    return this.session.getRole() === Constant.adminRole;
  }
}
