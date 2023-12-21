import { Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';
import { MultipleChoiceResponseDto, QuizDto } from 'src/app/ObjectClass/object';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { SessionService } from 'src/app/service/session/session.service';

@Component({
  selector: 'app-examdetail',
  templateUrl: './examdetail.component.html',
  styleUrls: ['./examdetail.component.css']
})
export class ExamdetailComponent implements OnDestroy {
  currentUrl: any;
  exam !: MultipleChoiceResponseDto;
  examId: any;
  startTime!: string; 
  CompletionTime: number;
  showQuestion!: boolean;
  countdown!: number;
  intervalId: any;
  isSubmit: boolean;
  score: number;
  btnSubmit:boolean;
  constructor(private session: SessionService,private route: ActivatedRoute, 
    private service: PublicserviceService, private  toastr: ToastrService,private clipboardService: ClipboardService,
    private location: Location, private el: ElementRef, private renderer: Renderer2 , private dialog: MatDialog,
    private router: Router,  ){
      this.score = 0;
      this.CompletionTime = 0;
      this.isSubmit = false;
      this.btnSubmit = false;
      this.route.params.subscribe(params => {
        this.currentUrl = this.location.path();
        this.examId = params['examId'] ?? '';
        this.getDetail();
      });
  } 
  ngOnDestroy(): void {
    this.stopCountdown();
  }
  getDetail() {
    this.service.ExamDetail(this.examId).subscribe(
      (data: any) => {
        if(data.isSuccessed){
          this.exam = data.resultObj;
          this.countdown = this.exam.workTime * 60;
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
    if(!this.session.getUserId()){
      this.toastr.info("Đăng nhập để bắt đầu bài thi");
      const currentUrl = this.router.url;
      this.router.navigate(['/login'], { state: { redirect: currentUrl } });
    } else {
      this.btnSubmit = true;
      this.showQuestion = true;
      this.startCountdown();
    }
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
  startCountdown() {
    this.startTime = new Date().toISOString();

    this.intervalId = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
        this.CompletionTime +=1;
      } else {
        clearInterval(this.intervalId);
        this.timeout();
        return;
      }
    }, 1000);
  }
  stopCountdown(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
  timeout() {
    this.toastr.info("Hết giờ! Tự động nộp bài");
    setTimeout(async ()  => {
      await this.submit();
    }, 1000);
  }
  async submit(){
    this.stopCountdown();
    this.calculatescore();
    this.btnSubmit = false;
    if(this.score > 4){
      this.toastr.success("Chúc mừng bạn đã hoàn thành tốt bài thi","Điểm số của bạn là: "+this.score.toFixed(2), {
        timeOut: 6000
      });
    } else {
      this.toastr.info("Chúc mừng bạn đã hoàn thành bài thi","Điểm số của bạn là: "+this.score.toFixed(2), {
        timeOut: 6000
      });
    }

    this.SaveExam();
  }
  SaveExam() {
    const formData = new FormData();
    console.log(this.score.toFixed(2));
    this.CompletionTime = Math.ceil(this.CompletionTime / 60);
    formData.append('MultipleChoiceId', this.exam.id);
    formData.append('UserId', this.session.getUserId() ?? '');
    formData.append('Scores', this.score.toFixed(2));
    formData.append('CompletionTime', this.CompletionTime.toString());
    formData.append('StarDate', this.startTime);

    this.service.SaveMyExam(formData).subscribe(
      (data: any) => {
        if(data.isSuccessed){

        } else {
          this.toastr.error(data.message);
        }
      }, (error: any) => {
        this.toastr.error("Lỗi: "+ error);
      }
    )
  }
  calculatescore() {
    var numberCorrect = 0;
    const maxScore = 10;
    const quantity = this.exam.quizs?.length ?? 0;
     for (const q of this.exam.quizs || []) {
      outerLoop:  for (const a of q.quizAnswers || []) {
        if (q.selected == a.id && a.isCorrect) {
          numberCorrect += 1;
          break outerLoop;
        }
      }
    }
    this.score = maxScore / quantity * numberCorrect;
    this.isSubmit = true;
  }
  submited(){
    return this.isSubmit;
  }
  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const secondsString = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${minutesString}:${secondsString}`;
  }
  checkAnswer(q: QuizDto): boolean{
    const check = q.quizAnswers?.find(x=>x.id == q.selected);
    return check?.isCorrect ?? false;
  }
}
