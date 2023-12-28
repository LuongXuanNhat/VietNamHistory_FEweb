import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CommentPostDto, PostResponse } from 'src/app/ObjectClass/object';
import { format, parseISO } from 'date-fns';
import { DataService } from 'src/app/service/datashare/data.service';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SessionService } from 'src/app/service/session/session.service';
import { ToastrService } from 'ngx-toastr';
import { ReportpostComponent } from '../reportpost/reportpost.component';
import { ChatComponent } from '../chat/chat.component';
import { ClipboardService } from 'ngx-clipboard';
import { Overlay } from '@angular/cdk/overlay';
import { UpdatepostComponent } from '../updatepost/updatepost.component';
import { Location } from '@angular/common';


@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.css']
})
export class PostdetailComponent implements OnInit{
  reloadSubscription: Subscription | null = null;
  postData: PostResponse | null = null;
  posts: PostResponse[] = [];
  postId: string = '';
  isThumbUp: boolean | null = null;
  isSave: boolean | null = null;
  currentUrl: string = '';
  likeNumber: number = 0;
  saveNumber: number = 0;
  commentNum: number = 0;
  userIdOfPost: string = '';


  constructor(private route: ActivatedRoute, private router: Router, private service: PublicserviceService,
    private dataService: DataService,private dialog: MatDialog, private session: SessionService, 
    private  toastr: ToastrService, private overlay: Overlay, private clipboardService: ClipboardService, 
    private location: Location,  ) {
      this.route.params.subscribe(params => {
        this.postId = params['postId'] ?? '';
      });
      this.getDetail();
      this.getInteract();
      this.currentUrl = this.location.path();
  }
  ngOnInit(){
    this.reloadSubscription = this.dataService.reloadDetailPage$.subscribe((postId: string | null) => {
      if(postId != '' && postId)  {
        this.postId = postId;
        this.router.navigate([], {relativeTo: this.route});
        this.getDetail();
      }
    });
  }
  getDetail(){
    this.service.GetPostDetail(this.postId).subscribe(
      (data: any) => {
        this.postData = data.resultObj;
        this.likeNumber = data.resultObj.likeNumber;
        this.saveNumber = data.resultObj.saveNumber;
        this.commentNum = data.resultObj.commentNumber;
        this.userIdOfPost = data.resultObj.userShort.id;
        if(this.postData){
          const parsedDate = parseISO(this.postData.createdAt);
          const parsedDate2 = parseISO(this.postData.updatedAt ?? "");

          if (!isNaN(parsedDate.getTime())) {
            this.postData.createdAt = format(parsedDate, 'dd-MM-yyyy');
          }
          if (!isNaN(parsedDate2.getTime())) {
            this.postData.updatedAt = format(parsedDate2, 'dd-MM-yyyy');
          }
        }
        this.getPosts();
      }
    )
  }
  postDetail(post: PostResponse) {
    const postId = post.subId;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/discover', postId]);
  }
  getInteract(){
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
  }
  getPosts(){
    this.service.getRandomPost(8).subscribe(
      (result: any) => {
        const stamps = result.resultObj as PostResponse[];
        this.posts = stamps.filter(post => post.id !== this.postData?.id);
      },
      (error) => {
        console.error('Lỗi: ', error);
      }
    )
  }
  findByTag(tagName: string){
    this.dataService.changeKeyword('#'+tagName);
      this.router.navigate(['/searchposts']);
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
  deletePost(){
    this.service.DeletePost(this.postData?.id ?? '').subscribe(
      (data: any) => {
        if(data.isSuccessed){
          this.toastr.success("Xóa bài thành công");
          this.router.navigate(['/discover']);
        } else {
          this.toastr.error("Lỗi: " + data.message);
        }
      }, (error: any) => {
        this.toastr.error("Lỗi: "+ error);
      }
    )
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
