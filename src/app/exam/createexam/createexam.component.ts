import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PublicserviceService } from 'src/app/service/publicservice.service';

@Component({
  selector: 'app-createexam',
  templateUrl: './createexam.component.html',
  styleUrls: ['./createexam.component.css'],
})
export class CreateexamComponent {
  questionId: string = '';
  selectedFile: File | null = null;
  fileName: string = '';
  progessing: boolean = false;
  createExamForm = this._formBuilder.group({
    Title: [
      '',
      [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(10),
      ],
    ],
    Description: ['', [Validators.required, Validators.maxLength(500)]],
    Document: [null, Validators.required],
    Time: [null, Validators.required],
  });

  constructor(
    private _formBuilder: FormBuilder,
    public service: PublicserviceService,
    private router: Router,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<CreateexamComponent>
  ) {}
  toggleProgressing(): void {
    this.fileName = '';
    setTimeout(() => {
      this.progessing = true;
    }, 1000);
  }
  onFileSelected(input: any): void {
    const file = input?.files[0];
    if (file && this.isValidFileType(file)) {
      if (this.checkSize(file)) {
        this.progessing = false;
        return;
      }

      this.createExamForm.get('Document')?.setValue(file);
      this.progessing = false;
      this.fileName = file.name;
    } else {
      this.progessing = false;
      this.selectedFile = null;
      this.toastr.warning('Vui lòng chọn đúng file: DOCX');
    }
  }
  onFileInputBlur(): void {
    this.progessing = false;
  }
  private isValidFileType(file: File): boolean {
    const allowedTypes = [
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    return allowedTypes.includes(file.type);
  }
  CreateExam() {
    const formData = new FormData();
    const createExam = this.createExamForm;
    var time = createExam.get('Time')?.value;

    formData.append('Title', createExam.get('Title')?.value?.trim() || '');
    formData.append(
      'Description',
      createExam.get('Description')?.value?.trim() || ''
    );
    formData.append('File', createExam.get('Document')?.value || '');
    formData.append('WorkTime', time || '30');

    this.service.CreateExam(formData).subscribe(
      (data: any) => {
        if (data.isSuccessed) {
          this.dialogRef.close();
          this.toastr.success('Tạo bài thi thành công');
        } else {
          this.toastr.error('Lỗi: ' + data.message);
        }
      },
      (error: any) => {
        this.toastr.error('Lỗi: ' + error);
      }
    );
  }
  checkSize(file: any): boolean {
    const fileSize = file.size;
    const maxSize = 8 * 1024 * 1024;

    if (fileSize > maxSize) {
      this.toastr.warning('Kích thước file không được vượt quá 8MB.');
      return true;
    }
    return false;
  }
}
