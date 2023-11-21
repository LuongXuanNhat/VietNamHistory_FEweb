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
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  isCommented = false;
  private hubConnection!: HubConnection;
  public Editor = ClassicEditor;
  userName: string | null = null;
  imgUser: string | null = null;
  userId: string | null = null;
  postId: string = '';
  comments: CommentPostDto[] | null = null;
  createComment: CommentPostDto = {

    userId: '',
    postId: '', // Initialize with an empty string or provide a default value
    userShort: null,
    content: '',
    createdAt: new Date(),
    updatedAt: null,
    subComment: null,
  };
  createCommentContent: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { SubId: string }
  ,private builder: FormBuilder, private session: SessionService,private service: PublicserviceService,
  private  toastr: ToastrService,  private location: Location,private route: ActivatedRoute, private router: Router){
    this.postId = data.SubId;
    this.userId = session.getUserId();
    this.userName= session.getName();
    this.imgUser = session.getAvatar();
    this.GetChatPost();

    this.hubConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:7138/commentHub')
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started!');
      })
      .catch(err => console.error('Error while establishing connection:', err));

    // Listen to SignalR events
      this.hubConnection.on('ReceiveComment', (comment: CommentPostDto[]) => {
      this.GetChatPost(); // Update comments when a new comment is received
    });
  }
  GetChatPost(){
    this.service.getPostComment(this.postId).subscribe(
      (data: any) => {
        this.comments = data.resultObj;
        this.comments?.forEach(element => {
          const parsedDate = parseISO(element.createdAt.toString());
          const parsedDate2 = parseISO(element.updatedAt?.toString() ?? "");

          if (!isNaN(parsedDate.getTime())) {
            element.createdAt = format(parsedDate, 'dd-MM-yyyy');
          }
          if (!isNaN(parsedDate2.getTime())) {
            element.updatedAt = format(parsedDate2, 'dd-MM-yyyy');
          }
        });
      }
    )
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
  }
  sendComment(){
    this.createComment.postId = this.postId;
    this.createComment.createdAt = new Date();
    this.createComment.userId = this.userId ?? '';
    this.createComment.content = this.createCommentContent;

    this.service.CreatePostComment(this.createComment).subscribe(
      (data: any)=>{
        this.GetChatPost();
        this.hubConnection.invoke('SendComment', this.createComment);
        this.createCommentContent = '';
      },
      error => {
        console.log(error);
      }
    )
  }
  loginUser(){
    const currentUrl = this.router.url;
    this.router.navigate(['/login'], { state: { redirect: currentUrl } });
  }
}
