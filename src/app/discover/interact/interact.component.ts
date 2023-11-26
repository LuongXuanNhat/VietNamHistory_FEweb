import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CommentPostDto, ReportPost } from 'src/app/ObjectClass/object';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { SessionService } from 'src/app/service/session/session.service';
import { ReportpostComponent } from '../reportpost/reportpost.component';
import { ToastrService } from 'ngx-toastr';
import { ChatComponent } from '../chat/chat.component';
import { Overlay } from '@angular/cdk/overlay';
import { UpdatepostComponent } from '../updatepost/updatepost.component';
import { ClipboardService } from 'ngx-clipboard';
import { Location } from '@angular/common';

@Component({
  selector: 'app-interact',
  templateUrl: './interact.component.html',
  styleUrls: ['./interact.component.css']
})
export class InteractComponent implements OnInit{
  isThumbUp: boolean | null = null;
  isSave: boolean | null = null;
  postId: string = '';
  currentUrl: string = '';
  likeNumber: number = 0;
  saveNumber: number = 0;
  commentNum: number = 0;
  userIdOfPost: string = '';

  constructor(private service: PublicserviceService, private dataService: DataService,
    private route: ActivatedRoute, private session: SessionService,private dialog: MatDialog,
    private  toastr: ToastrService,  private overlay: Overlay, private clipboardService: ClipboardService,
    private location: Location ){
      this.route.params.subscribe(params => {
        this.postId = params['postId'] ?? '';
      })
      if(this.session.getUserId()){
        this.service.getLike(this.postId, this.session.getUserId() || '').subscribe(
          (result: any) => {
              this.isThumbUp = result.resultObj.check;
          },
          (error: any) => {
              console.error(error);
          }
        );
        this.service.getSave(this.postId, this.session.getUserId() || '').subscribe(
          (result: any) => {
              this.isSave = result.resultObj.check;
          },
          (error: any) => {
              console.error(error);
          }
        );
      }
      service.GetPostDetail(this.postId).subscribe(
        (data: any) => {
          this.likeNumber = data.resultObj.likeNumber;
          this.saveNumber = data.resultObj.saveNumber;
          this.commentNum = data.resultObj.commentNumber;
        },
        (error: any) => {
          console.log(error);
        }
      )
      this.getComment();
      this.currentUrl = this.location.path();
  }
  ngOnInit() {
    this.dataService.currentPostOfUserId.subscribe(userId => {
      this.userIdOfPost = userId ?? this.userIdOfPost;
    });
  }
  toggleThumb() {
    if(!this.session.getUserId()){
      this.toastr.info("Bạn cần đăng nhập!");
      return;
    }
    const formData = new FormData();
    formData.append('PostId', this.postId);
    formData.append('UserId', this.session.getUserId() ?? '');
    this.service.LikeOrUnlike(formData).subscribe(
      (data: any) => {
        console.log(data.resultObj);
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
    formData.append('PostId', this.postId);
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
        SubId: this.postId
      }
    });
  }
  comment(){
    this.openDialogComment('10ms', '10ms');
  }
  openDialogComment(enteranimation: any, exitanimation: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.hasBackdrop = false;
    const popup = this.dialog.open(ChatComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '414px',
      height: '100%',
      data: {
        SubId: this.postId
      },
      panelClass: 'right-aligned-dialog', 
      backdropClass: 'custom-backdrop',
      // Enable scoll page
      scrollStrategy: this.overlay.scrollStrategies.noop(),
    });
  }
  getComment(){
    this.service.getPostComment(this.postId).subscribe(
      (data: any) => {
        const obj: CommentPostDto[] = data.resultObj;
        this.commentNum = obj.length;
      }
    )
  }

  updatePost(){
    this.dataService.changeSubId(this.postId);
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
