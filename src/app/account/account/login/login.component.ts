import { Component,Inject } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import { ToastrService} from 'ngx-toastr'
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../../service/user.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { ForgetpassComponent } from '../../forgetpass/forgetpass.component';
import { SessionService } from 'src/app/service/session/session.service';
import { Location } from '@angular/common';
import { DataService } from 'src/app/service/datashare/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (private builder: FormBuilder, private  toastr: ToastrService,private userService: UserService,
    private service: AuthService, private router: Router
    ,private dialog: MatDialog, private sessionService: SessionService, private location: Location,
    private dataService: DataService, ){
  }
  userdata: any;
  hide = true;
  decodedToken: any;
  animal: any;
  name: any;

  loginform = this.builder.group({
    Email: this.builder.control('', Validators.required),
    Password: this.builder.control('', Validators.required)
  })

  proceedlogin(){
    if(this.loginform.valid){
      this.service.Login(this.loginform.value).subscribe( (res: any) => {
        const resultObj = res.resultObj;
        if(res.isSuccessed){
          this.sessionService.setToken(resultObj);
          this.userService.GetImage().subscribe(
            (data: any) => {
              if(data !== ''){
                const avatar = data.resultObj;
                sessionStorage.setItem('avatar', avatar);
              }
            },
            error => {
              console.error('Lỗi khi gọi API', error);
              console.log(error);
              console.log(error.message);
            }
          );

          this.service.login();
          const previousState = this.location.getState() as { redirect: string, navigationId: number };
          const redirectTo = previousState.redirect !== '' ? previousState.redirect : '/home';
          this.router.navigateByUrl(redirectTo);
        } else {
          this.toastr.error(res.message);
        }
      
      },
      (error: any) => {
        const message = error.error.message; 
        this.toastr.error("Lỗi kết nối đến server! Xin lỗi vì sự cố này");
      })
    } else {
      this.toastr.warning('Vui lòng nhập đầy đủ thông tin!')
    }
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
  forgetPassword(){
    this.openDialog('100ms', '600ms');
  }
  openDialog(enteranimation: any, exitanimation: any){
    const popup = this.dialog.open(ForgetpassComponent, {
      enterAnimationDuration: enteranimation,
      exitAnimationDuration: exitanimation,
      width: '30%'
    });
    // popup.afterClosed().subscribe(res => {
    //   this.LoadUser();
    // });
  }

  loginWithFacebookProxy(){
    this.service.loginWithFacebook();
    var token = sessionStorage.getItem('access_token');
    if(token != null){
      
    }
  }
}