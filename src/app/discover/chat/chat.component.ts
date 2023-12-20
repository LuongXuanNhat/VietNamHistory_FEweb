import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { SessionService } from 'src/app/service/session/session.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { CommentPostDto, ReportPost } from 'src/app/ObjectClass/object';
import { ToastrService } from 'ngx-toastr';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { format, parseISO } from 'date-fns';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { ActivatedRoute, Router } from '@angular/router';
import viLocale from 'date-fns/locale/vi';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  isCommented = false;
  isUpdateCommented = false;
  isEdit: string = '';
  private hubConnection!: HubConnection;
  public Editor = ClassicEditor;
  userName: string | null = null;
  imgUser: string | null = null;
  userId: string | null = null;
  postId: string = '';
  comments: CommentPostDto[] | null = null;
  createComment: CommentPostDto = {
    userId: '',
    postId: '', 
    userShort: null,
    content: '',
    createdAt: new Date(),
    updatedAt: null,
    subComment: null,
  };
  updateComment: CommentPostDto = {
    userId: '',
    postId: '',
    userShort: null,
    content: '',
    createdAt: new Date(),
    updatedAt: null,
    subComment: null,
  }
  createCommentContent: string = '';
  contentUpdate: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { SubId: string }
  ,private session: SessionService,private service: PublicserviceService,
  private  toastr: ToastrService, private router: Router){
    this.postId = data.SubId;
    this.userId = session.getUserId();
    this.userName= session.getName();
    this.imgUser = session.getAvatar();
    this.GetChatPost();

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(service.getChatSignRl())
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started!');
      })
      .catch(err => console.error('Error while establishing connection:', err));

    // Listen to SignalR events
      this.hubConnection.on('ReceiveComment', (data: any) => {
        this.comments = this.ConvertChatDate(data.resultObj);
    });
  }
  GetChatPost(){
    this.service.getPostComment(this.postId).subscribe(
      (data: any) => {
        this.comments = this.ConvertChatDate(data.resultObj as CommentPostDto[]);
      }
    )
  }
  ConvertChatDate(comments: CommentPostDto[]): CommentPostDto[]{
    comments?.forEach(element => {
      const parsedDate = parseISO(element.createdAt.toString());
      const parsedDate2 = parseISO(element.updatedAt?.toString() ?? "");

      if (!isNaN(parsedDate.getTime())) {
        element.createdAt = format(parsedDate, 'dd-MM-yyyy hh:mm', { locale: viLocale });
      }
      if (!isNaN(parsedDate2.getTime())) {
        element.updatedAt = format(parsedDate2, 'dd-MM-yyyy  hh:mm',{ locale: viLocale });
      }
    });
    return comments;
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
  sendComment(){
    if(this.hasImage(this.createCommentContent)){
      this.toastr.warning("Không được bình luận có nội dung là ảnh!");
      return;
    }

    this.createComment.postId = this.postId;
    this.createComment.userId = this.userId ?? '';
    this.createComment.content = this.createCommentContent.trim();
    
    this.service.CreatePostComment(this.createComment).subscribe(
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

    this.updateComment.content = this.contentUpdate?.trim();
    this.updateComment.createdAt = new Date();
    this.updateComment.updatedAt = new Date();

    if(this.contentUpdate.trim() == ''){
      this.toastr.info("Vui lòng không để trống bình luận");
      return;
    }
    this.service.UpdatePostComment(this.updateComment).subscribe(
      (data: any)=>{
        this.contentUpdate = '';
        this.cancelEditComment();
      },
      error => {
        console.log(error);
      }
    )
  }
  cancelComment(){
    this.isCommented = false;
    this.createCommentContent = '';
  }
  isCheckCommented(){
    return this.isCommented;
  }
  cancelEditComment(){
    this.isUpdateCommented = false;
    this.contentUpdate = '';
    this.isEdit = '-1';
  }
  editComment(id: string){
    var foundComment = this.comments?.find(x => x.id === id);
    if(foundComment){
      this.updateComment = foundComment;
      this.contentUpdate = foundComment.content;
      this.isEdit = id;
    }
  }
  deleteComment(id: string){
    this.service.deleteComment(id).subscribe(
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
  onPaste(event: any) {
    const clipboardData = event.clipboardData || (event.originalEvent && event.originalEvent.clipboardData);
  
    if (clipboardData) {
      const items = clipboardData.items;
      console.log(1);
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
  
        if (item.type.indexOf('image') !== -1) {
          // Ngăn chặn dán ảnh
      console.log(2);
          event.preventDefault();
          this.toastr.info('Dán ảnh không được phép.');
          break;
        }
      }
    }
  }
}
