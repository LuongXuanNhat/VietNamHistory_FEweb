import { Component, NgZone} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';

@Component({
  selector: 'app-createdocument',
  templateUrl: './createdocument.component.html',
  styleUrls: ['./createdocument.component.css']
})
export class CreatedocumentComponent {
  questionId: string = '';
  selectedFile: File | null = null;
  fileName: string = '';
  progessing: boolean = false;
  createdocumentform = this._formBuilder.group({
    Title: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(10)]],
    Description: [''],
    Document: [null, Validators.required],
  });

  constructor(private _formBuilder: FormBuilder, public service: PublicserviceService,
    private router: Router, private  toastr: ToastrService, private dialogRef: MatDialogRef<CreatedocumentComponent>,
    private ngZone: NgZone) {

    
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
      

      this.createdocumentform.get('Document')?.setValue(file);
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
  CreateDocument(){
    const formData = new FormData();
    const createDocument = this.createdocumentform;
  
    formData.append('Title', createDocument.get('Title')?.value?.trim() || '');
    formData.append('Description', createDocument.get('Description')?.value?.trim() || '');
    formData.append('FileName', createDocument.get('Document')?.value || '');

    this.service.CreateDocument(formData).subscribe(
      (data: any) => {
        if(data.isSuccessed){
          this.dialogRef.close();
          this.toastr.success("Chia sẻ tài liệu thành công");
        } else {
          this.toastr.error("Lỗi: " + data.message);
        }
      }, (error: any) => {
        this.toastr.error("Lỗi: "+ error);
      }
    )
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

