import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { format, parseISO } from 'date-fns';
import { ClipboardService } from 'ngx-clipboard';
import { ToastrService } from 'ngx-toastr';
import { AnswerQuestionDto, CommentPostDto, PostResponse } from 'src/app/ObjectClass/object';
import { ReportpostComponent } from 'src/app/discover/reportpost/reportpost.component';
import { UpdatepostComponent } from 'src/app/discover/updatepost/updatepost.component';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { SessionService } from 'src/app/service/session/session.service';
import viLocale from 'date-fns/locale/vi';
import { ForumUpdateComponent } from '../forum-update/forum-update.component';
import { QuestionReportComponent } from '../questionreport/questionreport.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit{
  subQuestionId!: string;
  isThumbUp: boolean | null = null;
  isSave: boolean | null = null;
  currentUrl: string = '';
  likeNumber: number = 0;
  saveNumber: number = 0;
  commentNum: number = 0;
  userIdOfPost: string = '';
  question: PostResponse | null = null;
  answers!: AnswerQuestionDto[];

  userId: string | null;
  userName: string | null;
  imgUser: string | null;
  isCommented = false;
  isUpdateCommented = false;
  isEdit: string = '';
  private hubConnection!: HubConnection;
  public Editor = ClassicEditor;
  createCommentContent: string = '';
  contentUpdate: string = '';
  createAnswer: AnswerQuestionDto = {
    authorId: '',
    questionId: '',
    content: '',
    confirm: false,
    mostConfirm: false
  };
  updateAnswer: AnswerQuestionDto = {
    authorId: '',
    questionId: '',
    content: '',
    confirm: false,
    mostConfirm: false
  }
  questionId: string = '';


  constructor(private router: Router, private service: PublicserviceService, private dataService: DataService,
    private session: SessionService, private toastr: ToastrService,private route: ActivatedRoute,private dialog: MatDialog,
    private clipboardService: ClipboardService, private location: Location,  ){
      this.route.params.subscribe(params => {
        this.subQuestionId = params['id'] ?? '';
      });
      this.GetQuestion();
      this.userId = session.getUserId();
      this.userName= session.getName();
      this.imgUser = session.getAvatar();
      this.currentUrl = this.location.path();
      this.connectChatSignal();
  }
  
  ngOnInit() {
    this.dataService.reloadDetailPage$.subscribe((idQuestion: string | null) => {
      if(idQuestion != '' && idQuestion)  {
        this.subQuestionId = idQuestion;
        this.router.navigate([], {relativeTo: this.route});
        this.GetQuestion();
      }
    });
  }
   GetQuestion() {
    this.service.GetQuestionDetail(this.subQuestionId).subscribe(
      (data: any) => {
        this.question = this.ConvertDate(data.resultObj);
        this.questionId = this.question.id;
        this.userIdOfPost = data.resultObj.userShort.id;

        this.GetAnswers();
        this.getInteract();
      }, (error: any) => {
        this.toastr.error("Lỗi: " + error);
      }
    )
  }
  GetAnswers() {
    this.service.GetAnswers(this.questionId).subscribe(
      (data: any) => {
        this.answers = this.ConvertListDate(data.resultObj);
        this.commentNum = this.answers.length;
      }, (error: any) => {
        this.toastr.error("Lỗi: "+ error);
      }
    )
  }
  connectChatSignal() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.service.getChatSignRl())
      .build();

    this.hubConnection
      .start()
      .then(() => {
        //  console.log('Connection started!');
      })
      .catch(err => console.error('Error while establishing connection:', err));

    // Listen to SignalR events
      this.hubConnection.on('ReceiveAnswer', (data: any) => {
        if(data){
          this.answers = this.ConvertListDate(data.resultObj as AnswerQuestionDto[]);
          this.commentNum = this.answers.length;
        }
    });
  }
  ConvertDate(comment: PostResponse): PostResponse{
      const parsedDate = parseISO(comment.createdAt?.toString() ?? "");
      const parsedDate2 = parseISO(comment.updatedAt?.toString() ?? "");

      if (!isNaN(parsedDate.getTime())) {
        comment.createdAt = format(parsedDate, 'dd-MM-yyyy hh:mm', { locale: viLocale });
      }
      if (!isNaN(parsedDate2.getTime())) {
        comment.updatedAt = format(parsedDate2, 'dd-MM-yyyy hh:mm', { locale: viLocale });
      }
    return comment;
  }
  ConvertListDate(answers: AnswerQuestionDto[]): AnswerQuestionDto[]{
    answers.forEach(element => {
      const parsedDate = parseISO(element.createdAt?.toString() ?? '');
    const parsedDate2 = parseISO(element.updatedAt?.toString() ?? "");

    if (!isNaN(parsedDate.getTime())) {
      element.createdAt = format(parsedDate, 'dd-MM-yyyy hh:mm', { locale: viLocale });
    }
    if (!isNaN(parsedDate2.getTime())) {
      element.updatedAt = format(parsedDate2, 'dd-MM-yyyy hh:mm', { locale: viLocale });
    }
    });
    
  return answers;
}
  getInteract(){
    if(this.session.getUserId()){
      this.service.getLikeQuestion(this.subQuestionId, this.session.getUserId() || '').subscribe(
        (result: any) => {
            this.isThumbUp = result.resultObj.check;
            this.likeNumber = result.resultObj.quantity;
        },
        (error: any) => {
            console.error(error);
        }
      );
      this.service.getSaveQuestion(this.questionId, this.session.getUserId() || '').subscribe(
        (result: any) => {
            this.isSave = result.resultObj.check;
            this.saveNumber = result.resultObj.quantity;

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
    formData.append('QuestionId', this.subQuestionId);
    formData.append('UserId', this.session.getUserId() ?? '');
    this.service.LikeOrUnlikeQuestion(formData).subscribe(
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
    formData.append('QuestionId', this.questionId);
    formData.append('UserId', this.session.getUserId() ?? '');
    this.service.SaveOrUnSaveQuestion(formData).subscribe(
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
    const popup = this.dialog.open(QuestionReportComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '900px',
      height: '500px',
      data: {
        QuestionId: this.questionId
      }
    });
  }

  updatePost(){
    this.dataService.changeSubId(this.subQuestionId);
    this.openDialogUpdatePost('100ms', '600ms');
  }
  openDialogUpdatePost(enteranimation: any, exitanimation: any){
    const popup = this.dialog.open(ForumUpdateComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '50%'
    });
  }
  copyToClipboard() {
    this.clipboardService.copy(this.service.getUrl() + this.currentUrl);
    this.toastr.info("Đã sao chép đường link");
  }
  canEditDelete(){
    if(this.userId == this.userIdOfPost)
      return true;
    return false;
  }

  public editorConfig = {
    toolbar: {
      items: ['heading', 'bold', 'italic','blockQuote', 'bulletedList', 'numberedList', 'link'],
    },
    placeholder: 'Viết bình luận...',
    language: 'vi',
  };
  onEditorChange(event: any) {
    this.isCommented = true;
    this.createCommentContent = event.editor.getData();
    if(this.hasImage(this.contentUpdate)){
      this.toastr.warning("Không được bình luận có nội dung là ảnh!");
    }
  }
  onEditChange(event: any) {
    this.isUpdateCommented = true;
    this.contentUpdate = event.editor.getData();

    if(this.hasImage(this.contentUpdate)){
      this.toastr.warning("Không được bình luận có nội dung là ảnh!");
    }
  }
  hasImage(content: string): boolean{
    const imageRegex = /<img[^>]+src\s*=\s*['"]([^'"]+)['"][^>]*>/g;
    const containsImage = imageRegex.test(content);
    if (containsImage) {
      return true;
    }
    return false;
  }
  sendAnswer(){
    // if(this.hasImage(this.createCommentContent)){
    //   this.toastr.warning("Không được bình luận có nội dung là ảnh!");
    //   return;
    // }

    this.createAnswer.questionId = this.questionId;
    this.createAnswer.authorId = this.userId ?? '';
    this.createAnswer.content = this.createCommentContent.trim();
    
    this.service.CreateForumAnswer(this.createAnswer).subscribe(
      (data: any)=>{
        this.cancelComment();
      },
      error => {
        console.log(error);
      }
    )
  }
  submitEdited(){
    if(this.hasImage(this.contentUpdate)){
      this.toastr.warning("Không được bình luận có nội dung là ảnh!");
      return;
    }

    this.updateAnswer.content = this.contentUpdate?.trim();
    if(this.contentUpdate.trim() == ''){
      this.toastr.info("Vui lòng không để trống bình luận");
      return;
    }
    this.service.UpdateForumAnswer(this.updateAnswer).subscribe(
      (data: any)=>{
        this.contentUpdate = '';
        this.cancelEditComment();
      },
      error => {
        console.log(error);
      }
    )
  }
  isCheckCommented(){
    if(this.isCommented)  
      return true;
    return false;
  }
  cancelComment(){
    this.isCommented = false;
    this.createCommentContent = '';
  }
  cancelEditComment(){
    this.isUpdateCommented = false;
    this.contentUpdate = '';
    this.isEdit = '-1';
  }
  editComment(id: string){
    var foundComment = this.answers?.find(x => x.id === id);
    if(foundComment){
      this.updateAnswer = foundComment;
      this.contentUpdate = foundComment.content;
      this.isEdit = id;
    }
  }
  deleteAnswer(id: string){
    this.service.deleteAnswer(id).subscribe(
      (data: any) => {

      },
      (error: any) => {
        this.toastr.error("Lỗi: "+error);
      }
    )
  }
  isCheckEdit(id: string): boolean{
    return this.isEdit == id;
  }
  loginUser(){
    const currentUrl = this.router.url;
    this.router.navigate(['/login'], { state: { redirect: currentUrl } });
  }
}
