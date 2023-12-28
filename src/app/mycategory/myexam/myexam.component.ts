import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { MultipleChoiceResponseDto } from 'src/app/ObjectClass/object';
import { UpdateexamComponent } from 'src/app/exam/updateexam/updateexam.component';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { SessionService } from 'src/app/service/session/session.service';

@Component({
  selector: 'app-myexam',
  templateUrl: './myexam.component.html',
  styleUrls: ['./myexam.component.css']
})
export class MyexamComponent {
  userId: string ;
  dataSource = new MatTableDataSource<MultipleChoiceResponseDto>([]);
  documents: MultipleChoiceResponseDto[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['title', 'description', 'createdAt','updatedAt'];

  constructor(private router: Router, private service: PublicserviceService, private dataService: DataService,
    private session: SessionService, private toastr: ToastrService,private dialog: MatDialog){
      this.userId = session.getUserId() ?? '';
      this.GetMyExam();
  }
  ngOnInit() {
    if(this.session.getRole() != 'admin'){
      this.router.navigate(['mycategory/exam']);
    }
    this.dataSource.sort = this.sort;
  }
  GetMyExam(){
    this.service.GetMyExam().subscribe(
      (data: any) => {
        this.documents = data.resultObj;
        this.ConvertDate();
        this.dataSource = new MatTableDataSource(this.documents);
        this.dataSource.sort = this.sort;
      }
    ),
    (error: any) => {
      console.log(error);
    }
  }
  ConvertDate() {
    this.documents.forEach(element => {
      if(element){
        const parsedDate = parseISO(element.createdAt ?? '');
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
  ExamDetail(exam: MultipleChoiceResponseDto) {
    const examId = exam.id;
    this.router.navigate(['/exam', examId]);
  }
  updateExam(exam: MultipleChoiceResponseDto){
    const examId = exam.id;
    this.router.navigate(['/exam/edit', examId]);
  }
  deleteExam(exam: MultipleChoiceResponseDto){
    const examId = exam.id;
    this.service.DeleteExam(examId).subscribe(
      (data: any) => {
        if(data.isSuccessed){
          this.toastr.success("Đã xóa bài viết");
          window.location.reload();
        } else {
          this.toastr.error("Lỗi: " + data.message);
        }
      }, (error: any) => {
        this.toastr.error("Lỗi: "+ error);
      }
    )

  }
}
