import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { PostResponse } from 'src/app/ObjectClass/object';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { SessionService } from 'src/app/service/session/session.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UpdatepostComponent } from 'src/app/discover/updatepost/updatepost.component';
import { ForumUpdateComponent } from 'src/app/forum/forum-update/forum-update.component';

@Component({
  selector: 'app-myquestion',
  templateUrl: './myquestion.component.html',
  styleUrls: ['./myquestion.component.css'],
})
export class MyquestionComponent implements OnInit {
  userId: string;
  dataSource = new MatTableDataSource<PostResponse>([]);
  questions: PostResponse[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'title',
    'createdAt',
    'updatedAt',
    'viewNumber',
    'likeNumber',
    'commentNumber',
    'saveNumber',
  ];

  constructor(
    private router: Router,
    private service: PublicserviceService,
    private dataService: DataService,
    private session: SessionService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {
    this.userId = session.getUserId() ?? '';
    this.GetMyQuestion();
  }
  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
  GetMyQuestion() {
    this.service.GetMyQuestion().subscribe((data: any) => {
      this.questions = data.resultObj;
      this.ConvertDate();
      this.dataSource = new MatTableDataSource(this.questions);
      this.dataSource.sort = this.sort;
    }),
      (error: any) => {
        console.log(error);
      };
  }
  ConvertDate() {
    this.questions.forEach((element) => {
      if (element) {
        const parsedDate = parseISO(element.createdAt);
        const parsedDate2 = parseISO(element.updatedAt ?? '');

        if (!isNaN(parsedDate.getTime())) {
          element.createdAt = format(parsedDate, 'dd-MM-yyyy');
        }
        if (!isNaN(parsedDate2.getTime())) {
          element.updatedAt = format(parsedDate2, 'dd-MM-yyyy');
        }
      }
    });
  }
  QuestionDetail(question: PostResponse) {
    const questionId = question.subId;
    this.router.navigate(['/forum', questionId]);
  }
  updateQuestion(question: PostResponse) {
    this.dataService.changeSubId(question.subId);
    this.openDialogUpdateQuestion('100ms', '600ms');
  }
  deleteQuestion(id: string) {
    this.service.deleteQuestion(id).subscribe(
      (data: any) => {
        if (data.isSuccessed) {
          this.toastr.success('Xóa câu hỏi thành công');
          // this.questions = this.questions.filter(question => question.id !== id);
           window.location.reload();
        } else {
          this.toastr.error('Lỗi: ' + data.message);
        }
      },
      (error: any) => {
        this.toastr.error('Lỗi: ' + error);
      }
    );
  }
  openDialogUpdateQuestion(enteranimation: any, exitanimation: any) {
    const popup = this.dialog.open(ForumUpdateComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '50%',
    });
  }
}
