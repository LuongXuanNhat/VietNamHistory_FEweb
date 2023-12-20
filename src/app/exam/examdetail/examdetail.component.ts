import { Location } from '@angular/common';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';
import { MultipleChoiceResponseDto } from 'src/app/ObjectClass/object';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { SessionService } from 'src/app/service/session/session.service';

@Component({
  selector: 'app-examdetail',
  templateUrl: './examdetail.component.html',
  styleUrls: ['./examdetail.component.css']
})
export class ExamdetailComponent {
  currentUrl: any;
  exam !: MultipleChoiceResponseDto;
  examId: any;
  showQuestion!: boolean;
  constructor(private session: SessionService,private route: ActivatedRoute, 
    private service: PublicserviceService, private  toastr: ToastrService,private clipboardService: ClipboardService,
    private location: Location, private el: ElementRef, private renderer: Renderer2 , private dialog: MatDialog ){
      this.route.params.subscribe(params => {
        this.currentUrl = this.location.path();
        this.examId = params['examId'] ?? '';
        this.getDetail();
      });
  }
  getDetail() {
    this.service.ExamDetail(this.examId).subscribe(
      (data: any) => {
        if(data.isSuccessed){
          this.exam = data.resultObj;
          this.ConvertDate();
        } else {
          this.toastr.error("Lỗi: " + data.message);
        }
      }, (error: any) => {
        this.toastr.error("Lỗi: "+ error);
      }
    )
  }
  ConvertDate(){
    const parsedDate = parseISO(this.exam.createdAt ?? '');
    const parsedDate2 = parseISO(this.exam.updatedAt ?? '');

    if (!isNaN(parsedDate.getTime())) {
      this.exam.createdAt = format(parsedDate, 'dd-MM-yyyy');
    }
    if (!isNaN(parsedDate2.getTime())) {
      this.exam.updatedAt = format(parsedDate2, 'dd-MM-yyyy');
    }
  }
  start(){
    this.showQuestion = true;

  }
  isShowQuestion(){
    return this.showQuestion;
  }
  getLetter(index: number): string {
    return String.fromCharCode(65 + index);
  }
  move(id: string){
    const questionCardElement = this.el.nativeElement.querySelector(`#${id}`);
    if (questionCardElement) {
      questionCardElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
  isSelected(id: string): boolean{
    const check = this.exam.quizs?.find(x=>x.id == id);
    return check?.selected != null;
  }
  trackByFn(index: number, item: any): any {
    return index;
  }
}
