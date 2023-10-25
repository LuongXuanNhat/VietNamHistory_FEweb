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
  token: any;
  constructor(private router : Router, private service: AuthService){

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
    return this.service.IsLoggedIn();
  }

  logout(){
    
  }
}
