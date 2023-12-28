import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PublicserviceService } from '../service/publicservice.service';
import { SessionService } from '../service/session/session.service';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/datashare/data.service';
import { MultipleChoiceResponseDto, News, PostResponse } from '../ObjectClass/object';
import { CarouselComponent } from './carousel/carousel.component';
import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  posts!: PostResponse[];
  exams!: MultipleChoiceResponseDto[];
  news!: News[];
  currentSlideIndex = 0;

  ngOnInit(): void {

  }
  constructor(private router: Router, private service: PublicserviceService, private dataService: DataService,
    private session: SessionService, private toastr: ToastrService,private ngZone: NgZone) {
      service.getRandomPost(10).subscribe(
      (data: any) => {
        this.posts = data.resultObj;
      }, (error: any) => {
      }
    ) 
    this.getExams();
    this.getNews();
  }
  getNews() {
    this.service.GetNews().subscribe(
      (data: any) => {
        if(data.isSuccessed){
          const originalExams = data.resultObj;
          const randomExams = this.getRandomElements(originalExams, 3);
          this.news = randomExams;
          this.ConvertDate();
        } else {
          this.toastr.error("Lỗi: " + data.message);
        }
      }, (error: any) => {
        this.toastr.error("Lỗi: "+ error);
      }
    )
  }
  getRandomElements(exams: any[], n: number): any[] {
    const shuffledArray = exams.slice();
    let currentIndex = shuffledArray.length;
    let randomIndex, temporaryValue;
  
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      temporaryValue = shuffledArray[currentIndex];
      shuffledArray[currentIndex] = shuffledArray[randomIndex];
      shuffledArray[randomIndex] = temporaryValue;
    }
  
    const elementsToSelect = Math.min(n, shuffledArray.length);
  
    return shuffledArray.slice(0, elementsToSelect);
  }
  
  getExams() {
    this.service.GetExam().subscribe(
      (data: any) => {
        if(data.isSuccessed){
          const originalExams = data.resultObj;
          const randomExams = this.getRandomElements(originalExams, 4);
          this.exams = randomExams;

        } else {
          this.toastr.error("Lỗi: " + data.message);
        }
      }, (error: any) => {
        this.toastr.error("Lỗi: "+ error);
      }
    )
  }
  GetExamDetail(exam: MultipleChoiceResponseDto) {
    const examId = exam.id;
    this.router.navigate(['/exam', examId]);
  }
  ConvertDate(){
    this.news.forEach(element => {
      const parsedDate = parseISO(element.createdAt?.toString() ?? "");

    if (!isNaN(parsedDate.getTime())) {
      element.createdAt = format(parsedDate, 'dd-MM-yyyy hh:mm');
    }
    }); 
  }
  
}
