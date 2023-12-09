import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DocumentResponseDto } from 'src/app/ObjectClass/object';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';

@Component({
  selector: 'app-documentdetail',
  templateUrl: './documentdetail.component.html',
  styleUrls: ['./documentdetail.component.css']
})
export class DocumentdetailComponent {
  documentId: any;
  documentSubId: any;
  document!: DocumentResponseDto;

  constructor(private dataService: DataService, private router: Router,private route: ActivatedRoute, 
    private service: PublicserviceService, private  toastr: ToastrService,){
    this.route.params.subscribe(params => {
      this.documentSubId = params['documentId'] ?? '';
    });
    this.getDetail();
  }
  getDetail() {
    this.service.DocumentDetail(this.documentSubId).subscribe(
      (data: any) => {
        if(data.isSuccessed){
          this.document = data.resultObj;
        } else {
          this.toastr.error("Lỗi: " + data.message);
        }
      }, (error: any) => {
        this.toastr.error("Lỗi: "+ error);
      }
    )
  }
}
