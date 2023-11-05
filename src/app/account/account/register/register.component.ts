import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms'
import { ToastrService} from 'ngx-toastr'
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  constructor (private builder: FormBuilder, private  toastr: ToastrService,
    private service: AuthService, private router: Router ){
      
  }
  hide = true;
  registerform = this.builder.group({
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-/]).{6,16}$')])),
    confirmPassword: this.builder.control('', Validators.required)
  });

  proceedregisteration(){
    if(this.registerform.valid){
      if(this.registerform.value.password === this.registerform.value.confirmPassword){
        this.service.ProceedRegister(this.registerform.value).subscribe(
          (res: any) => {
              const resultObj = res.resultObj;
              this.toastr.success('Vui lòng nhập mã xác nhận được gửi đến email của bạn','Đăng ký thành công');
              
              this.router.navigate(['/home']);
          },
          (error: any) => {
            const message = error.error.message; 
            if(message == null){
              this.toastr.error("Lỗi kết nối đến server! Xin lỗi vì sự cố này");
            } else {
              this.toastr.error(message);
            }
          }
        );
      } else {
        this.toastr.warning('Mật khẩu không khớp!')
      }
      
    } else {
      const email = this.registerform.get('email') ?? null;
      const pass = this.registerform.get('password') ?? null;

      if (email && email.hasError('email')) {
        this.toastr.warning('Email không hợp lệ. Hãy nhập một địa chỉ email hợp lệ.');
      } else if (pass && pass.hasError('pattern')) {
        this.toastr.warning('Mật khẩu ít nhất phải có 6 ký tự và bao gồm: Hoa, thường, số và ký tự đặc biệt');
      } else {
        this.toastr.warning('Vui lòng nhập đầy đủ thông tin!');
      }

      
    }
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
}

