import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { DocumentResponseDto, PostResponse } from 'src/app/ObjectClass/object';
import { UpdatedocumentComponent } from 'src/app/document/updatedocument/updatedocument.component';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { SessionService } from 'src/app/service/session/session.service';

@Component({
  selector: 'app-mydocument',
  templateUrl: './mydocument.component.html',
  styleUrls: ['./mydocument.component.css']
})
export class MydocumentComponent {
  userId: string ;
  dataSource = new MatTableDataSource<DocumentResponseDto>([]);
  documents: DocumentResponseDto[] = [];
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['title', 'description', 'createdAt','updatedAt','viewNumber', 'saveNumber'];

  constructor(private router: Router, private service: PublicserviceService, private dataService: DataService,
    private session: SessionService, private toastr: ToastrService,private dialog: MatDialog){
      this.userId = session.getUserId() ?? '';
      this.GetMyDocument();
  }
  ngOnInit() {
    this.dataSource.sort = this.sort;
  }
  GetMyDocument(){
    this.service.GetMyDocument().subscribe(
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
  DocumentDetail(document: PostResponse) {
    const documentId = document.subId;
    this.router.navigate(['/document', documentId]);
  }
  UpdateQuestion(document: PostResponse){
    this.dataService.changeSubId(document.subId);
    this.openDialogUpdateQuestion('100ms', '600ms');
  }
  openDialogUpdateQuestion(enteranimation: any, exitanimation: any){
    this.dialog.open(UpdatedocumentComponent
      , {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '50%'
    });
  }
  DeleteDocument(document: PostResponse){
    const documentId = document.subId;
    this.service.DeleteDocument(documentId).subscribe(
      (data: any) => {
        if(data.isSuccessed){
          this.toastr.success("Đã xóa tài liệu");
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
