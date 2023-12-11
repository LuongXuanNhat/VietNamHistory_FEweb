import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { ToastrService } from 'ngx-toastr';
import { DocumentResponseDto } from 'src/app/ObjectClass/object';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';


@Component({
  selector: 'app-documentdetail',
  templateUrl: './documentdetail.component.html',
  template: `
  <pdf-viewer [src]="pdfSrc"
              [render-text]="true"
              [original-size]="false"
              style="width: 400px; height: 500px"
  ></pdf-viewer>
  `,
  styleUrls: ['./documentdetail.component.css']
})
export class DocumentdetailComponent{
  documentId: any;
  documentSubId: any;
  pdfSrc: any;
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
      async (data: any) => {
        if(data.isSuccessed){
          this.document = data.resultObj;
          this.ConvertDate();
          this.pdfSrc = this.document.filePath;
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
}
