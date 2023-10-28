import { Component, OnInit , DoCheck} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { AccountList, Category } from './ObjectClass/Category';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './service/user.service';


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
    { categoryname: 'Khám phá', url: '/discover' },
    { categoryname: 'Học sử', url: '/learn' },
    { categoryname: 'Luyện tập', url: '/practice' },
    { categoryname: 'Thi đấu', url: '/contest' },
    { categoryname: 'Diễn đàn', url: '/forum' },
    { categoryname: 'Về chúng tôi', url: '/about' }
  ];
  

  constructor(private router : Router, private service: AuthService, private overlayContainer: OverlayContainer,
    private toastr: ToastrService, private userService: UserService){

  }

  ngOnInit() {
    
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

  isLoggedIn(){
    this.token = sessionStorage.getItem('access_token');
    if(this.token){
      this.avatar = sessionStorage.getItem('avatar');
      this.username = sessionStorage.getItem('name');
      this.email = sessionStorage.getItem('email');
      this.avatar = this.avatar === '' ? null : this.avatar;
    }
    return this.service.IsLoggedIn();
  }

  logout(){
    this.service.LogOut().subscribe( (res: any) => {
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('uri');
      sessionStorage.removeItem('name');
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('avatar');
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

}
