import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DocumentResponseDto } from 'src/app/ObjectClass/object';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';

@Component({
  selector: 'app-updatedocument',
  templateUrl: './updatedocument.component.html',
  styleUrls: ['./updatedocument.component.css']
})
export class UpdatedocumentComponent {
  documentId: string = '';
  documentSubId: string = '';
  selectedFile: File | null = null;
  fileName: string = '';
  progessing: boolean = false;
  updatedocumentform = this._formBuilder.group({
    Title: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(10)]],
    Description: [''],
    Document: [null],
    SubId:['']
  });

  constructor(@Inject(MAT_DIALOG_DATA) private data: any,private _formBuilder: FormBuilder, public service: PublicserviceService,
    private router: Router, private  toastr: ToastrService, private dialogRef: MatDialogRef<UpdatedocumentComponent>,
    private dataService: DataService, private route: ActivatedRoute) {
      this.dataService.currentSubId.subscribe(subId => {
        this.documentSubId = subId ?? '';
        this.getDetail();
      });
  }

  getDetail() {
    if(this.documentSubId){
      this.service.DocumentDetail(this.documentSubId).subscribe(
        async (data: any) => {
          if(data.isSuccessed){
            console.log(data);
            const doc = data.resultObj as DocumentResponseDto;
            this.updatedocumentform.get('Title')?.setValue(doc.title ?? '');
            this.updatedocumentform.get('Description')?.setValue(doc.description);
            this.updatedocumentform.get('SubId')?.setValue(doc.subId ?? '');
          }
        }
      )
    }
  }
  toggleProgressing(): void {
    this.fileName = '';
    setTimeout(() => {
      this.progessing = true;
    }, 1000)
  }
  onFileSelected(input: any): void {
    const file = input?.files[0];
    if (file && this.isValidFileType(file)) {
      if(this.checkSize(file)){
        this.progessing = false;
        return;
      }
      

      this.updatedocumentform.get('Document')?.setValue(file);
      this.progessing = false;
      this.fileName = file.name;
    } else {
      this.progessing = false;
      this.selectedFile = null;
      this.toastr.warning('Vui lòng chọn đúng file: PDF hoặc DOCX');
    }
  }
  onFileInputBlur(): void {
      this.progessing = false;
  }
  private isValidFileType(file: File): boolean {
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

    return allowedTypes.includes(file.type);
  }
  UpdateDocument(){
    const formData = new FormData();
    const createDocument = this.updatedocumentform;
  
    formData.append('Title', createDocument.get('Title')?.value?.trim() || '');
    formData.append('Description', createDocument.get('Description')?.value?.trim() || '');
    formData.append('FileName', createDocument.get('Document')?.value || '');
    formData.append('SubId', createDocument.get('SubId')?.value || '');

    this.service.UpdateDocument(formData).subscribe(
      (data: any) => {
        if(data.isSuccessed){
          this.dialogRef.close();
          this.documentSubId = data.resultObj.subId;
          this.updateRouteAndReload(this.documentSubId);
          this.toastr.success("Cập nhập tài liệu thành công");

        } else {
          this.toastr.error("Lỗi: " + data.message);
        }
      }, (error: any) => {
        this.toastr.error("Lỗi: "+ error);
      }
    )
  }
  updateRouteAndReload(newSubId: string) {
    const currentUrl = window.location.href;
    const documentIndex = currentUrl.indexOf('/document/');
    const newUrl = currentUrl.substring(0, documentIndex) + `/document/${newSubId}`;
  
    window.location.href = newUrl;
    location.reload();
  }
  checkSize(file: any):boolean {
    const fileSize = file.size; 
    const maxSize = 8 * 1024 * 1024; 
  
    if (fileSize > maxSize) {
      this.toastr.warning('Kích thước file không được vượt quá 8MB.');
      return true;
    } 
    return false;
  }
}
