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

@Component({
  selector: 'app-interact',
  templateUrl: './interact.component.html',
  styleUrls: ['./interact.component.css']
})
export class InteractComponent implements OnInit{
  isThumbUp: boolean | null = null;
  isSave: boolean | null = null;
  postId: string = '';
  likeNumber: number = 0;
  saveNumber: number = 0;
  commentNum: number = 0;

  constructor(private service: PublicserviceService, private dataService: DataService,
    private route: ActivatedRoute, private session: SessionService,private dialog: MatDialog,
    private  toastr: ToastrService,  private overlay: Overlay, ){
      this.route.params.subscribe(params => {
        this.postId = params['postId'] ?? '';
      })
      if(this.session.getUserId()){
        this.service.getLike(this.postId, this.session.getUserId() || '').subscribe(
          (result: any) => {
              this.isThumbUp = result.resultObj;
          },
          (error: any) => {
              console.error(error);
          }
        );
        this.service.getSave(this.postId, this.session.getUserId() || '').subscribe(
          (result: any) => {
              this.isSave = result.resultObj;
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
  }
  ngOnInit() {
    
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
        this.isThumbUp = !this.isThumbUp;
        this.likeNumber = data.resultObj;
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
        this.isSave = !this.isSave;
        this.saveNumber = data.resultObj;
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
      width: '400px',
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
}
