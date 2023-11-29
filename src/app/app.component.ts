import { Component, OnInit , DoCheck, ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { AccountList, Category } from './ObjectClass/object';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './service/user.service';
import { SessionService } from './service/session/session.service';
import { MatDialog } from '@angular/material/dialog';
import { CreatepostComponent } from './discover/createpost/createpost.component';
import { MatMenu } from '@angular/material/menu';
import { ForumCreateComponent } from './forum/forum-create/forum-create.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, DoCheck{
  title = 'VietNamHistory';
  username: any;
  email: any;
  avatar: any;
  ismenurequired = false;
  isadminuser = false;
  token: any;
  objectList: Category[] = [
    { categoryname: 'Trang chủ', url: '/home' },
    { categoryname: 'Khám phá', url: '/discover' },
    { categoryname: 'Học sử', url: '/learn' },
    { categoryname: 'Luyện tập', url: '/practice' },
    { categoryname: 'Thi đấu', url: '/contest' },
    { categoryname: 'Diễn đàn', url: '/forum' },
    { categoryname: 'Về chúng tôi', url: '/about' }
  ];
  
  
  constructor(private router : Router, private service: AuthService, private overlayContainer: OverlayContainer,
    private toastr: ToastrService, private userService: UserService, private sessionService: SessionService,
    private dialog: MatDialog){

  }

  ngOnInit() {
    
  }
  
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
      this.router.navigate(['/login']);
    }
  }
  openDialog(enteranimation: any, exitanimation: any){
    const popup = this.dialog.open(CreatepostComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '60%'
    });
    // popup.afterClosed().subscribe(res => {
    //   this.LoadUser();
    // });
  }
  createQuestion(){
    if(this.sessionService.getToken()){
      this.openQuestionDialog('100ms', '600ms');
    } else {
      this.toastr.info("Bạn cần đăng nhập trước");
      this.router.navigate(['/login']);
    }
  }
  openQuestionDialog(enteranimation: string, exitanimation: string) {
    const popup = this.dialog.open(ForumCreateComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '50%'
    });
  }
  isLoggedIn(){
    this.token = this.sessionService.getToken();
    if(this.token){
      this.avatar = this.sessionService.getAvatar();
      this.username = this.sessionService.getName();
      this.email = this.sessionService.getEmail();
      this.avatar = this.avatar === '' ? null : this.avatar;
    }
    return this.service.IsLoggedIn();
  }

  logout(){
    this.service.LogOut().subscribe( (res: any) => {
      this.sessionService.clearSessionStorage();
      this.service.logout();
      this.avatar = null;
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
}
