import { Component, OnInit , DoCheck, ElementRef, ViewChild, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { AccountList, Category, NotificationDto } from './ObjectClass/object';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './service/user.service';
import { SessionService } from './service/session/session.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatepostComponent } from './discover/createpost/createpost.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ForumCreateComponent } from './forum/forum-create/forum-create.component';
import { AnimationService } from './service/animations/animation.service';
import { CreatedocumentComponent } from './document/createdocument/createdocument.component';
import { CreateexamComponent } from './exam/createexam/createexam.component';
import { Constant } from './service/constant';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { PublicserviceService } from './service/publicservice.service';
import { format, parseISO } from 'date-fns';
import viLocale from 'date-fns/locale/vi';
import { Subscription } from 'rxjs';
import { DataService } from './service/datashare/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, DoCheck{
  newNoti!: boolean;
  checkLoginOne!: boolean;
  title = 'VietNamHistory';
  username: any;
  email: any;
  avatar: any;
  ismenurequired = false;
  isadminuser = false;
  token: any;
  isScreenWideEnough: boolean = true;
  objectList: Category[] = [
    { categoryname: 'Trang chủ', url: '/' },
    { categoryname: 'Khám phá', url: '/discover' },
    { categoryname: 'Học sử', url: '/course' },
    { categoryname: 'Luyện tập', url: '/exam' },
    { categoryname: 'Tài liệu', url: '/document' },
    { categoryname: 'Diễn đàn', url: '/forum' },
    { categoryname: 'Tin tức', url: '/news' }
  ];
  notifications: NotificationDto[] = [];
  numberNotiNotSeen: number = 0;
  private hubConnection!: HubConnection;
  
  constructor(private router : Router, private service: AuthService,
    private toastr: ToastrService, private sessionService: SessionService,
    private dialog: MatDialog,private animationService: AnimationService,
    private breakpointObserver: BreakpointObserver, private publicService: PublicserviceService){

  }
  ngOnInit() {
    this.animationService.attachAnimationListener();
    this.animationService.attachAnimationListener_btn2();
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isScreenWideEnough = !result.matches;
    });
    this.checkLoginOne = true;
    this.newNoti = false;
  }
  getNotification() {
    if(this.sessionService.getUserId() && this.checkLoginOne){
      this.checkLoginOne = false;
      this.publicService.GetMyNotification().subscribe(
        (data: any) => {
          if(data.isSuccessed){
            this.notifications = this.ConvertNotisDate(data.resultObj);
            this.getConnecttion();
            // this.SortNoti();
          } else {
            this.toastr.error("Lỗi: " + data.message);
          }
        }, (error: any) => {
          this.toastr.error("Lỗi: "+ error);
        }
      )
    }
  }
  // SortNoti() {
  //   this.notifications.sort((a, b) => {
  //     const dateA = new Date(a.date || '');
  //     const dateB = new Date(b.date || '');
  //     return dateB.getTime() - dateA.getTime();
  //   });
  // }
  
  isMenuOpen = false;

  openMenu() {
    this.isMenuOpen = true;
  }

  closeMenu() {
    // this.isMenuOpen = false;
  }
  ngDoCheck(): void {
      let curenturl = this.router.url;
      if(curenturl == '/login' || curenturl == '/register'){
        this.ismenurequired = false;
      } else {
        this.ismenurequired = true;
      }
      if(this.service.GetUserRole() === 'admin'){
        this.isadminuser = true;
      } else {
        this.isadminuser = false;
      }
  }
  createPost(){
    if(this.sessionService.getToken()){
      this.openDialog('100ms', '600ms');
    } else {
      this.toastr.info("Bạn cần đăng nhập trước");
      const currentUrl = this.router.url;
      this.router.navigate(['/login'], { state: { redirect: currentUrl } });
    }
  }
  openDialog(enteranimation: any, exitanimation: any){
    this.dialog.open(CreatepostComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '60%'
    });
  }
  createQuestion(){
    if(this.sessionService.getToken()){
      this.openQuestionDialog('100ms', '600ms');
    } else {
      this.toastr.info("Bạn cần đăng nhập trước");
      const currentUrl = this.router.url;
      this.router.navigate(['/login'], { state: { redirect: currentUrl } });
    }
  }
  openQuestionDialog(enteranimation: string, exitanimation: string) {
    this.dialog.open(ForumCreateComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '50%'
    });
  }
  createDocument(){
    if(this.sessionService.getToken()){
      this.openDocumentDialog('100ms', '600ms');
    } else {
      this.toastr.info("Bạn cần đăng nhập trước");
      const currentUrl = this.router.url;
      this.router.navigate(['/login'], { state: { redirect: currentUrl } });
    }
  }
  openDocumentDialog(enteranimation: string, exitanimation: string) {
    this.dialog.open(CreatedocumentComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '60%'
    });
  }
  createExam(){
    this.openExamDialog('100ms', '600ms');
  }
  openExamDialog(enteranimation: string, exitanimation: string) {
    this.dialog.open(CreateexamComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '60%'
    });
  }

  isLoggedIn(){
    this.token = this.sessionService.getToken();
    if(this.token){
      this.avatar = this.sessionService.getAvatar();
      this.username = this.sessionService.getName();
      this.email = this.sessionService.getEmail();
      this.avatar = this.avatar === '' ? null : this.avatar;
      this.getNotification();
    }
    return this.service.IsLoggedIn();
  }
  getConnecttion() {
    this.hubConnection = new HubConnectionBuilder()
        .withUrl(this.publicService.getChatSignRl())
        .build();
  
    this.hubConnection
      .start()
      .then(() => {
        console.log('Kết nối thành công!');
        this.hubConnection.invoke('AddToGroup', this.sessionService.getUserId());
      })
      .catch(err => console.error('Lỗi khi thiết lập kết nối:', err));

    this.hubConnection.on('ReceiveNoti', (data: any) => {
      if (data.userId === this.sessionService.getUserId()) {
        this.notifications.unshift(this.ConvertNotiDate(data));
        // this.SortNoti();
        this.numberNotiNotSeen += 1;
        this.newNoti = true;
      }
    });
  }
  openNotification(){
    this.newNoti = false;
  }
  isCheckAdmin(){
    return this.sessionService.getRole() === Constant.adminRole;
  }
  logout(){
    this.service.LogOut().subscribe( (res: any) => {
      this.sessionService.clearSessionStorage();
      this.service.logout();
      this.avatar = null;
      this.notifications = [];
      this.router.navigate(['/login']);
    },
    (error: any) => {
      const message = error.message; 
      if(message == null){
        this.toastr.error("Lỗi kết nối đến server! Xin lỗi vì sự cố này");
      } else {
        this.toastr.error(message);
      }
    })
    
  }
  loginUser(){
    const currentUrl = this.router.url;
    this.router.navigate(['/login'], { state: { redirect: currentUrl } });
  }
  checkRoute(){
    if(this.isCheckAdmin()){
      this.router.navigate(['/mycategory/exam']);
    }
    if(this.sessionService.getRole() === Constant.studentRole){
      this.router.navigate(['/mycategory/examhistory']);
    }
  }

  ConvertNotiDate(notification: NotificationDto): NotificationDto{

      const parsedDate = parseISO(notification.date ?? "");
      if (!isNaN(parsedDate.getTime())) {
        notification.date = format(parsedDate, 'dd-MM-yyyy HH:mm');
      }
    return notification;
  }

  ConvertNotisDate(notifications: NotificationDto[]): NotificationDto[]{
    notifications?.forEach(element => {
      const parsedDate = parseISO(element.date ?? "");
      if (!isNaN(parsedDate.getTime())) {
        element.date = format(parsedDate, 'dd-MM-yyyy HH:mm');
      }
    });
    return notifications;
  }
}
