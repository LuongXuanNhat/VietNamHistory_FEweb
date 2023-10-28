import { Component,Inject } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import { ToastrService} from 'ngx-toastr'
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from '../../../service/user.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (private builder: FormBuilder, private  toastr: ToastrService,private userService: UserService,
    private service: AuthService, private router: Router,private jwtHelper: JwtHelperService 
    ,private dialog: MatDialog){
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
        sessionStorage.setItem('access_token', resultObj);
        if(res.resultObj){
          const decodedToken = this.jwtHelper.decodeToken(res.resultObj);
          const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
          const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          const name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
          const uri = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/uri'];

          // Lưu thông tin vào sessionStorage
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('role', role);
          sessionStorage.setItem('name', name);
          this.userService.GetImage().subscribe(
            (data: string) => {
              if(data !== ''){
                const avatar = 'data:image/jpeg;base64,' + data;
                sessionStorage.setItem('avatar', avatar);
              }
            },
            error => {
              console.error('Lỗi khi gọi API', error);
            }
          );
        }
        this.router.navigate(['/home']);
      },
      (error: any) => {
        const message = error.error.message; 
        if(message == null){
          this.toastr.error("Lỗi kết nối đến server! Xin lỗi vì sự cố này");
        } else {
          this.toastr.error(message);
        }
      })
    } else {
      this.toastr.warning('Vui lòng nhập đầy đủ thông tin!')
    }
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  openDialog(){
    
  }
}