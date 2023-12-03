import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { SessionService } from 'src/app/service/session/session.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { ReportPost } from 'src/app/ObjectClass/object';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report',
  templateUrl: './questionreport.component.html',
  styleUrls: ['./questionreport.component.css']
})
export class QuestionReportComponent {
  reportform =  this.builder.group({
    QuestionId: [''],
    UserId: [this.session.getUserId()],
    ReportId: ['', Validators.required],
    Description: ['', Validators.maxLength(500)],
    ReportDate: [new Date()],
    Checked: [false]
  });
  reports: ReportPost[] | null = null;


  constructor(@Inject(MAT_DIALOG_DATA) public data: { QuestionId: string }
    ,private builder: FormBuilder, private session: SessionService,private service: PublicserviceService,
    private  toastr: ToastrService,private dialogRef: MatDialogRef<QuestionReportComponent>){
      this.reportform.get('QuestionId')?.setValue(data.QuestionId) ;
      this.GetReport();
  }
  GetReport(){
    this.service.getReport().subscribe(
      (data: any) => {
        this.reports = data.resultObj
      }
    )
  }
  onSubmit(){
    console.log(this.reportform.value)
    if(this.reportform.valid){
      this.service.ReportQuestion(this.reportform.value).subscribe(
        (data: any) =>{
          this.toastr.success("Đã gửi báo cáo! Bạn sẽ sớm nhận được phản hồi!");
          this.dialogRef.close();
        }
      )
    } else {
      this.toastr.info("Bạn cần chọn nội dung báo cáo!")
    }
  }
}
