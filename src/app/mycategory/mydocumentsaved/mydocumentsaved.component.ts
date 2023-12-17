import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { DocumentResponseDto } from 'src/app/ObjectClass/object';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { SessionService } from 'src/app/service/session/session.service';

@Component({
  selector: 'app-mydocumentsaved',
  templateUrl: './mydocumentsaved.component.html',
  styleUrls: ['./mydocumentsaved.component.css']
})
export class MydocumentsavedComponent {
  userId: string ;
  documents: DocumentResponseDto[] = [];

  constructor(private router: Router, private service: PublicserviceService, private dataService: DataService,
    private session: SessionService, private toastr: ToastrService){
      this.userId = session.getUserId() ?? '';
      this.GetMyDocument();
  }
  GetMyDocument(){
    this.service.GetMyDocumentSaved().subscribe(
      (data: any) => {
        this.documents = data.resultObj;
        this.ConvertDate();
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
  documentDetail(question: DocumentResponseDto) {
    const documentId = question.subId;
    this.router.navigate(['/document', documentId]);
  }
  IsSave(document:DocumentResponseDto, event: Event){
    const formData = new FormData();
    formData.append('DocumentId', document.id ?? '');
    formData.append('UserId', this.session.getUserId() ?? '');
    this.service.SaveOrUnSaveDocument(formData).subscribe(
      (data: any) => {
        this.GetMyDocument();
      }
    )
  }
}
