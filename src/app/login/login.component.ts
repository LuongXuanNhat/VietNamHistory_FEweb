import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import { ToastrService} from 'ngx-toastr'
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor (private builder: FormBuilder, private  toastr: ToastrService,
    private service: AuthService, private router: Router ){
  }
  userdata: any;
  hide = true;

  loginform = this.builder.group({
    Email: this.builder.control('', Validators.required),
    Password: this.builder.control('', Validators.required)
  })

  proceedlogin(){
    if(this.loginform.valid){
      this.service.GetByCode(this.loginform.value).subscribe( (res: any) => {
        const resultObj = res.resultObj;
        sessionStorage.setItem('access_token', resultObj);
        this.toastr.success('Đăng nhập thành công');
        this.router.navigate(['']);
      },
      (error: any) => {
        const message = error.error.message; 
        this.toastr.error(message);
      })
    } else {
      this.toastr.warning('Vui lòng nhập đầy đủ thông tin!')
    }
  }
  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
}
