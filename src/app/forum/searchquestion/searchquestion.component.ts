import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { ToastrService } from 'ngx-toastr';
import { PostResponse } from 'src/app/ObjectClass/object';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { SessionService } from 'src/app/service/session/session.service';

@Component({
  selector: 'app-searchquestion',
  templateUrl: './searchquestion.component.html',
  styleUrls: ['./searchquestion.component.css']
})
export class SearchquestionComponent implements OnInit{
  @ViewChild('innerContainer') innerContainer!: ElementRef;
  keyWord: string = '';
  questions: PostResponse[] = [];
  tags: string[] = [];
  countResult: number = 0;
  questionSaved: PostResponse[] = [];
  isSave: boolean | null = null;
  selectedTag: string | null = null;

  questionNews: PostResponse[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  
  constructor(private router: Router,private service: PublicserviceService, private dataService: DataService,private session: SessionService,
    private toastr: ToastrService ){
      
  }
  ngOnInit(): void {
    this.dataService.currentKeyword.subscribe(keyword => {
      this.keyWord = keyword ?? this.keyWord;
      this.findQuestion();
    });
    this.getTags(20);
  }
  findQuestion(){
    if(!this.containsOnlySpaces(this.keyWord)){
      this.service.questionSearch(this.keyWord).subscribe(
        (data: any)=>{
          this.questions = data.resultObj;
          this.updatePagedQuestions();
          if(this.session.getUserId()){
            this.GetSaved();
          }
          this.ConvertDate();
          this.countResult = this.questions.length;
        }
      )
    }
  }
  search(){
    if(!this.containsOnlySpaces(this.keyWord)){
      this.service.questionSearch(this.keyWord).subscribe(
        (data: any)=>{
          this.questions = data.resultObj;
          this.updatePagedQuestions();
          if(this.session.getUserId()){
            this.GetSaved();
          }
          this.countResult = this.questions.length;
          this.ConvertDate();
        }
      )
    } 
    this.router.navigate(['/forum/foryou']);
  }
  containsOnlySpaces(str: string): boolean {
    const trimmedStr = str.trim();
    return trimmedStr === '';
  }
  getTags(numberTag: number){
    this.service.GetTopTags(numberTag).subscribe(
      (data: any) => {
        this.tags = data.resultObj;
      }
    )
  }
  scrollLeft() {
    if (this.innerContainer) {
        this.innerContainer.nativeElement.scrollLeft -= 900; // điều chỉnh giá trị theo yêu cầu
    }
  }
  scrollRight() {
      if (this.innerContainer) {
          this.innerContainer.nativeElement.scrollLeft += 900; // điều chỉnh giá trị theo yêu cầu
      }
  }
  selectTag(tag: string): void {
    if (this.selectedTag === tag) {
      this.selectedTag = null;
      this.getQuestions();
    } else {
      this.selectedTag = tag;
      this.service.getQuestionByTag(tag).subscribe(
        (result: any) => {
          this.questions = result.resultObj;
          this.updatePagedQuestions();
          this.questions.forEach(element => {
            if(element){
              const parsedDate = parseISO(element.createdAt);
              const parsedDate2 = parseISO(element.updatedAt ?? "");
  
              if (!isNaN(parsedDate.getTime())) {
                element.createdAt = format(parsedDate, 'dd-MM-yyyy');
              }
              if (!isNaN(parsedDate2.getTime())) {
                element.updatedAt = format(parsedDate2, 'dd-MM-yyyy');
              }
            }
          });
        },
        (error) => {
          console.error('Error fetching posts:', error);
        }
      )
    }
  }
  getQuestions(){
    this.service.GetQuestionForYou().subscribe(
      (result: any) => {
        this.questions = result.resultObj;
        this.GetSaved();
        if(this.questions.length > 0){
          this.ConvertDate();
        }
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    )
  }
  ConvertDate() {
    this.questions.forEach(element => {
      if(element){
        const parsedDate = parseISO(element.createdAt);
        const parsedDate2 = parseISO(element.updatedAt ?? "");

        if (!isNaN(parsedDate.getTime())) {
          element.createdAt = format(parsedDate, 'dd-MM-yyyy');
        }
        if (!isNaN(parsedDate2.getTime())) {
          element.updatedAt = format(parsedDate2, 'dd-MM-yyyy');
        }
      }
    });
  }
  questionDetail(question: PostResponse) {
    const questionId = question.subId;
    this.dataService.changeKeyword(this.keyWord);
    this.router.navigate(['/forum', questionId]);
  }
  IsSave(question:PostResponse, event: Event){
    if(!this.session.getUserId()){
      this.toastr.info("Bạn cần đăng nhập!");
      return;
    }
    const formData = new FormData();
    formData.append('QuestionId', question.id);
    formData.append('UserId', this.session.getUserId() ?? '');
    this.service.SaveOrUnSaveQuestion(formData).subscribe(
      (data: any) => {
        question.isSaved = !question.isSaved;
      }
    )
    event.stopPropagation();
  }
  GetSaved(){
    this.service.GetMyQuestionSaved().subscribe(
      (data: any)=>{
        this.questionSaved = data.resultObj;
        this.questions.forEach(element => {
          element.isSaved = this.checkSave(element);
        });
      }
    )
  }
  checkSave(question:PostResponse): boolean{
    if(this.questionSaved.some(savedQuestion => savedQuestion.id === question.id)){
      question.isSaved = true;
      return true;
    }
    return false;
  }

  pageEvent(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.updatePagedQuestions();
  }
  updatePagedQuestions() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.questionNews = this.questions.slice(startIndex, endIndex);
  }
}
