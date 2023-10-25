import { Component, OnInit , DoCheck} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, DoCheck{
  title = 'VietNamHistory';
  username: string = '';
  ismenurequired = false;
  isadminuser = false;
  constructor(private router : Router, private service: AuthService){

  }

  ngOnInit() {
    const storedUsername = sessionStorage.getItem('username');
    // Lấy giá trị từ sessionStorage
    if (storedUsername !== null) {
      this.username = storedUsername;
    } else {
      this.username = "Giá trị không tồn tại";
    }
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
}
