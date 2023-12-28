import { Component } from '@angular/core';
import { DocumentFpkDto, DocumentResponseDto, Result } from '../ObjectClass/object';
import { Router } from '@angular/router';
import { PublicserviceService } from '../service/publicservice.service';
import { DataService } from '../service/datashare/data.service';
import { ToastrService } from 'ngx-toastr';
import { SessionService } from '../service/session/session.service';
import { format, parseISO } from 'date-fns';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent {
  keyWord!: string | null;
  documents: DocumentResponseDto[] = [];
  // isSave: boolean | null = null;
  documentFpk: DocumentFpkDto = {
    userId : this.session.getUserId() ?? '',
    documentId : ''
  }
  documentSaved: DocumentResponseDto[] = [];
  countResult!: number;
  documentNews: DocumentResponseDto[] = [];
  currentPage: number = 1;
  pageSize: number = 3;

  constructor(private router: Router, private service: PublicserviceService,
    private session: SessionService, private toastr: ToastrService){
      this.getDocuments();
      if(this.session.getUserId()){
        this.GetSaved();
      }
  }
  getDocuments() {
    this.service.GetDocument().subscribe(
      (result: any) => {
        this.documents = result.resultObj;
        this.ConvertDate();
        this.updatePagedDocuments();
      },
      (error) => {
        console.error('Lỗi lấy danh sách:', error);
      }
    )
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
  search(){
    if(this.keyWord?.trim()){
      this.service.documentSearch(this.keyWord).subscribe(
        (data: any)=>{
          if(data.isSuccessed){
            this.documents = data.resultObj;
            this.updatePagedDocuments();
            if(this.session.getUserId()){
              this.GetSaved();
            }
            this.ConvertDate();
            this.countResult = this.documents.length;
          }
        }
      )
    } else {
      this.getDocuments();
    }
  }
  GetSaved(){
    this.service.GetMyPostSaved().subscribe(
      (data: any)=>{
        this.documentSaved = data.resultObj;
        this.documents.forEach(element => {
          element.isSaved = this.checkSave(element);
        });
      }
    )
  }
  checkSave(post: DocumentResponseDto): boolean{
    if(this.documentSaved.some(savedPost => savedPost.id === post.id)){
      post.isSaved = true;
      return true;
    }
    return false;
  }
  DocumentDetail(post: DocumentResponseDto) {
    const documentId = post.subId;
    this.router.navigate(['/document', documentId]);
  }
  
  pageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.updatePagedDocuments();
  }
  updatePagedDocuments() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.documentNews = this.documents.slice(startIndex, endIndex);
  }
}
