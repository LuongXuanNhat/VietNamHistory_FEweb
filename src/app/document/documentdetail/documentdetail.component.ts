import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';
import { DocumentResponseDto } from 'src/app/ObjectClass/object';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { SessionService } from 'src/app/service/session/session.service';
import { UpdatedocumentComponent } from '../updatedocument/updatedocument.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-documentdetail',
  templateUrl: './documentdetail.component.html',
  styleUrls: ['./documentdetail.component.css']
})
export class DocumentdetailComponent { 
  currentUrl: string = '';
  documentId: any;
  documentSubId: any;
  document!: DocumentResponseDto;
  saveNumber: number = 0;
  isSave: boolean | null = null;

  constructor(private session: SessionService,private route: ActivatedRoute, 
    private service: PublicserviceService, private  toastr: ToastrService,private clipboardService: ClipboardService,
    private location: Location,  private dataService: DataService, private dialog: MatDialog ){
    this.route.params.subscribe(params => {
      this.currentUrl = this.location.path();
      this.documentSubId = params['documentId'] ?? '';
      this.getSave();
    });
    this.getDetail();  
  }
  getSave() {
    this.service.GetSaveDoc(this.documentSubId, this.session.getUserId() || '').subscribe(
      (result: any) => {
          this.isSave = result.resultObj.check;
          this.saveNumber = result.resultObj.quantity;
      },
      (error: any) => {
          console.error(error);
      }
    );
  }
  IsSave(){
    if(!this.session.getUserId()){
      this.toastr.info("Bạn cần đăng nhập!");
      return;
    }
    const formData = new FormData();
    formData.append('DocumentId', this.documentSubId);
    formData.append('UserId', this.session.getUserId() ?? '');
    this.service.SaveOrUnSaveDocument(formData).subscribe(
      (data: any) => {
        const obj = data.resultObj;
        this.isSave = obj.check;
        this.saveNumber = obj.quantity;
      }
    )
  }
  getDetail() {
    this.service.DocumentDetail(this.documentSubId).subscribe(
      async (data: any) => {
        if(data.isSuccessed){
          this.document = data.resultObj;
          this.ConvertDate();
          this.document.type = this.document.filePath.slice((this.document.filePath.lastIndexOf(".") - 1 >>> 0) + 2) || '';
          if(this.document.type == 'docx'){

          }
        }
      }
    )
  }
  ConvertDate(){
    const parsedDate = parseISO(this.document.createdAt ?? '');
    const parsedDate2 = parseISO(this.document.updatedAt ?? "");

    if (!isNaN(parsedDate.getTime())) {
      this.document.createdAt = format(parsedDate, 'dd-MM-yyyy');
    }
    if (!isNaN(parsedDate2.getTime())) {
      this.document.updatedAt = format(parsedDate2, 'dd-MM-yyyy');
    }
  }
  canEditDelete(){
    if(this.session.getUserId() == this.document.userShort.id)
      return true;
    return false;
  }
  copyToClipboard() {
    this.clipboardService.copy(this.service.getUrl() + this.currentUrl);
    this.toastr.info("Đã sao chép đường link");
  }
  updateDocument(){
    this.dataService.changeSubId(this.documentSubId);
    this.openDialogUpdatePost('100ms', '600ms');
  }
  openDialogUpdatePost(enteranimation: any, exitanimation: any){
    this.dataService.changeSubId(this.documentSubId);
    this.dialog.open(UpdatedocumentComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '50%',
      data: {
        SubId: this.documentSubId
      },
    });
  }
}
