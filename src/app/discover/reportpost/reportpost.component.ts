import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { SessionService } from 'src/app/service/session/session.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { ReportPost } from 'src/app/ObjectClass/object';

@Component({
  selector: 'app-reportpost',
  templateUrl: './reportpost.component.html',
  styleUrls: ['./reportpost.component.css']
})
export class ReportpostComponent {
  reportform =  this.builder.group({
    PostId: [''],
    UserId: [this.session.getUserId()],
    ReportId: ['', Validators.required],
    Description: ['', Validators.maxLength(500)],
    ReportDate: [new Date()],
    Checked: [false]
  });
  reports: ReportPost[] | null = null;


  constructor(@Inject(MAT_DIALOG_DATA) public data: { SubId: string }
    ,private builder: FormBuilder, private session: SessionService,private service: PublicserviceService,
     ){
      this.reportform.get('PostId')?.setValue(data.SubId) ;
      this.GetReportPost();
  }
  GetReportPost(){
    this.service.getReport().subscribe(
      (data: any) => {
        this.reports = data.resultObj
        console.log(data);
      }
    )
  }
  onSubmit(){

  }
}
