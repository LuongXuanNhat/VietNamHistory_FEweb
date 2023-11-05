import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { SessionService } from 'src/app/service/session/session.service';


@Component({
  selector: 'app-changeemail',
  templateUrl: './changeemail.component.html',
  styleUrls: ['./changeemail.component.css']
})
export class ChangeemailComponent {
  email: any;
  password: any;
  emailcurrent: any;
  isEditMode = false;
  constructor(private  toastr: ToastrService,private router: Router,
    private service: AuthService, private sessionService: SessionService){
    this.email = '';
    this.emailcurrent = sessionService.getEmail();
  }

  toggleEditMode() {
    if(this.isEditMode){
      this.cancelEdit();
      this.isEditMode = !this.isEditMode;
    } else {
      this.isEditMode = !this.isEditMode;
    }
  }
  cancelEdit() {
    this.email = '';
  }
  changeemail(){
    console.log(this.email)
    if(this.email != null){
      this.service.ChangeEmail(this.email).subscribe(
        (res: any) => {
            const resultObj = res.resultObj;
            this.toastr.success('Vui lòng nhập mã xác nhận được gửi đến email của bạn','Thay đổi email thành công');
            this.sessionService.setEmail(this.email);
            this.sessionService.setName(this.email);
            this.sessionService.setToken(resultObj);
            
            this.emailcurrent = this.email;
            this.cancelEdit();
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
      this.toastr.warning('Vui lòng nhập đúng email!')
    }
  }
}
