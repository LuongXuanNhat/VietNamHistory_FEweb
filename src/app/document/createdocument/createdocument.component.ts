import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForumCreateComponent } from 'src/app/forum/forum-create/forum-create.component';
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
  
  createdocumentform = this._formBuilder.group({
    Title: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(10)]],
    Description: [''],
    Document: [null, Validators.required],
  });

  constructor(private _formBuilder: FormBuilder, public service: PublicserviceService,
    private router: Router, private  toastr: ToastrService, private dialogRef: MatDialogRef<CreatedocumentComponent>,
    private dataService: DataService) {

    
  }

  onFileSelected(input: any): void {
    const file = input?.files[0];
    if (file && this.isValidFileType(file)) {
      if(this.checkSize(file)){
        return;
      }

      this.createdocumentform.get('Document')?.setValue(file);
      this.fileName = file.name;
    } else {
      this.selectedFile = null;
      this.toastr.warning('Vui lòng chọn đúng file: PDF hoặc DOCX');
    }
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
      this.toastr.warning('Kích thước file không được vượt quá 5MB.');
      return true;
    } 
    return false;
  }
  
}

