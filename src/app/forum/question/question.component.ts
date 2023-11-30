import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { format, parseISO } from 'date-fns';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';
import { PostResponse } from 'src/app/ObjectClass/object';
import { ReportpostComponent } from 'src/app/discover/reportpost/reportpost.component';
import { UpdatepostComponent } from 'src/app/discover/updatepost/updatepost.component';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { SessionService } from 'src/app/service/session/session.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{
  idQuestion!: string;
  isThumbUp: boolean | null = null;
  isSave: boolean | null = null;
  currentUrl: string = '';
  likeNumber: number = 0;
  saveNumber: number = 0;
  commentNum: number = 0;
  userIdOfPost: string = '';

  question: PostResponse | null = null;

  constructor(private router: Router, private service: PublicserviceService, private dataService: DataService,
    private session: SessionService, private toastr: ToastrService,private route: ActivatedRoute,private dialog: MatDialog,
    private clipboardService: ClipboardService, ){
      this.route.params.subscribe(params => {
        this.idQuestion = params['id'] ?? '';
      });
      this.GetQuestion();
  }
  ngOnInit() {
    this.dataService.reloadDetailPage$.subscribe((idQuestion: string | null) => {
      if(idQuestion != '' && idQuestion)  {
        this.idQuestion = idQuestion;
        this.router.navigate([], {relativeTo: this.route});
        this.GetQuestion();
      }
    });
  }
   GetQuestion() {
    this.service.GetQuestionDetail(this.idQuestion).subscribe(
      (data: any) => {
        this.question = this.ConvertDate(data.resultObj);
        
      }, (error: any) => {
        this.toastr.error("Lỗi: " + error);
      }
    )
  }
  ConvertDate(comments: PostResponse): PostResponse{
      const parsedDate = parseISO(comments.createdAt.toString());
      const parsedDate2 = parseISO(comments.updatedAt?.toString() ?? "");

      if (!isNaN(parsedDate.getTime())) {
        comments.createdAt = format(parsedDate, 'dd-MM-yyyy');
      }
      if (!isNaN(parsedDate2.getTime())) {
        comments.updatedAt = format(parsedDate2, 'dd-MM-yyyy');
      }
    return comments;
  }
  getLike(){
    if(this.session.getUserId()){
      this.service.getLike(this.idQuestion, this.session.getUserId() || '').subscribe(
        (result: any) => {
            this.isThumbUp = result.resultObj.check;
        },
        (error: any) => {
            console.error(error);
        }
      );
      this.service.getSave(this.idQuestion, this.session.getUserId() || '').subscribe(
        (result: any) => {
            this.isSave = result.resultObj.check;
        },
        (error: any) => {
            console.error(error);
        }
      );
    }
  }
  findByTag(tagName: string){
    this.dataService.changeKeyword('#'+tagName);
      this.router.navigate(['/search-posts']);
  }
  toggleThumb() {
    if(!this.session.getUserId()){
      this.toastr.info("Bạn cần đăng nhập!");
      return;
    }
    const formData = new FormData();
    formData.append('idQuestion', this.idQuestion);
    formData.append('UserId', this.session.getUserId() ?? '');
    this.service.LikeOrUnlike(formData).subscribe(
      (data: any) => {
        const obj = data.resultObj;
        this.isThumbUp = obj.check;
        this.likeNumber = obj.quantity;
      }
    )
  }
  IsSave(){
    if(!this.session.getUserId()){
      this.toastr.info("Bạn cần đăng nhập!");
      return;
    }
    const formData = new FormData();
    formData.append('idQuestion', this.idQuestion);
    formData.append('UserId', this.session.getUserId() ?? '');
    this.service.SaveOrUnSave(formData).subscribe(
      (data: any) => {
        const obj = data.resultObj;
        this.isSave = obj.check;
        this.saveNumber = obj.quantity;
      }
    )
  }
  
  Report(){
    if(!this.session.getUserId()){
      this.toastr.info("Bạn cần đăng nhập!");
      return;
    }
    this.openDialog('10ms', '10ms');
  }
  openDialog(enteranimation: any, exitanimation: any){
    const popup = this.dialog.open(ReportpostComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '900px',
      height: '500px',
      data: {
        SubId: this.idQuestion
      }
    });
  }

  updatePost(){
    this.dataService.changeSubId(this.idQuestion);
    this.openDialogUpdatePost('100ms', '600ms');
  }
  openDialogUpdatePost(enteranimation: any, exitanimation: any){
    const popup = this.dialog.open(UpdatepostComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '60%'
    });
  }
  copyToClipboard() {
    this.clipboardService.copy(this.service.getUrl() + this.currentUrl);
    this.toastr.info("Đã sao chép đường link");
  }
  canEditDelete(){
    if(this.session.getUserId() == this.userIdOfPost)
      return true;
    return false;
  }
}
